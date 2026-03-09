'use client';


import Link from 'next/link';
import { usePathname } from 'next/navigation';


import { useAuth } from '@/context/AuthContext';


import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';


import { 
    Home, 
    PlayCircle, 
    FileText, 
    Wallet, 
    Shield, 
    User,
    LogOut,
    Search,
    X,
    Headset
} from 'lucide-react';


const menuItems = [
    { label: 'Home', icon: Home, href: '/home' },
    { label: 'Start Tasks', icon: PlayCircle, href: '/start' },
    { label: 'Activity Records', icon: FileText, href: '/record' },
    { label: 'Wallet', icon: Wallet, href: '/wallet' },
    { label: 'VIP Map', icon: Shield, href: '/levels' },
    { label: 'My Profile', icon: User, href: '/profile' },
    { label: 'Live Support', icon: Headset, href: '#', isAction: true },
];

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { profile, signOut } = useAuth();
    const { t, language } = useLanguage();
    const { format } = useCurrency();

    return (
        <>

            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] md:hidden animate-fade-in"
                    onClick={onClose}
                />
            )}

            <aside className={`fixed top-0 left-0 h-screen w-72 bg-surface border-r border-black/5 dark:border-white/5 z-[70] transition-transform duration-300 transform md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col shadow-[20px_0_50px_rgba(0,0,0,0.5)]`}>
                

                <div className="p-6 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="text-white font-black text-xl">$</span>
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-text-primary to-text-primary/60 bg-clip-text text-transparent">
                            Simple Money
                        </h1>
                    </div>
                    {/* Mobile Close Button */}
                    <button 
                        onClick={onClose}
                        className="md:hidden p-2 text-text-secondary hover:text-text-primary transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>


            <div className="px-6 py-2 text-[10px] uppercase tracking-widest text-text-secondary font-bold opacity-50">
                {t('dashboard')}
            </div>

            <nav className="flex-1 px-4 space-y-1 mt-2">
                {menuItems.map((item: any, index: number) => {
                    const isActive = pathname === item.href;
                    const translatedLabel = t(item.label.toLowerCase().replace(' ', '_'));
                    
                    const isQuickStart = index === 3; // Before Wallet

                    const renderItem = () => {
                        if (item.isAction) {
                            return (
                                <button
                                    key={item.label}
                                    onClick={() => {
                                        (window as any).Tawk_API?.maximize();
                                        onClose();
                                    }}
                                    className="w-full sidebar-nav-item text-text-secondary hover:text-text-primary"
                                >
                                    <item.icon size={20} className="opacity-70" />
                                    <span className="font-medium">{translatedLabel}</span>
                                </button>
                            );
                        }

                        return (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                className={`sidebar-nav-item ${isActive ? 'active' : 'text-text-secondary hover:text-text-primary'}`}
                            >
                                <item.icon size={20} className={isActive ? 'text-primary' : 'opacity-70'} />
                                <span className="font-medium">{translatedLabel}</span>
                                {isActive && (
                                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]" />
                                )}
                            </Link>
                        );
                    };

                    return (
                        <div key={item.label}>
                            {isQuickStart && (
                                <div className="px-2 py-4 mt-2 text-[10px] uppercase tracking-widest text-text-secondary font-bold opacity-50">
                                    Quick Menu
                                </div>
                            )}
                            {renderItem()}
                        </div>
                    );
                })}
            </nav>


            <div className="p-4 mt-auto border-t border-black/5 dark:border-white/5 bg-black/[0.02]">
                <div className="flex items-center justify-between mb-4">
                    <Link 
                        href="/profile" 
                        onClick={onClose}
                        className="flex items-center gap-3 group flex-1"
                    >
                        <div className="w-10 h-10 rounded-full border-2 border-primary/30 flex items-center justify-center bg-surface-light relative group-hover:border-primary transition-all">
                            <span className="text-primary font-bold">{profile?.username?.[0].toUpperCase() || 'U'}</span>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-success border-2 border-surface flex items-center justify-center">
                                <div className="w-1 h-1 rounded-full bg-white dark:bg-black animate-pulse" />
                            </div>
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-text-primary truncate transition-colors group-hover:text-primary">
                                {profile?.username || 'User'}
                            </p>
                            <p className="text-[10px] text-primary-light font-medium uppercase tracking-tight">
                                {t('vip_map')} {profile?.level_id || 1}
                            </p>
                        </div>
                    </Link>
                    <button 
                        onClick={() => signOut()}
                        className="p-2 text-text-secondary hover:text-danger transition-colors bg-black/5 dark:bg-white/5 rounded-lg"
                        title={t('logout')}
                    >
                        <LogOut size={16} />
                    </button>
                </div>

                {/* Info Circles */}
                <div className="flex gap-2">
                    <div className="flex-1 glass-card p-2 flex flex-col items-center justify-center text-center bg-white/[0.03]">
                        <span className="text-[8px] text-text-secondary uppercase tracking-tighter mb-1">{t('joined')}</span>
                        <span className="text-[10px] font-bold text-text-primary">
                            {profile?.created_at ? new Date(profile.created_at).toLocaleDateString(
                                language === 'English' ? 'en-US' :
                                language === 'Spanish' ? 'es-ES' :
                                language === 'French' ? 'fr-FR' :
                                language === 'German' ? 'de-DE' :
                                language === 'Chinese' ? 'zh-CN' :
                                language === 'Japanese' ? 'ja-JP' : 'en-US',
                                { month: 'short', year: '2-digit' }
                            ) : '---'}
                        </span>
                    </div>
                    <div className="flex-1 glass-card p-2 flex flex-col items-center justify-center text-center bg-primary/5 border-primary/20">
                        <span className="text-[8px] text-primary uppercase tracking-tighter mb-1">{t('balance_sidebar')}</span>
                        <span className="text-[10px] font-black text-primary-light">
                            {format(profile?.wallet_balance ?? 0)}
                        </span>
                    </div>
                </div>
            </div>
        </aside>
        </>
    );
}
