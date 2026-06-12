export default function normalizeCep(cep) {
  if (!cep) return "";
  return String(cep).replace(/\D/g, "");
}