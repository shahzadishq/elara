/**
 * Framework-free three.js scene for the 3D page: a glossy, procedurally modelled
 * molar surrounded by orbit rings, glass pearls and sparkles.
 *
 * Used by <Tooth3D> via mountHero.ts. Plain JS (with JSDoc types) and free of React.
 */
// three.js is vendored as a small custom build (see src/vendor/three) so the
// project needs no extra npm dependency.
import * as THREE from "../../vendor/three/three.custom.min.js";

/**
 * @typedef {object} ToothSceneOptions
 * @property {boolean} [reducedMotion] Disable idle motion (prefers-reduced-motion).
 * @property {() => void} [onReady] Called once the first frame has rendered.
 */

/**
 * @typedef {object} ToothScene
 * @property {(progress: number) => void} setScroll 0 = hero fully visible, 1 = hero scrolled away.
 * @property {(x: number, y: number) => void} setPointer Pointer position, both axes in -1..1.
 * @property {(active: boolean) => void} setActive Pause/resume rendering.
 * @property {() => void} dispose Free all GPU resources.
 */

const NAVY = 0x103f72;
const TEAL = 0x20a8b2;
const TEAL_LIGHT = 0x7fd3d8;

const smooth = (a, b, x) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

/** Deform a dense sphere into a molar: cusped crown, neck and two tapered roots. */
export function createToothGeometry() {
  const geo = new THREE.SphereGeometry(1, 160, 160);
  const pos = geo.attributes.position;
  const v = new THREE.Vector3();
  const cusps = [
    [0.4, 0.34],
    [-0.4, 0.34],
    [0.4, -0.34],
    [-0.4, -0.34],
  ];

  for (let i = 0; i < pos.count; i++) {
    v.fromBufferAttribute(pos, i);
    let { x, y, z } = v;

    if (y > -0.2) {
      // Crown: slightly boxy, wider than deep, with a flattened chewing surface.
      const bulge = 1 + 0.08 * Math.cos(y * 2.2);
      x *= 1.02 * bulge;
      z *= 0.9 * bulge;
      if (y > 0.45) y = 0.45 + (y - 0.45) * 0.45;
      if (y > 0.2) {
        let bump = 0;
        for (const [cx, cz] of cusps) {
          bump += Math.exp(-((x - cx) ** 2 + (z - cz) ** 2) / 0.07);
        }
        const fissure = Math.exp(-(x * x) / 0.012) + Math.exp(-(z * z) / 0.012) * 0.6;
        const top = smooth(0.2, 0.55, y);
        y += top * (0.16 * Math.min(bump, 1.2) - 0.07 * fissure);
      }
      y *= 0.95;
    } else {
      // Roots: depth d runs 0 (neck) -> 1 (apex). Each half of the sphere is
      // remapped onto its own root so the surface stays closed and seamless.
      const d = Math.min(1, (-0.2 - y) / 0.8);
      const rho = Math.hypot(x, z);
      const phi = Math.atan2(z, x);
      const c = Math.cos(phi);
      const edge = 1 + 0.08 * Math.cos(0.44); // crown bulge at the neck
      const neck = 1 - 0.12 * smooth(0, 0.22, d);
      const taper = (1 - 0.68 * Math.pow(d, 1.2)) * neck;
      const split = smooth(0.04, 0.42, d);

      // Single trunk (just below the crown).
      const ax = x * 1.02 * edge * taper;
      const az = z * 0.9 * edge * taper;

      // Two roots.
      const side = c >= 0 ? 1 : -1;
      let local = side > 0 ? phi : phi - Math.PI;
      if (local < -Math.PI) local += Math.PI * 2;
      const phi2 = local * 2;
      const rr = 0.44 * taper * Math.min(1, rho / 0.45);
      const co = rr + 0.06 * d;
      const tx = side * (co + rr * Math.cos(phi2)) + side * 0.12 * d * d;
      const tz = side * rr * Math.sin(phi2) * 0.88;

      x = ax + (tx - ax) * split;
      z = az + (tz - az) * split;
      y = -0.19 - d * 1.55 + split * Math.pow(1 - Math.abs(c), 3) * d * 1.2;
    }
    pos.setXYZ(i, x, y + 0.35, z);
  }
  geo.computeVertexNormals();
  return geo;
}

/** Soft studio lighting baked into an environment map (no external HDR needed). */
function createEnvironment(renderer) {
  const env = new THREE.Scene();
  env.background = new THREE.Color(0x0a2342);
  const box = new THREE.BoxGeometry(1, 1, 1);
  const panel = (color, intensity, p, s) => {
    const m = new THREE.Mesh(box, new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(intensity) }));
    m.position.set(...p);
    m.scale.set(...s);
    m.lookAt(0, 0, 0);
    env.add(m);
  };
  panel(0xffffff, 6, [0, 8, 2], [10, 0.2, 6]);
  panel(0xffffff, 3, [-7, 2, 4], [0.2, 6, 4]);
  panel(TEAL_LIGHT, 4, [7, 1, -2], [0.2, 6, 5]);
  panel(0xbfd8ff, 2, [0, -6, 4], [8, 0.2, 4]);
  panel(0xffffff, 2.5, [2, 3, 8], [4, 3, 0.2]);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const tex = pmrem.fromScene(env, 0.04).texture;
  pmrem.dispose();
  box.dispose();
  return tex;
}

function createSparkleTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d");
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)");
  grd.addColorStop(0.25, "rgba(200,245,248,0.7)");
  grd.addColorStop(1, "rgba(127,211,216,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/**
 * @param {HTMLCanvasElement} canvas
 * @param {ToothSceneOptions} [opts]
 * @returns {ToothScene | null} null when WebGL is unavailable.
 */
export function createToothScene(canvas, opts = {}) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const envMap = createEnvironment(renderer);
  scene.environment = envMap;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.15, 7.4);

  scene.add(new THREE.HemisphereLight(0xffffff, NAVY, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3, 5, 4);
  scene.add(key);
  const rim = new THREE.PointLight(TEAL, 30, 12);
  rim.position.set(-3, 1, -2.5);
  scene.add(rim);

  // ---- The tooth ----
  const rig = new THREE.Group(); // pointer + scroll
  const floatGroup = new THREE.Group(); // idle bob
  rig.add(floatGroup);
  scene.add(rig);

  const toothGeo = createToothGeometry();
  const toothMat = new THREE.MeshPhysicalMaterial({
    color: 0xf8fbff,
    roughness: 0.2,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    sheen: 0.6,
    sheenColor: new THREE.Color(TEAL_LIGHT),
    sheenRoughness: 0.4,
    iridescence: 0.35,
    iridescenceIOR: 1.4,
    envMapIntensity: 1.2,
  });
  const tooth = new THREE.Mesh(toothGeo, toothMat);
  tooth.rotation.set(0.25, -0.5, 0.12);
  floatGroup.add(tooth);

  // ---- Orbit rings ----
  const ringMat = new THREE.MeshPhysicalMaterial({
    color: TEAL,
    metalness: 0.9,
    roughness: 0.18,
    clearcoat: 1,
    emissive: new THREE.Color(TEAL).multiplyScalar(0.25),
  });
  const ringMat2 = ringMat.clone();
  ringMat2.color = new THREE.Color(0xdfe9f5);
  ringMat2.emissive = new THREE.Color(0x000000);
  const ring1 = new THREE.Mesh(new THREE.TorusGeometry(1.95, 0.018, 16, 220), ringMat);
  ring1.rotation.set(1.25, 0.2, 0);
  const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.012, 16, 240), ringMat2);
  ring2.rotation.set(1.7, -0.5, 0.3);
  floatGroup.add(ring1, ring2);

  // Small beads riding on the rings.
  const beadGeo = new THREE.SphereGeometry(0.075, 32, 32);
  const bead1 = new THREE.Mesh(beadGeo, ringMat);
  const bead2 = new THREE.Mesh(beadGeo, ringMat2);
  bead2.scale.setScalar(0.8);
  ring1.add(bead1);
  ring2.add(bead2);

  // ---- Glass pearls ----
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0,
    roughness: 0.05,
    transmission: 1,
    thickness: 0.6,
    ior: 1.45,
    clearcoat: 1,
    envMapIntensity: 1.4,
    iridescence: 0.6,
  });
  const pearlGeo = new THREE.SphereGeometry(1, 48, 48);
  const pearls = [
    { p: [-2.4, 1.2, -0.6], s: 0.32, sp: 0.7 },
    { p: [2.3, -1.1, 0.3], s: 0.42, sp: 0.55 },
    { p: [1.9, 1.55, -1.2], s: 0.2, sp: 0.9 },
    { p: [-1.8, -1.5, 0.6], s: 0.18, sp: 1.1 },
    { p: [-3.2, -0.2, -2], s: 0.26, sp: 0.6 },
    { p: [3.3, 0.5, -2.2], s: 0.3, sp: 0.8 },
  ].map(({ p, s, sp }, i) => {
    const m = new THREE.Mesh(pearlGeo, i % 3 === 1 ? ringMat : glassMat);
    if (i % 3 === 1) m.scale.setScalar(s * 0.45);
    else m.scale.setScalar(s);
    m.position.set(p[0], p[1], p[2]);
    m.userData = { base: m.position.clone(), sp, ph: i * 1.7 };
    scene.add(m);
    return m;
  });

  // ---- Sparkles ----
  const COUNT = 420;
  const sparkleGeo = new THREE.BufferGeometry();
  const sp = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    const r = 1.6 + Math.random() * 3.4;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    sp[i * 3] = r * Math.sin(ph) * Math.cos(th) * 1.4;
    sp[i * 3 + 1] = r * Math.cos(ph) * 0.8;
    sp[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th) - 1;
  }
  sparkleGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  const sparkleTex = createSparkleTexture();
  const sparkleMat = new THREE.PointsMaterial({
    size: 0.085,
    map: sparkleTex,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    color: 0xcff6f8,
    opacity: 0.9,
  });
  const sparkles = new THREE.Points(sparkleGeo, sparkleMat);
  scene.add(sparkles);

  // ---- State & loop ----
  let scroll = 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let active = true;
  let raf = 0;
  let readyFired = false;
  const start = performance.now();
  const elapsed = () => (performance.now() - start) / 1000;
  const reduced = Boolean(opts.reducedMotion);

  const resize = () => {
    const w = canvas.clientWidth || canvas.parentElement?.clientWidth || 1;
    const h = canvas.clientHeight || canvas.parentElement?.clientHeight || 1;
    renderer.setSize(w, h, false);
    const aspect = w / h;
    camera.aspect = aspect;
    // Wide screens: push the tooth into the right half, next to the copy.
    // Tall (mobile) screens: centre it a little higher and further away.
    if (aspect > 1.15) {
      camera.position.z = 8.6;
      camera.setViewOffset(w, h, -w * 0.24, 0, w, h);
    } else {
      camera.position.z = aspect < 0.9 ? 9.6 : 9;
      camera.clearViewOffset();
    }
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  const render = () => {
    const t = reduced ? 1.5 : elapsed();
    pointer.x += (pointer.tx - pointer.x) * 0.06;
    pointer.y += (pointer.ty - pointer.y) * 0.06;

    floatGroup.position.y = Math.sin(t * 1.1) * 0.12;
    tooth.rotation.y = -0.5 + t * 0.35 + scroll * 2.4;
    tooth.rotation.x = 0.25 + Math.sin(t * 0.7) * 0.06;

    rig.rotation.y = pointer.x * 0.35;
    rig.rotation.x = -pointer.y * 0.25 + scroll * 0.4;
    rig.position.y = scroll * 1.2;
    rig.scale.setScalar(1 - scroll * 0.25);

    ring1.rotation.z = t * 0.4;
    ring2.rotation.z = -t * 0.28;
    bead1.position.set(Math.cos(t * 1.2) * 1.95, Math.sin(t * 1.2) * 1.95, 0);
    bead2.position.set(Math.cos(-t * 0.9 + 2) * 2.35, Math.sin(-t * 0.9 + 2) * 2.35, 0);

    for (const m of pearls) {
      const { base, sp: s, ph } = m.userData;
      m.position.set(
        base.x + Math.sin(t * s + ph) * 0.15 - pointer.x * 0.3,
        base.y + Math.cos(t * s * 1.3 + ph) * 0.2 - pointer.y * 0.2,
        base.z,
      );
    }
    sparkles.rotation.y = t * 0.04 + pointer.x * 0.1;
    sparkleMat.opacity = 0.65 + Math.sin(t * 2) * 0.2;

    renderer.render(scene, camera);
    if (!readyFired) {
      readyFired = true;
      opts.onReady?.();
    }
  };

  const loop = () => {
    raf = 0;
    if (!active) return;
    render();
    if (!reduced) raf = requestAnimationFrame(loop);
  };
  loop();

  return {
    setScroll(p) {
      scroll = Math.min(1, Math.max(0, p));
      if (reduced && active) render();
    },
    setPointer(x, y) {
      if (reduced) return;
      pointer.tx = x;
      pointer.ty = y;
    },
    setActive(a) {
      if (a === active) return;
      active = a;
      if (a && !raf) {
        loop();
      }
    },
    dispose() {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      scene.traverse((o) => {
        const mesh = o;
        mesh.geometry?.dispose?.();
      });
      [toothMat, ringMat, ringMat2, glassMat, sparkleMat].forEach((m) => m.dispose());
      sparkleTex.dispose();
      envMap.dispose();
      renderer.dispose();
    },
  };
}
