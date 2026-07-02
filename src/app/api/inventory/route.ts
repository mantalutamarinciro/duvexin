import { NextResponse } from 'next/server';
import { getInventoryList } from '@/services/inventoryService';

export async function GET() {
  try {
    const inventory = await getInventoryList();
    return NextResponse.json(inventory ?? { items: [], totalVolume: 0 });
  } catch (error) {
    console.error('API Error - /api/inventory:', error);
    return NextResponse.json({ items: [], totalVolume: 0 });
  }
}
