import { ReactNode } from 'react';
export function StatCard({ title, value, description, icon }: { title: string; value: string | number; description?: string; icon?: ReactNode }) {
  return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-4"><div><p className="text-sm font-medium text-slate-500">{title}</p><p className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{value}</p></div>{icon ? <div className="rounded-xl bg-brand-50 p-3 text-brand-600">{icon}</div> : null}</div>{description ? <p className="mt-3 text-sm text-slate-500">{description}</p> : null}</div>;
}
