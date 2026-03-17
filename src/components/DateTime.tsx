import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import { Booking } from '../types';

interface DateTimeProps {
  bookings: Booking[];
  selectedDateStr: string | null;
  selectedTime: string | null;
  onSelectDate: (dateStr: string) => void;
  onSelectTime: (time: string) => void;
  onBack: () => void;
  onContinue: () => void;
  businessHours: { start: number; end: number };
}

const getLocalDateString = (date: Date) => {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};

const getCalendarMonths = (daysCount = 30) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + daysCount);

  const months: { month: number; year: number; days: (Date | null)[] }[] = [];

  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();

  while (currentYear < endDate.getFullYear() || (currentYear === endDate.getFullYear() && currentMonth <= endDate.getMonth())) {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    
    const daysInMonth: (Date | null)[] = [];
    
    // Pad start with nulls for empty grid cells
    for (let i = 0; i < firstDayOfMonth.getDay(); i++) {
      daysInMonth.push(null);
    }
    
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      daysInMonth.push(new Date(currentYear, currentMonth, i));
    }
    
    months.push({ month: currentMonth, year: currentYear, days: daysInMonth });
    
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
  }
  
  return months;
};

export function DateTime({
  bookings,
  selectedDateStr,
  selectedTime,
  onSelectDate,
  onSelectTime,
  onBack,
  onContinue,
  businessHours
}: DateTimeProps) {
  const months = getCalendarMonths(30);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(today.getDate() + 30);
  const todayStr = getLocalDateString(new Date());

  const getAvailableTimesForDate = (dateStr: string | null) => {
    if (!dateStr) return [];
    const times = [];
    const now = new Date();
    const isToday = todayStr === dateStr;
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    for (let hour = businessHours.start; hour < businessHours.end; hour++) {
      for (let min of ['00', '30']) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${min}`;

        if (isToday) {
          if (hour < currentHour || (hour === currentHour && parseInt(min) <= currentMinute)) {
            continue;
          }
        }

        const isBooked = bookings.some((b) => b.date === dateStr && b.time === timeStr);
        if (!isBooked) times.push(timeStr);
      }
    }
    return times;
  };

  const availableTimes = getAvailableTimesForDate(selectedDateStr);

  return (
    <div className="p-6 pb-24 max-w-2xl mx-auto w-full animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={onBack}
          className="p-2 bg-zinc-900 rounded-full text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h2 className="text-2xl font-bold text-white">Data e Hora</h2>
      </div>

      <div className="mb-8">
        <h3 className="text-zinc-400 text-sm uppercase tracking-wider mb-4 font-semibold">1. Escolha o Dia</h3>
        
        <div className="space-y-8 bg-zinc-900/30 p-4 rounded-3xl border border-zinc-800/50">
          {months.map(({ month, year, days }) => {
            const monthName = new Date(year, month).toLocaleDateString('pt-PT', { month: 'long' });
            return (
              <div key={`${year}-${month}`}>
                <h4 className="text-white font-bold capitalize mb-4 text-lg px-2">{monthName} {year}</h4>
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                  {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((d, i) => (
                    <div key={i} className="text-xs font-bold text-zinc-500">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2">
                  {days.map((date, i) => {
                    if (!date) return <div key={`empty-${i}`} />;
                    
                    const isPast = date < today;
                    const isTooFar = date > maxDate;
                    const isSunday = date.getDay() === 0;
                    const isDisabled = isPast || isTooFar || isSunday;
                    
                    const dateStr = getLocalDateString(date);
                    const isSelected = selectedDateStr === dateStr;
                    
                    return (
                      <button
                        key={dateStr}
                        disabled={isDisabled}
                        onClick={() => {
                          onSelectDate(dateStr);
                          onSelectTime(''); // Reset time when date changes
                        }}
                        className={`aspect-square flex items-center justify-center rounded-full text-sm sm:text-base transition-all duration-300 ${
                          isSelected
                            ? 'bg-[#FFB800] text-black font-black scale-110 shadow-[0_0_20px_rgba(255,184,0,0.3)]'
                            : isDisabled
                            ? 'text-zinc-700 cursor-not-allowed opacity-50'
                            : 'text-zinc-300 hover:bg-zinc-800 hover:text-white font-medium bg-zinc-900/50 border border-zinc-800/50'
                        }`}
                      >
                        {date.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedDateStr && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-zinc-400 text-sm uppercase tracking-wider mb-3 font-semibold">2. Escolha a Hora</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 pt-2">
            {availableTimes.length > 0 ? (
              availableTimes.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => onSelectTime(time)}
                    className={`py-4 rounded-2xl font-bold text-lg border-2 transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#FFB800] border-[#FFB800] text-black transform scale-[1.02] shadow-[0_0_20px_rgba(255,184,0,0.2)]'
                        : 'bg-zinc-900/50 border-zinc-800 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-900'
                    }`}
                  >
                    {time}
                  </button>
                );
              })
            ) : (
              <p className="col-span-full text-zinc-500 text-center p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800 border-dashed">
                Não há horários disponíveis para este dia.
              </p>
            )}
          </div>
        </div>
      )}

      {selectedTime && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950 border-t border-zinc-800 flex justify-center z-20 animate-in slide-in-from-bottom-4">
          <button
            onClick={onContinue}
            className="w-full max-w-md bg-[#FFB800] text-black font-black py-4 rounded-xl shadow-[0_0_20px_rgba(255,184,0,0.2)] flex justify-center items-center gap-2 hover:bg-white transition-colors uppercase tracking-widest"
          >
            Finalizar Agendamento <CheckCircle className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
