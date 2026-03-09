'use client';

import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import { 
    ShieldCheck, 
    Wallet, 
    Mail, 
    ChevronRight, 
    LogOut, 
    Settings,
    CheckCircle,
    Users,
    ArrowDownToLine,
    ArrowUpFromLine,
    FileText,
    Building2,
    Award
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ProfilePage() {
    const { profile, signOut } = useAuth();
    const { t } = useLanguage();
    const { format } = useCurrency();
    const [copied, setCopied] = useState(false);

    const copyReferralCode = () => {
        if (profile?.referral_code) {
            navigator.clipboard.writeText(profile.referral_code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div className="space-y-8 animate-fade-in pb-12">
            
            {/* Profile Header */}
            <div className="flex items-center gap-6 p-2">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-primary-light p-1 shadow-lg shadow-primary/20">
                    <div className="w-full h-full rounded-[20px] bg-surface flex items-center justify-center border border-black/10 dark:border-white/10 overflow-hidden">
                        <span className="text-3xl font-black text-text-primary">
                            {profile?.username?.[0].toUpperCase() || 'U'}
                        </span>
                    </div>
                </div>
                <div>
                    <h2 className="text-2xl font-black text-text-primary uppercase tracking-tight">{profile?.username || 'User'}</h2>
                    <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-black uppercase tracking-widest text-text-secondary bg-black/5 dark:bg-white/5 px-2 py-1 rounded border border-black/5 dark:border-white/5">
                            {t('employee_id')}: {profile?.referral_code || '------'}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_var(--color-success)]" />
                    </div>
                </div>
            </div>

            {/* Wallet Quick Summary */}
            <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-6 border-l-4 border-l-primary relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full" />
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-1">{t('balance')}</p>
                    <p className="text-2xl font-black text-text-primary">{format(profile?.wallet_balance ?? 0)}</p>
                </div>
                <div className="glass-card p-6 border-l-4 border-l-accent relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-accent/5 rounded-bl-full" />
                    <p className="text-[10px] font-black text-text-secondary uppercase tracking-[0.2em] mb-1">{t('total_profit')}</p>
                    <p className="text-2xl font-black text-text-primary">{format(profile?.profit ?? 0)}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
                <Link href="/deposit" className="glass-card p-4 flex items-center justify-center gap-3 group hover:bg-success/5 border-transparent hover:border-success/20 transition-all">
                    <div className="w-8 h-8 rounded-full bg-success/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowDownToLine size={16} className="text-success" />
                    </div>
                    <span className="font-bold text-sm text-text-primary tracking-wide uppercase">{t('deposit')}</span>
                </Link>
                <Link href="/withdraw" className="glass-card p-4 flex items-center justify-center gap-3 group hover:bg-danger/5 border-transparent hover:border-danger/20 transition-all">
                    <div className="w-8 h-8 rounded-full bg-danger/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <ArrowUpFromLine size={16} className="text-danger" />
                    </div>
                    <span className="font-bold text-sm text-text-primary tracking-wide uppercase">{t('withdraw')}</span>
                </Link>
            </div>

            {/* Activity & Records */}
            <div>
                <h3 className="text-sm font-black text-text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <FileText size={16} className="text-primary" />
                    {t('activity_records')}
                </h3>
                <div className="glass-card divide-y divide-black/5 dark:divide-white/5 overflow-hidden">
                    {[
                        { icon: CheckCircle, label: t('task_history'), href: '/record' },
                        { icon: ArrowDownToLine, label: t('deposit_record'), href: '/record/deposit' },
                        { icon: ArrowUpFromLine, label: t('withdrawal_record'), href: '/record/withdraw' },
                    ].map((item, idx) => (
                        <Link key={idx} href={item.href} className="flex items-center justify-between p-5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-text-secondary group-hover:bg-white/10 group-hover:text-primary transition-colors">
                                    <item.icon size={20} />
                                </div>
                                <span className="font-bold text-text-primary text-sm uppercase tracking-wide">{item.label}</span>
                            </div>
                            <ChevronRight size={18} className="text-text-secondary group-hover:translate-x-1 group-hover:text-primary transition-all" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Security Hub Section */}
            <div>
                <h3 className="text-sm font-black text-text-primary uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <ShieldCheck size={16} className="text-primary" />
                    {t('security_hub')}
                </h3>
                <div className="glass-card divide-y divide-black/5 dark:divide-white/5 overflow-hidden">
                    {[
                        { icon: ShieldCheck, label: t('security_center'), href: '/profile/security' },
                        { icon: Wallet, label: t('wallet_address'), href: '/profile/wallet' },
                        { icon: Mail, label: t('bind_email'), href: '/profile/email' }
                    ].map((item, idx) => (
                        <Link key={idx} href={item.href} className="flex items-center justify-between p-5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-text-secondary group-hover:bg-white/10 group-hover:text-primary transition-colors">
                                    <item.icon size={20} />
                                </div>
                                <span className="font-bold text-text-primary text-sm uppercase tracking-wide">{item.label}</span>
                            </div>
                            <ChevronRight size={18} className="text-text-secondary group-hover:translate-x-1 group-hover:text-primary transition-all" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Settings & System */}
            <div className="space-y-4">
                <div className="glass-card divide-y divide-black/5 dark:divide-white/5 overflow-hidden">
                    <Link href="/profile/info" className="w-full p-5 flex items-center justify-between group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all">
                        <div className="flex items-center gap-4 text-text-secondary group-hover:text-text-primary transition-colors">
                            <Users size={20} />
                            <span className="font-bold text-text-primary text-sm uppercase tracking-wide">{t('my_information')}</span>
                        </div>
                        <ChevronRight size={18} className="text-text-secondary group-hover:translate-x-1 group-hover:text-primary transition-all" />
                    </Link>
                    <Link href="/levels" className="w-full p-5 flex items-center justify-between group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all">
                        <div className="flex items-center gap-4 text-text-secondary group-hover:text-text-primary transition-colors">
                            <Award size={20} />
                            <span className="font-bold text-text-primary text-sm uppercase tracking-wide">{t('employee_levels')}</span>
                        </div>
                        <ChevronRight size={18} className="text-text-secondary group-hover:translate-x-1 group-hover:text-primary transition-all" />
                    </Link>
                    <Link href="/profile/about" className="w-full p-5 flex items-center justify-between group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all">
                        <div className="flex items-center gap-4 text-text-secondary group-hover:text-text-primary transition-colors">
                            <Building2 size={20} />
                            <span className="font-bold text-text-primary text-sm uppercase tracking-wide">{t('about_us')}</span>
                        </div>
                        <ChevronRight size={18} className="text-text-secondary group-hover:translate-x-1 group-hover:text-primary transition-all" />
                    </Link>
                    <Link href="/profile/settings" className="w-full p-5 flex items-center justify-between group hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-all">
                        <div className="flex items-center gap-4 text-text-secondary group-hover:text-text-primary transition-colors">
                            <Settings size={20} />
                            <span className="font-bold text-text-primary text-sm uppercase tracking-wide">{t('settings')}</span>
                        </div>
                        <ChevronRight size={18} className="text-text-secondary group-hover:translate-x-1 group-hover:text-primary transition-all" />
                    </Link>
                </div>
                
                <button 
                    onClick={() => signOut()}
                    className="w-full glass-card p-5 flex items-center justify-between group hover:bg-danger/5 transition-all outline-none"
                >
                    <div className="flex items-center gap-4 text-danger">
                        <LogOut size={20} />
                        <span className="font-bold text-sm uppercase tracking-wide">{t('sign_out')}</span>
                    </div>
                    <div className="w-6 h-6 rounded-lg bg-danger/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronRight size={14} className="text-danger" />
                    </div>
                </button>
            </div>

        </div>
    );
}
