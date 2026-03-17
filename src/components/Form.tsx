import { Calendar, CheckCircle, ChevronLeft, Clock, Scissors, ArrowRight, Search } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { CustomerInfo, Service, Booking } from '../types';

interface FormProps {
  selectedService?: Service | null;
  selectedDateStr?: string | null;
  selectedTime?: string | null;
  customerInfo?: CustomerInfo | null;
  bookings?: Booking[];
  onBack: () => void;
  onSubmit: (customerInfo: CustomerInfo) => void;
  isFirstStep?: boolean;
}

export function Form({ selectedService, selectedDateStr, selectedTime, customerInfo, bookings = [], onBack, onSubmit, isFirstStep }: FormProps) {
  const [name, setName] = useState(customerInfo?.name || '');
  const [phone, setPhone] = useState(customerInfo?.phone || '');
  const [step, setStep] = useState<'phone' | 'details'>(customerInfo ? 'details' : 'phone');

  const handlePhoneSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    // Remove non-numeric characters for comparison
    const cleanPhone = phone.replace(/\D/g, '');
    const existingBooking = bookings.find(b => b.phone.replace(/\D/g, '') === cleanPhone);

    if (existingBooking) {
      // User found! Proceed directly with their existing name
      onSubmit({ name: existingBooking.customerName, phone });
    } else {
      // User not found, ask for name
      setStep('details');
    }
  };

  const handleDetailsSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    onSubmit({ name, phone });
  };

  const handleBack = () => {
    if (step === 'details' && !customerInfo && isFirstStep) {
      setStep('phone');
    } else {
      onBack();
    }
  };

  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto w-full animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleBack}
          className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white">
          {step === 'phone' ? 'Qual o seu WhatsApp?' : 'Seus Dados'}
        </h2>
      </div>

      {!isFirstStep && selectedService && selectedDateStr && selectedTime && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 mb-8">
          <h3 className="text-[#FFB800] font-bold mb-4 uppercase text-xs tracking-wider">Resumo do Agendamento</h3>
          <div className="space-y-3 text-white">
            <div className="flex items-center gap-3">
              <Scissors className="w-4 h-4 text-zinc-500" />
              <span>{selectedService.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-4 h-4 text-zinc-500" />
              <span>{selectedDateStr}</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-zinc-500" />
              <span>{selectedTime}</span>
            </div>
          </div>
        </div>
      )}

      {step === 'phone' ? (
        <form onSubmit={handlePhoneSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4">
          <div>
            <label className="block text-zinc-400 text-sm mb-2 ml-1">WhatsApp</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white p-4 rounded-xl focus:outline-none focus:border-[#FFB800] transition-colors"
              placeholder="Ex: (11) 99999-9999"
              autoFocus
            />
            <p className="text-xs text-zinc-500 mt-2 ml-1">Usaremos para buscar seu cadastro ou criar um novo.</p>
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950 border-t border-zinc-800 flex justify-center z-20 animate-in slide-in-from-bottom-4">
            <button
              type="submit"
              className="w-full max-w-md bg-[#FFB800] text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:bg-white flex justify-center items-center gap-2 transition-colors uppercase tracking-widest"
            >
              BUSCAR CADASTRO <Search className="w-5 h-5" />
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleDetailsSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4">
          <div>
            <label className="block text-zinc-400 text-sm mb-2 ml-1">WhatsApp</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-500 p-4 rounded-xl focus:outline-none focus:border-[#FFB800] transition-colors"
              placeholder="Ex: (11) 99999-9999"
            />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-2 ml-1">Nome Completo</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 text-white p-4 rounded-xl focus:outline-none focus:border-[#FFB800] transition-colors"
              placeholder="Ex: João Silva"
              autoFocus
            />
          </div>

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950 border-t border-zinc-800 flex justify-center z-20 animate-in slide-in-from-bottom-4">
            <button
              type="submit"
              className="w-full max-w-md bg-[#FFB800] text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(255,184,0,0.2)] hover:bg-white flex justify-center items-center gap-2 transition-colors uppercase tracking-widest"
            >
              {isFirstStep ? (
                <>CONTINUAR <ArrowRight className="w-5 h-5" /></>
              ) : (
                <>FINALIZAR AGENDAMENTO <CheckCircle className="w-5 h-5" /></>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
