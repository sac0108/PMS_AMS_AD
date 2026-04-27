export const csvExport = (rows, name = 'export.csv') => {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const content = [headers.join(','), ...rows.map((r) => headers.map((h) => `"${String(r[h] ?? '').replaceAll('"', '""')}"`).join(','))].join('\n');
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name;
  link.click();
};

export const badgeClass = (value) => {
  const v = String(value).toLowerCase();
  if (v.includes('critical') || v.includes('high') || v.includes('blocked') || v.includes('risk')) return 'bg-red-100 text-red-700';
  if (v.includes('progress') || v.includes('project')) return 'bg-orange-100 text-orange-700';
  if (v.includes('complete') || v.includes('active') || v.includes('approved') || v.includes('good')) return 'bg-green-100 text-green-700';
  return 'bg-blue-100 text-blue-700';
};
