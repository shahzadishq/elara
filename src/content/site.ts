/**
 * Central content & configuration for the Elara Zahnmedizin landing page.
 *
 * Everything visitor-facing (practice details, services, FAQs, image paths,
 * integration settings) lives here so it can be reviewed and updated in one place.
 *
 * `confirmed: false` marks content that was derived from the reference websites
 * or written as a sensible default and still needs sign-off by the practice.
 * Set NEXT_PUBLIC_REVIEW_MODE=1 to see these items highlighted on the page.
 */

export const practice = {
  name: "Elara Zahnmedizin",
  shortName: "Elara",
  // Supplied by the client. NOTE: phone and e-mail are identical to those
  // published by amedis-augsburg.de – must be confirmed before launch.
  address: {
    street: "Willy-Brandt-Platz 1",
    postalCode: "86153",
    city: "Augsburg",
    country: "DE",
  },
  phone: {
    display: "+49 821 508 95 50",
    href: "tel:+498215089550",
    e164: "+498215089550",
  },
  email: "info@amedis-augsburg.de",
  openingHours: [
    { label: "Montag – Freitag", short: "Mo–Fr", hours: "7:00 – 21:00 Uhr" },
    { label: "Samstag & Sonntag", short: "Sa–So", hours: "9:00 – 18:00 Uhr" },
    { label: "Feiertage", short: "Feiertage", hours: "9:00 – 18:00 Uhr" },
  ],
  // Machine-readable opening hours for structured data (schema.org).
  openingHoursSpec: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:00",
      closes: "21:00",
    },
    { days: ["Saturday", "Sunday"], opens: "09:00", closes: "18:00" },
  ],
} as const;

export const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  `${practice.name}, ${practice.address.street}, ${practice.address.postalCode} ${practice.address.city}`,
)}`;

/** Integration settings – all optional, read from environment variables. */
export const integrations = {
  /** Public site URL, e.g. https://www.elara-zahnmedizin.de – enables canonical + OG URLs. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || null,
  /** External online booking URL (e.g. Doctolib). If empty, CTAs go to the enquiry form. */
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,
  /** Google Tag Manager container ID. Only loaded after consent. */
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || null,
  /** Highlights unconfirmed content for client review. Never enable in production. */
  reviewMode: process.env.NEXT_PUBLIC_REVIEW_MODE === "1",
};

export const appointmentHref = integrations.bookingUrl ?? "#kontakt";
export const appointmentIsExternal = Boolean(integrations.bookingUrl);

/**
 * Legal pages. No approved Impressum / Datenschutz text has been supplied yet;
 * the internal routes show a clearly marked placeholder and are set to noindex.
 * Replace with the approved texts (or external URLs) before launch.
 */
export const legal = {
  impressumHref: "/impressum",
  datenschutzHref: "/datenschutz",
  approved: false,
};

export const navigation = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Praxis", href: "#praxis" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#kontakt" },
] as const;

export const images = {
  consultation: {
    src: "/images/elara-consultation.webp",
    width: 1536,
    height: 1024,
    alt: "Ein Zahnarzt von Elara Zahnmedizin bespricht im Behandlungszimmer die nächsten Schritte mit einer Patientin",
  },
  teamGroup: {
    src: "/images/elara-team.webp",
    width: 1672,
    height: 941,
    alt: "Drei Mitglieder des Praxisteams von Elara Zahnmedizin im Empfangsbereich",
  },
  teamWalking: {
    src: "/images/feature-team.webp",
    width: 1100,
    height: 1375,
    alt: "Mitarbeitende von Elara Zahnmedizin im hellen Praxisflur",
  },
  reception: {
    src: "/images/feature-reception.webp",
    width: 1100,
    height: 1375,
    alt: "Heller Empfangs- und Wartebereich mit Sesseln und geschwungenem Empfangstresen",
  },
  xray: {
    src: "/images/feature-technology.webp",
    width: 1100,
    height: 1375,
    alt: "Röntgenraum der Praxis mit Blick ins Grüne",
  },
} as const;

export const hero = {
  eyebrow: "Zahnarztpraxis am Willy-Brandt-Platz, Augsburg",
  title: "Zahnmedizin in Augsburg, die sich nach Ihrem Alltag richtet.",
  intro:
    "Bei Elara Zahnmedizin nehmen wir uns Zeit für Ihre Fragen und besprechen jeden Schritt verständlich mit Ihnen. Und weil wir an sieben Tagen in der Woche für Sie da sind, findet sich ein Termin, der zu Ihnen passt.",
  trustPoints: [
    "Mo–Fr von 7 bis 21 Uhr",
    "Auch am Wochenende & an Feiertagen",
    "Am Willy-Brandt-Platz 1",
  ],
};

export const intro = {
  eyebrow: "Die Praxis",
  title: "Willkommen bei Elara Zahnmedizin",
  paragraphs: [
    "Ein Zahnarztbesuch soll sich gut in Ihr Leben einfügen – nicht umgekehrt. Deshalb öffnen wir werktags schon um 7 Uhr, bleiben bis 21 Uhr und sind auch samstags, sonntags und an Feiertagen für Sie da.",
    "In unserer hellen, ruhigen Praxis am Willy-Brandt-Platz erwartet Sie ein Team, das Ihnen zuhört. Wir erklären Befunde in verständlichen Worten, zeigen Ihnen die möglichen Wege auf und entscheiden gemeinsam mit Ihnen, wie es weitergeht.",
  ],
  points: [
    "Verständliche Erklärungen statt Fachsprache",
    "Behandlungsschritte, die wir vorab mit Ihnen besprechen",
    "Termine früh morgens, abends und am Wochenende",
  ],
  confirmed: false, // approach statements – please confirm wording with the practice
};

export type ServiceIcon =
  | "sparkle"
  | "gum"
  | "shield"
  | "crown"
  | "implant"
  | "surgery"
  | "child"
  | "smile";

export type Service = {
  id: string;
  name: string;
  icon: ServiceIcon;
  summary: string;
  details: string;
  includes?: string[];
  /** Which reference website(s) list this service – for client review only. */
  source: ("amedis" | "alldent")[];
  confirmed: boolean;
};

export const services: Service[] = [
  {
    id: "prophylaxe",
    name: "Prophylaxe & professionelle Zahnreinigung",
    icon: "sparkle",
    summary:
      "Gründliche Reinigung der Zähne und Zahnzwischenräume – die Grundlage für gesunde Zähne und gesundes Zahnfleisch.",
    details:
      "Bei der professionellen Zahnreinigung entfernen wir Beläge und Verfärbungen, die bei der täglichen Pflege schwer zu erreichen sind. Gleichzeitig geben wir Ihnen Tipps, wie Sie Ihre Zahnpflege zu Hause gezielt ergänzen können. Welcher Abstand zwischen zwei Reinigungen für Sie sinnvoll ist, besprechen wir individuell.",
    source: ["amedis", "alldent"],
    confirmed: false,
  },
  {
    id: "parodontitis",
    name: "Parodontitis-Behandlung",
    icon: "gum",
    summary:
      "Wenn das Zahnfleisch blutet oder zurückgeht, suchen wir nach der Ursache und besprechen die passende Behandlung.",
    details:
      "Parodontitis ist eine Entzündung des Zahnhalteapparats, die oft lange unbemerkt bleibt. Nach einer gründlichen Untersuchung erläutern wir Ihnen den Befund und die möglichen Behandlungsschritte. Eine regelmäßige Nachsorge hilft, das Ergebnis langfristig zu erhalten.",
    source: ["amedis", "alldent"],
    confirmed: false,
  },
  {
    id: "zahnerhaltung",
    name: "Füllungen & Wurzelbehandlung",
    icon: "shield",
    summary:
      "Unser Ziel ist, Ihre eigenen Zähne so lange wie möglich zu erhalten – von der Füllung bis zur Wurzelbehandlung.",
    details:
      "Kleinere Defekte lassen sich häufig mit einer Füllung versorgen. Ist der Zahnnerv entzündet, kann eine Wurzelbehandlung helfen, den Zahn zu erhalten. Welche Behandlung in Ihrem Fall infrage kommt, klären wir nach der Untersuchung gemeinsam mit Ihnen.",
    includes: ["Zahnfüllungen", "Wurzelbehandlung"],
    source: ["amedis", "alldent"],
    confirmed: false,
  },
  {
    id: "zahnersatz",
    name: "Zahnersatz",
    icon: "crown",
    summary:
      "Kronen, Brücken und Prothesen, die Funktion und Aussehen Ihrer Zähne wiederherstellen.",
    details:
      "Ob ein einzelner Zahn ersetzt oder eine größere Lücke geschlossen werden soll: Wir stellen Ihnen die verschiedenen Möglichkeiten – festsitzend, herausnehmbar oder implantatgetragen – mit ihren Vor- und Nachteilen vor, damit Sie in Ruhe entscheiden können.",
    includes: ["Kronen", "Brücken", "Prothesen"],
    source: ["amedis", "alldent"],
    confirmed: false,
  },
  {
    id: "implantate",
    name: "Implantate",
    icon: "implant",
    summary:
      "Implantate können fehlende Zähne dauerhaft ersetzen. Ob sie für Sie infrage kommen, klären wir in einer persönlichen Beratung.",
    details:
      "Ein Implantat dient als künstliche Zahnwurzel, auf der eine Krone, Brücke oder Prothese befestigt werden kann. Vor einer Implantatbehandlung untersuchen wir die Ausgangssituation sorgfältig und besprechen mit Ihnen Ablauf, Voraussetzungen und Alternativen.",
    source: ["amedis", "alldent"],
    confirmed: false,
  },
  {
    id: "oralchirurgie",
    name: "Oralchirurgie & Weisheitszähne",
    icon: "surgery",
    summary:
      "Chirurgische Eingriffe im Mundraum, zum Beispiel die Entfernung von Weisheitszähnen – gut vorbereitet und in Ruhe erklärt.",
    details:
      "Vor jedem Eingriff besprechen wir mit Ihnen, was geplant ist, wie Sie sich vorbereiten und worauf Sie danach achten sollten. So wissen Sie jederzeit, was Sie erwartet.",
    source: ["amedis", "alldent"],
    confirmed: false,
  },
  {
    id: "kinder",
    name: "Kinderzahnheilkunde",
    icon: "child",
    summary:
      "Ein entspannter Start für kleine Patientinnen und Patienten – mit Geduld und kindgerechten Erklärungen.",
    details:
      "Gerade bei den ersten Besuchen ist es uns wichtig, dass Kinder die Zahnarztpraxis in guter Erinnerung behalten. Wir erklären Schritt für Schritt, was passiert, und beziehen Eltern selbstverständlich mit ein.",
    source: ["amedis"],
    confirmed: false,
  },
  {
    id: "aesthetik",
    name: "Ästhetische Zahnmedizin",
    icon: "smile",
    summary:
      "Zahnaufhellung, Veneers und Aligner – für ein Lächeln, mit dem Sie sich wohlfühlen.",
    details:
      "Ob hellere Zähne, kleine Formkorrekturen oder unauffällige Zahnschienen zur Korrektur von Zahnfehlstellungen: In einem Beratungsgespräch mit Untersuchung finden wir heraus, welche Möglichkeiten für Sie sinnvoll sind.",
    includes: ["Zahnaufhellung (Bleaching)", "Veneers", "Aligner"],
    source: ["amedis", "alldent"],
    confirmed: false,
  },
];

export const reasons = {
  eyebrow: "Warum Elara Zahnmedizin",
  title: "Zahnmedizin, die in Ihren Kalender passt.",
  intro:
    "Wir möchten, dass Sie Ihre Zahngesundheit nicht aufschieben müssen – weder wegen der Arbeit noch wegen des Wochenendes.",
  items: [
    {
      title: "Früh morgens und abends",
      text: "Montag bis Freitag von 7 bis 21 Uhr – so lässt sich ein Termin vor oder nach der Arbeit leichter einplanen.",
      confirmed: true,
    },
    {
      title: "Wochenende und Feiertage",
      text: "Samstags, sonntags und an Feiertagen sind wir von 9 bis 18 Uhr für Sie da.",
      confirmed: true,
    },
    {
      title: "Viele Behandlungen unter einem Dach",
      text: "Von der Prophylaxe über Zahnerhaltung und Zahnersatz bis zur ästhetischen Zahnmedizin.",
      confirmed: false, // depends on confirmed service list
    },
    {
      title: "Mitten in Augsburg",
      text: "Sie finden uns am Willy-Brandt-Platz 1 – mit der Routenplanung kommen Sie direkt zu uns.",
      confirmed: true,
    },
  ],
};

export const team = {
  eyebrow: "Team",
  title: "Menschen, die sich Zeit für Sie nehmen.",
  text: "Vom ersten Anruf bis zum Behandlungstermin begleitet Sie unser Praxisteam. Wir hören zu, beantworten Ihre Fragen und sorgen dafür, dass Sie sich bei uns gut aufgehoben fühlen.",
  // No names, titles or biographies supplied yet – do not invent them.
  members: [] as { name: string; role: string; bio?: string; image?: string }[],
};

export const gallery = {
  eyebrow: "Einblicke",
  title: "Helle Räume, ruhige Atmosphäre.",
  text: "Ein erster Eindruck von unserer Praxis am Willy-Brandt-Platz – vom Empfang bis in den Röntgenraum.",
  items: [
    { image: "reception", caption: "Empfang & Wartebereich" },
    { image: "xray", caption: "Röntgenraum" },
  ] as const,
};

export const bookingProcess = {
  eyebrow: "So kommen Sie zu Ihrem Termin",
  title: "In drei Schritten zu uns.",
  steps: [
    {
      title: "Kontakt aufnehmen",
      text: "Rufen Sie uns an oder senden Sie uns über das Formular eine Terminanfrage – ganz ohne Registrierung.",
    },
    {
      title: "Termin abstimmen",
      text: "Wir melden uns bei Ihnen und stimmen gemeinsam einen passenden Termin ab. Verbindlich ist er erst mit unserer Bestätigung.",
    },
    {
      title: "Die Praxis besuchen",
      text: "Am vereinbarten Tag empfangen wir Sie am Willy-Brandt-Platz 1. Fragen vorab klären wir gern telefonisch.",
    },
  ],
};

export type Faq = { q: string; a: string; confirmed: boolean; note?: string };

export const faqs: Faq[] = [
  {
    q: "Wie kann ich einen Termin vereinbaren?",
    a: `Am schnellsten erreichen Sie uns telefonisch unter ${practice.phone.display}. Alternativ senden Sie uns über das Formular auf dieser Seite eine Terminanfrage. Wir melden uns anschließend bei Ihnen, um einen passenden Termin abzustimmen.`,
    confirmed: true,
  },
  {
    q: "Ist mein Termin mit dem Absenden der Anfrage schon bestätigt?",
    a: "Nein. Ihre Anfrage ist zunächst unverbindlich. Wir melden uns bei Ihnen, um einen Termin abzustimmen – verbindlich ist er erst, wenn wir ihn Ihnen bestätigt haben.",
    confirmed: true,
  },
  {
    q: "Wann ist die Praxis geöffnet?",
    a: "Montag bis Freitag von 7:00 bis 21:00 Uhr, Samstag und Sonntag von 9:00 bis 18:00 Uhr sowie an Feiertagen von 9:00 bis 18:00 Uhr.",
    confirmed: true,
  },
  {
    q: "Wo finde ich die Praxis?",
    a: `Elara Zahnmedizin befindet sich am ${practice.address.street} in ${practice.address.postalCode} ${practice.address.city}. Über den Link „Route planen“ im Kontaktbereich gelangen Sie direkt zur Wegbeschreibung.`,
    confirmed: true,
  },
  {
    q: "Welche Behandlungen bieten Sie an?",
    a: "Unser Leistungsspektrum reicht von Prophylaxe und Parodontitis-Behandlung über Füllungen, Wurzelbehandlungen und Zahnersatz bis zu Implantaten, Oralchirurgie, Kinderzahnheilkunde und ästhetischer Zahnmedizin. Welche Behandlung für Sie sinnvoll ist, besprechen wir nach einer Untersuchung persönlich mit Ihnen.",
    confirmed: false,
    note: "Hängt von der bestätigten Leistungsliste ab.",
  },
  {
    q: "Ich habe akute Zahnschmerzen – was soll ich tun?",
    a: "Bitte rufen Sie uns während der Öffnungszeiten direkt an, damit wir das weitere Vorgehen mit Ihnen besprechen können. Das Anfrageformular ist für dringende Anliegen nicht geeignet. Außerhalb unserer Öffnungszeiten wenden Sie sich bitte an den zahnärztlichen Notdienst.",
    confirmed: false,
    note: "Bitte bestätigen, wie akute Fälle gehandhabt werden.",
  },
  // Drafts: only visible in review mode until the practice supplies the answers.
  {
    q: "Behandeln Sie gesetzlich und privat versicherte Patientinnen und Patienten?",
    a: "[Antwort der Praxis erforderlich]",
    confirmed: false,
    note: "Versicherungsfrage – Antwort muss von der Praxis kommen.",
  },
  {
    q: "Was sollte ich zum ersten Termin mitbringen?",
    a: "[Antwort der Praxis erforderlich]",
    confirmed: false,
    note: "Z. B. Versichertenkarte, Bonusheft, Medikamentenliste – bitte bestätigen.",
  },
  {
    q: "Ich habe Angst vor der Zahnbehandlung. Können Sie darauf eingehen?",
    a: "[Antwort der Praxis erforderlich]",
    confirmed: false,
    note: "Angstpatienten werden auf alldent-zahnzentrum-augsburg.de angesprochen – Angebot bitte bestätigen.",
  },
];

/** FAQs shown on the page: drafts with placeholder answers are never rendered publicly. */
export const visibleFaqs = faqs.filter(
  (f) => !f.a.startsWith("[") || integrations.reviewMode,
);

export const contact = {
  eyebrow: "Kontakt & Terminanfrage",
  title: "Wir freuen uns auf Sie.",
  intro:
    "Rufen Sie uns an oder senden Sie uns eine Terminanfrage. Wir melden uns bei Ihnen, um einen passenden Termin zu vereinbaren.",
  preferences: [
    { value: "", label: "Keine Präferenz" },
    { value: "vormittags", label: "Vormittags" },
    { value: "nachmittags", label: "Nachmittags" },
    { value: "abends", label: "Abends (ab 17 Uhr)" },
    { value: "wochenende", label: "Am Wochenende" },
  ],
};

export const seo = {
  title: "Elara Zahnmedizin – Zahnarzt in Augsburg | Termin vereinbaren",
  description:
    "Zahnarztpraxis am Willy-Brandt-Platz in Augsburg: Prophylaxe, Zahnerhaltung, Zahnersatz, Implantate und mehr. Mo–Fr 7–21 Uhr, Sa–So & Feiertage 9–18 Uhr geöffnet.",
};
