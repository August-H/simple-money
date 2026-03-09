'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function BootstrapAdmin() {
    const [status, setStatus] = useState('Idle');

    const handleCreate = async () => {
        setStatus('Creating auth user...');

        try {
            // Register auth user
            const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
                email: 'admin2@test.com',
                password: 'password123',
                options: {
                    data: {
                        username: 'Admin Two',
                    }
                }
            });

            if (signUpError) {
                setStatus(`Error creating auth user: ${signUpError.message}`);
                return;
            }

            if (!signUpData.user) {
                setStatus('Auth user created but no data returned.');
                return;
            }

            setStatus('Auth created. Updating profile role to admin...');

            // Grant Admin Privileges
            const { error: profileError } = await supabase
                .from('profiles')
                .update({ role: 'admin' })
                .eq('id', signUpData.user.id);

            if (profileError) {
                setStatus(`Error setting profile role: ${profileError.message}`);
                return;
            }

            setStatus('SUCCESS! Admin account admin2@test.com / password123 successfully created and given admin role!');
        } catch (err: any) {
            setStatus(`Exception: ${err.message}`);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4 font-bold text-white">Bootstrap Admin Server Component</h1>
            <p className="mb-4 text-white/70">Click to deploy admin creation payload to Supabase.</p>
            <button
                onClick={handleCreate}
                className="bg-primary text-white px-6 py-3 rounded-xl font-bold mb-4"
            >
                Execute Bootstrap
            </button>
            <div className="bg-black/50 p-4 rounded-xl font-mono text-sm text-green-400">
                {status}
            </div>
        </div>
    );
}
