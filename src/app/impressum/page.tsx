import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { impressum } from "@/content/legal";

export const metadata: Metadata = {
  title: "Impressum | Elara Zahnmedizin",
};

export default function Page() {
  return <LegalPage title="Impressum" sections={impressum} />;
}
