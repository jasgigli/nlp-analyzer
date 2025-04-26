
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdditionalFeatures: React.FC = () => {
  const { currentAnalysis } = useAnalysis();

  if (!currentAnalysis) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Additional Analysis Features</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="summary">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
          </TabsList>
          <TabsContent value="summary" className="p-4 mt-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Text Summary</h4>
            <p>{currentAnalysis.summary}</p>
          </TabsContent>
          <TabsContent value="keywords" className="p-4 mt-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {currentAnalysis.keywords?.map((keyword, index) => (
                <Badge key={index}>{keyword}</Badge>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdditionalFeatures;
