import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { QueryDashboard } from "@/components/QueryDashboard";
import { AgentProcessing } from "@/components/AgentProcessing";
import { EvidenceGraph } from "@/components/EvidenceGraph";
import { ProvenanceTrail } from "@/components/ProvenanceTrail";
import { InvestmentMemo } from "@/components/InvestmentMemo";
import { motion, AnimatePresence } from "framer-motion";

type Screen = 'query' | 'processing' | 'graph' | 'provenance' | 'memo';

const Index = () => {
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <QueryDashboard onRunAnalysis={handleRunAnalysis} />
            </motion.div>
          )}

          {currentScreen === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <EvidenceGraph onViewProvenance={handleViewProvenance} />
            </motion.div>
          )}

          {currentScreen === 'provenance' && (
            <motion.div
              key="provenance"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <InvestmentMemo
                molecule={molecule}
                indication={indication}
                onBack={handleBackToProvenance}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
