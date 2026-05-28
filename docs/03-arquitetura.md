# Arquitetura

## Visão

```txt
Frontend Next.js
  -> API Route /api/search
    -> Google Places API
    -> Site Audit
    -> Score 360
    -> Diagnóstico
    -> Retorno ordenado
```

## Módulos

| Arquivo | Responsabilidade |
|---|---|
| `lib/google-places.ts` | Buscar empresas reais por cidade/nicho |
| `lib/site-audit.ts` | Ler site e identificar sinais digitais |
| `lib/scoring.ts` | Calcular Score 360 |
| `lib/diagnostics.ts` | Gerar dor, oferta e mensagem |
| `app/api/search/route.ts` | Orquestrar busca e enriquecimento |
| `components/LeadTable.tsx` | Exibir oportunidades |
| `components/PipelineBoard.tsx` | Organizar funil |

## Segurança

- A chave do Google Maps fica no backend.
- Nunca exponha `GOOGLE_MAPS_API_KEY` no frontend.
- Use restrição de API key no Google Cloud.
- Na Vercel, cadastre variáveis de ambiente no painel.

## Limitações conscientes do MVP

- Persistência ainda não está ligada a banco.
- Meta Ads está como placeholder seguro.
- Instagram/LinkedIn devem respeitar APIs oficiais e termos de uso.
- O envio de mensagens deve ser sempre validado por humano.
