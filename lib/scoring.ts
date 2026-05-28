import { HIGH_TICKET_NICHES } from './constants';
import { Lead, Priority, ScoreBreakdown } from './types';

export function getPriority(score: number): Priority {
  if (score >= 80) return 'Muito alta';
  if (score >= 65) return 'Alta';
  if (score >= 45) return 'Média';
  return 'Baixa';
}

export function calculateScore(lead: Partial<Lead>): ScoreBreakdown {
  const reasons: string[] = [];
  const niche = `${lead.niche ?? ''} ${lead.category ?? ''}`.toLowerCase();
  const digital = lead.digital;

  let businessPotential = 0;
  if (HIGH_TICKET_NICHES.some((term) => niche.includes(term))) {
    businessPotential += 10;
    reasons.push('Nicho com ticket ou LTV potencialmente alto.');
  }
  if ((lead.googleReviews ?? 0) >= 80) {
    businessPotential += 5;
    reasons.push('Volume relevante de avaliações indica demanda local.');
  }
  if ((lead.googleRating ?? 0) >= 4.2) {
    businessPotential += 5;
    reasons.push('Boa reputação no Google ajuda abordagem de escala.');
  }
  if (lead.city && lead.state) businessPotential += 5;

  let digitalPain = 0;
  if (!lead.website) {
    digitalPain += 8;
    reasons.push('Sem site encontrado: forte dor de conversão e presença.');
  }
  if (lead.website && !digital?.hasWhatsApp) digitalPain += 4;
  if (!digital?.hasInstagram) digitalPain += 4;
  if ((digital?.lastSocialPostDays ?? 0) > 30) digitalPain += 4;
  if ((lead.googleReviews ?? 999) < 50) digitalPain += 4;
  if ((lead.googleRating ?? 5) < 4) digitalPain += 5;

  let commercialMaturity = 0;
  if (digital?.hasWhatsApp) commercialMaturity += 5;
  if (digital?.hasForm) commercialMaturity += 4;
  if (digital?.hasTracking) commercialMaturity += 4;
  if (lead.website) commercialMaturity += 4;
  if (digital?.hasInstagram || digital?.hasFacebook || digital?.hasLinkedin) commercialMaturity += 3;

  let contactEase = 0;
  if (lead.phone) contactEase += 4;
  if (digital?.hasWhatsApp) contactEase += 5;
  if (lead.website) contactEase += 3;
  if (digital?.hasLinkedin) contactEase += 3;

  let investmentSignals = 0;
  if (digital?.adsDetected) {
    investmentSignals += 7;
    reasons.push('Sinal de mídia paga: possível maturidade para performance.');
  }
  if (digital?.hasTracking) investmentSignals += 3;
  if (digital?.hasInstagram) investmentSignals += 3;
  if (lead.website) investmentSignals += 2;

  businessPotential = Math.min(25, businessPotential);
  digitalPain = Math.min(25, digitalPain);
  commercialMaturity = Math.min(20, commercialMaturity);
  contactEase = Math.min(15, contactEase);
  investmentSignals = Math.min(15, investmentSignals);

  const total = businessPotential + digitalPain + commercialMaturity + contactEase + investmentSignals;
  return { businessPotential, digitalPain, commercialMaturity, contactEase, investmentSignals, total, priority: getPriority(total), reasons };
}
