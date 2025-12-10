// Mock data for the Möbius Pipeline Dashboard

export interface Agent {
  id: string;
  name: string;
  icon: string;
  status: string;
  progress: number;
  found: number;
  foundLabel: string;
  color: string;
}

export interface RecentQuery {
  id: string;
  molecule: string;
  indication: string;
  timeAgo: string;
  status: 'complete' | 'processing' | 'pending';
  evidenceCount: number;
  confidence: number;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'molecule' | 'disease' | 'mechanism' | 'trial' | 'patent' | 'paper';
  confidence?: number;
  description?: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  strength: number;
  confidence: number;
}

export interface ProvenanceSource {
  id: string;
  type: 'paper' | 'trial' | 'patent';
  title: string;
  reference: string;
  date: string;
  excerpt: string;
  relevanceScore: number;
  impactFactor?: number;
  studyDesign?: string;
  sampleSize?: string;
}

export interface ActivityLog {
  timestamp: string;
  agent: string;
  message: string;
}

export const agents: Agent[] = [
  {
    id: 'literature',
    name: 'Literature Agent',
    icon: '📚',
    status: 'Searching PubMed...',
    progress: 40,
    found: 189,
    foundLabel: 'papers',
    color: 'secondary',
  },
  {
    id: 'clinical',
    name: 'Clinical Trial Agent',
    icon: '🏥',
    status: 'Querying ClinicalTrials.gov',
    progress: 60,
    found: 23,
    foundLabel: 'trials',
    color: 'accent',
  },
  {
    id: 'patent',
    name: 'Patent Agent',
    icon: '📜',
    status: 'Analyzing USPTO filings',
    progress: 30,
    found: 14,
    foundLabel: 'patents',
    color: 'primary',
  },
  {
    id: 'bioactivity',
    name: 'Bioactivity Agent',
    icon: '🧬',
    status: 'Fetching ChEMBL assays',
    progress: 50,
    found: 42,
    foundLabel: 'assays',
    color: 'success',
  },
  {
    id: 'safety',
    name: 'Safety Agent',
    icon: '⚠️',
    status: 'Checking FAERS database',
    progress: 70,
    found: 8,
    foundLabel: 'safety signals',
    color: 'warning',
  },
];

export const recentQueries: RecentQuery[] = [
  {
    id: '1',
    molecule: 'Metformin',
    indication: 'Cardiovascular',
    timeAgo: '2 days ago',
    status: 'complete',
    evidenceCount: 234,
    confidence: 87,
  },
  {
    id: '2',
    molecule: 'Aspirin',
    indication: 'Colorectal Cancer',
    timeAgo: '1 week ago',
    status: 'complete',
    evidenceCount: 312,
    confidence: 92,
  },
  {
    id: '3',
    molecule: 'Sildenafil',
    indication: 'Pulmonary Hypertension',
    timeAgo: '2 weeks ago',
    status: 'complete',
    evidenceCount: 156,
    confidence: 78,
  },
];

export const graphNodes: GraphNode[] = [
  { id: 'metformin', label: 'Metformin', type: 'molecule', description: 'Biguanide antidiabetic drug' },
  { id: 'breast-cancer', label: 'Breast Cancer', type: 'disease', confidence: 85 },
  { id: 'pancreatic-cancer', label: 'Pancreatic Cancer', type: 'disease', confidence: 72 },
  { id: 'colorectal-cancer', label: 'Colorectal Cancer', type: 'disease', confidence: 78 },
  { id: 'ampk', label: 'AMPK Pathway', type: 'mechanism', confidence: 92 },
  { id: 'mtor', label: 'mTOR Inhibition', type: 'mechanism', confidence: 88 },
  { id: 'glucose', label: 'Glucose Metabolism', type: 'mechanism', confidence: 95 },
  { id: 'nct04567890', label: 'NCT04567890', type: 'trial', description: 'Phase II - Metformin + Chemotherapy' },
  { id: 'nct02345678', label: 'NCT02345678', type: 'trial', description: 'Phase III - Breast Cancer Prevention' },
  { id: 'us2023123456', label: 'US2023123456A1', type: 'patent', description: 'Cancer treatment method' },
  { id: 'wo2023456789', label: 'WO2023456789A1', type: 'patent', description: 'Combination therapy' },
  { id: 'pmid33811245', label: 'PMID: 33811245', type: 'paper', description: 'Nature Cancer 2021' },
  { id: 'pmid34567890', label: 'PMID: 34567890', type: 'paper', description: 'Cell Reports 2022' },
];

export const graphEdges: GraphEdge[] = [
  { source: 'metformin', target: 'breast-cancer', strength: 5, confidence: 85 },
  { source: 'metformin', target: 'pancreatic-cancer', strength: 3, confidence: 72 },
  { source: 'metformin', target: 'colorectal-cancer', strength: 4, confidence: 78 },
  { source: 'metformin', target: 'ampk', strength: 5, confidence: 92 },
  { source: 'metformin', target: 'mtor', strength: 4, confidence: 88 },
  { source: 'metformin', target: 'glucose', strength: 5, confidence: 95 },
  { source: 'ampk', target: 'breast-cancer', strength: 4, confidence: 85 },
  { source: 'mtor', target: 'pancreatic-cancer', strength: 3, confidence: 70 },
  { source: 'breast-cancer', target: 'nct04567890', strength: 5, confidence: 90 },
  { source: 'breast-cancer', target: 'nct02345678', strength: 4, confidence: 85 },
  { source: 'metformin', target: 'us2023123456', strength: 3, confidence: 80 },
  { source: 'metformin', target: 'pmid33811245', strength: 5, confidence: 92 },
  { source: 'ampk', target: 'pmid34567890', strength: 4, confidence: 88 },
];

export const provenanceSources: ProvenanceSource[] = [
  {
    id: 'pmid33811245',
    type: 'paper',
    title: 'Metformin induces apoptosis in BRCA1-mutated breast cancer cells through AMPK activation',
    reference: 'PMID: 33811245',
    date: 'March 15, 2021',
    excerpt: 'Metformin treatment induced apoptosis in BRCA1-mutated breast cancer cells through AMPK activation (p<0.001). The effect was dose-dependent and reproducible across multiple cell lines.',
    relevanceScore: 92,
    impactFactor: 18.5,
    studyDesign: 'In vitro + mouse model',
    sampleSize: 'n=45',
  },
  {
    id: 'nct04567890',
    type: 'trial',
    title: 'Metformin Combined with Chemotherapy in Metastatic Breast Cancer',
    reference: 'NCT04567890',
    date: 'Phase II - Active',
    excerpt: 'A randomized, double-blind study evaluating metformin 850mg BID plus standard chemotherapy vs placebo in patients with HER2-negative metastatic breast cancer.',
    relevanceScore: 88,
  },
  {
    id: 'us2023123456',
    type: 'patent',
    title: 'Method for treating cancer using metformin combination therapy',
    reference: 'US2023123456A1',
    date: 'Filed: January 12, 2023',
    excerpt: 'Claims cover the use of metformin in combination with specific checkpoint inhibitors for treatment of solid tumors, particularly breast and pancreatic cancers.',
    relevanceScore: 80,
  },
];

export const activityLogs: ActivityLog[] = [
  { timestamp: '14:30:02', agent: 'MASTER AGENT', message: 'Query received: "Metformin in Oncology"' },
  { timestamp: '14:30:03', agent: 'MASTER AGENT', message: 'Decomposing into 5 sub-tasks...' },
  { timestamp: '14:30:04', agent: 'SYSTEM', message: 'All agents assigned and beginning parallel execution' },
  { timestamp: '14:30:10', agent: 'LITERATURE AGENT', message: 'First 50 papers retrieved from PubMed' },
  { timestamp: '14:30:15', agent: 'CLINICAL AGENT', message: 'Found 10 Phase II oncology trials' },
  { timestamp: '14:30:20', agent: 'PATENT AGENT', message: 'Identified key MoU patent expiring 2026' },
  { timestamp: '14:30:25', agent: 'BIOACTIVITY AGENT', message: '20+ AMPK pathway assays confirmed' },
  { timestamp: '14:30:30', agent: 'SAFETY AGENT', message: 'No contra-indications in cancer populations' },
  { timestamp: '14:30:35', agent: 'MASTER AGENT', message: 'Starting evidence synthesis...' },
];

export const molecules = [
  'Metformin',
  'Aspirin',
  'Sildenafil',
  'Rapamycin',
  'Statins',
  'Thalidomide',
  'Propranolol',
  'Ibuprofen',
];

export const indications = [
  'Oncology',
  'Breast Cancer',
  'Pancreatic Cancer',
  'Colorectal Cancer',
  'Cardiovascular',
  'Pulmonary Hypertension',
  'Neurodegeneration',
  'Autoimmune',
];
