import { NextResponse } from 'next/server';
import { readdirSync } from 'fs';
import { join } from 'path';

export async function GET() {
    try {
        const dir = join(process.cwd(), 'public', 'items', 'premium');
        const files = readdirSync(dir).filter(f => 
            !f.startsWith('_') && // skip internal files like _filelist.txt
            /\.(jpg|jpeg|png|webp|gif|avif)$/i.test(f)
        );

        const pool = files.map(filename => {
            const base = filename.toLowerCase();
            
            // Auto-categorize by filename keywords
            let cat = 'general';
            if (/headphone|earphone|speaker|soundbar|audio|music|piano|guitar|keyboard|drum/i.test(base)) cat = 'electrical';
            else if (/laptop|tv|television|smart|watch|washing|refriger|fridge|oven|rice.cook|microwave|blender|mixer|battery.charger|stereo|camera|phone|monitor|desktop/i.test(base)) cat = 'electrical';
            else if (/battery|engine|car|volvo|vehicle|zeod|thor|automotive|tyre|tire/i.test(base)) cat = 'automotive';
            else if (/chair|table|sofa|desk|wardrobe|bed|kitchen|sink|dining|dresser|cabinet|bookcase|furniture|shelf|couch/i.test(base)) cat = 'furniture';
            else if (/dumbbell|treadmill|gym|fitness|bike|motocross|sport|exercise|workout|bench|kettlebell|barbell/i.test(base)) cat = 'gym';
            else if (/nike|jordan|dunk|vomero|air.max|air.force|shoe|sneaker|wallet|necklace|jewelry|jewel|pendant|perfume|bag|fashion|pyjama|pajama|sunglass|watch|timex/i.test(base)) cat = 'fashion';
            else if (/cookware|pan|pot|rice|cooker|baking|refrigerator|bamboo|organic/i.test(base)) cat = 'furniture';
            
            // Clean up the name from filename
            const name = filename
                .replace(/\.[^.]+$/, '') // remove extension
                .replace(/[_\-+%]/g, ' ')
                .replace(/\s+/g, ' ')
                .replace(/^\d+\s*/, '')
                .trim()
                .substring(0, 50);

            return {
                name: name || filename,
                cat,
                path: `/items/premium/${filename}`
            };
        });

        return NextResponse.json({ pool, count: pool.length });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read images' }, { status: 500 });
    }
}
