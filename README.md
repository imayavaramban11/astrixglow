# Astrix Glow — Enterprise Barcode Label Manufacturing Web Portal

A high-performance, single-page enterprise web application for Astrix Glow, featuring a premium dark-luxury technology aesthetic. The website is built using standard, lightweight **HTML5, CSS3 (Vanilla), and JavaScript (ES6)** without external CSS or JS framework overhead.

---

## 📋 1. Project Overview

* **Design Aesthetics**: Sleek dark technology style combining Stripe-inspired gradients, Linear-inspired borders/glowing grids, Vercel-style card spotlights, and Apple-like responsive typography.
* **Performance Optimization**: 100% WebP image delivery and hardware-accelerated animated graphics (`will-change: transform`).
* **Accessibility**: Fully compliant with WCAG 2.1 AA (including skip links, high-contrast outline states, and dynamic ARIA state management).
* **Hydration System**: Zero hardcoded business content in the HTML layout. Copy, navigation, features, timelines, and CTA parameters are populated dynamically from `content.json` at runtime.

---

## ⚙️ 2. Installation

### Prerequisites
* **Node.js**: Version 16.0.0 or higher is required (Node.js LTS is recommended).

### Set Up
1. Clone or copy the repository to your local directory.
2. Open a terminal in the project root directory and run:
   ```bash
   npm install
   ```
   This will install the local development server and Lighthouse audit tools as development dependencies.

---

## 💻 3. Development Workflow

To start a local server and bypass browser CORS policies while loading `content.json`:
1. Start the server:
   ```bash
   npm run dev
   ```
2. Open your browser and navigate to:
   ```text
   http://localhost:3000
   ```

---

## 🛠️ 4. Build Process

If you modify the core stylesheets (`css/styles.css`) or script files (`js/main.js`), you must compile and bundle them into their minified versions to maintain Lighthouse performance metrics:

1. Run the build script:
   ```bash
   npm run build
   ```
   *(Alternatively, you can run `npm run minify` which executes the same process).*
2. The script executes a portable Node utility (`scripts/minify.js`) that automatically strips comments, collapses spacing, and outputs to `css/styles.min.css` and `js/main.min.js`.

---

## 🚀 5. Deployment Instructions

### Netlify Deployment
1. Log in to your Netlify dashboard.
2. Select **Add new site** -> **Deploy manually**.
3. Drag and drop the root `astrix-glow` project folder into the uploader.

### Vercel Deployment
1. Ensure the Vercel CLI is installed globally: `npm install -g vercel`.
2. Run the deployment command inside the project root:
   ```bash
   vercel
   ```
3. To deploy to production:
   ```bash
   vercel --prod
   ```

### Traditional Web Hosting (cPanel)
1. Upload all files (including `css/`, `js/`, `assets/`, and root files) to your target root folder (typically `public_html`).
2. Add the following rules to your `.htaccess` file to force HTTPS redirection:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## ✏️ 6. Content.json Editing Guide

To change any copy, labels, stats, addresses, or telephone lines, edit the `content.json` file. The Javascript hydration script will automatically sync updates across the website.

* **WhatsApp CTA**:
  Modify `site.whatsapp` (phone number with country code, e.g. `91890060614`) and `site.whatsappMessage` (default text).
* **Company Milestones**:
  Add or edit objects in the `milestones` array:
  `{ "year": "2026", "event": "Launched next-gen transponders" }`
* **Footer Certifications**:
  Edit items in the `certifications` array list to immediately update footer badges.

---

## 🛡️ 7. Troubleshooting

### Content not loading (Blank fields)
* Open browser developer console (`F12`).
* Check for CORS errors: If testing locally via the `file://` protocol, browsers block JSON fetch requests. You must start a local web server (using `npm run dev` or VS Code Live Server) to bypass this restriction. The page has a built-in fallback containing default copy if fetch fails.

### Running Audits locally
To run a local Lighthouse audit report (Performance, Accessibility, Best Practices, SEO):
1. Start the dev server in one terminal window: `npm run dev`.
2. Run the audit script in another:
   ```bash
   npm run lighthouse
   ```
3. An HTML and JSON audit report will be written to the project root directory.
