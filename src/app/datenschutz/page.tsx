import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

// TODO(launch): replace with the practice's approved Datenschutzerklärung text.
export const metadata: Metadata = {
  title: "Datenschutzerklärung | Elara Zahnmedizin",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPlaceholder title="Datenschutzerklärung" />;
}
