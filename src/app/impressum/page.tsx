import type { Metadata } from "next";
import { LegalPlaceholder } from "@/components/LegalPlaceholder";

// TODO(launch): replace with the practice's approved Impressum text.
export const metadata: Metadata = {
  title: "Impressum | Elara Zahnmedizin",
  robots: { index: false, follow: true },
};

export default function Page() {
  return <LegalPlaceholder title="Impressum" />;
}
