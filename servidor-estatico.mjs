import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const pastaPublica = fileURLToPath(new URL('./dist/', import.meta.url));
const porta = Number(process.env.PORTA ?? 3001);
const tiposConteudo = {
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
};

function responderErro(resposta, codigo) {
  resposta.writeHead(codigo, { 'Content-Type': 'text/plain; charset=utf-8' });
  resposta.end(codigo === 404 ? 'Página não encontrada.' : 'Erro ao carregar a página.');
}

async function atenderRequisicao(requisicao, resposta) {
  if (requisicao.method !== 'GET' && requisicao.method !== 'HEAD') {
    resposta.writeHead(405, { Allow: 'GET, HEAD' });
    resposta.end();
    return;
  }

  let endereco;
  let caminhoSolicitado;

  try {
    endereco = new URL(requisicao.url, 'http://localhost');
    caminhoSolicitado = decodeURIComponent(endereco.pathname);
  } catch {
    responderErro(resposta, 400);
    return;
  }

  // Impede que uma URL fora de dist acesse arquivos do projeto.
  let caminhoArquivo = resolve(pastaPublica, `.${caminhoSolicitado}`);
  const caminhoRelativo = relative(pastaPublica, caminhoArquivo);

  if (caminhoRelativo.startsWith('..') || caminhoRelativo.startsWith('/')) {
    responderErro(resposta, 404);
    return;
  }

  try {
    let informacoesArquivo = await stat(caminhoArquivo);

    if (informacoesArquivo.isDirectory()) {
      if (!endereco.pathname.endsWith('/')) {
        resposta.writeHead(308, { Location: `${endereco.pathname}/${endereco.search}` });
        resposta.end();
        return;
      }

      caminhoArquivo = resolve(caminhoArquivo, 'index.html');
      informacoesArquivo = await stat(caminhoArquivo);
    }

    if (!informacoesArquivo.isFile()) {
      responderErro(resposta, 404);
      return;
    }

    resposta.writeHead(200, {
      'Content-Type': tiposConteudo[extname(caminhoArquivo)] ?? 'application/octet-stream',
      'Content-Length': informacoesArquivo.size,
      'Cache-Control': caminhoRelativo.startsWith('assets/')
        ? 'public, max-age=31536000, immutable'
        : 'public, max-age=0, must-revalidate',
      'X-Content-Type-Options': 'nosniff',
    });

    if (requisicao.method === 'HEAD') {
      resposta.end();
      return;
    }

    createReadStream(caminhoArquivo)
      .on('error', () => resposta.destroy())
      .pipe(resposta);
  } catch (erro) {
    responderErro(resposta, erro.code === 'ENOENT' ? 404 : 500);
  }
}

createServer(atenderRequisicao).listen(porta, '0.0.0.0', () => {
  process.stdout.write(`Site estático disponível na porta ${porta}.\n`);
});
