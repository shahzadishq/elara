/**
 * Impressum and Datenschutz content.
 *
 * Source: landsberger-medienagentur.de/impressum and /datenschutz (supplied by
 * the client, October 2026). The Impressum is taken over as published. The
 * Datenschutz text follows the source, but sections describing the agency's own
 * website (IONOS hosting, newsletter, social-media embeds) were adapted or left
 * out so the statement matches what this site actually does. Please have both
 * texts legally reviewed before launch.
 */

export type LegalBlock =
  | { type: "p"; text: string }
  | { type: "lines"; lines: string[] }
  | { type: "list"; items: string[] }
  | { type: "link"; label?: string; href: string };

export type LegalSection = { heading: string; blocks: LegalBlock[] };

const provider = [
  "Landsberger Medienagentur",
  "Inhaber: Ioan Meyer",
  "Akeleistraße 3",
  "86899 Landsberg am Lech",
  "Deutschland",
];

export const impressum: LegalSection[] = [
  {
    heading: "Angaben gemäß § 5 TMG",
    blocks: [
      { type: "lines", lines: provider },
      {
        type: "lines",
        lines: [
          "Telefon: +49 1523 4273671",
          "Telefon: +49 1573 3218826",
          "E-Mail: info@landsberger-medienagentur.de",
        ],
      },
      { type: "p", text: "Vertreten durch: Ioan Meyer (Inhaber)" },
    ],
  },
  {
    heading: "Berufsbezeichnung und Tätigkeitsbeschreibung",
    blocks: [
      {
        type: "p",
        text: "Die Landsberger Medienagentur ist eine Full-Service-Agentur mit Fokus auf Webdesign, Online-Marketing, Social Media Management, Grafikdesign sowie der Entwicklung und Betreuung digitaler Projekte für Unternehmen unterschiedlichster Branchen.",
      },
    ],
  },
  {
    heading: "EU-Streitschlichtung",
    blocks: [
      {
        type: "p",
        text: "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:",
      },
      { type: "link", href: "https://ec.europa.eu/consumers/odr/" },
      {
        type: "p",
        text: "Unsere E-Mail-Adresse finden Sie oben im Impressum. Verbraucher haben die Möglichkeit, diese Plattform für die Beilegung ihrer Streitigkeiten zu nutzen. Wir sind jedoch weder verpflichtet noch bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
      },
    ],
  },
  {
    heading: "Haftung für Inhalte",
    blocks: [
      {
        type: "p",
        text: "Als Diensteanbieter sind wir gemäß § 7 Abs. 1 Telemediengesetz (TMG) für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.",
      },
      {
        type: "p",
        text: "Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte unverzüglich entfernen.",
      },
    ],
  },
  {
    heading: "Haftung für Links",
    blocks: [
      {
        type: "p",
        text: "Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.",
      },
      {
        type: "p",
        text: "Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.",
      },
    ],
  },
  {
    heading: "Urheberrecht",
    blocks: [
      {
        type: "p",
        text: "Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche gekennzeichnet. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der vorherigen schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.",
      },
      {
        type: "p",
        text: "Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.",
      },
    ],
  },
  {
    heading: "Hinweis zum Einsatz von Künstlicher Intelligenz (KI)",
    blocks: [
      {
        type: "p",
        text: "Auf dieser Website können teilweise mit Unterstützung künstlicher Intelligenz (KI) erstellte oder überarbeitete Texte, Bilder und Grafiken verwendet werden. Sämtliche Inhalte werden vor der Veröffentlichung sorgfältig geprüft und redaktionell überarbeitet. Die dargestellten Inhalte dienen der Information und Veranschaulichung und stellen, sofern nicht ausdrücklich anders angegeben, keine verbindlichen Leistungszusagen oder realen Arbeitsergebnisse dar.",
      },
      {
        type: "p",
        text: "Sollten trotz sorgfältiger Prüfung Rechte Dritter verletzt werden, bitten wir um einen entsprechenden Hinweis. Die betroffenen Inhalte werden nach Prüfung selbstverständlich umgehend entfernt oder angepasst.",
      },
    ],
  },
  {
    heading: "Bildnachweise",
    blocks: [
      {
        type: "p",
        text: "Verwendete Bilder und Grafiken stammen entweder aus eigenen Quellen oder aus lizenzierten Bilddatenbanken. Sofern erforderlich, werden entsprechende Urheberangaben direkt bei den jeweiligen Inhalten gemacht.",
      },
    ],
  },
  {
    heading: "Technische Umsetzung",
    blocks: [
      {
        type: "p",
        text: "Diese Website wurde technisch umgesetzt und wird regelmäßig gewartet, um eine sichere und stabile Nutzung zu gewährleisten. Trotz größter Sorgfalt können technische Fehler oder Ausfälle nicht vollständig ausgeschlossen werden.",
      },
    ],
  },
  {
    heading: "Rechtswirksamkeit dieses Impressums",
    blocks: [
      {
        type: "p",
        text: "Dieses Impressum ist als Teil des Internetangebotes zu betrachten, von dem aus auf diese Seite verwiesen wurde. Sollten einzelne Formulierungen oder Teile dieses Textes der geltenden Rechtslage nicht, nicht mehr oder nicht vollständig entsprechen, bleiben die übrigen Teile des Dokumentes in ihrem Inhalt und ihrer Gültigkeit davon unberührt.",
      },
    ],
  },
];

export const datenschutz: LegalSection[] = [
  {
    heading: "1. Datenschutz auf einen Blick",
    blocks: [
      {
        type: "p",
        text: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.",
      },
    ],
  },
  {
    heading: "2. Verantwortliche Stelle",
    blocks: [
      { type: "p", text: "Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber:" },
      { type: "lines", lines: [...provider, "E-Mail: info@landsberger-medienagentur.de"] },
    ],
  },
  {
    heading: "3. Datenerfassung auf unserer Website",
    blocks: [
      {
        type: "p",
        text: "Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z. B. durch Eingabe in das Anfrageformular. Andere Daten werden automatisch beim Besuch der Website durch die IT-Systeme des Hosting-Anbieters erfasst (z. B. Browser, Betriebssystem, Uhrzeit des Seitenaufrufs).",
      },
    ],
  },
  {
    heading: "4. Hosting",
    blocks: [
      { type: "p", text: "Diese Website wird bei folgendem Anbieter gehostet:" },
      {
        type: "lines",
        lines: [
          "GitHub Pages – GitHub, Inc.",
          "88 Colin P. Kelly Jr. Street",
          "San Francisco, CA 94107",
          "USA",
        ],
      },
      {
        type: "p",
        text: "Beim Besuch unserer Website erfasst der Hosting-Anbieter verschiedene Logfiles (z. B. IP-Adresse, Datum, Uhrzeit). Die Nutzung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.",
      },
    ],
  },
  {
    heading: "5. Cookies, Schriftarten und externe Links",
    blocks: [
      {
        type: "p",
        text: "Diese Website setzt keine Tracking- oder Marketing-Cookies. Die verwendeten Schriftarten werden direkt von dieser Website geladen; dabei wird keine Verbindung zu Servern von Google Fonts hergestellt.",
      },
      {
        type: "p",
        text: "Über den Link „Route planen“ gelangen Sie zu Google Maps (Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland). Daten werden erst dann an Google übertragen, wenn Sie diesen Link anklicken.",
      },
    ],
  },
  {
    heading: "6. Anfrageformular",
    blocks: [
      {
        type: "p",
        text: "Wenn Sie uns über das Anfrageformular eine Terminanfrage senden, werden Ihre Angaben inklusive der angegebenen Kontaktdaten gespeichert, um Ihre Anfrage zu bearbeiten und Sie zur Terminabstimmung zu kontaktieren. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO.",
      },
      {
        type: "p",
        text: "Bitte übermitteln Sie über das Formular keine vertraulichen Gesundheitsinformationen. Details zu Ihrem Anliegen besprechen wir gern persönlich.",
      },
    ],
  },
  {
    heading: "7. Anfrage per E-Mail oder Telefon",
    blocks: [
      {
        type: "p",
        text: "Wenn Sie uns kontaktieren, werden Ihre Daten zur Bearbeitung Ihrer Anfrage gespeichert. Die Verarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. b DSGVO.",
      },
    ],
  },
  {
    heading: "8. Ihre Rechte",
    blocks: [
      { type: "p", text: "Sie haben jederzeit das Recht auf:" },
      {
        type: "list",
        items: [
          "Auskunft über Ihre gespeicherten Daten",
          "Berichtigung falscher Daten",
          "Löschung Ihrer Daten",
          "Einschränkung der Verarbeitung",
          "Datenübertragbarkeit",
          "Widerruf Ihrer Einwilligung",
        ],
      },
    ],
  },
  {
    heading: "9. Widerspruchsrecht (Art. 21 DSGVO)",
    blocks: [
      {
        type: "p",
        text: "Sie haben das Recht, jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen.",
      },
    ],
  },
  {
    heading: "10. Beschwerderecht",
    blocks: [{ type: "p", text: "Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren." }],
  },
  {
    heading: "11. SSL- bzw. TLS-Verschlüsselung",
    blocks: [{ type: "p", text: "Diese Website nutzt SSL- bzw. TLS-Verschlüsselung zum Schutz Ihrer Daten." }],
  },
  {
    heading: "12. Speicherdauer",
    blocks: [
      {
        type: "p",
        text: "Ihre Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.",
      },
    ],
  },
  {
    heading: "13. Änderungen",
    blocks: [
      { type: "p", text: "Wir behalten uns vor, diese Datenschutzerklärung jederzeit anzupassen." },
    ],
  },
];
