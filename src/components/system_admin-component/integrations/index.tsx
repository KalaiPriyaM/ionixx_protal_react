import { Plug } from "lucide-react";
import PlaceholderPage from "@/components/placeholder";

export default function Integrations() {
  return (
    <PlaceholderPage
      title="Integrations"
      description="Connect ERP, payroll, and IAM systems."
      icon={Plug}
      features={[
        "Set up API connections",
        "Manage ERP, payroll, and IAM links",
        "Monitor integration health",
      ]}
    />
  );
}
