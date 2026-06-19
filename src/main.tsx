import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const CONTACT_EMAIL = 'care@localdiabetic.com'

const paths = [
  ['People living with diabetes', 'Get a practical checklist, care-pack path, local resource map, and local vault plan.'],
  ['Caregivers and family', 'Create an emergency sheet, permission boundaries, appointment prep, and support-circle workflow.'],
  ['Donors', 'Sponsor care packs, local pilots, vendor verification, and privacy-first support operations.'],
  ['Vendors and volunteers', 'Join a vetted local network with clear boundaries and no-medical-advice rules.'],
  ['Clinics and educators', 'Connect people to non-medical support after the visit without turning LocalDiabetic into clinical care.'],
  ['Builders and researchers', 'Use OpenDiabetic compute infrastructure while LocalDiabetic handles the local human layer.'],
]

const packs = ['Starter Diabetic Care Pack', 'Foot Protection Pack', 'Post-Hospital Recovery Pack', 'Wound-Care Organization Pack', 'Senior Support Pack', 'Family/Caregiver Pack', 'Food Stability Pack', 'NAS Vault Starter Pack']
const vendors = ['Pharmacies', 'Medical supply stores', 'Podiatrists', 'Wound-care centers', 'Transportation', 'Food banks', 'Home health agencies', 'Apple Watch / NAS setup helpers']
const roadmap = [
  ['30 days', 'Launch site, intake forms, care-pack matrix, vendor intake, volunteer intake, donor page, Palm Beach pilot map.'],
  ['60 days', 'First care-pack pilot, first vetted vendors, first 25 support requests, emergency sheet workflow, reminder setup workflow.'],
  ['90 days', 'Local node beta, 50 users supported, 25 packs delivered, 10 vendors vetted, 10 volunteers onboarded, impact report.'],
]

function App() {
  return (
    <div className="min-h-screen bg-[#f8fbf7] text-slate-950">
      <a className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-xl focus:bg-[#f2b632] focus:px-4 focus:py-3 focus:font-black focus:text-[#073f3b]" href="#main">Skip to content</a>
      <header className="sticky top-0 z-40 border-b border-teal-950/10 bg-white/92 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8" aria-label="Main navigation">
          <a href="#top" className="flex items-center gap-3 rounded-2xl font-black text-[#073f3b]" aria-label="LocalDiabetic home">
            <span className="grid h-11 w-11 place-items-center rounded-2xl bg-[#f2b632] text-xl">LD</span>
            <span className="text-xl">Local<span className="text-[#b98211]">Diabetic</span></span>
          </a>
          <div className="hidden items-center gap-5 text-sm font-bold text-slate-700 lg:flex">
            <a href="#get-help" className="hover:text-[#0f766e]">Get help</a>
            <a href="#care-packs" className="hover:text-[#0f766e]">Care packs</a>
            <a href="#vendors" className="hover:text-[#0f766e]">Vendors</a>
            <a href="#vault" className="hover:text-[#0f766e]">Vault</a>
            <a href="#pilot" className="hover:text-[#0f766e]">Pilot</a>
            <a href="#contact" className="hover:text-[#0f766e]">Contact</a>
          </div>
        </nav>
        <div className="border-t border-teal-950/10 px-5 py-3 lg:hidden">
          <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto text-sm font-black text-slate-700">
            {['get-help:Get help','care-packs:Packs','vendors:Vendors','vault:Vault','contact:Contact'].map((item) => {
              const [id,label] = item.split(':')
              return <a key={id} className="shrink-0 rounded-full bg-[#eef8f3] px-4 py-2" href={`#${id}`}>{label}</a>
            })}
          </div>
        </div>
      </header>

      <main id="main">
        <section id="top" className="bg-[radial-gradient(circle_at_top_right,#d8f3eb,transparent_34%),linear-gradient(135deg,#ffffff,#f6fbf8_52%,#eaf7f4)] px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_.95fr] lg:items-center">
            <div>
              <p className="inline-flex rounded-full border border-[#0f766e]/20 bg-white px-4 py-2 text-sm font-bold text-[#0f766e] shadow-sm">Local help. Human review. No data harvesting.</p>
              <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[1.02] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">Local support for diabetic life.</h1>
              <p className="mt-7 max-w-3xl text-xl leading-9 text-slate-700">LocalDiabetic turns privacy-first diabetic compute into real-world help: care packs, trusted vendors, reminders, family coordination, local vaults, and community support nodes.</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#0f766e] px-7 py-3 font-black text-white shadow-lg shadow-teal-900/15 hover:bg-[#0b5f59]" href={`mailto:${CONTACT_EMAIL}?subject=LocalDiabetic%20Get%20Help`}>Get local help</a>
                <a className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-[#0f766e]/25 bg-white px-7 py-3 font-black text-[#07554f] hover:bg-teal-50" href={`mailto:${CONTACT_EMAIL}?subject=LocalDiabetic%20Pilot%20Partner`}>Start a local node</a>
              </div>
            </div>
            <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-teal-950/10">
              <div className="rounded-[1.5rem] bg-[#062f2d] p-6 text-white">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f2b632]">LocalDiabetic Node</p>
                <div className="mt-6 grid gap-3">
                  {['Care desk', 'Care packs', 'Trusted vendors', 'Family workflows', 'Local vault / NAS', 'Phone + watch reminders'].map((item, index) => (
                    <div key={item} className="grid grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-white/10 bg-white/7 p-4">
                      <span className="grid h-10 w-10 place-items-center rounded-xl bg-[#f2b632] font-black text-[#062f2d]">{index + 1}</span>
                      <span className="font-bold">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-6 rounded-2xl bg-white/8 p-4 text-sm leading-6 text-white/78">LocalDiabetic coordinates non-medical support. It does not diagnose, treat, dose medication, or triage emergencies.</p>
              </div>
            </div>
          </div>
        </section>

        <Section id="get-help" eyebrow="Get help" title="Choose the local support path that fits." copy="LocalDiabetic is built for the person, the caregiver, and the local support circle. Start with a concrete non-emergency need.">
          <Grid>{paths.map(([title, body]) => <Card key={title} title={title} body={body} />)}</Grid>
        </Section>

        <Section id="doctrine" dark eyebrow="Trust doctrine" title="We do not harvest diabetic data." copy="Diabetic support should serve the person living with diabetes. LocalDiabetic uses local-first records, explicit consent, human review, and practical service boundaries.">
          <div className="mt-8 rounded-[2rem] border border-[#f2b632]/40 bg-[#f2b632] p-6 text-2xl font-black leading-tight text-[#073f3b]">The cloud coordinates only where needed. The person owns their records.</div>
        </Section>

        <Section id="care-packs" dark eyebrow="Care packs" title="Digital tools are not enough." copy="Care packs turn support into something visible: a checklist, a folder, socks, storage, reminder setup, emergency sheets, and local resource cards. No prescription items. No treatment protocols.">
          <Grid>{packs.map((pack) => <Card dark key={pack} title={pack} body="Organization, dignity, and practical support with clear medical boundaries." />)}</Grid>
        </Section>

        <Section id="vendors" eyebrow="Vendor trust network" title="Trusted local help has to be vetted." copy="LocalDiabetic maps and verifies local partners for supplies, transport, food, home support, clinical referrals, and tech setup. Vendors must accept privacy and no-medical-advice boundaries.">
          <Grid>{vendors.map((vendor) => <Card key={vendor} title={vendor} body="Verify identity, licensing where applicable, insurance where applicable, pricing transparency, and complaint process." />)}</Grid>
        </Section>

        <Section id="vault" eyebrow="LocalDiabetic Vault" title="A local vault for diabetic life." copy="The vault concept organizes records, insurance, doctors, cookbooks, supplies, care notes, emergency sheets, and family permissions on a user-controlled NAS or encrypted local store.">
          <div className="mt-10 grid gap-5 lg:grid-cols-4">
            {['Phone / Watch reminders', 'NAS / local records', 'Edge helper', 'Family permissions'].map((tier, index) => <Card key={tier} title={`${index + 1}. ${tier}`} body="Local-first by default. Optional sharing. Human review for sensitive workflows." />)}
          </div>
        </Section>

        <Section id="pilot" dark eyebrow="Pilot plan" title="Start local. Prove trust. Publish impact." copy="Recommended first pilot: Palm Beach County church/community center plus podiatry/wound-care advisor hybrid. Serve 25 support requests and deliver 25 care packs in 90 days.">
          <Grid>{roadmap.map(([title, body]) => <Card dark key={title} title={title} body={body} />)}</Grid>
        </Section>

        <Section id="research" eyebrow="Research pack" title="Operator-grade build strategy is included." copy="This repo includes the full LocalDiabetic market research pack, product requirements, operations checklists, vendor matrix, care pack matrix, pilot tasks, and partnership targets.">
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a className="inline-flex rounded-2xl border border-[#0f766e]/25 bg-white px-6 py-3 font-black text-[#07554f] hover:bg-teal-50" href="/docs/localdiabetic/localdiabetic_master_research_report.md">Master report</a>
            <a className="inline-flex rounded-2xl border border-[#0f766e]/25 bg-white px-6 py-3 font-black text-[#07554f] hover:bg-teal-50" href="/docs/localdiabetic/localdiabetic_product_requirements_doc.md">PRD</a>
            <a className="inline-flex rounded-2xl border border-[#0f766e]/25 bg-white px-6 py-3 font-black text-[#07554f] hover:bg-teal-50" href="/docs/localdiabetic/localdiabetic_ops_checklists.md">Ops checklists</a>
          </div>
        </Section>

        <section id="contact" className="bg-white px-5 py-16 sm:px-8 lg:py-24">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#073f3b] p-8 text-center text-white shadow-2xl shadow-teal-950/15 sm:p-12">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#f7d37a]">Contact</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Build local diabetic support.</h2>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/78">Reach out as a person living with diabetes, caregiver, donor, volunteer, vendor, clinician, community host, builder, or pilot partner.</p>
            <a className="mt-8 inline-flex min-h-12 items-center justify-center rounded-2xl bg-[#f2b632] px-7 py-3 font-black text-[#073f3b] hover:bg-[#e2a923]" href={`mailto:${CONTACT_EMAIL}?subject=LocalDiabetic%20Mission%20Interest`}>Email {CONTACT_EMAIL}</a>
          </div>
        </section>
      </main>

      <footer className="bg-[#041f1d] px-5 py-10 text-white sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xl font-black">Local<span className="text-[#f2b632]">Diabetic</span></p>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">LocalDiabetic provides organization, reminders, local resource coordination, care pack operations, and non-medical support. It does not provide medical advice, diagnosis, treatment, medication dosing, wound-care instructions, or emergency triage. For medical questions, contact licensed medical professionals. For emergencies, call emergency services.</p>
          <p className="mt-3 text-sm text-slate-300">Contact: <a className="font-semibold text-white underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
        </div>
      </footer>
    </div>
  )
}

function Section({ id, eyebrow, title, copy, children, dark = false }: { id: string; eyebrow: string; title: string; copy: string; children: React.ReactNode; dark?: boolean }) {
  return <section id={id} className={`${dark ? 'bg-[#073f3b] text-white' : 'bg-[#f8fbf7] text-slate-950'} px-5 py-16 sm:px-8 lg:py-24`}>
    <div className="mx-auto max-w-7xl">
      <p className={`text-sm font-bold uppercase tracking-[0.18em] ${dark ? 'text-[#f2b632]' : 'text-[#b98211]'}`}>{eyebrow}</p>
      <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>
      <p className={`mt-5 max-w-4xl text-lg leading-8 ${dark ? 'text-white/78' : 'text-slate-700'}`}>{copy}</p>
      {children}
    </div>
  </section>
}
function Grid({ children }: { children: React.ReactNode }) { return <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{children}</div> }
function Card({ title, body, dark = false }: { title: string; body: string; dark?: boolean }) {
  return <article className={`rounded-3xl border p-6 shadow-sm ${dark ? 'border-white/15 bg-white/8 text-white' : 'border-slate-200 bg-white text-slate-950'}`}><h3 className="text-xl font-black">{title}</h3><p className={`mt-3 leading-7 ${dark ? 'text-white/75' : 'text-slate-700'}`}>{body}</p></article>
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>)
