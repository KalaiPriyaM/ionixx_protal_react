import { GraduationCap } from "lucide-react";
import PlaceholderPage from "@/components/placeholder";

export default function Training() {
  return (
    <PlaceholderPage
      title="Training"
      description="Author courses, assign learners, and track completion."
      icon={GraduationCap}
      features={[
        "Create courses (FR-23)",
        "Assign employees",
        "Track completion progress",
      ]}
    />
  );
}
