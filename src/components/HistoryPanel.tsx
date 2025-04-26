
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { Button } from "@/components/ui/button";
import { Trash2, Clock } from "lucide-react";

const HistoryPanel: React.FC = () => {
  const { analysisHistory, setCurrentAnalysis, removeFromHistory, clearHistory } = useAnalysis();

  if (analysisHistory.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Analysis History</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8 text-muted-foreground">
          <Clock className="mx-auto h-12 w-12 mb-3 opacity-50" />
          <p>No analysis history yet. Analyze some text to see your history here.</p>
        </CardContent>
      </Card>
    );
  }

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const truncateText = (text: string, maxLength = 100) => {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Analysis History</CardTitle>
        <Button variant="outline" size="sm" onClick={clearHistory}>
          Clear All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {analysisHistory.map((item) => (
            <div key={item.id} className="border rounded-md p-3 hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-grow cursor-pointer" onClick={() => setCurrentAnalysis(item)}>
                  <p className="font-medium mb-1">{truncateText(item.text)}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(item.timestamp)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 flex-shrink-0"
                  onClick={() => removeFromHistory(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HistoryPanel;
