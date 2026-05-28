# Setup Google Maps Platform - Radar de Prospecção 360 V4

Este projeto usa dois caminhos da Google Maps Platform:

1. **Places API Web Service / Text Search** no backend, para buscar empresas por cidade + nicho.
2. **Maps JavaScript API** no frontend, para exibir as oportunidades em um mapa.

## 1. APIs que precisam estar ativas no Google Cloud

Ative no projeto do Google Cloud:

- Places API
- Maps JavaScript API

Opcionalmente, crie um **Map ID** se quiser usar Advanced Markers com estilo próprio.

## 2. Chaves recomendadas

Use duas chaves diferentes:

### Chave server-side

Variável:

```env
GOOGLE_MAPS_API_KEY=
```

Uso:

- `app/api/search/route.ts`
- `lib/google-places.ts`

Restrição recomendada:

- restringir por API: Places API;
- não usar prefixo `NEXT_PUBLIC_`;
- não commitar `.env.local`.

### Chave browser-side

Variável:

```env
NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY=
```

Uso:

- `components/OpportunitiesMap.tsx`

Restrição recomendada:

- HTTP referrers/domínios autorizados;
- APIs permitidas: Maps JavaScript API;
- para Vercel, incluir o domínio do deploy.

## 3. Variáveis na Vercel

No projeto da Vercel, configure:

```env
GOOGLE_MAPS_API_KEY=sua_chave_server_side
NEXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY=sua_chave_browser_side
NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID=opcional
NEXT_PUBLIC_USE_MOCKS=false
```

Depois faça redeploy.

## 4. Como testar

1. Suba o projeto na Vercel ou rode localmente.
2. Acesse `/search`.
3. Busque por exemplo:

```txt
Cidade: Campinas
Estado: SP
Nicho: Clínica odontológica
Limite: 20
```

Resultado esperado:

- lista de empresas reais do Google Places;
- nota, avaliações, telefone, site e endereço quando disponíveis;
- score e prioridade gerados pelo sistema;
- mapa com marcadores se a chave de browser estiver configurada.

## 5. Observação importante sobre custos

O campo mask em `lib/google-places.ts` solicita dados úteis para prospecção, como telefone, site, nota e quantidade de avaliações. Alguns campos podem acionar SKUs diferentes no Google Places. Antes de escalar volume, valide custos e quotas no Google Cloud.

