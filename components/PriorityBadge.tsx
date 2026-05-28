import { Priority } from '../lib/types';
const styles: Record<Priority, string> = { 'Muito alta': 'bg-red-50 text-red-700 border-red-200', Alta: 'bg-orange-50 text-orange-700 border-orange-200', Média: 'bg-yellow-50 text-yellow-700 border-yellow-200', Baixa: 'bg-slate-50 text-slate-700 border-slate-200' };
export function PriorityBadge({ priority }: { priority: Priority }) { return <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${styles[priority]}`}>{priority}</span>; }
