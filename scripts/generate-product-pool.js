import { readdirSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const PUBLIC_DIR = join(process.cwd(), 'public', 'items', 'premium');
const OUTPUT_DIR = join(process.cwd(), 'src', 'data');
const OUTPUT_FILE = join(OUTPUT_DIR, 'product_pool.json');

try {
    if (!existsSync(PUBLIC_DIR)) {
        console.error('Public directory not found:', PUBLIC_DIR);
        process.exit(1);
    }

    const files = readdirSync(PUBLIC_DIR).filter(f =>
        !f.startsWith('_') &&
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

    if (!existsSync(OUTPUT_DIR)) {
        mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    writeFileSync(OUTPUT_FILE, JSON.stringify({ pool, count: pool.length }, null, 2));
    console.log(`Successfully generated ${OUTPUT_FILE} with ${pool.length} products.`);

} catch (error) {
    console.error('Error generating product pool:', error);
    process.exit(1);
}
