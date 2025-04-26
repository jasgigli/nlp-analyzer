
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const SentimentAnalysis: React.FC = () => {
  const { currentAnalysis } = useAnalysis();

  if (!currentAnalysis) return null;

  const { sentiment } = currentAnalysis;
  const normalizedScore = ((sentiment.score + 1) / 2) * 100; // Convert from -1...1 to 0...100

  const getSentimentLabel = () => {
    if (sentiment.score > 0.33) return "Positive";
    if (sentiment.score < -0.33) return "Negative";
    return "Neutral";
  };

  const getSentimentColor = () => {
    if (sentiment.score > 0.33) return "bg-green-500";
    if (sentiment.score < -0.33) return "bg-red-500";
    return "bg-yellow-500";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Sentiment Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm text-red-500">Negative</span>
            <span className="text-sm text-yellow-500">Neutral</span>
            <span className="text-sm text-green-500">Positive</span>
          </div>
          <Progress 
            value={normalizedScore} 
            className="h-3" 
            indicatorClassName={getSentimentColor()} 
          />
          <div className="mt-2 text-center">
            <Badge className={getSentimentColor().replace('bg-', 'bg-opacity-80 bg-')}>
              {getSentimentLabel()} ({sentiment.score.toFixed(2)})
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium mb-2">Positive Words:</h4>
            {sentiment.positive.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {sentiment.positive.map((word, i) => (
                  <Badge key={i} variant="outline" className="bg-green-50">
                    {word}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No positive words detected.</p>
            )}
          </div>
          <div>
            <h4 className="text-sm font-medium mb-2">Negative Words:</h4>
            {sentiment.negative.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {sentiment.negative.map((word, i) => (
                  <Badge key={i} variant="outline" className="bg-red-50">
                    {word}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No negative words detected.</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentAnalysis;
