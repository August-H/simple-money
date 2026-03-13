import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
    console.error("Missing env vars in .env.local");
    process.exit(1);
}

const supabase = createClient(url, key);

async function sync() {
    console.log("Starting Profile Sync...");
    
    // 1. Get all Auth users
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    if (authError) {
        console.error("Error fetching auth users:", authError);
        return;
    }

    // 2. Get all existing profiles
    const { data: profiles, error: profileError } = await supabase.from('profiles').select('id');
    if (profileError) {
        console.error("Error fetching profiles:", profileError);
        return;
    }

    const profileIds = new Set(profiles.map(p => p.id));
    console.log(`Found ${users.length} Auth users and ${profiles.length} profiles.`);

    for (const user of users) {
        if (!profileIds.has(user.id)) {
            console.log(`Syncing missing profile for: ${user.email} (${user.id})`);
            
            const username = user.user_metadata?.username || `User_${user.id.substring(0, 8)}`;
            const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

            // Insert profile
            const { error: insertError } = await supabase.from('profiles').insert({
                id: user.id,
                username: username,
                email: user.email,
                role: 'user',
                referral_code: referralCode,
                wallet_balance: 45, // default bonus
                last_reset_at: new Date().toISOString()
            });

            if (insertError) {
                console.error(`Failed to create profile for ${user.email}:`, insertError.message);
            } else {
                // Also create referral code record
                const { error: refError } = await supabase.from('referral_codes').insert({
                    code: referralCode,
                    owner_id: user.id,
                    is_active: true
                });
                if (refError) console.error(`Failed to create referral code for ${user.email}:`, refError.message);
                console.log(`Successfully synced ${user.email}`);
            }
        }
    }

    console.log("Sync complete.");
}

sync();
