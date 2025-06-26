const ShopifyNativeCurrencyConverter = {
  enabledCurrencies: [],
  rates: {},
  currentCurrency: null,
  baseCurrency: null,

  async init() {
    try {
      await this.fetchShopifyEnabledCurrencies();
      await this.fetchExchangeRates();
      this.currentCurrency = this.getCurrentShopifyCurrency();
      this.baseCurrency = this.getShopBaseCurrency();

      if (!this.currentCurrency || this.currentCurrency === this.baseCurrency) {
        const suggestedCurrency = await this.suggestCurrencyByGeolocation();
        if (
          suggestedCurrency &&
          suggestedCurrency !== this.baseCurrency &&
          this.enabledCurrencies.includes(suggestedCurrency)
        ) {
          this.showCurrencySuggestionPrompt(suggestedCurrency);
        }
      }
      this.setupCurrencySelector();
      this.bindEvents();
      this.ensurePriceAttributes();
      console.log("Shopify Native Currency Converter initialized successfully");
    } catch (error) {
      console.error("Failed to initialize currency converter:", error);
      this.handleInitializationError(error);
    }
  },

  async fetchShopifyEnabledCurrencies() {
    if (window.Shopify?.shop?.enabled_currencies) {
      this.enabledCurrencies = window.Shopify.shop.enabled_currencies;
      return;
    }

    const currencyMeta = document.querySelector('meta[name="currencies"]');
    if (currencyMeta) {
      this.enabledCurrencies = currencyMeta.content
        .split(",")
        .map((c) => c.trim());
      return;
    }

    const localizationForm = document.querySelector(
      'form[action="/localization"]'
    );
    if (localizationForm) {
      const currencyInputs = localizationForm.querySelectorAll(
        'input[name="currency_code"], option[value]'
      );
      this.enabledCurrencies = Array.from(currencyInputs)
        .map((input) => input.value || input.getAttribute("value"))
        .filter(Boolean);
      if (this.enabledCurrencies.length > 0) return;
    }

    await this.detectCurrenciesFromPrices();

    if (this.enabledCurrencies.length === 0) {
      console.warn("Could not detect enabled currencies, using defaults");
      this.enabledCurrencies = ["USD", "EUR", "GBP", "CAD", "AUD"];
    }
  },

  async detectCurrenciesFromPrices() {
    const priceElements = document.querySelectorAll(
      "[data-currency-code], .money, .price"
    );
    const detectedCurrencies = new Set();

    priceElements.forEach((element) => {
      const currencyCode =
        element.getAttribute("data-currency-code") ||
        element.getAttribute("data-currency") ||
        this.extractCurrencyFromText(element.textContent);
      if (currencyCode) {
        detectedCurrencies.add(currencyCode);
      }
    });

    if (detectedCurrencies.size > 0) {
      this.enabledCurrencies = Array.from(detectedCurrencies);
    }
  },

  extractCurrencyFromText(text) {
    const currencySymbols = {
      $: "USD",
      "€": "EUR",
      "£": "GBP",
      "¥": "JPY",
      "₹": "INR",
      C$: "CAD",
      A$: "AUD",
      S$: "SGD",
    };

    for (const [symbol, code] of Object.entries(currencySymbols)) {
      if (text.includes(symbol)) return code;
    }

    // Look for currency codes in text
    const codeMatch = text.match(/[A-Z]{3}/);
    return codeMatch ? codeMatch[0] : null;
  },

  getCurrentShopifyCurrency() {
    // Check multiple sources for current currency
    return (
      window.Shopify?.currency?.active ||
      window.Shopify?.currency?.code ||
      document.querySelector('meta[name="currency"]')?.content ||
      this.getCurrencyFromLocalization() ||
      "USD"
    );
  },

  getShopBaseCurrency() {
    return (
      window.Shopify?.shop?.currency ||
      window.Shopify?.shop?.money_format?.match(/[A-Z]{3}/)?.[0] ||
      "USD"
    );
  },

  getCurrencyFromLocalization() {
    const form = document.querySelector('form[action="/localization"]');
    if (!form) return null;

    const selectedCurrency = form.querySelector(
      'input[name="currency_code"]:checked, select[name="currency_code"]'
    );
    return selectedCurrency?.value || null;
  },

  async fetchExchangeRates() {
    if (this.rates && Object.keys(this.rates).length > 0) {
      return;
    }

    try {
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`
      );
      const data = await response.json();

      if (data && data.rates) {
        this.rates = data.rates;

        this.rates[this.baseCurrency] = 1;
      }
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error);

      this.rates = { [this.baseCurrency]: 1 };
    }
  },

  setupCurrencySelector() {
    let localizationForm = document.querySelector(
      'form[action="/localization"]'
    );

    if (!localizationForm) {
      localizationForm = this.createLocalizationForm();
    } else {
      this.enhanceExistingForm(localizationForm);
    }

    this.makeFormAutoSubmit(localizationForm);
  },

  createLocalizationForm() {
    const formHTML = `
        <form action="/localization" method="post" class="shopify-localization-form" id="localization-form">
          <input type="hidden" name="form_type" value="localization">
          <input type="hidden" name="utf8" value="✓">
          <input type="hidden" name="_method" value="put">
          <input type="hidden" name="return_to" value="${
            window.location.pathname
          }${window.location.search}">
          
          <div class="currency-selector-wrapper">
            <label for="localization-currency" class="visually-hidden">Currency</label>
            <select name="currency_code" id="localization-currency" class="currency-selector">
              ${this.enabledCurrencies
                .map(
                  (currency) => `
                <option value="${currency}" ${
                    currency === this.currentCurrency ? "selected" : ""
                  }>
                  ${this.formatCurrencyOption(currency)}
                </option>
              `
                )
                .join("")}
            </select>
          </div>
        </form>
      `;

    const targetElement =
      document.querySelector("header .header-wrapper") ||
      document.querySelector(".site-header") ||
      document.querySelector("header") ||
      document.body;

    const formContainer = document.createElement("div");
    formContainer.innerHTML = formHTML;
    targetElement.appendChild(formContainer.firstElementChild);

    return document.getElementById("localization-form");
  },

  enhanceExistingForm(form) {
    const currencySelect = form.querySelector('select[name="currency_code"]');
    if (currencySelect) {
      currencySelect.innerHTML = this.enabledCurrencies
        .map(
          (currency) => `
          <option value="${currency}" ${
            currency === this.currentCurrency ? "selected" : ""
          }>
            ${this.formatCurrencyOption(currency)}
          </option>
        `
        )
        .join("");
    }
  },

  formatCurrencyOption(currencyCode) {
    const currencyNames = {
      USD: "🇺🇸 USD - US Dollar",
      EUR: "🇪🇺 EUR - Euro",
      GBP: "🇬🇧 GBP - British Pound",
      CAD: "🇨🇦 CAD - Canadian Dollar",
      AUD: "🇦🇺 AUD - Australian Dollar",
      JPY: "🇯🇵 JPY - Japanese Yen",
      INR: "🇮🇳 INR - Indian Rupee",
      SGD: "🇸🇬 SGD - Singapore Dollar",
      NZD: "🇳🇿 NZD - New Zealand Dollar",
      CHF: "🇨🇭 CHF - Swiss Franc",
      NOK: "🇳🇴 NOK - Norwegian Krone",
      SEK: "🇸🇪 SEK - Swedish Krona",
      DKK: "🇩🇰 DKK - Danish Krone",
    };

    return currencyNames[currencyCode] || `${currencyCode}`;
  },

  makeFormAutoSubmit(form) {
    const currencySelect = form.querySelector('select[name="currency_code"]');
    if (!currencySelect) return;

    currencySelect.addEventListener("change", (e) => {
      const selectedCurrency = e.target.value;

      this.currentCurrency = selectedCurrency;

      this.showLoadingState();

      form.submit();
    });
  },

  bindEvents() {
    document.addEventListener("currency:changed", (e) => {
      this.currentCurrency = e.detail.currency;
      this.updatePriceDisplays();
    });

    window.addEventListener("shopify:currency:change", (e) => {
      this.currentCurrency = e.detail.currency;
      this.updatePriceDisplays();
    });

    this.observePriceElements();
  },

  observePriceElements() {
    const observer = new MutationObserver((mutations) => {
      let shouldUpdate = false;

      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            if (
              node.matches?.(".money, .price, [data-currency-code]") ||
              node.querySelector?.(".money, .price, [data-currency-code]")
            ) {
              shouldUpdate = true;
            }
          }
        });
      });

      if (shouldUpdate) {
        setTimeout(() => this.updatePriceDisplays(), 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  },

  updatePriceDisplays() {
    const priceElements = document.querySelectorAll(
      ".money, .price, [data-currency-code]"
    );

    priceElements.forEach((element) => {
      const originalPrice = element.getAttribute("data-original-price");
      const originalCurrency = element.getAttribute("data-original-currency");

      if (
        originalPrice &&
        originalCurrency &&
        originalCurrency !== this.currentCurrency
      ) {
        const convertedPrice = this.convertPrice(
          parseFloat(originalPrice),
          originalCurrency,
          this.currentCurrency
        );
        const formattedPrice = this.formatPrice(
          convertedPrice,
          this.currentCurrency
        );
        element.textContent = formattedPrice;
        element.setAttribute("data-currency-code", this.currentCurrency);
      }
    });
  },

  convertPrice(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;

    const fromRate = this.rates[fromCurrency] || 1;
    const toRate = this.rates[toCurrency] || 1;

    const baseAmount = amount / fromRate;
    return baseAmount * toRate;
  },

  formatPrice(amount, currencyCode) {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: currencyCode === "JPY" ? 0 : 2,
        maximumFractionDigits: currencyCode === "JPY" ? 0 : 2,
      }).format(amount);
    } catch (error) {
      const symbols = {
        USD: "$",
        EUR: "€",
        GBP: "£",
        JPY: "¥",
        INR: "₹",
        CAD: "C$",
        AUD: "A$",
      };
      const symbol = symbols[currencyCode] || currencyCode;
      return `${symbol}${amount.toFixed(2)}`;
    }
  },

  showLoadingState() {
    const selector = document.querySelector(".currency-selector");
    if (selector) {
      selector.disabled = true;
      selector.style.opacity = "0.6";

      setTimeout(() => {
        selector.disabled = false;
        selector.style.opacity = "1";
      }, 1000);
    }
  },

  handleInitializationError(error) {
    console.error("Currency converter initialization failed:", error);

    const errorMessage = document.createElement("div");
    errorMessage.className = "currency-error-message";
    errorMessage.style.cssText = `
        background: #f8d7da;
        color: #721c24;
        padding: 10px;
        border-radius: 4px;
        margin: 10px;
        font-size: 14px;
        display: none;
      `;
    errorMessage.textContent =
      "Currency selector temporarily unavailable. Please refresh the page.";

    document.body.appendChild(errorMessage);

    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 5000);
  },

  getEnabledCurrencies() {
    return this.enabledCurrencies;
  },

  getCurrentCurrency() {
    return this.currentCurrency;
  },

  changeCurrency(currencyCode) {
    if (!this.enabledCurrencies.includes(currencyCode)) {
      console.warn(`Currency ${currencyCode} is not enabled for this shop`);
      return;
    }

    const form = document.querySelector('form[action="/localization"]');
    const currencySelect = form?.querySelector('select[name="currency_code"]');

    if (currencySelect) {
      currencySelect.value = currencyCode;
      currencySelect.dispatchEvent(new Event("change", { bubbles: true }));
    }
  },

  async suggestCurrencyByGeolocation() {
    try {
      const cachedCountry = localStorage.getItem("user_country");
      const cacheTimestamp = localStorage.getItem("user_country_timestamp");
      if (
        cachedCountry &&
        cacheTimestamp &&
        Date.now() - cacheTimestamp < 86400000
      ) {
        return this.getCurrencyFromCountry(cachedCountry);
      }
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      if (data && data.country_code) {
        localStorage.setItem("user_country", data.country_code);
        localStorage.setItem("user_country_timestamp", Date.now());
        return this.getCurrencyFromCountry(data.country_code);
      }
    } catch (error) {
      console.warn("Geolocation failed:", error);
    }
    return null;
  },

  getCurrencyFromCountry(countryCode) {
    const countryCurrencyMap = {
      US: "USD",
      CA: "CAD",
      GB: "GBP",
      AU: "AUD",
      IN: "INR",
      JP: "JPY",
      SG: "SGD",
      NZ: "NZD",
      CH: "CHF",
      NO: "NOK",
      SE: "SEK",
      DK: "DKK",
      EU: "EUR",
    };
    const currency = countryCurrencyMap[countryCode] || null;
    if (currency && this.enabledCurrencies.includes(currency)) return currency;

    return this.enabledCurrencies[0] || this.baseCurrency;
  },

  showCurrencySuggestionPrompt(suggestedCurrency) {
    if (document.querySelector(".currency-suggestion-prompt")) return;
    const prompt = document.createElement("div");
    prompt.className = "currency-suggestion-prompt";
    prompt.setAttribute("role", "dialog");
    prompt.innerHTML = `
      <div style="background:#fff;border:1px solid #ccc;padding:16px;max-width:320px;margin:32px auto;z-index:9999;position:fixed;left:0;right:0;top:10%">
        <p>We noticed you're shopping from a region that uses <b>${suggestedCurrency}</b>. Would you like to switch?</p>
        <button id="currency-suggest-yes">Yes, switch to ${suggestedCurrency}</button>
        <button id="currency-suggest-no">No, stay in ${this.baseCurrency}</button>
      </div>
    `;
    document.body.appendChild(prompt);
    document.getElementById("currency-suggest-yes").onclick = () => {
      this.changeCurrency(suggestedCurrency);
      prompt.remove();
    };
    document.getElementById("currency-suggest-no").onclick = () => {
      prompt.remove();
    };
  },

  ensurePriceAttributes() {
    const priceElements = document.querySelectorAll(
      ".price-item, .money, .price"
    );
    priceElements.forEach((el) => {
      if (!el.hasAttribute("data-original-price")) {
        let price = el.getAttribute("data-price");
        if (!price) {
          const text = el.textContent.replace(/[^\d.,]/g, "").replace(/,/g, "");
          price = parseFloat(text) || 0;
        }
        el.setAttribute("data-original-price", price);
      }
      if (!el.hasAttribute("data-original-currency")) {
        el.setAttribute("data-original-currency", this.baseCurrency);
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", () => {
  ShopifyNativeCurrencyConverter.init();
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    ShopifyNativeCurrencyConverter.init();
  });
} else {
  ShopifyNativeCurrencyConverter.init();
}

window.ShopifyNativeCurrencyConverter = ShopifyNativeCurrencyConverter;
