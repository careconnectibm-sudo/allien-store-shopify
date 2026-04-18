# CLAUDE.md — Megastore Shopify Theme

> This file provides context and conventions for AI coding assistants (Claude, Copilot, etc.) working on this project.

---

## 📌 Project Overview

**Project:** Megastore Affiliate Store — Shopify Theme Customization  
**Store URL:** https://megastore-1233654.myshopify.com  
**Admin URL:** https://admin.shopify.com/store/megastore-1233654  
**Theme base:** Dawn / Sense (free Shopify theme)  
**Data provider:** INR Deals affiliate network  
**Total affiliate stores:** 414 (245 active · 169 inactive)

This project extends a standard Shopify theme with custom sections, templates, and a JavaScript data layer for displaying and filtering 414+ affiliate partner stores.

---

## 📁 File Structure

```
Megastore/
├── CLAUDE.md                        ← AI assistant context (this file)
├── CLAUDE-SETUP-GUIDE.md            ← Full human-readable setup guide
│
├── assets/
│   └── stores-data.js               ← Auto-generated store data (window.STORES_DATA)
│
├── sections/
│   ├── affiliate-store-icons.liquid ← Homepage icon grid section
│   └── custom-product-slider.liquid ← Product carousel section
│
└── templates/
    └── page.stores.liquid           ← Full /pages/stores directory page
```

> **Note:** When deploying, these files are merged into the live Shopify theme pulled via `shopify theme pull`. They do **not** form a standalone theme on their own.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Theme engine | Shopify Liquid (`.liquid` templates) |
| Styling | Vanilla CSS (scoped inside each `.liquid` file) |
| Scripting | Vanilla JavaScript (no build step) |
| Store data | `window.STORES_DATA` global — loaded from `assets/stores-data.js` |
| Deployment | Shopify CLI + GitHub → Shopify GitHub integration |
| Version control | Git / GitHub |

---

## 🧩 Key Components

### 1. `assets/stores-data.js`
- Auto-generated file — **do not manually edit store records**
- Exposes `window.STORES_DATA` as a JSON array
- Each store object shape:
  ```js
  {
    id: Number,
    merchant: String,
    logo: String,       // CDN URL
    url: String,        // Affiliate URL
    categories: [String],
    payout: String,
    status: "active" | "inactive",
    type: String
  }
  ```
- Regenerate using the Python script in `CLAUDE-SETUP-GUIDE.md § PART 6`

### 2. `sections/affiliate-store-icons.liquid`
- Displays all active stores as a responsive clickable icon grid
- Has live search + 25 category filter pills
- Reads from `window.STORES_DATA` (injected via `<script src="{{ 'stores-data.js' | asset_url }}">`)
- Expose Shopify Customizer settings via `{% schema %}` block at the bottom
- CSS variables for theming: `--asi-accent`, `--asi-text`, `--asi-icon-bg`

### 3. `templates/page.stores.liquid`
- Full `/pages/stores` directory with sidebar filters, search, sort, grid/list toggle
- Sidebar filters: Category, Status, Type
- Mobile: sidebar slides in from left as a drawer
- CSS variables: `--sp-accent`, `--sp-bg`
- Assigned to a Shopify Page via the "Template" dropdown in the Page editor

### 4. `sections/custom-product-slider.liquid`
- Responsive product carousel (4 → 2 → 1 cols)
- Touch/swipe on mobile, optional autoplay
- Quick Add to Cart via `/cart/add.js`
- Hover reveals second product image

---

## ✏️ Coding Conventions

1. **Liquid files are self-contained** — each `.liquid` file includes its own `<style>` and `<script>` blocks. No external CSS/JS build pipeline.
2. **Scoped CSS** — all CSS classes are prefixed per component to avoid collisions:
   - `affiliate-store-icons.liquid` → `.asi-*`
   - `page.stores.liquid` → `.sp-*`
3. **Vanilla JS only** — no jQuery, no npm packages. Keep zero dependencies.
4. **`stores-data.js` is always regenerated, never hand-edited.** Use the Python script when store data changes.
5. **Schema blocks last** — the `{% schema %}` JSON block always appears at the very end of section files.
6. **No hardcoded store URLs** — always reference `window.STORES_DATA` for store links.
7. **Graceful fallbacks** — broken logo images should degrade to a styled text fallback (store initial letter), not a broken `<img>`.

---

## 🚀 Deployment Workflow

```bash
# 1. Make changes to files locally
# 2. Stage & commit
git add <changed-files>
git commit -m "feat: description of change"

# 3. Push → Shopify auto-syncs via GitHub integration (within ~10s)
git push
```

> To test locally before pushing, use Shopify CLI hot-reload:
> ```bash
> shopify auth login --store megastore-1233654.myshopify.com
> shopify theme dev --store megastore-1233654.myshopify.com
> ```

---

## 🔄 Store Data Update Flow

When the affiliate store list changes (new merchants, status updates):

1. Update `stores.json` (raw source data from INR Deals)
2. Run the Python regeneration script (see `CLAUDE-SETUP-GUIDE.md § PART 6`)
3. Commit & push `assets/stores-data.js`

Advanced: Live API mode is possible via a Shopify Proxy or Edge Function hitting the INR Deals API directly — see `CLAUDE-SETUP-GUIDE.md § PART 6 Option B`.

---

## 🎨 Theming & Brand

- **Primary accent color:** `#e63946` (red — change to match brand)
- **Page background:** `#f7f7f7`
- **Icon background:** `#ffffff`
- All sections use `font-family: inherit` — they adopt the active theme's font automatically
- Colors can be changed via CSS variables in each file **or** via the Shopify Customizer (no code needed)

---

## 🧪 Testing Checklist

Before any deployment:

- [ ] `stores-data.js` loads in DevTools → Network tab
- [ ] 245+ active store logos render (no broken images)
- [ ] Search bar filters stores correctly
- [ ] Category filter pills work on both section and stores page
- [ ] Clicking a store opens affiliate link in a **new tab**
- [ ] Mobile (375px): icon grid displays correctly
- [ ] Mobile: stores page sidebar drawer opens/closes
- [ ] Product slider swipe and arrows work on mobile
- [ ] Quick Add adds product to cart without page reload
- [ ] `/pages/stores` page is linked in main navigation

---

## ⚠️ Common Pitfalls

| Problem | Root Cause | Fix |
|---|---|---|
| "Loading stores…" spinner stuck | `stores-data.js` missing from `assets/` | Re-upload and push |
| Section missing from Customizer | File not in `sections/` folder | Check file path |
| Broken logo images | CDN issue | Already handled with text fallback |
| Wrong page template on stores page | Template not set to `page.stores` in Page editor | Set in Admin → Pages → Template |
| GitHub changes not in Shopify | GitHub → Shopify connection issue | Check Shopify → Themes → GitHub status |
| Quick Add broken | Theme uses a custom cart AJAX flow | Adapt to theme's own cart JS |

---

## 📞 Contact & Credits

- **Store owner:** Megastore (megastore-1233654)
- **Affiliate network:** INR Deals
- **Theme documentation:** `CLAUDE-SETUP-GUIDE.md`
- **Prepared with:** Claude (Anthropic)
