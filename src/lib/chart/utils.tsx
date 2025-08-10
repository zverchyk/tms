// lib/chart/utils.ts
export type Metric = 'earnings' | 'expenses' | 'profit' | 'sessions';

export function formatDate(d: Date) {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

export function formatValue(n: number) {
  return Intl.NumberFormat(undefined, { maximumFractionDigits: 2 }).format(n);
}

export function getMetricLabel(metric: Metric) {
  switch (metric) {
    case 'expenses': return 'Expenses';
    case 'profit':   return 'Profit';
    case 'sessions': return 'Sessions';
    default:         return 'Earnings';
  }
}

export function getYAxisData<T extends { value: number }>(data: T[]) {
  return data.map(d => d.value);
}

export function getChartColor(metric: Metric) {
  switch (metric) {
    case 'expenses': return '#ef4444';
    case 'profit':   return '#10b981';
    case 'sessions': return '#f59e0b';
    default:         return '#3b82f6';
  }
}
