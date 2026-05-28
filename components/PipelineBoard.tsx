import Link from 'next/link';
import { FUNNEL } from '../lib/constants';
import { Lead } from '../lib/types';
import { PriorityBadge } from './PriorityBadge';

export function PipelineBoard({ leads }: { leads: Lead[] }) {
  return (
    <div className="grid min-w-[1200px] grid-cols-9 gap-3">
      {FUNNEL.map((column) => {
        const items = leads.filter((lead) => lead.status === column.status);
        return (
          <div key={column.status} className="rounded-2xl border border-slate-200 bg-slate-100 p-3">
            <div className="mb-3">
              <h3 className="font-black text-slate-950">{column.title}</h3>
              <p className="text-xs text-slate-500">{items.length} leads</p>
            </div>
            <div className="space-y-3">
              {items.map((lead) => (
                <Link key={lead.id} href={`/leads/${lead.id}`} className="block rounded-xl border bg-white p-3 shadow-sm hover:border-v4-300">
                  <p className="text-sm font-bold text-slate-950">{lead.companyName}</p>
                  <p className="mt-1 text-xs text-slate-500">{lead.mainPain}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-lg font-black">{lead.score360}</span>
                    <PriorityBadge priority={lead.priority} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
