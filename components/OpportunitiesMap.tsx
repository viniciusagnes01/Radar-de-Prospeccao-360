'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { importLibrary, setOptions } from '@googlemaps/js-api-loader';
import { Lead } from '../lib/types';

type GoogleMap = any;
type GoogleMarker = any;

export function OpportunitiesMap({ leads }: { leads: Lead[] }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<GoogleMap | null>(null);
  const markersRef = useRef<GoogleMarker[]>([]);
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'missing-key' | 'error'>('idle');

  const mappedLeads = useMemo(() => leads.filter((lead) => typeof lead.latitude === 'number' && typeof lead.longitude === 'number'), [leads]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!ref.current || mappedLeads.length === 0) return;

      const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY;
      if (!key) {
        setStatus('missing-key');
        return;
      }

      try {
        setStatus('loading');
        setOptions({
          key,
          language: 'pt-BR',
          region: 'BR',
          v: 'weekly'
        });

        const { Map } = await importLibrary('maps') as any;

        if (cancelled || !ref.current) return;

        const first = mappedLeads[0];
        const center = { lat: first.latitude!, lng: first.longitude! };

        const map = new Map(ref.current, {
          center,
          zoom: 12,
          mapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || undefined,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true
        });
        mapRef.current = map;

        const bounds = new google.maps.LatLngBounds();
        markersRef.current.forEach((marker) => marker.setMap?.(null));
        markersRef.current = [];

        mappedLeads.forEach((lead) => {
          const position = { lat: lead.latitude!, lng: lead.longitude! };
          bounds.extend(position);
          const marker = new google.maps.Marker({
            map,
            position,
            title: `${lead.companyName} | Score ${lead.score360}`
          });
          markersRef.current.push(marker);
        });

        if (mappedLeads.length > 1) {
          map.fitBounds(bounds, 60);
        }

        setStatus('ready');
      } catch (error) {
        console.error(error);
        setStatus('error');
      }
    }

    void init();
    return () => { cancelled = true; };
  }, [mappedLeads]);

  if (mappedLeads.length === 0) {
    return null;
  }

  return (
    <section className="mt-6 overflow-hidden rounded-3xl border bg-white shadow-sm">
      <div className="flex items-center justify-between border-b px-5 py-4">
        <div>
          <h3 className="text-lg font-black text-slate-950">Mapa de oportunidades</h3>
          <p className="text-sm text-slate-500">Visualização geográfica dos leads retornados pelo Google Places.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{mappedLeads.length} com localização</span>
      </div>

      {status === 'missing-key' ? (
        <div className="p-5 text-sm text-slate-600">
          Configure <code className="rounded bg-slate-100 px-1 font-bold">NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY</code> para exibir o mapa. A busca server-side pode funcionar apenas com <code className="rounded bg-slate-100 px-1 font-bold">GOOGLE_MAPS_API_KEY</code>.
        </div>
      ) : status === 'error' ? (
        <div className="p-5 text-sm font-semibold text-red-700">Não foi possível carregar o mapa. Verifique se a Maps JavaScript API está ativada e se a chave do browser está restrita corretamente.</div>
      ) : (
        <div ref={ref} className="h-[420px] w-full bg-slate-100" />
      )}
    </section>
  );
}
