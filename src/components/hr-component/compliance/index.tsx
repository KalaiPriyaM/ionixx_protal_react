import { ShieldCheck } from "lucide-react";
import PlaceholderPage from "@/components/placeholder";

export default function Compliance() {
  return (
    <PlaceholderPage
      title="Compliance"
      description="Maintain compliance documents and audit trails."
      icon={ShieldCheck}
      features={[
        "Upload compliance documents (FR-27)",
        "Monitor compliance status (FR-28)",
        "Generate audit logs (FR-29)",
      ]}
    />
  );
}
