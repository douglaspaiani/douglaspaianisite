# Douglas Paiani Site

Site público estático, sem servidor de aplicação ou banco de dados.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3001`. A prévia da versão compilada (`npm run preview`) também usa a porta 3001.

Para publicar, execute `npm run build` e envie o conteúdo da pasta `dist/` para uma hospedagem estática. Cada página possui seu próprio `index.html`, inclusive as rotas internas. Configure a hospedagem para servir os diretórios como páginas e manter os arquivos em `/assets/` acessíveis.

## Servidor com PM2

No diretório do projeto, instale as dependências, gere os arquivos estáticos e inicie o servidor na porta 3001:

```bash
git pull --ff-only origin main
npm ci
npm run build
pm2 delete douglaspaianisite
pm2 start ecosystem.config.cjs
pm2 save
```

O comando `pm2 delete` remove a configuração antiga que tenta executar a pasta do projeto como um módulo Node. Nas próximas publicações, execute `git pull --ff-only origin main`, `npm ci`, `npm run build` e `pm2 restart douglaspaianisite`. O servidor lê apenas os arquivos gerados em `dist/`.

O contato abre WhatsApp ou e-mail diretamente. As páginas do blog e a área administrativa não fazem parte deste projeto.
