import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { DEFAULT_DIGITAL } from '../../../lib/constants';
import { createSuggestedMessage, inferPainAndOffer } from '../../../lib/diagnostics';
import { searchGooglePlaces } from '../../../lib/google-places';
import { calculateScore } from '../../../lib/scoring';
import { auditWebsite } from '../../../lib/site-audit';
import { mockLeads } from '../../../data/mock-leads';
import { Lead } from '../../../lib/types';

const schema = z.object({
  city: z.string().min(2),
  state: z.string().min(2).max(2),
  niche: z.string().min(2),
  limit: z.number().min(1).max(60).optional()
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: 'Preencha cidade, estado e nicho corretamente.' }, { status: 400 });
  }

  const { city, state, niche, limit = 20 } = parsed.data;

  try {
    const rawCompanies = process.env.GOOGLE_MAPS_API_KEY
      ? await searchGooglePlaces({ city, state, niche, limit })
      : mockLeads.map((lead) => ({ ...lead, city, state, niche })).slice(0, limit);

    const enriched = await Promise.all(rawCompanies.map(async (company, index) => {
      const siteAudit = await auditWebsite(company.website);
      const digital = {
        ...DEFAULT_DIGITAL,
        ...company.digital,
        hasWebsite: Boolean(company.website),
        ...siteAudit,
        adsDetected: company.digital?.adsDetected ?? false
      };

      const baseLead: Partial<Lead> = {
        ...company,
        id: company.id ?? `lead_${index + 1}`,
        city,
        state,
        niche,
        digital
      };
      const score = calculateScore(baseLead);
      const diagnosis = inferPainAndOffer({ ...baseLead, score360: score.total, priority: score.priority });
      const finalLead: Lead = {
        id: baseLead.id!,
        companyName: baseLead.companyName ?? 'Empresa sem nome',
        city,
        state,
        niche,
        category: baseLead.category ?? niche,
        address: baseLead.address,
        phone: baseLead.phone,
        website: baseLead.website,
        googleMapsUrl: baseLead.googleMapsUrl,
        latitude: baseLead.latitude,
        longitude: baseLead.longitude,
        googleRating: baseLead.googleRating,
        googleReviews: baseLead.googleReviews,
        instagram: baseLead.instagram,
        facebook: baseLead.facebook,
        linkedin: baseLead.linkedin,
        digital,
        score360: score.total,
        priority: score.priority,
        mainPain: diagnosis.mainPain,
        suggestedOffer: diagnosis.suggestedOffer,
        qualificationReason: diagnosis.qualificationReason,
        suggestedMessage: createSuggestedMessage({ ...baseLead, mainPain: diagnosis.mainPain }),
        status: 'Novo',
        owner: undefined,
        nextStep: 'Validar lead e preparar abordagem',
        nextStepDate: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      return finalLead;
    }));

    return NextResponse.json({ leads: enriched.sort((a, b) => b.score360 - a.score360), source: process.env.GOOGLE_MAPS_API_KEY ? 'google_places' : 'mock' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Erro ao buscar oportunidades.' }, { status: 500 });
  }
}
