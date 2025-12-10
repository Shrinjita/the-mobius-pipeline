import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Download, Share2, BarChart3, Clock, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface InvestmentMemoProps {
  molecule: string;
  indication: string;
  onBack: () => void;
}

export function InvestmentMemo({ molecule, indication, onBack }: InvestmentMemoProps) {
  const [sections, setSections] = useState({
    executiveSummary: true,
    keyFindings: true,
    mechanismOfAction: true,
    clinicalTrialLandscape: true,
    ipAnalysis: true,
    safetyProfile: true,
    commercialAssessment: true,
    recommendation: true,
  });

  const [includes, setIncludes] = useState({
    confidenceScores: true,
    sourceCitations: true,
    visualizations: true,
    auditTrail: true,
  });

  const [format, setFormat] = useState<'brief' | 'detailed' | 'regulatory'>('brief');
  const [customNote, setCustomNote] = useState('');

  const handleExport = (type: string) => {
    toast.success(`${type} export started`, {
      description: "Your file will be ready shortly.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card variant="glass" className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-success" />
                <span className="text-sm">Memo generated in <strong>2.3 seconds</strong></span>
              </div>
              <div className="h-4 w-px bg-border" />
              <span className="text-sm text-muted-foreground">Sources included: <strong>47/47</strong> verified</span>
            </div>
            <Badge variant="success">Export Ready</Badge>
          </div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Visualizations Panel - Left */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Visualizations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Evidence Strength Heatmap', icon: '🔥' },
                { name: 'Clinical Trial Timeline', icon: '📅' },
                { name: 'Patent Expiration Chart', icon: '📊' },
                { name: 'Mechanism Pathway Diagram', icon: '🧬' },
                { name: 'Risk-Benefit Matrix', icon: '⚖️' },
              ].map((viz, i) => (
                <motion.div
                  key={viz.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <Card variant="interactive" className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span>{viz.icon}</span>
                        <span className="text-xs">{viz.name}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs h-6 px-2">
                        Add
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
              <Button variant="outline" size="sm" className="w-full mt-2">
                Generate Custom Visualization
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Memo Preview - Center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <Card className="h-full bg-card">
            <CardContent className="p-8">
              {/* PDF-style Document */}
              <div className="bg-background border rounded-lg p-8 shadow-lg max-h-[600px] overflow-y-auto">
                <div className="text-center mb-8 pb-6 border-b">
                  <h1 className="text-2xl font-bold text-primary mb-2">INVESTMENT MEMO</h1>
                  <h2 className="text-xl font-semibold mb-1">{molecule} in {indication}</h2>
                  <p className="text-sm text-muted-foreground">Prepared for: Executive Team</p>
                  <p className="text-sm text-muted-foreground">Date: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <Badge variant="success" className="mt-3">Confidence: 85% 🟢</Badge>
                </div>

                {sections.executiveSummary && (
                  <section className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-primary border-b pb-2">EXECUTIVE SUMMARY</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {molecule} demonstrates strong potential for repurposing in {indication.toLowerCase()}, particularly breast cancer. 
                      Evidence includes 5 clinical trials (2 Phase II), 12 mechanistic studies, and a supportive patent landscape. 
                      The AMPK pathway activation mechanism provides a clear biological rationale with 85% confidence based on our 
                      analysis of 276 evidence items across literature, clinical trials, patents, and bioactivity databases.
                    </p>
                  </section>
                )}

                {sections.keyFindings && (
                  <section className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-primary border-b pb-2">KEY FINDINGS</h3>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
                      <li>Strong mechanistic link via AMPK pathway <Badge variant="success" className="ml-2 text-[10px]">85% conf</Badge></li>
                      <li>Favorable safety profile in cancer populations</li>
                      <li>Patent white space identified for method-of-use claims</li>
                      <li>Estimated addressable market: $2.3B</li>
                      <li>No significant safety signals in FAERS analysis</li>
                    </ol>
                  </section>
                )}

                {sections.mechanismOfAction && (
                  <section className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-primary border-b pb-2">MECHANISM OF ACTION</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      Metformin activates AMP-activated protein kinase (AMPK), which inhibits mTOR signaling and reduces 
                      cellular proliferation. In cancer cells, this leads to cell cycle arrest and apoptosis, particularly 
                      in BRCA1-mutated breast cancer cells. The glucose metabolism modulation provides an additional 
                      anti-tumor effect by limiting energy availability to rapidly dividing cancer cells.
                    </p>
                  </section>
                )}

                {sections.clinicalTrialLandscape && (
                  <section className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-primary border-b pb-2">CLINICAL TRIAL LANDSCAPE</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-muted/50 rounded">
                        <p className="font-medium">NCT04567890 - Phase II (Active)</p>
                        <p className="text-muted-foreground">Metformin + chemotherapy in metastatic breast cancer</p>
                      </div>
                      <div className="p-3 bg-muted/50 rounded">
                        <p className="font-medium">NCT02345678 - Phase III (Recruiting)</p>
                        <p className="text-muted-foreground">Metformin for breast cancer prevention in high-risk women</p>
                      </div>
                    </div>
                  </section>
                )}

                {sections.recommendation && (
                  <section className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-primary border-b pb-2">RECOMMENDATION</h3>
                    <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                      <p className="text-lg font-semibold text-success">PROCEED TO PRECLINICAL STUDIES</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Strong evidence base supports investment in further development. Recommended next steps include 
                        in-vivo validation studies and preliminary IND-enabling work.
                      </p>
                    </div>
                  </section>
                )}

                {includes.auditTrail && (
                  <section className="pt-6 border-t">
                    <p className="text-xs text-muted-foreground text-center">
                      Audit Trail: MÖBIUS-2025-A1B2C3D4 | Generated: {new Date().toISOString()} | Verification Hash: SHA-256:a1b2c3d4e5f6...
                    </p>
                  </section>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Memo Editor - Right */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Memo Editor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Section Toggles */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Sections</Label>
                {Object.entries(sections).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={(checked) => 
                        setSections(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                    <Label htmlFor={key} className="text-xs capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Include Options */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Include</Label>
                {Object.entries(includes).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={`include-${key}`}
                      checked={value}
                      onCheckedChange={(checked) => 
                        setIncludes(prev => ({ ...prev, [key]: checked }))
                      }
                    />
                    <Label htmlFor={`include-${key}`} className="text-xs capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                ))}
              </div>

              {/* Format Selection */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Format</Label>
                {[
                  { id: 'brief', label: 'Executive Brief (1 page)' },
                  { id: 'detailed', label: 'Detailed Report (5-10 pages)' },
                  { id: 'regulatory', label: 'Regulatory Submission Format' },
                ].map((opt) => (
                  <div key={opt.id} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id={opt.id}
                      name="format"
                      checked={format === opt.id}
                      onChange={() => setFormat(opt.id as typeof format)}
                      className="w-3 h-3"
                    />
                    <Label htmlFor={opt.id} className="text-xs">{opt.label}</Label>
                  </div>
                ))}
              </div>

              {/* Custom Note */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Custom Note</Label>
                <Textarea
                  placeholder="Add custom note..."
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  className="text-xs h-20"
                />
                <Button variant="outline" size="sm" className="w-full">
                  Add to Key Findings
                </Button>
              </div>

              <Button variant="secondary" size="sm" className="w-full">
                Refresh Preview
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Export Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card variant="highlight" className="p-6">
          <h3 className="font-semibold mb-4">Export Options</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
            {[
              { icon: FileText, label: 'Regulatory PDF', size: '2.4 MB', variant: 'default' as const },
              { icon: BarChart3, label: 'Stakeholder PPT', size: '1.8 MB', variant: 'outline' as const },
              { icon: FileText, label: 'One-Pager', size: '450 KB', variant: 'outline' as const },
              { icon: Download, label: 'JSON Full', size: '850 KB', variant: 'outline' as const },
              { icon: Share2, label: 'Share Link', size: 'Secure URL', variant: 'outline' as const },
            ].map((opt) => (
              <Button 
                key={opt.label}
                variant={opt.variant}
                className="flex-col h-auto py-4"
                onClick={() => handleExport(opt.label)}
              >
                <opt.icon className="h-5 w-5 mb-2" />
                <span className="text-xs font-medium">{opt.label}</span>
                <span className="text-[10px] text-muted-foreground">{opt.size}</span>
              </Button>
            ))}
          </div>
          <div className="flex gap-3">
            <Button variant="hero" className="flex-1" onClick={() => handleExport('All Formats')}>
              <Download className="h-4 w-4 mr-2" />
              Generate All
            </Button>
            <Button variant="hero-accent" onClick={() => handleExport('PDF Preview')}>
              Preview PDF
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
