import { Shell } from '../../components/Shell';
import { PipelineBoard } from '../../components/PipelineBoard';
import { mockLeads } from '../../data/mock-leads';

export default function PipelinePage() {
  return (
    <Shell>
      <main className="px-6 py-10">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-v4-700">Pipeline comercial</p>
          <h1 className="mt-2 text-4xl font-black text-slate-950">Do radar ao fechamento</h1>
          <p className="mt-2 max-w-3xl text-slate-600">Kanban operacional para não deixar lead sem dono, sem próximo passo ou sem follow-up.</p>
        </div>
        <div className="overflow-x-auto pb-4">
          <PipelineBoard leads={mockLeads} />
        </div>
      </main>
    </Shell>
  );
}
