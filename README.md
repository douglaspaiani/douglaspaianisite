# Douglas Paiani Site

Site público estático, sem servidor de aplicação ou banco de dados.

```bash
npm install
npm run dev
```

Acesse `http://localhost:3001`. A prévia da versão compilada (`npm run preview`) também usa a porta 3001.

Para publicar, execute `npm run build` e envie o conteúdo da pasta `dist/` para uma hospedagem estática. Cada página possui seu próprio `index.html`, inclusive as rotas internas. Configure a hospedagem para servir os diretórios como páginas e manter os arquivos em `/assets/` acessíveis.

## Servidor com PM2

No diretório do projeto, atualize o código, gere os arquivos estáticos e inicie o servidor na porta 3001:

```bash
./deploy.sh
```

O script remove a configuração antiga do PM2, instala as dependências, compila as páginas e inicia o servidor estático. Use o mesmo comando nas próximas publicações.

O contato abre WhatsApp ou e-mail diretamente. As páginas do blog e a área administrativa não fazem parte deste projeto.
