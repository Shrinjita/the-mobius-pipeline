import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, ChevronUp, Beaker, FileText, FlaskConical, Shield, Activity } from "lucide-react";
import { molecules, indications, recentQueries } from "@/data/mockData";

interface QueryDashboardProps {
  onRunAnalysis: (molecule: string, indication: string) => void;
}

export function QueryDashboard({ onRunAnalysis }: QueryDashboardProps) {
  const [molecule, setMolecule] = useState("");
  const [indication, setIndication] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [confidenceThreshold, setConfidenceThreshold] = useState([70]);
  const [moleculeSuggestions, setMoleculeSuggestions] = useState<string[]>([]);
  const [indicationSuggestions, setIndicationSuggestions] = useState<string[]>([]);

  const handleMoleculeChange = (value: string) => {
    setMolecule(value);
    if (value.length > 0) {
      const filtered = molecules.filter(m => 
        m.toLowerCase().includes(value.toLowerCase())
      );
      setMoleculeSuggestions(filtered);
    } else {
      setMoleculeSuggestions([]);
    }
  };

  const handleIndicationChange = (value: string) => {
    setIndication(value);
    if (value.length > 0) {
      const filtered = indications.filter(i => 
        i.toLowerCase().includes(value.toLowerCase())
      );
      setIndicationSuggestions(filtered);
    } else {
      setIndicationSuggestions([]);
    }
  };

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 80) return <Badge variant="success">{confidence}%</Badge>;
    if (confidence >= 50) return <Badge variant="warning">{confidence}%</Badge>;
    return <Badge variant="risk">{confidence}%</Badge>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Query Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="lg:col-span-2"
      >
        <Card variant="elevated" className="h-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Beaker className="h-5 w-5 text-primary" />
              Start a New Hypothesis
            </CardTitle>
            <CardDescription>
              Enter a molecule and indication to begin evidence synthesis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Molecule Input */}
            <div className="space-y-2 relative">
              <Label htmlFor="molecule">Molecule</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="molecule"
                  placeholder="e.g., Metformin, Aspirin..."
                  value={molecule}
                  onChange={(e) => handleMoleculeChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              <AnimatePresence>
                {moleculeSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg"
                  >
                    {moleculeSuggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setMolecule(s);
                          setMoleculeSuggestions([]);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm"
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Indication Input */}
            <div className="space-y-2 relative">
              <Label htmlFor="indication">Disease / Indication</Label>
              <div className="relative">
                <Activity className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="indication"
                  placeholder="e.g., Oncology, Breast Cancer..."
                  value={indication}
                  onChange={(e) => handleIndicationChange(e.target.value)}
                  className="pl-10"
                />
              </div>
              <AnimatePresence>
                {indicationSuggestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-10 w-full mt-1 bg-card border border-border rounded-md shadow-lg"
                  >
                    {indicationSuggestions.map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setIndication(s);
                          setIndicationSuggestions([]);
                        }}
                        className="w-full px-4 py-2 text-left hover:bg-muted transition-colors text-sm"
                      >
                        {s}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Advanced Filters Toggle */}
            <Button
              variant="ghost"
              onClick={() => setShowFilters(!showFilters)}
              className="w-full justify-between"
            >
              <span>Advanced Filters</span>
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="space-y-6 p-4 bg-muted/50 rounded-lg">
                    {/* Evidence Sources */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Evidence Sources</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'literature', label: 'Literature', icon: FileText },
                          { id: 'clinical', label: 'Clinical Trials', icon: Activity },
                          { id: 'patents', label: 'Patents', icon: Shield },
                          { id: 'bioactivity', label: 'Bioactivity', icon: FlaskConical },
                        ].map(({ id, label, icon: Icon }) => (
                          <div key={id} className="flex items-center space-x-2">
                            <Checkbox id={id} defaultChecked />
                            <Label htmlFor={id} className="text-sm flex items-center gap-2">
                              <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                              {label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Trial Phase */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium">Trial Phase</Label>
                      <div className="flex flex-wrap gap-3">
                        {['Preclinical', 'Phase I', 'Phase II', 'Phase III', 'Phase IV'].map((phase, i) => (
                          <div key={phase} className="flex items-center space-x-2">
                            <Checkbox id={phase} defaultChecked={i === 1 || i === 2} />
                            <Label htmlFor={phase} className="text-sm">{phase}</Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Confidence Threshold */}
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <Label className="text-sm font-medium">Confidence Threshold</Label>
                        <span className="text-sm text-muted-foreground">{confidenceThreshold[0]}%</span>
                      </div>
                      <Slider
                        value={confidenceThreshold}
                        onValueChange={setConfidenceThreshold}
                        max={100}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Run Analysis Button */}
            <Button
              variant="hero"
              size="xl"
              className="w-full"
              onClick={() => onRunAnalysis(molecule || "Metformin", indication || "Oncology")}
              disabled={!molecule && !indication}
            >
              <Search className="mr-2 h-5 w-5" />
              Run Analysis
            </Button>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recent Queries Panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card variant="default" className="h-full">
          <CardHeader>
            <CardTitle className="text-lg">Recent Investigations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentQueries.map((query, index) => (
              <motion.div
                key={query.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card variant="interactive" className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-sm">
                        {query.molecule} → {query.indication}
                      </p>
                      <p className="text-xs text-muted-foreground">{query.timeAgo}</p>
                    </div>
                    {getConfidenceBadge(query.confidence)}
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span>{query.evidenceCount} sources</span>
                    <Badge variant="complete" className="text-[10px] px-1.5 py-0">
                      {query.status}
                    </Badge>
                  </div>
                </Card>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Stats Footer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="lg:col-span-3"
      >
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Avg. Time Saved', value: '99.9%', subtext: '90 days → 10 min' },
            { label: 'Provenance Coverage', value: '94%', subtext: 'Verified sources' },
            { label: 'Cost Reduction', value: '85%', subtext: '$85K → $850' },
          ].map((stat, i) => (
            <Card key={stat.label} variant="glass" className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-sm font-medium">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.subtext}</p>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
