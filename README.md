# LOOKSTYLO FASHION - Billing Management System

A modern, feature-rich billing and inventory management application for fashion retail businesses.

## Features

✨ **Complete Billing Solution**
- 💰 Professional invoice generation
- 📦 Inventory management system
- 💸 Expense tracking
- 📊 Financial reports & analytics
- 🏷️ Shipping label creator
- 📊 Standalone barcode generator: [barcode.html](barcode.html)
- 📱 Barcode scanner integration
- ⚙️ Customizable settings

## Quick Start

Requires Node.js 22.13 or newer.

```bash
npm install
npm start
```

Open `http://127.0.0.1:8000`. The server creates `data/lookstylo.sqlite` automatically. Do not open the HTML files directly if you want database persistence.

### Move Existing Browser Data

If you previously opened the app as a local file or on GitHub Pages, open its **Settings** and choose **Download Backup** before switching. Start the backend, open `http://127.0.0.1:8000`, then use **Restore Data** in Settings. Backups include all browser storage keys, including barcode printer state.

## Login Credentials

**Default Admin Access:**
- **User ID:** `admin`
- **Password:** `admin123`

⚠️ **Change these credentials in Settings after first login!**

## Usage

### Billing Tab
- Create new invoices with customer details
- Add items with quantity and rate
- Apply discounts and manage payments
- Print invoices or send via WhatsApp
- Track delivery status

### Inventory Tab
- Manage product stock
- Update item prices
- Track inventory levels

### Expenses Tab
- Record business expenses
- Categorize by payment method
- Monitor spending trends

### Reports Tab
- View financial summaries
- Sales analytics by period
- Payment collection reports
- Expense breakdowns

### Label Creator
- Generate shipping labels with barcodes
- QR codes for order tracking
- Print-ready A5 format

### Scanner
- Barcode/QR code scanning for dispatch
- Track scanned orders
- Real-time synchronization

### Settings
- Update admin credentials
- Configure store branding
- Integrate with Google Sheets
- Set backend server URL
- Backup/restore database

### Automatic WhatsApp e-Bills

The browser fallback opens the customer's WhatsApp chat and downloads the PDF. For automatic PDF delivery, configure Meta WhatsApp Cloud API and run the secure sender:

```bash
copy .env.example .env
npm install
npm run whatsapp-server
```

Fill in the Meta values in `.env`, then set **Settings -> Integrations -> WhatsApp Cloud API URL** to `http://localhost:8787/api/whatsapp/send`. Keep the access token only in `.env`; never place it in `index.html`.

## Data Storage

The Express backend stores every app and barcode page browser-storage key in SQLite at `data/lookstylo.sqlite`. The database is excluded from Git. Browser storage remains as an offline fallback and is synchronized when the app is served by the backend.

The backend binds to `127.0.0.1` by default and is intended for this computer only. GitHub Pages is static hosting and cannot provide this database backend; remote or multi-user hosting needs a secured server deployment and persistent database.

## Technology Stack

- **Frontend:** React 18 with Babel JSX
- **Styling:** Tailwind CSS
- **Barcodes:** JsBarcode
- **QR Codes:** QRCode.js
- **Backend:** Node.js, Express, and SQLite (`node:sqlite`)
- **Storage:** SQLite persistence with browser localStorage fallback

## Browser Support

- Chrome/Chromium (Recommended)
- Firefox
- Safari
- Edge

Requires JavaScript enabled and modern CSS support.

## Customization

Edit these values in `index.html`:

```javascript
// Store name and branding
"name": "LOOKSTYLO FASHION"

// Contact information
"phone": "8680857511"
"address": "Tirupathur, Tamil Nadu"

// Promo codes
const promoDiscount = {
    "FREESHIP": 100,
    "GET350 SHIRT": 350,
    "10% OFF": 10
}
```

## File Structure

```
billing/
├── index.html          # Main application file
├── README.md           # This file
└── .gitignore         # Git ignore rules
```

## Deployment on GitHub Pages

1. Create a new repository on GitHub
2. Push your files:
   ```bash
   git add .
   git commit -m "Initial billing app commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/billing.git
   git push -u origin main
   ```

3. Enable GitHub Pages:
   - Go to Repository Settings → Pages
   - Select "Deploy from a branch"
   - Choose: `main` branch, `/ (root)` folder
   - Save

4. Your app will be available at: `https://yourusername.github.io/billing`

## Support & Contribution

For issues or suggestions, please:
- Check existing issues
- Create a new issue with details
- Submit pull requests with improvements

## License

This project is provided as-is for business use.

---

**Made with ❤️ by Shariff Enterprises**

*Last Updated: June 2026*
