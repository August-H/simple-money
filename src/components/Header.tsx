'use client';


import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';


import { 
    Bell, 
    Search, 
    User, 
    CreditCard, 
    ShieldCheck, 
    LogOut, 
    ChevronRight, 
    Settings, 
    Headset,
    Menu, 
    Sun, 
    Moon 
} from 'lucide-react';

interface HeaderProps {
    onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const { profile, signOut } = useAuth();
    const { notifications, unreadCount, markAsRead, markAllRead, clearAll } = useNotifications();
    const router = useRouter();
    
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('dark');
    
    const notifRef = useRef<HTMLDivElement>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    // Initialize theme from document class
    useEffect(() => {
        const isLight = document.documentElement.classList.contains('light');
        setTheme(isLight ? 'light' : 'dark');
    }, []);

    // Set Tawk attributes when profile is available
    useEffect(() => {
        if (profile && (window as any).Tawk_API) {
            (window as any).Tawk_API.setAttributes({
                'name': profile.username || 'User',
                'email': profile.email
            }, function(error: any) {});
        }
    }, [profile]);

    const toggleTheme = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        if (newTheme === 'light') {
            document.documentElement.classList.add('light');
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
            document.documentElement.classList.remove('light');
        }
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setIsNotifOpen(false);
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="h-16 md:h-20 bg-surface/30 backdrop-blur-xl border-b border-black/5 dark:border-white/5 sticky top-0 z-40 flex items-center px-4 md:px-8 transition-colors duration-300">
            <div className="max-w-7xl w-full mx-auto flex items-center justify-between gap-4">
                

                <div className="flex items-center gap-3">
                    {/* Mobile Menu Button */}
                    <button 
                        onClick={onMenuClick}
                        className="md:hidden p-2 rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 text-text-primary dark:text-white shadow-lg active:scale-95 transition-all"
                    >
                        <Menu size={22} />
                    </button>

                    {/* Branding (Mobile only, as Sidebar shows it on Desktop) */}
                    <div className="flex items-center gap-2 md:gap-3 whitespace-nowrap md:hidden">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <span className="text-white font-black text-base md:text-lg">$</span>
                        </div>
                        <span className="text-sm md:text-xl font-bold text-text-primary dark:text-white tracking-tight">Simple Money</span>
                    </div>
                </div>


                <div className="flex items-center gap-2 md:gap-4 ml-auto">
                    
                    {/* Theme Toggle */}
                    <button 
                        onClick={toggleTheme}
                        className="p-2 md:p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-text-secondary hover:text-primary hover:dark:text-primary-light hover:bg-primary/10 transition-all"
                        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Support Button */}
                    <button 
                        onClick={() => (window as any).Tawk_API?.maximize()}
                        className="p-2 md:p-2.5 rounded-xl bg-black/5 dark:bg-white/5 text-text-secondary hover:text-primary hover:dark:text-primary-light hover:bg-primary/10 transition-all md:flex hidden"
                        title="Live Support"
                    >
                        <Headset size={20} />
                    </button>

                    {/* Notifications Dropdown */}
                    <div className="relative" ref={notifRef}>
                        <button 
                            onClick={() => { setIsNotifOpen(!isNotifOpen); setIsProfileOpen(false); }}
                            className={`p-2 md:p-2.5 rounded-xl transition-all relative ${isNotifOpen ? 'bg-primary/20 text-primary dark:text-primary-light' : 'bg-black/5 dark:bg-white/5 text-text-secondary hover:text-primary hover:dark:text-primary-light hover:bg-primary/10'}`}
                        >
                            <Bell size={20} />
                            {unreadCount > 0 && (
                                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-danger border-2 border-surface animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                            )}
                        </button>

                        {isNotifOpen && (
                            <div className="absolute top-full right-0 mt-2 w-80 glass-card p-4 rounded-2xl shadow-2xl shadow-black/50 border border-white/10 animate-slide-up origin-top-right">
                                <div className="flex items-center justify-between mb-4 border-b border-black/5 dark:border-white/5 pb-3">
                                    <h3 className="font-bold text-text-primary dark:text-white text-sm">Notifications</h3>
                                    {notifications.length > 0 && (
                                        <div className="flex items-center gap-3">
                                            {unreadCount > 0 && (
                                                <button onClick={markAllRead} className="text-[10px] font-black uppercase text-primary-light hover:text-primary transition-colors">
                                                    Mark Read
                                                </button>
                                            )}
                                            <button onClick={clearAll} className="text-[10px] font-black uppercase text-text-secondary/60 hover:text-danger transition-colors">
                                                Clear All
                                            </button>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                                    {notifications.length === 0 ? (
                                        <p className="text-center text-xs text-text-secondary py-4">No notifications</p>
                                    ) : (
                                        notifications.slice(0, 5).map(notif => (
                                            <div 
                                                key={notif.id} 
                                                onClick={() => {
                                                    markAsRead(notif.id);
                                                    if (notif.title.toLowerCase().includes('task') || notif.message.toLowerCase().includes('task')) {
                                                        router.push('/record');
                                                        setIsNotifOpen(false);
                                                    }
                                                }}
                                                className="flex gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer"
                                            >
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${!notif.is_read ? 'bg-primary/20 text-primary-light' : 'bg-white/5 text-text-secondary'}`}>
                                                    <Bell size={14} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-xs font-semibold truncate ${!notif.is_read ? 'text-text-primary dark:text-white' : 'text-text-secondary/80'}`}>{notif.title}</p>
                                                    <p className="text-[10px] text-text-secondary line-clamp-2 mt-0.5">{notif.message}</p>
                                                    <p className="text-[9px] text-text-secondary/50 mt-1">
                                                        {new Date(notif.created_at).toLocaleDateString()} {new Date(notif.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                
                                <Link 
                                    href="/notifications" 
                                    onClick={() => setIsNotifOpen(false)}
                                    className="block text-center mt-3 pt-3 border-t border-black/5 dark:border-white/5 text-xs text-text-secondary hover:text-text-primary hover:dark:text-white transition-colors"
                                >
                                    View All Notifications
                                </Link>
                            </div>
                        )}
                    </div>
                    
                    {/* User Profile Dropdown */}
                    <div className="relative" ref={profileRef}>
                        <button 
                            onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotifOpen(false); }}
                            className={`p-2 md:p-2.5 rounded-xl transition-all ${isProfileOpen ? 'bg-primary/20 text-primary dark:text-primary-light' : 'bg-black/5 dark:bg-white/5 text-text-secondary hover:text-primary hover:dark:text-primary-light hover:bg-primary/10'}`}
                        >
                            <User size={20} />
                        </button>

                        {isProfileOpen && (
                            <div className="absolute top-full right-0 mt-2 w-56 glass-card rounded-2xl shadow-2xl shadow-black/50 border border-white/10 animate-slide-up origin-top-right overflow-hidden">
                                
                                <div className="p-4 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/[0.02]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 bg-surface flex items-center justify-center text-text-primary dark:text-white font-black">
                                            {profile?.username?.[0].toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-text-primary dark:text-white">{profile?.username || 'User'}</p>
                                            <p className="text-[10px] text-text-secondary uppercase tracking-wider mt-0.5">
                                                VIP Level {profile?.level_id || 1}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 space-y-1">
                                    <Link onClick={() => setIsProfileOpen(false)} href="/profile/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 hover:dark:bg-white/5 text-text-secondary hover:text-text-primary hover:dark:text-white transition-colors group">
                                        <Settings size={16} />
                                        <span className="text-xs font-medium">Profile Settings</span>
                                    </Link>
                                    <Link onClick={() => setIsProfileOpen(false)} href="/profile/wallet" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 hover:dark:bg-white/5 text-text-secondary hover:text-text-primary hover:dark:text-white transition-colors group">
                                        <CreditCard size={16} />
                                        <span className="text-xs font-medium">Payment Methods</span>
                                    </Link>
                                    <Link onClick={() => setIsProfileOpen(false)} href="/profile/security" className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-black/5 hover:dark:bg-white/5 text-text-secondary hover:text-text-primary hover:dark:text-white transition-colors group">
                                        <ShieldCheck size={16} />
                                        <span className="text-xs font-medium">Security</span>
                                    </Link>
                                </div>

                                <div className="p-3 border-t border-black/5 dark:border-white/5">
                                    <button 
                                        onClick={async () => {
                                            setIsProfileOpen(false);
                                            await signOut();
                                            router.push('/login');
                                        }}
                                        className="w-full flex items-center justify-between p-3 rounded-xl bg-danger/5 hover:bg-danger/10 border border-danger/10 transition-all active:scale-[0.98] group/logout"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-danger/20 flex items-center justify-center text-danger group-hover/logout:scale-110 transition-transform">
                                                <LogOut size={16} />
                                            </div>
                                            <span className="text-xs font-bold text-text-secondary group-hover/logout:text-danger transition-colors uppercase tracking-widest">Sign Out</span>
                                        </div>
                                        <ChevronRight size={14} className="text-text-secondary group-hover/logout:text-danger group-hover/logout:translate-x-1 transition-all" />
                                    </button>
                                </div>

                            </div>
                        )}
                    </div>

                </div>
            </div>
        </header>
    );
}
