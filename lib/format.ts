
export const currency = (n: number) =>
  "₩" + (n || 0).toLocaleString("ko-KR");

export const percent = (f: number) =>
  `${Math.round((f || 0) * 100)}%`;
