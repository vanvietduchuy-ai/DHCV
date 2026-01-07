
import React, { useState } from 'react';
import { User } from '../types';

interface HeaderProps {
  activeTab: 'dashboard' | 'history' | 'hr';
  setActiveTab: (tab: 'dashboard' | 'history' | 'hr') => void;
  user: User;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, user, onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const confirmLogout = () => {
    setShowLogoutConfirm(false);
    onLogout();
  };

  return (
    <header className="bg-white border-b border-police-gold/20 sticky top-0 z-50 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center p-0.5 bg-white rounded-full shadow-sm">
            <img 
               src="https://upload.wikimedia.org/wikipedia/vi/1/1b/Huy_hi%E1%BB%87u_C%C3%B4ng_an_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam.png" 
               alt="Huy hiệu" 
               className="w-full h-full object-contain"
             />
          </div>
          <div className="hidden sm:block">
            <h1 className="font-black text-police-red text-sm uppercase tracking-tight leading-none">Nam Đông Hà</h1>
            <p className="text-[8px] text-police-gold font-bold tracking-widest uppercase mt-0.5">Cổng Thông tin Quản trị</p>
          </div>
        </div>

        <nav className="flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'dashboard'
                ? 'bg-police-red text-white shadow-md'
                : 'text-slate-500 hover:text-red-700'
            }`}
          >
            Nhiệm vụ
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'history'
                ? 'bg-police-red text-white shadow-md'
                : 'text-slate-500 hover:text-red-700'
            }`}
          >
            Lịch sử
          </button>
          {user.role === 'Super Admin' && (
            <button
              onClick={() => setActiveTab('hr')}
              className={`hidden sm:flex px-4 py-1.5 rounded-lg text-xs font-bold transition-all items-center gap-2 ${
                activeTab === 'hr'
                  ? 'bg-police-green text-white shadow-md'
                  : 'text-slate-500 hover:text-green-700'
              }`}
            >
              Cán bộ
            </button>
          )}
        </nav>

        <div className="flex items-center gap-4 pl-4 border-l border-slate-100">
          <div className="text-right flex flex-col items-end">
            <div className="flex items-center gap-2">
               <span className={`text-[8px] font-black uppercase px-1.5 py-0.5 rounded border ${
                 user.role === 'Super Admin' ? 'bg-police-gold/10 text-police-gold border-police-gold/20' : 'bg-slate-100 text-slate-600 border-slate-200'
               }`}>
                {user.role}
              </span>
              <p className="font-bold text-navy-900 text-sm">{user.name}</p>
            </div>
            <button 
              onClick={() => setShowLogoutConfirm(true)}
              className="text-[9px] font-black text-police-red uppercase tracking-wider hover:underline mt-0.5"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>

      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[200] bg-navy-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8 border border-slate-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-50 text-police-red rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 border border-red-100 shadow-inner">
                <i className="fa-solid fa-person-running"></i>
              </div>
              <h3 className="text-lg font-bold text-navy-900">Xác nhận Bàn giao</h3>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                Đồng chí có chắc chắn muốn kết thúc phiên làm việc không? Trân trọng.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setShowLogoutConfirm(false)}
                className="py-3.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200"
              >
                Hủy bỏ
              </button>
              <button 
                onClick={confirmLogout}
                className="py-3.5 bg-police-red text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-700 shadow-lg shadow-red-100"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
