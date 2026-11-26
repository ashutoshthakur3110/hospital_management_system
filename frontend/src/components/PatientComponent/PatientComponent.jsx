import DashboardLayout from '../DashboardLayout.jsx';

const PatientComponent = () => (
  <DashboardLayout
    section="Patient dashboard"
    description="Keep your health information and care journey close at hand."
  >
    <section className="grid gap-4 md:grid-cols-3" aria-label="Patient services">
      {[
        ['Appointments', 'Review upcoming visits and care schedules.'],
        ['Medical records', 'Keep track of your health history and visit notes.'],
        ['Care team', 'See the people supporting your care.'],
      ].map(([title, description]) => (
        <article key={title} className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm shadow-emerald-950/5">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </article>
      ))}
    </section>
  </DashboardLayout>
);

export default PatientComponent;
