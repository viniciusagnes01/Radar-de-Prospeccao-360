import Link from 'next/link';
import { ArrowRight, BarChart3, Database, Search, Target, Workflow } from 'lucide-react';
import { Shell } from '../components/Shell';

export default function HomePage() {
  return (
    <Shell>
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-3xl bg-gradient-to-br from-ink via-v4-900 to-v4-600 p-10 text-white shadow-soft">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-v4-100">Modo V4 ON</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            Radar de Prospecção 360 para encontrar, diagnosticar e priorizar oportunidades comerciais.
          </h1>
          <p className="mt-6 max-w-3xl text-lg text-v4-50">
            Digite cidade + nicho, encontre empresas, avalie presença digital, gere Score 360, mensagem de abordagem e próximo passo de SDR.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/search" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 font-bold text-v4-700 shadow-sm hover:bg-v4-50">
              Buscar oportunidades <ArrowRight size={18} />
            </Link>
            <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-5 py-3 font-bold text-white hover:bg-white/10">
              Ver dashboard
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <Feature icon={<Search />} title="Descoberta" text="Busca empresas reais por cidade e nicho usando Google Places API no backend." />
          <Feature icon={<Target />} title="Diagnóstico 360" text="Analisa Google, site, WhatsApp, social, tracking, anúncios e sinais de maturidade." />
          <Feature icon={<Workflow />} title="Operação comercial" text="Prioridade, dor, oferta, mensagem e status de abordagem no mesmo fluxo." />
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <Database className="text-v4-700" />
            <h2 className="mt-4 text-2xl font-black">Arquitetura pronta para evoluir</h2>
            <p className="mt-2 text-slate-600">O MVP funciona com mocks e API route. A estrutura já separa módulos para Google Places, auditoria de site, Meta Ads e banco.</p>
          </div>
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <BarChart3 className="text-v4-700" />
            <h2 className="mt-4 text-2xl font-black">Gestão com foco em ação</h2>
            <p className="mt-2 text-slate-600">O dashboard não mostra só volume. Ele responde quem chamar primeiro, por quê, com qual argumento e próximo passo.</p>
          </div>
        </div>
      </section>
    </Shell>
  );
}

function Feature({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="inline-flex rounded-xl bg-v4-50 p-3 text-v4-700">{icon}</div>
      <h2 className="mt-4 text-xl font-black">{title}</h2>
      <p className="mt-2 text-slate-600">{text}</p>
    </div>
  );
}
