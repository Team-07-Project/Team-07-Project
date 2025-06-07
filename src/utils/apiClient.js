export const apiClient = async (url, options = {}) => {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`[API Error] ${res.status} ${res.statusText}\n${errText}`);
  }

  return await res.json();
};
