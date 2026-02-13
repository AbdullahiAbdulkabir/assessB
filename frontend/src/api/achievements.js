const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:5101/api/';

export async function apiGet(path) {
    const res = await fetch(`${API_BASE}${path}`);
    if (!res.ok) throw new Error("API request failed");
    return res.json();
}
