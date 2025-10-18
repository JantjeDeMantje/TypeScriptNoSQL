export type LocalizedText = string | { en?: string; nl?: string };

export interface ModuleItem {
  code: string;
  name: string;
  ec: number;
  level: string;
  theme?: string;
  description?: LocalizedText;
  keywords?: string[];
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000/api';

export async function fetchModules(
  params: Record<string, unknown> = {}
): Promise<ModuleItem[]> {
  const query = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
  );
  const qs = new URLSearchParams(query as Record<string, string>).toString();
  const res = await fetch(`${API_BASE}/modules${qs ? `?${qs}` : ''}`);
  if (!res.ok) throw new Error('Failed to load modules');
  return res.json();
}

export async function createModule(data: Partial<ModuleItem>) {
  const res = await fetch(`${API_BASE}/modules`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Create failed');
  }
  return res.json();
}

export async function getModule(code: string): Promise<ModuleItem | null> {
  const res = await fetch(`${API_BASE}/modules/${code}`);
  if (!res.ok) throw new Error('Failed to fetch module');
  return res.json();
}

export async function updateModule(code: string, data: Partial<ModuleItem>): Promise<ModuleItem | null> {
  const res = await fetch(`${API_BASE}/modules/${code}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Update failed');
  }
  return res.json();
}

// Helpers to work with LocalizedText on the client
export function getLocalized(text: LocalizedText | undefined, lang: 'en' | 'nl'): string | undefined {
  if (text == null) return undefined;
  if (typeof text === 'string') return text;
  return text[lang] || text.en || text.nl;
}

export function setLocalized(existing: LocalizedText | undefined, lang: 'en' | 'nl', value: string): LocalizedText {
  const obj = typeof existing === 'object' && existing ? { ...existing } : {} as any;
  obj[lang] = value;
  return obj;
}

export async function deleteModule(code: string): Promise<void> {
  const res = await fetch(`${API_BASE}/modules/${code}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Delete failed');
  }
}
