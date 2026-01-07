
import React, { useState, useEffect, useRef } from 'react';
import { analyzeDocument } from './services/geminiService';
import { Task, User } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import History from './components/History';
import Login from './components/Login';
import PasswordChange from './components/PasswordChange';
import HRManagement from './components/HRManagement';

const INITIAL_USERS: User[] = [
  { id: '1', username: 'thang.ld', email: 'thang.ld@ndh.ca.gov.vn', password: '123456', name: "Lê Đình Thắng", role: "Quản lý", position: "Tổ trưởng", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '2', username: 'tuan.lq', email: 'tuan.lq@ndh.ca.gov.vn', password: '123456', name: "Lê Quốc Tuấn", role: "Quản lý", position: "Tổ phó", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '3', username: 'hao.nt', email: 'hao.nt@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Thị Hảo", role: "Quản lý", position: "Tổ phó", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '4', username: 'dao.pta', email: 'dao.pta@ndh.ca.gov.vn', password: '123456', name: "Phan Thị Anh Đào", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '5', username: 'huong.nt', email: 'huong.nt@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Thị Hường", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '6', username: 'trang.nq', email: 'trang.nq@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Quỳnh Trang", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '7', username: 'hang.cp', email: 'hang.cp@ndh.ca.gov.vn', password: '123456', name: "Cao Phương Hằng", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '8', username: 'suong.ntt', email: 'suong.ntt@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Thị Thu Sương", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '9', username: 'nguyen.nd', email: 'nguyen.nd@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Đình Nguyên", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '10', username: 'quynh.hh', email: 'quynh.hh@ndh.ca.gov.vn', password: '123456', name: "Hoàng Hương Quỳnh", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '11', username: 'linh.nk', email: 'linh.nk@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Khánh Linh", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '12', username: 'hai.hp', email: 'hai.hp@ndh.ca.gov.vn', password: '123456', name: "Hoàng Phi Hải", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '13', username: 'hue.ntn', email: 'hue.ntn@ndh.ca.gov.vn', password: '123456', name: "Nguyễn Thị Như Huế", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '14', username: 'huy.vvd', email: 'huy.vvd@ndh.ca.gov.vn', password: '123456', name: "Văn Viết Đức Huy", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '15', username: 'chung.lq', email: 'chung.lq@ndh.ca.gov.vn', password: '123456', name: "Lê Quang Chung", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 },
  { id: '16', username: 'dat.dvt', email: 'dat.dvt@ndh.ca.gov.vn', password: '123456', name: "Dương Văn Tiến Đạt", role: "Cán bộ", position: "Cán bộ", department: "Tổ Tổng hợp", status: "Hoạt động", points: 0, prestige: 100 }
];

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'history' | 'hr'>('dashboard');
  const [inputText, setInputText] = useState('');
  const [selectedOfficerId, setSelectedOfficerId] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successTask, setSuccessTask] = useState<Task | null>(null);
  const [imageFile, setImageFile] = useState<{ data: string, mimeType: string } | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showInputModal, setShowInputModal] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Sử dụng suffix v12 để reset cache dữ liệu cho mật khẩu mới
    const savedUser = localStorage.getItem('auth_user_cap_v12');
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    
    const savedTasks = localStorage.getItem('tasks_cap_v12');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    
    const savedUsers = localStorage.getItem('users_cap_v12');
    if (savedUsers) setUsers(JSON.parse(savedUsers));
    else {
      setUsers(INITIAL_USERS);
      localStorage.setItem('users_cap_v12', JSON.stringify(INITIAL_USERS));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks_cap_v12', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('users_cap_v12', JSON.stringify(users));
  }, [users]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('auth_user_cap_v12', JSON.stringify(user));
    // Nếu vẫn dùng mật khẩu mặc định, hiển thị màn hình đổi mật khẩu
    if (user.password === '123456') {
      setShowPasswordChange(true);
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('auth_user_cap_v12');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        setImageFile({ data: base64String, mimeType: file.type });
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!currentUser || !selectedOfficerId) {
      setError("Vui lòng chọn cán bộ tiếp nhận.");
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      const analysis = await analyzeDocument(inputText, imageFile || undefined);
      const officer = users.find(u => u.id === selectedOfficerId);
      
      if (!officer) throw new Error("Cán bộ không tồn tại");

      const newTask: Task = {
        id: crypto.randomUUID(),
        ...analysis,
        officer: officer.name,
        ownerId: officer.id,
        ownerEmail: officer.email,
        createdByEmail: currentUser.email,
        commanderName: currentUser.name,
        status: 'Đang làm',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        rawInput: inputText,
        prestige: 100,
        points: 0
      };

      setTasks(prev => [newTask, ...prev]);
      setSuccessTask(newTask);
      
      setInputText('');
      setPreviewUrl(null);
      setImageFile(null);
      setSelectedOfficerId("");
      setShowInputModal(false);
      setActiveTab('dashboard');
    } catch (err: any) {
      console.error(err);
      setError("Hệ thống trích xuất văn bản gặp lỗi. Đồng chí vui lòng thử lại.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleToggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === id) {
        const isCompleting = t.status === 'Đang làm';
        let awardedPoints = 0;
        let penaltyPrestige = 0;

        if (isCompleting) {
          const deadline = new Date(t.deadline).getTime();
          const REFERENCE_DATE = new Date('2026-01-06').getTime();
          
          if (Date.now() <= deadline) {
            awardedPoints = 10;
          } else {
            awardedPoints = 5;
            penaltyPrestige = 10;
          }

          setUsers(prevUsers => prevUsers.map(u => {
            if (u.id === t.ownerId) {
              return {
                ...u,
                points: (u.points || 0) + awardedPoints,
                prestige: Math.max(0, (u.prestige || 100) - penaltyPrestige)
              };
            }
            return u;
          }));
        }

        return {
          ...t,
          status: isCompleting ? 'Hoàn thành' : 'Đang làm',
          completedAt: isCompleting ? Date.now() : undefined,
          updatedAt: Date.now(),
          points: awardedPoints,
          prestige: 100 - penaltyPrestige
        };
      }
      return t;
    }));
  };

  const handleUpdatePassword = (newPassword: string) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, password: newPassword };
      setUsers(prev => prev.map(u => u.id === currentUser.id ? updatedUser : u));
      setCurrentUser(updatedUser);
      localStorage.setItem('auth_user_cap_v12', JSON.stringify(updatedUser));
      setShowPasswordChange(false);
      alert("Đồng chí đã cập nhật mật khẩu thành công!");
    }
  };

  const deleteTask = (id: string) => {
    if (window.confirm("Đồng chí có chắc chắn muốn xóa nhiệm vụ này?")) {
      setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  if (!currentUser) return <Login onLogin={handleLogin} masterData={users} />;

  const visibleTasks = currentUser.role === 'Quản lý' || currentUser.role === 'Super Admin'
    ? tasks.filter(t => t.ownerEmail === currentUser.email || t.createdByEmail === currentUser.email)
    : tasks.filter(t => t.ownerEmail === currentUser.email);

  return (
    <div className="min-h-screen bg-police-cream font-sans flex flex-col lg:flex-row">
      <aside className="hidden lg:flex w-72 bg-police-red flex-col sticky top-0 h-screen shadow-2xl z-50">
        <div className="p-8 flex flex-col items-center border-b border-white/10 bg-black/10">
           <div className="w-24 h-24 mb-6 bg-white p-1 rounded-full shadow-2xl emblem-glow">
             <img src="https://upload.wikimedia.org/wikipedia/vi/1/1b/Huy_hi%E1%BB%87u_C%C3%B4ng_an_nh%C3%A2n_d%C3%A2n_Vi%E1%BB%87t_Nam.png" className="w-full h-full object-contain" alt="Huy hiệu" />
           </div>
           <h1 className="font-black text-white text-sm uppercase text-center tracking-tight">Công an Phường</h1>
           <p className="text-[11px] text-police-gold font-bold uppercase tracking-[0.25em] mt-2 text-center">Nam Đông Hà</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 mt-4">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black transition-all ${activeTab === 'dashboard' ? 'bg-white/15 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
            <i className="fa-solid fa-layer-group text-lg"></i> Dashboard
          </button>
          <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black transition-all ${activeTab === 'history' ? 'bg-white/15 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
            <i className="fa-solid fa-book-journal-whills text-lg"></i> Nhật ký công tác
          </button>
          {currentUser.role === 'Quản lý' && (
            <button onClick={() => setActiveTab('hr')} className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-xs font-black transition-all ${activeTab === 'hr' ? 'bg-white/15 text-white shadow-inner' : 'text-white/60 hover:text-white hover:bg-white/5'}`}>
              <i className="fa-solid fa-id-card-clip text-lg"></i> Quản lý Cán bộ
            </button>
          )}
        </nav>

        <div className="p-5 border-t border-white/10 bg-black/5 mt-auto">
          <div className="flex items-center gap-3 p-4 bg-white/10 rounded-2xl border border-white/10">
             <div className="w-10 h-10 rounded-full bg-police-gold flex items-center justify-center text-police-red font-black text-sm shadow-xl">{currentUser.name.charAt(0)}</div>
             <div className="min-w-0">
                <p className="text-[11px] font-black text-white truncate">{currentUser.name}</p>
                <button onClick={handleLogout} className="text-[9px] font-bold text-police-gold uppercase tracking-tighter hover:underline">Thoát hệ thống</button>
             </div>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-h-screen">
        <Header activeTab={activeTab} setActiveTab={setActiveTab} user={currentUser} onLogout={handleLogout} />

        <main className="flex-1 p-4 sm:p-6 lg:p-10 pb-24 lg:pb-10 max-w-5xl mx-auto w-full">
           {activeTab === 'dashboard' && (
             <Dashboard 
               tasks={visibleTasks} 
               allTasks={tasks} 
               onDelete={deleteTask} 
               onToggleStatus={handleToggleTaskStatus} 
               currentUser={currentUser} 
             />
           )}
           {activeTab === 'history' && <History tasks={visibleTasks} onDelete={deleteTask} />}
           {activeTab === 'hr' && currentUser.role === 'Quản lý' && (
             <HRManagement users={users} onUpdateUser={u => setUsers(prev => prev.map(us => us.id === u.id ? u : us))} />
           )}
        </main>

        {successTask && (
          <div className="fixed inset-0 z-[200] bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4">
             <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border-t-8 border-police-gold animate-in zoom-in-95 duration-300">
                <div className="text-center mb-6">
                   <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-emerald-100 shadow-inner">
                      <i className="fa-solid fa-circle-check"></i>
                   </div>
                   <h3 className="text-xl font-black text-navy-900 uppercase">Giao việc thành công</h3>
                   <p className="text-xs text-slate-500 mt-2 font-medium">
                      Đã phân công nhiệm vụ cho đồng chí <span className="text-police-red font-bold">{successTask.officer}</span>.
                   </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-6 overflow-hidden">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-200 pb-2 flex items-center gap-2">
                     <i className="fa-solid fa-table"></i> Tóm tắt nhiệm vụ
                   </p>
                   <table className="w-full text-[11px] font-bold text-navy-900">
                      <tbody>
                         <tr className="border-b border-slate-100">
                            <td className="py-2 text-slate-400 font-medium w-1/3">Số hiệu</td>
                            <td className="py-2">{successTask.number || 'Chưa rõ'}</td>
                         </tr>
                         <tr className="border-b border-slate-100">
                            <td className="py-2 text-slate-400 font-medium">Hạn báo cáo</td>
                            <td className="py-2 text-police-red">{new Date(successTask.deadline).toLocaleDateString('vi-VN')}</td>
                         </tr>
                      </tbody>
                   </table>
                </div>

                <button onClick={() => setSuccessTask(null)} className="w-full py-4 bg-navy-900 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-black transition-all">Xác nhận và đóng</button>
             </div>
          </div>
        )}

        {currentUser.role !== 'Cán bộ' && (
          <button 
            onClick={() => { setShowInputModal(true); setSuccessTask(null); }}
            className="lg:hidden fixed bottom-20 right-6 w-14 h-14 bg-police-red text-white rounded-full shadow-2xl flex items-center justify-center z-40 active:scale-90 transition-transform border-4 border-white"
          >
            <i className="fa-solid fa-plus text-xl"></i>
          </button>
        )}

        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-police-gold/20 h-16 px-6 flex items-center justify-around z-40 pb-safe">
           <button onClick={() => setActiveTab('dashboard')} className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-police-red' : 'text-slate-400'}`}>
              <i className="fa-solid fa-house-shield text-lg"></i>
              <span className="text-[9px] font-black uppercase">Chính</span>
           </button>
           <button onClick={() => setActiveTab('history')} className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-police-red' : 'text-slate-400'}`}>
              <i className="fa-solid fa-clock-rotate-left text-lg"></i>
              <span className="text-[9px] font-black uppercase">Lịch sử</span>
           </button>
        </nav>
      </div>

      {showInputModal && (
        <div className="fixed inset-0 z-[100] bg-navy-950/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-3xl p-8 animate-in slide-in-from-bottom duration-300 border-t-8 border-police-red relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-police-gold/5 rounded-full -mr-8 -mt-8"></div>
             
             <div className="flex justify-between items-center mb-8 relative z-10">
                <h3 className="text-xl font-black text-police-red uppercase tracking-tight">Giao nhiệm vụ nghiệp vụ</h3>
                <button onClick={() => setShowInputModal(false)} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400"><i className="fa-solid fa-xmark text-lg"></i></button>
             </div>
             
             <div className="space-y-4 relative z-10">
                <div className="relative">
                  {!previewUrl ? (
                    <button onClick={() => fileInputRef.current?.click()} className="w-full py-12 border-2 border-dashed border-police-gold/30 rounded-2xl flex flex-col items-center gap-3 text-slate-400 hover:border-police-red hover:bg-red-50 transition-all bg-slate-50/50">
                      <i className="fa-solid fa-camera-viewfinder text-3xl text-police-gold/60"></i>
                      <span className="text-[10px] font-black uppercase tracking-widest">Chụp văn bản chỉ đạo</span>
                    </button>
                  ) : (
                    <div className="relative rounded-2xl overflow-hidden bg-navy-950 aspect-video flex items-center justify-center shadow-2xl ring-4 ring-police-gold/20">
                      <img src={previewUrl} className="max-h-full max-w-full object-contain" />
                      <button onClick={() => {setPreviewUrl(null); setImageFile(null);}} className="absolute top-3 right-3 w-8 h-8 bg-police-red/90 text-white rounded-full flex items-center justify-center backdrop-blur-md shadow-lg"><i className="fa-solid fa-trash-can text-sm"></i></button>
                    </div>
                  )}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" capture="environment" onChange={handleFileChange} />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Phân công cán bộ đảm nhiệm</label>
                  <select 
                    value={selectedOfficerId} 
                    onChange={e => setSelectedOfficerId(e.target.value)} 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-navy-900 focus:border-police-gold outline-none shadow-inner"
                  >
                    <option value="">-- Chọn đồng chí tiếp nhận --</option>
                    {users.filter(u => u.status === 'Hoạt động').map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.position})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1 tracking-widest">Nội dung chỉ huy yêu cầu</label>
                  <textarea 
                    value={inputText} 
                    onChange={e => setInputText(e.target.value)} 
                    className="w-full h-24 p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium resize-none focus:border-police-gold outline-none shadow-inner" 
                    placeholder="Nhập tóm tắt hoặc yêu cầu nghiệp vụ cụ thể..." 
                  />
                </div>

                {error && <p className="text-[11px] text-police-red font-bold text-center italic border-l-4 border-police-red pl-2">{error}</p>}

                <button 
                  onClick={handleAnalyze} 
                  disabled={isAnalyzing || (!inputText && !imageFile) || !selectedOfficerId} 
                  className={`w-full py-5 rounded-xl font-black text-xs uppercase tracking-widest text-white transition-all shadow-xl ${isAnalyzing || (!inputText && !imageFile) || !selectedOfficerId ? 'bg-slate-200' : 'bg-police-red hover:bg-red-800 shadow-red-100'}`}
                >
                   {isAnalyzing ? <><i className="fa-solid fa-spinner animate-spin mr-2"></i> Hệ thống đang trích xuất...</> : 'Xác nhận giao nhiệm vụ'}
                </button>
             </div>
          </div>
        </div>
      )}

      {showPasswordChange && <PasswordChange userName={currentUser.name} onComplete={handleUpdatePassword} />}
    </div>
  );
};

export default App;
