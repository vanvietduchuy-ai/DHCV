
import React, { useState } from 'react';
import { Task, User } from '../types';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  currentUser: User;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onDelete, onToggleStatus, currentUser }) => {
  const [expanded, setExpanded] = useState(false);
  const isOwner = currentUser.email === task.ownerEmail;
  const isCreator = currentUser.email === task.createdByEmail;

  const deadlineDate = new Date(task.deadline);
  const REFERENCE_DATE = new Date('2026-01-06');
  const isOverdue = task.status === 'Đang làm' && deadlineDate.getTime() < REFERENCE_DATE.getTime();
  const isApproaching = task.status === 'Đang làm' && !isOverdue && (deadlineDate.getTime() - REFERENCE_DATE.getTime()) <= (2 * 24 * 60 * 60 * 1000);

  return (
    <div className={`bg-white rounded-3xl border-2 transition-all overflow-hidden shadow-sm ${task.status === 'Hoàn thành' ? 'bg-slate-50 border-slate-100 opacity-90' : 'border-slate-200 hover:border-police-red/30 hover:shadow-xl'}`}>
      <div className="p-6 cursor-pointer flex items-center justify-between gap-4" onClick={() => setExpanded(!expanded)}>
        <div className="flex-1 min-w-0">
           <div className="flex items-center gap-3 mb-3">
              <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border flex items-center gap-1.5 ${
                task.status === 'Hoàn thành' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                isOverdue ? 'bg-red-50 text-police-red border-red-100' : 
                isApproaching ? 'bg-amber-50 text-amber-600 border-amber-100' :
                'bg-navy-50 text-navy-600 border-navy-100'
              }`}>
                {task.status === 'Hoàn thành' ? '🟢 Đã hoàn thành' : 
                 isOverdue ? '🔴 Quá hạn báo cáo' : 
                 isApproaching ? '⚠️ Sắp đến hạn' : '🔵 Đang thực hiện'}
              </span>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">Số: {task.number || 'Chưa rõ'}</p>
           </div>
           
           <h3 className={`text-sm lg:text-base font-bold text-navy-900 leading-snug line-clamp-2 ${task.status === 'Hoàn thành' ? 'line-through text-slate-400' : ''}`}>
             {task.content}
           </h3>
           
           <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-5">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-police-gold/10 flex items-center justify-center">
                  <i className="fa-solid fa-user-tie text-police-gold text-[10px]"></i>
                </div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tighter">Chỉ huy: <span className="text-navy-900">{task.commanderName}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-police-red/10 flex items-center justify-center">
                  <i className="fa-solid fa-user-shield text-police-red text-[10px]"></i>
                </div>
                <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tighter">Thực hiện: <span className="text-navy-900">{task.officer}</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
                  <i className="fa-solid fa-calendar-day text-slate-400 text-[10px]"></i>
                </div>
                <span className={`text-[11px] font-black ${isOverdue ? 'text-police-red underline decoration-2' : 'text-slate-500'}`}>Hạn: {deadlineDate.toLocaleDateString('vi-VN')}</span>
              </div>
           </div>
        </div>
        <div className={`w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 transition-transform ${expanded ? 'rotate-180 bg-navy-50 text-navy-600 border-navy-100' : ''}`}>
          <i className="fa-solid fa-chevron-down text-[12px]"></i>
        </div>
      </div>

      {expanded && (
        <div className="px-6 pb-8 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="space-y-6">
            <div className="bg-police-cream/60 p-5 rounded-2xl border border-police-gold/20 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-police-gold/5 rounded-full -mr-12 -mt-12"></div>
              <p className="text-[10px] font-black text-police-red uppercase mb-4 tracking-[0.2em] flex items-center gap-2 relative z-10">
                <i className="fa-solid fa-list-check"></i> Yêu cầu nghiệp vụ chi tiết
              </p>
              <ul className="space-y-3 relative z-10">
                {task.nextSteps.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-xs font-semibold text-slate-700 leading-relaxed">
                    <div className="w-5 h-5 rounded-lg bg-white border border-police-gold/20 flex items-center justify-center text-[10px] font-black text-police-gold shrink-0 mt-0.5 shadow-sm">{idx + 1}</div>
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {task.status === 'Hoàn thành' && (
              <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                       <i className="fa-solid fa-award"></i>
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-emerald-600 uppercase">Kết quả thi đua</p>
                       <p className="text-xs font-bold text-emerald-800">+{task.points} điểm | Uy tín: {task.prestige}%</p>
                    </div>
                 </div>
                 <p className="text-[9px] font-bold text-emerald-500 uppercase italic">Đã đồng bộ</p>
              </div>
            )}

            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
               <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Giao chỉ đạo: {new Date(task.createdAt).toLocaleString('vi-VN')}</span>
                  {task.completedAt && (
                    <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Báo cáo kết quả: {new Date(task.completedAt).toLocaleString('vi-VN')}</span>
                  )}
               </div>
               
               <div className="flex items-center gap-3">
                 {isCreator && (
                   <button onClick={() => onDelete(task.id)} className="px-5 py-3 text-police-red text-[10px] font-black uppercase tracking-widest hover:bg-red-50 rounded-xl transition-all border border-transparent hover:border-red-100">Xóa chỉ đạo</button>
                 )}
                 {isOwner && task.status !== 'Hoàn thành' && (
                   <button 
                     onClick={() => onToggleStatus(task.id)} 
                     className="px-8 py-3.5 bg-police-red text-white rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-red-100 active:scale-95 transition-all flex items-center gap-3"
                   >
                     <i className="fa-solid fa-paper-plane"></i> Báo cáo hoàn thành
                   </button>
                 )}
                 {isOwner && task.status === 'Hoàn thành' && (
                    <button 
                      onClick={() => onToggleStatus(task.id)} 
                      className="px-6 py-3 bg-slate-200 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-300 transition-colors"
                    >
                      Kiểm tra lại (Mở lại)
                    </button>
                 )}
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
