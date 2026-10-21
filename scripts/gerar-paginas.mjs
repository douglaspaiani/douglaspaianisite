import { copyFile, readFile, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { createServer } from 'vite';

const dominio = 'https://douglaspaiani.com.br';
const pastaSaida = new URL('../dist/', import.meta.url).pathname;
const pastaProjeto = new URL('../', import.meta.url).pathname;
const modeloHtml = await readFile(join(pastaSaida, 'index.html'), 'utf8');
const manifesto = JSON.parse(await readFile(join(pastaSaida, '.vite/manifest.json'), 'utf8'));
const servidorVite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  optimizeDeps: { noDiscovery: true },
});

try {
  const { renderizarPagina, rotasEstaticas } = await servidorVite.ssrLoadModule('/src/renderizar.tsx');

  for (const rota of rotasEstaticas) {
    const { conteudo, cabecalho } = await renderizarPagina(rota);
    const caminhoArquivo = join(pastaSaida, rota === '/' ? '' : rota.slice(1), 'index.html');
    const expressaoMetadados = /<title[^>]*>[\s\S]*?<\/title>|<meta\s[^>]*\/>|<link rel="canonical"[^>]*\/>|<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/g;
    const metadadosPagina = conteudo.match(expressaoMetadados)?.join('\n') ?? '';
    const imagemCompartilhamento = `${dominio}/douglas_ia.jpg`;
    const metadadosSociais = [
      '<meta property="og:locale" content="pt_BR" />',
      !metadadosPagina.includes('property="og:image"') && `<meta property="og:image" content="${imagemCompartilhamento}" />`,
      !metadadosPagina.includes('name="twitter:card"') && '<meta name="twitter:card" content="summary_large_image" />',
      !metadadosPagina.includes('name="twitter:image"') && `<meta name="twitter:image" content="${imagemCompartilhamento}" />`,
    ].filter(Boolean).join('\n');
    // O CSS da rota carregada sob demanda precisa existir também antes da hidratação.
    const estilosPagina = rota === '/atleta'
      ? (manifesto['src/pages/Atleta.tsx']?.css ?? [])
          .map((arquivo) => `<link rel="stylesheet" href="/${arquivo}" />`).join('\n')
      : '';
    let conteudoEstatico = conteudo
      .replace(expressaoMetadados, '')
      // O React pré-carrega todas as imagens no SSR; isso compete com a imagem principal.
      .replace(/<link rel="preload" as="image"[^>]*\/>/g, '');

    for (const [origem, recurso] of Object.entries(manifesto)) {
      if (origem.startsWith('src/images/')) {
        conteudoEstatico = conteudoEstatico.replaceAll(`/${origem}`, `/${recurso.file}`);
      }
    }

    // Imagens pequenas podem ser incorporadas pelo Vite e não entram no manifesto.
    for (const [enderecoImagem] of conteudoEstatico.matchAll(/(\/src\/images\/[\w./-]+)/g)) {
      const caminhoImagem = join(pastaSaida, enderecoImagem.slice(1));
      await mkdir(dirname(caminhoImagem), { recursive: true });
      await copyFile(join(pastaProjeto, enderecoImagem.slice(1)), caminhoImagem);
    }

    const documento = modeloHtml
      .replace(/<title>[^<]*<\/title>/, '')
      .replace(/<link rel="icon"[^>]*\/>/, (íconePrincipal) =>
        rota === '/atleta' ? '' : íconePrincipal)
      .replace(/<meta name="theme-color"[^>]*\/>/, (metadado) =>
        metadadosPagina.includes('name="theme-color"') ? '' : metadado)
      .replace('</head>', `${cabecalho}\n${metadadosPagina}\n${metadadosSociais}\n${estilosPagina}\n</head>`)
      .replace('<div id="root"></div>', `<div id="root">${conteudoEstatico}</div>`);

    await mkdir(dirname(caminhoArquivo), { recursive: true });
    await writeFile(caminhoArquivo, documento);
  }

  const dataAtualizacao = new Date().toISOString().slice(0, 10);
  const mapa = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rotasEstaticas.map((rota) => `  <url>\n    <loc>${dominio}${rota}</loc>\n    <lastmod>${dataAtualizacao}</lastmod>\n  </url>`).join('\n')}\n</urlset>\n`;
  await writeFile(join(pastaProjeto, 'public/sitemap.xml'), mapa);
  await writeFile(join(pastaSaida, 'sitemap.xml'), mapa);
  process.stdout.write(`${rotasEstaticas.length} páginas estáticas geradas.\n`);
} finally {
  await servidorVite.close();
}
