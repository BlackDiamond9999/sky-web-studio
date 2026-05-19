import { assertLeadAllowed, fanoutLeadNotifications, saveLead, validateLead } from '@/lib/lead';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? null;
    const userAgent = request.headers.get('user-agent');

    await assertLeadAllowed({ ip, userAgent });

    const body = await request.json();
    const lead = validateLead({ ...body, type: 'booking' });

    const storedLead = await saveLead(lead, { ip, userAgent });
    const notify = await fanoutLeadNotifications(storedLead);

    return Response.json({ ok: true, message: 'Booking lead received', leadId: storedLead.id, notify });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid request.';
    const status = /Vui lòng|Email|Spam|gửi quá nhanh/.test(message) ? 400 : 500;
    return Response.json({ ok: false, message }, { status });
  }
}
