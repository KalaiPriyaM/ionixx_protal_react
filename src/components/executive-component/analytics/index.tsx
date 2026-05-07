import { LineChart } from "lucide-react";
import PlaceholderPage from "@/components/placeholder";

export default function Analytics() {
  return (
    <PlaceholderPage
      title="Analytics"
      description="Trends, forecasting, and workforce insights."
      icon={LineChart}
      features={[
        "Spot trends across departments",
        "Forecast headcount and attrition",
        "Slice metrics by time and team",
      ]}
    />
  );
}
