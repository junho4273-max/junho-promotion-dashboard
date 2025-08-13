
export function groupBy<T, K extends string | number>(arr: T[], key: (x: T) => K): Record<K, T[]> {
  return arr.reduce((acc, item) => {
    const k = key(item);
    (acc as any)[k] = (acc as any)[k] || [];
    (acc as any)[k].push(item);
    return acc;
  }, {} as Record<K, T[]>);
}

export function sumBy<T>(arr: T[], pick: (x:T)=>number) { return arr.reduce((a,c)=>a+pick(c),0); }
