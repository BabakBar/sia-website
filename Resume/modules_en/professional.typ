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
    [Architected Azure Databricks platform (dev+prod) for 13 person Data/Analytics team; established secure baseline via Terraform (VNet injection, private endpoints, NSGs, Unity Catalog) enabling enterprise AI/ML workloads with repeatable, auditable deployments],
    [Designed automated SFTP credential rotation across 3 manufacturing plants using Azure Automation and Key Vault; yearly rotation with email notifications to replaced manual process],
    [Deployed internal CMDB microservice solution (5 Azure Functions, Web App) for asset governance and compliance tracking]
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
    [Deployed conversational AI for PhD program inquiries across 4 Spanish universities (DialogFlow on GCP: Cloud Functions)],
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
