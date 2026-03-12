'use client';

import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, Award, ShieldCheck, CheckCircle2, Globe, Building, Download, Share2 } from 'lucide-react';
import Link from 'next/link';

export default function CertificatePage() {
    const { profile } = useAuth();
    const { t } = useLanguage();

    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div className="space-y-8 pb-24">
            {/* Header */}
            <div className="flex items-center gap-4 animate-slide-up">
                <Link href="/home" className="p-2 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-primary/10 transition-all text-text-primary hover:text-primary">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-text-primary tracking-tight uppercase">Platform Certificate</h1>
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] opacity-60">Authentication & compliance</p>
                </div>
            </div>

            {/* Certificate Area */}
            <div className="relative group perspective-1000 animate-slide-up [animation-delay:0.1s]">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-[60px] blur-3xl opacity-30 group-hover:opacity-60 transition duration-1000"></div>
                
                <div className="relative glass-card-strong p-1 rounded-[48px] overflow-hidden border border-white/10 shadow-2xl shadow-primary/20">
                    <div className="relative rounded-[46px] overflow-hidden aspect-[1/1.4] md:aspect-[1.4/1] min-h-[600px] flex items-center justify-center p-8 md:p-16">
                        {/* High-fidelity Background */}
                        <div className="absolute inset-0">
                            <img 
                                src="/certificate-bg.png" 
                                alt="Certificate Background" 
                                className="w-full h-full object-cover opacity-90 dark:opacity-100 contrast-[1.1] brightness-[0.9]"
                            />
                            {/* Overlay gradients for readability */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 marker:pointer-events-none" />
                        </div>
                        
                        {/* Certificate Content Overlay */}
                        <div className="relative z-10 w-full h-full flex flex-col items-center justify-between text-center py-4 md:py-8">
                            <div className="space-y-6">
                                <div className="flex justify-center">
                                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary via-primary-dark to-accent p-0.5 shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-500">
                                        <div className="w-full h-full rounded-[14px] bg-[#0a0510] flex items-center justify-center border border-white/10">
                                            <Award size={40} className="text-primary-light" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-serif font-black text-white tracking-tight drop-shadow-lg">
                                        Certificate of Achievement
                                    </h2>
                                    <div className="flex items-center justify-center gap-6 mt-4">
                                        <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-primary/60" />
                                        <p className="text-[10px] font-black text-primary-light uppercase tracking-[0.5em] drop-shadow-md">Professional Node Optimizer</p>
                                        <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-primary/60" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-8 flex-1 flex flex-col justify-center max-w-2xl">
                                <p className="text-sm text-white/50 italic font-serif tracking-widest uppercase">This prestigious honor is conferred upon</p>
                                <div className="relative inline-block">
                                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-widest px-8 py-2">
                                        {profile?.username || 'Valued Member'}
                                    </h3>
                                    <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                                </div>
                                <p className="text-xs md:text-sm text-white/70 leading-[1.8] font-medium px-4 md:px-12 backdrop-blur-[2px] py-4">
                                    For unparalleled dedication to system integrity and neural data excellence. 
                                    By consistently meeting the optimized thresholds of the <span className="text-primary-light font-bold">Global Neural Data Federation</span>, 
                                    the recipient is hereby certified as a verified professional for <span className="text-white font-bold">VIP Level {profile?.level_id || 1}</span> operations.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-end">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-32 h-[1px] bg-white/20" />
                                    <div className="flex flex-col items-center">
                                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none mb-2">Issue Date</span>
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">{today}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center -mb-8 scale-110 group-hover:scale-125 transition-transform duration-700">
                                    <div className="relative w-24 h-24 flex items-center justify-center">
                                        {/* Rotating Seals */}
                                        <div className="absolute inset-0 border-4 border-double border-primary/40 rounded-full animate-spin-slow" />
                                        <div className="absolute inset-2 border border-primary/20 rounded-full animate-reverse-spin" />
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent-dark flex items-center justify-center shadow-2xl">
                                            <ShieldCheck size={32} className="text-white" />
                                        </div>
                                    </div>
                                    <span className="text-[8px] font-black text-primary-light uppercase tracking-[0.3em] mt-3">Verified Official</span>
                                </div>

                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-32 h-[1px] bg-white/20" />
                                    <div className="flex flex-col items-center">
                                        <span className="text-[9px] font-black text-white/40 uppercase tracking-widest leading-none mb-2">Authentication ID</span>
                                        <span className="text-[10px] font-bold text-white font-mono opacity-80 uppercase tracking-tighter">
                                            {profile?.id?.slice(0, 18).toUpperCase() || 'OPT-NODE-PROTOCOL'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4 animate-slide-up [animation-delay:0.3s]">
                <button className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/30 hover:bg-primary-hover transition-all">
                    <Download size={18} />
                    Download PDF
                </button>
                <button className="flex items-center justify-center gap-3 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-text-primary font-black uppercase tracking-widest text-xs hover:bg-black/10 dark:hover:bg-white/10 transition-all">
                    <Share2 size={18} />
                    Share Proof
                </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-slide-up [animation-delay:0.4s]">
                <div className="glass-card p-6 flex gap-4">
                    <CheckCircle2 className="text-success shrink-0" size={24} />
                    <div>
                        <h4 className="text-xs font-black text-text-primary uppercase tracking-wider mb-1">Authenticity Guaranteed</h4>
                        <p className="text-[10px] text-text-secondary font-medium leading-relaxed">This certificate is digitally signed and logged on the platform's distributed ledger for permanent verification.</p>
                    </div>
                </div>
                <div className="glass-card p-6 flex gap-4">
                    <Globe className="text-accent shrink-0" size={24} />
                    <div>
                        <h4 className="text-xs font-black text-text-primary uppercase tracking-wider mb-1">Global Recognition</h4>
                        <p className="text-[10px] text-text-secondary font-medium leading-relaxed">Valid for optimization operations across all supported regional servers and neural network clusters.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
