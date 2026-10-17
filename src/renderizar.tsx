import { renderToPipeableStream } from 'react-dom/server';
import { PassThrough } from 'node:stream';
import Aplicacao, { rotasEstaticas } from './App';

interface CapaceteGerado {
  title?: { toString(): string };
  meta?: { toString(): string };
  link?: { toString(): string };
  script?: { toString(): string };
}

export async function renderizarPagina(endereco: string) {
  const contextoMetadados: { helmet?: CapaceteGerado } = {};
  // Aguarda os componentes carregados por rota antes de gravar cada página.
  const conteudo = await new Promise<string>((resolver, rejeitar) => {
    const saida = new PassThrough();
    const fragmentos: Buffer[] = [];
    saida.on('data', (fragmento: Buffer) => fragmentos.push(fragmento));
    saida.on('end', () => resolver(Buffer.concat(fragmentos).toString('utf8')));
    saida.on('error', rejeitar);

    const { pipe } = renderToPipeableStream(
      <Aplicacao enderecoInicial={endereco} contextoMetadados={contextoMetadados} />,
      {
        onAllReady() { pipe(saida); },
        onError(erro) { rejeitar(erro); },
      },
    );
  });
  const capacete = contextoMetadados.helmet;
  const cabecalho = [capacete?.title, capacete?.meta, capacete?.link, capacete?.script]
    .map((item) => item?.toString() ?? '')
    .join('\n');

  return { conteudo, cabecalho };
}

export { rotasEstaticas };
