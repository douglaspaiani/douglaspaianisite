import { motion, AnimatePresence } from "motion/react";
import { Helmet } from "react-helmet-async";
import Hero from "@/src/components/Hero";
import AIServiceCard from "@/src/components/AIServiceCard";
import ProcessCard from "@/src/components/ProcessCard";
import MatrixRain from "@/src/components/MatrixRain";
import ContatoProjeto from "@/src/components/ContatoProjeto";
import SaaSPortfolio from "@/src/components/SaaSPortfolio";
import imagemDouglasInteligenciaArtificial from "@/src/images/douglas-inteligencia-artificial.webp";
import { Brain, Cpu, Globe, Smartphone, ShieldCheck, Zap, ArrowRight, ArrowLeft, ShoppingCart, Layers, Terminal, Database, Cloud, Code2, Search, MessageSquare, Star, Server, Rocket, Bot, Eye, Network, Activity } from "lucide-react";
import { Link } from "react-router";
import React, { useState } from "react";
import { cn } from "@/src/lib/utils";

const services = [
  {
    title: "Criação de sites",
    desc: "Desenvolvimento de sites institucionais e landing pages de alta conversão com design exclusivo e performance otimizada.",
    icon: Globe,
    color: "text-cyan-400",
    path: "/servicos/sites",
    features: ["SEO Avançado", "Design Responsivo", "Performance Ultra-rápida"]
  },
  {
    title: "e-Commerce",
    desc: "Lojas virtuais completas e escaláveis, focadas em experiência do usuário e otimização de vendas online.",
    icon: ShoppingCart,
    color: "text-blue-400",
    path: "/servicos/lojas-virtuais",
    features: ["Checkout Otimizado", "Gestão de Inventário", "Integração de Pagamentos"]
  },
  {
    title: "MVP e SaaS",
    desc: "Arquitetura de sistemas robustos e plataformas SaaS escaláveis, utilizando as tecnologias mais modernas do mercado.",
    icon: Layers,
    color: "text-purple-400",
    path: "/servicos/plataformas",
    features: ["Multi-tenancy", "Escalabilidade Cloud", "Segurança de Dados"]
  },
  {
    title: "Apps iOS e Android",
    desc: "Criação de aplicativos móveis nativos e híbridos com alta performance e integração total com recursos do dispositivo.",
    icon: Smartphone,
    color: "text-emerald-400",
    path: "/servicos/aplicativos",
    features: ["Interface Intuitiva", "Notificações Push", "Modo Offline"]
  }
];


const competencias = [
  { nome: 'IA', intensidade: 0.9 },
  { nome: 'Design', intensidade: 0.7 },
  { nome: 'Cloud', intensidade: 0.85 },
  { nome: 'Apps', intensidade: 0.8 },
  { nome: 'Web', intensidade: 0.95 },
  { nome: 'Dados', intensidade: 0.75 },
];

function pontosRadar(escala: number) {
  return competencias.map((competencia, indice) => {
    const angulo = (indice / competencias.length) * Math.PI * 2 - Math.PI / 2;
    const raio = 92 * escala * competencia.intensidade;
    return `${150 + Math.cos(angulo) * raio},${150 + Math.sin(angulo) * raio}`;
  }).join(' ');
}

function GraficoCompetencias() {
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full" role="img" aria-label="Áreas de especialidade: inteligência artificial, design, cloud, aplicativos, web e dados">
      {[0.25, 0.5, 0.75, 1].map((escala) => (
        <circle key={escala} cx="150" cy="150" r={92 * escala} fill="none" stroke="rgba(255,255,255,.12)" />
      ))}
      {competencias.map((competencia, indice) => {
        const angulo = (indice / competencias.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <g key={competencia.nome}>
            <line x1="150" y1="150" x2={150 + Math.cos(angulo) * 92} y2={150 + Math.sin(angulo) * 92} stroke="rgba(255,255,255,.12)" />
            <text x={150 + Math.cos(angulo) * 120} y={154 + Math.sin(angulo) * 120} fill="rgba(255,255,255,.6)" textAnchor="middle" fontSize="11">{competencia.nome}</text>
          </g>
        );
      })}
      <polygon points={pontosRadar(1)} fill="rgba(6,182,212,.28)" stroke="#06b6d4" strokeWidth="2" />
    </svg>
  );
}

const NeuralNetwork = () => {
  const layers = [4, 6, 6, 4];
  const width = 400;
  const height = 240;
  const nodeRadius = 4;
  
  const nodes = layers.flatMap((count, layerIndex) => {
    const x = (width / (layers.length - 1)) * layerIndex;
    return Array.from({ length: count }).map((_, nodeIndex) => {
      const y = (height / (count - 1 || 1)) * nodeIndex + (count === 1 ? height / 2 : 0);
      return { x, y, layer: layerIndex };
    });
  });

  const connections = nodes.flatMap((node, i) => {
    return nodes
      .filter(target => target.layer === node.layer + 1)
      .map(target => ({ source: node, target }));
  });

  return (
    <svg viewBox={`-20 -20 ${width + 40} ${height + 40}`} className="w-full h-full">
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {connections.map((conn, i) => (
        <motion.line
          key={`line-${i}`}
          x1={conn.source.x}
          y1={conn.source.y}
          x2={conn.target.x}
          y2={conn.target.y}
          stroke="url(#lineGradient)"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: i * 0.005 }}
        />
      ))}
      {nodes.map((node, i) => (
        <motion.circle
          key={`node-${i}`}
          cx={node.x}
          cy={node.y}
          r={nodeRadius}
          fill={node.layer === 0 || node.layer === layers.length - 1 ? "#06b6d4" : "#ffffff20"}
          stroke={node.layer === 0 || node.layer === layers.length - 1 ? "#06b6d440" : "none"}
          strokeWidth="4"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: "spring", damping: 12, stiffness: 200, delay: node.layer * 0.2 }}
        >
          <animate
            attributeName="r"
            values={`${nodeRadius};${nodeRadius + 1};${nodeRadius}`}
            dur={`${2 + (i % 3) * 0.5}s`}
            repeatCount="indefinite"
          />
        </motion.circle>
      ))}
    </svg>
  );
};

const TechCard: React.FC<{ tech: any, i: number }> = ({ tech, i }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.05 }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative p-6 rounded-2xl bg-[#0a0a0a] border border-white/10 flex flex-col items-center justify-center gap-4 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden cursor-default"
    >
      {/* Matrix Rain Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
            <MatrixRain colorClass="text-cyan-400" opacity="opacity-[0.1]" columns={6} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scanning Line */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: "110%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-[1px] bg-cyan-500/50 z-20 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          />
        )}
      </AnimatePresence>

      {/* Subtle Glow on Hover */}
      <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col items-center gap-4">
        <tech.icon className="text-white/20 group-hover:text-cyan-400 transition-all duration-300 group-hover:scale-110" size={32} />
        <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">{tech.name}</span>
      </div>
      
      {/* Corner Accent */}
      <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
        <div className="w-1 h-1 rounded-full bg-cyan-500 animate-ping" />
      </div>
    </motion.div>
  );
};

export default function Inicio() {
  return (
    <main className="bg-black min-h-screen">
      <Helmet>
        <title>Douglas Paiani | Engenheiro de Software & Especialista em IA</title>
        <meta name="description" content="Douglas Paiani - Engenheiro de Software com 15 anos de experiência, especialista em IA, criação de SaaS, e-commerce e aplicativos de alta performance." />
        <meta name="keywords" content="Douglas Paiani, Engenheiro de Software, Especialista em IA, Inteligência Artificial, SaaS, e-commerce, Desenvolvimento Web, Aplicativos, React, Node.js, Python" />
        <meta property="og:title" content="Douglas Paiani | Engenheiro de Software & Especialista em IA" />
        <meta property="og:description" content="Engenheiro de Software com 15 anos de experiência, especialista em IA e criador de produtos digitais escaláveis." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://douglaspaiani.com.br" />
        <meta property="og:image" content="https://douglaspaiani.com.br/douglas_ia.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Douglas Paiani | Engenheiro de Software & Especialista em IA" />
        <meta name="twitter:description" content="Engenheiro de Software com 15 anos de experiência, especialista em IA e criador de produtos digitais escaláveis." />
        <meta name="twitter:image" content="https://douglaspaiani.com.br/douglas_ia.jpg" />
        <link rel="canonical" href="https://douglaspaiani.com.br" />
      </Helmet>
      <Hero />
      
      {/* Tech Stack Marquee */}
      <section className="py-12 border-y border-white/5 bg-white/2 overflow-hidden">
        <div className="flex whitespace-nowrap gap-12 animate-marquee">
          {[
            "React", "Next.js", "TypeScript", "Node.js", "Python", "PyTorch", "TensorFlow", "AWS", "Google Cloud", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "Flutter", "Swift", "Kotlin"
          ].map((tech, i) => (
            <span key={i} className="text-white/20 text-2xl font-black uppercase tracking-tighter hover:text-cyan-500 transition-colors cursor-default">
              {tech}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            "React", "Next.js", "TypeScript", "Node.js", "Python", "PyTorch", "TensorFlow", "AWS", "Google Cloud", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "Redis", "GraphQL", "Flutter", "Swift", "Kotlin"
          ].map((tech, i) => (
            <span key={i + 'dup'} className="text-white/20 text-2xl font-black uppercase tracking-tighter hover:text-cyan-500 transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </section>

      <SaaSPortfolio />

      {/* Services Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-black text-white mb-4 tracking-tighter"
          >
            SOLUÇÕES DE <span className="text-cyan-400">IA AVANÇADA</span>
          </motion.h2>
          <p className="text-white/40 max-w-2xl mx-auto font-light text-lg">Arquiteturas inteligentes que transcendem o código tradicional. Do processamento neural à escala massiva.</p>
        </div>

        <div className="mb-16 grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="p-7 md:p-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-[11px] font-bold uppercase tracking-[0.2em] mb-5">
              <Code2 size={14} />
              Desenvolvimento Especializado
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">
              Crie seu projeto com base sólida de engenharia
            </h3>
            <p className="text-white/65 leading-relaxed">
              Arquitetura bem definida, performance real e código escalável para transformar ideias em produtos digitais confiáveis.
            </p>
            <ul className="mt-6 space-y-3 text-white/80">
              {[
                "Planejamento técnico desde o início",
                "Código limpo com foco em manutenção",
                "Entrega com qualidade e visão de produto"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.95)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto"
          >
            <img
              src="/douglas-ia.webp"
              alt="Especialista em desenvolvimento e inteligência artificial"
              className="relative z-10 h-auto w-full max-w-[300px] object-cover [clip-path:inset(0_2px_0_0)] md:max-w-[360px] lg:max-w-[400px]"
              loading="lazy"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="p-7 md:p-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-[11px] font-bold uppercase tracking-[0.2em] mb-5">
              <Brain size={14} />
              TOP 50 programdor do Brasil
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-4">
              Seu projeto na mão certa
            </h3>
            <p className="text-white/65 leading-relaxed">
              Sou um dos <b>Top 50</b> programadores do Brasil e <b>Top 10</b> do RS. Criador de diversas startups de alto níveis e projetos sociais incríveis.
            </p>
            <ul className="mt-6 space-y-3 text-white/80">
              {[
                "15 anos de experiência",
                "+50 projetos internacionais",
                "CEO da Tetraval"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_14px_rgba(96,165,250,0.95)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <Link key={i} to={service.path} className="block h-full">
              <AIServiceCard 
                index={i}
                icon={service.icon}
                title={service.title}
                desc={service.desc}
                colorClass={service.color}
                features={service.features}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* IA Focus Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-cyan-950/20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Brain size={14} />
              AI First Approach
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight">
              INTELIGÊNCIA <br />
              <span className="text-cyan-400 text-glow">ARTIFICIAL</span> <br />
              DE ALTO NÍVEL.
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed font-light">
              Não apenas integro APIs. Eu construo arquiteturas de IA que transformam negócios. 
              De agentes autônomos a modelos de linguagem customizados, trago o estado da arte 
              da tecnologia para o seu projeto.
            </p>
            <ul className="space-y-4 mb-12">
              {[
                "LLMs Customizados para Empresas",
                "Agentes de IA Autônomos",
                "Processamento de Linguagem Natural",
                "Visão Computacional Avançada"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <div className="relative overflow-hidden rounded-[40px]">
            <img
              src={imagemDouglasInteligenciaArtificial}
              alt="Douglas Paiani aplicando inteligência artificial em soluções de software"
              className="h-full w-full object-cover [clip-path:inset(0_2px_0_0)]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
          >
            Workflow de Engenharia
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">PROCESSO DE <span className="text-cyan-400">ELITE.</span></h2>
          <p className="text-white/40 max-w-xl mx-auto font-light">Como transformamos sua visão em um produto digital de classe mundial através de engenharia rigorosa.</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { step: "01", title: "Discovery", desc: "Imersão total no seu negócio para entender desafios e oportunidades.", icon: Search },
            { step: "02", title: "Architecture", desc: "Desenho de sistemas escaláveis e seleção da stack tecnológica ideal.", icon: Cpu },
            { step: "03", title: "Development", desc: "Codificação de alto nível com sprints ágeis e feedback constante.", icon: Code2 },
            { step: "04", title: "Scale", desc: "Deploy em nuvem, monitoramento e otimização contínua para crescimento.", icon: Rocket },
          ].map((item, i) => {
            const [isHovered, setIsHovered] = useState(false);
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative p-8 rounded-[32px] bg-[#0a0a0a] border border-white/10 group overflow-hidden transition-all duration-500 hover:border-cyan-500/30"
              >
                {/* Matrix Rain Effect */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-0"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
                      <MatrixRain colorClass="text-cyan-400" opacity="opacity-[0.1]" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/10 group-hover:border-cyan-500/20 transition-all duration-500">
                      <item.icon className="text-white/40 group-hover:text-cyan-400 transition-colors" size={24} />
                    </div>
                    <span className="text-4xl font-black text-white/5 group-hover:text-cyan-500/10 transition-colors duration-500 leading-none">{item.step}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">{item.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed font-light group-hover:text-white/60 transition-colors duration-300">{item.desc}</p>
                  
                  {/* Progress Indicator */}
                  <div className="mt-8 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 group-hover:opacity-100 transition-opacity"
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 bg-white/2 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">O que dizem os Clientes</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Carlos Mendes", role: "CEO @ TechFlow", text: "O Douglas não é apenas um programador, ele é um arquiteto de negócios. A IA que ele implementou triplicou nossa eficiência operacional." },
              { name: "Ana Paula", role: "Founder @ EcoStore", text: "Minha loja virtual nunca foi tão rápida. O SEO que ele fez nos colocou na primeira página em menos de 3 meses." },
              { name: "Ricardo Silva", role: "CTO @ FintechX", text: "A plataforma SaaS que ele construiu para nós escala sem problemas com 50k usuários ativos. Código de altíssima qualidade." },
            ].map((item, i) => {
              const [isHovered, setIsHovered] = useState(false);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="group p-8 rounded-[32px] bg-[#0a0a0a] border border-white/10 relative overflow-hidden transition-all duration-500 hover:border-cyan-500/30"
                >
                  {/* Matrix Rain Effect */}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-0"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black z-10" />
                        <MatrixRain colorClass="text-cyan-400" opacity="opacity-[0.05]" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="relative z-10">
                    <div className="flex gap-1 text-cyan-400 mb-6">
                      {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-white/60 italic mb-8 leading-relaxed font-light group-hover:text-white transition-colors duration-300">"{item.text}"</p>
                    <div>
                      <p className="text-white font-bold group-hover:text-cyan-400 transition-colors">{item.name}</p>
                      <p className="text-white/30 text-[10px] uppercase tracking-[0.2em]">{item.role}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Arquitetura Neural", 
              desc: "Sistemas desenhados com o estado da arte em redes neurais e processamento distribuído.",
              icon: Network,
              features: ["Deep Learning", "Microserviços", "Escala"]
            },
            { 
              title: "Elite Tech Brasil", 
              desc: "Reconhecido entre os Top 50 desenvolvedores do país, com foco em inovação disruptiva.",
              icon: Star,
              features: ["Top 50", "Inovação", "Liderança"]
            },
            { 
              title: "ROI AI-Driven", 
              desc: "A inteligência artificial aplicada para maximizar lucros, automatizar vendas e escalar operações.",
              icon: Zap,
              features: ["Automação", "Conversão", "Eficiência"]
            },
          ].map((item, i) => (
            <AIServiceCard 
              key={i}
              index={i}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              colorClass="text-cyan-400"
              features={item.features}
            />
          ))}
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="py-24 px-6 bg-gradient-to-t from-cyan-950/20 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Stack Tecnológica</h2>
            <p className="text-white/40">As ferramentas que usamos para construir o futuro.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "React", icon: Code2 },
              { name: "Next.js", icon: Globe },
              { name: "TypeScript", icon: Terminal },
              { name: "Node.js", icon: Server },
              { name: "Python", icon: Brain },
              { name: "AWS", icon: Cloud },
              { name: "Docker", icon: Layers },
              { name: "PostgreSQL", icon: Database },
              { name: "Redis", icon: Zap },
              { name: "GraphQL", icon: Search },
              { name: "TensorFlow", icon: Cpu },
              { name: "PyTorch", icon: Brain },
            ].map((tech, i) => (
              <TechCard key={i} tech={tech} i={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats/Trust Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full -z-10" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">
                TRANSFORMANDO IDEIAS EM <br />
                <span className="text-cyan-400 text-glow">IMPÉRIOS DIGITAIS</span>
              </h2>
              <p className="text-white/50 text-lg mb-10 leading-relaxed font-light max-w-xl">
                Com mais de 15 anos de experiência, Douglas Paiani combina visão estratégica 
                com execução técnica impecável. Especialista em sistemas que não apenas 
                funcionam, mas definem novos padrões de mercado através da IA.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8 mb-12">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <ShieldCheck className="text-cyan-400" size={24} />
                  </div>
                  <h4 className="text-white font-bold mb-2">Segurança de Elite</h4>
                  <p className="text-white/40 text-sm">Criptografia de ponta e protocolos de segurança militar em cada linha de código.</p>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-colors group">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Zap className="text-blue-400" size={24} />
                  </div>
                  <h4 className="text-white font-bold mb-2">Performance Extrema</h4>
                  <p className="text-white/40 text-sm">Sistemas otimizados para latência mínima e escalabilidade infinita sob demanda.</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-white/10 flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex gap-1 text-yellow-500 mb-1">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                  </div>
                  <p className="text-white/40 text-xs font-medium uppercase tracking-widest">+500 Projetos Entregues</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-3xl rounded-[40px] -z-10" />
              
              <div className="bg-[#0a0a0a] border border-white/10 rounded-[40px] p-8 md:p-12 overflow-hidden relative group/card">
                {/* Scanning Line */}
                <motion.div 
                  animate={{ y: [0, 600, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-20 opacity-0 group-hover/card:opacity-100 transition-opacity"
                />
                
                {/* Neural Network Background */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <NeuralNetwork />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-12">
                    <div>
                      <h3 className="text-2xl font-bold text-white">AI Capability Profile</h3>
                      <p className="text-white/40 text-sm">Áreas de especialidade em tecnologia</p>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                      <Activity className="text-cyan-400 animate-pulse" size={20} />
                    </div>
                  </div>

                  <div className="h-[300px] w-full mb-12">
                    <GraficoCompetencias />
                  </div>

                  <div className="space-y-6">
                    {[
                      { label: "SaaS Ativos", value: 85, color: "bg-cyan-500" },
                      { label: "Satisfação", value: 99, color: "bg-blue-500" },
                      { label: "Uptime", value: 99.9, color: "bg-purple-500" },
                    ].map((stat, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                          <span className="text-white/40">{stat.label}</span>
                          <span className="text-white">{stat.value}%</span>
                        </div>
                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${stat.value}%` }}
                            transition={{ duration: 1.5, delay: 0.5 + i * 0.1 }}
                            className={cn("h-full", stat.color)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">System Status: Optimal</span>
                    </div>
                    <span className="text-[10px] font-mono text-cyan-500/50">0x7F4A...9E21</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ContatoProjeto />
    </main>
  );
}
