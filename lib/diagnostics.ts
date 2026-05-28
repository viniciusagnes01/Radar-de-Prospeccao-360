import { Lead } from './types';

export function inferPainAndOffer(lead: Partial<Lead>): { mainPain: string; suggestedOffer: string; qualificationReason: string } {
  const digital = lead.digital;

  if (!lead.website) {
    return {
      mainPain: 'Sem site ou página clara de conversão',
      suggestedOffer: 'Landing page com WhatsApp, tracking e campanha de aquisição local',
      qualificationReason: 'Existe oportunidade evidente de transformar busca local em conversas comerciais.'
    };
  }

  if ((lead.googleRating ?? 5) < 4 || (lead.googleReviews ?? 999) < 50) {
    return {
      mainPain: 'Baixa reputação ou pouca prova social no Google',
      suggestedOffer: 'Otimização de Google Business Profile, estratégia de reviews e aquisição local',
      qualificationReason: 'A reputação pode estar limitando conversão de pessoas que já procuram pelo serviço.'
    };
  }

  if (digital?.adsDetected && !digital?.hasTracking) {
    return {
      mainPain: 'Sinais de mídia paga sem estrutura clara de mensuração',
      suggestedOffer: 'Auditoria de mídia, tracking, CRO e melhoria de funil',
      qualificationReason: 'Se já investe em tráfego, há espaço para vender eficiência e mensuração.'
    };
  }

  if (!digital?.hasInstagram || (digital?.lastSocialPostDays ?? 0) > 30) {
    return {
      mainPain: 'Presença social fraca ou desatualizada',
      suggestedOffer: 'Conteúdo orientado à conversão, social proof e campanhas locais',
      qualificationReason: 'Há sinal de descuido em percepção de marca e frequência de relacionamento.'
    };
  }

  return {
    mainPain: 'Oportunidade de escala e melhoria de aquisição digital',
    suggestedOffer: 'Diagnóstico de performance, tracking e plano de crescimento local',
    qualificationReason: 'Lead com presença mínima estruturada e possível oportunidade de ganho incremental.'
  };
}

export function createSuggestedMessage(lead: Partial<Lead>) {
  const company = lead.companyName ?? 'empresa';
  const city = lead.city ?? 'sua cidade';
  const niche = lead.niche ?? 'seu segmento';
  const pain = lead.mainPain ?? 'presença digital e captação local';

  return `Oi, tudo bem?\n\nEstava analisando empresas de ${niche} em ${city} e vi alguns pontos interessantes sobre a presença digital da ${company}.\n\nO principal ponto que me chamou atenção foi: ${pain}.\n\nTrabalho com diagnóstico de aquisição local e acredito que existem 2 ou 3 melhorias rápidas que podem aumentar a geração de conversas qualificadas.\n\nFaz sentido eu te mandar esse diagnóstico resumido?`;
}
