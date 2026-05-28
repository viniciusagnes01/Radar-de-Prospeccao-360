export type AdSignal = {
  adsDetected: boolean;
  source: 'not_configured' | 'manual' | 'api';
  note: string;
};

export async function checkMetaAds(companyName: string): Promise<AdSignal> {
  // MVP: placeholder seguro.
  // A Meta Ad Library exige token, regras de acesso e tratamento por país/categoria.
  // Para operação V4, recomendamos começar com campo manual/semi-automático e evoluir depois.
  if (!process.env.META_ACCESS_TOKEN) {
    return {
      adsDetected: false,
      source: 'not_configured',
      note: `Meta Ad Library não configurada. Validar manualmente anúncios ativos para ${companyName}.`
    };
  }

  return {
    adsDetected: false,
    source: 'api',
    note: 'Integração Meta configurável em versão futura.'
  };
}
