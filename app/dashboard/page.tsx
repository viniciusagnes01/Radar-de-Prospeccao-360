import { Building2, Megaphone, PhoneCall, Star, Target } from 'lucide-react';
import { Shell } from '../../components/Shell';
import { StatCard } from '../../components/StatCard';
import { LeadTable } from '../../components/LeadTable';
import { mockLeads } from '../../data/mock-leads';

export default function DashboardPage() {
  const leads = [...mockLeads].sort((a, b) => b.score360 - a.score360);
  const total = leads.length;
  const highPriority = leads.filter((lead) => lead.priority === 'Muito alta').length;
  const withoutSite = leads.filter((lead) => !lead.website).length;
  const withAds = leads.filter((lead) => lead.digital.adsDetected).length;
  const withPhone = leads.filter((lead) => lead.phone).length;
  const avgScore = Math.round(leads.reduce((sum, lead) => sum + lead.score360, 0) / total);

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-v4-700">Dashboard executivo</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Radar de oportunidades</h1>
          <p className="mt-2 text-slate-600">Visão de volume, prioridade, gargalos digitais e próximos leads para abordagem.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-5">
          <StatCard title="Empresas" value={total} icon={<Building2 />} />
          <StatCard title="Score médio" value={avgScore} icon={<Target />} />
          <StatCard title="Muito alta" value={highPriority} icon={<Star />} />
          <StatCard title="Sem site" value={withoutSite} icon={<Building2 />} />
          <StatCard title="Com telefone" value={withPhone} icon={<PhoneCall />} />
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <StatCard title="Com anúncios" value={withAds} description="Sinal de maturidade para vender performance." icon={<Megaphone />} />
          <StatCard title="Sem tracking" value={leads.filter((l) => !l.digital.hasTracking).length} description="Oportunidade de auditoria e mensuração." />
          <StatCard title="Baixa prova social" value={leads.filter((l) => (l.googleReviews ?? 0) < 50).length} description="Oportunidade de reputação local." />
        </div>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-black">Ranking V4 de abordagem</h2>
          <LeadTable leads={leads} />
        </section>
      </main>
    </Shell>
  );
}
