import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { QueryDashboard } from "@/components/QueryDashboard";
import { AgentProcessing } from "@/components/AgentProcessing";
import { EvidenceGraph } from "@/components/EvidenceGraph";
import { ProvenanceTrail } from "@/components/ProvenanceTrail";
import { InvestmentMemo } from "@/components/InvestmentMemo";
import { useAuth } from "@/contexts/AuthContext";

type Screen = 'query' | 'processing' | 'graph' | 'provenance' | 'memo';

const Index = () => {
  const { user } = useAuth();
  const [currentScreen, setCurrentScreen] = useState<Screen>('query');
  const [molecule, setMolecule] = useState('Metformin');
  const [indication, setIndication] = useState('Oncology');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const handleRunAnalysis = useCallback((mol: string, ind: string) => {
    setMolecule(mol);
    setIndication(ind);
    setCurrentScreen('processing');
  }, []);

  const handleProcessingComplete = useCallback(() => {
    setCurrentScreen('graph');
  }, []);

  const handleViewProvenance = useCallback((nodeId: string) => {
    setSelectedNodeId(nodeId);
    setCurrentScreen('provenance');
  }, []);

  const handleGenerateMemo = useCallback(() => {
    setCurrentScreen('memo');
  }, []);

  const handleBackToGraph = useCallback(() => {
    setCurrentScreen('graph');
  }, []);

  const handleBackToProvenance = useCallback(() => {
    setCurrentScreen('provenance');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-surface">
      <Header />
      
      <main className="container py-8 px-6">
        <AnimatePresence mode="wait">
          {currentScreen === 'query' && (
            <motion.div
              key="query"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <QueryDashboard onRunAnalysis={handleRunAnalysis} />
            </motion.div>
          )}

          {currentScreen === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AgentProcessing
                molecule={molecule}
                indication={indication}
                onComplete={handleProcessingComplete}
              />
            </motion.div>
          )}

          {currentScreen === 'graph' && (
            <motion.div
              key="graph"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <EvidenceGraph 
                onViewProvenance={handleViewProvenance}
                onBack={() => setCurrentScreen('query')}
              />
            </motion.div>
          )}

          {currentScreen === 'provenance' && (
            <motion.div
              key="provenance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProvenanceTrail
                nodeId={selectedNodeId || 'metformin'}
                onBack={handleBackToGraph}
                onGenerateMemo={handleGenerateMemo}
              />
            </motion.div>
          )}

          {currentScreen === 'memo' && (
            <motion.div
              key="memo"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <InvestmentMemo
                molecule={molecule}
                indication={indication}
                onBack={handleBackToProvenance}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-8 gap-2">
          {(['query', 'processing', 'graph', 'provenance', 'memo'] as Screen[]).map((screen) => (
            <button
              key={screen}
              onClick={() => setCurrentScreen(screen)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentScreen === screen 
                  ? 'bg-primary w-8' 
                  : 'bg-muted hover:bg-muted-foreground/50'
              }`}
              title={screen.charAt(0).toUpperCase() + screen.slice(1)}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;