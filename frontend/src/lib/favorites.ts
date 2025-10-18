import { getToken } from './auth';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:3000/api';

export async function getFavorites(): Promise<string[]> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/favorites`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch favorites');
  }
  return res.json();
}

export async function addFavorite(moduleCode: string): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/favorites/${moduleCode}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to add favorite');
  }
}

export async function removeFavorite(moduleCode: string): Promise<void> {
  const token = getToken();
  const res = await fetch(`${API_BASE}/favorites/${moduleCode}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to remove favorite');
  }
}
