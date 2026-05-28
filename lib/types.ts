export type Priority = 'Muito alta' | 'Alta' | 'Média' | 'Baixa';

export type Lead = {
  id: string;
  companyName: string;
  city: string;
  state: string;
  niche: string;
  category: string;
  address?: string;
  phone?: string;
  website?: string;
  googleMapsUrl?: string;
  googleRating?: number;
  googleReviews?: number;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  hasWhatsApp?: boolean;
  hasForm?: boolean;
  hasTracking?: boolean;
  adsDetected?: boolean;
  lastSocialPostDays?: number;
  score360: number;
  priority: Priority;
  mainPain: string;
  suggestedOffer: string;
  suggestedMessage: string;
  status: 'Novo' | 'Validado' | 'Abordado' | 'Reunião agendada' | 'Proposta' | 'Ganho' | 'Perdido';
  owner?: string;
  nextStep?: string;
  nextStepDate?: string;
};

export type ScoreBreakdown = {
  businessPotential: number;
  digitalPain: number;
  commercialMaturity: number;
  contactEase: number;
  investmentSignals: number;
  total: number;
  priority: Priority;
};
