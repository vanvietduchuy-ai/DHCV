
import React, { useState } from 'react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
  masterData: User[];
}

const Login: React.FC<LoginProps> = ({ onLogin, masterData }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      setError("Vui lòng chọn đồng chí đăng nhập.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Giả lập độ trễ xác thực nghiệp vụ
    setTimeout(() => {
      const user = masterData.find(u => u.id === selectedUserId && u.password === password);

      if (user) {
        onLogin(user);
      } else {
        setError("Mật khẩu xác thực không chính xác. Vui lòng kiểm tra lại.");
      }
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-police-cream flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Họa tiết Trống Đồng chìm trang trọng */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <div className="w-[800px] h-[800px] border-[40px] border-police-gold rounded-full flex items-center justify-center">
          <div className="w-[600px] h-[600px] border-[20px] border-police-gold rounded-full flex items-center justify-center">
            <div className="w-[400px] h-[400px] border-[10px] border-police-gold rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-10">
          <div className="w-32 h-32 mx-auto mb-6 bg-white p-2 rounded-full shadow-2xl emblem-glow relative border-4 border-police-gold/20">
             <img 
               src="https://upload.wikimedia.org/wikipedia/vi/1/1b/Huy_hi%E1%BB%87u_C%C3%B4ng_an_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam.png" 
               alt="Huy hiệu CAND" 
               className="w-full h-full object-contain relative z-10"
             />
          </div>
          <h1 className="text-2xl font-black text-police-red uppercase tracking-tight">Hệ thống Quản trị</h1>
          <h2 className="text-xs font-bold text-police-gold uppercase tracking-[0.3em] mt-2">Công an Phường Nam Đông Hà</h2>
        </div>

        <form onSubmit={handleLogin} className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl p-10 border border-white space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Đồng chí đăng nhập</label>
            <div className="relative">
              <i className="fa-solid fa-user-shield absolute left-4 top-1/2 -translate-y-1/2 text-police-gold text-sm z-10"></i>
              <select 
                required
                value={selectedUserId}
                onChange={e => setSelectedUserId(e.target.value)}
                className="w-full pl-11 pr-10 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-navy-900 outline-none focus:border-police-gold appearance-none transition-all shadow-inner relative"
              >
                <option value="">-- Chọn tên cán bộ --</option>
                {masterData.map(u => (
                  <option key={u.id} value={u.id}>
                    {u.name} ({u.position})
                  </option>
                ))}
              </select>
              <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 text-[10px] pointer-events-none"></i>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1 tracking-widest">Mật khẩu xác thực</label>
            <div className="relative">
              <i className="fa-solid fa-key absolute left-4 top-1/2 -translate-y-1/2 text-police-gold text-sm z-10"></i>
              <input 
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold text-navy-900 outline-none focus:border-police-gold transition-all shadow-inner"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-police-red p-3 rounded-lg">
              <p className="text-[10px] text-police-red font-bold italic leading-relaxed">{error}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-red-100 ${
              isSubmitting 
                ? 'bg-slate-100 text-slate-300 cursor-not-allowed' 
                : 'bg-police-red text-white hover:bg-red-800 active:scale-95'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <i className="fa-solid fa-spinner animate-spin"></i>
                Đang xác thực...
              </span>
            ) : 'Vào phiên công tác'}
          </button>
        </form>
        
        <div className="mt-12 text-center space-y-2">
          <p className="text-slate-400 text-[9px] font-black uppercase tracking-[0.4em]">
            Bản quyền © 2026 Tổ Tổng Hợp
          </p>
          <p className="text-police-gold/40 text-[8px] font-bold uppercase tracking-widest">Hệ thống Quản lý Văn bản và Điều hành Nhân sự</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
