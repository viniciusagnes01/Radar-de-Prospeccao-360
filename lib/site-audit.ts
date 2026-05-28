import { DigitalSignals } from './types';

export type SiteAudit = Pick<DigitalSignals, 'hasWhatsApp' | 'hasForm' | 'hasTracking' | 'hasGoogleTagManager' | 'hasMetaPixel' | 'hasInstagram' | 'hasFacebook' | 'hasLinkedin'> & {
  foundLinks: string[];
  error?: string;
};

export async function auditWebsite(url?: string): Promise<SiteAudit> {
  const empty = {
    hasWhatsApp: false,
    hasForm: false,
    hasTracking: false,
    hasGoogleTagManager: false,
    hasMetaPixel: false,
    hasInstagram: false,
    hasFacebook: false,
    hasLinkedin: false,
    foundLinks: []
  };

  if (!url) return empty;

  try {
    const response = await fetch(url, { headers: { 'User-Agent': 'RadarProspeccao360/1.0' }, next: { revalidate: 86400 } });
    const html = await response.text();
    const lower = html.toLowerCase();
    const links = Array.from(html.matchAll(/href=["']([^"']+)["']/gi)).map((m) => m[1]).slice(0, 80);

    const hasGoogleTagManager = lower.includes('googletagmanager.com') || lower.includes('gtm-');
    const hasMetaPixel = lower.includes('connect.facebook.net') || lower.includes('fbq(') || lower.includes('facebook pixel');

    return {
      hasWhatsApp: lower.includes('wa.me') || lower.includes('api.whatsapp.com') || lower.includes('whatsapp'),
      hasForm: lower.includes('<form') || lower.includes('type="submit"') || lower.includes("type='submit'"),
      hasTracking: hasGoogleTagManager || hasMetaPixel || lower.includes('google-analytics.com') || lower.includes('gtag('),
      hasGoogleTagManager,
      hasMetaPixel,
      hasInstagram: lower.includes('instagram.com'),
      hasFacebook: lower.includes('facebook.com') || lower.includes('fb.com'),
      hasLinkedin: lower.includes('linkedin.com'),
      foundLinks: links
    };
  } catch (error) {
    return { ...empty, error: error instanceof Error ? error.message : 'Erro ao auditar site.' };
  }
}
