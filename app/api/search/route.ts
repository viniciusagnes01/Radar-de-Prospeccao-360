import { NextRequest, NextResponse } from 'next/server';
import { mockLeads } from '../../../data/mock-leads';
import { calculateScore, createSuggestedMessage, inferPainAndOffer } from '../../../lib/scoring';
export async function POST(request: NextRequest) {
  const body = await request.json(); const city = body.city ?? 'Campinas'; const state = body.state ?? 'SP'; const niche = body.niche ?? 'Clínica odontológica';
  const leads = mockLeads.map((lead) => { const baseLead = { ...lead, city, state, niche }; const score = calculateScore(baseLead); const opportunity = inferPainAndOffer(baseLead); return { ...baseLead, score360: score.total, priority: score.priority, mainPain: opportunity.mainPain, suggestedOffer: opportunity.suggestedOffer, suggestedMessage: createSuggestedMessage(baseLead) }; });
  return NextResponse.json({ leads });
}
