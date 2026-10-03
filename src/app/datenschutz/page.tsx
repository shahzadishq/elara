import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { datenschutz } from "@/content/legal";

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Elara Zahnmedizin",
};

export default function Page() {
  return <LegalPage title="Datenschutzerklärung" sections={datenschutz} />;
}
