import { ArrowDown, ArrowUp, Award, Calendar, Coffee, Mail, MapPin, Menu, MessageCircle, Phone, Scissors, Star, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface LandingProps {
  onStartBooking: () => void;
}

export function Landing({ onStartBooking }: LandingProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    // SEO Optimization
    document.title = "Padrão Boss | A Única Barbearia VIP da Vila Prudente";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Padrão Boss é a melhor barbearia VIP da Vila Prudente. Cortes de cabelo, barba, selagem e um ambiente exclusivo para o homem moderno.');

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Quem Sou', href: '#quem-sou' },
    { name: 'Diferencial', href: '#diferencial' },
    { name: 'Nossos Serviços', href: '#servicos' },
    { name: 'VIP', href: '#vip' },
    { name: 'Clientes', href: '#clientes' },
    { name: 'Contato', href: '#contato' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-[#FFB800] selection:text-black">
      <style>{`
        html { scroll-behavior: smooth; }
      `}</style>

      {/* Navbar em formato Cápsula (Pill) com efeito Liquid Glass */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50">
        <nav className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.6)] px-8 py-4 flex justify-between md:justify-center items-center">
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-[11px] lg:text-xs font-bold text-zinc-300 hover:text-[#FFB800] uppercase tracking-[0.15em] transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex w-full justify-between items-center px-4">
            <span className="text-[#FFB800] font-black uppercase text-sm tracking-widest">Padrão Boss</span>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 bg-black border border-zinc-800 rounded-2xl p-4 shadow-xl">
            <ul className="flex flex-col space-y-4 text-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="block text-sm font-bold text-zinc-300 hover:text-[#FFB800] uppercase tracking-widest"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 min-h-[90vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-zinc-950/80 z-10"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover grayscale opacity-50"
          >
            <source src="https://eionstudio.com.br/wp-content/uploads/2026/03/5956111_Cable_Bridge_Cityscape_1920x1080.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full relative z-20">
          <div className="flex flex-col lg:flex-row items-center justify-center relative min-h-[600px]">
            
            {/* Esquerda: Video Ilustração (Foreground) */}
            <div className="lg:absolute lg:left-0 lg:bottom-0 z-30 w-full max-w-md lg:max-w-[32rem] pointer-events-none flex justify-center lg:justify-start -mb-10 lg:mb-0">
                <video 
                  src="https://eionstudio.com.br/wp-content/uploads/2026/03/Sequencia-01222.mov" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
            </div>

            {/* Direita: Textos com Borda Amarela */}
            <div className="border border-[#FFB800] p-8 lg:p-16 lg:ml-64 relative z-20 w-full max-w-3xl bg-zinc-950/40 backdrop-blur-sm mt-10 lg:mt-0">
              <div className="mb-6">
                <span className="text-white font-bold uppercase tracking-[0.2em] text-sm">
                  Salão Boss
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-white uppercase leading-[1.1] mb-8">
                A Única <br />
                Barbearia <br />
                VIP da Vila <br />
                Prudente
              </h1>
              <p className="text-sm lg:text-base font-bold text-white max-w-md uppercase tracking-wide leading-relaxed mb-12 flex items-start gap-4">
                Conte com os serviços de um profissional que vai garantir o melhor visual que você já teve!
                <ArrowDown className="text-[#FFB800] flex-shrink-0 animate-bounce" size={24} />
              </p>

              {/* Social Icons & Map */}
              <div className="flex items-center gap-6">
                <a href="#" aria-label="Instagram" className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#FFB800] hover:border-[#FFB800] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" aria-label="TikTok" className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#FFB800] hover:border-[#FFB800] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
                </a>
                <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#FFB800] hover:border-[#FFB800] transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#contato" aria-label="Localização" onClick={(e) => scrollToSection(e, '#contato')} className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-[#FFB800] hover:border-[#FFB800] transition-all">
                  <MapPin size={20} />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Quem Sou / Sobre a Marca (Fundo Amarelo) */}
      <section id="quem-sou" className="bg-[#FFB800] text-black py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Coluna de Texto */}
            <div>
              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6">Quem Sou Eu</h2>
              <p className="font-bold text-white mb-12 text-sm leading-relaxed max-w-lg">
                Gullherme Passos. Sou especialista em cortes masculinos, visagismo e cuidados com a barba. A marca PADRÃO BOSS nasceu da necessidade de oferecer um serviço diferenciado na Vila Prudente, muito além de um simples corte de cabelo.
                <br/><br/>
                A PADRÃO BOSS garante uma experiência VIP em um ambiente exclusivo, climatizado e focado totalmente na sua satisfação e autoestima.
              </p>

              <h2 className="text-4xl lg:text-5xl font-black uppercase tracking-tight mb-6">Sobre a Marca</h2>
              <p className="font-bold text-white text-sm leading-relaxed max-w-lg">
                O PADRÃO BOSS é muito mais que um salão, é um conceito focado no homem moderno que valoriza excelência. Profissionalismo aliado a um espaço que oferece conforto, segurança e estilo.
              </p>
            </div>

            {/* Coluna Imagem */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-sm bg-black rounded-xl p-4 shadow-2xl">
                <div className="aspect-[3/4] bg-zinc-900 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop" 
                    alt="Guilherme Passos" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-[#FFB800] font-black uppercase text-2xl text-center mb-2">Experiência VIP</h3>
                <p className="text-zinc-400 text-xs text-center font-bold uppercase tracking-wider">
                  Atendimento personalizado em um <br/> ambiente exclusivo
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Por Que Agendar (Fundo Escuro) */}
      <section id="diferencial" className="bg-zinc-950 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-[#FFB800] text-3xl lg:text-4xl font-black uppercase tracking-widest mb-16">
            Por Que Agendar?
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Star, title: 'Experiência VIP', desc: 'Atendimento de primeira classe do início ao fim.' },
              { icon: Scissors, title: 'Profissionalismo', desc: 'Técnicas avançadas e olhar clínico para o seu estilo.' },
              { icon: Award, title: 'Produtos Premium', desc: 'Utilizamos apenas as melhores linhas do mercado.' },
              { icon: Coffee, title: 'Ambiente Diferenciado', desc: 'Espaço climatizado, música boa e bebida gelada.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 hover:border-[#FFB800] transition-colors p-8 rounded-xl flex flex-col items-center text-center">
                <item.icon className="text-[#FFB800] mb-6" size={32} strokeWidth={2.5} />
                <h3 className="text-white font-black uppercase text-sm tracking-wider mb-4">{item.title}</h3>
                <p className="text-zinc-500 text-xs font-bold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos Serviços Parte 1 (Fundo Amarelo - Grid Duplicado da Imagem) */}
      <section className="bg-[#FFB800] py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-black text-4xl lg:text-5xl font-black uppercase tracking-tight mb-16">
            Nossos Serviços
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: Star, title: 'Experiência VIP', desc: 'Atendimento de primeira classe do início ao fim.' },
              { icon: Scissors, title: 'Profissionalismo', desc: 'Técnicas avançadas e olhar clínico para o seu estilo.' },
              { icon: Award, title: 'Produtos Premium', desc: 'Utilizamos apenas as melhores linhas do mercado.' },
              { icon: Coffee, title: 'Ambiente Diferenciado', desc: 'Espaço climatizado, música boa e bebida gelada.' },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#111] border border-[#FFB800]/20 p-8 rounded-xl flex flex-col items-center text-center">
                <item.icon className="text-[#FFB800] mb-4" size={28} strokeWidth={2.5} />
                <h3 className="text-white font-black uppercase text-sm tracking-wider mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-xs font-bold leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nossos Serviços Parte 2 (Fundo Escuro - Lista com Linhas) */}
      <section id="servicos" className="bg-zinc-950 py-24 border-b border-zinc-900 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Lista Estilo "Árvore/Timeline" com conexões */}
            <div className="relative w-full">
              <ul className="space-y-8">
                {[
                  'Corte de cabelo com lavagem e finalização',
                  'Corte de barba com toalha quente',
                  'Consultorias',
                  'Limpeza de pele com esfoliante',
                  'Selagem e Alisamento',
                  'Descoloração',
                  'Sobrancelha',
                  'Hidratação de Cabelo e Barba',
                  'Venda de Produtos'
                ].map((servico, idx) => (
                  <li key={idx} className="relative flex items-center w-full group">
                    <span className="text-white font-bold uppercase tracking-wider text-xs md:text-sm z-10 pr-4 bg-zinc-950">{servico}</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-[#FFB800] flex-shrink-0 z-10 relative">
                      <div className="absolute left-full top-1/2 -translate-y-1/2 w-[50vw] h-[1px] animate-line-flow"></div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Imagem Direita Escura */}
            <div className="flex justify-center lg:justify-end relative z-20">
              <div className="w-full max-w-md aspect-[3/4] border border-[#FFB800] rounded-lg relative overflow-hidden bg-zinc-900 flex items-center justify-center p-6 text-center">
                <img 
                  src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop" 
                  alt="Ambiente" 
                  className="w-full h-full object-cover absolute inset-0 opacity-50"
                  referrerPolicy="no-referrer"
                />
                <span className="text-white font-bold uppercase tracking-widest text-xl relative z-10">Padrão Boss</span>
                {/* Badge redonda simulando a do canto na imagem */}
                <div className="absolute bottom-6 right-6 w-16 h-16 bg-[#FFB800] rounded-full flex items-center justify-center shadow-lg border-4 border-black z-10">
                  <Star className="text-black" size={24} fill="currentColor" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Avaliações de Clientes (Bento Grid) */}
      <section id="clientes" className="bg-zinc-950 py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-[#FFB800] text-3xl lg:text-4xl font-black uppercase tracking-widest text-center mb-16">
            Avaliações de Clientes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 - Large */}
            <div className="bg-white p-10 rounded-3xl flex flex-col md:col-span-2 md:row-span-2 shadow-xl hover:scale-[1.02] transition-transform">
              <div className="flex text-[#FFB800] mb-6">
                {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" className="mr-1" />)}
              </div>
              <p className="text-black text-xl md:text-2xl font-bold leading-relaxed mb-8 flex-grow">
                "Que lugar incrível! Guilherme é de longe um dos melhores barbeiros desse mundo. Te dá ótimas sugestões e o corte fica impecável. Com certeza voltarei. 5 estrelas é pouco para tanta qualidade."
              </p>
              <span className="text-black font-black uppercase text-sm tracking-widest block">
                Felipe Oliveira
              </span>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-3xl flex flex-col shadow-xl hover:scale-[1.02] transition-transform">
              <div className="flex text-[#FFB800] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="mr-1" />)}
              </div>
              <p className="text-black text-sm font-bold leading-relaxed mb-6 flex-grow">
                "Um excelente profissional, manja muito de corte, me deixou do jeito que eu queria. Sem falar que a conversa rola solta. O local tem água e até cerveja, bem decorado. Recomendo."
              </p>
              <span className="text-black font-black uppercase text-xs tracking-widest block">
                Rafael de Almeida
              </span>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-3xl flex flex-col shadow-xl hover:scale-[1.02] transition-transform">
              <div className="flex text-[#FFB800] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="mr-1" />)}
              </div>
              <p className="text-black text-sm font-bold leading-relaxed mb-6 flex-grow">
                "Experiência sem igual. Personalizada demais, sem pressa, preocupado de fato com a autoestima do cliente e com o trabalho que está fazendo."
              </p>
              <span className="text-black font-black uppercase text-xs tracking-widest block">
                Artur Tonetto
              </span>
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-3xl flex flex-col shadow-xl md:col-span-3 hover:scale-[1.02] transition-transform">
              <div className="flex text-[#FFB800] mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="mr-1" />)}
              </div>
              <p className="text-black text-sm font-bold leading-relaxed mb-6 flex-grow">
                "Guilherme é PROFISSIONAL, percebe-se o total comprometimento com o serviço que ele quer ofertar. Super atencioso, atualizado e habilidoso. Preço super acessível. Indicaria de olhos fechados."
              </p>
              <span className="text-black font-black uppercase text-xs tracking-widest block">
                Mateus Feraldi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Contato (Fundo Amarelo) */}
      <section id="contato" className="bg-[#FFB800] py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h2 className="text-black text-5xl lg:text-6xl font-black uppercase tracking-tight text-center mb-16">
            Contato
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 items-stretch">
            
            {/* Esquerda: Mapa e Dados */}
            <div className="flex flex-col justify-between">
              <div className="w-full h-64 bg-zinc-200 rounded-xl mb-6 flex flex-col items-center justify-center border-4 border-black text-black overflow-hidden">
                <iframe 
                  src="https://maps.google.com/maps?q=R.%20Ituverava,%2073A%20-%201104%20-%20Vila%20Prudente,%20S%C3%A3o%20Paulo&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa Padrão Boss"
                ></iframe>
              </div>
              <div className="grid grid-cols-2 gap-4 text-black font-black uppercase tracking-wider text-sm">
                <div>
                  <span className="block text-black/60 text-xs mb-1">Telefone</span>
                  <div className="flex items-center gap-2">
                    <Phone size={16} /> 11 96631 0835
                  </div>
                </div>
                <div>
                  <span className="block text-black/60 text-xs mb-1">E-mail</span>
                  <div className="flex items-center gap-2 truncate">
                    <Mail size={16} /> contato.padraoboss
                  </div>
                </div>
              </div>
            </div>

            {/* Direita: Cartão VIP CTA */}
            <div id="vip" className="bg-gradient-to-br from-zinc-900 to-black border-2 border-black rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB800]/10 rounded-full blur-2xl"></div>
               <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FFB800]/10 rounded-full blur-2xl"></div>
               
               <h3 className="text-white text-2xl md:text-3xl font-black uppercase tracking-widest mb-4 relative z-10">
                 Pronto para a experiência <br/>
                 <span className="text-[#FFB800]">VIP?</span>
               </h3>
               <p className="text-zinc-400 font-bold text-sm mb-10 max-w-xs relative z-10">
                 Agende seu horário e descubra a melhor barbearia VIP da Vila Prudente.
               </p>
               
               <button 
                 onClick={onStartBooking}
                 className="relative z-10 bg-[#FFB800] hover:bg-white text-black font-black py-4 px-8 rounded-full flex items-center gap-3 uppercase tracking-widest text-sm transition-all transform hover:scale-105"
               >
                 <Calendar size={20} fill="currentColor" />
                 Agendar Horário
               </button>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Simples (Fundo Escuro) */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-900 text-center">
        <h4 className="text-[#FFB800] font-black uppercase tracking-[0.3em] text-lg mb-4">
          Padrão Boss
        </h4>
        <p className="text-zinc-600 font-bold uppercase text-xs tracking-widest">
          &copy; {new Date().getFullYear()} Salão Boss. Todos os direitos reservados.
        </p>
      </footer>

      {/* Botões Fixos Flutuantes (Canto Inferior Direito) */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Botão Agendar (Redondo com ícone de Calendário) */}
        <button 
          onClick={onStartBooking}
          title="Agendar Horário"
          className="bg-[#FFB800] text-black hover:bg-white transition-colors shadow-[0_4px_20px_rgba(255,184,0,0.3)] rounded-full p-3 flex items-center justify-center group border border-black"
        >
          <Calendar size={24} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Botão Voltar ao Topo */}
        <button
          onClick={scrollToTop}
          className={`bg-zinc-900 border border-zinc-700 text-[#FFB800] hover:bg-zinc-800 transition-all duration-300 shadow-lg rounded-full p-3 flex items-center justify-center ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
          aria-label="Voltar ao topo"
        >
          <ArrowUp size={24} strokeWidth={2.5} />
        </button>
      </div>

    </div>
  );
}
