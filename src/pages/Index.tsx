
import React, { useState } from "react";
import TextInputForm from "@/components/TextInputForm";
import POSTagging from "@/components/POSTagging";
import SyntaxTree from "@/components/SyntaxTree";
import EntityRecognition from "@/components/EntityRecognition";
import SentimentAnalysis from "@/components/SentimentAnalysis";
import AdditionalFeatures from "@/components/AdditionalFeatures";
import HistoryPanel from "@/components/HistoryPanel";
import Header from "@/components/Header";
import { AnalysisProvider, useAnalysis } from "@/contexts/AnalysisContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText } from "lucide-react"; // Import the FileText icon from lucide-react

const ExampleAnalysis = () => {
  const { currentAnalysis } = useAnalysis();
  
  if (!currentAnalysis) {
    return (
      <Card className="col-span-2 flex flex-col items-center justify-center p-10 text-center">
        <div className="rounded-full bg-primary/10 p-6 mb-4">
          <FileText className="h-12 w-12 text-primary" />
        </div>
        <CardTitle className="mb-2">No Text Analyzed Yet</CardTitle>
        <CardDescription className="max-w-md">
          Enter some text in the form on the left and click "Analyze Text" to see the NLP analysis results here.
        </CardDescription>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Analyzed Text</CardTitle>
        </CardHeader>
        <CardContent className="p-4 bg-muted rounded-md">
          <p className="whitespace-pre-wrap">{currentAnalysis.text}</p>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="pos" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="pos">POS Tags</TabsTrigger>
          <TabsTrigger value="entity">Entities</TabsTrigger>
          <TabsTrigger value="syntax">Syntax</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="additional">Additional</TabsTrigger>
        </TabsList>
        <TabsContent value="pos">
          <POSTagging />
        </TabsContent>
        <TabsContent value="entity">
          <EntityRecognition />
        </TabsContent>
        <TabsContent value="syntax">
          <SyntaxTree />
        </TabsContent>
        <TabsContent value="sentiment">
          <SentimentAnalysis />
        </TabsContent>
        <TabsContent value="additional">
          <AdditionalFeatures />
        </TabsContent>
      </Tabs>
    </div>
  );
};

const Index = () => {
  return (
    <AnalysisProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 container py-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Text Analysis</CardTitle>
                  <CardDescription>Enter text to analyze using NLP techniques</CardDescription>
                </CardHeader>
                <CardContent>
                  <TextInputForm />
                </CardContent>
              </Card>
              <HistoryPanel />
            </div>
            <div className="col-span-2">
              <ExampleAnalysis />
            </div>
          </div>
        </main>
        <footer className="border-t py-4 text-center text-sm text-muted-foreground">
          <div className="container">
            TextAnalysisCraft - Natural Language Processing Tool &copy; {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </AnalysisProvider>
  );
};

export default Index;
