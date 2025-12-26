// Professional Experience
#import "@preview/brilliant-cv:3.1.1": cv-section, cv-entry

#cv-section("Professional Experience")

// Continental AG - Cloud Engineer (Current Role)
#cv-entry(
  title: [Cloud Engineer],
  society: [Continental AG],
  date: [07/2025 – Present],
  location: [Hannover, Germany],
  description: list(
    [Owned Azure Databricks platform for Data/Analytics team; built secure baseline via Terraform (VNet injection, private endpoints, Unity Catalog) enabling enterprise AI/ML workloads with repeatable, auditable deployments],
    [Engineered credential rotation system for SFTP users using Azure Automation, Key Vault, and notification workflows; eliminated manual password management and reduced security exposure windows],
    [Delivered internal CMDB microservice solution (5 Azure Functions, Web App) for asset governance and compliance tracking]
  ),
)

// Continental AG - IT Solutions Engineer
#cv-entry(
  title: [IT Systems Engineer],
  society: [Continental AG],
  date: [09/2022 – 06/2025],
  location: [Germany & Mexico],
  description: list(
    [Automated daily data pipeline for global Talent Matching platform (56 countries, 70k+ employee records): Python on AWS Lambda extracting and transforming SuccessFactors data],
    [Built ML models across Tires R&D and production: Virtual Lab for tire compound prediction (150+ models, 10k+ lab tests) and RAG systems for manufacturing planning],
    [Owned key delivery tasks across enterprise programs: Drove data validation/UAT readiness for SAP PP/IBP/APO rollouts (Belgium, Romania) and shipped internal Automotive Windows/Web applications],
  ),
)

// TechTalent-Lab - AI Researcher
#cv-entry(
  title: [AI Researcher (Part-time)],
  society: [TechTalent-Lab – UPC],
  date: [12/2020 – 02/2022],
  location: [Barcelona, Spain],
  description: list(
    [Developed and deployed conversational AI for PhD program inquiries across 4 Spanish universities (DialogFlow on GCP: Cloud Functions)],
  ),
)

// FANAP - Software Implementation Expert
#cv-entry(
  title: [Software Implementation Expert],
  society: [FANAP ICT],
  date: [07/2018 – 09/2020],
  location: [Tehran, Iran],
  description: list(
    [Implemented end-to-end ERP Supply Chain module for MIDHCO mining operations (7,000+ employees), managing system integration and large-scale data migration],
  ),
)
