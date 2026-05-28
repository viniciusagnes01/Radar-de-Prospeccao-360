export type Priority = 'Muito alta' | 'Alta' | 'Média' | 'Baixa';
export type LeadStatus = 'Novo' | 'Validar' | 'Validado' | 'Abordado' | 'Follow-up' | 'Reunião agendada' | 'Proposta' | 'Ganho' | 'Perdido';

export type SearchInput = {
  city: string;
  state: string;
  niche: string;
  radiusKm?: number;
  limit?: number;
  minScore?: number;
};

export type DigitalSignals = {
  hasWebsite: boolean;
  hasWhatsApp: boolean;
  hasForm: boolean;
  hasTracking: boolean;
  hasGoogleTagManager: boolean;
  hasMetaPixel: boolean;
  hasInstagram: boolean;
  hasFacebook: boolean;
  hasLinkedin: boolean;
  adsDetected: boolean;
  lastSocialPostDays?: number;
};

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
  digital: DigitalSignals;
  score360: number;
  priority: Priority;
  mainPain: string;
  suggestedOffer: string;
  suggestedMessage: string;
  qualificationReason: string;
  status: LeadStatus;
  owner?: string;
  nextStep?: string;
  nextStepDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type ScoreBreakdown = {
  businessPotential: number;
  digitalPain: number;
  commercialMaturity: number;
  contactEase: number;
  investmentSignals: number;
  total: number;
  priority: Priority;
  reasons: string[];
};

export type FunnelColumn = {
  status: LeadStatus;
  title: string;
  description: string;
};
