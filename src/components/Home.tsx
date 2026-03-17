import { Facebook, Instagram, MapPin } from 'lucide-react';

interface HomeProps {
  onStartBooking: () => void;
}

export function Home({ onStartBooking }: HomeProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-8 animate-in fade-in duration-500">
      <div className="w-32 h-32 bg-zinc-900 rounded-full flex items-center justify-center border-4 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)] overflow-hidden">
        <img 
          src="https://eionstudio.com.br/wp-content/uploads/2026/03/Captura-de-tela-2026-03-17-112011.png" 
          alt="Padrão Boss Logo" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div>
        <h2 className="text-5xl text-white mb-2 tracking-widest">Padrão Boss</h2>
        <p className="text-zinc-400 uppercase tracking-widest text-sm mt-2">Barbearia Premium</p>
      </div>
      <button
        onClick={onStartBooking}
        className="w-full max-w-md bg-yellow-500 text-black font-bold text-lg py-4 rounded-xl hover:bg-yellow-400 transition-colors shadow-[0_0_20px_rgba(234,179,8,0.3)]"
      >
        AGENDAR AGORA
      </button>

      {/* Social and Map Links */}
      <div className="flex items-center gap-6 mt-8">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-zinc-900 text-zinc-400 rounded-full hover:text-yellow-500 hover:bg-zinc-800 transition-all"
        >
          <Instagram className="w-6 h-6" />
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-zinc-900 text-zinc-400 rounded-full hover:text-yellow-500 hover:bg-zinc-800 transition-all"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
          </svg>
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-zinc-900 text-zinc-400 rounded-full hover:text-yellow-500 hover:bg-zinc-800 transition-all"
        >
          <Facebook className="w-6 h-6" />
        </a>
        <a
          href="https://maps.app.goo.gl/6qqJLE2KwWAhx24u5"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 bg-zinc-900 text-zinc-400 rounded-full hover:text-yellow-500 hover:bg-zinc-800 transition-all"
        >
          <MapPin className="w-6 h-6" />
        </a>
      </div>
    </div>
  );
}
