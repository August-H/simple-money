'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/context/AuthContext';
import { useLanguage } from '@/context/LanguageContext';
import { useCurrency } from '@/context/CurrencyContext';
import type { UserTask, TaskItem } from '@/lib/types';
import { Clock, CheckCircle, XCircle, Search, Filter, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function RecordPage() {
    const { profile } = useAuth();
    const { t, language } = useLanguage();
    const { format } = useCurrency();
    const [tasks, setTasks] = useState<(UserTask & { task_item: TaskItem })[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

    useEffect(() => {
        const fetchTasks = async () => {
            if (!profile) return;
            const { data } = await supabase
                .from('user_tasks')
                .select('*, task_item:task_items(*)')
                .eq('user_id', profile.id)
                .order('created_at', { ascending: false });

            if (data) {
                setTasks(data as (UserTask & { task_item: TaskItem })[]);
            }
            setLoading(false);
        };
        fetchTasks();
    }, [profile]);

    const filteredTasks = tasks.filter(t => {
        if (filter === 'all') return true;
        return t.status === filter;
    });

    const statusBadge = (status: string) => {
        const statusLabel = t(status.toLowerCase());
        switch (status) {
            case 'completed': 
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-success/10 text-success border border-success/20 tracking-wider">
                        <CheckCircle size={10} /> {statusLabel}
                    </span>
                );
            case 'pending': 
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-warning/10 text-warning border border-warning/20 tracking-wider">
                        <Clock size={10} /> {statusLabel}
                    </span>
                );
            case 'cancelled': 
                return (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-danger/10 text-danger border border-danger/20 tracking-wider">
                        <XCircle size={10} /> {statusLabel}
                    </span>
                );
            default: return (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase bg-black/5 dark:bg-white/5 text-text-secondary border border-black/5 dark:border-white/5 tracking-wider">
                    {statusLabel}
                </span>
            );
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 space-y-4 animate-fade-in pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-text-primary uppercase tracking-tight">{t('record')}</h2>
                    <p className="text-text-secondary text-xs mt-1 font-bold uppercase tracking-widest">{tasks.length} {t('total_records_found')}</p>
                </div>
                
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                        <input 
                            type="text" 
                            placeholder={t('search_tasks')}
                            className="bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl py-2 pl-9 pr-4 text-xs text-text-primary focus:outline-none focus:border-primary/50"
                        />
                    </div>
                    <button className="p-2.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-text-secondary hover:text-text-primary transition-colors">
                        <Filter size={18} />
                    </button>
                </div>
            </div>

            <div className="flex border-b border-black/5 dark:border-white/5 relative">
                {(['all', 'completed', 'pending'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-8 py-3 text-[10px] font-black uppercase tracking-widest transition-all relative z-10 ${
                            filter === f ? 'text-primary-light' : 'text-text-secondary hover:text-text-primary'
                        }`}
                    >
                        {t(f)}
                        {filter === f && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary via-primary-light to-primary shadow-[0_0_10px_var(--color-primary)] animate-fade-in" />
                        )}
                    </button>
                ))}
            </div>

            <div className="glass-card overflow-hidden">
                <div className="grid grid-cols-4 px-6 py-2.5 bg-black/5 dark:bg-white/5 border-b border-black/5 dark:border-white/5 text-[10px] font-black text-text-secondary uppercase tracking-[0.2em]">
                    <span>{t('timestamp')}</span>
                    <span>{t('task_type')}</span>
                    <span>{t('amount_earned')}</span>
                    <span className="text-right">{t('status')}</span>
                </div>

                <div className="divide-y divide-black/5 dark:divide-white/5">
                    {loading ? (
                        <div className="flex items-center justify-center h-[200px]">
                            <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
                        </div>
                    ) : filteredTasks.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-[200px] text-center px-6">
                            <Clock size={40} className="text-text-secondary/20 mb-4" />
                            <p className="text-sm font-bold text-text-secondary uppercase tracking-widest">{t('no_records_found')}</p>
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <div key={task.id} className="grid grid-cols-4 px-6 py-2.5 items-center hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors group">
                                <div className="text-[11px] font-medium text-text-secondary">
                                    <p className="text-text-primary font-bold">
                                        {new Date(task.created_at).toLocaleDateString(
                                            language === 'English' ? 'en-US' :
                                            language === 'Spanish' ? 'es-ES' :
                                            language === 'French' ? 'fr-FR' :
                                            language === 'German' ? 'de-DE' :
                                            language === 'Chinese' ? 'zh-CN' :
                                            language === 'Japanese' ? 'ja-JP' : 'en-US',
                                            { month: 'short', day: 'numeric', year: 'numeric' }
                                        )}
                                    </p>
                                    <p className="text-[10px] opacity-60 tracking-tight">
                                        {new Date(task.created_at).toLocaleTimeString(
                                            language === 'English' ? 'en-US' :
                                            language === 'Spanish' ? 'es-ES' :
                                            language === 'French' ? 'fr-FR' :
                                            language === 'German' ? 'de-DE' :
                                            language === 'Chinese' ? 'zh-CN' :
                                            language === 'Japanese' ? 'ja-JP' : 'en-US',
                                            { hour: '2-digit', minute: '2-digit' }
                                        )}
                                    </p>
                                </div>
                                <div className="text-[11px] font-bold text-text-primary uppercase tracking-tight">
                                    {task.task_item?.title || `${t('task')} #${task.task_item_id}`}
                                </div>
                                <div className="text-sm font-black text-success">
                                    +{format(task.earned_amount)}
                                </div>
                                <div className="text-right">
                                    {statusBadge(task.status)}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
