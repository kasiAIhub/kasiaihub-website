/** Normalise a South African mobile number to +27XXXXXXXXX, or null if invalid. */
export function normaliseSaWhatsApp(input: string): string | null {
  const digits = input.replace(/[\s\-().]/g, "");
  let local: string | null = null;
  if (/^\+27\d{9}$/.test(digits)) local = digits.slice(3);
  else if (/^0027\d{9}$/.test(digits)) local = digits.slice(4);
  else if (/^27\d{9}$/.test(digits)) local = digits.slice(2);
  else if (/^0\d{9}$/.test(digits)) local = digits.slice(1);
  if (!local || !/^[6-8]/.test(local)) return null;
  return `+27${local}`;
}
