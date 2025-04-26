
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { Badge } from "@/components/ui/badge";

const EntityRecognition: React.FC = () => {
  const { currentAnalysis } = useAnalysis();

  if (!currentAnalysis) return null;

  // Prepare text with entity highlighting
  const renderTextWithEntities = () => {
    if (!currentAnalysis.entities.length) {
      return <p>{currentAnalysis.text}</p>;
    }

    let lastIndex = 0;
    const textFragments = [];
    const sortedEntities = [...currentAnalysis.entities].sort((a, b) => a.start - b.start);

    sortedEntities.forEach((entity, i) => {
      // Add text before the entity
      if (entity.start > lastIndex) {
        textFragments.push(
          <span key={`text-${i}`}>
            {currentAnalysis.text.substring(lastIndex, entity.start)}
          </span>
        );
      }

      // Add the entity
      textFragments.push(
        <span
          key={`entity-${i}`}
          className={`entity-tag entity-${entity.entity}`}
          title={entity.entity}
        >
          {currentAnalysis.text.substring(entity.start, entity.end)}
        </span>
      );

      lastIndex = entity.end;
    });

    // Add any remaining text
    if (lastIndex < currentAnalysis.text.length) {
      textFragments.push(
        <span key="text-final">
          {currentAnalysis.text.substring(lastIndex)}
        </span>
      );
    }

    return <p className="leading-relaxed">{textFragments}</p>;
  };

  // Generate a list of unique entity types for the legend
  const uniqueEntityTypes = Array.from(
    new Set(currentAnalysis.entities.map((entity) => entity.entity))
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Named Entity Recognition</CardTitle>
      </CardHeader>
      <CardContent>
        {currentAnalysis.entities.length > 0 ? (
          <>
            <div className="mb-4">
              <div className="text-sm font-medium mb-2">Entity Types:</div>
              <div className="flex flex-wrap gap-2">
                {uniqueEntityTypes.map((type) => (
                  <Badge key={type} variant="outline" className="text-xs">
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="p-4 bg-muted rounded-md">
              {renderTextWithEntities()}
            </div>
          </>
        ) : (
          <div className="text-muted-foreground text-center py-4">
            No entities detected in this text.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EntityRecognition;
