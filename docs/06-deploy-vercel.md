# Deploy na Vercel

## Passos

1. Suba o projeto no GitHub.
2. Importe o repositório na Vercel.
3. Configure framework como Next.js.
4. Adicione variáveis de ambiente:

```txt
GOOGLE_MAPS_API_KEY=sua_chave
```

5. Faça deploy.

## Checklist pós-deploy

- `/` abre.
- `/search` abre.
- Busca sem chave retorna mock.
- Busca com chave retorna empresas reais.
- `/dashboard` abre.
- `/pipeline` abre.
- `/api/export/csv` baixa CSV.
