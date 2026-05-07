import { Users2 } from "lucide-react";
import PlaceholderPage from "@/components/placeholder";

export default function UserManagement() {
  return (
    <PlaceholderPage
      title="User Management"
      description="Provision users and assign roles."
      icon={Users2}
      features={[
        "Create users",
        "Assign roles",
        "Deactivate accounts",
      ]}
    />
  );
}
