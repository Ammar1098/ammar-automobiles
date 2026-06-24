/* ===========================================================================
   AMMAR AUTOMOBILES — ICONS + IMAGE HELPER
   svgIcon(name)     — returns inline SVG line-art for a named part/concept.
   imgOrIcon(type, filename, alt) — renders a real <img> from assets/{type}/
     if filename is provided, with automatic "Photo coming soon" fallback on
     404 or empty filename. Drop the image file into assets/cars/ or
     assets/parts/ and it appears with zero code changes.
   =========================================================================== */

const ICONS = {
  car: `<path d="M6 30 L9 20 Q10 17 14 17 H34 Q38 17 39 20 L42 30" />
        <path d="M4 30 H44 V36 H4 Z" />
        <circle cx="14" cy="36" r="4"/>
        <circle cx="34" cy="36" r="4"/>
        <path d="M14 17 L17 24 H31 L34 17"/>`,

  headlight: `<rect x="8" y="16" width="22" height="16" rx="8"/>
              <circle cx="19" cy="24" r="4"/>
              <path d="M32 20 L40 18 M32 24 L41 24 M32 28 L40 30"/>`,

  bumper: `<path d="M6 28 Q6 18 24 18 Q42 18 42 28 V32 H6 Z"/>
           <path d="M14 28 H34" />
           <path d="M10 32 V36 M38 32 V36"/>`,

  brake: `<circle cx="24" cy="24" r="16"/>
          <circle cx="24" cy="24" r="6"/>
          <path d="M24 8 V14 M24 34 V40 M8 24 H14 M34 24 H40"/>`,

  battery: `<rect x="8" y="16" width="32" height="20" rx="2"/>
            <path d="M16 16 V11 H20 V16 M28 16 V11 H32 V16"/>
            <path d="M16 26 H22 M24 22 V30 M26 26 H32"/>`,

  mirror: `<path d="M14 12 Q34 12 34 24 Q34 36 14 36"/>
           <ellipse cx="22" cy="24" rx="9" ry="7"/>
           <path d="M14 12 L8 16 M14 36 L8 32"/>`,

  filter: `<rect x="12" y="10" width="24" height="28" rx="3"/>
           <path d="M18 16 H30 M18 22 H30 M18 28 H30 M18 34 H30"/>`,

  engine: `<rect x="10" y="18" width="22" height="16" rx="2"/>
           <rect x="32" y="22" width="8" height="8" rx="1"/>
           <path d="M14 18 V12 H20 V18 M22 18 V12 H28 V18"/>
           <circle cx="18" cy="26" r="2"/><circle cx="26" cy="26" r="2"/>`,

  tyre: `<circle cx="24" cy="24" r="15"/>
         <circle cx="24" cy="24" r="7"/>
         <path d="M24 9 V17 M24 31 V39 M9 24 H17 M31 24 H39
                   M13.5 13.5 L18.5 18.5 M29.5 29.5 L34.5 34.5
                   M13.5 34.5 L18.5 29.5 M29.5 18.5 L34.5 13.5"/>`,

  door: `<rect x="12" y="8" width="22" height="32" rx="3"/>
         <path d="M26 22 V26"/>
         <circle cx="26" cy="24" r="1.6" fill="currentColor" stroke="none"/>`,

  bonnet: `<path d="M6 30 Q6 16 24 16 Q42 16 42 30 Z"/>
           <path d="M14 30 Q24 22 34 30"/>`,

  glass: `<path d="M6 30 L11 14 H37 L42 30 Z"/>
          <path d="M11 14 L16 30 M37 14 L32 30"/>`,

  wiper: `<path d="M24 38 V12"/>
          <path d="M24 12 Q30 12 32 18"/>
          <circle cx="24" cy="38" r="3"/>`,

  exhaust: `<rect x="6" y="20" width="20" height="8" rx="3"/>
            <ellipse cx="36" cy="24" rx="8" ry="9"/>
            <ellipse cx="36" cy="24" rx="4" ry="5"/>`,

  suspension: `<path d="M16 8 V40 M32 8 V40"/>
               <path d="M16 12 H32 M16 36 H32"/>
               <path d="M16 18 L32 22 L16 26 L32 30"/>`,

  wheel: `<circle cx="24" cy="24" r="15"/>
          <circle cx="24" cy="24" r="3"/>
          <path d="M24 24 L24 11 M24 24 L34.5 30.5 M24 24 L13.5 30.5"/>`,

  generic: `<rect x="10" y="10" width="28" height="28" rx="4"/>
            <path d="M10 24 H38 M24 10 V38"/>`,
};

function svgIcon(name, extraClass) {
  const inner = ICONS[name] || ICONS.generic;
  return `<svg class="icon ${extraClass || ""}" viewBox="0 0 48 48" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" aria-hidden="true">${inner}</svg>`;
}

/* imgOrIcon — use for car and part media tiles.
   type: "cars" | "parts"
   filename: value from data.js model.image or part.image ("" = no photo yet)
   alt: accessible alt text
   Renders a real <img> if filename is set; falls back to a placeholder tile
   automatically if the file is missing or the image fails to load. */
function imgOrIcon(type, filename, alt) {
  const safeAlt = (alt || "").replace(/"/g, "&quot;");
  if (!filename) {
    return `<div class="media-tile is-placeholder"></div>`;
  }
  // If filename already contains a path separator, use it relative to assets/ directly
  const src = filename.includes("/") ? `assets/${filename}` : `assets/${type}/${filename}`;
  return `<div class="media-tile">` +
    `<img src="${src}" alt="${safeAlt}" loading="lazy" ` +
    `onerror="this.parentElement.classList.add('is-placeholder');this.remove();">` +
    `</div>`;
}
