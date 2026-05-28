import { ScoreBreakdown as ScoreBreakdownType } from '../lib/types';

const items = [
  ['Potencial', 'businessPotential', 25],
  ['Dor digital', 'digitalPain', 25],
  ['Maturidade', 'commercialMaturity', 20],
  ['Contato', 'contactEase', 15],
  ['Investimento', 'investmentSignals', 15]
] as const;

export function ScoreBreakdown({ score }: { score: ScoreBreakdownType }) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {items.map(([label, key, max]) => (
        <div key={key} className="rounded-2xl border bg-white p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-black text-slate-950">{score[key]}<span className="text-sm font-medium text-slate-400">/{max}</span></p>
          <div className="mt-3 h-2 rounded-full bg-slate-100">
            <div className="h-2 rounded-full bg-v4-500" style={{ width: `${Math.min(100, (score[key] / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
