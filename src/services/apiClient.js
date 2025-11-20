// src/services/apiClient.js
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://manos-hablan.fly.dev/api/v1";

export async function apiFetch(path, options = {}) {
  const url = `${API_BASE_URL}${path}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const response = await fetch(url, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {}),
    },
  });

  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.message || `Error en la solicitud (${response.status})`;
    throw new Error(message);
  }

  return data;
}
