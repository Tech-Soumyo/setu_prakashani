const ShopifyNativeCurrencyConverter = {
  // Cache for enabled currencies and rates
  enabledCurrencies: [],
  rates: {},
  currentCurrency: null,
  baseCurrency: null,

  /**
   * Initialize the converter by fetching Shopify's enabled currencies
   */
  async init() {
    try {
      await this.fetchShopifyEnabledCurrencies();
      await this.fetchExchangeRates();
      this.currentCurrency = this.getCurrentShopifyCurrency();
      this.baseCurrency = this.getShopBaseCurrency();
      // Geolocation-based suggestion
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

  /**
   * Fetch enabled currencies from Shopify
   * Uses multiple methods to get currency information
   */
  async fetchShopifyEnabledCurrencies() {
    // Method 1: Check if currencies are available in window.Shopify
    if (window.Shopify?.shop?.enabled_currencies) {
      this.enabledCurrencies = window.Shopify.shop.enabled_currencies;
      return;
    }

    // Method 2: Try to fetch from theme settings or meta tags
    const currencyMeta = document.querySelector('meta[name="currencies"]');
    if (currencyMeta) {
      this.enabledCurrencies = currencyMeta.content
        .split(",")
        .map((c) => c.trim());
      return;
    }

    // Method 3: Check existing localization forms for currency options
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

    // Method 4: Fallback - try to detect from existing price elements
    await this.detectCurrenciesFromPrices();

    // Method 5: Ultimate fallback
    if (this.enabledCurrencies.length === 0) {
      console.warn("Could not detect enabled currencies, using defaults");
      this.enabledCurrencies = ["USD", "EUR", "GBP", "CAD", "AUD"];
    }
  },

  /**
   * Detect currencies from existing price elements on the page
   */
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

  /**
   * Extract currency code from text content
   */
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

  /**
   * Get current Shopify currency
   */
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

  /**
   * Get base currency (shop's default currency)
   */
  getShopBaseCurrency() {
    return (
      window.Shopify?.shop?.currency ||
      window.Shopify?.shop?.money_format?.match(/[A-Z]{3}/)?.[0] ||
      "USD"
    );
  },

  /**
   * Get currency from existing localization form
   */
  getCurrencyFromLocalization() {
    const form = document.querySelector('form[action="/localization"]');
    if (!form) return null;

    const selectedCurrency = form.querySelector(
      'input[name="currency_code"]:checked, select[name="currency_code"]'
    );
    return selectedCurrency?.value || null;
  },

  /**
   * Fetch exchange rates (you can use your preferred API)
   */
  async fetchExchangeRates() {
    // Use in-memory storage instead of localStorage for rates
    if (this.rates && Object.keys(this.rates).length > 0) {
      return; // Already have rates
    }

    try {
      // You can replace this with your preferred exchange rate API
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${this.baseCurrency}`
      );
      const data = await response.json();

      if (data && data.rates) {
        this.rates = data.rates;
        // Add base currency rate
        this.rates[this.baseCurrency] = 1;
      }
    } catch (error) {
      console.error("Failed to fetch exchange rates:", error);
      // Fallback rates
      this.rates = { [this.baseCurrency]: 1 };
    }
  },

  /**
   * Setup native Shopify currency selector
   */
  setupCurrencySelector() {
    // First, check if there's already a localization form
    let localizationForm = document.querySelector(
      'form[action="/localization"]'
    );

    if (!localizationForm) {
      // Create the localization form using Shopify's recommended structure
      localizationForm = this.createLocalizationForm();
    } else {
      // Enhance existing form
      this.enhanceExistingForm(localizationForm);
    }

    // Add auto-submission functionality
    this.makeFormAutoSubmit(localizationForm);
  },

  /**
   * Create a proper Shopify localization form
   */
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

    // Insert the form into the page (you can customize the location)
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

  /**
   * Enhance existing localization form
   */
  enhanceExistingForm(form) {
    const currencySelect = form.querySelector('select[name="currency_code"]');
    if (currencySelect) {
      // Update options with enabled currencies
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

  /**
   * Format currency option display
   */
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

  /**
   * Make the form auto-submit on currency change
   */
  makeFormAutoSubmit(form) {
    const currencySelect = form.querySelector('select[name="currency_code"]');
    if (!currencySelect) return;

    currencySelect.addEventListener("change", (e) => {
      const selectedCurrency = e.target.value;

      // Update current currency
      this.currentCurrency = selectedCurrency;

      // Show loading state
      this.showLoadingState();

      // Submit the form to let Shopify handle the currency change
      form.submit();
    });
  },

  /**
   * Bind events for currency changes
   */
  bindEvents() {
    // Listen for Shopify's currency change events
    document.addEventListener("currency:changed", (e) => {
      this.currentCurrency = e.detail.currency;
      this.updatePriceDisplays();
    });

    // Listen for page load events that might indicate currency change
    window.addEventListener("shopify:currency:change", (e) => {
      this.currentCurrency = e.detail.currency;
      this.updatePriceDisplays();
    });

    // Observe DOM mutations for dynamic content
    this.observePriceElements();
  },

  /**
   * Observe price elements for dynamic updates
   */
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

  /**
   * Update price displays (for dynamic content)
   */
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

  /**
   * Convert price between currencies
   */
  convertPrice(amount, fromCurrency, toCurrency) {
    if (fromCurrency === toCurrency) return amount;

    const fromRate = this.rates[fromCurrency] || 1;
    const toRate = this.rates[toCurrency] || 1;

    // Convert to base currency first, then to target currency
    const baseAmount = amount / fromRate;
    return baseAmount * toRate;
  },

  /**
   * Format price with currency symbol
   */
  formatPrice(amount, currencyCode) {
    try {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: currencyCode === "JPY" ? 0 : 2,
        maximumFractionDigits: currencyCode === "JPY" ? 0 : 2,
      }).format(amount);
    } catch (error) {
      // Fallback formatting
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

  /**
   * Show loading state during currency changes
   */
  showLoadingState() {
    const selector = document.querySelector(".currency-selector");
    if (selector) {
      selector.disabled = true;
      selector.style.opacity = "0.6";

      // Re-enable after a short delay (Shopify will handle the actual change)
      setTimeout(() => {
        selector.disabled = false;
        selector.style.opacity = "1";
      }, 1000);
    }
  },

  /**
   * Handle initialization errors gracefully
   */
  handleInitializationError(error) {
    console.error("Currency converter initialization failed:", error);

    // Show user-friendly error message
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

    // Show error for 5 seconds
    errorMessage.style.display = "block";
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 5000);
  },

  /**
   * Get list of enabled currencies
   */
  getEnabledCurrencies() {
    return this.enabledCurrencies;
  },

  /**
   * Get current currency
   */
  getCurrentCurrency() {
    return this.currentCurrency;
  },

  /**
   * Manual currency change (if needed)
   */
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

  /**
   * Geolocation-based currency suggestion
   */
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
    // Map country code to currency code using enabledCurrencies
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
      // ...add more as needed
    };
    const currency = countryCurrencyMap[countryCode] || null;
    if (currency && this.enabledCurrencies.includes(currency)) return currency;
    // fallback: first enabled currency
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

  /**
   * Ensure price elements have data-original-price and data-original-currency for compatibility
   */
  ensurePriceAttributes() {
    const priceElements = document.querySelectorAll(
      ".price-item, .money, .price"
    );
    priceElements.forEach((el) => {
      if (!el.hasAttribute("data-original-price")) {
        // Try to extract price from data-price or text
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

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  ShopifyNativeCurrencyConverter.init();
});

// Also initialize if DOM is already loaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    ShopifyNativeCurrencyConverter.init();
  });
} else {
  ShopifyNativeCurrencyConverter.init();
}

// Export for global access
window.ShopifyNativeCurrencyConverter = ShopifyNativeCurrencyConverter;
