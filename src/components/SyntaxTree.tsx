
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { SyntaxNode } from "@/contexts/AnalysisContext";

const SyntaxTree: React.FC = () => {
  const { currentAnalysis } = useAnalysis();

  if (!currentAnalysis) return null;

  const renderNode = (node: SyntaxNode) => {
    return (
      <li>
        <div className="inline-flex items-center p-1 rounded bg-muted">
          <span className="font-mono">{node.word}</span>
          <span className="ml-2 px-1 text-xs bg-secondary text-secondary-foreground rounded">
            {node.tag}
          </span>
          {node.relation && (
            <span className="ml-2 px-1 text-xs bg-primary text-primary-foreground rounded">
              {node.relation}
            </span>
          )}
        </div>
        {node.children.length > 0 && (
          <ul>
            {node.children.map((child, i) => (
              <React.Fragment key={i}>{renderNode(child)}</React.Fragment>
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Syntax Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="syntax-tree-container">
          <div className="syntax-tree">
            <ul>{renderNode(currentAnalysis.syntax)}</ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SyntaxTree;
