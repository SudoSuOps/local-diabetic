# LocalDiabetic

LocalDiabetic is local diabetic support infrastructure: care packs, trusted vendors, reminders, family coordination, local vaults, and real-world help without harvesting diabetic data.

Domains:

- `localdiabetic.com`
- `localdiabetic.org`

Contact email: `care@localdiabetic.com`

## Relationship to OpenDiabetic

OpenDiabetic Foundation is the privacy-first diabetic compute infrastructure side. LocalDiabetic is the real-world local deployment layer: human-in-the-loop support nodes, vendors, care packs, local vaults, and community operations.

## Safety

LocalDiabetic does not provide medical advice, diagnosis, treatment, medication dosing, wound-care instructions, or emergency triage. For medical questions, contact licensed medical professionals. For emergencies, call emergency services.

## Research Pack

The operator-grade LocalDiabetic strategy pack is in `docs/localdiabetic/`.

Key files:

- `localdiabetic_master_research_report.md`
- `localdiabetic_product_requirements_doc.md`
- `localdiabetic_ops_checklists.md`
- `localdiabetic_vendor_matrix.csv`
- `localdiabetic_care_pack_matrix.csv`
- `localdiabetic_pilot_tasks.csv`
- `localdiabetic_partnership_targets.csv`

## Development

```bash
npm install
npm run dev
npm run build
```

## Cloudflare Pages

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Custom domains: `localdiabetic.com`, `www.localdiabetic.com`, `localdiabetic.org`, `www.localdiabetic.org`
