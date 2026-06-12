import normalizeCpf from "./normalizeCpf.js";

export default function validateCpf(cpf) {
  const normalizedCpf = normalizeCpf(cpf);

  if (normalizedCpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(normalizedCpf)) return false;

  let sum = 0;
  for (let i = 0; i < 9; i += 1) {
    sum += Number(normalizedCpf[i]) * (10 - i);
  }

  let firstDigit = (sum * 10) % 11;
  if (firstDigit === 10) firstDigit = 0;
  if (firstDigit !== Number(normalizedCpf[9])) return false;

  sum = 0;
  for (let i = 0; i < 10; i += 1) {
    sum += Number(normalizedCpf[i]) * (11 - i);
  }

  let secondDigit = (sum * 10) % 11;
  if (secondDigit === 10) secondDigit = 0;
  if (secondDigit !== Number(normalizedCpf[10])) return false;

  return true;
}