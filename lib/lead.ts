import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

export type LeadType = 'contact' | 'quote' | 'booking';

export type LeadPayload = {
  type?: LeadType;
  name: string;
  phone: string;
  email?: string;
  budget?: string;
  industry?: string;
  websiteType?: string;
  goal?: string;
  page?: string;
  source?: string;
  submittedAt?: string;
  company?: string;
  pageCount?: string;
  features?: string[];
  multilingual?: boolean;
  timeline?: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
  website?: string;
  honeypot?: string;
};

export type StoredLead = LeadPayload & {
  id: string;
  createdAt: string;
  createdAtMs: number;
  ip?: string;
  userAgent?: string;
};

const dataDir = path.join(process.cwd(), 'data');
const leadsFile = path.join(dataDir, 'leads.json');
const rateLimitFile = path.join(dataDir, 'lead-rate-limit.json');

function normalize(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeArray(value: unknown) {
  if (!Array.isArray(value)) return [] as string[];
  return value.map((item) => normalize(item)).filter(Boolean);
}

export function validateLead(input: unknown): LeadPayload {
  const body = (input ?? {}) as Record<string, unknown>;

  const lead: LeadPayload = {
    type: (normalize(body.type) as LeadType) || 'contact',
    name: normalize(body.name),
    phone: normalize(body.phone),
    email: normalize(body.email),
    budget: normalize(body.budget),
    industry: normalize(body.industry),
    websiteType: normalize(body.websiteType),
    goal: normalize(body.goal),
    page: normalize(body.page),
    source: normalize(body.source),
    submittedAt: normalize(body.submittedAt),
    company: normalize(body.company),
    pageCount: normalize(body.pageCount),
    features: normalizeArray(body.features),
    multilingual: Boolean(body.multilingual),
    timeline: normalize(body.timeline),
    preferredDate: normalize(body.preferredDate),
    preferredTime: normalize(body.preferredTime),
    notes: normalize(body.notes),
    website: normalize(body.website),
    honeypot: normalize(body.honeypot)
  };

  if (!lead.name || lead.name.length < 2) {
    throw new Error('Vui lòng nhập họ tên hợp lệ.');
  }

  if (!lead.phone || lead.phone.replace(/\D/g, '').length < 8) {
    throw new Error('Vui lòng nhập số điện thoại hợp lệ.');
  }

  if (lead.email && !/^\S+@\S+\.\S+$/.test(lead.email)) {
    throw new Error('Email chưa đúng định dạng.');
  }

  if (lead.honeypot) {
    throw new Error('Spam detected.');
  }

  return lead;
}

async function readJsonFile<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(filePath, 'utf8');
    return JSON.parse(raw) as T;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return fallback;
    }
    throw error;
  }
}

async function writeJsonFile(filePath: string, data: unknown) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

async function readLeads(): Promise<StoredLead[]> {
  return readJsonFile<StoredLead[]>(leadsFile, []);
}

export async function assertLeadAllowed(meta: { ip?: string | null; userAgent?: string | null }) {
  const now = Date.now();
  const ip = normalize(meta.ip) || 'unknown';
  const ua = normalize(meta.userAgent) || 'unknown';
  const key = `${ip}__${ua.slice(0, 120)}`;

  const map = await readJsonFile<Record<string, number[]>>(rateLimitFile, {});
  const recent = (map[key] || []).filter((time) => now - time < 15 * 60 * 1000);

  if (recent.length >= 5) {
    throw new Error('Bạn gửi quá nhanh. Vui lòng thử lại sau ít phút.');
  }

  recent.push(now);
  map[key] = recent;
  await writeJsonFile(rateLimitFile, map);
}

export async function saveLead(lead: LeadPayload, meta?: { ip?: string | null; userAgent?: string | null }) {
  await mkdir(dataDir, { recursive: true });

  const stored: StoredLead = {
    ...lead,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    createdAtMs: Date.now(),
    ip: meta?.ip ?? undefined,
    userAgent: meta?.userAgent ?? undefined
  };

  const leads = await readLeads();
  leads.unshift(stored);
  await writeJsonFile(leadsFile, leads);
  return stored;
}

function esc(value?: string) {
  return (value || '—').replace(/[&<>]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[char]!));
}

export function formatLeadTelegramMessage(lead: StoredLead) {
  return [
    `🔥 <b>New SKY Web Studio ${String(lead.type || 'lead').toUpperCase()}</b>`,
    '',
    `<b>ID:</b> <code>${esc(lead.id)}</code>`,
    `<b>Họ tên:</b> ${esc(lead.name)}`,
    `<b>Điện thoại:</b> ${esc(lead.phone)}`,
    `<b>Email:</b> ${esc(lead.email)}`,
    `<b>Company:</b> ${esc(lead.company)}`,
    `<b>Ngành nghề:</b> ${esc(lead.industry)}`,
    `<b>Loại website:</b> ${esc(lead.websiteType)}`,
    `<b>Số trang:</b> ${esc(lead.pageCount)}`,
    `<b>Tính năng:</b> ${esc(lead.features?.join(', '))}`,
    `<b>Ngân sách:</b> ${esc(lead.budget)}`,
    `<b>Timeline:</b> ${esc(lead.timeline)}`,
    `<b>Booking date:</b> ${esc(lead.preferredDate)}`,
    `<b>Booking time:</b> ${esc(lead.preferredTime)}`,
    `<b>Mục tiêu:</b> ${esc(lead.goal)}`,
    `<b>Ghi chú:</b> ${esc(lead.notes)}`,
    `<b>Trang:</b> ${esc(lead.page)}`,
    `<b>Source:</b> ${esc(lead.source)}`,
    `<b>Thời gian:</b> ${esc(lead.createdAt)}`
  ].join('\n');
}

export function formatLeadDiscordMessage(lead: StoredLead) {
  return {
    content: `🔥 New SKY Web Studio ${String(lead.type || 'lead').toUpperCase()}`,
    embeds: [
      {
        title: `${lead.name} • ${lead.phone}`,
        color: 49151,
        fields: [
          { name: 'Email', value: lead.email || '—', inline: true },
          { name: 'Company', value: lead.company || '—', inline: true },
          { name: 'Ngành nghề', value: lead.industry || '—', inline: true },
          { name: 'Loại website', value: lead.websiteType || '—', inline: true },
          { name: 'Số trang', value: lead.pageCount || '—', inline: true },
          { name: 'Budget', value: lead.budget || '—', inline: true },
          { name: 'Timeline', value: lead.timeline || '—', inline: true },
          { name: 'Booking', value: [lead.preferredDate, lead.preferredTime].filter(Boolean).join(' • ') || '—', inline: true },
          { name: 'Source', value: lead.source || '—', inline: true },
          { name: 'Mục tiêu', value: lead.goal || '—', inline: false },
          { name: 'Ghi chú', value: lead.notes || '—', inline: false }
        ],
        footer: { text: `Lead ID: ${lead.id}` },
        timestamp: lead.createdAt
      }
    ]
  };
}

export function toCrmLead(lead: StoredLead) {
  return {
    id: lead.id,
    type: lead.type || 'contact',
    name: lead.name,
    phone: lead.phone,
    email: lead.email || '',
    company: lead.company || '',
    industry: lead.industry || '',
    websiteType: lead.websiteType || '',
    pageCount: lead.pageCount || '',
    features: (lead.features || []).join(', '),
    multilingual: lead.multilingual ? 'yes' : 'no',
    budget: lead.budget || '',
    timeline: lead.timeline || '',
    preferredDate: lead.preferredDate || '',
    preferredTime: lead.preferredTime || '',
    goal: lead.goal || '',
    notes: lead.notes || '',
    page: lead.page || '',
    source: lead.source || '',
    website: lead.website || '',
    createdAt: lead.createdAt,
    createdAtMs: lead.createdAtMs,
    ip: lead.ip || '',
    userAgent: lead.userAgent || ''
  };
}

export function toGoogleSheetsRow(lead: StoredLead) {
  const crm = toCrmLead(lead);
  return [
    crm.createdAt,
    crm.id,
    crm.type,
    crm.name,
    crm.phone,
    crm.email,
    crm.company,
    crm.industry,
    crm.websiteType,
    crm.pageCount,
    crm.features,
    crm.multilingual,
    crm.budget,
    crm.timeline,
    crm.preferredDate,
    crm.preferredTime,
    crm.goal,
    crm.notes,
    crm.page,
    crm.source,
    crm.website,
    crm.ip,
    crm.userAgent
  ];
}

async function postJson(url: string, body: unknown) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Notify failed: ${response.status} ${errorText}`);
  }
}

export async function notifyTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_NOTIFY_CHAT_ID;

  if (!token || !chatId) {
    return { ok: false as const, skipped: true as const, reason: 'missing_env' as const };
  }

  await postJson(`https://api.telegram.org/bot${token}/sendMessage`, {
    chat_id: chatId,
    text,
    parse_mode: 'HTML',
    disable_web_page_preview: true
  });

  return { ok: true as const, skipped: false as const };
}

export async function notifyDiscord(payload: ReturnType<typeof formatLeadDiscordMessage>) {
  const webhook = process.env.DISCORD_WEBHOOK_URL;

  if (!webhook) {
    return { ok: false as const, skipped: true as const, reason: 'missing_env' as const };
  }

  await postJson(webhook, payload);
  return { ok: true as const, skipped: false as const };
}

export async function notifyWebhook(lead: StoredLead) {
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (!webhook) {
    return { ok: false as const, skipped: true as const, reason: 'missing_env' as const };
  }

  await postJson(webhook, { event: 'lead.created', lead: toCrmLead(lead) });
  return { ok: true as const, skipped: false as const };
}

export async function appendLeadToGoogleSheets(lead: StoredLead) {
  const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL;

  if (!scriptUrl) {
    return { ok: false as const, skipped: true as const, reason: 'missing_env' as const };
  }

  await postJson(scriptUrl, {
    event: 'lead.created',
    headers: [
      'createdAt','id','type','name','phone','email','company','industry','websiteType','pageCount','features','multilingual','budget','timeline','preferredDate','preferredTime','goal','notes','page','source','website','ip','userAgent'
    ],
    row: toGoogleSheetsRow(lead),
    lead: toCrmLead(lead)
  });

  return { ok: true as const, skipped: false as const };
}

export async function fanoutLeadNotifications(lead: StoredLead) {
  const [telegram, discord, webhook, googleSheets] = await Promise.allSettled([
    notifyTelegram(formatLeadTelegramMessage(lead)),
    notifyDiscord(formatLeadDiscordMessage(lead)),
    notifyWebhook(lead),
    appendLeadToGoogleSheets(lead)
  ]);

  const mapResult = (result: PromiseSettledResult<unknown>) => {
    if (result.status === 'fulfilled') return result.value;
    return { ok: false as const, skipped: false as const, error: result.reason instanceof Error ? result.reason.message : String(result.reason) };
  };

  return {
    telegram: mapResult(telegram),
    discord: mapResult(discord),
    webhook: mapResult(webhook),
    googleSheets: mapResult(googleSheets)
  };
}
