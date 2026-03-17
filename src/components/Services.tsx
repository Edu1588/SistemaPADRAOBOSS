import { ChevronRight, Droplet, MessageCircle, Scissors, Sparkles, Star, User, Zap, ChevronLeft } from 'lucide-react';
import React from 'react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
  selectedService: Service | null;
  onSelectService: (service: Service) => void;
  onContinue: () => void;
  onBack: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  scissors: Scissors,
  user: User,
  sparkles: Sparkles,
  droplet: Droplet,
  star: Star,
  zap: Zap,
};

export function Services({ services, selectedService, onSelectService, onContinue, onBack }: ServicesProps) {
  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto w-full animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span className="w-8 h-1 bg-[#FFB800] rounded-full"></span>
          Escolha o Serviço
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {services.length === 0 ? (
          <p className="col-span-2 text-zinc-500 text-center py-8">Nenhum serviço disponível de momento.</p>
        ) : (
          services.map((service, index) => {
            const isSelected = selectedService?.id === service.id;
            const Icon = iconMap[service.icon] || Scissors;
            
            // Bento pattern: 1 wide, 2 squares, 1 wide, 2 squares...
            const isWide = index % 3 === 0;

            return (
              <button
                key={service.id}
                onClick={() => onSelectService(service)}
                className={`group relative overflow-hidden flex ${
                  isWide ? 'flex-row items-center justify-between text-left' : 'flex-col items-center justify-center text-center'
                } p-6 rounded-3xl border-2 transition-all duration-300 ${
                  isWide ? 'col-span-2' : 'col-span-1'
                } ${
                  isSelected
                    ? 'bg-[#FFB800] border-[#FFB800] transform scale-[1.02] shadow-[0_0_30px_rgba(255,184,0,0.15)]'
                    : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900'
                }`}
              >
                {/* Background glow effect for selected */}
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 pointer-events-none" />
                )}

                <div className={`flex ${isWide ? 'flex-row items-center gap-4' : 'flex-col items-center'} z-10`}>
                  <div className={`p-3 rounded-2xl ${isSelected ? 'bg-black/10' : 'bg-zinc-800/50 group-hover:bg-zinc-800'} transition-colors ${isWide ? '' : 'mb-4'}`}>
                    <Icon className={`w-8 h-8 ${isSelected ? 'text-black' : 'text-[#FFB800]'}`} />
                  </div>
                  <span className={`block font-bold text-lg ${isSelected ? 'text-black' : 'text-white'}`}>
                    {service.name}
                  </span>
                </div>
                
                <div className={`z-10 ${isWide ? 'text-right' : 'mt-2'}`}>
                  <span className={`inline-block font-black text-lg ${isSelected ? 'text-black' : 'text-[#FFB800]'}`}>
                    {service.price}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* WhatsApp Button */}
      <div className="mt-8 flex justify-center">
        <a
          href="https://wa.me/5511966310835"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-md bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/20 font-bold py-4 rounded-xl flex justify-center items-center gap-2 hover:bg-[#25D366]/20 transition-colors"
        >
          <MessageCircle className="w-5 h-5" /> Falar com o Boss
        </a>
      </div>

      {selectedService && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950 border-t border-zinc-800 flex justify-center z-20 animate-in slide-in-from-bottom-4">
          <button
            onClick={onContinue}
            className="w-full max-w-md bg-[#FFB800] text-black font-bold py-4 rounded-xl shadow-lg flex justify-center items-center gap-2 hover:bg-white transition-colors uppercase tracking-widest"
          >
            Continuar para Data <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
