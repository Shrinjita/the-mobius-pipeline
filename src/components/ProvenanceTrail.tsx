import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, CheckCircle, ExternalLink, FileText, Download, Flag } from "lucide-react";
import { provenanceSources } from "@/data/mockData";

interface ProvenanceTrailProps {
  nodeId: string;
  onBack: () => void;
  onGenerateMemo: () => void;
}

export function ProvenanceTrail({ nodeId, onBack, onGenerateMemo }: ProvenanceTrailProps) {
  const [selectedSource, setSelectedSource] = useState(provenanceSources[0]);
  const [copiedHash, setCopiedHash] = useState(false);

  const handleCopyHash = () => {
    navigator.clipboard.writeText("SHA-256:a1b2c3d4e5f6...");
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card variant="highlight" className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <Button variant="ghost" size="sm" onClick={onBack} className="mb-3 -ml-2">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Graph
              </Button>
              <h2 className="text-xl font-semibold mb-2">
                Claim: Metformin shows promise for Breast Cancer via AMPK pathway
              </h2>
              <p className="text-sm text-muted-foreground font-mono">
                Claim ID: MÖBIUS-C-2025-A1B2C3D4
              </p>
            </div>
            <Badge variant="success" className="text-base px-4 py-1.5">
              85% 🟢
            </Badge>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Confidence Breakdown - Left Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Confidence Composition</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { 
                  label: 'Source Credibility', 
                  score: 35, 
                  max: 40,
                  items: ['High-impact journal ✓', 'Recent publication ✓', 'Rigorous methodology ✓']
                },
                { 
                  label: 'Corroboration', 
                  score: 30, 
                  max: 35,
                  items: ['2 supporting trials ✓', '1 confirming patent ✓', 'No conflicting evidence ✓']
                },
                { 
                  label: 'Biological Plausibility', 
                  score: 20, 
                  max: 25,
                  items: ['Clear mechanism ✓', 'Dose-response data ✓', 'Relevant biomarkers ✓']
                },
              ].map((section, i) => (
                <motion.div
                  key={section.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{section.label}</span>
                    <span className="text-muted-foreground">{section.score}/{section.max} pts</span>
                  </div>
                  <Progress value={(section.score / section.max) * 100} variant="success" />
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {section.items.map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">TOTAL</span>
                  <Badge variant="success" className="text-lg px-3">85/100 🟢</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Provenance Flow - Center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Provenance Flow</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Flow Diagram */}
              <div className="flex items-start justify-between gap-4 mb-8">
                {/* Sources Column */}
                <div className="flex-1 space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground text-center mb-4">SOURCES</h4>
                  {provenanceSources.map((source, i) => (
                    <motion.div
                      key={source.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                    >
                      <Card 
                        variant={selectedSource.id === source.id ? "highlight" : "interactive"}
                        className="p-3 cursor-pointer"
                        onClick={() => setSelectedSource(source)}
                      >
                        <div className="flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                            ${source.type === 'paper' ? 'bg-secondary text-secondary-foreground' : 
                              source.type === 'trial' ? 'bg-accent text-accent-foreground' : 
                              'bg-primary/10 text-primary'}`}
                          >
                            {source.type === 'paper' ? '📄' : source.type === 'trial' ? '🏥' : '📜'}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-mono truncate">{source.reference}</p>
                            <p className="text-[10px] text-muted-foreground">{source.date}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex flex-col items-center justify-center h-full pt-10">
                  <div className="w-12 h-0.5 bg-border" />
                  <span className="text-xs text-muted-foreground my-2">→</span>
                </div>

                {/* Processing Column */}
                <div className="flex-1 space-y-3">
                  <h4 className="text-sm font-medium text-muted-foreground text-center mb-4">PROCESSING</h4>
                  {['NLP Extraction', 'Evidence Weighting', 'Conflict Resolution'].map((step, i) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                    >
                      <Card variant="glass" className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm">
                            ⚙️
                          </div>
                          <span className="text-xs font-medium">{step}</span>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex flex-col items-center justify-center h-full pt-10">
                  <div className="w-12 h-0.5 bg-border" />
                  <span className="text-xs text-muted-foreground my-2">→</span>
                </div>

                {/* Conclusion Column */}
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-muted-foreground text-center mb-4">CONCLUSION</h4>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Card variant="highlight" className="p-4">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-full bg-success flex items-center justify-center text-xl mx-auto mb-2">
                          ★
                        </div>
                        <p className="text-sm font-medium">Metformin → Breast Cancer</p>
                        <Badge variant="success" className="mt-2">85% Confidence</Badge>
                        <p className="text-xs text-muted-foreground mt-2">AMPK Pathway Link</p>
                      </div>
                    </Card>
                  </motion.div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-6 text-xs text-muted-foreground pt-4 border-t">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-secondary" /> Source Document
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted" /> Processing Step
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success" /> Conclusion
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Source Details - Right Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Source Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Source</p>
                <p className="font-mono text-sm font-medium">{selectedSource.reference}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Title</p>
                <p className="text-sm">{selectedSource.title}</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                <p className="text-sm">{selectedSource.date}</p>
              </div>

              {selectedSource.impactFactor && (
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Impact Factor</p>
                  <p className="text-sm font-semibold text-primary">{selectedSource.impactFactor}</p>
                </div>
              )}

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Key Excerpt</p>
                <p className="text-sm text-muted-foreground italic">"{selectedSource.excerpt}"</p>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Relevance Score</p>
                <div className="flex items-center gap-2">
                  <Progress value={selectedSource.relevanceScore} variant="success" className="flex-1" />
                  <span className="text-sm font-medium">{selectedSource.relevanceScore}/100</span>
                </div>
              </div>

              {selectedSource.studyDesign && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-xs text-muted-foreground">Study Design</p>
                    <p>{selectedSource.studyDesign}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Sample Size</p>
                    <p>{selectedSource.sampleSize}</p>
                  </div>
                </div>
              )}

              {/* Verification */}
              <div className="pt-4 border-t space-y-3">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Verification</p>
                <div className="space-y-2 text-xs font-mono">
                  <p className="truncate">Hash: SHA-256:a1b2c3d4...</p>
                  <p>Extracted: 2025-10-26 14:30:22 UTC</p>
                  <p>Agent: Literature-03 (v2.1.4)</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopyHash} className="flex-1">
                    {copiedHash ? <CheckCircle className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                    {copiedHash ? 'Copied' : 'Copy Hash'}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    View Original
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Audit Trail Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card variant="glass" className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Audit Trail
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                Add Annotation
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="h-4 w-4 mr-2" />
                Flag for Review
              </Button>
            </div>
            <Button variant="hero-accent" onClick={onGenerateMemo}>
              Generate Investment Memo
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
