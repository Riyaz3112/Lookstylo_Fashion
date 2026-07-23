# Price Tag Label Printing Software - User Guide

## Overview

The **Price Tags** feature is a professional price label printing solution integrated into the LOOKSTYLO FASHION billing system. It allows you to create and print up to **27 price labels on a single A4 sheet** with a clean, professional design.

## Features

✨ **Key Features:**
- **Professional Price Tag Design** - Customizable product name, SKU, and price
- **27 Labels Per A4 Sheet** - Optimal 3-column × 9-row grid layout
- **Batch Printing** - Add multiple items and print them all on one sheet
- **SKU Support** - Include product codes/SKUs on labels
- **Quantity Control** - Print 1-27 labels per item
- **Local Storage** - All items are automatically saved to your browser
- **Print-Ready** - Optimized for direct printing on standard label sheets
- **Brand Customization** - Displays your store name (LOOKSTYLO FASHION)

## How to Use

### Step 1: Access Price Tags
1. Open the billing application and login with your credentials
2. Click the **"Price Tags"** tab in the navigation menu

### Step 2: Add a Product
Fill in the product details:

| Field | Required | Example | Notes |
|-------|----------|---------|-------|
| **Product Name** | ✓ Yes | "Summer T-Shirt" | Product display name |
| **SKU / Code** | Optional | "TSH-SUM-001" | Product code or barcode |
| **Price (₹)** | ✓ Yes | "599" | Price in Rupees |
| **Quantity (1-27)** | Optional | "27" | How many labels to print (max 27) |

### Step 3: Add to List
- Click the **"Add Item"** button
- The item appears in the "Items to Print" list on the left
- The price tag preview appears on the right showing all labels

### Step 4: Repeat (Optional)
Add more products:
- The form clears after each addition
- Add another product and repeat
- All items will appear on the same printed sheet (total max 27 labels)

### Step 5: Print
- Click the **"Print Price Tags"** button
- A print dialog will open
- Select your printer
- Ensure your printer settings match A4 size
- Click Print

## Price Tag Label Details

Each label (63mm × 73mm) contains:

```
┌──────────────────────┐
│   PRODUCT NAME      │ ← Uppercase product name
│                     │
│   SKU-CODE          │ ← Optional SKU/barcode
├──────────────────────┤
│                     │
│   PRICE             │
│   ₹599              │ ← Price in large red font
│                     │
├──────────────────────┤
│ LOOKSTYLO FASHION   │ ← Store branding
└──────────────────────┘
```

## Grid Layout (A4 Sheet)

```
Standard A4 Paper (210mm × 297mm)
Printing Layout: 3 Columns × 9 Rows = 27 Labels

[Label 1]  [Label 2]  [Label 3]
[Label 4]  [Label 5]  [Label 6]
[Label 7]  [Label 8]  [Label 9]
...continues to Label 27
```

## Recommended Label Sheets

For best results, use:
- **Size:** A4 sticker sheets, 63×73mm per label
- **Material:** Glossy or matte label stock
- **Weight:** 100-150 gsm
- **Supplier:** Avery, Brother, or equivalent
- **Product Code:** Search for "63x73 labels per sheet" or "27 labels per sheet"

## Tips & Best Practices

### ✓ Do's
- **Preview before printing** - Check the preview panel to ensure all labels look correct
- **Use high-quality labels** - Better adhesion and appearance
- **Test print** - Do a test print on plain paper first
- **Update pricing regularly** - Labels stay saved locally for future use
- **Batch similar items** - Group products by category for faster processing

### ✗ Don'ts
- Don't exceed 27 labels per sheet
- Don't use labels larger than 63×73mm
- Don't skip the SKU field if you need barcodes
- Don't print without checking the preview first

## Local Data Storage

The application automatically saves all your price tag items in your browser's local storage:
- Data persists between sessions
- Data is stored only on your device
- Clearing browser data will remove saved items
- Export data regularly as backup

## Managing Items

### To Remove an Item:
1. Hover over the item in the "Items to Print" list
2. Click the trash/delete icon that appears
3. The item is removed instantly

### To Remove All Items:
Currently, you need to remove items one by one. To clear all:
1. Remove each item individually using the delete button
2. Alternatively, clear browser storage for a fresh start

## Print Settings Guide

### For Best Results:

**Printer Settings:**
- Page size: A4 (210 × 297 mm)
- Margins: Minimal or None
- Scaling: 100% (no scaling)
- Color: Color (for red price text)

**Label Sheet Alignment:**
- Ensure label sheet is inserted correctly
- Check for proper alignment before pressing print
- Use the correct tray if printer has multiple input trays

## Troubleshooting

### Issue: Labels not aligned properly
- **Solution:** Adjust the label sheet alignment or printer settings
- Verify you're using correctly formatted label sheets (63×73mm)

### Issue: Text is cut off
- **Solution:** Check printer margins in print settings
- Set margins to "None" or "Minimal"
- Ensure full page scaling is at 100%

### Issue: Items not saving
- **Solution:** Enable cookies/local storage in browser settings
- Some browsers in private mode disable local storage

### Issue: Can't print
- **Solution:** Ensure printer is connected and ready
- Check browser permissions for printing
- Try refreshing the page and try again

## Storage & Backup

### Automatic Features:
- Items automatically save to local storage
- No manual save button needed
- Data persists after closing the application

### Manual Backup:
To back up your price tag items:
1. Open browser console (F12)
2. Run: `copy(localStorage.getItem('priceTagItems'))`
3. Save the JSON data to a text file

## Integration with Other Features

The Price Tags feature integrates seamlessly with:
- **Inventory Management** - Cross-reference with product inventory
- **Billing System** - Use prices from billing for consistency
- **Labels Tab** - Create shipping labels for the same orders
- **Settings** - Customize store name/branding

## API & Technical Details

### LocalStorage Keys:
- `priceTagItems` - Array of price tag items

### Data Structure:
```json
{
  "id": "unique-id-123",
  "product": "Product Name",
  "sku": "SKU-CODE",
  "price": "599",
  "qty": 27
}
```

## Frequently Asked Questions

**Q: Can I print partial quantities (e.g., 5 labels)?**
A: Yes! Set the Quantity field to the desired number (1-27). The remaining label spaces on the sheet will be blank.

**Q: How do I print multiple sheets?**
A: Add items and set their quantities. Click Print to get one sheet. Repeat the process for additional sheets.

**Q: Can I customize the label design?**
A: Currently, the label design is fixed. Contact support if you need custom designs.

**Q: What if my printer doesn't have label sheets?**
A: You can print on regular A4 paper and cut manually. Adjust your print settings as needed.

**Q: Are there size limitations?**
A: The current design supports 63×73mm labels (27 per A4). Larger sizes require label sheet adjustments.

**Q: Can I print from mobile devices?**
A: Yes! The app is responsive and supports printing from tablets and mobile browsers with print functionality.

## Support & Contact

For issues or feature requests:
- Check this guide for solutions
- Review the main README.md for app-wide support
- Contact: Shariff Enterprises

---

**Version:** 1.0  
**Last Updated:** 2026-07-08  
**App:** LOOKSTYLO FASHION Billing System
