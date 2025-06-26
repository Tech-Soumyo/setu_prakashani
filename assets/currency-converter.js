const CurrencyConverter = {
  baseCurrency: "INR",
  countryCode: null,

  async getUserCountry() {
    const cachedCountry = localStorage.getItem("user_country");
    if (cachedCountry) {
      const { country, timestamp } = JSON.parse(cachedCountry);
      if (Date.now() - timestamp < 86400000) {
        this.countryCode = country;
        return country;
      }
    }
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      this.countryCode = data.country_code || null;
      localStorage.setItem(
        "user_country",
        JSON.stringify({ country: this.countryCode, timestamp: Date.now() })
      );
      return this.countryCode;
    } catch (error) {
      console.error("Error detecting country:", error);
      this.countryCode = null;
      return null;
    }
  },

  getCurrency() {
    if (window.Shopify?.currency?.active) {
      return window.Shopify.currency.active;
    }

    if (window.Shopify?.shop?.enabled_currencies) {
      const supportedCurrencies = window.Shopify.shop.enabled_currencies.map(
        (c) => c.iso_code
      );
      return supportedCurrencies.includes(this.baseCurrency)
        ? this.baseCurrency
        : supportedCurrencies[0] || "INR";
    }

    return this.baseCurrency;
  },

  convertPrice(priceInINR, targetCurrency) {
    let price = priceInINR;

    if (this.countryCode && this.countryCode !== "IN") {
      price = priceInINR * 1.1;
    }

    if (
      window.Shopify?.currency?.active === targetCurrency &&
      window.Shopify?.currency?.rate
    ) {
      const shopifyRate = window.Shopify.currency.rate;

      const zeroDecimalCurrencies = ["INR", "JPY"];
      if (zeroDecimalCurrencies.includes(targetCurrency)) {
        return Math.round(price).toString();
      }
      return (price * shopifyRate).toFixed(2);
    }

    console.warn(`No Shopify currency rate for ${targetCurrency}. Using INR.`);
    return targetCurrency === "INR" || targetCurrency === "JPY"
      ? Math.round(price).toString()
      : price.toFixed(2);
  },

  formatPrice(price, currency) {
    if (window.Shopify?.formatMoney) {
      const priceInCents = Math.round(parseFloat(price) * 100);
      const formatted = window.Shopify.formatMoney(
        priceInCents,
        `{{${currency}}}`
      );

      return window.Shopify?.currency?.code_enabled
        ? `${formatted} ${currency}`
        : formatted;
    }

    console.warn(`Shopify.formatMoney unavailable. Using raw currency code.`);
    return `${currency}${price}`;
  },

  updatePrices(currency) {
    document.querySelectorAll(".price").forEach((priceElement) => {
      const originalPrice = parseFloat(
        priceElement.getAttribute("data-price") || "0"
      );
      const priceMin = parseFloat(
        priceElement.getAttribute("data-price-min") || originalPrice
      );
      const priceMax = parseFloat(
        priceElement.getAttribute("data-price-max") || originalPrice
      );
      const priceDisplayElement =
        priceElement.querySelector("[class*='price-item']") || priceElement;

      if (priceMin !== priceMax) {
        priceDisplayElement.textContent = `From ${this.formatPrice(
          this.convertPrice(priceMin, currency),
          currency
        )}`;
      } else {
        priceDisplayElement.textContent = this.formatPrice(
          this.convertPrice(originalPrice, currency),
          currency
        );
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", async () => {
  await CurrencyConverter.getUserCountry();

  let currency = CurrencyConverter.getCurrency();

  if (window.Shopify?.shop?.enabled_currencies) {
    const supportedCurrencies = window.Shopify.shop.enabled_currencies.map(
      (c) => c.iso_code
    );
    if (!supportedCurrencies.includes(currency)) {
      console.warn(`Currency ${currency} not supported. Falling back to INR.`);
      currency = CurrencyConverter.baseCurrency;
    }
  }

  CurrencyConverter.updatePrices(currency);

  const observer = new MutationObserver(() => {
    CurrencyConverter.updatePrices(currency);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  document.addEventListener("currency:change", (event) => {
    currency = event.detail.currency || currency;
    CurrencyConverter.updatePrices(currency);
  });
});
