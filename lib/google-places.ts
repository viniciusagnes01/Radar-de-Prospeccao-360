import { DEFAULT_DIGITAL } from './constants';
import { Lead } from './types';

export type GooglePlacesCompany = Partial<Lead> & { id: string };

type GooglePlaceResult = {
  id: string;
  displayName?: { text: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  primaryTypeDisplayName?: { text: string };
  location?: { latitude: number; longitude: number };
};

export async function searchGooglePlaces({ city, state, niche, limit = 20 }: { city: string; state: string; niche: string; limit?: number }): Promise<GooglePlacesCompany[]> {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error('GOOGLE_MAPS_API_KEY não configurada. Use .env.local ou variável de ambiente na Vercel.');
  }

  const query = `${niche} em ${city} ${state}`;
  const response = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': [
        'places.id',
        'places.displayName',
        'places.formattedAddress',
        'places.nationalPhoneNumber',
        'places.websiteUri',
        'places.rating',
        'places.userRatingCount',
        'places.googleMapsUri',
        'places.primaryTypeDisplayName',
        'places.location'
      ].join(',')
    },
    body: JSON.stringify({
      textQuery: query,
      maxResultCount: limit,
      languageCode: 'pt-BR',
      regionCode: 'BR'
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erro no Google Places: ${response.status} ${errorText}`);
  }

  const data = await response.json();
  const places = (data.places ?? []) as GooglePlaceResult[];

  return places.map((place) => ({
    id: place.id,
    companyName: place.displayName?.text ?? 'Empresa sem nome',
    city,
    state,
    niche,
    category: place.primaryTypeDisplayName?.text ?? niche,
    address: place.formattedAddress,
    phone: place.nationalPhoneNumber,
    website: place.websiteUri,
    googleMapsUrl: place.googleMapsUri,
    latitude: place.location?.latitude,
    longitude: place.location?.longitude,
    googleRating: place.rating,
    googleReviews: place.userRatingCount,
    digital: { ...DEFAULT_DIGITAL, hasWebsite: Boolean(place.websiteUri) }
  }));
}
