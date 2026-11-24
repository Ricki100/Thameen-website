# Thameen Ware website

Static website (HTML, CSS, JavaScript). No build step: open `index.html`, or upload the whole folder to any web host (Netlify, Vercel, cPanel, GitHub Pages).

Layout and user flow follow swissarabian.com: announcement bar, sticky header (search, centred logo, cart) with a nav row that compacts on scroll, hero slideshow, New launches / Best sellers / Trending product rows, Discover our collections tiles, Get the look, customer reviews, Our story, SEO text, newsletter and footer. Thameen's own logo, colours, photos, prices and contact details are used throughout.

## Pages
| File | What it is |
|---|---|
| `index.html` | Home page |
| `shop.html` | Collection page. Filter by hash: `#all`, `#men`, `#women`, `#unisex`, `#new`, `#best`, `#trending`, `#mini`, `#gift`, `#best-men`, `#best-women` |
| `product.html` | Product page, e.g. `product.html#yaraa` |
| `about.html` | About us |
| `contact.html` | Contact form (Web3Forms), shop details, FAQs |

## Where to change things
| To change | Edit |
|---|---|
| Brand colours, fonts, spacing, breakpoints | `css/tokens.css` (every colour is a variable there) |
| Phone, WhatsApp, address, email, social links, opening hours, announcement messages | `js/config.js` |
| **Web3Forms access key** (contact + newsletter forms) | `js/config.js` → `web3formsKey` |
| Products, prices, notes, photos, tags (new / best / trending / mini / gift) | `js/products.js` |
| Header, footer, menu, cart, search, product card (shared on every page) | `js/components.js` (menu links are in the `NAV` list) |
| Scroll animations (GSAP + ScrollTrigger) | `js/animations.js` |
| Layout styles | `css/main.css` |

## Web3Forms setup
1. Go to https://web3forms.com, enter the shop's email address, and copy the access key they email you.
2. Paste it into `js/config.js` as `web3formsKey: "your-key-here"`.
3. Contact form and newsletter sign-ups will arrive in that inbox. Until the key is added, the forms show a "not connected yet" message.

## Ordering
The cart is stored in the visitor's browser. "Checkout on WhatsApp" and "Buy it now on WhatsApp" open WhatsApp to +263 71 931 3294 with the order written out.

## Placeholders and guesses to confirm
- **Prices confirmed from your price posts:** Joyous Magnolia $60, Atika Royal Oud Candy $35, Lucky No. 1 $30, Dubai Chocolate $30, Valentine Milano for Men $30, Yaraa $25. Every other price is a guess (`priceConfirmed: false` in `js/products.js`, shown on the product page as "Price to be confirmed in store").
- **Fragrance notes and descriptions** for every product are best guesses.
- **Product names** were read from the bottles and boxes; check spellings (e.g. Yaraa vs Yara, Salvage, Silver Mountain Water).
- **Email** (`hello@thameenware.com`), **opening hours**, and **TikTok / Instagram / Facebook links** in `js/config.js`.
- **Payment badges** in the footer (Cash, Visa, Mastercard, EcoCash, InnBucks) and the FAQ answers for delivery, payment and returns.
- **Customer reviews** on the home page are samples labelled "Sample review". Replace with real quotes in `js/home.js`.
- Story and About copy are drafts written for Thameen; edit freely.

## Images
`assets/img/` holds web-sized copies of your photos. Cut-out shots came from `No Background/`, banner scenes from `2026/Products/` (cropped to remove the price bubble and footer strip), and the lifestyle shots from the WhatsApp product photos. The logo files `assets/logo.svg` and `assets/logo-white.svg` were cut from your `product footer.svg` and `footer.svg`.
