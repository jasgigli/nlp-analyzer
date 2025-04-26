
import React from "react";
import { File, Book, Code } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="border-b py-4">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-nlp-accent rounded-md p-1">
              <File className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold">TextAnalysisCraft</h1>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="#" 
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Book className="mr-1 h-4 w-4" />
              Documentation
            </a>
            <a 
              href="#" 
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <Code className="mr-1 h-4 w-4" />
              API
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
