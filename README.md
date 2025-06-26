# Shopify Theme Project - Contribution Guide

Welcome to the **Shopify Theme Project**! This project powers a customizable Shopify storefront, with a strong focus on modular, maintainable, and scalable JavaScript enhancements. We welcome contributions from developers of all backgrounds to help us build a better e-commerce experience.

---

## 🚀 Project Overview

This repository contains the source code for a Shopify theme, including:

- Liquid templates and sections
- CSS and SVG assets
- JavaScript files for dynamic storefront features (in `assets/`)
- Localization and configuration files

Our JavaScript files power features like currency conversion, cart management, product galleries, and more.

---

## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone <your-fork-url>
   cd <repo-directory>
   ```
2. **Explore the `assets/` directory:**
   All JavaScript files are located in the `assets/` folder. Each file is responsible for a specific feature or enhancement.
3. **Set up your development environment:**
   - Use a modern code editor (e.g., VS Code).
   - Install [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) for local theme development and preview.
   - Follow Shopify's [theme development guide](https://shopify.dev/docs/themes/getting-started/).

---

# Contribution Note

This project includes a custom JavaScript file, `assets/currency-converter.js`, which I contributed to enhance the storefront's currency handling. My work on this file enables the following features:

- **Automatic User Country Detection:** Uses IP geolocation to determine the user's country and cache the result for performance.
- **Dynamic Currency Conversion:** Converts and displays product prices based on the user's location and Shopify's supported currencies.
- **Seamless Integration:** Updates all price elements on the page in real-time, including when the DOM changes or the user switches currencies.
- **Shopify Compatibility:** Leverages Shopify's global objects and settings for accurate and consistent currency formatting.

This contribution improves the shopping experience for international customers by ensuring prices are always shown in the most relevant currency.

Thank you for making this Shopify theme better! Your contributions make a difference. ✨
