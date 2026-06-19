# LocalDiabetic Product Blueprint

## Product Definition

A LocalDiabetic Node is a local deployment that coordinates non-medical support around diabetic life. It can be a home/family deployment, community chapter, clinic partner deployment, NAS/edge appliance, care-pack fulfillment hub, vendor directory, or support coordination desk.

## MVP

- Static website and local pilot landing page.
- Care pack request and donor workflow.
- Vendor/volunteer intake forms.
- Palm Beach resource directory prototype.
- Emergency sheet and caregiver permission templates.
- Synology NAS vault demo.
- Apple Watch/iPhone reminder guide.
- Human-reviewed support inbox.

## V1

- Care Desk ticketing with categories: supplies, records, reminders, vendor referral, care pack, local resources, vault setup.
- Vetted vendor directory with renewal review.
- Volunteer coordination with background-check workflow for home-facing roles.
- Care pack inventory and fulfillment dashboard.
- Monthly impact report.

## V2

- LocalDiabetic Node admin console.
- Permissioned family/caregiver update workflow.
- Local vault app package for Synology/QNAP/TrueNAS.
- Edge agent for local document search and appointment prep.
- Research/developer opt-in bridge operated by OpenDiabetic compute.

## User Flow

1. Visitor lands on LocalDiabetic.com.
2. Chooses Get Help, Care Packs, Family, Vendor, Volunteer, Clinic, Donate, or Vault.
3. Reads safety boundary.
4. Submits non-emergency interest/request.
5. Human care desk categorizes request.
6. Local node responds with checklist, referral, care-pack action, or setup appointment.
7. Follow-up occurs within defined SLA.
8. Outcome logged without unnecessary health details.

## Data Flow

- Public site: no sensitive collection by default.
- Intake: minimum necessary contact/request data.
- Local vault: user-owned records stay on NAS/local storage.
- Support desk: stores operational notes, not full medical records.
- Sharing: explicit consent, scoped to purpose, revocable.
- Research: opt-in only through OpenDiabetic governance.

## Architecture Sketch

Phone/Watch reminders -> Local vault/NAS -> LocalDiabetic care desk -> vetted local vendors/volunteers -> OpenDiabetic compute for public-good infrastructure and research.

## Required Tools

- Static website.
- Secure intake forms with consent.
- Ticketing/help desk.
- Vendor CRM.
- Inventory sheet or lightweight warehouse app.
- Local NAS setup guide.
- Encrypted backup guide.
- Incident log.


## Non-Negotiable Doctrine

LocalDiabetic does not harvest diabetic data. It coordinates practical local help while keeping health records local-first wherever possible. It does not diagnose, prescribe, dose medication, triage emergencies, or replace licensed medical professionals. Every workflow must have explicit consent, human review, service boundaries, and a path to licensed care or emergency services when needed.


## Sources
1. **CDC National Diabetes Statistics Report** — CDC. https://www.cdc.gov/diabetes/php/data-research/index.html. Accessed 2026-06-19. Relevance: U.S. diabetes and prediabetes prevalence, diagnosed/undiagnosed burden, age 65+ prediabetes.
2. **Diabetes in America: Prevalence, Statistics, and Economic Impact** — American Diabetes Association. https://diabetes.org/about-diabetes/statistics/about-diabetes. Accessed 2026-06-19. Relevance: Cost of diagnosed diabetes, mortality, medical expenditure multiplier, ADA public statistics.
3. **Diabetes Basics** — CDC. https://www.cdc.gov/diabetes/about/index.html. Accessed 2026-06-19. Relevance: Complication framing, chronic disease definition, kidney failure/amputation/adult blindness burden.
4. **Living with Diabetes** — CDC. https://www.cdc.gov/diabetes/living-with/index.html. Accessed 2026-06-19. Relevance: Day-to-day diabetes self-management burden: food, activity, blood sugar checks, medicine, stress, checkups.
5. **Diabetes and Mental Health** — CDC. https://www.cdc.gov/diabetes/living-with/mental-health.html. Accessed 2026-06-19. Relevance: Mental health and diabetes interaction; depression risk.
6. **Diabetes & Foot Problems** — NIDDK. https://www.niddk.nih.gov/health-information/diabetes/overview/preventing-problems/foot-problems. Accessed 2026-06-19. Relevance: Foot-problem risk, daily foot checks, clinician-directed foot care.
7. **The HIPAA Privacy Rule** — HHS OCR. https://www.hhs.gov/hipaa/for-professionals/privacy/index.html. Accessed 2026-06-19. Relevance: HIPAA scope: covered entities, PHI rights, privacy safeguards.
8. **Health Privacy** — Federal Trade Commission. https://www.ftc.gov/business-guidance/privacy-security/health-privacy. Accessed 2026-06-19. Relevance: Consumer health data privacy and FTC enforcement posture for non-HIPAA health products.
9. **Software as a Medical Device** — FDA. https://www.fda.gov/medical-devices/digital-health-center-excellence/software-medical-device-samd. Accessed 2026-06-19. Relevance: Boundary for software that may become regulated medical-device software.
10. **Find a Health Center** — HRSA/HHS. https://findahealthcenter.hrsa.gov/. Accessed 2026-06-19. Relevance: Local clinic partner discovery and safety-net care navigation.
11. **Palm Beach County Community Services** — Palm Beach County. https://discover.pbcgov.org/communityservices/. Accessed 2026-06-19. Relevance: Pilot geography local service partnership discovery.
12. **211 Palm Beach/Treasure Coast** — 211 Palm Beach/Treasure Coast. https://211palmbeach.org/. Accessed 2026-06-19. Relevance: Local resource referral adjacency and partnership target.
13. **findhelp** — findhelp. https://www.findhelp.org/. Accessed 2026-06-19. Relevance: National social-service referral directory adjacency.
14. **Unite Us** — Unite Us. https://uniteus.com/. Accessed 2026-06-19. Relevance: Closed-loop social care referral platform adjacency.
15. **Meals on Wheels America** — Meals on Wheels America. https://www.mealsonwheelsamerica.org/. Accessed 2026-06-19. Relevance: Senior nutrition and local delivery partnership model.
16. **Nightscout** — Nightscout Foundation. https://www.nightscoutfoundation.org/. Accessed 2026-06-19. Relevance: Open-source diabetes community and CGM sharing ecosystem adjacency.
17. **Tidepool** — Tidepool. https://www.tidepool.org/. Accessed 2026-06-19. Relevance: Nonprofit diabetes data platform and open ecosystem adjacency.
18. **Synology NAS** — Synology. https://www.synology.com/. Accessed 2026-06-19. Relevance: NAS local vault hardware/software reference.
19. **QNAP NAS** — QNAP. https://www.qnap.com/. Accessed 2026-06-19. Relevance: NAS local vault hardware/software reference.
20. **TrueNAS** — iXsystems. https://www.truenas.com/. Accessed 2026-06-19. Relevance: Open storage platform for community node or technical users.
21. **NVIDIA Jetson Orin Nano** — NVIDIA. https://www.nvidia.com/en-us/autonomous-machines/embedded-systems/jetson-orin/nano-super-developer-kit/. Accessed 2026-06-19. Relevance: Edge AI appliance option for local inference.
22. **Apple HealthKit** — Apple Developer. https://developer.apple.com/health-fitness/. Accessed 2026-06-19. Relevance: iPhone/Apple Watch ecosystem and HealthKit integration constraints.
23. **HL7 FHIR** — HL7. https://www.hl7.org/fhir/. Accessed 2026-06-19. Relevance: Interoperable health-record data model reference.
24. **SMART on FHIR** — SMART Health IT. https://smarthealthit.org/. Accessed 2026-06-19. Relevance: Patient/provider app integration framework reference.
