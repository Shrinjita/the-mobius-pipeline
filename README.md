# <img src="./public/favicon.svg" width="50" height="50"> **Möbius Pipeline – AI-Powered Drug Repurposing Platform**
### *EY Techathon 6.0 – Pharma Track*
**Möbius Pipeline** is a **cyber-physical AI engine** designed to accelerate drug repurposing from **6+ years to 10 minutes**, while ensuring **full regulatory compliance** and **transparent provenance tracking**. It leverages **multi-agent AI orchestration** to synthesize evidence from literature, trials, patents, safety, and bioactivity data into **audit-ready investment memos** with **94% provenance coverage**.

---

## **Core Problem**

Pharma R&D teams spend **80% of their time** manually gathering evidence across siloed sources, with **no audit trail**, leading to:
- **90 days** per molecule-disease hypothesis
- **$85K–$100K** per candidate in analyst costs
- **0.1 candidates/week** throughput
- **High compliance risk** due to missing provenance

---

## **Solution**

A **human-in-the-loop AI copilot** that:
1. **Decomposes queries** via a Master Agent into specialized tasks
2. **Executes in parallel** using 5 AI agents (Literature, Clinical, Patent, Bioactivity, Safety)
3. **Synthesizes evidence** into a Neo4j knowledge graph
4. **Generates regulatory-ready reports** with full source lineage and cryptographic hashes

<img width="3162" height="585" alt="XPR_Zk8s4CV_H-8Tt3lfsaFY2d4uzj0kka2IAosmAR2jgbATlCHahGrEP3kxHTMzLb-WBzPn8B_OHCiV2CtuEpEU-TZcirH4gEGGjbiXtIka8YHOyA2GpmJTAHRnTglTKao555tVZnV__NlF4ecyaAXz90uZPCswjc1Fb2DR905QqJWHSIGP3v37OXeoJgz_l1_hAFAHyPW8S" src="https://github.com/user-attachments/assets/7af71db9-a551-4ece-aa1f-8c2d5bf2f9a2" />

---

## **Key Innovations**

- **Provenance-first architecture** – Every claim is traceable to its source
- **Multi-agent orchestration** – Parallel execution, not just search
- **Graph-based synthesis** – Connects mechanisms, trials, patents, and bioactivity
- **Human-in-the-loop validation** – Scientists approve AI-suggested plans
- **Regulator-ready outputs** – 21 CFR Part 11 compliant, audit trails included

---

## **Pilot Results (n=30 Queries)**

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| **Time per Analysis** | 90 days | **<10 min** | 99.9% faster |
| **Cost per Candidate** | $85K–$100K | **$850** | 85% reduction |
| **Throughput** | 0.1/week | **50–100/week** | 500–1000× |
| **Provenance Coverage** | 41% | **94%** | 2.3× boost |
| **Precision@5** | N/A | **81%** | High accuracy |

---

## **Architecture**

### **Backend**
- **Master Agent** (CrewAI) + 5 specialized agents
- **Neo4j Knowledge Graph** + FAISS Vector Search
- **OPA Governance Layer** (audit logging, access control)
- **FastAPI** + **Google Cloud Run/GKE**

### **Frontend**
- **React 18** + TypeScript + Tailwind CSS
- **Cytoscape.js** for interactive graph visualization
- **Real-time WebSocket** agent monitoring

### **Compliance**
- **21 CFR Part 11** – Audit trails, e-signatures
- **HIPAA/GxP-ready** – Tokenized queries, field-level encryption
- **Zero data leakage** – Ephemeral results only
  
<img width="1890" height="906" alt="LLLHRkCs4FtdAQRxiNLGRBfTO86Y7yNAjfmOQyMEf3WVTJzeQIApeKcLfEouHO6zGs_GG_G2lScUf4DAaULyAJDlXcyUtz2VhEF6DNl9ld4xt2FiUF6CXjbdeMfk-1uAlQ-rGkKoTv881Wl7LILn0B4xNkgZK1KySMc7cQFXzQCetGu-l7_Fc1EEMYJ__RiLZOMLg54AXV3ro" src="https://github.com/user-attachments/assets/3ff85fbd-2a42-4b6b-80da-ba7eaa8193fa" />

---

##  **User Experience (Persona: Dr. Sharma)**

1. **Logs into platform**, enters query: *“Metformin in Breast Cancer”*
2. **Watches agents work** in real-time via live activity feed
3. **Explores interactive evidence graph** – discovers AMPK pathway link
4. **Clicks any node** to view full provenance (source, hash, confidence)
5. **Generates investment memo** – exports as PDF/PPT/JSON
<img width="773" height="565" alt="_- visual selection (5)" src="https://github.com/user-attachments/assets/0f4a0347-b97f-4d33-a33a-4a2cec25d259" />
---

##  **Product MVP**
 [Live Demo](https://the-mobius-pipeline.onrender.com) 
---

## **Competitive Edge**

| Feature | Competitors | **Möbius Pipeline** |
|---------|-------------|---------------------|
| Transparency | ❌ Black-box | ✅ **Full provenance** |
| Multi-Agent System | ❌ Monolithic | ✅ **5 specialized agents** |
| Audit-Ready Output | ❌ Rankings only | ✅ **Regulatory packages** |
| Human-in-the-Loop | ❌ Fully automated | ✅ **Plan approval workflow** |
| Real-Time Monitoring | ❌ No | ✅ **Live agent feed** |

---

## **Business Model**

**Tiered SaaS Pricing:**
- **Small Biotech**: $250K/year (5 analysts, 15 projects)
- **Mid Pharma**: $1.5M/year (20 analysts, 60 projects)
- **Large Pharma**: $5M+/year (50+ analysts, 150+ projects)

**+ Royalty Model**: 1–2% on approved repurposed indications

---

## **Team Axiom R&D**

| Role | Member | Expertise |
|------|--------|-----------|
| **Team Lead** | Shrinjita Paul | Full-stack, GenAI pipelines |
| **AI/ML Engineer** | Sahil Vaijanath Varde | LLM fine-tuning, AWS |
| **AI Engineer** | Sumedha Ghosh | Transformer architectures, validation |
| **Data Engineer** | Monami Sen | Neo4j, data pipelines, compliance |
| **Domain Scientist** | Ishayu Chakraborty | Pharma R&D, biological validation |

---

## **Roadmap**

- **Phase 1 (Completed)** – MVP with core agents, Neo4j, basic UI
- **Phase 2 (Pilot Ready)** – PK/PD agent, biomarker enrichment, GxP validation
- **Phase 3 (Planned)** – Real-time feeds, RL from feedback, FDA dossier assembly
- **Phase 4 (Continuous)** – Expansion to combo therapy, formulation optimization

---

## **Why Möbius Pipeline Wins**

- **Novel multi-agent + provenance architecture**
- **Graph-based synthesis across 5+ data types**
- **Human-in-the-loop for regulatory trust**
- **Scalable, cloud-native stack**
- **Clear ROI: 10–20× cost reduction**
- **Pilot-ready with industry interest**

---
**Built with ❤️ by Team Axiom R&D for EY Techathon 6.0**
