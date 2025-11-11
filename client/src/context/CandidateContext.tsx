import { createContext, useContext, useState, ReactNode } from "react";
import { CandidateEvaluation } from "@shared/schema";

interface CandidateContextType {
  candidates: CandidateEvaluation[];
  setCandidates: (candidates: CandidateEvaluation[]) => void;
  sessionId: string | null;
  setSessionId: (id: string | null) => void;
}

const CandidateContext = createContext<CandidateContextType | undefined>(undefined);

export function CandidateProvider({ children }: { children: ReactNode }) {
  const [candidates, setCandidates] = useState<CandidateEvaluation[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);

  return (
    <CandidateContext.Provider value={{ candidates, setCandidates, sessionId, setSessionId }}>
      {children}
    </CandidateContext.Provider>
  );
}

export function useCandidates() {
  const context = useContext(CandidateContext);
  if (context === undefined) {
    throw new Error("useCandidates must be used within a CandidateProvider");
  }
  return context;
}
