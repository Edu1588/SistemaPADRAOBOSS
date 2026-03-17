import { Lock } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '1234') {
      onLogin();
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-2xl p-8 shadow-2xl">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <h2 className="text-2xl font-black text-white text-center uppercase tracking-widest mb-2">
          Acesso Restrito
        </h2>
        <p className="text-zinc-400 text-center text-sm mb-8">
          Insira a senha para acessar o painel do Boss.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Senha"
              className={`w-full bg-zinc-950 border ${
                error ? 'border-red-500' : 'border-zinc-800'
              } text-white p-4 rounded-xl focus:outline-none focus:border-yellow-500 transition-colors text-center text-xl tracking-widest`}
            />
            {error && <p className="text-red-500 text-xs text-center mt-2">Senha incorreta.</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 text-black font-black py-4 rounded-xl hover:bg-yellow-400 transition-colors uppercase tracking-widest"
          >
            Entrar
          </button>
        </form>
        
        <button 
          onClick={() => navigate('/')}
          className="w-full text-zinc-500 hover:text-white text-sm mt-6 transition-colors"
        >
          Voltar ao site
        </button>
      </div>
    </div>
  );
}
