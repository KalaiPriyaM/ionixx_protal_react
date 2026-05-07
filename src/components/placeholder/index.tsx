import React from "react";
import MainLayout from "@/components/layout/main-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Construction, type LucideIcon } from "lucide-react";

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  features?: string[];
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, description, icon: Icon, features }) => {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="bg-gradient-to-r from-[#464EB8] via-[#3FCCE8] to-[#505AC9] rounded-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Icon className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-white/90 mt-1">{description}</p>
            </div>
          </div>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Construction className="h-5 w-5 text-amber-500" />
              <span>Coming soon</span>
              <Badge className="bg-amber-100 text-amber-800 ml-2">In development</Badge>
            </CardTitle>
            <CardDescription>
              This module is scaffolded — the full UI is on the roadmap.
            </CardDescription>
          </CardHeader>
          {features && features.length > 0 && (
            <CardContent>
              <p className="text-sm font-medium text-gray-700 mb-3">Planned features</p>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#464EB8] mt-0.5">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          )}
        </Card>
      </div>
    </MainLayout>
  );
};

export default PlaceholderPage;
