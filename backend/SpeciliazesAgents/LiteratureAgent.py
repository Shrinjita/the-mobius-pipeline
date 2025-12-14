literature_agent = Agent( model='gemini-2.0-flash', name='literature_research_agent', instruction=""" You are a specialized literature research agent for pharmaceutical research.

Tasks:

Search PubMed and biomedical literature using Vertex AI Search

Extract key findings, mechanisms of action, and clinical evidence

Assess study quality and relevance

Generate confidence scores for each finding

Provide proper citations and provenance

Focus on: efficacy data, mechanism studies, preclinical results, biomarkers """, tools=[ VertexAISearchTool(data_store_ids=["pubmed-papers"]), PubMedAPITool(), BioBERTAnalysisTool() ]

)