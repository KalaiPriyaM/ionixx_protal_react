import { Gauge } from "lucide-react";
import PlaceholderPage from "@/components/placeholder";

export default function KpiMonitoring() {
  return (
    <PlaceholderPage
      title="KPI Monitoring"
      description="Track workforce KPIs — attrition, productivity, and more."
      icon={Gauge}
      features={[
        "Workforce KPIs at a glance",
        "Attrition and productivity tracking",
        "Drilldown into trouble spots",
      ]}
    />
  );
}
