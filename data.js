/*
  ===========================================================================
  AMMAR AUTOMOBILES — CATALOG DATA
  ===========================================================================
  This is the ONLY file you need to edit to:
    - Update your WhatsApp number or Web3Forms key
    - Add / remove car brands, models, or part types
    - Edit the second-hand car ad text or footer details

  IMAGE FILENAMES:
    Car photos  → assets/cars/{filename}   e.g. assets/cars/maruti-swift.jpg
    Part photos → assets/parts/{filename}  e.g. assets/parts/brake-pad.jpg
    Leave "image" as "" if you don't have a photo yet — a "Photo coming soon"
    tile appears automatically and swaps out the moment you drop in a real image.

  YEARS FORMAT: "YYYY–YYYY"  (en-dash between years, e.g. "2011–2026")
    Include discontinued models — repair shops still need parts for older cars.
  ===========================================================================
*/

const CATALOG = {

  // ---- YOUR CONTACT DETAILS -------------------------------------------
  whatsappNumber: "918123395773",                        // 91 + 10-digit number, no spaces/+
  web3formsKey:   "2aa6b1e4-5183-40ef-9b97-6a416bf187e8",

  shopName:     "Ammar Automobiles",
  tagline:      "Spare parts from Delhi. Delivered to Athani.",
  catalogIntro: "Metal spare parts only — sourced fresh from Delhi's parts market and delivered to Athani. No plastic, no fibre.",

  pickCarHeading: "Pick your car for spare parts",

  yearFrom: 2011,
  yearTo:   2026,

  // ---- 25 PART TYPES (same list shown for every brand and model) ------
  // image: filename inside assets/parts/  (leave "" until you have a photo)
  partTypes: [
    { id: "suspension",           name: "Suspension",                      image: "" },
    { id: "steering",             name: "Steering",                        image: "" },
    { id: "spring",               name: "Spring",                          image: "" },
    { id: "choke-cable",          name: "Choke Cable",                     image: "" },
    { id: "steering-rack",        name: "Steering Rack",                   image: "" },
    { id: "steering-joint",       name: "Steering Joint",                  image: "" },
    { id: "tie-rod-end",          name: "Tie Rod End",                     image: "" },
    { id: "stabilizer-link",      name: "Stabilizer Link",                 image: "" },
    { id: "shock-absorber-front", name: "Shock Absorber (Front)",          image: "" },
    { id: "lower-arm",            name: "Lower Arm",                       image: "" },
    { id: "lower-ball-joint",     name: "Lower Ball Joint",                image: "" },
    { id: "bushing-kit",          name: "Bushing Kit",                     image: "" },
    { id: "door-handle",          name: "Door Handle",                     image: "" },
    { id: "door-ratchet",         name: "Door Ratchet",                    image: "" },
    { id: "shock-absorber-rear",  name: "Shock Absorber + Bushings (Rear)", image: "" },
    { id: "brake-pad",            name: "Brake Pad",                       image: "" },
    { id: "brake-liner",          name: "Brake Liner",                     image: "" },
    { id: "water-pump",           name: "Water Pump",                      image: "" },
    { id: "timing-chain-kit",     name: "Timing Chain Kit",                image: "" },
    { id: "ac-coolant",           name: "AC Coolant",                      image: "" },
    { id: "ac-compressor",        name: "AC Compressor",                   image: "" },
    { id: "oil-cooler",           name: "Oil Cooler",                      image: "" },
    { id: "thermal-switch",       name: "Thermal Switch",                  image: "" },
    { id: "engine-kit",           name: "Engine Kit",                      image: "" },
    { id: "alloy-wheel",          name: "Alloy Wheel",                     image: "" },
  ],

  // ---- CAR BRANDS & MODELS --------------------------------------------
  // image: filename inside assets/cars/  (leave "" until you have a photo)
  brands: [
    {
      id:    "maruti",
      name:  "Maruti Suzuki",
      image: "Maruthi/ertiga-ammar.webp",
      models: [
        { id: "alto-800",       name: "Alto 800",       years: "2012–2026", image: "Maruthi/cars-imag/Alto-800-ammarautomobiles.webp" },
        { id: "s-cross",        name: "S-Cross",        years: "2015–2022", image: "Maruthi/cars-imag/S-Cross-ammarautomobiles.webp" },
        { id: "wagonr",         name: "WagonR",         years: "2011–2026", image: "Maruthi/cars-imag/Wagnor-ammarautomobiles.webp" },
        { id: "swift",          name: "Swift",          years: "2011–2026", image: "Maruthi/cars-imag/swift-ammarautomobiles.webp" },
        { id: "dzire",          name: "Dzire",          years: "2011–2026", image: "Maruthi/cars-imag/Dzire-ammarautomobiles.webp" },
        { id: "ritz",           name: "Ritz",           years: "2011–2016", image: "Maruthi/cars-imag/Ritz-ammarautomobiles.webp" },
        { id: "omni",           name: "Omni",           years: "2011–2019", image: "Maruthi/cars-imag/omini-ammarautomobiles.webp" },
        { id: "eeco",           name: "Eeco",           years: "2011–2026", image: "Maruthi/cars-imag/Eeco-ammarautomobiles.webp" },
        { id: "ertiga",         name: "Ertiga",         years: "2012–2026", image: "Maruthi/cars-imag/ertiga-ammarautomobiles.webp" },
        { id: "ciaz",           name: "Ciaz",           years: "2014–2026", image: "Maruthi/cars-imag/ciaz-ammarautomobiles.webp" },
        { id: "celerio",        name: "Celerio",        years: "2014–2026", image: "Maruthi/cars-imag/celerio-ammarautomobiles.webp" },
        { id: "baleno",         name: "Baleno",         years: "2015–2026", image: "Maruthi/cars-imag/Baleno-ammarautomobiles.webp" },
        { id: "vitara-brezza",  name: "Vitara Brezza",  years: "2016–2022", image: "Maruthi/cars-imag/brezza-ammarautomobiles.webp" },
        { id: "grand-vitara",   name: "Grand Vitara",   years: "2022–2026", image: "Maruthi/cars-imag/Grand-vitara-ammarautomobiles.webp" },
        { id: "ignis",          name: "Ignis",          years: "2017–2026", image: "Maruthi/cars-imag/ignis-ammarautomobiles.webp" },
        { id: "s-presso",       name: "S-Presso",       years: "2019–2026", image: "Maruthi/cars-imag/s-preco-ammarautomobiles.webp" },
        { id: "xl6",            name: "XL6",            years: "2019–2026", image: "Maruthi/cars-imag/x-L6-ammarautomobiles.webp" },
        { id: "fronx",          name: "Fronx",          years: "2023–2026", image: "Maruthi/cars-imag/Fronx-ammarautomobiles.webp" },
      ],
    },

    {
      id:    "hyundai",
      name:  "Hyundai",
      image: "Hyundai/Creta-ammar.webp",
      models: [
        { id: "santro",   name: "Santro",       years: "2011–2022", image: "Hyundai/car-img/Santro-ammarautomobiles.webp" },
        { id: "i10",      name: "Grand i10",    years: "2013–2026", image: "Hyundai/car-img/Grand-i10-ammarautomobiles.webp" },
        { id: "i20",      name: "i20",          years: "2011–2026", image: "Hyundai/car-img/i20-ammarautomobiles.webp" },
        { id: "xcent",    name: "Xcent",        years: "2014–2022", image: "Hyundai/car-img/Xcent-ammarautomobiles.webp" },
        { id: "verna",    name: "Verna",        years: "2011–2026", image: "Hyundai/car-img/Verna-ammarautomobiles.webp" },
        { id: "creta",    name: "Creta",        years: "2015–2026", image: "Hyundai/car-img/Creta-ammarautomobiles.webp" },
        { id: "elantra",  name: "Elantra",      years: "2012–2022", image: "Hyundai/car-img/Elantra-ammarautomobiles.webp" },
        { id: "tucson",   name: "Tucson",       years: "2016–2026", image: "Hyundai/car-img/Tucson-ammarautomobiles.webp" },
        { id: "venue",    name: "Venue",        years: "2019–2026", image: "Hyundai/car-img/Venue-ammarautomobiles.webp" },
        { id: "aura",     name: "Aura",         years: "2020–2026", image: "Hyundai/car-img/Aura-ammarautomobiles.webp" },
        { id: "alcazar",  name: "Alcazar",      years: "2021–2026", image: "Hyundai/car-img/Alcazar-ammarautomobiles.webp" },
      ],
    },

    {
      id:    "honda",
      name:  "Honda",
      image: "Honda/honda-ammar.webp",
      models: [
        { id: "brio",    name: "Brio",    years: "2011–2016", image: "Honda/car-img/Brio-ammarautomobiles.webp" },
        { id: "city",    name: "City",    years: "2011–2026", image: "Honda/car-img/City-ammarautomobiles.webp" },
        { id: "amaze",   name: "Amaze",   years: "2013–2026", image: "Honda/car-img/Amaze-ammarautomobiles.webp" },
        { id: "jazz",    name: "Jazz",    years: "2015–2023", image: "Honda/car-img/Jazz-ammarautomobiles.webp" },
        { id: "mobilio", name: "Mobilio", years: "2014–2017", image: "Honda/car-img/Mobilio-ammarautomobiles.webp" },
        { id: "wrv",     name: "WR-V",    years: "2017–2023", image: "Honda/car-img/WR-V-ammarautomobiles.webp" },
        { id: "brv",     name: "BR-V",    years: "2016–2021", image: "Honda/car-img/BR-V-ammarautomobiles.webp" },
        { id: "crv",     name: "CR-V",    years: "2013–2022", image: "Honda/car-img/CR-V-ammarautomobiles.webp" },
        { id: "civic",   name: "Civic",   years: "2019–2021", image: "Honda/car-img/Civic-ammarautomobiles.webp" },
        { id: "elevate", name: "Elevate", years: "2023–2026", image: "Honda/car-img/Elevate-ammarautomobiles.webp" },
      ],
    },

    {
      id:    "mahindra",
      name:  "Mahindra",
      image: "Mahindra/scorpio-ammar.webp",
      models: [
        { id: "bolero",    name: "Bolero",    years: "2011–2026", image: "Mahindra/car-img/Bolero-ammarautomobiles.webp" },
        { id: "scorpio",   name: "Scorpio",   years: "2011–2026", image: "Mahindra/car-img/Scorpio-ammarautomobiles.webp" },
        { id: "xuv500",    name: "XUV500",    years: "2011–2022", image: "Mahindra/car-img/XUV500-ammarautomobiles.webp" },
        { id: "quanto",    name: "Quanto",    years: "2012–2016", image: "Mahindra/car-img/Quanto-ammarautomobiles.webp" },
        { id: "tuv300",    name: "TUV300",    years: "2015–2021", image: "Mahindra/car-img/TUV300-ammarautomobiles.webp" },
        { id: "kuv100",    name: "KUV100",    years: "2016–2022", image: "Mahindra/car-img/KUV100-ammarautomobiles.webp" },
        { id: "thar",      name: "Thar",      years: "2011–2026", image: "Mahindra/car-img/Thar-ammarautomobiles.webp" },
        { id: "marazzo",   name: "Marazzo",   years: "2018–2022", image: "Mahindra/car-img/Marazzo-ammarautomobiles.webp" },
        { id: "xuv300",    name: "XUV300",    years: "2019–2026", image: "Mahindra/car-img/XUV300-ammarautomobiles.webp" },
        { id: "xuv700",    name: "XUV700",    years: "2021–2026", image: "Mahindra/car-img/XUV700-ammarautomobiles.webp" },
      ],
    },
  ],

  // ---- SECOND-HAND CAR ADVERTISING BANNER ------------------------------
  secondhandAd: {
    heading: "Want to buy a second-hand car?",
    body:    "We help you find good-condition used cars from Delhi, Haryana, and UP — and arrange transport to Karnataka. Tell us your budget and the model you want.",
    cta:     "Ask About Second-Hand Cars",
  },

  // ---- SHOP / FOOTER DETAILS -------------------------------------------
  shopDetails: {
    location: "Athani, Belgaum District, Karnataka",
    note:     "Metal parts only — sourced directly from Delhi. We confirm the final price with you on WhatsApp before you pay anything.",
  },
};
