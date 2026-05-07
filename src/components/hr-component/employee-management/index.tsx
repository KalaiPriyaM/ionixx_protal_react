import { UserCog } from "lucide-react";
import PlaceholderPage from "@/components/placeholder";

export default function EmployeeManagement() {
  return (
    <PlaceholderPage
      title="Employee Management"
      description="Create and maintain employee records and documents."
      icon={UserCog}
      features={[
        "Create employee records (FR-1)",
        "Update profile and employment data (FR-2)",
        "Manage employee documents (FR-4)",
      ]}
    />
  );
}
