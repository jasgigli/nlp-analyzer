
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="keywords">Keywords</TabsTrigger>
            <TabsTrigger value="readability">Readability</TabsTrigger>
            <TabsTrigger value="language">Language</TabsTrigger>
          </TabsList>
          
          <TabsContent value="summary" className="p-4 mt-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Text Summary</h4>
            <p>{currentAnalysis.summary}</p>
          </TabsContent>

          <TabsContent value="keywords" className="p-4 mt-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Keywords</h4>
            <div className="flex flex-wrap gap-2">
              {currentAnalysis.keywords?.map((keyword, index) => (
                <Badge key={index} variant="secondary">{keyword}</Badge>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="readability" className="p-4 mt-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Readability Analysis</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Readability Score</span>
                  <span className="text-sm font-medium">{currentAnalysis.readability?.score.toFixed(1)}</span>
                </div>
                <Progress value={currentAnalysis.readability?.score} className="h-2" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Reading Level</p>
                  <p className="font-medium">{currentAnalysis.readability?.level}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Sentence Length</p>
                  <p className="font-medium">{currentAnalysis.readability?.avgSentenceLength.toFixed(1)} words</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="language" className="p-4 mt-4 bg-muted rounded-md">
            <h4 className="font-medium mb-2">Language Detection</h4>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-muted-foreground">Detected Language:</span>
                <span className="ml-2 font-medium">{currentAnalysis.languageDetection?.language}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Confidence:</span>
                <span className="ml-2 font-medium">{(currentAnalysis.languageDetection?.confidence * 100).toFixed(1)}%</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdditionalFeatures;
