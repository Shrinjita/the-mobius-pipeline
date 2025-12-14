from agents.tools import built_in_vertex_ai_search_tool
from agents import Agent

# Vertex AI Search tool for pharmaceutical data
pharma_search_tool = VertexAISearchTool(
data_store_ids=[
"projects/mobius-pipeline/locations/global/collections/default_collection/dataStores/pubmed-papers",
"projects/mobius-pipeline/locations/global/collections/default_collection/dataStores/clinical-trials",
"projects/mobius-pipeline/locations/global/collections/default_collection/dataStores/patent-database",
"projects/mobius-pipeline/locations/global/collections/default_collection/dataStores/chembl-data"
]
)

# Master Research Agent
master_agent = Agent(
model='gemini-2.0-flash',
name='mobius_master_agent',
instruction="""
You are the Möbius Pipeline Master Agent for pharmaceutical drug repurposing research.

Your role:
1. Decompose drug repurposing queries into specialized research tasks
2. Coordinate 5 specialized worker agents
3. Synthesize evidence into investment-ready reports
4. Ensure regulatory compliance and provenance tracking

Always provide confidence scores and source citations.
""",
tools=[pharma_search_tool]
)