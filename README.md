# Firmamento Estúdio

Site do Firmamento Estúdio, construído com React, TypeScript e Vite. O estilo complementar da página fica em `assets/css/style.css`.

## Desenvolvimento local

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
npm run preview
```

O build gera a pasta `dist/`, que é descartada pelo Git e não deve ser versionada. Vercel e Netlify detectam automaticamente o comando `npm run build` e a saída `dist/` em um projeto Vite padrão.

O projeto não usa variáveis de ambiente atualmente, portanto não há `.env.example`. Se uma variável for adicionada no futuro, documente-a nesse arquivo antes do deploy.
