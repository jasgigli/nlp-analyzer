
import React, { createContext, useContext, useState } from "react";

export type POSTag = {
  word: string;
  tag: string;
  type: string;
};

export type EntityTag = {
  word: string;
  entity: string;
  start: number;
  end: number;
};

export type SyntaxNode = {
  word: string;
  tag: string;
  children: SyntaxNode[];
  relation?: string;
};

export type SentimentScore = {
  score: number;
  comparative: number;
  positive: string[];
  negative: string[];
};

export type AnalysisResult = {
  id: string;
  text: string;
  timestamp: Date;
  posTagging: POSTag[];
  entities: EntityTag[];
  syntax: SyntaxNode;
  sentiment: SentimentScore;
  summary?: string;
  keywords?: string[];
};

export type AnalysisContextType = {
  text: string;
  setText: (text: string) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  currentAnalysis: AnalysisResult | null;
  setCurrentAnalysis: (analysis: AnalysisResult | null) => void;
  analysisHistory: AnalysisResult[];
  addToHistory: (analysis: AnalysisResult) => void;
  clearHistory: () => void;
  removeFromHistory: (id: string) => void;
  performAnalysis: () => Promise<void>;
};

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export const AnalysisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [text, setText] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>([]);

  const addToHistory = (analysis: AnalysisResult) => {
    setAnalysisHistory((prev) => [analysis, ...prev]);
  };

  const clearHistory = () => {
    setAnalysisHistory([]);
  };

  const removeFromHistory = (id: string) => {
    setAnalysisHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const performAnalysis = async () => {
    if (!text.trim() || isAnalyzing) return;

    setIsAnalyzing(true);
    
    try {
      // In a real app, we'd call the backend API here
      // For now, we'll directly use client-side processing
      const result = await analyzeText(text);
      setCurrentAnalysis(result);
      addToHistory(result);
    } catch (error) {
      console.error("Error analyzing text:", error);
      // In a real app, we'd display an error toast here
    } finally {
      setIsAnalyzing(false);
    }
  };

  // This is a mock function for client-side processing
  // In a real app, this would be an API call to the backend
  const analyzeText = async (text: string): Promise<AnalysisResult> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const wordList = text.split(/\s+/).filter(Boolean);
    
    // Mock POS tagging
    const posTypes = ["noun", "verb", "adjective", "adverb", "pronoun", "preposition", "conjunction", "determiner", "other"];
    const posTags = ["NN", "VB", "JJ", "RB", "PRP", "IN", "CC", "DT", "OTHER"];
    
    const posTagging = wordList.map((word) => {
      const randomIndex = Math.floor(Math.random() * posTypes.length);
      return {
        word,
        tag: posTags[randomIndex],
        type: posTypes[randomIndex],
      };
    });
    
    // Mock entity recognition
    const entityTypes = ["person", "organization", "location", "date", "time", "money", "percent", "other"];
    const entities: EntityTag[] = [];
    let textCopy = text;
    let startIndex = 0;
    
    // Create random entities (about 10% of words)
    wordList.forEach((word, idx) => {
      if (Math.random() > 0.9) {
        const start = textCopy.indexOf(word, startIndex);
        if (start !== -1) {
          const end = start + word.length;
          const entityType = entityTypes[Math.floor(Math.random() * entityTypes.length)];
          entities.push({
            word,
            entity: entityType,
            start,
            end,
          });
          startIndex = end;
        }
      }
    });
    
    // Mock syntax tree
    const createSyntaxTree = (words: string[], depth = 0): SyntaxNode => {
      if (words.length <= 1 || depth > 3) {
        return {
          word: words[0] || "",
          tag: posTags[Math.floor(Math.random() * posTags.length)],
          children: [],
          relation: "leaf",
        };
      }
      
      const mid = Math.floor(words.length / 2);
      const leftWords = words.slice(0, mid);
      const rightWords = words.slice(mid + 1);
      
      return {
        word: words[mid],
        tag: posTags[Math.floor(Math.random() * posTags.length)],
        relation: ["subj", "pred", "obj", "mod"][Math.floor(Math.random() * 4)],
        children: [
          leftWords.length > 0 ? createSyntaxTree(leftWords, depth + 1) : null,
          rightWords.length > 0 ? createSyntaxTree(rightWords, depth + 1) : null,
        ].filter(Boolean) as SyntaxNode[],
      };
    };
    
    const syntax = createSyntaxTree(wordList);
    
    // Mock sentiment analysis
    let sentimentScore = Math.random() * 2 - 1; // -1 to 1
    const positive = wordList.filter(() => Math.random() > 0.7);
    const negative = wordList.filter(() => Math.random() > 0.7);
    
    const sentiment = {
      score: sentimentScore,
      comparative: sentimentScore / wordList.length,
      positive,
      negative,
    };
    
    // Mock summary and keywords
    const summary = wordList.length > 10 
      ? text.split(". ").slice(0, 2).join(". ") + "."
      : text;
      
    const keywords = wordList
      .filter(() => Math.random() > 0.7)
      .slice(0, 5);
      
    return {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      posTagging,
      entities,
      syntax,
      sentiment,
      summary,
      keywords,
    };
  };

  const value = {
    text,
    setText,
    isAnalyzing,
    setIsAnalyzing,
    currentAnalysis,
    setCurrentAnalysis,
    analysisHistory,
    addToHistory,
    clearHistory,
    removeFromHistory,
    performAnalysis,
  };

  return <AnalysisContext.Provider value={value}>{children}</AnalysisContext.Provider>;
};

export const useAnalysis = () => {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
};
