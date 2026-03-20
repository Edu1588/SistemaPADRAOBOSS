import { Calendar, Edit2, Edit3, MessageCircle, Plus, Trash2, X } from 'lucide-react';
import React, { useState } from 'react';
import { Booking, Service } from '../types';

interface AdminProps {
  bookings: Booking[];
  services: Service[];
  onUpdateBooking: (booking: Booking) => void;
  onAddService: (service: Service) => void;
  onUpdateService: (service: Service) => void;
  onDeleteService: (id: string) => void;
}

export function Admin({
  bookings,
  services,
  onUpdateBooking,
  onAddService,
  onUpdateService,
  onDeleteService,
}: AdminProps) {
  const [activeTab, setActiveTab] = useState<'agenda' | 'services'>('agenda');
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<Service | null>(null);

  // Group bookings by date
  const groupedBookings = bookings.reduce((acc, booking) => {
    if (!acc[booking.date]) acc[booking.date] = [];
    acc[booking.date].push(booking);
    return acc;
  }, {} as Record<string, Booking[]>);

  const sortedDates = Object.keys(groupedBookings).sort();

  const handleSaveBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingBooking) return;
    onUpdateBooking(editingBooking);
    setEditingBooking(null);
  };

  const handleSaveService = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingService) return;

    if (services.some((s) => s.id === editingService.id)) {
      onUpdateService(editingService);
    } else {
      onAddService({ ...editingService, id: `svc_${Date.now()}` });
    }
    setIsServiceModalOpen(false);
    setEditingService(null);
  };

  const openNewServiceModal = () => {
    setEditingService({ id: '', name: '', price: '', icon: 'scissors' });
    setIsServiceModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8 w-full max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="flex items-center justify-between mb-6 border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-3xl font-black text-white flex items-center gap-3">
            <Calendar className="w-8 h-8 text-yellow-500" /> Painel Boss
          </h2>
          <p className="text-zinc-400 mt-1">Gestão da Barbearia</p>
        </div>
        {activeTab === 'agenda' && (
          <div className="flex gap-2">
            <span className="bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-sm font-bold border border-yellow-500/20">
              {bookings.length} Marcações Totais
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-6 mb-6">
        <button
          onClick={() => setActiveTab('agenda')}
          className={`font-bold pb-2 transition-colors ${
            activeTab === 'agenda'
              ? 'text-yellow-500 border-b-2 border-yellow-500'
              : 'text-zinc-400 hover:text-white border-b-2 border-transparent'
          }`}
        >
          Agenda
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`font-bold pb-2 transition-colors ${
            activeTab === 'services'
              ? 'text-yellow-500 border-b-2 border-yellow-500'
              : 'text-zinc-400 hover:text-white border-b-2 border-transparent'
          }`}
        >
          Serviços
        </button>
      </div>

      {activeTab === 'agenda' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {sortedDates.length === 0 ? (
            <div className="text-center p-12 bg-zinc-900 rounded-2xl border border-zinc-800">
              <p className="text-zinc-500">Sem agendamentos registados ainda.</p>
            </div>
          ) : (
            sortedDates.map((date) => {
              const dayBookings = groupedBookings[date].sort((a, b) => a.time.localeCompare(b.time));
              return (
                <div key={date} className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 mb-6 shadow-lg">
                  <div className="bg-zinc-950 p-4 border-b border-zinc-800 flex justify-between items-center">
                    <h3 className="font-bold text-lg text-white capitalize">{date}</h3>
                    <span className="text-sm text-zinc-500">{dayBookings.length} agendamentos</span>
                  </div>
                  <div className="divide-y divide-zinc-800/50">
                    {dayBookings.map((b) => {
                      const svc = services.find((s) => s.id === b.serviceId);
                      return (
                        <div key={b.id} className="p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:bg-zinc-800/50 transition-colors group">
                          <div className="w-20 font-black text-xl text-yellow-500">{b.time}</div>
                          <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                              <p className="font-bold text-white text-lg">{b.customerName}</p>
                              <div className="flex items-center gap-3 mt-1 text-sm text-zinc-400">
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="w-3 h-3" /> {b.phone}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="bg-zinc-800 px-4 py-2 rounded-lg flex items-center gap-3">
                                <span className="text-white font-medium whitespace-nowrap">
                                  {svc ? svc.name : '<Serviço Removido>'}
                                </span>
                              </div>
                              <button
                                onClick={() => setEditingBooking({ ...b })}
                                className="p-2 text-zinc-500 hover:text-yellow-500 hover:bg-zinc-800 rounded-lg transition-all opacity-100 sm:opacity-0 group-hover:opacity-100 focus:opacity-100"
                                title="Editar Agendamento"
                              >
                                <Edit3 className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {activeTab === 'services' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center mb-4">
            <p className="text-zinc-400">Configure os serviços, valores e ícones.</p>
            <button
              onClick={openNewServiceModal}
              className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-yellow-400 transition-colors"
            >
              <Plus className="w-4 h-4" /> Novo
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.length === 0 ? (
              <p className="col-span-full text-zinc-500 text-center py-8">Nenhum serviço configurado.</p>
            ) : (
              services.map((s) => (
                <div key={s.id} className="bg-zinc-900 border border-zinc-800 p-5 rounded-2xl flex flex-col justify-between shadow-lg">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-zinc-800 p-3 rounded-xl">
                      {/* Icon placeholder */}
                      <span className="text-yellow-500 font-bold">{s.icon}</span>
                    </div>
                    <div>
                      <p className="font-bold text-white text-lg leading-tight">{s.name}</p>
                      <p className="text-yellow-500 font-bold mt-1">{s.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 border-t border-zinc-800 pt-3">
                    <button
                      onClick={() => {
                        setEditingService({ ...s });
                        setIsServiceModalOpen(true);
                      }}
                      className="flex-1 bg-zinc-800 text-zinc-300 py-2 rounded-lg text-sm font-bold hover:bg-zinc-700 hover:text-white transition-colors flex justify-center items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" /> Editar
                    </button>
                    <button
                      onClick={() => setServiceToDelete(s)}
                      className="px-3 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Edit Booking Modal */}
      {editingBooking && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Editar Agendamento</h3>
              <button onClick={() => setEditingBooking(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveBooking} className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Data</label>
                <input
                  type="date"
                  required
                  value={editingBooking.date}
                  onChange={(e) => setEditingBooking({ ...editingBooking, date: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Hora</label>
                <input
                  type="time"
                  required
                  value={editingBooking.time}
                  onChange={(e) => setEditingBooking({ ...editingBooking, time: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:border-yellow-500"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Serviço</label>
                <select
                  required
                  value={editingBooking.serviceId}
                  onChange={(e) => setEditingBooking({ ...editingBooking, serviceId: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:border-yellow-500"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.price})
                    </option>
                  ))}
                  {!services.some((s) => s.id === editingBooking.serviceId) && (
                    <option value={editingBooking.serviceId}>Serviço Removido</option>
                  )}
                </select>
              </div>
              <div className="flex gap-3 mt-6 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingBooking(null)}
                  className="flex-1 bg-zinc-800 text-white py-3 rounded-lg font-bold hover:bg-zinc-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                >
                  Guardar & Notificar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit/Add Service Modal */}
      {isServiceModalOpen && editingService && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">
                {editingService.id ? 'Editar Serviço' : 'Novo Serviço'}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveService} className="space-y-4">
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Nome do Serviço</label>
                <input
                  type="text"
                  required
                  value={editingService.name}
                  onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:border-yellow-500"
                  placeholder="Ex: Platinado"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Preço (com símbolo)</label>
                <input
                  type="text"
                  required
                  value={editingService.price}
                  onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:border-yellow-500"
                  placeholder="Ex: R$ 25,00"
                />
              </div>
              <div>
                <label className="block text-zinc-400 text-sm mb-1">Ícone</label>
                <select
                  value={editingService.icon}
                  onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white p-3 rounded-lg focus:outline-none focus:border-yellow-500"
                >
                  <option value="scissors">Tesoura</option>
                  <option value="user">Perfil/Barba</option>
                  <option value="sparkles">Brilho/Combo</option>
                  <option value="droplet">Gota/Tinta</option>
                  <option value="star">Estrela</option>
                  <option value="zap">Raio</option>
                </select>
              </div>
              <div className="flex gap-3 mt-6 pt-4">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="flex-1 bg-zinc-800 text-white py-3 rounded-lg font-bold hover:bg-zinc-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-yellow-500 text-black py-3 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Delete Service Confirmation Modal */}
      {serviceToDelete && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Excluir Serviço</h3>
              <button onClick={() => setServiceToDelete(null)} className="text-zinc-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-zinc-300 mb-6">
              Tem certeza que deseja excluir o serviço <strong className="text-white">{serviceToDelete.name}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setServiceToDelete(null)}
                className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-bold hover:bg-zinc-700 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  onDeleteService(serviceToDelete.id);
                  setServiceToDelete(null);
                }}
                className="flex-1 bg-red-500 text-white py-3 rounded-xl font-bold hover:bg-red-600 transition-colors"
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
