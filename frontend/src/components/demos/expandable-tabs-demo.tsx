import { Zap, Code, Database, Palette, Globe, Rocket, Shield } from "lucide-react";
import { ExpandableTabs } from "@/components/ui/expandable-tabs";

export function ExpandableTabsDemo() {
  const tabs = [
    { title: "React", icon: Code },
    { title: "TypeScript", icon: Code },
    { type: "separator" as const },
    { title: "Solana", icon: Globe },
    { title: "Node.js", icon: Database },
    { title: "Anchor", icon: Shield },
    { type: "separator" as const },
    { title: "Tailwind", icon: Palette },
    { title: "Vite", icon: Zap },
    { title: "Rust", icon: Rocket }
  ];

  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <h3 className="text-lg font-semibold text-primary-800 mb-4">Technology Stack</h3>
      <p className="text-sm text-primary-600 mb-6 text-center max-w-2xl">
        Cutting-edge tools and frameworks powering our platform
      </p>
      <ExpandableTabs 
        tabs={tabs} 
        activeColor="text-accent-500"
        className="border-primary-200 bg-white/50 backdrop-blur-sm shadow-elegant" 
      />
    </div>
  );
}
