# Edge Vault / NAS Appliance Strategy

## Positioning

LocalDiabetic does not sell a generic AI box. It offers a local diabetic vault and lifestyle OS pattern: records, insurance, doctors, cookbooks, supplies, reminders, care notes, emergency sheets, Apple Watch alerts, family permissions, local search, and optional encrypted backup.

## Hardware Options

| Setup | Hardware | Best for | Cost estimate | Notes |
| --- | --- | --- | --- | --- |
| Minimum home | Existing phone + printed/emergency templates + encrypted cloud folder | first 30 days | $0-$50 | no NAS support burden |
| Practical home | Synology/QNAP 2-bay NAS | privacy-focused families | $300-$900 | strongest early LocalDiabetic home pilot |
| Technical home | TrueNAS mini/server | technical users | $600-$1500+ | flexible, higher support burden |
| Edge AI add-on | Jetson Orin Nano | local document helper | $250-$700+ | use only after vault workflow proven |
| Community node | NAS + locked admin process + volunteer desk | church/community center | $800-$2500 | must avoid storing member medical records unless governance exists |
| Clinic/community partner | NAS/server in partner environment | partner ops | varies | may trigger HIPAA/business associate concerns |

## Software Stack

- Synology Drive or equivalent file sync.
- Encrypted shared folders.
- Folder templates: Records, Insurance, Contacts, Labs, Appointments, Supplies, Recipes, Care Notes, Emergency Sheet.
- Local document OCR/search only after privacy review.
- Optional containerized local app.
- Backup: encrypted external drive + optional user-controlled cloud backup.
- Future: FHIR/SMART import where legally and technically available.

## Notification Model

- iPhone reminders and calendar as MVP.
- Apple Watch mirrors iPhone reminders.
- No claim of clinical alerting unless using regulated device/app pathway.
- Critical medical alerts remain device/clinician domain.

## Permission Model

- User is owner.
- Caregiver access is scoped by folder/topic.
- Emergency sheet can be printed or QR/NFC linked to non-sensitive summary.
- Revocation process must be simple.

## Pilot Plan

1. Build folder template and emergency sheet.
2. Install on one Synology NAS.
3. Test with synthetic/demo documents only.
4. Run three family walkthroughs.
5. Document support time and failure points.
6. Only then pilot with real user-owned records under consent.


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
