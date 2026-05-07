import { Briefcase } from "lucide-react";
import PlaceholderPage from "@/components/placeholder";

export default function Recruitment() {
  return (
    <PlaceholderPage
      title="Recruitment"
      description="Manage the full hiring lifecycle from posting to onboarding."
      icon={Briefcase}
      features={[
        "Create job postings (FR-14)",
        "Track candidates (FR-15)",
        "Schedule interviews (FR-16)",
        "Select candidates and onboard (FR-17, FR-18)",
      ]}
    />
  );
}
