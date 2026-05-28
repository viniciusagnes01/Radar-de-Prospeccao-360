import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Shell } from '../../../components/Shell';
import { PriorityBadge } from '../../../components/PriorityBadge';
import { ScoreBreakdown } from '../../../components/ScoreBreakdown';
import { mockLeads } from '../../../data/mock-leads';
import { calculateScore } from '../../../lib/scoring';

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  const lead = mockLeads.find((item) => item.id === params.id);
  if (!lead) notFound();
  const score = calculateScore(lead);

  return (
    <Shell>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/dashboard" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-v4-700"><ArrowLeft size={16} /> Voltar</Link>

        <div className="rounded-3xl border bg-white p-8 shadow-sm">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-v4-700">Diagnóstico 360</p>
              <h1 className="mt-2 text-4xl font-black text-slate-950">{lead.companyName}</h1>
              <p className="mt-2 text-slate-600">{lead.city}/{lead.state} · {lead.niche} · {lead.category}</p>
            </div>
            <div className="text-left md:text-right">
              <p className="text-5xl font-black text-slate-950">{lead.score360}</p>
              <PriorityBadge priority={lead.priority} />
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Info title="Google" value={`${lead.googleRating?.toFixed(1) ?? '-'} ★ / ${lead.googleReviews ?? 0} avaliações`} />
            <Info title="Site" value={lead.website || 'Não encontrado'} />
            <Info title="Contato" value={lead.phone || 'Não encontrado'} />
            <Info title="Instagram" value={lead.instagram || (lead.digital.hasInstagram ? 'Encontrado no site' : 'Não encontrado')} />
            <Info title="Anúncios" value={lead.digital.adsDetected ? 'Sinal encontrado' : 'Não identificado'} />
            <Info title="Tracking" value={lead.digital.hasTracking ? 'Encontrado' : 'Não encontrado'} />
          </div>

          <section className="mt-8">
            <h2 className="mb-4 text-2xl font-black">Quebra do Score 360</h2>
            <ScoreBreakdown score={score} />
          </section>

          <section className="mt-8 grid gap-4 md:grid-cols-3">
            <Box title="Principal dor" text={lead.mainPain} />
            <Box title="Oferta sugerida" text={lead.suggestedOffer} />
            <Box title="Por que abordar" text={lead.qualificationReason} />
          </section>

          <section className="mt-8 rounded-2xl border border-v4-100 bg-v4-50 p-5">
            <h2 className="text-xl font-black text-v4-900">Mensagem sugerida para SDR validar</h2>
            <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-white p-4 text-sm leading-6 text-slate-700">{lead.suggestedMessage}</pre>
          </section>

          <section className="mt-8 rounded-2xl border bg-white p-5">
            <h2 className="text-xl font-black">Próximo passo operacional</h2>
            <div className="mt-3 grid gap-4 md:grid-cols-3">
              <Info title="Responsável" value={lead.owner ?? 'Sem dono'} />
              <Info title="Status" value={lead.status} />
              <Info title="Próximo passo" value={`${lead.nextStep ?? 'Definir'}${lead.nextStepDate ? ` · ${lead.nextStepDate}` : ''}`} />
            </div>
          </section>

          <div className="mt-8 flex flex-wrap gap-3">
            {lead.googleMapsUrl ? <a href={lead.googleMapsUrl} target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-bold text-slate-700 hover:bg-slate-50">Google Maps <ExternalLink size={16} /></a> : null}
            {lead.website ? <a href={lead.website} target="_blank" className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 font-bold text-slate-700 hover:bg-slate-50">Site <ExternalLink size={16} /></a> : null}
            {lead.phone ? <a href={`https://wa.me/${lead.phone.replace(/\D/g, '')}`} target="_blank" className="inline-flex items-center gap-2 rounded-xl bg-v4-700 px-4 py-2 font-bold text-white hover:bg-v4-900">Chamar no WhatsApp</a> : null}
          </div>
        </div>
      </main>
    </Shell>
  );
}

function Info({ title, value }: { title: string; value: string }) {
  return <div className="rounded-2xl border bg-white p-4"><p className="text-xs font-bold uppercase tracking-wide text-slate-500">{title}</p><p className="mt-1 break-words font-bold text-slate-950">{value}</p></div>;
}
function Box({ title, text }: { title: string; text: string }) {
  return <div className="rounded-2xl border bg-slate-50 p-5"><h3 className="font-black text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>;
}
