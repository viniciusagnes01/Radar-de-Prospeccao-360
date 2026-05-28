# Radar de Prospecção 360

Dashboard inteligente para encontrar empresas por cidade e nicho, enriquecer dados públicos, avaliar presença digital e priorizar oportunidades comerciais.

## Objetivo

O Radar de Prospecção 360 ajuda o time comercial a responder:

- Quem devo abordar primeiro?
- Por que essa empresa é uma boa oportunidade?
- Qual dor digital aparente ela tem?
- Qual oferta faz mais sentido?
- Qual mensagem inicial posso usar?

## Stack do MVP

- Next.js 14
- TypeScript
- Tailwind CSS
- Mock de leads para demonstração
- Estrutura preparada para Google Places API
- Score 360 em regra de negócio local

## Como rodar localmente

```bash
npm install
cp .env.example .env.local
npm run dev
```

Depois acesse:

```bash
http://localhost:3000
```

## Rotas principais

| Rota | Função |
|---|---|
| `/` | Landing interna do produto |
| `/search` | Busca por cidade e nicho |
| `/dashboard` | Visão executiva das oportunidades |
| `/leads/[id]` | Diagnóstico 360 individual |
| `/api/search` | Endpoint para busca/enriquecimento |
| `/api/leads` | Endpoint para listar leads mockados |

## Fluxo operacional V4

1. Buscar cidade + nicho.
2. Gerar lista de empresas.
3. Enriquecer presença digital.
4. Calcular score 360.
5. Validar leads de prioridade alta.
6. Gerar diagnóstico rápido.
7. Criar mensagem contextual.
8. Enviar para CRM/funil.
9. Acompanhar próximo passo.

## Integração com Google Places

A função base está em `lib/google-places.ts`.

Para ativar, crie `.env.local` e defina:

```bash
GOOGLE_MAPS_API_KEY=sua_chave
```

Depois substitua o mock em `app/api/search/route.ts` pela chamada real `searchGooglePlaces`.

## Regra de ouro

O dashboard não existe para mostrar dados. Ele existe para priorizar ação comercial.

Cada oportunidade precisa sair com prioridade, motivo, dor, oferta, mensagem e próximo passo.
