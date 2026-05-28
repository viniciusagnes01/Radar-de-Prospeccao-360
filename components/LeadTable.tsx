import Link from 'next/link';
import { Lead } from '../lib/types';
import { PriorityBadge } from './PriorityBadge';

export function LeadTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Empresa</th>
            <th className="px-4 py-3">Google</th>
            <th className="px-4 py-3">Sinais</th>
            <th className="px-4 py-3">Dor principal</th>
            <th className="px-4 py-3">Score</th>
            <th className="px-4 py-3">Prioridade</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Ação</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-slate-50">
              <td className="px-4 py-4">
                <p className="font-bold text-slate-950">{lead.companyName}</p>
                <p className="text-xs text-slate-500">{lead.city}/{lead.state} · {lead.category}</p>
              </td>
              <td className="px-4 py-4">{lead.googleRating?.toFixed(1) ?? '-'} ★ / {lead.googleReviews ?? 0}</td>
              <td className="px-4 py-4 text-xs text-slate-600">
                <div>Site: {lead.website ? 'sim' : 'não'}</div>
                <div>Ads: {lead.digital.adsDetected ? 'sim' : 'não'}</div>
                <div>Tracking: {lead.digital.hasTracking ? 'sim' : 'não'}</div>
              </td>
              <td className="max-w-xs px-4 py-4 text-slate-600">{lead.mainPain}</td>
              <td className="px-4 py-4 text-xl font-black text-slate-950">{lead.score360}</td>
              <td className="px-4 py-4"><PriorityBadge priority={lead.priority} /></td>
              <td className="px-4 py-4"><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{lead.status}</span></td>
              <td className="px-4 py-4">
                <Link href={`/leads/${lead.id}`} className="font-bold text-v4-700 hover:text-v4-900">Diagnóstico</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
