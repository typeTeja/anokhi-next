import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { contactLeads } from '@/lib/schema';
import { pushToCRM } from '@/lib/crm';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, inquiryType, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Name, email, and phone are required' }, { status: 400 });
    }

    await db.insert(contactLeads).values({
      name,
      email,
      phone,
      inquiryType,
      message,
    });

    // Push to CRM (Background task)
    pushToCRM({
      name,
      email,
      phone,
      type: 'contact',
      inquiryType,
      message,
    }).catch(err => console.error('Background CRM push failed:', err));

    return NextResponse.json({ message: 'Contact inquiry saved successfully' }, { status: 201 });
  } catch (error: unknown) {
    console.error('Error creating contact lead:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
