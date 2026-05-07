import { ScrollText } from "lucide-react";
import PlaceholderPage from "@/components/placeholder";

export default function Logs() {
  return (
    <PlaceholderPage
      title="Logs & Monitoring"
      description="Audit logs and system health (FR-29)."
      icon={ScrollText}
      features={[
        "View audit logs (FR-29)",
        "Monitor system health",
        "Export logs for review",
      ]}
    />
  );
}
