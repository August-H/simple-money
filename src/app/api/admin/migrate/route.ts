import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// One-time migration endpoint to add pending_bundle column if it doesn't exist
export async function GET() {
    try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!url || !key) {
            return NextResponse.json({ error: 'Supabase Admin credentials not found in environment' }, { status: 500 });
        }

        const supabaseAdmin = createClient(url, key);

        // Try to update a row with pending_bundle to see if column exists
        // If it errors with column not found, we can't do DDL via JS client
        // Instead, use Supabase's REST API to run raw SQL via rpc
        const { error } = await supabaseAdmin.rpc('exec_sql', {
            sql: 'ALTER TABLE profiles ADD COLUMN IF NOT EXISTS pending_bundle JSONB DEFAULT NULL;'
        });

        if (error) {
            // Column might already exist, or rpc doesn't exist — try a direct test
            return NextResponse.json({ note: 'Try adding column manually in Supabase Dashboard SQL Editor', error: error.message });
        }

        return NextResponse.json({ success: true, message: 'pending_bundle column added to profiles' });
    } catch (err: unknown) {
        return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
    }
}
