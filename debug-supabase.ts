import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!url || !serviceKey || !anonKey) {
    console.error("Missing env vars in .env.local");
    process.exit(1);
}

const adminSupabase = createClient(url, serviceKey);
const anonSupabase = createClient(url, anonKey);

async function test() {
    try {
        console.log("1. Checking 'Mill' profile with Service Role...");
        const { data: adminProfile } = await adminSupabase
            .from('profiles')
            .select('*')
            .eq('username', 'Mill')
            .maybeSingle();

        if (!adminProfile) {
            console.error("Profile 'Mill' not found by admin!");
            return;
        }
        console.log("Admin found profile:", adminProfile.id);

        console.log("\n2. Checking 'Mill' profile as Anonymous (Should be NULL)...");
        const { data: anonProfile } = await anonSupabase
            .from('profiles')
            .select('*')
            .eq('id', adminProfile.id)
            .maybeSingle();
        console.log("Anon found profile:", anonProfile);

        console.log("\n3. Testing Login (Browser Simulation)...");
        // We Use the email specifically
        const { data: authData, error: authError } = await anonSupabase.auth.signInWithPassword({
            email: 'mariacolon054@gmail.com',
            password: 'password' // Generic password for testing. If it fails with 'Invalid login', it's okay.
        });

        if (authError) {
            console.log("Auth error:", authError.message);
            if (authError.message.includes('Invalid login')) {
                console.log("Login credentials failed, but Auth reached the server.");
            }
        } else {
            console.log("Auth success! User ID:", authData.user.id);
            const { data: userProfile, error: userError } = await anonSupabase
                .from('profiles')
                .select('role')
                .eq('id', authData.user.id)
                .maybeSingle();
            console.log("Profile read as Logged-In User:", { userProfile, userError });
        }

    } catch (err) {
        console.error("Exception:", err);
    }
}

test();
