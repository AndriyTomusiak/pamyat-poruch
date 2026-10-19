export function formatUah(value: number): string {
  return `${new Intl.NumberFormat("uk-UA").format(value)} грн`;
}

export function plain(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
}
