
import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  LayoutDashboard, 
  Smartphone, 
  ClipboardCheck, 
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  Zap,
  HardHat,
  ShieldCheck,
  MessageCircle,
  MessageSquare
} from 'lucide-react';

// --- Loader Component ---
const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] bg-slate-900 flex flex-col items-center justify-center">
      <div className="relative">
        <div className="bg-yellow-400 p-6 rounded-3xl text-black animate-bounce shadow-2xl shadow-yellow-400/20">
          <HardHat size={64} />
        </div>
        <div className="absolute -top-2 -right-2 bg-white p-2 rounded-full animate-pulse">
          <Zap size={20} className="text-yellow-500 fill-yellow-500" />
        </div>
      </div>
      <div className="mt-12 text-center">
        <h2 className="text-white font-black text-2xl tracking-tighter uppercase italic">
          Przygotowujemy <span className="text-yellow-400">plac budowy...</span>
        </h2>
        <div className="mt-4 w-48 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-yellow-400 animate-[loading_1.5s_ease-in-out_infinite]"></div>
        </div>
      </div>
      <style>{`
        @keyframes loading {
          0% { width: 0%; transform: translateX(-100%); }
          50% { width: 50%; transform: translateX(50%); }
          100% { width: 100%; transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
};

// --- Animation Wrapper Component ---
const Reveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- Components ---

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-yellow-400 p-2 rounded-lg text-black group-hover:rotate-12 transition-transform">
              <HardHat size={22} />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900 uppercase italic">
              Porządek<span className="text-yellow-500">wBudowlance</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#problem" className="text-sm font-bold text-slate-700 hover:text-yellow-600 transition-colors uppercase tracking-wider">Problem</a>
            <a href="#rozwiazanie" className="text-sm font-bold text-slate-700 hover:text-yellow-600 transition-colors uppercase tracking-wider">Rozwiązanie</a>
            <a href="#jak-to-dziala" className="text-sm font-bold text-slate-700 hover:text-yellow-600 transition-colors uppercase tracking-wider">Proces</a>
            <a href="#cena" className="text-sm font-bold text-slate-700 hover:text-yellow-600 transition-colors uppercase tracking-wider">Cennik</a>
            <a href="#kontakt" className="bg-yellow-400 text-black px-6 py-3 rounded-full font-black text-sm hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-400/20 active:scale-95">
              NAPISZ DO MNIE
            </a>
          </div>

          <button className="md:hidden p-2 text-slate-900" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="py-6 px-4 space-y-4 shadow-xl">
          <a href="#problem" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-slate-900">Problem</a>
          <a href="#rozwiazanie" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-slate-900">Rozwiązanie</a>
          <a href="#jak-to-dziala" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-slate-900">Proces</a>
          <a href="#cena" onClick={() => setIsOpen(false)} className="block text-lg font-bold text-slate-900">Cennik</a>
          <a href="#kontakt" onClick={() => setIsOpen(false)} className="w-full block bg-yellow-400 text-black text-center py-4 rounded-xl font-black">NAPISZ DO MNIE</a>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="pt-32 pb-20 md:pt-56 md:pb-40 relative overflow-hidden bg-slate-50">
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-[800px] h-[800px] bg-yellow-400/10 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-[600px] h-[600px] bg-yellow-400/5 rounded-full blur-[100px] -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-5xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-slate-900 text-xs font-black mb-8 shadow-sm tracking-widest uppercase">
              <Zap size={14} className="text-yellow-500 fill-yellow-500" />
              Tylko dla małych firm budowlanych
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.95] mb-8">
              PORZĄDEK W <br/>
              <span className="bg-yellow-400 px-4 inline-block -rotate-1">BUDOWLANCE</span>
            </h1>
            <p className="text-xl md:text-3xl text-slate-700 font-bold leading-tight mb-6 max-w-3xl mx-auto">
              Prosty system klientów i zapytań dla firm budowlanych — bez chaosu, zeszytów i wiedzy technicznej.
            </p>
            <p className="text-lg text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
              Pomagam właścicielom małych firm budowlanych ogarnąć bazę klientów i budów w jednym miejscu, tak żeby wiedzieli, co się dzieje w firmie i nie gubili tematów.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a href="#kontakt" className="group relative bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-2xl shadow-slate-900/20 flex items-center gap-3 overflow-hidden">
                <span className="relative z-10 uppercase italic">NAPISZ DO MNIE</span>
                <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute top-0 left-0 w-1 h-full bg-yellow-400 group-hover:w-full transition-all duration-300 -z-0 opacity-20"></div>
              </a>
              <a href="#jak-to-dziala" className="text-slate-900 font-black text-lg hover:text-yellow-600 transition-colors flex items-center gap-2">
                Zobacz jak to działa
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const Problem: React.FC = () => {
  const problems = [
    "Klienci zapisani w zeszytach, telefonie, Messengerze",
    "Nie wiadomo, z kim była rozmowa i o czym",
    "Brak informacji, na jakim etapie jest dana budowa",
    "Chaos, gdy dzwoni nowy klient",
    "Reklamy nie mają sensu, bo nie ma porządku"
  ];

  return (
    <section id="problem" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl relative">
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <HardHat size={300} className="text-white" />
          </div>
          <div className="grid md:grid-cols-2 gap-0 relative z-10">
            <div className="p-8 md:p-20 flex flex-col justify-center">
              <Reveal>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-8 leading-none uppercase italic">
                  CZY TO O TOBIE? <br/>
                  <span className="text-yellow-400 tracking-tighter">„KTOŚ MI ZAGLĄDA DO FIRMY...”</span>
                </h2>
                <ul className="space-y-6">
                  {problems.map((p, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 bg-red-500/20 p-1 rounded-full">
                        <XCircle className="text-red-500" size={24} />
                      </div>
                      <span className="text-xl text-slate-300 font-medium">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12 p-8 bg-yellow-400 rounded-3xl">
                  <p className="text-black font-black text-2xl leading-tight">
                    Jeśli tak to wygląda — problemem nie są klienci, tylko brak prostego systemu.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="hidden md:block relative">
              <img 
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=800" 
                alt="Chaos on construction site" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-slate-900/40"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Solution: React.FC = () => {
  return (
    <section id="rozwiazanie" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight uppercase italic">
              PROSTY SYSTEM, KTÓRY <span className="text-yellow-500 underline decoration-yellow-400 underline-offset-8 transition-all">DZIAŁA</span>
            </h2>
            <p className="text-xl text-slate-600 font-medium italic">
              "Nie sprzedaję CRM ani reklam. Robię porządek w firmie, żebyś wiedział, co się dzieje."
            </p>
          </div>
        </Reveal>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: <Smartphone size={40} />, title: "WSZĘDZIE Z TOBĄ", desc: "Jeden system na komputerze i Twoim telefonie" },
            { icon: <LayoutDashboard size={40} />, title: "JASNE ETAPY", desc: "Wiesz dokładnie na jakim etapie jest klient i budowa" },
            { icon: <ClipboardCheck size={40} />, title: "GOTOWIEC", desc: "Wszystko wdrażam za Ciebie - Ty tylko korzystasz" },
            { icon: <Zap size={40} />, title: "ZERO TECHNIKI", desc: "Nie musisz być informatykiem. To proste jak młotek" }
          ].map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="group bg-white p-10 rounded-[2rem] border-2 border-transparent hover:border-yellow-400 hover:shadow-2xl hover:shadow-yellow-400/10 transition-all duration-300 h-full">
                <div className="text-black bg-yellow-400 w-16 h-16 flex items-center justify-center rounded-2xl mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform shadow-lg shadow-yellow-400/20">
                  {item.icon}
                </div>
                <h3 className="text-xl font-black mb-4 tracking-tighter uppercase italic">{item.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Process: React.FC = () => {
  return (
    <section id="jak-to-dziala" className="py-24 bg-yellow-400 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-7xl font-black text-black mb-4 tracking-tighter uppercase italic">3 kroki do porządku</h2>
            <p className="text-black font-bold text-xl opacity-80 uppercase tracking-widest">Twoja nowa rzeczywistość zaczyna się tutaj</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "WDRAŻAM SYSTEM",
              items: [
                "Projektuję bazę w Notion",
                "Ustawiam etapy i widoki",
                "Logujesz się i korzystasz"
              ]
            },
            {
              step: "02",
              title: "CZYŚCIMY CHAOS",
              items: [
                "Zeszyty, notatki, Messenger",
                "Przypisujemy etapy budów",
                "Ustalamy system notatek"
              ]
            },
            {
              step: "03",
              title: "30 DNI WSPARCIA",
              items: [
                "Bieżące poprawki",
                "Dopasowanie pod Ciebie",
                "Pytania przez cały miesiąc"
              ]
            }
          ].map((card, i) => (
            <Reveal key={i} delay={i * 200}>
              <div className="bg-black rounded-[2.5rem] p-10 text-white h-full transform hover:-translate-y-4 transition-transform duration-500 shadow-3xl shadow-black/30 group">
                <div className="text-7xl font-black text-white/10 group-hover:text-yellow-400/20 transition-colors mb-4">{card.step}</div>
                <h3 className="text-2xl font-black mb-8 group-hover:text-yellow-400 transition-colors uppercase italic">{card.title}</h3>
                <ul className="space-y-6">
                  {card.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4 group/li">
                      <CheckCircle2 size={24} className="text-yellow-400 group-hover/li:scale-125 transition-transform" />
                      <span className="font-bold text-lg text-slate-300 group-hover/li:text-white transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 text-center">
          <div className="inline-block bg-black text-yellow-400 px-10 py-5 rounded-full font-black text-2xl shadow-2xl uppercase italic">
            Efekt: Wiesz, z kim rozmawiasz i co dalej zrobić.
          </div>
        </div>
      </div>
    </section>
  );
};

const Filter: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10">
          <Reveal delay={100}>
            <div className="bg-slate-50 rounded-[3rem] p-12 border-4 border-emerald-400/30">
              <h3 className="text-3xl font-black text-slate-900 flex items-center gap-4 mb-8 uppercase italic">
                <ShieldCheck className="text-emerald-500" size={32} /> DLA KOGO:
              </h3>
              <ul className="space-y-6 text-slate-700 font-bold text-xl">
                <li className="flex gap-4"><span>⚡</span> Małe firmy budowlane (1–10 osób)</li>
                <li className="flex gap-4"><span>⚡</span> Budowa domów, mikrocement, wykończenia</li>
                <li className="flex gap-4"><span>⚡</span> Firmy działające lokalnie</li>
              </ul>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="bg-slate-900 rounded-[3rem] p-12 border-4 border-red-500/20">
              <h3 className="text-3xl font-black text-white flex items-center gap-4 mb-8 uppercase italic">
                <XCircle className="text-red-500" size={32} /> DLA KOGO NIE:
              </h3>
              <ul className="space-y-6 text-slate-400 font-bold text-xl">
                <li className="flex gap-4"><span>✕</span> Dla tych, którzy nie oddzwaniają</li>
                <li className="flex gap-4"><span>✕</span> Dla firm bez oferty i realizacji</li>
                <li className="flex gap-4"><span>✕</span> Dla szukających cudów z reklam</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Pricing: React.FC = () => {
  return (
    <section id="cena" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-4 uppercase italic tracking-tighter">CENA – PROSTO I UCZCIWIE</h2>
            <p className="text-yellow-600 font-black tracking-widest uppercase">Bez gwiazdek, bez ukrytych kosztów</p>
          </div>
        </Reveal>
        
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <div className="bg-white rounded-[3.5rem] border-8 border-yellow-400 p-12 shadow-3xl relative overflow-hidden">
              <div className="absolute top-10 right-[-50px] rotate-45 bg-yellow-400 text-black px-20 py-2 font-black text-sm shadow-lg">
                HIT 2024
              </div>
              
              <div className="text-center mb-12">
                <h3 className="text-3xl font-black text-slate-900 mb-4 uppercase tracking-tighter italic">PROJEKT STARTOWY</h3>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">2 997</span>
                  <div className="text-left">
                    <p className="text-xl font-black text-slate-900 leading-none">PLN</p>
                    <p className="text-sm font-bold text-slate-400 uppercase">Netto</p>
                  </div>
                </div>
                <p className="text-slate-500 font-bold text-lg italic">Jednorazowa inwestycja w fundament firmy</p>
              </div>

              <ul className="space-y-6 mb-12">
                {[
                  "Pełne wdrożenie systemu (Notion)",
                  "Pomoc w porządkowaniu starych danych",
                  "30 dni pełnego wsparcia technicznego",
                  "Brak abonamentu na start",
                  "Dostęp na telefonie i komputerze"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 group">
                    <div className="bg-yellow-400 rounded-full p-1 group-hover:scale-125 transition-transform">
                      <CheckCircle2 className="text-black" size={24} />
                    </div>
                    <span className="text-xl font-bold text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-slate-50 p-8 rounded-3xl mb-12 border-2 border-slate-100">
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-4">Możliwości rozwoju:</p>
                <div className="flex flex-wrap gap-4">
                  <span className="bg-white px-4 py-2 rounded-lg font-bold text-slate-600 shadow-sm">• Reklamy Google/FB</span>
                  <span className="bg-white px-4 py-2 rounded-lg font-bold text-slate-600 shadow-sm">• Automatyzacje</span>
                </div>
              </div>

              <a href="#kontakt" className="group relative block w-full text-center bg-black text-yellow-400 py-6 rounded-2xl font-black text-2xl hover:scale-[1.02] transition-all shadow-2xl active:scale-95 overflow-hidden uppercase italic tracking-tighter">
                <span className="relative z-10">ZACZNIJMY TERAZ</span>
                <div className="absolute top-0 left-0 w-full h-0 bg-yellow-400 group-hover:h-full transition-all duration-300 -z-0 opacity-10"></div>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const ContactDirect: React.FC = () => {
  return (
    <section id="kontakt" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 -translate-y-full skew-y-2 origin-bottom-right"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <Reveal>
            <h2 className="text-5xl md:text-8xl font-black mb-6 leading-none uppercase italic tracking-tighter">
              BŁYSKAWICZNY <br/>
              <span className="text-yellow-400 underline decoration-yellow-400/20 underline-offset-8">KONTAKT</span>
            </h2>
            <p className="text-2xl text-slate-400 font-medium italic max-w-2xl mx-auto">
              Nie trać czasu na maile. Wybierz najszybszą drogę – odpisuję niemal natychmiast.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Messenger */}
          <Reveal delay={100}>
            <a 
              href="https://m.me/przemyslawparszuta" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-[#0084FF] p-8 rounded-[2.5rem] flex flex-col items-center text-center hover:scale-105 transition-all shadow-xl shadow-[#0084FF]/20"
            >
              <div className="bg-white/20 p-5 rounded-3xl mb-6 group-hover:rotate-12 transition-transform">
                <MessageCircle size={48} className="text-white" />
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-2">Messenger</h3>
              <p className="text-white/80 font-bold text-sm uppercase tracking-widest">Napisz teraz</p>
            </a>
          </Reveal>

          {/* WhatsApp */}
          <Reveal delay={200}>
            <a 
              href="https://wa.me/48729615263" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-[#25D366] p-8 rounded-[2.5rem] flex flex-col items-center text-center hover:scale-105 transition-all shadow-xl shadow-[#25D366]/20"
            >
              <div className="bg-white/20 p-5 rounded-3xl mb-6 group-hover:-rotate-12 transition-transform">
                <MessageSquare size={48} className="text-white" />
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-2">WhatsApp</h3>
              <p className="text-white/80 font-bold text-sm uppercase tracking-widest">Najszybsza opcja</p>
            </a>
          </Reveal>

          {/* Telefon */}
          <Reveal delay={300}>
            <a 
              href="tel:+48729615263" 
              className="group bg-yellow-400 p-8 rounded-[2.5rem] flex flex-col items-center text-center hover:scale-105 transition-all shadow-xl shadow-yellow-400/20"
            >
              <div className="bg-black/10 p-5 rounded-3xl mb-6 group-hover:scale-110 transition-transform">
                <Phone size={48} className="text-black" />
              </div>
              <h3 className="text-2xl font-black text-black uppercase italic mb-2">Zadzwoń</h3>
              <p className="text-black/60 font-black text-lg tracking-tight">729 615 263</p>
            </a>
          </Reveal>

          {/* Email */}
          <Reveal delay={400}>
            <a 
              href="mailto:przemekparszuta@gmail.com" 
              className="group bg-white/5 border border-white/10 p-8 rounded-[2.5rem] flex flex-col items-center text-center hover:bg-white/10 transition-all"
            >
              <div className="bg-white/5 p-5 rounded-3xl mb-6 group-hover:scale-95 transition-transform">
                <Mail size={48} className="text-white" />
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-2">E-mail</h3>
              <p className="text-slate-400 font-bold text-xs truncate w-full px-2">przemekparszuta@gmail.com</p>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="bg-yellow-400 p-2 rounded-xl text-black group-hover:rotate-12 transition-transform">
              <HardHat size={24} />
            </div>
            <span className="font-black text-2xl tracking-tighter uppercase italic">
              Porządek<span className="text-yellow-400">wBudowlance</span>
            </span>
          </div>
          
          <div className="text-slate-500 text-sm font-bold uppercase tracking-widest italic">
            © {new Date().getFullYear()} Przemek Parszuta
          </div>
          
          <div className="flex gap-8 text-slate-400 text-sm font-black uppercase tracking-widest italic">
            <a href="#" className="hover:text-yellow-400 transition-colors underline underline-offset-4 decoration-yellow-400/20">Regulamin</a>
            <a href="#" className="hover:text-yellow-400 transition-colors underline underline-offset-4 decoration-yellow-400/20">Prywatność</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen selection:bg-yellow-400 selection:text-black animate-in fade-in duration-700">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Process />
      <Filter />
      <Pricing />
      <ContactDirect />
      <Footer />
    </div>
  );
};

export default App;
