import { Settings } from "lucide-react";
import PlaceholderPage from "@/components/placeholder";

export default function SystemConfig() {
  return (
    <PlaceholderPage
      title="System Configuration"
      description="Configure modules and workflow rules."
      icon={Settings}
      features={[
        "Toggle modules on or off",
        "Author workflow rules",
        "Set system defaults",
      ]}
    />
  );
}
