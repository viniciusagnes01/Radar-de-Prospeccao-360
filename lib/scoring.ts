import { Lead, Priority, ScoreBreakdown } from './types';

const highTicketNiches = ['clínica', 'clinica', 'odontologia', 'odontológica', 'estética', 'estetica', 'imobiliária', 'imobiliaria', 'advocacia', 'escola', 'faculdade', 'academia', 'concessionária', 'concessionaria'];

export function getPriority(score: number): Priority {
  if (score >= 80) return 'Muito alta';
  if (score >= 65) return 'Alta';
  if (score >= 45) return 'Média';
  return 'Baixa';
}

export function calculateScore(lead: Partial<Lead>): ScoreBreakdown {
  const niche = `${lead.niche ?? ''} ${lead.category ?? ''}`.toLowerCase();
  let businessPotential = 0;
  if (highTicketNiches.some((term) => niche.includes(term))) businessPotential += 10;
  if ((lead.googleReviews ?? 0) >= 80) businessPotential += 5;
  if ((lead.googleRating ?? 0) >= 4.2) businessPotential += 5;
  if (lead.city && lead.state) businessPotential += 5;

  let digitalPain = 0;
  if (!lead.website) digitalPain += 8;
  if (lead.website && !lead.hasWhatsApp) digitalPain += 3;
  if (!lead.instagram) digitalPain += 4;
  if ((lead.lastSocialPostDays ?? 0) > 30) digitalPain += 5;
  if ((lead.googleReviews ?? 999) < 50) digitalPain += 4;
  if ((lead.googleRating ?? 5) < 4) digitalPain += 4;

  let commercialMaturity = 0;
  if (lead.hasWhatsApp) commercialMaturity += 5;
  if (lead.hasForm) commercialMaturity += 4;
  if (lead.hasTracking) commercialMaturity += 4;
  if (lead.website) commercialMaturity += 4;
  if (lead.instagram || lead.facebook || lead.linkedin) commercialMaturity += 3;

  let contactEase = 0;
  if (lead.phone) contactEase += 4;
  if (lead.hasWhatsApp) contactEase += 5;
  if (lead.website) contactEase += 3;
  if (lead.linkedin) contactEase += 3;

  let investmentSignals = 0;
  if (lead.adsDetected) investmentSignals += 7;
  if (lead.hasTracking) investmentSignals += 3;
  if (lead.instagram) investmentSignals += 3;
  if (lead.website) investmentSignals += 2;

  businessPotential = Math.min(25, businessPotential);
  digitalPain = Math.min(25, digitalPain);
  commercialMaturity = Math.min(20, commercialMaturity);
  contactEase = Math.min(15, contactEase);
  investmentSignals = Math.min(15, investmentSignals);
  const total = businessPotential + digitalPain + commercialMaturity + contactEase + investmentSignals;
  return { businessPotential, digitalPain, commercialMaturity, contactEase, investmentSignals, total, priority: getPriority(total) };
}

export function inferPainAndOffer(lead: Partial<Lead>): { mainPain: string; suggestedOffer: string } {
  if (!lead.website) return { mainPain: 'Sem site ou página clara de conversão', suggestedOffer: 'Landing page com WhatsApp, tracking e campanha local' };
  if ((lead.googleRating ?? 5) < 4 || (lead.googleReviews ?? 999) < 50) return { mainPain: 'Baixa reputação ou pouca prova social no Google', suggestedOffer: 'Otimização de Google Business Profile e estratégia de reviews' };
  if (lead.adsDetected && !lead.hasTracking) return { mainPain: 'Sinais de mídia paga sem estrutura clara de mensuração', suggestedOffer: 'Auditoria de mídia, tracking e melhoria de conversão' };
  if (!lead.instagram || (lead.lastSocialPostDays ?? 0) > 30) return { mainPain: 'Presença social fraca ou desatualizada', suggestedOffer: 'Conteúdo, social e calendário de aquisição' };
  return { mainPain: 'Oportunidade de escala e melhoria de aquisição digital', suggestedOffer: 'Diagnóstico de performance e plano de crescimento local' };
}

export function createSuggestedMessage(lead: Partial<Lead>) {
  return `Oi, tudo bem? Estava analisando empresas de ${lead.niche ?? 'seu segmento'} em ${lead.city ?? 'sua cidade'} e vi alguns pontos interessantes sobre a presença digital da ${lead.companyName ?? 'empresa'}.\n\nParece existir uma oportunidade de melhorar a captação local, principalmente em Google, presença digital e conversão para WhatsApp.\n\nPosso te mandar um diagnóstico rápido com 2 ou 3 pontos que encontrei?`;
}
