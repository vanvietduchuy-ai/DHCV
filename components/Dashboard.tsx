
import React from 'react';
import { Task, User } from '../types';
import TaskCard from './TaskCard';

interface DashboardProps {
  tasks: Task[];
  allTasks: Task[];
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  currentUser: User;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, allTasks, onDelete, onToggleStatus, currentUser }) => {
  const isManager = currentUser.role !== 'Cán bộ';

  // Nhiệm vụ cần mình làm
  const myTasks = tasks.filter(t => t.ownerEmail === currentUser.email);
  // Nhiệm vụ mình đã giao (nếu là quản lý)
  const assignedByMe = allTasks.filter(t => t.createdByEmail === currentUser.email && t.ownerEmail !== currentUser.email);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Profile & Stats Card */}
      <div className="bg-navy-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl border-b-8 border-police-gold/50">
         <div className="absolute top-0 right-0 w-80 h-80 bg-police-gold/10 rounded-full blur-[120px] -mr-40 -mt-40"></div>
         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
               <span className="px-3 py-1 bg-police-gold text-navy-900 text-[10px] font-black uppercase rounded-lg shadow-sm">
                  Phiên công tác: 06/01/2026
               </span>
               <span className="px-3 py-1 bg-white/10 text-white text-[10px] font-bold uppercase rounded-lg border border-white/10">
                  {currentUser.position}
               </span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
               <div>
                  <h2 className="text-2xl lg:text-3xl font-black mb-1">
                     Chào đồng chí, <span className="text-police-gold">{currentUser.name}</span>
                  </h2>
                  <p className="text-xs text-white/50 font-medium">Báo cáo tình hình công tác trong ngày.</p>
               </div>
               
               <div className="grid grid-cols-2 gap-3 shrink-0">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[120px]">
                     <p className="text-[9px] font-black text-police-gold uppercase mb-1 tracking-widest">Điểm thi đua</p>
                     <p className="text-2xl font-black">{currentUser.points || 0}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-center min-w-[120px]">
                     <p className="text-[9px] font-black text-police-gold uppercase mb-1 tracking-widest">Độ uy tín</p>
                     <p className="text-2xl font-black text-emerald-400">{currentUser.prestige || 100}%</p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Nhiệm vụ của tôi */}
      <section className="space-y-5">
        <div className="flex items-center justify-between px-2">
           <h3 className="text-sm font-black uppercase tracking-[0.2em] text-navy-900 flex items-center gap-3">
             <div className="w-2 h-6 bg-police-red rounded-full"></div>
             Nhiệm vụ đồng chí trực tiếp đảm nhiệm
           </h3>
           <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{myTasks.length} chỉ đạo</span>
        </div>
        
        <div className="grid grid-cols-1 gap-5">
          {myTasks.length === 0 ? (
            <div className="py-20 bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-300">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <i className="fa-solid fa-clipboard-check text-4xl opacity-10"></i>
               </div>
               <p className="text-xs font-bold italic">Đồng chí chưa có nhiệm vụ nào cần thực hiện.</p>
            </div>
          ) : (
            myTasks.sort((a,b) => b.updatedAt - a.updatedAt).map(task => (
              <TaskCard key={task.id} task={task} onDelete={onDelete} onToggleStatus={onToggleStatus} currentUser={currentUser} />
            ))
          )}
        </div>
      </section>

      {/* Nhiệm vụ đã chỉ đạo (dành cho Quản lý) */}
      {isManager && assignedByMe.length > 0 && (
        <section className="space-y-5 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between px-2">
             <h3 className="text-sm font-black uppercase tracking-[0.2em] text-navy-900 flex items-center gap-3">
               <div className="w-2 h-6 bg-police-gold rounded-full"></div>
               Giám sát tiến độ nhiệm vụ đã phân công
             </h3>
             <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase">{assignedByMe.length} cán bộ</span>
          </div>
          <div className="grid grid-cols-1 gap-5">
            {assignedByMe.sort((a,b) => b.updatedAt - a.updatedAt).map(task => (
              <TaskCard key={task.id} task={task} onDelete={onDelete} onToggleStatus={onToggleStatus} currentUser={currentUser} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
