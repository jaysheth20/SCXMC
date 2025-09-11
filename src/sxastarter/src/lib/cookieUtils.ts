// lib/cookieUtils.ts
export function getClickCounts(): Record<string, number> {
  if (typeof document === "undefined") return {};
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("clickCounts="));
  if (!cookie) return {};
  try {
    return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  } catch {
    return {};
  }
}

export function saveClickCounts(counts: Record<string, number>) {
  if (typeof document === "undefined") return;
  document.cookie = `clickCounts=${encodeURIComponent(
    JSON.stringify(counts)
  )}; path=/; max-age=${60 * 60 * 24 * 30}`; // 30 days
}

export function incrementClickCount(itemId: string) {
  const counts = getClickCounts();
  counts[itemId] = (counts[itemId] || 0) + 1;
  saveClickCounts(counts);
  return counts;
}
