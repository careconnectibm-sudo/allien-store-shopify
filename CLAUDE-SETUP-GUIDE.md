# 🛍️ Megastore Shopify Theme — Complete Setup Guide

**Store:** https://admin.shopify.com/store/megastore-1233654  
**Theme stack:** Dawn / Sense / any free Shopify theme  
**Total affiliate stores:** 414 (245 active · 169 inactive)  
**Prepared by:** Claude (Anthropic)  

---

## 📁 File Overview

```
your-theme/
├── assets/
│   └── stores-data.js               ← Auto-generated store data (414 stores)
├── sections/
│   ├── affiliate-store-icons.liquid ← Icon grid for homepage / any page
│   └── custom-product-slider.liquid ← Product slider section (from v1)
└── templates/
    └── page.stores.liquid           ← Full "All Stores" page template
```

---

## 🚀 PART 1 — GitHub Setup & Theme Connection

### Step 1 · Install Shopify CLI

```bash
npm install -g @shopify/cli @shopify/theme
```

Verify:
```bash
shopify version
```

### Step 2 · Pull your live theme locally

```bash
# Login to your store
shopify auth login --store megastore-1233654.myshopify.com

# List themes to find your active theme ID
shopify theme list

# Pull the active theme (replace THEME_ID)
shopify theme pull --theme THEME_ID --store megastore-1233654.myshopify.com
```

This creates a local folder with all theme files.

### Step 3 · Initialize Git repository

```bash
cd your-theme-folder

git init
git add .
git commit -m "Initial theme snapshot"
```

### Step 4 · Create GitHub repo & push

1. Go to **https://github.com/new**
2. Name: `megastore-theme` (private recommended)
3. Click **Create repository**

```bash
git remote add origin https://github.com/YOUR_USERNAME/megastore-theme.git
git branch -M main
git push -u origin main
```

### Step 5 · Connect GitHub to Shopify

1. **Shopify Admin → Online Store → Themes**
2. Click **Add theme → Connect from GitHub**
3. Authorize the Shopify GitHub app
4. Select repo: `megastore-theme`, branch: `main`
5. Click **Connect**

✅ From now on, every `git push` to `main` automatically deploys to Shopify!

---

## 📦 PART 2 — Adding the New Files

### Step 1 · Copy files into your local theme

```bash
# Copy from the downloaded package
cp stores-data.js              your-theme/assets/
cp affiliate-store-icons.liquid your-theme/sections/
cp custom-product-slider.liquid your-theme/sections/
cp page.stores.liquid           your-theme/templates/
```

### Step 2 · Commit and deploy

```bash
cd your-theme

git add assets/stores-data.js
git add sections/affiliate-store-icons.liquid
git add sections/custom-product-slider.liquid
git add templates/page.stores.liquid

git commit -m "Add affiliate icons, product slider, stores page"
git push
```

Shopify syncs within ~10 seconds ✅

---

## 🎨 PART 3 — Affiliate Store Icons Section

This section displays all **414 affiliate stores** as a clickable icon grid. It loads data from `stores-data.js` automatically — no manual entry needed.

### Features
- ✅ Shows all 245 active stores by default (or all 414)
- ✅ Live search bar (filters by store name)
- ✅ Category filter pills (25 categories)
- ✅ Hover animation on every icon
- ✅ Click → opens affiliate link in new tab
- ✅ Fully responsive (auto-fill grid)

### How to add to a page

1. **Shopify Admin → Online Store → Themes → Customize**
2. Navigate to the page you want (Homepage, Landing page, etc.)
3. Click **Add section**
4. Search **"Affiliate Store Icons"** → click Add
5. Drag to desired position

### Customizer settings

| Setting | Description | Default |
|---|---|---|
| Eyebrow label | Small text above heading | "Affiliate Partners" |
| Heading | Main section title | "Shop Our Partner Stores" |
| Subtext | Subtitle paragraph | "Click to shop & earn cashback" |
| Search placeholder | Input placeholder | "Search 400+ stores…" |
| Icon size | Width/height of each icon | 80px |
| Icon padding | Inner padding | 8px |
| Border radius | Rounded corners (0=square, 50=circle) | 12px |
| Gap | Space between icons | 12px |
| Show store name | Label below each icon | Yes |
| Show inactive stores | Include inactive stores too | No |
| Show View All button | Link to /pages/stores | Yes |
| View All label | Button text | "View All Stores" |
| Section background | BG color | #f9f9f9 |
| Accent / hover | Highlight color | #e63946 |
| Icon background | Color behind logos | #ffffff |

---

## 📄 PART 4 — Stores Page (Full Directory)

A full-featured `/pages/stores` page with sidebar filters, search, sort, and grid/list toggle.

### Features
- ✅ All 414 stores (grid or list view)
- ✅ Hero banner with search bar
- ✅ Sidebar: filter by Category, Status, Type
- ✅ Sort: A→Z, Z→A, Highest Payout
- ✅ Grid ↔ List view toggle
- ✅ Mobile: sidebar slides in from left
- ✅ Result count label
- ✅ Payout displayed on each card (green badge)
- ✅ Active / inactive dot indicator

### How to create the page

1. **Shopify Admin → Online Store → Pages → Add page**
2. Set title: **"Stores"** (URL: `/pages/stores`)
3. Set template: **"page.stores"** (from the Template dropdown on the right)
4. Click **Save**

The page is now live at:  
`https://megastore-1233654.myshopify.com/pages/stores`

### Adding to navigation

1. **Shopify Admin → Online Store → Navigation**
2. Open **Main menu**
3. Click **Add menu item**
4. Label: `Stores` or `All Stores`
5. Link: type `/pages/stores` or select the page
6. Click **Add → Save**

---

## 🛒 PART 5 — Product Slider Section

A responsive auto-sliding product carousel linked to any collection.

### Features
- ✅ 4 → 2 → 1 column responsive
- ✅ Touch/swipe support on mobile
- ✅ Hover to reveal 2nd product image
- ✅ Quick Add to Cart (no page reload)
- ✅ Sale % badge, New badge
- ✅ Optional autoplay with configurable speed
- ✅ Pagination dots + prev/next arrows

### How to add

1. **Customizer → Add section → "Product Slider"**
2. Select a **Collection** (e.g. "Best Sellers", "Featured")
3. Set max products (4–24)
4. Configure colors to match your brand

### Key settings

| Setting | Default |
|---|---|
| Collection | (pick any) |
| Max products | 12 |
| Show hover image | Yes |
| Show Quick Add button | Yes |
| Enable autoplay | No |
| Autoplay speed | 4 seconds |

---

## 🔄 PART 6 — Updating Store Data

When your `stores.json` changes (new partners added, status changes, etc.):

### Option A · Manual regeneration

Run this Python script to regenerate `stores-data.js`:

```python
import json

with open('stores.json') as f:
    data = json.load(f)

cat_map = {
    'Jewellery': 'Jewelery',
    'Fashion & Apparels': 'Fashion',
    'Flowers & Gifts': 'Gifting & Toys',
    '': 'Others'
}

normalized = []
for s in data['stores']:
    cats = [cat_map.get(c.strip(), c.strip()) for c in s['category'].split(',')]
    cats = list(dict.fromkeys([c for c in cats if c]))
    normalized.append({
        'id': s['id'],
        'merchant': s['merchant'],
        'logo': s['logo'],
        'url': s['url'],
        'categories': cats,
        'payout': s['payout'],
        'status': s['status'],
        'type': s['type']
    })

with open('assets/stores-data.js', 'w', encoding='utf-8') as f:
    f.write('// Auto-generated from stores.json\n')
    f.write('window.STORES_DATA = ')
    json.dump(normalized, f, ensure_ascii=False)
    f.write(';\n')

print(f"Done — {len(normalized)} stores written")
```

Then push:
```bash
git add assets/stores-data.js
git commit -m "Update store data"
git push
```

### Option B · API-driven (advanced)

Instead of a static JS file, fetch live from INR Deals API in a Shopify Proxy or Edge Function. Contact Claude for implementation if needed.

---

## 📱 PART 7 — Mobile Experience

Both sections are fully responsive:

| Breakpoint | Affiliate Icons | Stores Page |
|---|---|---|
| Desktop (>900px) | Auto-fill grid | Sidebar + grid |
| Tablet (600–900px) | Auto-fill (smaller) | No sidebar, filter button |
| Mobile (<600px) | Auto-fill (4 cols) | Slide-in sidebar |

On mobile, the Stores page shows a floating **Filters** button that opens the sidebar as a drawer.

---

## 🎨 PART 8 — Brand Customization

### Color system

Open `sections/affiliate-store-icons.liquid` and find these CSS variables:

```css
--asi-accent:  #e63946;   /* Change to your brand color */
--asi-text:    #1a1a1a;
--asi-icon-bg: #ffffff;
```

For the stores page, find in `templates/page.stores.liquid`:

```css
--sp-accent:  #e63946;   /* Brand accent */
--sp-bg:      #f7f7f7;   /* Page background */
```

Or use the **Shopify Customizer** color pickers (no code needed).

### Font matching

Both sections use `font-family: inherit` — they automatically adopt your theme's font.

---

## 🧪 PART 9 — Testing Checklist

Before going live, verify:

- [ ] `stores-data.js` loads correctly (open DevTools → Network → filter by "stores")
- [ ] All 245+ active store logos load (check for broken images)
- [ ] Search filters work correctly on homepage section
- [ ] Category filter pills all function on stores page
- [ ] Clicking any store icon opens affiliate link in new tab
- [ ] Mobile: icons display properly on 375px width
- [ ] Mobile: stores page sidebar opens/closes
- [ ] Product slider arrows + swipe work on mobile
- [ ] Quick Add button adds to cart correctly
- [ ] Stores page linked in navigation

---

## 🐛 PART 10 — Troubleshooting

| Issue | Fix |
|---|---|
| "Loading stores…" stuck | `stores-data.js` not in `assets/` folder — re-upload |
| Section not in Customizer | File not in `sections/` folder — check path |
| Icons show broken image | Logo CDN issue — handled gracefully (fallback text) |
| Stores page shows wrong template | Set Template to "page.stores" in Page editor |
| GitHub changes not showing | Check Shopify → Themes → GitHub connection status |
| Quick Add doesn't work | Your theme may use a custom cart; Quick Add uses standard `/cart/add.js` |

---

## 📞 Next Steps

1. ✅ Push files to GitHub
2. ✅ Add **Affiliate Store Icons** section to homepage
3. ✅ Create **Stores** page in Admin and set template
4. ✅ Add Stores to navigation
5. ✅ Customize colors in Customizer
6. ⬜ Add Product Slider to homepage (select a collection)
7. ⬜ Set up auto-update workflow for `stores-data.js`

---

*Generated by Claude · Anthropic · For megastore-1233654.myshopify.com*
