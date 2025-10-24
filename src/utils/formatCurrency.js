// Format currency to Indonesian Rupiah
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format number with thousand separator
export const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number);
};