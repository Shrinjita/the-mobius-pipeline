import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Pause, Play, CheckCircle } from "lucide-react";
import { agents, activityLogs } from "@/data/mockData";

interface AgentProcessingProps {
  molecule: string;
  indication: string;
  onComplete: () => void;
}

export function AgentProcessing({ molecule, indication, onComplete }: AgentProcessingProps) {
  const [agentStates, setAgentStates] = useState(agents.map(a => ({ ...a, progress: 0 })));
  const [logs, setLogs] = useState<typeof activityLogs>([]);
  const [elapsed, setElapsed] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    if (isPaused) return;

    // Simulate agent progress
    const progressInterval = setInterval(() => {
      setAgentStates(prev => prev.map(agent => ({
        ...agent,
        progress: Math.min(agent.progress + Math.random() * 8, 100),
        status: agent.progress >= 95 ? 'Complete' : agent.status,
      })));
    }, 500);

    // Simulate activity logs
    let logIndex = 0;
    const logInterval = setInterval(() => {
      if (logIndex < activityLogs.length) {
        setLogs(prev => [...prev, activityLogs[logIndex]]);
        logIndex++;
      }
    }, 2000);

    // Update step progress
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }, 3000);

    // Complete after ~15 seconds for demo
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 15000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(logInterval);
      clearInterval(stepInterval);
      clearTimeout(completeTimer);
    };
  }, [isPaused, onComplete]);

  const steps = [
    { id: 1, label: 'Query Received' },
    { id: 2, label: 'Agents Assigned' },
    { id: 3, label: 'Evidence Gathering' },
    { id: 4, label: 'Synthesis' },
    { id: 5, label: 'Report Ready' },
  ];

  const totalFound = agentStates.reduce((sum, a) => sum + a.found, 0);
  const avgProgress = agentStates.reduce((sum, a) => sum + a.progress, 0) / agentStates.length;

  return (
    <div className="space-y-6">
      {/* Process Timeline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card variant="glass" className="p-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                      currentStep >= step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      step.id
                    )}
                  </motion.div>
                  <span className="text-xs mt-2 text-center max-w-[80px]">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-16 mx-2 transition-all duration-500 ${
                    currentStep > step.id ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Agent Orchestration */}
        <div className="lg:col-span-2 space-y-4">
          {/* Master Agent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card variant="highlight" className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center text-3xl animate-pulse-glow">
                    ⚙️
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">MASTER AGENT</h3>
                    <p className="text-sm text-muted-foreground">
                      Orchestrating analysis for: <span className="text-foreground font-medium">{molecule}</span> → <span className="text-foreground font-medium">{indication}</span>
                    </p>
                  </div>
                </div>
                <Badge variant="active">Active</Badge>
              </div>
            </Card>
          </motion.div>

          {/* Worker Agents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agentStates.map((agent, index) => (
              <motion.div
                key={agent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card 
                  variant="agent" 
                  className={`p-4 ${agent.progress >= 95 ? 'border-success' : 'border-border'}`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{agent.icon}</span>
                      <div>
                        <h4 className="font-medium text-sm">{agent.name}</h4>
                        <p className="text-xs text-muted-foreground">{agent.status}</p>
                      </div>
                    </div>
                    <Badge variant={agent.progress >= 95 ? 'complete' : 'pending'}>
                      {Math.round(agent.progress)}%
                    </Badge>
                  </div>
                  <Progress 
                    value={agent.progress} 
                    variant={agent.progress >= 95 ? 'success' : 'default'}
                    size="sm"
                    className="mb-2"
                  />
                  <p className="text-xs text-muted-foreground">
                    Found: <span className="text-foreground font-medium">{agent.found}</span> {agent.foundLabel}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Activity Log Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="h-full">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                Activity Stream
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => setIsPaused(!isPaused)}
                >
                  {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[400px] overflow-y-auto font-mono text-xs">
                <AnimatePresence mode="popLayout">
                  {logs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-2 bg-muted/50 rounded border-l-2 border-primary"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-muted-foreground">[{log.timestamp}]</span>
                        <span className="text-primary font-semibold">{log.agent}</span>
                      </div>
                      <p className="text-foreground">{log.message}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Metrics Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card variant="glass" className="p-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6">
              <div>
                <span className="text-sm text-muted-foreground">Elapsed: </span>
                <span className="font-mono font-semibold">{Math.floor(elapsed / 60)}:{(elapsed % 60).toString().padStart(2, '0')}</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Agents Active: </span>
                <span className="font-semibold">{agentStates.filter(a => a.progress < 100).length}/5</span>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Evidence Items: </span>
                <span className="font-semibold text-primary">{totalFound}</span>
              </div>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Overall Progress: </span>
              <span className="font-semibold">{Math.round(avgProgress)}%</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
