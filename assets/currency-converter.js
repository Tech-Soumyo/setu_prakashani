const CurrencyConverter = {
  baseCurrency: "INR",
  countryCode: null, // Cache country code

  // Fetch user country using ipapi.co (cache result)
  async getUserCountry() {
    const cachedCountry = localStorage.getItem("user_country");
    if (cachedCountry) {
      const { country, timestamp } = JSON.parse(cachedCountry);
      if (Date.now() - timestamp < 86400000) {
        // Cache for 24 hours
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

  getCurrencyFromCountry(countryCode) {
    const currencyMap = {
      JP: "JPY",
      CN: "CNY",
      US: "USD",
      GB: "GBP",
      DE: "EUR",
      FR: "EUR",
      AU: "AUD",
      CA: "CAD",
      IN: "INR",
      // Add more as needed
    };
    return currencyMap[countryCode] || "INR"; // Default to INR
  },

  convertPrice(priceInINR, targetCurrency) {
    let price = priceInINR;
    // Apply 10% hike if user is outside India
    if (this.countryCode && this.countryCode !== "IN") {
      price = priceInINR * 1.1;
    }

    // Use Shopify's conversion rate
    if (
      window.Shopify?.currency?.active === targetCurrency &&
      window.Shopify?.currency?.rate
    ) {
      const shopifyRate = window.Shopify.currency.rate;
      if (targetCurrency === "INR" || targetCurrency === "JPY") {
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
    const symbols = {
      JPY: "¥ JPY",
      CNY: "¥ CNY",
      INR: window.Shopify?.currency?.code_enabled ? "₹ INR" : "₹",
      USD: window.Shopify?.currency?.code_enabled ? "$ USD" : "$",
      GBP: "£ GBP",
      EUR: "€ EUR",
      AUD: "$ AUD",
      CAD: "$ CAD",
    };
    return `${symbols[currency] || currency}${price}`;
  },

  // Update prices in DOM
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

  //  Shopify's active currency if available, else geolocation-based currency
  console.log(window.Shopify.currency);
  let currency =
    window.Shopify?.currency?.active ||
    CurrencyConverter.getCurrencyFromCountry(CurrencyConverter.countryCode);

  // Ensure currency is supported by Shopify
  if (window.Shopify?.shop?.enabled_currencies) {
    const supportedCurrencies = window.Shopify.shop.enabled_currencies.map(
      (c) => c.iso_code
    );
    if (!supportedCurrencies.includes(currency)) {
      console.warn(`Currency ${currency} not supported. Falling back to INR.`);
      currency = CurrencyConverter.baseCurrency;
    }
  }

  // Update prices initially
  CurrencyConverter.updatePrices(currency);

  // Watch for variant changes or dynamic updates
  const observer = new MutationObserver(() => {
    CurrencyConverter.updatePrices(currency);
  });
  observer.observe(document.body, { childList: true, subtree: true });

  // Listen for Shopify currency selector changes
  document.addEventListener("currency:change", (event) => {
    currency = event.detail.currency || currency;
    CurrencyConverter.updatePrices(currency);
  });
});
