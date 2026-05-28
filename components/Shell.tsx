import Link from 'next/link';
import { ReactNode } from 'react';
import { BarChart3, KanbanSquare, Radar, Search, Sparkles } from 'lucide-react';

const nav = [
  { href: '/', label: 'Visão', icon: Radar },
  { href: '/search', label: 'Buscar', icon: Search },
  { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
  { href: '/pipeline', label: 'Pipeline', icon: KanbanSquare }
];

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white p-5 lg:block">
        <Link href="/" className="flex items-center gap-3 rounded-2xl bg-ink p-4 text-white shadow-soft">
          <div className="rounded-xl bg-v4-500 p-2"><Sparkles size={20} /></div>
          <div>
            <p className="text-sm font-semibold text-v4-100">Modo V4 ON</p>
            <p className="text-lg font-black">Radar 360</p>
          </div>
        </Link>
        <nav className="mt-8 space-y-2">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-xl px-4 py-3 font-semibold text-slate-700 hover:bg-v4-50 hover:text-v4-700">
                <Icon size={18} /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-v4-100 bg-v4-50 p-4">
          <p className="text-sm font-bold text-v4-900">Regra de ouro</p>
          <p className="mt-1 text-sm text-v4-700">Todo lead precisa sair com dor, oferta, mensagem e próximo passo.</p>
        </div>
      </aside>
      <main className="lg:pl-72">{children}</main>
    </div>
  );
}
