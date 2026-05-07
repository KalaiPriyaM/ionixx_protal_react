import { Lock } from "lucide-react";
import PlaceholderPage from "@/components/placeholder";

export default function RolesPermissions() {
  return (
    <PlaceholderPage
      title="Role & Permissions"
      description="Define role-based access control."
      icon={Lock}
      features={[
        "Define RBAC policies",
        "Assign access per module",
        "Review effective permissions",
      ]}
    />
  );
}
