import DashboardLayout from '../DashboardLayout.jsx';

const MedicalComponent = () => (
  <DashboardLayout
    section="Medical dashboard"
    description="Support clinical teams with connected medical services."
  >
    <section className="grid gap-4 md:grid-cols-3" aria-label="Medical services">
      {[
        ['Pharmacy', 'Coordinate medicine and dispensary workflows.'],
        ['Laboratory', 'Keep diagnostic services and care teams connected.'],
        ['Clinical support', 'Support nursing, wards, and day-to-day patient care.'],
      ].map(([title, description]) => (
        <article key={title} className="rounded-2xl border border-emerald-900/10 bg-white p-6 shadow-sm shadow-emerald-950/5">
          <h2 className="text-base font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
        </article>
      ))}
    </section>
  </DashboardLayout>
);

export default MedicalComponent;
