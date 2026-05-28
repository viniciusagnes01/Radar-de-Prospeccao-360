# Radar de Prospecção 360 - Modo V4 ON

Sistema para encontrar empresas por **cidade + nicho**, diagnosticar presença digital, calcular **Score 360**, priorizar abordagem e organizar a operação comercial.

## O que esse projeto entrega

- Busca de oportunidades por cidade e nicho.
- Integração server-side com Google Places API.
- Fallback com dados mockados para demonstração.
- Auditoria inicial de site: WhatsApp, formulário, tracking, GTM, Meta Pixel e links sociais.
- Score 360 com pilares comerciais.
- Diagnóstico individual por lead.
- Mensagem sugerida para SDR validar.
- Pipeline comercial estilo kanban.
- Exportação CSV modelo.
- Documentação de produto, arquitetura, score, banco e roadmap.

## Fluxo V4

```txt
Cidade + nicho
  -> busca de empresas
  -> enriquecimento digital
  -> Score 360
  -> dor principal
  -> oferta sugerida
  -> mensagem SDR
  -> pipeline de abordagem
```

## Rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra:

```txt
http://localhost:3000
```

## Configurar busca real no Google Places

No `.env.local`:

```bash
GOOGLE_MAPS_API_KEY=sua_chave
```

Na Vercel, cadastre a mesma variável em **Project Settings > Environment Variables**.

Sem essa chave, o sistema usa os mocks de `data/mock-leads.ts`.

## Páginas

| Rota | Função |
|---|---|
| `/` | Visão do produto |
| `/search` | Busca cidade + nicho |
| `/dashboard` | Ranking e KPIs |
| `/pipeline` | Kanban comercial |
| `/leads/[id]` | Diagnóstico 360 individual |
| `/api/search` | Endpoint de busca/enriquecimento |
| `/api/leads` | Lista mockada |
| `/api/export/csv` | Exportação CSV modelo |

## Estrutura

```txt
app/              Rotas e APIs Next.js
components/       Componentes visuais
lib/              Score, diagnóstico, Google Places e auditoria
data/             Dados mockados
docs/             Documentação de produto e operação
supabase/         Modelo de banco para persistência futura
```

## Onde mexer primeiro

1. `lib/google-places.ts` - busca real de empresas.
2. `lib/scoring.ts` - regras do Score 360.
3. `lib/diagnostics.ts` - dores, ofertas e mensagens.
4. `app/api/search/route.ts` - orquestração da busca.
5. `data/mock-leads.ts` - dados de demonstração.

## Próximas evoluções recomendadas

- Persistência com Supabase/Postgres.
- Login por usuário/time.
- Histórico de buscas.
- Envio de leads para CRM.
- Integração com Meta Ad Library.
- Enriquecimento de decisores via LinkedIn/manual.
- Geração de relatório PDF por lead.
- Fila de follow-up por responsável.
