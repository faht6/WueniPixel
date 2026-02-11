export const fetchExchangeRate = async () => {
    // Simulating API call or fixed rate for now
    return 3.85;
};

export const calculateSellingPrice = (ebayPriceUsd, exchangeRate) => {
    // Formula: ((Costo_eBay_USD * 1.07) + 80) * 1.15 * Tipo_Cambio
    const baseWithTax = (ebayPriceUsd * 1.07) + 80;
    const finalUsd = baseWithTax * 1.15;
    const priceSoles = finalUsd * exchangeRate;

    // Round to nearest 10 for cleaner pricing (Optional, but looks better)
    // Or just Math.ceil
    return Math.ceil(priceSoles);
};

export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-PE', {
        style: 'currency',
        currency: 'PEN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
};
