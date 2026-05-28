import { FunnelColumn } from './types';

export const FUNNEL: FunnelColumn[] = [
  { status: 'Novo', title: 'Novo', description: 'Lead encontrado na busca.' },
  { status: 'Validar', title: 'Validar', description: 'Checar fit, site, decisor e dados.' },
  { status: 'Validado', title: 'Validado', description: 'Pode entrar em abordagem.' },
  { status: 'Abordado', title: 'Abordado', description: 'Primeiro contato enviado.' },
  { status: 'Follow-up', title: 'Follow-up', description: 'Aguardando retorno ou segunda tentativa.' },
  { status: 'Reunião agendada', title: 'Reunião', description: 'Diagnóstico marcado.' },
  { status: 'Proposta', title: 'Proposta', description: 'Oferta apresentada.' },
  { status: 'Ganho', title: 'Ganho', description: 'Virou cliente.' },
  { status: 'Perdido', title: 'Perdido', description: 'Não avançou.' }
];

export const HIGH_TICKET_NICHES = [
  'clínica', 'clinica', 'odontologia', 'odontológica', 'dentista', 'estética', 'estetica',
  'imobiliária', 'imobiliaria', 'advocacia', 'advogado', 'escola', 'faculdade', 'academia',
  'concessionária', 'concessionaria', 'curso', 'franquia', 'saúde', 'saude', 'medicina'
];

export const DEFAULT_DIGITAL = {
  hasWebsite: false,
  hasWhatsApp: false,
  hasForm: false,
  hasTracking: false,
  hasGoogleTagManager: false,
  hasMetaPixel: false,
  hasInstagram: false,
  hasFacebook: false,
  hasLinkedin: false,
  adsDetected: false
};
