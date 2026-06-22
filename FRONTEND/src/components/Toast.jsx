import React from 'react';
import useStore from '../store/useStore';

export default function Toast() {
  const toasts = useStore((state) => state.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div key={toast.id} className={`bg-white border-2 border-[#111111] p-4 flex items-center gap-3 hard-shadow transform transition-all duration-300 translate-y-0 opacity-100 min-w-[300px]`}>
          <span className={`material-symbols-outlined text-2xl ${toast.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>
            {toast.type === 'error' ? 'error' : 'check_circle'}
          </span>
          <div className="flex flex-col">
            <span className="font-inter font-black text-xs uppercase tracking-wider text-[#111111]">
              {toast.type === 'error' ? 'Error' : 'Success'}
            </span>
            <span className="font-body-md text-slate-600 font-medium">
              {toast.message}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
