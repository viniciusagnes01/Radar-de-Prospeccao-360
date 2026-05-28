'use client';

import { useState } from 'react';
import { Loader2, Search } from 'lucide-react';
import { Shell } from '../../components/Shell';
import { LeadTable } from '../../components/LeadTable';
import { Lead } from '../../lib/types';

export default function SearchPage() {
  const [loading, setLoading] = useState(false);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [error, setError] = useState('');

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError('');
    const form = new FormData(event.currentTarget);
    const payload = {
      city: String(form.get('city') ?? ''),
      state: String(form.get('state') ?? ''),
      niche: String(form.get('niche') ?? ''),
      limit: Number(form.get('limit') ?? 20)
    };

    const response = await fetch('/api/search', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? 'Erro na busca.');
      return;
    }

    setLeads(data.leads ?? []);
  }

  return (
    <Shell>
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-v4-700">Busca de oportunidades</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Cidade + nicho → lista priorizada</h1>
          <p className="mt-2 max-w-3xl text-slate-600">Com chave Google configurada, busca empresas reais. Sem chave, retorna base mockada para demonstração e desenvolvimento.</p>
        </div>

        <form onSubmit={onSubmit} className="grid gap-4 rounded-3xl border bg-white p-5 shadow-sm md:grid-cols-6">
          <Input name="city" label="Cidade" defaultValue="Campinas" />
          <Input name="state" label="Estado" defaultValue="SP" />
          <div className="md:col-span-2"><Input name="niche" label="Nicho" defaultValue="Clínica odontológica" /></div>
          <Input name="limit" label="Limite" defaultValue="20" type="number" />
          <button disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl bg-v4-700 px-5 py-3 font-bold text-white hover:bg-v4-900 disabled:opacity-60 md:mt-7">
            {loading ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />} Buscar
          </button>
        </form>

        {error ? <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div> : null}

        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-black">Empresas encontradas</h2>
              <p className="text-sm text-slate-500">Ordene por prioridade e use diagnóstico para abordagem.</p>
            </div>
            {leads.length ? <a href="/api/export/csv" className="rounded-xl border bg-white px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">Exportar CSV modelo</a> : null}
          </div>
          {leads.length ? <LeadTable leads={leads} /> : <EmptyState />}
        </section>
      </main>
    </Shell>
  );
}

function Input({ name, label, defaultValue, type = 'text' }: { name: string; label: string; defaultValue: string; type?: string }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <input name={name} type={type} className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 outline-none focus:border-v4-500 focus:ring-2 focus:ring-v4-100" defaultValue={defaultValue} />
    </label>
  );
}

function EmptyState() {
  return <div className="rounded-3xl border border-dashed bg-white p-10 text-center text-slate-500">Faça uma busca para gerar oportunidades com diagnóstico e score.</div>;
}
