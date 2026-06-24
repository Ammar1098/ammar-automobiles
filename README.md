# Ammar Automobiles — Website

A free, no-backend static site. Everything runs in the visitor's browser.
Every order becomes a pre-filled WhatsApp message that opens on your number.

## Files in this folder

| File         | What it's for                                              |
|--------------|------------------------------------------------------------|
| `index.html` | Page structure. You won't need to touch this.              |
| `styles.css` | Colors, fonts, layout. You won't need to touch this.       |
| `script.js`  | All the interactive logic. You won't need to touch this.   |
| `icons.js`   | SVG icons + image helper. You won't need to touch this.    |
| `data.js`    | **The only file you edit.** WhatsApp number, Web3Forms key, brands, models, parts, ad text. |

## 1. Your WhatsApp number and Web3Forms key

These are already set correctly at the top of `data.js`:

```js
whatsappNumber: "918123395773",
web3formsKey:   "2aa6b1e4-5183-40ef-9b97-6a416bf187e8",
```

If you change your WhatsApp number later, update just that line.

## 2. How the catalog works

There are **4 brands** (Maruti Suzuki, Hyundai, Honda, Mahindra).
Each brand has a list of **models**, each with a `years` range.
There is **one shared list of 25 metal part types** shown for every model —
you don't need to list parts per model.

The customer flow: Pick brand → Pick model → Pick year → Select parts →
Order form → Web3Forms submits → WhatsApp handoff with all details pre-filled.

## 3. Add or edit brands and models

Inside `data.js`, each brand looks like:

```js
{
  id: "maruti",
  name: "Maruti Suzuki",
  image: "",          // leave "" until you have a photo
  models: [
    { id: "swift", name: "Swift", years: "2011–2026", image: "" },
    { id: "dzire", name: "Dzire", years: "2011–2026", image: "" },
    // ... more models
  ],
},
```

- **To add a model:** copy a `{ id, name, years, image }` line and edit it.
- **To add a brand:** copy a whole brand block and edit it.
- **years format:** `"2011–2026"` (use an en-dash between years, not a hyphen).
  The year picker will automatically dim years outside this range.

## 4. Adding photos later

Drop your photos into these folders — they appear automatically, no code changes:

| What             | Folder            | Filename convention                  |
|------------------|-------------------|--------------------------------------|
| Brand logo/photo | `assets/cars/`    | e.g. `maruti.jpg`                    |
| Car model photo  | `assets/cars/`    | e.g. `maruti-swift.jpg`              |
| Part photo       | `assets/parts/`   | e.g. `brake-pad.jpg`                 |

Then set the matching `image:` field in `data.js`:

```js
{ id: "swift", name: "Swift", years: "2011–2026", image: "maruti-swift.jpg" },
```

If no photo is available, leave `image: ""` — a "Photo coming soon" placeholder
tile shows automatically and swaps out the moment you add the real image.

## 5. Put the site online (free, ~2 minutes)

1. Go to [netlify.com](https://www.netlify.com) and sign up (free, no card needed).
2. On the dashboard, find **"Drag and drop your site output folder here."**
3. Drag this whole `car/` folder onto that box.
4. Netlify gives you a free link immediately, like `https://random-name-123.netlify.app`.
   Test it on your phone before sharing.
5. Optional: **Site settings → Change site name** to get something like
   `ammar-automobiles.netlify.app`.

## 6. Connect your own domain later (e.g. ammarauto.in)

1. Netlify → **Domain settings → Add a custom domain** → enter your domain.
2. Netlify shows you 1–2 DNS records (A record and/or CNAME).
3. At your domain registrar → DNS settings → add those records.
4. Wait up to a few hours. Free HTTPS (padlock) is provided automatically.

## 7. Before you go live

- Test the full flow on your own phone: pick a car, pick parts, fill the order
  form, confirm WhatsApp opens with your number and the message reads correctly.
- Test the second-hand car enquiry form too.
- Share with 2–3 people you know before announcing it publicly.
