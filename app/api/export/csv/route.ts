import { NextResponse } from 'next/server';
import { mockLeads } from '../../../../data/mock-leads';

export async function GET() {
  const header = ['Empresa','Cidade','Estado','Nicho','Telefone','Site','Nota Google','Reviews','Score','Prioridade','Dor principal','Oferta sugerida','Status','Responsavel','Proximo passo'];
  const rows = mockLeads.map((lead) => [
    lead.companyName, lead.city, lead.state, lead.niche, lead.phone ?? '', lead.website ?? '', String(lead.googleRating ?? ''), String(lead.googleReviews ?? ''),
    String(lead.score360), lead.priority, lead.mainPain, lead.suggestedOffer, lead.status, lead.owner ?? '', lead.nextStep ?? ''
  ]);
  const csv = [header, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
  return new NextResponse(csv, { headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="radar-prospeccao-360-modelo.csv"' } });
}
