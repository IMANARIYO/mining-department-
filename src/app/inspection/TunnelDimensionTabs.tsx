import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TunnelDimensionForm from "./TunnelDimensionForm";
import TunnelComponentForm from "./TunnelComponentForm";

interface TunnelDimensionTabsProps {
  tunnelId: string;
  handleFormSubmitSuccess: () => void;
}

export default function TunnelDimensionTabs({
  tunnelId,
  handleFormSubmitSuccess
}: TunnelDimensionTabsProps) {
  const tunnelDimensionTabs = [
    { value: "tunnel-dimensions", label: "Tunnel Dimensions" },
    { value: "tunnel-components", label: "Tunnel Components" }
  ];

  return (
    <Tabs defaultValue="tunnel-dimensions" className="w-full">
      {/* Tabs Navigation */}
      <TabsList className="grid  mt-4 grid-cols-1 sm:grid-cols-2  h-full gap-2">
        {tunnelDimensionTabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="data-[state=active]:bg-amber-800 data-[state=active]:text-white data-[state=active]:border-amber-800 
              border-2 border-white flex items-center justify-center 
              text-xs sm:text-sm md:text-base 
              px-1 sm:px-2 md:px-4 
              py-1 sm:py-2 
              whitespace-normal h-auto min-h-10
              text-center">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Tabs Content */}
      <TabsContent value="tunnel-dimensions">
        <TunnelDimensionForm
          tunnelId={tunnelId}
          onSubmitSuccess={handleFormSubmitSuccess}
        />
      </TabsContent>

      <TabsContent value="tunnel-components">
        <TunnelComponentForm
          tunnelId={tunnelId}
          onSubmitSuccess={handleFormSubmitSuccess}
        />
      </TabsContent>
    </Tabs>
  );
}
