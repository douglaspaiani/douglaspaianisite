import { ArrowUpRight, CheckCircle2, Mail, Sparkles } from 'lucide-react';
import { IconeWhatsappOficial } from './WhatsappFlutuante';

const mensagemWhatsapp = encodeURIComponent('Olá, Douglas! Quero conversar sobre um projeto digital.');

export default function ContatoProjeto() {
  return (
    <section id="orcamento" className="w-full max-w-6xl mx-auto scroll-mt-32 px-6 md:px-0" aria-labelledby="titulo-contato">
      <div className="relative overflow-hidden rounded-[32px] border border-cyan-500/25 bg-[radial-gradient(circle_at_85%_15%,rgba(6,182,212,.20),transparent_40%),#080d14] p-8 md:p-14 lg:p-16">
        <div className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full border border-cyan-400/10" />
        <div className="relative z-10 grid items-end gap-10 lg:grid-cols-[1.35fr_1fr]">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[.2em] text-cyan-300">
              <Sparkles size={14} /> Seu próximo projeto começa aqui
            </span>
            <h2 id="titulo-contato" className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Vamos construir algo <span className="text-cyan-400">extraordinário?</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/65 md:text-lg">
              Conte sua ideia diretamente ao Douglas. Conversamos sobre objetivos, prazo e a melhor solução para seu negócio.
            </p>
            <div className="mt-7 flex flex-wrap gap-3 text-sm text-white/65">
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-400" /> Atendimento direto</span>
              <span className="inline-flex items-center gap-2"><CheckCircle2 size={16} className="text-cyan-400" /> Conversa sem compromisso</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <a href={`https://wa.me/5551994727036?text=${mensagemWhatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-16 items-center justify-between gap-4 rounded-2xl bg-cyan-400 px-6 font-black text-black transition hover:bg-cyan-300">
              <span className="inline-flex items-center gap-3"><IconeWhatsappOficial tamanho={22} /> Conversar no WhatsApp</span><ArrowUpRight size={21} />
            </a>
            <a href="mailto:contato@douglaspaiani.com.br?subject=Projeto%20digital" className="inline-flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 px-6 font-bold text-white transition hover:border-cyan-400/50 hover:bg-white/10">
              <span className="inline-flex items-center gap-3"><Mail size={21} /> Enviar um e-mail</span><ArrowUpRight size={21} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
