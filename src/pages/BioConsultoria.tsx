import MetadadosConsultoria from "../components/MetadadosConsultoria";
import { Link } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Dumbbell,
  HeartPulse,
  Instagram,
  Smartphone,
  Trophy,
  Utensils,
} from "lucide-react";
import { IconeWhatsappOficial } from "../components/WhatsappFlutuante";
import "./bio-consultoria.css";

const endereçoPágina = "https://douglaspaiani.com.br/consultoria/bio";
const títuloPágina = "Douglas Paiani | Consultoria, WhatsApp e Painel do Aluno";
const descriçãoPágina =
  "Conheça a consultoria Paiani Team, fale com Douglas Paiani no WhatsApp e acesse o painel do aluno ProClub. Planos a partir de R$ 149,90 mensais.";
const endereçoWhatsApp = `https://wa.me/5551994727036?text=${encodeURIComponent("Olá, Douglas! Vim pela sua bio e quero conhecer a consultoria Paiani Team. Vamos conversar?")}`;

export default function BioConsultoria() {
  const dadosPerfil = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": endereçoPágina,
    url: endereçoPágina,
    name: títuloPágina,
    description: descriçãoPágina,
    inLanguage: "pt-BR",
    about: { "@id": "https://douglaspaiani.com.br/consultoria#servico" },
    relatedLink: [
      "https://douglaspaiani.com.br/consultoria",
      "https://proclub.com.br/paianiteam/entrar",
    ],
    mainEntity: {
      "@type": "Person",
      "@id": "https://douglaspaiani.com.br/consultoria#douglas-paiani",
      name: "Douglas Paiani",
      jobTitle: "Personal trainer",
      description:
        "Personal trainer e atleta campeão de fisiculturismo na categoria Men’s Physique.",
      image: "https://douglaspaiani.com.br/consultoria/douglas-jornada.jpg",
      sameAs: ["https://instagram.com/douglaspaiani"],
      url: "https://douglaspaiani.com.br/consultoria",
    },
  };

  return (
    <div className="página-bio-consultoria">
      <MetadadosConsultoria
        título={títuloPágina}
        descrição={descriçãoPágina}
        endereço={endereçoPágina}
        tipo="profile"
        dadosEstruturados={dadosPerfil}
      />

      <main className="bio-cartão">
        <header className="bio-capa">
          <img
            className="bio-capa-foto"
            src="/consultoria/douglas-campeonato.webp"
            alt="Douglas Paiani no palco em uma competição de Men’s Physique"
            width="960"
            height="1280"
            fetchPriority="high"
          />
          <div className="bio-capa-sombra" aria-hidden="true" />
          <div className="bio-capa-topo">
            <span>
              <span aria-hidden="true" /> DISCIPLINA. CONSTÂNCIA. EVOLUÇÃO.
            </span>
            <a
              href="https://instagram.com/douglaspaiani"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Douglas Paiani"
            >
              <Instagram size={18} aria-hidden="true" />
            </a>
          </div>
          <img
            className="bio-logotipo"
            src="/consultoria/paiani-team.webp"
            alt="Paiani Team"
            width="600"
            height="400"
          />
        </header>

        <div className="bio-conteúdo">
          <section className="bio-apresentação" aria-labelledby="bio-nome">
            <p className="bio-etiqueta">ATLETA · PERSONAL TRAINER · MENTOR</p>
            <h1 id="bio-nome">
              DOUGLAS <span>PAIANI.</span>
            </h1>
            <p>
              Campeão Men’s Physique. Consultoria esportiva com acompanhamento
              de perto e evolução pelo ProClub.
            </p>
            <span className="bio-campeão">
              <Trophy size={13} aria-hidden="true" /> A experiência dos palcos.
              Na sua jornada.
            </span>
          </section>

          <nav className="bio-links" aria-label="Links de Douglas Paiani">
            <a
              className="bio-link bio-link-whatsapp"
              href={endereçoWhatsApp}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="bio-link-ícone">
                <IconeWhatsappOficial tamanho={23} />
              </span>
              <span className="bio-link-texto">
                <strong>Converse comigo no WhatsApp</strong>
                <span>O seu primeiro passo começa aqui.</span>
              </span>
              <ArrowUpRight
                className="bio-link-seta"
                size={19}
                aria-hidden="true"
              />
            </a>
            <Link className="bio-link" to="/consultoria">
              <span className="bio-link-ícone">
                <Dumbbell size={23} aria-hidden="true" />
              </span>
              <span className="bio-link-texto">
                <strong>Conheça a Consultoria</strong>
                <span>O método, os planos e os benefícios.</span>
              </span>
              <ArrowUpRight
                className="bio-link-seta"
                size={19}
                aria-hidden="true"
              />
            </Link>
            <a
              className="bio-link"
              href="https://proclub.com.br/paianiteam/entrar"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="bio-link-ícone">
                <Smartphone size={23} aria-hidden="true" />
              </span>
              <span className="bio-link-texto">
                <strong>Painel do aluno</strong>
                <span>Sua rotina e seu progresso no ProClub.</span>
              </span>
              <ArrowUpRight
                className="bio-link-seta"
                size={19}
                aria-hidden="true"
              />
            </a>
          </nav>

          <section className="bio-oferta" aria-labelledby="bio-oferta-título">
            <div className="bio-oferta-topo">
              <span className="bio-etiqueta">SEU PRÓXIMO NÍVEL</span>
              <span>CONSULTORIA ONLINE</span>
            </div>
            <h2 id="bio-oferta-título">
              O seu objetivo.
              <br />
              <span>O nosso compromisso.</span>
            </h2>
            <p className="bio-preço-etiqueta">PLANOS A PARTIR DE</p>
            <p className="bio-preço">
              <span>R$</span>
              <strong>
                149<span>,90</span>
              </strong>
              <span>/mês</span>
            </p>
            <ul className="bio-inclusos" aria-label="Frentes de acompanhamento">
              <li>
                <Utensils size={14} aria-hidden="true" />
                Dieta
              </li>
              <li>
                <Dumbbell size={14} aria-hidden="true" />
                Treino
              </li>
              <li>
                <HeartPulse size={14} aria-hidden="true" />
                Protocolo hormonal
              </li>
            </ul>
            <p className="bio-oferta-descrição">
              Acompanhamento próximo para conectar sua alimentação, seus treinos
              e a sua evolução.
            </p>
            <a className="bio-oferta-ação" href="/consultoria/#planos">
              Ver planos e benefícios{" "}
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <p className="bio-oferta-nota">
              Prescrição alimentar pelo nutricionista. Protocolo hormonal
              opcional, mediante indicação clínica e prescrição médica.
            </p>
          </section>

          <div className="bio-proclub">
            <span>SUA EVOLUÇÃO CONECTADA AO</span>
            <a
              href="https://proclub.com.br"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Conheça o ProClub (abre em nova aba)"
            >
              <img
                src="/consultoria/proclub-logo.png"
                alt="ProClub"
                width="478"
                height="160"
                loading="lazy"
              />
            </a>
          </div>
          <footer className="bio-rodapé">
            <p>PAIANI TEAM · O COMPROMISSO É SEU. A JORNADA É NOSSA.</p>
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
          </footer>
        </div>
      </main>
    </div>
  );
}
