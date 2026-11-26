import DashboardLayout from '../DashboardLayout.jsx';

const HospitalComponent = () => (
  <DashboardLayout
    section="Hospital dashboard"
    description="A central workspace for reception and administrative teams."
  >
    <section className="grid gap-4 md:grid-cols-3" aria-label="Hospital operations">
      {[
        ['Front desk', 'Coordinate arrivals, check-ins, and patient support.'],
        ['Scheduling', 'Keep appointments and daily operations organized.'],
        ['Administration', 'Stay connected with billing and hospital records.'],
      ].map(([title, description]) => (
        <article key={title} className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm shadow-emerald-950/5">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </article>
      ))}
    </section>
  </DashboardLayout>
);

export default HospitalComponent;
