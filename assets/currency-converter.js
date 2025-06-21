const CurrencyConverter = {
  rates: {},
  apiKey: "82a52b8832f6a406a4fce8ff",
  baseCurrency: "INR",

  async fetchRates() {
    try {
      const response = await fetch(
        `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/${this.baseCurrency}`
      );
      const data = await response.json();
      if (data && data.conversion_rates) {
        this.rates = data.conversion_rates;
      } else {
        throw new Error("Invalid rates data");
      }
    } catch (error) {
      console.error("Error fetching exchange rates:", error);

      this.rates = { INR: 1 };
    }
  },

  async getUserCountry() {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      return data.country;
    } catch (error) {
      console.error("Error detecting country:", error);
      return null;
    }
  },

  getCurrencyFromCountry(countryCode) {
    const currencyMap = {
      JP: "JPY",
      CN: "CNY",
      US: "USD",
    };
    return currencyMap[countryCode] || "INR";
  },

  convertPrice(priceInINR, targetCurrency) {
    let price = priceInINR;
    if (targetCurrency !== "INR") {
      price = priceInINR * 1.1;
    }
    if (targetCurrency === "INR") return price.toFixed(2);
    const rate = this.rates[targetCurrency];
    if (!rate) return price.toFixed(2);
    return (price * rate).toFixed(2);
  },

  formatPrice(price, currency) {
    const symbols = {
      JPY: "¥",
      CNY: "¥",
      INR: "₹",
      USD: "$",
    };
    return `${symbols[currency] || ""}${price}`;
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  await CurrencyConverter.fetchRates();
  const countryCode = await CurrencyConverter.getUserCountry();
  const currency = CurrencyConverter.getCurrencyFromCountry(countryCode);

  document.querySelectorAll(".price").forEach((priceElement) => {
    const originalPrice = parseFloat(
      priceElement.getAttribute("data-price") || "0"
    );
    const convertedPrice = CurrencyConverter.convertPrice(
      originalPrice,
      currency
    );
    const formattedPrice = CurrencyConverter.formatPrice(
      convertedPrice,
      currency
    );

    const priceDisplayElement = priceElement.querySelector(
      ".price-item--regular, .price-item--sale"
    );
    if (priceDisplayElement) {
      priceDisplayElement.textContent = formattedPrice;
    }
  });
});
