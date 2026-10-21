import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  Dumbbell,
  Instagram,
  MapPin,
  Megaphone,
  MonitorPlay,
  Plus,
  Shirt,
  ShoppingBag,
  Sparkles,
  Target,
  Trophy,
  Video,
  X,
} from "lucide-react";
import fotoNegócios from "../images/douglaspaiani.webp";
import "./atleta.css";

const endereçoPágina = "https://douglaspaiani.com.br/atleta";
const endereçoWhatsapp = `https://wa.me/5551994727036?text=${encodeURIComponent("Olá, Douglas! Conheci sua página de atleta e quero conversar sobre uma parceria de sucesso com a minha marca.")}`;

const entregas = [
  {
    ícone: ShoppingBag,
    rótulo: "Ativação na loja",
    título: "Dentro da sua loja",
    descrição:
      "Gravação de promoções presencialmente na loja, aproximando sua marca de quem acompanha minha rotina.",
  },
  {
    ícone: Instagram,
    rótulo: "Presença digital",
    título: "Nos stories. Na rotina.",
    descrição:
      "Menções nos stories do Instagram usando os produtos da sua marca de forma natural.",
  },
  {
    ícone: Dumbbell,
    rótulo: "Dia a dia de treino",
    título: "Do treino para os reels",
    descrição:
      "Uso da sua vestimenta nos treinos e nas gravações de reels, colocando sua marca em movimento.",
  },
  {
    ícone: Trophy,
    rótulo: "Palco e pesagem",
    título: "Na hora de competir",
    descrição:
      "Uso da sua vestimenta em campeonatos e no dia da pesagem, levando sua marca para esse momento.",
  },
  {
    ícone: Megaphone,
    rótulo: "Criação em parceria",
    título: "Conteúdo em conjunto",
    descrição:
      "Posts colaborativos com sua loja para conectar nossos públicos e ampliar a presença da marca.",
  },
  {
    ícone: MonitorPlay,
    rótulo: "Identidade em vídeo",
    título: "Sua marca em cada vídeo",
    descrição:
      "Marca d’água nos reels para manter sua identidade presente ao longo do conteúdo.",
  },
];

const diferenciais = [
  {
    ícone: Target,
    título: "Marketing & tráfego pago",
    descrição:
      "Conhecimento de marketing e tráfego pago para pensar a divulgação com estratégia.",
  },
  {
    ícone: BrainCircuit,
    título: "Inteligência artificial",
    descrição:
      "Conhecimento em implementação e utilização de IA para apoiar a operação e a comunicação.",
  },
  {
    ícone: Code2,
    título: "Sites & lojas virtuais",
    descrição:
      "Conhecimento em desenvolvimento e manutenção de sites e lojas virtuais.",
  },
  {
    ícone: Sparkles,
    título: "Criação de conteúdo",
    descrição:
      "Conhecimento para transformar ideias em conteúdo relevante para sua marca.",
  },
  {
    ícone: Video,
    título: "Produção profissional",
    descrição:
      "Gravações e fotos com iPhone 17 Pro Max, iluminação e gimbal para valorizar cada detalhe.",
  },
  {
    ícone: Camera,
    título: "Estúdio Box",
    descrição:
      "Estrutura para fotos profissionais de produtos, destacando a apresentação do seu catálogo.",
  },
];

const frentesDiferenciais = [
  {
    número: "01",
    etiqueta: "Estratégia",
    título: "Pensar e construir.",
    itens: diferenciais.slice(0, 3),
  },
  {
    número: "02",
    etiqueta: "Produção",
    título: "Criar e mostrar.",
    itens: diferenciais.slice(3),
  },
];

const vantagens = [
  {
    número: "01",
    título: "Sua marca nos campeonatos",
    descrição:
      "Visibilidade nos maiores campeonatos de fisiculturismo do Rio Grande do Sul.",
  },
  {
    número: "02",
    título: "Presença que continua",
    descrição:
      "Geração de conteúdo constante para manter sua loja presente na rotina do público.",
  },
  {
    número: "03",
    título: "Um especialista ao seu lado",
    descrição:
      "Um profissional de marketing e desenvolvimento somando conhecimento à parceria.",
  },
  {
    número: "04",
    título: "Conexão com a região",
    descrição:
      "Sua marca em diversas academias do Vale do Sinos, perto de quem vive o esporte.",
  },
];

// Centraliza as fotos disponíveis para manter miniaturas e visualização ampliada sincronizadas.
const fotografias = [
  {
    endereço: "/douglas-paiani-corrigido.webp",
    descrição: "Retrato de Douglas Paiani com os braços cruzados",
    título: "Douglas Paiani",
    categoria: "Identidade",
    posição: "center top",
  },
  {
    endereço: fotoNegócios,
    descrição: "Douglas Paiani trabalhando com um notebook",
    título: "Além do esporte",
    categoria: "Marketing & negócios",
    posição: "center 35%",
  },
];

function BotãoParceria({
  conteúdo,
  classe = "",
}: {
  conteúdo: ReactNode;
  classe?: string;
}) {
  return (
    <a
      href={endereçoWhatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={`atleta-botão ${classe}`}
    >
      {conteúdo}
      <ArrowUpRight size={19} aria-hidden="true" />
    </a>
  );
}

function TítuloSeção({
  número,
  etiqueta,
  children: conteúdo,
}: {
  número: string;
  etiqueta: string;
  children: ReactNode;
}) {
  const reduzirMovimento = useReducedMotion();
  return (
    <motion.div
      initial={false}
      whileInView={reduzirMovimento ? undefined : { y: [12, 0] }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <p className="atleta-etiqueta">
        <span className="text-[#77e58f]">{número} /</span> {etiqueta}
      </p>
      <h2 className="atleta-título mt-5">{conteúdo}</h2>
    </motion.div>
  );
}

function GaleriaAtleta() {
  const [fotoSelecionada, definirFotoSelecionada] = useState(0);
  const diálogo = useRef<HTMLDialogElement>(null);
  const botãoOrigem = useRef<HTMLButtonElement | null>(null);
  const reduzirMovimento = useReducedMotion();

  useEffect(() => {
    // Restaura a rolagem também se o usuário sair da rota com a galeria aberta.
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, []);

  function abrirFoto(índice: number, botão: HTMLButtonElement) {
    definirFotoSelecionada(índice);
    botãoOrigem.current = botão;
    diálogo.current?.showModal();
    document.body.style.overflow = "hidden";
  }

  function trocarFoto(direção: number) {
    definirFotoSelecionada(
      (índice) => (índice + direção + fotografias.length) % fotografias.length,
    );
  }

  function restaurarPágina() {
    document.body.style.removeProperty("overflow");
    botãoOrigem.current?.focus();
  }

  return (
    <>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {fotografias.map((foto, índice) => (
          <motion.button
            key={foto.endereço}
            type="button"
            whileHover={reduzirMovimento ? undefined : { y: -5 }}
            onClick={(evento) => abrirFoto(índice, evento.currentTarget)}
            aria-label={`Ampliar foto: ${foto.título}`}
            aria-haspopup="dialog"
            className={`atleta-foto group relative overflow-hidden text-left ${índice === 0 ? "atleta-foto-retrato" : ""}`}
          >
            <img
              src={foto.endereço}
              alt={foto.descrição}
              width={índice === 0 ? 1234 : 754}
              height={índice === 0 ? 1275 : 911}
              loading="lazy"
              decoding="async"
              style={{ objectPosition: foto.posição }}
              className="h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent" />
            <span className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 bg-black/30 transition group-hover:bg-[#16834a]">
              <Plus size={20} aria-hidden="true" />
            </span>
            <span className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
              <span>
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-white/70">
                  {foto.categoria}
                </span>
                <span className="mt-2 block text-2xl font-bold">
                  {foto.título}
                </span>
              </span>
              <span className="atleta-fonte text-3xl text-white/60">
                0{índice + 1}
              </span>
            </span>
          </motion.button>
        ))}
      </div>
      <dialog
        ref={diálogo}
        className="atleta-diálogo"
        aria-label="Galeria de fotos de Douglas Paiani"
        onClose={restaurarPágina}
        onClick={(evento) => {
          if (evento.target === evento.currentTarget) diálogo.current?.close();
        }}
        onKeyDown={(evento) => {
          if (evento.key === "ArrowRight") {
            evento.preventDefault();
            trocarFoto(1);
          }
          if (evento.key === "ArrowLeft") {
            evento.preventDefault();
            trocarFoto(-1);
          }
        }}
      >
        <div className="relative mx-auto flex h-full max-w-5xl flex-col justify-center p-5 sm:p-10">
          <button
            type="button"
            autoFocus
            onClick={() => diálogo.current?.close()}
            aria-label="Fechar galeria"
            className="atleta-controle absolute right-4 top-4 z-10"
          >
            <X aria-hidden="true" />
          </button>
          <img
            src={fotografias[fotoSelecionada].endereço}
            alt={fotografias[fotoSelecionada].descrição}
            className="min-h-0 w-full flex-1 object-contain"
          />
          <div className="mt-5 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => trocarFoto(-1)}
              aria-label="Foto anterior"
              className="atleta-controle"
            >
              <ChevronLeft aria-hidden="true" />
            </button>
            <p aria-live="polite" className="text-center text-sm">
              {fotografias[fotoSelecionada].título}
              <span className="mt-1 block text-white/60">
                {fotoSelecionada + 1} / {fotografias.length}
              </span>
            </p>
            <button
              type="button"
              onClick={() => trocarFoto(1)}
              aria-label="Próxima foto"
              className="atleta-controle"
            >
              <ChevronRight aria-hidden="true" />
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default function Atleta() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="pagina-atleta min-h-screen bg-[#07110c] text-[#f4f3ef] selection:bg-[#16834a] selection:text-white">
        <Helmet>
          <title>Douglas Paiani | Atleta e Parcerias no Vale do Sinos</title>
          <meta
            name="description"
            content="Esporte, conteúdo e estratégia para sua marca. Conheça a proposta de parceria de Douglas Paiani: fisiculturismo, marketing e presença no Vale do Sinos e RS."
          />
          <link rel="canonical" href={endereçoPágina} />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/atleta/favicon.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/atleta/apple-touch-icon.png"
          />
          <meta name="theme-color" content="#07110c" />
          <meta
            property="og:title"
            content="Douglas Paiani | Sua marca no próximo nível"
          />
          <meta
            property="og:description"
            content="Uma parceria que une fisiculturismo, produção de conteúdo, marketing e tecnologia. Vamos crescer juntos?"
          />
          <meta property="og:type" content="profile" />
          <meta property="og:url" content={endereçoPágina} />
          <meta
            property="og:image"
            content="https://douglaspaiani.com.br/douglas-paiani-corrigido.webp"
          />
          <meta property="og:image:alt" content="Douglas Paiani" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:image"
            content="https://douglaspaiani.com.br/douglas-paiani-corrigido.webp"
          />
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              url: endereçoPágina,
              name: "Douglas Paiani — Atleta e parcerias",
              inLanguage: "pt-BR",
              mainEntity: {
                "@type": "Person",
                name: "Douglas Paiani",
                url: endereçoPágina,
                image: "https://douglaspaiani.com.br/douglas-paiani-corrigido.webp",
                description:
                  "Atleta e profissional de marketing, criação de conteúdo e desenvolvimento de sites.",
                knowsAbout: [
                  "Fisiculturismo",
                  "Marketing digital",
                  "Inteligência artificial",
                  "Desenvolvimento de sites",
                  "Criação de conteúdo",
                ],
              },
            })}
          </script>
        </Helmet>

        <a href="#conteudo-atleta" className="atleta-pular">
          Pular para o conteúdo
        </a>
        <header className="atleta-cabeçalho border-b border-white/10">
          <div className="atleta-container flex min-h-22 flex-wrap items-center justify-between gap-x-5 gap-y-3 py-4">
            <a
              href="#inicio-atleta"
              aria-label="Douglas Paiani — início"
              className="flex items-center gap-3"
            >
              <img
                src="/atleta/logo-douglas-atleta.webp"
                alt=""
                width="56"
                height="56"
                fetchPriority="high"
                className="atleta-logotipo"
              />
              <span className="border-l border-white/20 pl-3 text-[10px] font-bold uppercase leading-relaxed tracking-[0.22em]">
                Douglas Paiani
                <span className="block text-white/50">Atleta & criador</span>
              </span>
            </a>
            <nav
              aria-label="Navegação da página do atleta"
              className="order-3 flex w-full justify-between gap-5 border-t border-white/10 pt-3 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70 sm:order-0 sm:w-auto sm:justify-center sm:gap-7 sm:border-0 sm:pt-0"
            >
              <a href="#sobre-atleta">Sobre mim</a>
              <a href="#galeria-atleta">Galeria</a>
              <a href="#federacoes-atleta">Federações</a>
              <a href="#parceria-atleta">Parceria</a>
            </nav>
            <a
              href="#contato-atleta"
              className="hidden items-center gap-3 text-xs font-bold sm:flex"
            >
              Seja parceiro{" "}
              <ArrowUpRight
                className="text-[#77e58f]"
                size={18}
                aria-hidden="true"
              />
            </a>
          </div>
        </header>

        <main id="conteudo-atleta">
          <section
            id="inicio-atleta"
            aria-labelledby="titulo-atleta"
            className="atleta-hero relative overflow-hidden"
          >
            <div className="atleta-container relative grid lg:min-h-175 lg:grid-cols-[1.05fr_1fr]">
              <div className="relative z-10 pt-14 pb-6 sm:pt-20 lg:pt-23 lg:pb-20">
                <p className="atleta-etiqueta flex items-center gap-2.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#77e58f]" />{" "}
                  Fisiculturismo. Conteúdo. Estratégia.
                </p>
                <h1 id="titulo-atleta" className="atleta-nome mt-7">
                  DOUGLAS
                  <br />
                  <span>PAIANI.</span>
                </h1>
                <p className="mt-7 max-w-md text-xl font-semibold leading-snug sm:text-2xl">
                  Disciplina para evoluir.
                  <br />
                  Estratégia para crescer juntos.
                </p>
                <p className="mt-4 max-w-95 text-sm leading-7 text-[#a7a7ad]">
                  Do treino ao digital, uma parceria que coloca sua marca em
                  movimento.
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-6">
                  <BotãoParceria conteúdo="Quero ser parceiro" />
                  <a
                    href="#parceria-atleta"
                    className="flex items-center gap-2 py-3 text-xs font-semibold text-white/75"
                  >
                    Conheça a proposta{" "}
                    <ArrowDown size={15} aria-hidden="true" />
                  </a>
                </div>
                <p className="mt-9 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.13em] text-[#96969e]">
                  <MapPin
                    size={13}
                    className="text-[#77e58f]"
                    aria-hidden="true"
                  />{" "}
                  Vale do Sinos · Rio Grande do Sul
                </p>
              </div>
              <div className="atleta-retrato relative mx-auto w-full max-w-155 lg:max-w-none">
                <div className="atleta-faixa-retrato" aria-hidden="true" />
                <span className="atleta-letras-fundo" aria-hidden="true">
                  DP
                </span>
                <img
                  src="/douglas-paiani-corrigido.webp"
                  alt="Douglas Paiani, atleta e criador de conteúdo"
                  width="1234"
                  height="1275"
                  fetchPriority="high"
                  className="atleta-imagem-retrato"
                />
                <div className="atleta-legenda-retrato absolute right-5 bottom-10 z-3 border-l-2 border-[#77e58f] bg-black/60 py-3 pl-4 pr-6 backdrop-blur-md lg:right-16 lg:bottom-15">
                  <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
                    Dentro e fora do treino
                  </span>
                  <span className="atleta-fonte mt-1 block text-xl uppercase">
                    Compromisso com a evolução.
                  </span>
                </div>
              </div>
            </div>
          </section>

          <div className="atleta-faixa border-y border-white/10">
            <div className="atleta-container flex flex-wrap items-center justify-between gap-x-6 gap-y-3 py-6 text-[10px] font-bold uppercase tracking-[0.18em] sm:text-xs">
              <span className="flex items-center gap-3">
                <Dumbbell size={17} aria-hidden="true" /> Esporte com propósito
              </span>
              <span className="flex items-center gap-3">
                <Video size={17} aria-hidden="true" /> Conteúdo com presença
              </span>
              <span className="flex items-center gap-3">
                <Target size={17} aria-hidden="true" /> Parceria com estratégia
              </span>
            </div>
          </div>

          <section
            id="sobre-atleta"
            className="atleta-sobre-seção border-b border-white/10"
          >
            <div className="atleta-container atleta-seção atleta-sobre-grade">
              <div className="atleta-sobre-apresentação">
                <TítuloSeção número="01" etiqueta="Sobre mim">
                  A mesma dedicação.
                  <br />
                  <span className="text-[#77e58f]">
                    Dentro e fora
                    <br />
                    do treino.
                  </span>
                </TítuloSeção>
                <div className="atleta-sobre-visual">
                  <img
                    src={fotoNegócios}
                    alt="Douglas Paiani trabalhando com notebook e telefone"
                    width="754"
                    height="911"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="atleta-sobre-visual-legenda">
                    <span aria-hidden="true" /> Esporte + estratégia
                  </span>
                </div>
              </div>
              <div className="atleta-sobre-conteúdo">
                <p className="atleta-sobre-abertura">
                  Sou Douglas Paiani. Uno a dedicação ao fisiculturismo à
                  experiência em marketing, tecnologia e criação de conteúdo.
                </p>
                <div className="atleta-sobre-narrativa">
                  <div className="atleta-sobre-bloco">
                    <span className="atleta-sobre-bloco-número" aria-hidden="true">01</span>
                    <div>
                      <h3>Presença de verdade</h3>
                      <p>
                        Minha proposta é levar sua marca para a minha rotina:
                        nos treinos, nas redes sociais, nas academias do Vale do
                        Sinos e nos campeonatos do Rio Grande do Sul.
                      </p>
                    </div>
                  </div>
                  <div className="atleta-sobre-bloco">
                    <span className="atleta-sobre-bloco-número" aria-hidden="true">02</span>
                    <div>
                      <h3>Mais do que exposição</h3>
                      <p>
                        Além da presença como atleta, somo conhecimento para
                        criar, divulgar e fortalecer o seu negócio. Uma parceria
                        construída com proximidade, consistência e vontade de
                        crescer junto.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="atleta-sobre-perfis" aria-label="Áreas de atuação">
                  {[
                    "Atleta",
                    "Criador de conteúdo",
                    "Marketing & tecnologia",
                  ].map((etiqueta) => (
                    <span key={etiqueta}>
                      <span aria-hidden="true" />
                      {etiqueta}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            id="galeria-atleta"
            className="atleta-container atleta-seção border-t border-white/10"
          >
            <div className="flex flex-wrap items-end justify-between gap-6">
              <TítuloSeção número="02" etiqueta="Galeria de fotos">
                Por trás <span className="text-[#77e58f]">da parceria.</span>
              </TítuloSeção>
              <p className="flex items-center gap-2 text-xs text-[#aaaab1]">
                <Plus size={16} aria-hidden="true" /> Toque nas fotos para
                ampliar
              </p>
            </div>
            <GaleriaAtleta />
          </section>

          <section
            id="federacoes-atleta"
            className="border-y border-white/10 bg-[#0c1911]"
          >
            <div className="atleta-container grid items-center gap-10 py-12 md:grid-cols-[1fr_1fr]">
              <div>
                <p className="atleta-etiqueta">03 / Federações</p>
                <h2 className="atleta-fonte mt-4 text-3xl uppercase sm:text-4xl">
                  O universo do fisiculturismo.
                </h2>
                <p className="mt-3 text-sm text-[#aaaab1]">
                  Dedicação ao esporte. Conexão com esse cenário.
                </p>
              </div>
              <div className="grid grid-cols-2 divide-x divide-white/10">
                <a
                  href="https://ifbb.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Conhecer o site oficial da IFBB"
                  className="atleta-federação"
                >
                  <span className="flex h-28 w-38 max-w-full items-center justify-center rounded-sm bg-white p-3">
                    <img
                      src="/atleta/ifbb.png"
                      alt="Logo da IFBB"
                      width="201"
                      height="130"
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </span>
                  <span>
                    IFBB <ArrowUpRight size={12} aria-hidden="true" />
                  </span>
                </a>
                <a
                  href="https://www.ifbbpro.com/npc-worldwide/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Conhecer o site oficial da NPC Worldwide"
                  className="atleta-federação"
                >
                  <img
                    src="/atleta/npc.png"
                    alt="Logo da NPC Worldwide"
                    width="400"
                    height="400"
                    loading="lazy"
                    className="h-28 w-28 object-contain"
                  />
                  <span>
                    NPC Worldwide <ArrowUpRight size={12} aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
          </section>

          <section
            id="parceria-atleta"
            className="atleta-entregas-seção border-y border-white/10"
          >
            <div className="atleta-container atleta-seção">
              <div className="atleta-entregas-cabeçalho">
                <TítuloSeção número="04" etiqueta="O que entrego">
                  Sua marca.
                  <br />
                  <span className="text-[#77e58f]">Parte da minha rotina.</span>
                </TítuloSeção>
                <div className="atleta-entregas-resumo">
                  <span className="atleta-entregas-resumo-linha" aria-hidden="true" />
                  <p>
                    Presença real em cada ponto de contato. Da sua loja ao
                    treino, do conteúdo ao campeonato.
                  </p>
                  <span className="atleta-entregas-resumo-etapas">
                    Loja <span aria-hidden="true">/</span> Digital{" "}
                    <span aria-hidden="true">/</span> Palco
                  </span>
                </div>
              </div>
              <div className="atleta-entregas-grade">
                {entregas.map((entrega, índice) => (
                  <motion.article
                    key={entrega.título}
                    initial={false}
                    whileHover={{ y: -5 }}
                    className="atleta-entrega"
                  >
                    <div className="atleta-entrega-topo">
                      <span className="atleta-entrega-ícone">
                        <entrega.ícone
                          size={26}
                          strokeWidth={1.6}
                          aria-hidden="true"
                        />
                      </span>
                      <span className="atleta-entrega-número" aria-hidden="true">
                        0{índice + 1}
                      </span>
                    </div>
                    <div className="atleta-entrega-conteúdo">
                      <p className="atleta-entrega-rótulo">{entrega.rótulo}</p>
                      <h3>{entrega.título}</h3>
                      <p className="atleta-entrega-descrição">{entrega.descrição}</p>
                    </div>
                    <span className="atleta-entrega-canto" aria-hidden="true" />
                  </motion.article>
                ))}
              </div>
              <div className="atleta-entregas-rodapé" aria-hidden="true">
                <span>Da sua loja ao palco</span>
                <span className="atleta-entregas-rodapé-linha" />
                <span>Presença que acompanha a rotina</span>
              </div>
            </div>
          </section>

          <section
            id="diferenciais-atleta"
            className="atleta-diferenciais-seção border-y border-white/10"
          >
            <div className="atleta-container atleta-seção atleta-diferenciais-grade">
              <div className="atleta-diferenciais-introdução">
                <TítuloSeção número="05" etiqueta="O que posso agregar">
                  O atleta veste.
                  <br />O estrategista
                  <br />
                  <span className="text-[#77e58f]">faz acontecer.</span>
                </TítuloSeção>
                <p className="mt-6 max-w-85 text-sm leading-7 text-[#aaaab1]">
                  Experiência e estrutura para ir além da divulgação e somar ao
                  dia a dia da sua marca.
                </p>
                <div className="atleta-diferenciais-selo">
                  <Shirt
                    size={25}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />
                  <div>
                    <span>Parceria completa</span>
                    <strong>A sua marca, bem representada.</strong>
                  </div>
                </div>
              </div>
              <div className="atleta-diferenciais-frentes">
                {frentesDiferenciais.map((frente) => (
                  <div className="atleta-diferenciais-frente" key={frente.número}>
                    <div className="atleta-diferenciais-frente-cabeçalho">
                      <div>
                        <p>{frente.etiqueta}</p>
                        <h3 className="atleta-fonte">{frente.título}</h3>
                      </div>
                      <span aria-hidden="true">{frente.número}</span>
                    </div>
                    <div className="atleta-diferenciais-itens">
                      {frente.itens.map((diferencial) => (
                        <article
                          className="atleta-diferencial-item"
                          key={diferencial.título}
                        >
                          <span className="atleta-diferencial-ícone">
                            <diferencial.ícone
                              size={22}
                              strokeWidth={1.6}
                              aria-hidden="true"
                            />
                          </span>
                          <div>
                            <h4>{diferencial.título}</h4>
                            <p>{diferencial.descrição}</p>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section
            className="atleta-container atleta-seção"
            aria-labelledby="vantagens-atleta"
          >
            <p className="atleta-etiqueta">06 / Vantagens para a loja</p>
            <h2 id="vantagens-atleta" className="atleta-título mt-5">
              Uma parceria.
              <br />
              <span className="text-[#77e58f]">Várias formas de crescer.</span>
            </h2>
            <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
              {vantagens.map((vantagem) => (
                <article
                  key={vantagem.número}
                  className="border-t border-white/20 pt-5"
                >
                  <span className="atleta-fonte text-5xl text-[#77e58f]">
                    {vantagem.número}
                    <span className="text-white/20">.</span>
                  </span>
                  <h3 className="mt-6 max-w-55 text-lg font-semibold leading-snug">
                    {vantagem.título}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[#aaaab1]">
                    {vantagem.descrição}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section
            id="contato-atleta"
            className="atleta-contato relative overflow-hidden"
          >
            <div className="atleta-container atleta-contato-conteúdo relative z-1 grid items-center gap-12 py-18 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.73fr)] lg:gap-20 lg:py-28">
              <div className="atleta-contato-apresentação">
                <p className="atleta-etiqueta atleta-contato-etiqueta">
                  <span aria-hidden="true" />O próximo passo é nosso.
                </p>
                <h2 className="atleta-título atleta-contato-título mt-7">
                  Vamos construir
                  <br />
                  uma parceria
                  <br />
                  <span>de sucesso?</span>
                </h2>
                <p className="atleta-contato-descrição mt-7 max-w-105 text-sm leading-7">
                  Sua marca tem uma história. Vamos levar essa história mais
                  longe, juntos.
                </p>
                <div className="atleta-contato-assinatura mt-9">
                  <span aria-hidden="true" className="atleta-contato-traços" />
                  <span>Esporte. Conteúdo. Estratégia.</span>
                </div>
              </div>
              <div className="atleta-contato-cartão">
                <div className="atleta-contato-cartão-topo">
                  <span className="atleta-contato-cartão-etiqueta">
                    Contato direto
                  </span>
                  {/* Símbolo oficial do WhatsApp, exibido na versão monocromática. */}
                  <svg
                    width="43"
                    height="43"
                    viewBox="0 0 720 720"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M360,0C161.18,0,0,161.18,0,360c0,65.41,17.45,126.75,47.94,179.61L0,720l187.02-44.21c51.34,28.18,110.28,44.21,172.98,44.21,198.82,0,360-161.18,360-360S558.82,0,360,0ZM360,655.52c-60.17,0-116.13-17.98-162.82-48.87l-110.49,28.14,30.99-105.61c-33.53-47.93-53.2-106.26-53.2-169.19,0-163.21,132.31-295.52,295.52-295.52s295.52,132.31,295.52,295.52-132.31,295.52-295.52,295.52Z"
                      fill="currentColor"
                    />
                    <path
                      d="M444.35,407.52l87.1,41.06c4,1.88,6.56,5.94,6.2,10.34-.94,11.46-5.54,34.43-26.13,55.02-58.12,58.12-162.49-7.64-166.74-10.18-25.67-13.79-50.06-32.24-73.19-55.36s-41.58-47.52-55.37-73.19c-2.55-4.24-68.31-108.61-10.18-166.74,20.59-20.59,43.56-25.19,55.02-26.13,4.41-.36,8.46,2.2,10.34,6.2l41.07,87.1c1.94,4.12,1.09,9.02-2.13,12.24l-30.61,30.61c-6.62,6.62-8.56,16.93-4,25.11,11.17,20.03,26.19,39.32,43.59,57.07,17.75,17.4,37.04,32.43,57.07,43.59,8.18,4.56,18.48,2.62,25.11-4l30.61-30.61c3.22-3.22,8.12-4.08,12.24-2.13Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <p className="atleta-contato-cartão-título mt-9">
                  Me conte sobre sua loja.
                </p>
                <p className="atleta-contato-cartão-texto mt-3">
                  Vamos conversar sobre as possibilidades.
                </p>
                <BotãoParceria
                  conteúdo="Conversar no WhatsApp"
                  classe="atleta-botão-claro"
                />
                <div className="atleta-contato-cartão-rodapé">
                  <p>(51) 99472-7036</p>
                  <p className="flex items-center gap-2">
                    <Check size={14} aria-hidden="true" /> Conversa direta
                    comigo.
                  </p>
                </div>
              </div>
            </div>
            <span aria-hidden="true" className="atleta-contato-marca">
              JUNTOS.
            </span>
          </section>
        </main>

        <footer className="atleta-container flex flex-wrap items-center justify-between gap-6 py-8">
          <a
            href="#inicio-atleta"
            className="inline-flex items-center"
            aria-label="Voltar ao início"
          >
            <img
              src="/atleta/logo-douglas-atleta.webp"
              alt=""
              width="52"
              height="52"
              loading="lazy"
              className="atleta-logotipo atleta-logotipo-rodapé"
            />
          </a>
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#96969e]">
            Douglas Paiani · Esporte, conteúdo & estratégia.
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-[#aaaab1]"
          >
            Conheça meu trabalho <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </footer>
      </div>
    </MotionConfig>
  );
}
