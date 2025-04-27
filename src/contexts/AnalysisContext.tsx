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
  summary: string;
  keywords: string[];
  readability?: {
    score: number;
    level: string;
    avgSentenceLength: number;
    avgWordLength: number;
  };
  languageDetection?: {
    language: string;
    confidence: number;
  };
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
      const result = await analyzeText(text);
      setCurrentAnalysis(result);
      addToHistory(result);
    } catch (error) {
      console.error("Error analyzing text:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeText = async (text: string): Promise<AnalysisResult> => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const wordList = text.split(/\s+/).filter(Boolean);
    
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
    
    const entityTypes = ["person", "organization", "location", "date", "time", "money", "percent", "other"];
    const entities: EntityTag[] = [];
    let textCopy = text;
    let startIndex = 0;
    
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
    
    let sentimentScore = Math.random() * 2 - 1;
    const positive = wordList.filter(() => Math.random() > 0.7);
    const negative = wordList.filter(() => Math.random() > 0.7);
    
    const sentiment = {
      score: sentimentScore,
      comparative: sentimentScore / wordList.length,
      positive,
      negative,
    };
    
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const summary = sentences.length > 3 
      ? sentences.slice(0, 3).join(". ") + "."
      : text;

    const words = text.toLowerCase().split(/\W+/).filter(word => 
      word.length > 3 && !["the", "and", "but", "for", "that", "this"].includes(word)
    );
    const uniqueWords = Array.from(new Set(words));
    const keywords = uniqueWords
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    const readability = {
      score: Math.random() * 100,
      level: ["Elementary", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)],
      avgSentenceLength: sentences.reduce((acc, sent) => acc + sent.split(" ").length, 0) / sentences.length,
      avgWordLength: words.reduce((acc, word) => acc + word.length, 0) / words.length
    };

    const languageDetection = {
      language: "English",
      confidence: 0.95
    };

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
      readability,
      languageDetection,
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
