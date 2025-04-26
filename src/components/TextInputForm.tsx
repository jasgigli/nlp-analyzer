
import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAnalysis } from "@/contexts/AnalysisContext";
import { Loader } from "lucide-react";

const TextInputForm: React.FC = () => {
  const { text, setText, performAnalysis, isAnalyzing } = useAnalysis();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performAnalysis();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Textarea
          placeholder="Enter text to analyze..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px]"
          disabled={isAnalyzing}
        />
      </div>
      <Button 
        type="submit" 
        disabled={!text.trim() || isAnalyzing} 
        className="w-full"
      >
        {isAnalyzing ? (
          <>
            <Loader className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          "Analyze Text"
        )}
      </Button>
    </form>
  );
};

export default TextInputForm;
