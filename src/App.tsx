import { BrowserRouter, Link, Route, Routes, StaticRouter } from 'react-router';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import WhatsappFlutuante from './components/WhatsappFlutuante';

const Inicio = lazy(() => import('./pages/Inicio'));
const Sobre = lazy(() => import('./pages/Sobre'));
const Projetos = lazy(() => import('./pages/Projetos'));
const Sites = lazy(() => import('./pages/servicos/Sites'));
const LojasVirtuais = lazy(() => import('./pages/servicos/LojasVirtuais'));
const Aplicativos = lazy(() => import('./pages/servicos/Aplicativos'));
const Plataformas = lazy(() => import('./pages/servicos/Plataformas'));
const Cursos = lazy(() => import('./pages/Cursos'));
const CursoDetalhe = lazy(() => import('./pages/CursoDetalhe'));
const Privacidade = lazy(() => import('./pages/Privacidade'));
const Termos = lazy(() => import('./pages/Termos'));

export const rotasEstaticas = [
  '/', '/sobre', '/projetos', '/servicos/sites',
  '/servicos/lojas-virtuais', '/servicos/aplicativos',
  '/servicos/plataformas', '/cursos',
  '/cursos/programacao-mvp-inteligencia-artificial-no-code',
  '/cursos/sites-elite-inteligencia-artificial',
  '/privacidade', '/termos',
];

interface PropriedadesAplicacao {
  enderecoInicial?: string;
  contextoMetadados?: Record<string, unknown>;
}

function PaginaNaoEncontrada() {
  return (
    <main className="mx-auto flex min-h-[75vh] max-w-4xl flex-col items-center justify-center px-6 text-center">
      <Helmet>
        <title>Página não encontrada | Douglas Paiani</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <span className="text-sm font-black uppercase tracking-[.25em] text-cyan-400">Erro 404</span>
      <h1 className="mt-4 text-4xl font-black text-white md:text-6xl">Página não encontrada.</h1>
      <p className="mt-5 text-white/60">O endereço solicitado não está disponível.</p>
      <Link to="/" className="mt-8 rounded-2xl bg-cyan-400 px-7 py-4 font-bold text-black hover:bg-cyan-300">Voltar ao início</Link>
    </main>
  );
}

export default function Aplicacao({ enderecoInicial, contextoMetadados }: PropriedadesAplicacao) {
  const conteudo = (
    <HelmetProvider context={contextoMetadados}>
      <ScrollToTop />
      <WhatsappFlutuante />
      <div className="min-h-screen bg-black text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
        <Navbar />
        <Suspense fallback={null}><Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/servicos/sites" element={<Sites />} />
          <Route path="/servicos/lojas-virtuais" element={<LojasVirtuais />} />
          <Route path="/servicos/aplicativos" element={<Aplicativos />} />
          <Route path="/servicos/plataformas" element={<Plataformas />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/cursos/:slug" element={<CursoDetalhe />} />
          <Route path="/privacidade" element={<Privacidade />} />
          <Route path="/termos" element={<Termos />} />
          <Route path="*" element={<PaginaNaoEncontrada />} />
        </Routes></Suspense>
        <div className="flex justify-center bg-black px-6 py-10">
          <a href="https://usagescope.com" className="w-full max-w-[320px] rounded-2xl transition-transform duration-300 hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-400">
            <img
              src="https://api.usagescope.com/v1/badge/p_2cd9cc6904114337ac5ddf6464d266fb.svg"
              alt="Ranking UsageScope"
              width="470"
              height="247"
              loading="lazy"
              decoding="async"
              className="h-auto w-full"
            />
          </a>
        </div>
        <Footer />
      </div>
    </HelmetProvider>
  );

  return enderecoInicial
    ? <StaticRouter location={enderecoInicial}>{conteudo}</StaticRouter>
    : <BrowserRouter>{conteudo}</BrowserRouter>;
}
