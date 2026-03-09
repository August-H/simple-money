'use client';

import { X, CheckCircle, Smartphone, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import type { TaskItem } from '@/lib/types';

interface ItemDetailModalProps {
    item: TaskItem | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (item: TaskItem) => void;
}

export default function ItemDetailModal({ 
    item, 
    isOpen, 
    onClose, 
    onSubmit
}: ItemDetailModalProps) {
    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            {/* Backdrop with heavy blur */}
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />

            {/* Modal Container */}
            <div
                className="relative w-full max-w-[400px] glass-card-glow overflow-hidden animate-scale-in border border-white/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/20 blur-[60px] rounded-full pointer-events-none" />

                {/* Header / Product Type */}
                <div className="p-6 pb-0 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_var(--color-primary)]" />
                        <span className="text-[10px] font-black text-text-secondary uppercase tracking-[0.3em]">Matched Task</span>
                    </div>
                </div>

                {/* Product Visual Centerpiece */}
                <div className="p-8 pb-4 flex flex-col items-center relative z-10">
                    <div className="w-48 h-48 rounded-[40px] bg-white/5 border border-white/10 p-4 shadow-2xl relative group mb-6">
                        <div className="absolute inset-0 bg-primary/10 rounded-[40px] scale-0 group-hover:scale-100 transition-transform duration-700 blur-2xl" />
                        <img
                            src={item.image_url}
                            alt={item.title}
                            className="w-full h-full object-cover rounded-[24px] relative z-10 shadow-lg"
                            onError={e => {
                                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${item.id}/400/300`;
                            }}
                        />
                        <div className="absolute -bottom-2 -right-2 bg-success p-2 rounded-xl shadow-[0_0_15px_var(--color-success)] z-20">
                            <CheckCircle size={20} className="text-white" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-black text-white text-center uppercase tracking-tight leading-tight px-4">{item.title}</h2>
                    <div className="mt-2 flex items-center gap-2">
                        <span className="text-[10px] font-black text-primary-light uppercase tracking-widest bg-primary/10 px-2 py-1 rounded border border-primary/20">
                            Task Required
                        </span>
                    </div>
                </div>

                {/* Financial Summary */}
                <div className="px-8 space-y-3 mb-8 relative z-10">
                    <div className="glass-card p-4 border border-white/5 bg-white/[0.02]">
                        <div className="flex justify-between items-center text-[10px] font-black text-text-secondary uppercase tracking-widest mb-1.5 opacity-60">
                            <span>Product Value</span>
                            <span>Network Status</span>
                            <span>Projected Profit</span>
                        </div>
                        <div className="flex justify-between items-end">
                            <span className="text-sm font-black text-white italic opacity-40">Calculating...</span>
                            <span className="text-[10px] font-black text-primary-light animate-pulse">ACTIVE</span>
                            <div className="flex items-center gap-1.5 text-success">
                                <Zap size={14} className="fill-success animate-bounce" />
                                <span className="text-sm font-black shadow-success/20 uppercase">Analyzing</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-3 px-2">
                        <ShieldCheck size={14} className="text-primary-light" />
                        <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest leading-relaxed">
                            Verified matching protocols active. Task completion will process instantly.
                        </p>
                    </div>
                </div>

                {/* Action Button */}
                <div className="px-8 pb-8 relative z-10">
                    <button
                        onClick={() => onSubmit(item)}
                        className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/25 hover:bg-primary-light transition-all flex items-center justify-center gap-3 group cursor-pointer"
                    >
                        Submit <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

            </div>
        </div>
    );
}
