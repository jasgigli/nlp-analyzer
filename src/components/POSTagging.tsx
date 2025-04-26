
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { Badge } from "@/components/ui/badge";

const POSTagging: React.FC = () => {
  const { currentAnalysis } = useAnalysis();

  if (!currentAnalysis) return null;

  const tagMappings: Record<string, string> = {
    NN: "Noun",
    VB: "Verb",
    JJ: "Adjective",
    RB: "Adverb",
    PRP: "Pronoun",
    IN: "Preposition",
    CC: "Conjunction",
    DT: "Determiner",
    OTHER: "Other",
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Parts of Speech Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Tag Legend:</div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(tagMappings).map(([tag, description]) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag} - {description}
              </Badge>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-muted rounded-md">
          <div className="space-y-1">
            {currentAnalysis.posTagging.map((pos, index) => (
              <span 
                key={index} 
                className={`pos-tag pos-${pos.type}`}
                title={tagMappings[pos.tag] || pos.tag}
              >
                {pos.word} <span className="text-xs opacity-80">{pos.tag}</span>
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default POSTagging;
