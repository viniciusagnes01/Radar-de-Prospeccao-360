import { Building2, Megaphone, Star, Target } from 'lucide-react';
import { LeadTable } from '../../components/LeadTable';
import { StatCard } from '../../components/StatCard';
import { mockLeads } from '../../data/mock-leads';
export default function DashboardPage() {
  const total = mockLeads.length; const highPriority = mockLeads.filter((lead) => lead.priority === 'Muito alta').length; const withoutSite = mockLeads.filter((lead) => !lead.website).length; const withAds = mockLeads.filter((lead) => lead.adsDetected).length; const avgScore = Math.round(mockLeads.reduce((sum, lead) => sum + lead.score360, 0) / total);
  return <main className="mx-auto max-w-6xl px-6 py-10"><div className="mb-8"><p className="text-sm font-semibold uppercase tracking-widest text-brand-600">Dashboard</p><h1 className="mt-2 text-3xl font-bold text-slate-950">Radar de oportunidades</h1><p className="mt-2 text-slate-600">Visão executiva de prospecção, priorização e diagnóstico digital.</p></div><div className="grid gap-4 md:grid-cols-5"><StatCard title="Empresas" value={total} icon={<Building2 />} /><StatCard title="Score médio" value={avgScore} icon={<Target />} /><StatCard title="Muito alta" value={highPriority} icon={<Star />} /><StatCard title="Sem site" value={withoutSite} icon={<Building2 />} /><StatCard title="Com ads" value={withAds} icon={<Megaphone />} /></div><section className="mt-8"><h2 className="mb-4 text-xl font-bold">Ranking de oportunidades</h2><LeadTable leads={[...mockLeads].sort((a, b) => b.score360 - a.score360)} /></section></main>;
}
