'use client';

import { ChevronLeft, ShieldCheck, FileCheck, Globe, Building2, Calendar, Fingerprint } from 'lucide-react';
import Link from 'next/link';

export default function CertificatePage() {
    return (
        <div className="max-w-4xl mx-auto pb-20 animate-fade-in space-y-8">
            
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">Digital Credentials</h1>
                    <p className="text-text-secondary text-xs mt-1 font-bold uppercase tracking-widest font-mono opacity-60">Verified Business License</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-success/10 border border-success/20 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-success" />
                    <span className="text-[10px] font-black text-success uppercase tracking-[0.2em]">Authentic</span>
                </div>
            </div>

            {/* Premium Digital Certificate */}
            <div className="relative group animate-scale-in">
                {/* Background holographic glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary via-accent to-primary rounded-[40px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-1000" />
                
                <div className="relative glass-card-strong border border-white/10 p-12 overflow-hidden rounded-[40px]">
                    
                    {/* Digital Watermark Pattern */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-[100px]" />

                    {/* Certificate Content */}
                    <div className="relative z-10 space-y-12">
                        
                        {/* Title Section */}
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl">
                                        <Building2 size={32} className="text-primary-light" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter leading-none">Simple Money Inc.</h2>
                                        <p className="text-primary-light text-[10px] font-black uppercase tracking-[0.3em] mt-2">Master Business License</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 px-3 py-1.5 rounded-lg bg-white/5 w-fit border border-white/5">
                                    <Globe size={14} className="text-text-secondary" />
                                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Jurisdiction: Ontario, Canada</span>
                                </div>
                            </div>
                            <div className="text-right font-mono space-y-1">
                                <span className="text-[9px] font-black text-text-secondary uppercase tracking-widest block opacity-50">License Registration ID</span>
                                <span className="text-xl font-black text-white tracking-widest">REG-753318302</span>
                            </div>
                        </div>

                        {/* Main Body Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-white/5">
                            
                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest block opacity-50 flex items-center gap-2">
                                        <Calendar size={12} /> Issuance Timeline
                                    </span>
                                    <div className="flex gap-8">
                                        <div>
                                            <p className="text-[10px] text-text-secondary uppercase mb-1">Date Issued</p>
                                            <p className="text-sm font-black text-white font-mono">2022-01-21</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-text-secondary uppercase mb-1">Renewal Date</p>
                                            <p className="text-sm font-black text-white font-mono">2027-01-21</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest block opacity-50">Type of Legal Entity</span>
                                    <p className="text-lg font-black text-white uppercase tracking-tight">General Partnership (LTD)</p>
                                    <p className="text-[10px] font-bold text-text-secondary leading-relaxed uppercase tracking-wider opacity-60">
                                        Registered with 2 verified partners under Canadian Business Corporations Act.
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest block opacity-50 flex items-center gap-2">
                                        <Fingerprint size={12} /> Digital Signature
                                    </span>
                                    <p className="text-[10px] font-mono text-primary-light break-all bg-primary/5 p-3 rounded-xl border border-primary/10">
                                        SHA256: 8f92b7c1d3e5f4a6b2c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9k
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <span className="text-[10px] font-black text-text-secondary uppercase tracking-widest block opacity-50">Mailing Matrix</span>
                                    <p className="text-xs font-bold text-white uppercase leading-relaxed tracking-wider">
                                        250 Schoolhouse Street, Coquitlam,<br />
                                        British Columbia, Canada, V3K 6V7
                                    </p>
                                </div>
                            </div>

                        </div>

                        {/* Verification Footer */}
                        <div className="pt-12 mt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-6">
                                <div className="w-24 h-24 rounded-full border-2 border-primary/20 p-2 flex items-center justify-center relative">
                                    <div className="absolute inset-0 border border-primary/40 border-dashed rounded-full animate-spin-slow" />
                                    <div className="w-full h-full rounded-full bg-primary/10 flex items-center justify-center flex-col text-center">
                                        <span className="text-[8px] font-black text-primary-light uppercase tracking-tighter leading-tight">Secured By</span>
                                        <span className="text-[10px] font-black text-white uppercase tracking-widest">CANADA</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-[10px] font-black text-success uppercase tracking-[0.3em] block mb-1">Status: Active & Valid</span>
                                    <p className="text-[9px] font-bold text-text-secondary uppercase tracking-widest leading-relaxed max-w-[200px] opacity-50">
                                        This digital certificate is cryptographically signed and verified by the Simple Money compliance module.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white uppercase tracking-widest hover:bg-white/10 transition-colors">
                                    Verify Hash
                                </button>
                                <button className="px-6 py-3 bg-primary/20 border border-primary/30 rounded-xl text-[10px] font-black text-primary-light uppercase tracking-widest hover:bg-primary/30 transition-colors">
                                    Print Credentials
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Support Notice */}
            <div className="flex items-center justify-center gap-3 text-text-secondary opacity-50">
                <FileCheck size={14} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Compliance ID: SM-CERT-2022-ONLINE</span>
            </div>

        </div>
    );
}
