#import "../template/src/lib.typ": cv-section, cv-entry

#cv-section("Professional Experience")

#cv-entry(
  title: [Cloud Engineer],
  society: [Continental AG],
  date: [07/2025 – Present],
  location: [Hannover, Germany],
  description: list(
    [Own the Salesforce–Azure–SAP integration platform serving teams in 57 countries. Lead engineers in Germany, India, Malaysia and the US who keep data flowing to analytics platforms including Databricks.],
    [Designed the development and production Azure Databricks environments for a 13-person analytics team. Codified private networking and data access controls with Terraform and Unity Catalog.],
    [Designed a credential rotation workflow for secure file transfers at three manufacturing plants.],
  ),
)

#cv-entry(
  title: [IT Systems Engineer],
  society: [Continental AG],
  date: [09/2022 – 06/2025],
  location: [Germany and Mexico],
  description: list(
    [Built predictive models for tire-compound properties in a virtual lab spanning 150+ models and 10,000+ laboratory tests. Developed retrieval-augmented generation (RAG) tools for manufacturing planning.],
    [Automated daily updates to an internal talent-matching platform, processing 70,000+ employee records across 56 countries with Python and AWS Lambda.],
    [Led data validation and prepared user acceptance testing for SAP production-planning rollouts in Belgium and Romania.],
  ),
)

#cv-entry(
  title: [AI Researcher (part-time)],
  society: [TechTalent-Lab, Polytechnic University of Catalonia],
  date: [12/2020 – 02/2022],
  location: [Barcelona, Spain],
  description: list([Deployed a conversational assistant for PhD programme enquiries across four Spanish universities.]),
)

#cv-entry(
  title: [Software Implementation Expert],
  society: [FANAP ICT],
  date: [07/2018 – 09/2020],
  location: [Tehran, Iran],
  description: list([Implemented the supply-chain module of an ERP system for MIDHCO mining operations, including integration and data migration.]),
)
