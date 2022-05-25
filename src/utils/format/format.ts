export function removeComma(value: string): string {
  if (!value) return '';
  return value.replace(/,/g, '');
}
