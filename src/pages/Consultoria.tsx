import { useEffect, useRef, useState, type ReactNode } from "react";
import MetadadosConsultoria from "../components/MetadadosConsultoria";
import { Link } from "react-router";
import {
  motion,
  MotionConfig,
  useReducedMotion,
  useScroll,
} from "motion/react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardList,
  Dumbbell,
  Flame,
  Gift,
  HeartPulse,
  Instagram,
  Menu,
  Plus,
  ShieldCheck,
  Shirt,
  Smartphone,
  Target,
  TrendingUp,
  Trophy,
  Utensils,
  X,
  Zap,
} from "lucide-react";
import { IconeWhatsappOficial } from "../components/WhatsappFlutuante";
import "./consultoria.css";

const endereçoPágina = "https://douglaspaiani.com.br/consultoria";
const títuloPágina =
  "Consultoria Esportiva Online | Douglas Paiani - Paiani Team";
const descriçãoPágina =
  "Consultoria esportiva online com Douglas Paiani, campeão Men’s Physique. Treinos individualizados, acompanhamento pelo ProClub e planos a partir de R$ 149,90.";
const planos = [
  {
    nome: "Start",
    período: "1 mês",
    preço: 149.9,
    meses: 1,
    frase: "O primeiro passo para sair do lugar.",
    bônus: "Seu ponto de partida",
    ícone: Zap,
  },
  {
    nome: "Evolução",
    período: "3 meses",
    preço: 399.9,
    meses: 3,
    frase: "Tempo para construir uma nova rotina.",
    bônus: "Constância que transforma",
    ícone: TrendingUp,
  },
  {
    nome: "Performance",
    período: "6 meses",
    preço: 789.9,
    meses: 6,
    frase: "Mais compromisso. Mais direção.",
    bônus: "Bônus: 1 treino presencial*",
    ícone: Dumbbell,
  },
  {
    nome: "Elite",
    período: "1 ano",
    preço: 1499.9,
    meses: 12,
    frase: "Um ano inteiro para ir além.",
    bônus: "Bônus: camiseta do time",
    ícone: Shirt,
  },
];
const etapas = [
  {
    título: "Você conta. Eu escuto.",
    subtítulo: "Ponto de partida",
    descrição:
      "Começamos com uma conversa sobre seus objetivos, experiência, disponibilidade e estrutura para treinar. A sua realidade é o ponto de partida da nossa jornada.",
    ícone: ClipboardList,
    detalhe: "Seu objetivo + sua rotina + seu momento.",
  },
  {
    título: "Um plano com a sua cara.",
    subtítulo: "Estratégia individual",
    descrição:
      "Organizamos o direcionamento dos treinos de acordo com seu nível e seus objetivos. Você entende o que fazer e como encaixar o treino no seu dia a dia.",
    ícone: Target,
    detalhe: "Direção para cada sessão de treino.",
  },
  {
    título: "Sua evolução no ProClub.",
    subtítulo: "Acompanhamento no aplicativo",
    descrição:
      "A consultoria é mentorada pelo aplicativo ProClub. Por lá, você acompanha seu progresso, organiza os treinos e gerencia sua rotina em um só lugar.",
    ícone: Smartphone,
    detalhe: "Tudo organizado. Onde você estiver.",
  },
  {
    título: "Consistência. Ajustes. Evolução.",
    subtítulo: "Mentoria ao longo do plano",
    descrição:
      "O acompanhamento continua durante o período contratado. Sua evolução orienta a conversa, os ajustes e os próximos passos para manter o foco no processo.",
    ícone: TrendingUp,
    detalhe: "Um processo que acompanha você.",
  },
];
const benefícios = [
  {
    número: "01",
    título: "Treine com direção.",
    descrição:
      "Um caminho pensado para seus objetivos e para a rotina que você realmente tem.",
    ícone: Target,
  },
  {
    número: "02",
    título: "Enxergue sua evolução.",
    descrição:
      "Acompanhe seu progresso pelo ProClub e transforme cada treino em parte de uma jornada.",
    ícone: TrendingUp,
  },
  {
    número: "03",
    título: "Faça parte de um time.",
    descrição:
      "Mentoria, proximidade e bastidores de quem vive a disciplina dentro e fora do palco.",
    ícone: Flame,
  },
];
const perguntas = [
  {
    pergunta: "Como funciona a consultoria online?",
    resposta:
      "Você escolhe um plano e conversa comigo pelo WhatsApp para alinhar os objetivos e iniciar o acompanhamento. A mentoria acontece pelo aplicativo ProClub, onde você acompanha o progresso e organiza sua rotina durante o período contratado.",
  },
  {
    pergunta: "Preciso ser atleta ou já ter experiência?",
    resposta:
      "Não. O ponto de partida é o seu momento atual. Na conversa inicial, alinhamos sua experiência, seus objetivos e sua disponibilidade para construir uma rotina possível para você.",
  },
  {
    pergunta: "O que está incluído em todos os planos?",
    resposta:
      "Todos os planos incluem direcionamento individual, mentoria durante o período contratado, acompanhamento da evolução pelo ProClub e acesso aos meus melhores amigos no Instagram para acompanhar os bastidores das preparações.",
  },
  {
    pergunta: "O valor é mensal ou pelo período completo?",
    resposta: `Os valores exibidos são pelo período completo: ${planos.map((plano) => `${plano.período} por R$ ${formatarPreço(plano.preço)}`).join(", ")}. O equivalente mensal é apenas uma comparação. As condições de pagamento são alinhadas pelo WhatsApp antes da contratação.`,
  },
  {
    pergunta: "Como funciona o treino presencial do plano de 6 meses?",
    resposta:
      "O plano Performance inclui uma sessão de treino presencial, disponível para quem estiver dentro da região atendida. Consulte sua cidade e combine a disponibilidade e o agendamento comigo pelo WhatsApp antes de contratar.",
  },
  {
    pergunta: "Como recebo a camiseta do plano anual?",
    resposta:
      "Ao contratar o plano Elite de 1 ano, você ganha uma camiseta personalizada do Paiani Team. Tamanho, modelo disponível e condições de entrega são combinados comigo pelo WhatsApp. A imagem apresentada é ilustrativa.",
  },
  {
    pergunta: "O que vou encontrar nos melhores amigos?",
    resposta:
      "Em qualquer plano, você acompanha de perto minhas preparações para os campeonatos: rotina, dieta, estratégias e relatos pessoais sobre as dosagens de ergogênicos. É um olhar para os bastidores da minha preparação, sem prescrição de substâncias para os alunos.",
  },
];

function criarConversa(plano?: string) {
  const mensagem = plano
    ? `Olá, Douglas! Quero fazer parte do Paiani Team. Tenho interesse no plano ${plano} da consultoria esportiva. Como começamos?`
    : "Olá, Douglas! Conheci a consultoria Paiani Team e quero saber como começar. Vamos conversar?";
  return `https://wa.me/5551994727036?text=${encodeURIComponent(mensagem)}`;
}
function formatarPreço(valor: number) {
  return valor.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
function BotãoContato({
  children: conteúdo,
  plano,
  classe = "",
}: {
  children: ReactNode;
  plano?: string;
  classe?: string;
}) {
  return (
    <a
      className={`consultoria-botão ${classe}`}
      href={criarConversa(plano)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {conteúdo}
      <ArrowUpRight size={18} aria-hidden="true" />
    </a>
  );
}
function Revelar({
  children: conteúdo,
  classe = "",
}: {
  children: ReactNode;
  classe?: string;
}) {
  const reduzirMovimento = useReducedMotion();
  // Mantém o conteúdo visível no HTML estático e anima somente o deslocamento ao entrar na tela.
  return (
    <motion.div
      className={classe}
      initial={false}
      whileInView={reduzirMovimento ? undefined : { y: [24, 0] }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      {conteúdo}
    </motion.div>
  );
}
function Etiqueta({
  número,
  children: conteúdo,
}: {
  número: string;
  children: ReactNode;
}) {
  return (
    <p className="consultoria-etiqueta">
      <span>{número} /</span>
      {conteúdo}
    </p>
  );
}
function CabeçalhoConsultoria() {
  const diálogoMenu = useRef<HTMLDialogElement>(null);
  const botãoMenu = useRef<HTMLButtonElement>(null);
  const [menuAberto, definirMenuAberto] = useState(false);
  const itens = [
    ["O método", "#metodo"],
    ["Como funciona", "#como-funciona"],
    ["Seu mentor", "#seu-mentor"],
    ["Planos", "#planos"],
  ];
  useEffect(() => {
    if (!menuAberto) return;
    const rolagemAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function acompanharLargura() {
      if (window.innerWidth > 900) diálogoMenu.current?.close();
    }
    window.addEventListener("resize", acompanharLargura);
    return () => {
      document.body.style.overflow = rolagemAnterior;
      window.removeEventListener("resize", acompanharLargura);
    };
  }, [menuAberto]);
  function fecharMenu() {
    diálogoMenu.current?.close();
  }
  return (
    <>
      <header className="consultoria-cabeçalho">
        <div className="consultoria-contêiner consultoria-navegação">
          <a
            href="#inicio-consultoria"
            aria-label="Paiani Team — início"
            className="consultoria-marca"
          >
            <img
              src="/consultoria/paiani-team.webp"
              alt="Paiani Team"
              width="600"
              height="400"
            />
            <span>CONSULTORIA ESPORTIVA</span>
          </a>
          <nav aria-label="Navegação principal da consultoria">
            {itens.map(([nome, destino]) => (
              <a key={destino} href={destino}>
                {nome}
              </a>
            ))}
            <a
              href="https://instagram.com/douglaspaiani"
              target="_blank"
              rel="noopener noreferrer"
              className="consultoria-link-instagram"
              aria-label="Instagram de Douglas Paiani"
            >
              <Instagram size={16} aria-hidden="true" />
              Instagram
            </a>
          </nav>
          <a href="#planos" className="consultoria-entrar">
            Faça parte do time <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <button
            className="consultoria-menu-botão"
            ref={botãoMenu}
            aria-label="Abrir menu"
            aria-haspopup="dialog"
            aria-expanded={menuAberto}
            aria-controls="menu-consultoria"
            onClick={() => {
              diálogoMenu.current?.showModal();
              definirMenuAberto(true);
            }}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>
      <dialog
        id="menu-consultoria"
        className="consultoria-menu"
        ref={diálogoMenu}
        aria-label="Menu da consultoria"
        onClose={() => {
          definirMenuAberto(false);
          botãoMenu.current?.focus();
        }}
        onClick={(evento) => {
          if (evento.target === evento.currentTarget) fecharMenu();
        }}
      >
        <div>
          <button autoFocus onClick={fecharMenu} aria-label="Fechar menu">
            <X />
          </button>
          <p className="consultoria-etiqueta">PAIANI TEAM / MENU</p>
          <nav aria-label="Navegação móvel">
            {itens.map(([nome, destino], índice) => (
              <a key={destino} href={destino} onClick={fecharMenu}>
                <span>0{índice + 1}</span>
                {nome}
                <ArrowUpRight />
              </a>
            ))}
            <a
              href="https://instagram.com/douglaspaiani"
              target="_blank"
              rel="noopener noreferrer"
              onClick={fecharMenu}
            >
              <span>05</span>
              Instagram
              <Instagram size={19} aria-hidden="true" />
            </a>
          </nav>
          <BotãoContato>Conversar com Douglas</BotãoContato>
        </div>
      </dialog>
    </>
  );
}
function AcompanhamentoPróximo() {
  const frentesAcompanhamento = [
    {
      número: "01",
      ícone: Utensils,
      título: "Plano alimentar",
      chamada: "Sua alimentação no processo.",
      descrição:
        "Acompanhamento de perto da sua rotina alimentar, da adesão e das dificuldades do dia a dia, integrado ao plano prescrito pelo nutricionista responsável.",
      pontos: [
        "Rotina e organização das refeições",
        "Acompanhamento da adesão ao plano",
        "Prescrição e ajustes pelo nutricionista",
      ],
      etiqueta: "ALIMENTAÇÃO COM DIREÇÃO",
    },
    {
      número: "02",
      ícone: Dumbbell,
      título: "Protocolo de treinos",
      chamada: "Propósito em cada sessão.",
      descrição:
        "Treinos alinhados ao seu nível, aos seus objetivos e à sua disponibilidade. Sua evolução orienta o acompanhamento e os próximos ajustes do processo.",
      pontos: [
        "Estrutura de treino individualizada",
        "Evolução acompanhada pelo ProClub",
        "Ajustes conforme o seu progresso",
      ],
      etiqueta: "TREINAMENTO COM ESTRATÉGIA",
    },
    {
      número: "03",
      ícone: HeartPulse,
      título: "Protocolo hormonal",
      chamada: "Integrado ao cuidado médico.",
      descrição:
        "Quando houver indicação clínica, o acompanhamento considera o protocolo hormonal prescrito pelo seu médico. A avaliação, a prescrição e os ajustes são exclusivamente médicos.",
      pontos: [
        "Cupons de desconto exclusivos",
        "Sem exageros, somente o necessário",
        "Totalmente opcional",
      ],
      etiqueta: "SAÚDE EM PRIMEIRO LUGAR",
    },
  ];
  return (
    <section
      id="acompanhamento"
      className="consultoria-seção consultoria-acompanhamento"
      aria-labelledby="título-acompanhamento"
    >
      <div className="consultoria-contêiner">
        <Revelar classe="consultoria-acompanhamento-abertura">
          <div>
            <Etiqueta número="+">ACOMPANHAMENTO PRÓXIMO E INTEGRADO</Etiqueta>
            <h2 id="título-acompanhamento">
              Seu objetivo por inteiro.
              <br />
              <span>Você acompanhado de perto.</span>
            </h2>
          </div>
          <p>
            Alimentação, treino e evolução conectados em uma jornada. Pelo
            ProClub, sua rotina ganha organização e o seu processo recebe
            atenção em cada etapa.
          </p>
        </Revelar>
        <div className="consultoria-acompanhamento-frentes">
          {frentesAcompanhamento.map((frente) => (
            <Revelar
              key={frente.número}
              classe="consultoria-acompanhamento-frente"
            >
              <div className="consultoria-acompanhamento-topo">
                <span>{frente.número}</span>
                <frente.ícone size={30} aria-hidden="true" />
              </div>
              <p className="consultoria-acompanhamento-etiqueta">
                {frente.etiqueta}
              </p>
              <h3>{frente.título}</h3>
              <p className="consultoria-acompanhamento-chamada">
                {frente.chamada}
              </p>
              <p className="consultoria-acompanhamento-descrição">
                {frente.descrição}
              </p>
              <ul>
                {frente.pontos.map((ponto) => (
                  <li key={ponto}>
                    <Check size={14} aria-hidden="true" />
                    {ponto}
                  </li>
                ))}
              </ul>
            </Revelar>
          ))}
        </div>
        <Revelar classe="consultoria-acompanhamento-faixa">
          <div className="consultoria-acompanhamento-presença">
            <span aria-hidden="true" />
            <div>
              <strong>DE PERTO. EM CADA FASE.</strong>
              <p>Clareza para começar. Proximidade para continuar.</p>
            </div>
          </div>
          <BotãoContato>Quero esse acompanhamento</BotãoContato>
        </Revelar>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const [etapaAtiva, definirEtapaAtiva] = useState(0);
  return (
    <section
      id="como-funciona"
      className="consultoria-seção consultoria-processo"
    >
      <div className="consultoria-contêiner">
        <Revelar classe="consultoria-título-dividido">
          <div>
            <Etiqueta número="02">DO PRIMEIRO PASSO À EVOLUÇÃO</Etiqueta>
            <h2>
              Online na forma.
              <br />
              <span>Presente no processo.</span>
            </h2>
          </div>
          <p>
            Você não precisa ter tudo resolvido para começar. Precisa de um
            próximo passo bem orientado.
          </p>
        </Revelar>
        <div className="consultoria-processo-grade">
          <div className="consultoria-processo-foto">
            <img
              src="/consultoria/douglas-preparacao.webp"
              alt="Douglas Paiani em uma pose de competição de fisiculturismo"
              width="589"
              height="1280"
              loading="lazy"
            />
            <div className="consultoria-foto-legenda">
              <span>DISCIPLINA NÃO É UM EVENTO.</span>
              <strong>É o que você repete.</strong>
            </div>
            <span className="consultoria-selo-foto">
              <Trophy size={18} /> MENTORIA DE ATLETA
            </span>
          </div>
          <div className="consultoria-etapas">
            {etapas.map((etapa, índice) => (
              <div
                className={`consultoria-etapa ${etapaAtiva === índice ? "ativa" : ""}`}
                key={etapa.título}
              >
                <button
                  aria-expanded={etapaAtiva === índice}
                  aria-controls={`etapa-consultoria-${índice}`}
                  onClick={() => definirEtapaAtiva(índice)}
                >
                  <span className="consultoria-etapa-número">
                    0{índice + 1}
                  </span>
                  <span>
                    <small>{etapa.subtítulo}</small>
                    <strong>{etapa.título}</strong>
                  </span>
                  <Plus aria-hidden="true" />
                </button>
                <div
                  id={`etapa-consultoria-${índice}`}
                  hidden={etapaAtiva !== índice}
                >
                  <p>{etapa.descrição}</p>
                  <span className="consultoria-etapa-detalhe">
                    <etapa.ícone size={16} aria-hidden="true" />
                    {etapa.detalhe}
                  </span>
                </div>
              </div>
            ))}
            <a className="consultoria-link" href="#planos">
              Encontre o seu plano <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
function AplicativoProclub() {
  return (
    <section className="consultoria-seção consultoria-aplicativo" id="proclub">
      <div className="consultoria-contêiner consultoria-aplicativo-grade">
        <Revelar>
          <Etiqueta número="03">TECNOLOGIA A FAVOR DO SEU OBJETIVO</Etiqueta>
          <h2>
            Seu treino.
            <br />
            Sua rotina.
            <br />
            <span>Sua evolução.</span>
          </h2>
          <p className="consultoria-texto">
            A consultoria é mentorada pelo <strong>aplicativo ProClub</strong>.
            Mais clareza para acompanhar seu progresso e gerenciar sua rotina,
            de onde você estiver.
          </p>
          <ul className="consultoria-lista">
            <li>
              <Check />
              Acompanhamento da sua evolução
            </li>
            <li>
              <Check />
              Organização da rotina de treino
            </li>
            <li>
              <Check />
              Sua jornada em um só lugar
            </li>
          </ul>
          <a href="#como-funciona" className="consultoria-link">
            Entenda o acompanhamento <ArrowUpRight size={17} />
          </a>
        </Revelar>
        <Revelar classe="consultoria-aplicativo-visual">
          <div className="consultoria-órbita" aria-hidden="true" />
          <div className="consultoria-aplicativo-nota">
            <span>
              <Check size={15} />
            </span>{" "}
            CADA TREINO CONTA.
          </div>
          <div
            className="consultoria-celular"
            aria-label="Demonstração ilustrativa de acompanhamento no aplicativo"
          >
            <div className="consultoria-celular-câmera" />
            <div className="consultoria-celular-topo">
              <img
                className="consultoria-celular-logo"
                src="/consultoria/proclub-logo.png"
                alt="ProClub"
                width="478"
                height="160"
                loading="lazy"
                decoding="async"
              />
              <span className="consultoria-avatar">PT</span>
            </div>
            <p className="consultoria-celular-saudação">
              SEU COMPROMISSO É COM VOCÊ.
            </p>
            <h3>
              Vamos evoluir<span>?</span>
            </h3>
            <div className="consultoria-treino-app">
              <span className="consultoria-mini-etiqueta">
                SEU PRÓXIMO PASSO
              </span>
              <div>
                <Dumbbell size={30} />
                <strong>
                  Treino do dia<small>Foco. Execução. Constância.</small>
                </strong>
                <ArrowUpRight size={18} />
              </div>
            </div>
            <div className="consultoria-progresso-topo">
              <strong>Sua constância</strong>
              <span>ESTA SEMANA</span>
            </div>
            <div className="consultoria-dias">
              {["S", "T", "Q", "Q", "S", "S", "D"].map((dia, índice) => (
                <div key={índice}>
                  <span className={índice < 4 ? "concluído" : ""}>
                    {índice < 4 ? <Check size={14} /> : <span>·</span>}
                  </span>
                  <small>{dia}</small>
                </div>
              ))}
            </div>
            <div className="consultoria-gráfico">
              <div>
                <span>PROGRESSO</span>
                <TrendingUp size={17} />
              </div>
              <svg
                viewBox="0 0 260 105"
                role="img"
                aria-label="Gráfico ilustrativo de acompanhamento da evolução"
              >
                <defs>
                  <linearGradient
                    id="gradiente-progresso"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ee3038" stopOpacity=".4" />
                    <stop offset="100%" stopColor="#ee3038" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 85 L35 73 L65 80 L105 53 L140 58 L175 33 L210 39 L260 10 L260 105 L0 105Z"
                  fill="url(#gradiente-progresso)"
                />
                <path
                  d="M0 85 L35 73 L65 80 L105 53 L140 58 L175 33 L210 39 L260 10"
                  fill="none"
                  stroke="#f1474b"
                  strokeWidth="3"
                />
              </svg>
              <p>Construa o seu próximo capítulo.</p>
            </div>
            <div className="consultoria-app-base">
              <span>
                <Target size={19} />
                Início
              </span>
              <span>
                <Dumbbell size={19} />
                Treinos
              </span>
              <span>
                <TrendingUp size={19} />
                Evolução
              </span>
            </div>
          </div>
          <p className="consultoria-ilustração">
            Interface ilustrativa. A apresentação do ProClub pode variar.
          </p>
        </Revelar>
      </div>
    </section>
  );
}
function PlanosConsultoria() {
  const [planoSelecionado, definirPlanoSelecionado] = useState(3);
  return (
    <section id="planos" className="consultoria-seção consultoria-planos">
      <div className="consultoria-contêiner">
        <Revelar classe="consultoria-planos-título">
          <Etiqueta número="06">ESCOLHA O SEU COMPROMISSO</Etiqueta>
          <h2>
            O próximo nível
            <br />
            <span>tem um primeiro passo.</span>
          </h2>
          <p>
            Quatro formas de começar. O mesmo compromisso com a sua evolução.
          </p>
        </Revelar>
        <div className="consultoria-comum">
          <ShieldCheck size={18} />
          <span>
            Em todos os planos: mentoria + ProClub + melhores amigos no
            Instagram
          </span>
        </div>
        <div className="consultoria-planos-grade">
          {planos.map((plano, índice) => (
            <Revelar
              classe={`consultoria-plano ${índice === 3 ? "consultoria-plano-anual" : ""} ${planoSelecionado === índice ? "selecionado" : ""}`}
              key={plano.nome}
            >
              {índice === 3 && (
                <div className="consultoria-plano-destaque">
                  <Flame size={13} /> O MAIOR COMPROMISSO. O MELHOR VALOR
                  MENSAL.
                </div>
              )}
              <div className="consultoria-plano-cabeça">
                <plano.ícone size={23} />
                <span>{plano.período}</span>
              </div>
              <h3>
                {plano.nome} - {plano.período}
              </h3>
              <p className="consultoria-plano-frase">{plano.frase}</p>
              <div className="consultoria-preço">
                <span>R$</span>
                <strong>{formatarPreço(plano.preço).split(",")[0]}</strong>
                <span>,{formatarPreço(plano.preço).split(",")[1]}</span>
              </div>
              <p className="consultoria-plano-período">
                valor total por {plano.período}
              </p>
              <p className="consultoria-equivalente">
                {plano.meses > 1
                  ? `Equivale a R$ ${formatarPreço(plano.preço / plano.meses)}/mês`
                  : "Um mês para começar sua jornada"}
              </p>
              <ul className="consultoria-lista">
                <li>
                  <Check />
                  Direcionamento individual
                </li>
                <li>
                  <Check />
                  Mentoria durante o plano
                </li>
                <li>
                  <Check />
                  Progresso pelo ProClub
                </li>
                <li>
                  <Check />
                  Melhores amigos no Instagram
                </li>
              </ul>
              <div className="consultoria-plano-bônus">
                <plano.ícone size={16} />
                {plano.bônus}
              </div>
              <a
                className={`consultoria-botão ${índice === 3 ? "" : "consultoria-botão-contorno"}`}
                href={criarConversa(
                  `${plano.nome} — ${plano.período} por R$ ${formatarPreço(plano.preço)}`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                onFocus={() => definirPlanoSelecionado(índice)}
                onMouseEnter={() => definirPlanoSelecionado(índice)}
              >
                Quero o plano {plano.nome}
                <ArrowUpRight size={16} />
              </a>
            </Revelar>
          ))}
        </div>
        <p className="consultoria-planos-observação">
          Valores pelo período completo. Condições de pagamento combinadas pelo
          WhatsApp.
          <br />
          *Treino presencial do plano de 6 meses sujeito à região atendida e ao
          agendamento prévio.
        </p>
      </div>
    </section>
  );
}

export default function Consultoria() {
  const { scrollYProgress: progressoRolagem } = useScroll();
  const dadosEstruturados = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": endereçoPágina,
        url: endereçoPágina,
        name: títuloPágina,
        description: descriçãoPágina,
        inLanguage: "pt-BR",
        mainEntity: { "@id": `${endereçoPágina}#servico` },
        about: { "@id": `${endereçoPágina}#douglas-paiani` },
        primaryImageOfPage: { "@id": `${endereçoPágina}#imagem` },
      },
      {
        "@type": "Service",
        "@id": `${endereçoPágina}#servico`,
        name: "Consultoria esportiva online Paiani Team",
        serviceType: "Consultoria esportiva online",
        url: endereçoPágina,
        provider: {
          "@id": `${endereçoPágina}#douglas-paiani`,
        },
        offers: planos.map((plano) => ({
          "@type": "Offer",
          name: `${plano.nome} — ${plano.período}`,
          price: plano.preço.toFixed(2),
          priceCurrency: "BRL",
          url: `${endereçoPágina}#planos`,
          description: `Consultoria esportiva online com mentoria pelo aplicativo ProClub. Duração: ${plano.período}.`,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${endereçoPágina}#duvidas`,
        inLanguage: "pt-BR",
        isPartOf: { "@id": endereçoPágina },
        mainEntity: perguntas.map((item) => ({
          "@type": "Question",
          name: item.pergunta,
          acceptedAnswer: { "@type": "Answer", text: item.resposta },
        })),
      },
      {
        "@type": "Person",
        "@id": `${endereçoPágina}#douglas-paiani`,
        name: "Douglas Paiani",
        jobTitle: "Personal trainer",
        description:
          "Atleta campeão de fisiculturismo na categoria Men’s Physique e mentor do Paiani Team.",
        url: `${endereçoPágina}/bio`,
        image: "https://douglaspaiani.com.br/consultoria/douglas-jornada.jpg",
        sameAs: ["https://instagram.com/douglaspaiani"],
      },
      {
        "@type": "ImageObject",
        "@id": `${endereçoPágina}#imagem`,
        url: "https://douglaspaiani.com.br/consultoria/paiani-team.png",
        width: 1536,
        height: 1024,
        caption: "Paiani Team — Consultoria esportiva com Douglas Paiani",
      },
    ],
  };
  return (
    <MotionConfig reducedMotion="user">
      <div className="página-consultoria">
        <MetadadosConsultoria
          título={títuloPágina}
          descrição={descriçãoPágina}
          endereço={endereçoPágina}
          dadosEstruturados={dadosEstruturados}
        />
        <a href="#conteudo-consultoria" className="consultoria-pular">
          Pular para o conteúdo
        </a>
        <motion.div
          className="consultoria-progresso"
          style={{ scaleX: progressoRolagem }}
          aria-hidden="true"
        />
        <CabeçalhoConsultoria />
        <main id="conteudo-consultoria">
          <section className="consultoria-hero" id="inicio-consultoria">
            <div className="consultoria-hero-imagem">
              <img
                src="/consultoria/douglas-campeonato.webp"
                alt="Douglas Paiani no palco em uma competição de Men’s Physique"
                width="960"
                height="1280"
                fetchPriority="high"
              />
              <div className="consultoria-hero-imagem-sombra" />
            </div>
            <div className="consultoria-hero-linhas" aria-hidden="true" />
            <div className="consultoria-contêiner consultoria-hero-conteúdo">
              <p className="consultoria-hero-etiqueta">
                <span /> CONSULTORIA ONLINE · PAIANI TEAM
              </p>
              <h1>
                O SEU PRÓXIMO
                <br />
                <span>NÍVEL</span> COMEÇA
                <br />
                AQUI<span className="consultoria-ponto">.</span>
              </h1>
              <p className="consultoria-hero-descrição">
                Seu objetivo merece mais que vontade.
                <br />
                Merece <strong>direção, método e acompanhamento.</strong>
              </p>
              <div className="consultoria-hero-ações">
                <a href="#planos" className="consultoria-botão">
                  Quero fazer parte do time <ArrowUpRight size={20} />
                </a>
                <a href="#como-funciona" className="consultoria-hero-como">
                  <span>
                    <ArrowDown size={17} />
                  </span>
                  Como funciona
                </a>
              </div>
              <div className="consultoria-hero-base">
                <Trophy size={28} />
                <div>
                  <strong>MENTORIA DE QUEM VIVE O ESPORTE.</strong>
                  <span>Douglas Paiani · Campeão Men’s Physique</span>
                </div>
              </div>
            </div>
            <div className="consultoria-hero-assinatura">
              <span>DISCIPLINA / CONSTÂNCIA / EVOLUÇÃO</span>
              <strong>
                DOUGLAS
                <br />
                PAIANI<span>ATLETA & MENTOR</span>
              </strong>
            </div>
            <a
              href="#metodo"
              className="consultoria-rolar"
              aria-label="Conhecer o método"
            >
              <ArrowDown size={17} />
              <span>EXPLORE A JORNADA</span>
            </a>
          </section>
          <div
            className="consultoria-faixa"
            aria-label="Treine com propósito. Evolua com método. Faça parte do time."
          >
            <div aria-hidden="true">
              {Array.from({ length: 4 }, (_, índice) => (
                <span key={índice}>
                  TREINE COM PROPÓSITO <Plus /> EVOLUA COM MÉTODO <Plus />{" "}
                  PAIANI TEAM <Plus />
                </span>
              ))}
            </div>
          </div>
          <section id="metodo" className="consultoria-seção consultoria-método">
            <div className="consultoria-contêiner">
              <Revelar classe="consultoria-título-dividido">
                <div>
                  <Etiqueta número="01">
                    MENOS IMPROVISO. MAIS PROPÓSITO.
                  </Etiqueta>
                  <h2>
                    Não é só sobre o físico.
                    <br />É sobre <span>quem você se torna.</span>
                  </h2>
                </div>
                <p>
                  O resultado começa quando intenção vira rotina. No Paiani
                  Team, você tem direção para construir essa mudança, um treino
                  de cada vez.
                </p>
              </Revelar>
              <div className="consultoria-benefícios">
                {benefícios.map((benefício) => (
                  <Revelar
                    key={benefício.número}
                    classe="consultoria-benefício"
                  >
                    <div>
                      <benefício.ícone size={27} />
                      <span>{benefício.número}</span>
                    </div>
                    <h3>{benefício.título}</h3>
                    <p>{benefício.descrição}</p>
                  </Revelar>
                ))}
              </div>
            </div>
          </section>
          <AcompanhamentoPróximo />
          <ComoFunciona />
          <AplicativoProclub />
          <section
            id="seu-mentor"
            className="consultoria-seção consultoria-mentor"
          >
            <div className="consultoria-contêiner consultoria-mentor-grade">
              <Revelar classe="consultoria-mentor-fotos">
                <div className="consultoria-retrato-campeão">
                  <img
                    src="/consultoria/douglas-jornada.jpg"
                    alt="Douglas Paiani com seu troféu de campeão Men’s Physique"
                    width="1069"
                    height="1385"
                    loading="lazy"
                  />
                </div>
                <div className="consultoria-mentor-medalha">
                  <Trophy size={26} />
                  <span>
                    CAMPEÃO<strong>MEN’S PHYSIQUE</strong>
                  </span>
                </div>
                <span className="consultoria-mentor-foto-texto">
                  A DISCIPLINA CONSTRÓI.
                </span>
              </Revelar>
              <Revelar classe="consultoria-mentor-texto">
                <Etiqueta número="04">CONHEÇA QUEM ESTÁ DO SEU LADO</Etiqueta>
                <h2>
                  Do palco.
                  <br />
                  Para <span>a sua jornada.</span>
                </h2>
                <p className="consultoria-mentor-nome">DOUGLAS PAIANI</p>
                <p className="consultoria-texto">
                  Sou personal trainer, gaúcho, tenho 30 anos e sou atleta
                  campeão de fisiculturismo na categoria{" "}
                  <strong>Men’s Physique</strong>. Vivo na prática a disciplina,
                  a preparação e o compromisso que o esporte exige.
                </p>
                <p className="consultoria-texto">
                  Formado em <strong>Sistemas de Informação</strong>, estudante
                  de <strong>Educação Física</strong> e em formação no curso de
                  treinadores da <strong>CBMF</strong>, conecto tecnologia,
                  estudo e a experiência dos palcos em uma mentoria próxima.
                </p>
                <div className="consultoria-credenciais">
                  <span>
                    <Trophy />
                    Campeão Men’s Physique
                  </span>
                  <span>
                    <Dumbbell />
                    Estudante de Educação Física
                  </span>
                  <span>
                    <ShieldCheck />
                    Formação de treinadores · CBMF
                  </span>
                </div>
                <a
                  href="https://www.instagram.com/douglaspaiani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="consultoria-link"
                >
                  <Instagram size={17} /> @douglaspaiani{" "}
                  <ArrowUpRight size={16} />
                </a>
              </Revelar>
            </div>
          </section>
          <section
            className="consultoria-seção consultoria-bastidores"
            id="bastidores"
          >
            <div className="consultoria-contêiner consultoria-bastidores-grade">
              <Revelar>
                <Etiqueta número="05">PERTENCER É ESTAR MAIS PERTO</Etiqueta>
                <div className="consultoria-melhores-amigos">
                  <Instagram size={17} />
                  <span>MELHORES AMIGOS · EM TODOS OS PLANOS</span>
                </div>
                <h2>
                  Além do treino.
                  <br />
                  <span>Dentro dos bastidores.</span>
                </h2>
                <p className="consultoria-texto">
                  Quem é do time acompanha de perto. Em qualquer plano, você
                  entra nos meus melhores amigos no Instagram para viver os
                  bastidores das minhas preparações para os campeonatos.
                </p>
                <div className="consultoria-bastidores-tópicos">
                  <span>01 / Rotina e dieta</span>
                  <span>02 / Estratégias de preparação</span>
                  <span>03 / Dia a dia dos campeonatos</span>
                  <span>04 / Ergogênicos: relatos e dosagens</span>
                </div>
                <p className="consultoria-nota">
                  Um olhar para minha experiência como atleta. O conteúdo dos
                  bastidores não inclui prescrição de ergogênicos para alunos.
                </p>
                <a href="#planos" className="consultoria-link">
                  Quero estar mais perto <ArrowUpRight size={17} />
                </a>
              </Revelar>
              <Revelar classe="consultoria-bastidores-foto">
                <img
                  src="/consultoria/douglas-palco.webp"
                  alt="Douglas Paiani apresentando seu físico no palco do campeonato"
                  width="589"
                  height="1280"
                  loading="lazy"
                />
                <span className="consultoria-bastidores-selo">
                  <span /> VOCÊ VÊ O PALCO.
                  <br />
                  <strong>O TIME VIVE O PROCESSO.</strong>
                </span>
                <span
                  className="consultoria-bastidores-contorno"
                  aria-hidden="true"
                >
                  INSIDE
                </span>
              </Revelar>
            </div>
          </section>
          <PlanosConsultoria />
          <section className="consultoria-seção consultoria-bônus" id="bonus">
            <div className="consultoria-contêiner consultoria-bônus-grade">
              <Revelar classe="consultoria-presente-visual">
                <div className="consultoria-presente-fundo" aria-hidden="true">
                  TEAM
                </div>
                <img
                  src="/consultoria/camiseta-paiani-team.webp"
                  alt="Imagem ilustrativa de camiseta preta Paiani Team com logotipo vermelho e prata"
                  width="1024"
                  height="1024"
                  loading="lazy"
                />
                <div className="consultoria-presente-selo">
                  <Gift size={22} />
                  <span>
                    PLANO ANUAL<strong>O MANTO É SEU.</strong>
                  </span>
                </div>
                <p className="consultoria-ilustração">
                  Imagem ilustrativa da camiseta personalizada.
                </p>
              </Revelar>
              <Revelar>
                <Etiqueta número="07">O COMPROMISSO TEM RECOMPENSA</Etiqueta>
                <h2>
                  Não é só vestir.
                  <br />É <span>fazer parte.</span>
                </h2>
                <p className="consultoria-texto">
                  No plano <strong>Elite de 1 ano</strong>, você ganha uma
                  camiseta personalizada do Paiani Team. Para levar o
                  compromisso com o time também para os seus treinos.
                </p>
                <BotãoContato
                  plano={`Elite — 1 ano por R$ ${formatarPreço(planos[3].preço)}`}
                >
                  Quero meu ano no time
                </BotãoContato>
                <div className="consultoria-bônus-presencial">
                  <Dumbbell size={25} />
                  <div>
                    <span>PREFERE COMEÇAR COM 6 MESES?</span>
                    <h3>Um treino. Lado a lado.</h3>
                    <p>
                      No plano Performance, você ganha uma sessão de treino
                      presencial, se estiver dentro da região atendida. Consulte
                      sua cidade e agende pelo WhatsApp.
                    </p>
                    <a
                      href={criarConversa(
                        "Performance — quero consultar minha cidade para o treino presencial",
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Consultar minha região <ArrowUpRight size={15} />
                    </a>
                  </div>
                </div>
              </Revelar>
            </div>
          </section>
          <section
            className="consultoria-seção consultoria-perguntas"
            id="duvidas"
          >
            <div className="consultoria-contêiner consultoria-perguntas-grade">
              <Revelar>
                <Etiqueta número="08">SEM DÚVIDAS NO CAMINHO</Etiqueta>
                <h2>
                  Antes do
                  <br />
                  <span>primeiro treino.</span>
                </h2>
                <p className="consultoria-texto">
                  Seu próximo passo começa com clareza.
                </p>
                <BotãoContato classe="consultoria-botão-contorno">
                  Falar com Douglas
                </BotãoContato>
              </Revelar>
              <div>
                {perguntas.map((item) => (
                  <details key={item.pergunta}>
                    <summary>
                      {item.pergunta}
                      <ChevronDown size={18} aria-hidden="true" />
                    </summary>
                    <p>{item.resposta}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
          <section className="consultoria-chamada-final">
            <div className="consultoria-contêiner">
              <p className="consultoria-etiqueta">
                O SEU PRÓXIMO CAPÍTULO COMEÇA COM UMA DECISÃO.
              </p>
              <h2>
                VONTADE VOCÊ TEM.
                <br />
                <span>AGORA, TENHA DIREÇÃO.</span>
              </h2>
              <BotãoContato>
                Vamos construir sua evolução <ArrowRight size={18} />
              </BotãoContato>
              <p>PAIANI TEAM. O COMPROMISSO É SEU. A JORNADA É NOSSA.</p>
            </div>
          </section>
        </main>
        <footer className="consultoria-rodapé consultoria-contêiner">
          <a
            href="#inicio-consultoria"
            aria-label="Paiani Team — voltar ao início"
          >
            <img
              src="/consultoria/paiani-team.webp"
              alt="Paiani Team"
              width="600"
              height="400"
              loading="lazy"
            />
          </a>
          <p>
            Douglas Paiani · Consultoria esportiva
            <br />
            <span>Disciplina. Constância. Evolução.</span>
            <br />
            <span>
              Site desenvolvido por{" "}
              <a
                href="https://tetraval.com.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tetraval
              </a>
            </span>
          </p>
          <div>
            <Link to="/privacidade">Privacidade</Link>
            <Link to="/termos">Termos</Link>
            <a
              href="https://instagram.com/douglaspaiani"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Douglas Paiani"
              className="consultoria-link-instagram"
            >
              <Instagram size={19} aria-hidden="true" />
              Instagram
            </a>
          </div>
        </footer>
        <a
          className="consultoria-whatsapp"
          href={criarConversa()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Conversar com Douglas Paiani no WhatsApp (abre em nova aba)"
        >
          <span>Vamos conversar?</span>
          <IconeWhatsappOficial tamanho={26} />
        </a>
      </div>
    </MotionConfig>
  );
}
