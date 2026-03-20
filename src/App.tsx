import { CheckCircle, Mail, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Admin } from './components/Admin';
import { AdminLogin } from './components/AdminLogin';
import { DateTime } from './components/DateTime';
import { Form } from './components/Form';
import { Landing } from './components/Landing';
import { Services } from './components/Services';
import { Success } from './components/Success';
import { Booking, CustomerInfo, Service } from './types';

type View = 'home' | 'services' | 'datetime' | 'form' | 'success';

const INITIAL_SERVICES: Service[] = [
  { id: 'corte', name: 'Corte com Lavagem e Finalização', price: 'R$ 45,00', icon: 'scissors', image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?q=80&w=800&auto=format&fit=crop' },
  { id: 'barba', name: 'Barba com Toalha Quente', price: 'R$ 35,00', icon: 'user', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop' },
  { id: 'limpeza', name: 'Limpeza de Pele com Esfoliante', price: 'R$ 25,00', icon: 'sparkles', image: 'https://images.unsplash.com/photo-1512496015851-a1cbfc38680c?q=80&w=800&auto=format&fit=crop' },
  { id: 'selagem', name: 'Selagem e Alisamento', price: 'R$ 80,00', icon: 'zap', image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop' },
  { id: 'descoloracao', name: 'Descoloração (Platinado)', price: 'R$ 100,00', icon: 'droplet', image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop' },
  { id: 'sobrancelha', name: 'Sobrancelha', price: 'R$ 15,00', icon: 'scissors', image: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=800&auto=format&fit=crop' },
  { id: 'hidratacao', name: 'Hidratação de Cabelo e Barba', price: 'R$ 30,00', icon: 'droplet', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=800&auto=format&fit=crop' },
];

const BUSINESS_HOURS = { start: 10, end: 19 }; // 10h às 19h

const getLocalDateString = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

interface Toast {
  id: number;
  title: string;
  message: string;
  type: 'whatsapp-client' | 'sms-admin' | 'email-admin';
}

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [services, setServices] = useState<Service[]>(INITIAL_SERVICES);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      date: getLocalDateString(new Date()),
      time: '11:00',
      serviceId: 'corte',
      customerName: 'João Silva',
      phone: '(11) 98888-7777',
    },
    {
      id: 2,
      date: getLocalDateString(new Date()),
      time: '14:30',
      serviceId: 'combo',
      customerName: 'Tiago Mendes',
      phone: '(11) 95555-4444',
    },
  ]);

  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDateStr, setSelectedDateStr] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);

  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (title: string, message: string, type: Toast['type']) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  };

  const handleStartBooking = () => {
    setSelectedService(null);
    setSelectedDateStr(null);
    setSelectedTime(null);
    setCustomerInfo(null);
    setCurrentView('form');
  };

  const handleFormSubmit = (info: CustomerInfo) => {
    setCustomerInfo(info);
    setCurrentView('services');
  };

  const handleConfirmBooking = () => {
    if (!selectedService || !selectedDateStr || !selectedTime || !customerInfo) return;

    const newBooking: Booking = {
      id: Date.now(),
      date: selectedDateStr,
      time: selectedTime,
      serviceId: selectedService.id,
      customerName: customerInfo.name,
      phone: customerInfo.phone,
    };

    setBookings((prev) => [...prev, newBooking]);
    setCurrentView('success');

    setTimeout(() => {
      addToast(
        'WhatsApp',
        `Padrão Boss: Olá ${customerInfo.name}, marcação confirmada! ${selectedService.name} no dia ${selectedDateStr} às ${selectedTime}.`,
        'whatsapp-client'
      );
    }, 1000);

    setTimeout(() => {
      addToast(
        'Aviso para o Dono',
        `NOVA MARCAÇÃO: ${customerInfo.name} para ${selectedService.name} - Dia ${selectedDateStr} às ${selectedTime}.`,
        'sms-admin'
      );
    }, 2500);

    setTimeout(() => {
      addToast(
        'Email Dono',
        `Novo agendamento recebido no sistema. Cliente: ${customerInfo.name}, WhatsApp: ${customerInfo.phone}.`,
        'email-admin'
      );
    }, 3500);
  };

  const handleUpdateBooking = (updatedBooking: Booking) => {
    setBookings((prev) => prev.map((b) => (b.id === updatedBooking.id ? updatedBooking : b)));
    const svc = services.find((s) => s.id === updatedBooking.serviceId);
    addToast(
      'WhatsApp',
      `Padrão Boss: ${updatedBooking.customerName}, o seu agendamento foi ATUALIZADO para ${
        svc?.name || 'Serviço'
      } no dia ${updatedBooking.date} às ${updatedBooking.time}.`,
      'whatsapp-client'
    );
  };

  const handleAddService = (service: Service) => {
    setServices((prev) => [...prev, service]);
    addToast('Sucesso', 'Serviço adicionado com sucesso.', 'sms-admin');
  };

  const handleUpdateService = (service: Service) => {
    setServices((prev) => prev.map((s) => (s.id === service.id ? service : s)));
    addToast('Sucesso', 'Serviço atualizado com sucesso.', 'sms-admin');
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
    addToast('Sucesso', 'Serviço removido.', 'sms-admin');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-zinc-200 font-mono selection:bg-yellow-500 selection:text-black flex flex-col relative overflow-x-hidden">
      <main className="flex-1 flex flex-col relative">
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                {currentView === 'home' && <Landing onStartBooking={handleStartBooking} />}
                {currentView === 'form' && (
                  <Form
                    customerInfo={customerInfo}
                    bookings={bookings}
                    onBack={() => setCurrentView('home')}
                    onSubmit={handleFormSubmit}
                    isFirstStep={true}
                  />
                )}
                {currentView === 'services' && (
                  <Services
                    services={services}
                    selectedService={selectedService}
                    onSelectService={setSelectedService}
                    onContinue={() => setCurrentView('datetime')}
                    onBack={() => setCurrentView('form')}
                  />
                )}
                {currentView === 'datetime' && (
                  <DateTime
                    bookings={bookings}
                    selectedDateStr={selectedDateStr}
                    selectedTime={selectedTime}
                    onSelectDate={(date) => {
                      setSelectedDateStr(date);
                      setSelectedTime(null);
                    }}
                    onSelectTime={setSelectedTime}
                    onBack={() => setCurrentView('services')}
                    onContinue={handleConfirmBooking}
                    businessHours={BUSINESS_HOURS}
                  />
                )}
                {currentView === 'success' && (
                  <Success
                    customerInfo={customerInfo}
                    selectedService={selectedService}
                    selectedDateStr={selectedDateStr}
                    selectedTime={selectedTime}
                    onHome={() => setCurrentView('home')}
                  />
                )}
              </>
            } 
          />
          <Route 
            path="/admin" 
            element={
              isAdminAuthenticated ? (
                <Admin
                  bookings={bookings}
                  services={services}
                  onUpdateBooking={handleUpdateBooking}
                  onAddService={handleAddService}
                  onUpdateService={handleUpdateService}
                  onDeleteService={handleDeleteService}
                />
              ) : (
                <AdminLogin onLogin={() => setIsAdminAuthenticated(true)} />
              )
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* TOASTS CONTAINER */}
      <div className="fixed bottom-4 right-4 left-4 md:left-auto z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => {
          let bgClass =
            toast.type === 'whatsapp-client'
              ? 'bg-[#25D366] text-white'
              : toast.type === 'sms-admin'
              ? 'bg-yellow-500 text-black'
              : 'bg-blue-600 text-white';
          let textClass = toast.type === 'sms-admin' ? 'text-black' : 'text-white';
          let Icon =
            toast.type === 'whatsapp-client'
              ? MessageCircle
              : toast.type === 'sms-admin'
              ? CheckCircle
              : Mail;

          return (
            <div
              key={toast.id}
              className={`p-4 rounded-xl shadow-2xl flex items-start gap-3 pointer-events-auto animate-bounce-short ${bgClass}`}
            >
              <Icon className="w-6 h-6 shrink-0" />
              <div>
                <h4 className={`font-bold text-sm ${textClass}`}>{toast.title}</h4>
                <p className={`text-sm opacity-90 leading-tight mt-1 ${textClass}`}>{toast.message}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
