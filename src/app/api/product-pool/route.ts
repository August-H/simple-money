import { NextResponse } from 'next/server';
import productPoolData from '@/data/product_pool.json';

// Serve pre-generated product pool to avoid massive function size on Vercel
export async function GET() {
    return NextResponse.json(productPoolData);
}
