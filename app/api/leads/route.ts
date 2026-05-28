import { NextResponse } from 'next/server';
import { mockLeads } from '../../../data/mock-leads';
export async function GET() { return NextResponse.json({ leads: mockLeads }); }
