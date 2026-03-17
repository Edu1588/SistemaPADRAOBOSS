import { CheckCircle } from 'lucide-react';
import { CustomerInfo, Service } from '../types';

interface SuccessProps {
  customerInfo: CustomerInfo | null;
  selectedService: Service | null;
  selectedDateStr: string | null;
  selectedTime: string | null;
  onHome: () => void;
}

export function Success({ customerInfo, selectedService, selectedDateStr, selectedTime, onHome }: SuccessProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6 max-w-2xl mx-auto w-full animate-in fade-in duration-500">
      <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
        <CheckCircle className="w-16 h-16 text-green-500" />
      </div>
      <h2 className="text-3xl font-black text-white">Agendamento Confirmado!</h2>
      <p className="text-zinc-400 max-w-sm">
        O seu lugar está reservado. Enviámos uma mensagem no WhatsApp para{' '}
        <strong className="text-white">{customerInfo?.phone}</strong> com os detalhes.
      </p>

      <div className="bg-zinc-900 rounded-2xl p-6 w-full max-w-sm mt-8 border border-zinc-800">
        <p className="text-yellow-500 font-bold text-xl mb-1">{selectedTime}</p>
        <p className="text-white capitalize">{selectedDateStr}</p>
        <p className="text-zinc-400 mt-2">{selectedService?.name}</p>
      </div>

      <button onClick={onHome} className="mt-8 text-yellow-500 font-bold hover:underline transition-all">
        Voltar ao Início
      </button>
    </div>
  );
}
