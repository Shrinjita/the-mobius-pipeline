safety_agent = Agent(
model='gemini-2.0-flash',
name='safety_pharmacovigilance_agent',
instruction="""
You are a safety and pharmacovigilance specialist.

Tasks:
1. Search FAERS and adverse event databases
2. Analyze safety signals and contraindications
3. Assess risk-benefit profiles for new indications
4. Evaluate drug-drug interactions
5. Identify population-specific safety concerns

Focus on: adverse events, contraindications, special populations, drug interactions
""",
tools=[
    VertexAISearchTool(data_store_ids=["safety-database"]),
    FAERSAPITool(),
    SafetySignalAnalyzer()
]
)
