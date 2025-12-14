import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ZoomIn, ZoomOut, Maximize2, Filter } from "lucide-react";
import { graphNodes, graphEdges, type GraphNode, type GraphEdge } from "@/data/mockData";

interface EvidenceGraphProps {
  onViewProvenance: (nodeId: string) => void;
}

export function EvidenceGraph({ onViewProvenance }: EvidenceGraphProps) {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<{ source: GraphNode; target: GraphNode; edge: GraphEdge } | null>(null);
  const [filters, setFilters] = useState({
    diseases: true,
    mechanisms: true,
    trials: true,
    patents: true,
    literature: true,
  });
  const [confidenceThreshold, setConfidenceThreshold] = useState([50]);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState<Record<string, { x: number; y: number }>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  // Generate node positions in a radial layout
  useEffect(() => {
    const centerX = 300;
    const centerY = 275;
    const newPositions: Record<string, { x: number; y: number }> = {};

    // Center node (Metformin)
    newPositions['metformin'] = { x: centerX, y: centerY };

    // Group nodes by type and position them in rings
    const nodesByType: Record<string, GraphNode[]> = {};
    graphNodes.filter(n => n.id !== 'metformin').forEach(node => {
      if (!nodesByType[node.type]) nodesByType[node.type] = [];
      nodesByType[node.type].push(node);
    });

    const typeOrder = ['mechanism', 'disease', 'trial', 'patent', 'paper'];
    const rings = [140, 220, 280];
    
    let globalIndex = 0;
    typeOrder.forEach((type, typeIndex) => {
      const nodes = nodesByType[type] || [];
      const ring = rings[Math.min(typeIndex, rings.length - 1)];
      
      nodes.forEach((node, i) => {
        const totalInRing = nodes.length;
        const startAngle = typeIndex * 0.5;
        const angle = startAngle + (i / totalInRing) * Math.PI * 2;
        newPositions[node.id] = {
          x: centerX + Math.cos(angle) * ring,
          y: centerY + Math.sin(angle) * ring,
        };
        globalIndex++;
      });
    });

    setPositions(newPositions);
  }, []);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'molecule': return 'bg-primary';
      case 'disease': return 'bg-risk';
      case 'mechanism': return 'bg-success';
      case 'trial': return 'bg-accent';
      case 'patent': return 'bg-primary/70';
      case 'paper': return 'bg-secondary';
      default: return 'bg-muted';
    }
  };

  const getNodeSize = (type: string) => {
    switch (type) {
      case 'molecule': return 'w-20 h-20 text-sm';
      case 'disease': return 'w-14 h-14 text-[10px]';
      case 'mechanism': return 'w-14 h-14 text-[10px]';
      default: return 'w-12 h-12 text-[9px]';
    }
  };

  const filteredNodes = graphNodes.filter(node => {
    if (node.type === 'molecule') return true;
    if (node.type === 'disease' && !filters.diseases) return false;
    if (node.type === 'mechanism' && !filters.mechanisms) return false;
    if (node.type === 'trial' && !filters.trials) return false;
    if (node.type === 'patent' && !filters.patents) return false;
    if (node.type === 'paper' && !filters.literature) return false;
    if (node.confidence && node.confidence < confidenceThreshold[0]) return false;
    return true;
  });

  const filteredEdges = graphEdges.filter(edge => {
    const sourceNode = filteredNodes.find(n => n.id === edge.source);
    const targetNode = filteredNodes.find(n => n.id === edge.target);
    return sourceNode && targetNode && edge.confidence >= confidenceThreshold[0];
  });

  const getConfidenceBadge = (confidence: number) => {
    if (confidence >= 80) return <Badge variant="success">{confidence}% 🟢</Badge>;
    if (confidence >= 50) return <Badge variant="warning">{confidence}% 🟡</Badge>;
    return <Badge variant="risk">{confidence}% 🔴</Badge>;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Graph Controls - Left Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-4"
      >
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Graph Controls
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Find in graph..." className="pl-10" />
            </div>

            {/* Filter Toggles */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Show</Label>
              {[
                { key: 'diseases', label: 'Diseases', color: 'bg-risk' },
                { key: 'mechanisms', label: 'Mechanisms', color: 'bg-success' },
                { key: 'trials', label: 'Clinical Trials', color: 'bg-accent' },
                { key: 'patents', label: 'Patents', color: 'bg-primary/70' },
                { key: 'literature', label: 'Literature', color: 'bg-secondary' },
              ].map(({ key, label, color }) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={filters[key as keyof typeof filters]}
                    onCheckedChange={(checked) => 
                      setFilters(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                  <Label htmlFor={key} className="text-sm flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${color}`} />
                    {label}
                  </Label>
                </div>
              ))}
            </div>

            {/* Confidence Threshold */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label className="text-sm font-medium">Confidence</Label>
                <span className="text-sm text-muted-foreground">{confidenceThreshold[0]}%</span>
              </div>
              <Slider
                value={confidenceThreshold}
                onValueChange={setConfidenceThreshold}
                max={100}
                step={5}
              />
            </div>

            {/* Zoom Controls */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon-sm" onClick={() => setZoom(z => Math.max(0.3, z - 0.1))}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-sm flex-1 text-center">{Math.round(zoom * 100)}%</span>
                <Button variant="outline" size="icon-sm" onClick={() => setZoom(z => Math.min(3, z + 0.1))}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-1">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}>
                  <Maximize2 className="h-3 w-3 mr-1" />
                  Reset
                </Button>
                <Button variant="outline" size="sm" className="flex-1" onClick={() => setZoom(0.6)}>
                  Fit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Graph Visualization - Center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="lg:col-span-2"
      >
        <Card className="h-[550px] overflow-hidden">
          <div 
            ref={containerRef}
            className="w-full h-full relative bg-gradient-surface cursor-grab active:cursor-grabbing"
            style={{ 
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, 
              transformOrigin: 'center center' 
            }}
            onMouseDown={(e) => {
              setIsDragging(true);
              setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
            }}
            onMouseMove={(e) => {
              if (isDragging) {
                setPan({
                  x: e.clientX - dragStart.x,
                  y: e.clientY - dragStart.y
                });
              }
            }}
            onMouseUp={() => setIsDragging(false)}
            onMouseLeave={() => setIsDragging(false)}
          >
            {/* SVG for edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {filteredEdges.map((edge, i) => {
                const sourcePos = positions[edge.source];
                const targetPos = positions[edge.target];
                if (!sourcePos || !targetPos) return null;

                const isSelected = selectedEdge?.edge === edge;
                
                return (
                  <motion.line
                    key={i}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.02 }}
                    x1={sourcePos.x}
                    y1={sourcePos.y}
                    x2={targetPos.x}
                    y2={targetPos.y}
                    stroke={isSelected ? 'hsl(var(--accent))' : 'hsl(var(--border))'}
                    strokeWidth={isSelected ? 3 : Math.max(1, edge.strength)}
                    strokeDasharray={edge.confidence < 70 ? '5,5' : undefined}
                    className="cursor-pointer pointer-events-auto hover:stroke-accent transition-colors"
                    onClick={() => {
                      const source = graphNodes.find(n => n.id === edge.source)!;
                      const target = graphNodes.find(n => n.id === edge.target)!;
                      setSelectedEdge({ source, target, edge });
                      setSelectedNode(null);
                    }}
                  />
                );
              })}
            </svg>

            {/* Nodes */}
            {filteredNodes.map((node, i) => {
              const pos = positions[node.id];
              if (!pos) return null;

              const isSelected = selectedNode?.id === node.id;
              
              return (
                <motion.div
                  key={node.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className={`absolute rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 text-center font-medium leading-tight p-1
                    ${getNodeColor(node.type)} ${getNodeSize(node.type)}
                    ${isSelected ? 'ring-4 ring-accent ring-offset-2 ring-offset-background scale-110' : 'hover:scale-105'}
                    ${node.type === 'molecule' ? 'text-primary-foreground' : 'text-foreground'}
                  `}
                  style={{
                    left: pos.x,
                    top: pos.y,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onClick={() => {
                    setSelectedNode(node);
                    setSelectedEdge(null);
                  }}
                >
                  <span className="truncate px-1">{node.label}</span>
                </motion.div>
              );
            })}
          </div>
        </Card>

        {/* Evidence Summary Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-4"
        >
          <Card variant="glass" className="p-4">
            <div className="flex items-center justify-between flex-wrap gap-4 text-sm">
              <span>Total Nodes: <strong>{filteredNodes.length}</strong></span>
              <span>Total Connections: <strong>{filteredEdges.length}</strong></span>
              <span>Average Confidence: <strong>78%</strong></span>
              <span>Most Connected: <strong className="text-success">AMPK Pathway</strong> (12 links)</span>
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Evidence Details - Right Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Evidence Details</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              {!selectedNode && !selectedEdge ? (
                <motion.p
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-muted-foreground text-center py-8"
                >
                  Click any node or connection to explore evidence
                </motion.p>
              ) : selectedNode ? (
                <motion.div
                  key={`node-${selectedNode.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${getNodeColor(selectedNode.type)} flex items-center justify-center text-primary-foreground text-xs font-bold`}>
                      {selectedNode.label.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedNode.label}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{selectedNode.type}</p>
                    </div>
                  </div>

                  {selectedNode.description && (
                    <p className="text-sm text-muted-foreground">{selectedNode.description}</p>
                  )}

                  {selectedNode.type === 'molecule' && (
                    <div className="space-y-2 text-sm">
                      <p><span className="text-muted-foreground">Known For:</span> Type 2 Diabetes</p>
                      <div className="pt-2">
                        <p className="font-medium mb-2">Connected to:</p>
                        <ul className="space-y-1 text-muted-foreground">
                          <li>• 3 Cancer Types</li>
                          <li>• 3 Key Mechanisms</li>
                          <li>• 2 Clinical Trials</li>
                          <li>• 2 Relevant Patents</li>
                          <li>• 2 Supporting Papers</li>
                        </ul>
                      </div>
                    </div>
                  )}

                  {selectedNode.confidence && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm">Confidence:</span>
                      {getConfidenceBadge(selectedNode.confidence)}
                    </div>
                  )}

                  <Button 
                    variant="hero" 
                    className="w-full mt-4"
                    onClick={() => onViewProvenance(selectedNode.id)}
                  >
                    View Full Provenance
                  </Button>
                </motion.div>
              ) : selectedEdge ? (
                <motion.div
                  key={`edge-${selectedEdge.source.id}-${selectedEdge.target.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <h3 className="font-semibold">Connection Analysis</h3>
                  <p className="text-sm">
                    <span className="font-medium">{selectedEdge.source.label}</span>
                    <span className="text-muted-foreground"> → </span>
                    <span className="font-medium">{selectedEdge.target.label}</span>
                  </p>

                  <div className="flex items-center gap-2">
                    <span className="text-sm">Evidence Strength:</span>
                    {getConfidenceBadge(selectedEdge.edge.confidence)}
                  </div>

                  <div className="space-y-3">
                    <p className="text-sm font-medium">Supporting Sources:</p>
                    <div className="space-y-2">
                      <Card variant="interactive" className="p-3">
                        <p className="text-xs text-primary font-mono">PMID: 33811245 (2021)</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          "Metformin induces apoptosis in BRCA1-mutated cells..."
                        </p>
                      </Card>
                      <Card variant="interactive" className="p-3">
                        <p className="text-xs text-accent font-mono">NCT04567890 (Phase II)</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          "Metformin + chemo in BC..."
                        </p>
                      </Card>
                    </div>
                  </div>

                  <Button 
                    variant="hero" 
                    className="w-full mt-4"
                    onClick={() => onViewProvenance(selectedEdge.source.id)}
                  >
                    View Full Provenance
                  </Button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
