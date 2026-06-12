export default function normalizeCpf(cpf) {
  if (!cpf) return "";
  return String(cpf).replace(/\D/g, "");
}