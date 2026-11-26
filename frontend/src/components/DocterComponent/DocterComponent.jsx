import DashboardLayout from '../DashboardLayout.jsx';

const DocterComponent = () => (
  <DashboardLayout
    section="Doctor dashboard"
    description="Your daily clinical work starts here."
  >
    <section className="grid gap-4 md:grid-cols-3" aria-label="Doctor workspace">
      {[
        ['Appointments', 'Review your schedule and upcoming consultations.'],
        ['Patient records', 'Access patient histories and clinical notes.'],
        ['Care coordination', 'Keep treatment plans and teams connected.'],
      ].map(([title, description]) => (
        <article key={title} className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm shadow-emerald-950/5">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </article>
      ))}
    </section>
  </DashboardLayout>
);

export default DocterComponent;
