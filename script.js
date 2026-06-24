/* =============================================================================
   AMMAR AUTOMOBILES — APP LOGIC
   Flow: Brand grid → Model grid → Year picker popup → Parts multi-select →
         Sticky tray (Order These Parts) → Order form modal → Web3Forms submit
         → Success / WhatsApp handoff popup.
   Second-hand car enquiry form follows the same Web3Forms → WhatsApp pattern.
   No backend, no database. All state lives in memory.
   ============================================================================= */

(function () {

  /* ── state ─────────────────────────────────────────────────────────── */
  const state = {
    brandId:       null,
    modelId:       null,
    year:          null,
    selectedParts: new Set(),
  };

  /* ── DOM refs ────────────────────────────────────────────────────────── */
  const el = {
    catalogRoot:     document.getElementById("catalogRoot"),
    trail:           document.getElementById("tagtrail"),
    sectionTitle:    document.getElementById("sectionTitle"),
    sectionHint:     document.getElementById("sectionHint"),

    // year picker
    yearOverlay:     document.getElementById("yearPopupOverlay"),
    yearGrid:        document.getElementById("yearGrid"),
    yearTitle:       document.getElementById("yearPopupTitle"),
    closeYear:       document.getElementById("closeYearPopup"),

    // selection tray
    tray:            document.getElementById("selectionTray"),
    trayCount:       document.getElementById("trayCount"),
    trayClear:       document.getElementById("trayClear"),
    trayOrder:       document.getElementById("trayOrder"),

    // order form modal
    modalOverlay:    document.getElementById("modalOverlay"),
    jobcardForm:     document.getElementById("jobcardForm"),
    jobcardPartName: document.getElementById("jobcardPartName"),
    closeModal:      document.getElementById("closeModalBtn"),
    orderSubmitBtn:  document.getElementById("orderSubmitBtn"),

    // parts order success
    successOverlay:  document.getElementById("successOverlay"),
    successMsg:      document.getElementById("successMsg"),
    successWaBtn:    document.getElementById("successWaBtn"),
    successClose:    document.getElementById("successClose"),

    // second-hand form modal
    shOverlay:       document.getElementById("secondhandOverlay"),
    shForm:          document.getElementById("secondhandForm"),
    closeShModal:    document.getElementById("closeSecondhandBtn"),
    shSubmitBtn:     document.getElementById("shSubmitBtn"),

    // second-hand success
    shSuccessOverlay: document.getElementById("shSuccessOverlay"),
    shSuccessWaBtn:   document.getElementById("shSuccessWaBtn"),
    shSuccessClose:   document.getElementById("shSuccessClose"),

    // static hoarding CTA on homepage
    adCta:           document.getElementById("adCta"),

    toast:           document.getElementById("toast"),
  };

  /* ── data helpers ───────────────────────────────────────────────────── */
  function getBrand(id)           { return CATALOG.brands.find(b => b.id === id); }
  function getModel(brand, id)    { return brand.models.find(m => m.id === id); }
  function getPart(id)            { return CATALOG.partTypes.find(p => p.id === id); }

  function parseYearRange(yearsStr) {
    const m = yearsStr.match(/(\d{4})\s*[–—\-]\s*(\d{4})/);
    if (m) return { from: parseInt(m[1]), to: parseInt(m[2]) };
    const y = parseInt(yearsStr);
    return { from: y, to: y };
  }

  /* ── WhatsApp helpers ───────────────────────────────────────────────── */
  function waLink(text) {
    return `https://wa.me/${CATALOG.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

  function wireGeneralWaLinks() {
    const text = `Hi ${CATALOG.shopName}, I'd like to ask about spare parts.`;
    document.querySelectorAll("[data-wa-general]").forEach(a => { a.href = waLink(text); });
  }

  /* ── breadcrumb trail ───────────────────────────────────────────────── */
  function renderTrail() {
    const crumbs = [{ label: "All cars", brand: null, model: null }];
    if (state.brandId) {
      const brand = getBrand(state.brandId);
      crumbs.push({ label: brand.name, brand: brand.id, model: null });
      if (state.modelId && state.year) {
        const model = getModel(brand, state.modelId);
        crumbs.push({ label: `${model.name} ${state.year}`, brand: brand.id, model: model.id });
      }
    }

    el.trail.innerHTML = crumbs.map((c, i) => {
      const last = i === crumbs.length - 1;
      const cls  = last ? "tag is-current" : "tag is-link";
      const sep  = i > 0 ? `<span class="sep">/</span>` : "";
      return `${sep}<button type="button" class="${cls}"
                data-brand="${c.brand || ""}" data-model="${c.model || ""}">${c.label}</button>`;
    }).join("");

    el.trail.querySelectorAll(".tag.is-link").forEach(btn => {
      btn.addEventListener("click", () => {
        const nextBrand = btn.dataset.brand || null;
        const nextModel = btn.dataset.model || null;
        // navigating up always clears selections
        state.brandId       = nextBrand;
        state.modelId       = nextModel;
        state.year          = null;
        state.selectedParts.clear();
        updateTray();
        render();
      });
    });
  }

  /* ── views ──────────────────────────────────────────────────────────── */
  function renderBrandGrid() {
    el.sectionTitle.textContent = CATALOG.pickCarHeading;
    el.sectionHint.textContent  = `${CATALOG.brands.length} brands`;

    el.catalogRoot.innerHTML = `<div class="grid" id="brandGrid"></div>`;
    const grid = document.getElementById("brandGrid");

    CATALOG.brands.forEach(brand => {
      const card = document.createElement("button");
      card.type      = "button";
      card.className = "card brand-card";
      card.innerHTML = `
        ${imgOrIcon("cars", brand.image, brand.name)}
        <span class="card-title">${brand.name}</span>
        <span class="card-meta">${brand.models.length} models</span>
      `;
      card.addEventListener("click", () => {
        state.brandId = brand.id;
        state.modelId = null;
        state.year    = null;
        state.selectedParts.clear();
        updateTray();
        render();
      });
      grid.appendChild(card);
    });
  }

  function renderModelGrid(brand) {
    el.sectionTitle.textContent = `${brand.name} — pick a model`;
    el.sectionHint.textContent  = `${brand.models.length} model${brand.models.length === 1 ? "" : "s"}`;

    el.catalogRoot.innerHTML = `<div class="grid" id="modelGrid"></div>`;
    const grid = document.getElementById("modelGrid");

    brand.models.forEach(model => {
      const card = document.createElement("button");
      card.type      = "button";
      card.className = "card model-card";
      card.innerHTML = `
        ${imgOrIcon("cars", model.image, model.name)}
        <span class="card-title">${model.name}</span>
        <span class="card-meta">${model.years}</span>
      `;
      card.addEventListener("click", () => {
        state.modelId = model.id;
        state.year    = null;
        state.selectedParts.clear();
        updateTray();
        openYearPicker(brand, model);
      });
      grid.appendChild(card);
    });
  }

  function renderPartsGrid(brand, model) {
    el.sectionTitle.textContent = `${brand.name} ${model.name} ${state.year} — choose parts`;
    el.sectionHint.textContent  = `${CATALOG.partTypes.length} parts available · tap to select`;

    el.catalogRoot.innerHTML = `
      <p class="parts-hint">Tap each part you need, then press <strong>Order These Parts</strong>.</p>
      <div class="grid parts-grid" id="partsGrid"></div>
      <div class="hoarding hoarding-inline" style="margin-top:40px;">
        <div>
          <h3>${CATALOG.secondhandAd.heading}</h3>
          <p>${CATALOG.secondhandAd.body}</p>
        </div>
        <button type="button" class="btn btn-rust" data-open-secondhand>${CATALOG.secondhandAd.cta}</button>
      </div>
    `;
    const grid = document.getElementById("partsGrid");

    CATALOG.partTypes.forEach(part => {
      const card = document.createElement("div");
      card.className    = "card part-card" + (state.selectedParts.has(part.id) ? " is-selected" : "");
      card.dataset.partId = part.id;
      card.setAttribute("role", "checkbox");
      card.setAttribute("aria-checked", state.selectedParts.has(part.id) ? "true" : "false");
      card.setAttribute("tabindex", "0");
      card.innerHTML = `
        <div class="checkmark" aria-hidden="true">✓</div>
        ${imgOrIcon("parts", part.image, part.name)}
        <span class="card-title">${part.name}</span>
      `;
      card.addEventListener("click", () => togglePart(part.id, card));
      card.addEventListener("keydown", e => {
        if (e.key === " " || e.key === "Enter") { e.preventDefault(); togglePart(part.id, card); }
      });
      grid.appendChild(card);
    });
  }

  function render() {
    renderTrail();
    if (!state.brandId) { renderBrandGrid(); return; }
    const brand = getBrand(state.brandId);
    if (!state.modelId || !state.year) { renderModelGrid(brand); return; }
    const model = getModel(brand, state.modelId);
    renderPartsGrid(brand, model);
  }

  /* ── year picker ────────────────────────────────────────────────────── */
  function openYearPicker(brand, model) {
    const range = parseYearRange(model.years);
    el.yearTitle.textContent = `Which year is your ${brand.name} ${model.name}?`;
    el.yearGrid.innerHTML = "";

    for (let y = CATALOG.yearTo; y >= CATALOG.yearFrom; y--) {
      const btn = document.createElement("button");
      btn.type      = "button";
      btn.className = "year-btn" + (y < range.from || y > range.to ? " is-dim" : "");
      btn.textContent = y;
      btn.addEventListener("click", () => {
        state.year = y;
        closeYearPicker();
        render();
        // scroll catalog into view on mobile
        document.getElementById("catalog").scrollIntoView({ behavior: "smooth", block: "start" });
      });
      el.yearGrid.appendChild(btn);
    }

    el.yearOverlay.hidden = false;
    el.yearOverlay.querySelector(".year-btn:not(.is-dim)")?.focus();
  }

  function closeYearPicker() {
    el.yearOverlay.hidden = true;
    // if no year selected after closing, go back to model grid
    if (!state.year) render();
  }

  el.closeYear.addEventListener("click", closeYearPicker);
  el.yearOverlay.addEventListener("click", e => { if (e.target === el.yearOverlay) closeYearPicker(); });

  /* ── part selection & tray ──────────────────────────────────────────── */
  function togglePart(partId, card) {
    if (state.selectedParts.has(partId)) {
      state.selectedParts.delete(partId);
      card.classList.remove("is-selected");
      card.setAttribute("aria-checked", "false");
    } else {
      state.selectedParts.add(partId);
      card.classList.add("is-selected");
      card.setAttribute("aria-checked", "true");
    }
    updateTray();
  }

  function updateTray() {
    const n = state.selectedParts.size;
    if (n === 0) {
      el.tray.hidden = true;
      document.body.classList.remove("tray-active");
    } else {
      el.tray.hidden = false;
      document.body.classList.add("tray-active");
      el.trayCount.textContent = `${n} part${n === 1 ? "" : "s"} selected`;
    }
  }

  el.trayClear.addEventListener("click", () => {
    state.selectedParts.clear();
    document.querySelectorAll(".part-card.is-selected").forEach(c => {
      c.classList.remove("is-selected");
      c.setAttribute("aria-checked", "false");
    });
    updateTray();
  });

  el.trayOrder.addEventListener("click", openOrderModal);

  /* ── order form modal ───────────────────────────────────────────────── */
  function openOrderModal() {
    const brand = getBrand(state.brandId);
    const model = getModel(brand, state.modelId);
    const partNames = Array.from(state.selectedParts).map(id => getPart(id)?.name || id);
    el.jobcardPartName.textContent =
      `${brand.name} ${model.name} ${state.year} · ${partNames.join(", ")}`;
    el.jobcardForm.reset();
    el.modalOverlay.hidden = false;
    document.getElementById("custFirst").focus();
  }

  function closeOrderModal() {
    el.modalOverlay.hidden = true;
  }

  el.closeModal.addEventListener("click", closeOrderModal);
  el.modalOverlay.addEventListener("click", e => { if (e.target === el.modalOverlay) closeOrderModal(); });

  el.jobcardForm.addEventListener("submit", async e => {
    e.preventDefault();
    if (!el.jobcardForm.checkValidity()) { el.jobcardForm.reportValidity(); return; }

    const brand = getBrand(state.brandId);
    const model = getModel(brand, state.modelId);
    const partNames = Array.from(state.selectedParts).map(id => getPart(id)?.name || id);

    const firstName = document.getElementById("custFirst").value.trim();
    const lastName  = document.getElementById("custLast").value.trim();
    const shopName  = document.getElementById("custShop").value.trim();
    const mobile    = document.getElementById("custMobile").value.trim();
    const address   = document.getElementById("custAddress").value.trim();
    const city      = document.getElementById("custCity").value.trim();
    const pin       = document.getElementById("custPin").value.trim();
    const budget    = document.getElementById("custBudget").value.trim();

    const payload = {
      access_key: CATALOG.web3formsKey,
      subject:    `Parts Order — ${brand.name} ${model.name} (${state.year})`,
      from_name:  `${CATALOG.shopName} Website`,
      name:       `${firstName} ${lastName}`,
      mobile,
      shop_name:  shopName || "(not provided)",
      car_brand:  brand.name,
      car_model:  model.name,
      car_year:   String(state.year),
      parts:      partNames.join(", "),
      address:    `${address}, ${city} – ${pin}`,
      budget:     budget || "(not provided)",
    };

    setSubmitting(el.orderSubmitBtn, true);
    try {
      const res  = await fetch("https://api.web3forms.com/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        const waMsg = buildOrderWaMsg({ firstName, lastName, shopName, mobile, brand, model, partNames, address, city, pin, budget });
        closeOrderModal();
        state.selectedParts.clear();
        updateTray();
        render();
        showOrderSuccess(waLink(waMsg));
      } else {
        showToast("Something went wrong. Please try again or contact us directly on WhatsApp.");
      }
    } catch {
      showToast("No internet connection? Please try again or message us directly on WhatsApp.");
    } finally {
      setSubmitting(el.orderSubmitBtn, false);
    }
  });

  function buildOrderWaMsg({ firstName, lastName, shopName, mobile, brand, model, partNames, address, city, pin, budget }) {
    const lines = [
      `Hi ${CATALOG.shopName}, I placed an order on your website.`,
      ``,
      `Car: ${brand.name} ${model.name} (${state.year})`,
      `Parts needed: ${partNames.join(", ")}`,
      ``,
      `Name: ${firstName} ${lastName}`,
      `Mobile: ${mobile}`,
    ];
    if (shopName)  lines.push(`Shop: ${shopName}`);
    if (budget)    lines.push(`Budget: ${budget}`);
    lines.push(`Delivery address: ${address}, ${city} – ${pin}`);
    lines.push(``, `Please confirm availability and final price.`);
    return lines.join("\n");
  }

  /* ── order success popup ────────────────────────────────────────────── */
  function showOrderSuccess(waUrl) {
    el.successWaBtn.href = waUrl;
    el.successOverlay.hidden = false;
  }

  el.successClose.addEventListener("click", () => { el.successOverlay.hidden = true; });
  el.successOverlay.addEventListener("click", e => {
    if (e.target === el.successOverlay) el.successOverlay.hidden = true;
  });

  /* ── second-hand car form ───────────────────────────────────────────── */
  function openSecondhandModal() {
    el.shForm.reset();
    el.shOverlay.hidden = false;
    document.getElementById("sh_name").focus();
  }

  function closeSecondhandModal() {
    el.shOverlay.hidden = true;
  }

  // static homepage CTA
  el.adCta.addEventListener("click", openSecondhandModal);

  // dynamic CTA injected in parts view (event delegation)
  document.addEventListener("click", e => {
    if (e.target.closest("[data-open-secondhand]")) openSecondhandModal();
  });

  el.closeShModal.addEventListener("click", closeSecondhandModal);
  el.shOverlay.addEventListener("click", e => { if (e.target === el.shOverlay) closeSecondhandModal(); });

  el.shForm.addEventListener("submit", async e => {
    e.preventDefault();
    if (!el.shForm.checkValidity()) { el.shForm.reportValidity(); return; }

    const name    = document.getElementById("sh_name").value.trim();
    const mobile  = document.getElementById("sh_mobile").value.trim();
    const company = document.getElementById("sh_company").value.trim();
    const model   = document.getElementById("sh_model").value.trim();
    const budget  = document.getElementById("sh_budget").value.trim();
    const address = document.getElementById("sh_address").value.trim();

    const payload = {
      access_key: CATALOG.web3formsKey,
      subject:    `Second-hand Car Enquiry — ${company} ${model}`,
      from_name:  `${CATALOG.shopName} Website`,
      name,
      mobile,
      car_company: company,
      car_model:   model,
      budget:      budget || "(not provided)",
      address,
    };

    setSubmitting(el.shSubmitBtn, true);
    try {
      const res  = await fetch("https://api.web3forms.com/submit", {
        method:  "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body:    JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        closeSecondhandModal();
        const waMsg = buildShWaMsg({ name, mobile, company, model, budget, address });
        showShSuccess(waLink(waMsg));
      } else {
        showToast("Something went wrong. Please try again or message us on WhatsApp.");
      }
    } catch {
      showToast("No internet connection? Please try again or message us on WhatsApp.");
    } finally {
      setSubmitting(el.shSubmitBtn, false);
    }
  });

  function buildShWaMsg({ name, mobile, company, model, budget, address }) {
    const lines = [
      `Hi ${CATALOG.shopName}, I'm looking for a second-hand car.`,
      ``,
      `Car wanted: ${company} ${model}`,
      `Name: ${name}`,
      `Mobile: ${mobile}`,
    ];
    if (budget)  lines.push(`Budget: ${budget}`);
    lines.push(`Address: ${address}`);
    lines.push(``, `Please let me know what's available.`);
    return lines.join("\n");
  }

  /* ── second-hand success popup ──────────────────────────────────────── */
  function showShSuccess(waUrl) {
    el.shSuccessWaBtn.href = waUrl;
    el.shSuccessOverlay.hidden = false;
  }

  el.shSuccessClose.addEventListener("click", () => { el.shSuccessOverlay.hidden = true; });
  el.shSuccessOverlay.addEventListener("click", e => {
    if (e.target === el.shSuccessOverlay) el.shSuccessOverlay.hidden = true;
  });

  /* ── shared: Escape key closes topmost open overlay ────────────────── */
  document.addEventListener("keydown", e => {
    if (e.key !== "Escape") return;
    if (!el.shSuccessOverlay.hidden)  { el.shSuccessOverlay.hidden = true; return; }
    if (!el.successOverlay.hidden)    { el.successOverlay.hidden = true; return; }
    if (!el.shOverlay.hidden)         { closeSecondhandModal(); return; }
    if (!el.modalOverlay.hidden)      { closeOrderModal(); return; }
    if (!el.yearOverlay.hidden)       { closeYearPicker(); return; }
  });

  /* ── submit button loading state ────────────────────────────────────── */
  function setSubmitting(btn, on) {
    if (on) {
      btn.dataset.originalLabel = btn.textContent;
      btn.textContent = "Sending…";
      btn.disabled = true;
    } else {
      btn.textContent = btn.dataset.originalLabel || btn.textContent;
      btn.disabled = false;
      delete btn.dataset.originalLabel;
    }
  }

  /* ── toast ──────────────────────────────────────────────────────────── */
  function showToast(msg) {
    el.toast.textContent = msg;
    el.toast.hidden = false;
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => { el.toast.hidden = true; }, 7000);
  }

  /* ── static text from data.js ───────────────────────────────────────── */
  function formatPhone(raw) {
    const d = String(raw).replace(/\D/g, "");
    if (d.length === 12 && d.startsWith("91")) {
      const local = d.slice(2);
      return `+91 ${local.slice(0, 5)} ${local.slice(5)}`;
    }
    return `+${d}`;
  }

  function renderStaticText() {
    document.title = `${CATALOG.shopName} — ${CATALOG.tagline}`;

    // Header logo is a real image — no initials or text to inject.

    const eyebrow = document.querySelector(".hero .eyebrow");
    if (eyebrow && CATALOG.shopDetails.location) {
      eyebrow.textContent = CATALOG.shopDetails.location.split(",").map(s => s.trim()).join(" · ");
    }

    const heroHeading = document.getElementById("heroHeading");
    if (heroHeading && CATALOG.tagline) {
      const parts = CATALOG.tagline.split(". ");
      heroHeading.innerHTML = parts.map(p => p.replace(/\.$/, "") + ".").join("<br />");
    }

    const adHeading = document.getElementById("adHeading");
    const adBody    = document.getElementById("adBody");
    const adCta     = document.getElementById("adCta");
    if (adHeading) adHeading.textContent = CATALOG.secondhandAd.heading;
    if (adBody)    adBody.textContent    = CATALOG.secondhandAd.body;
    if (adCta)     adCta.textContent     = CATALOG.secondhandAd.cta;

    const footBrand    = document.getElementById("footBrand");
    const footLocation = document.getElementById("footLocation");
    const footNote     = document.getElementById("footNote");
    const footWa       = document.getElementById("footWhatsapp");
    const footCall     = document.getElementById("footCall");
    if (footBrand)    footBrand.textContent    = CATALOG.shopName;
    if (footLocation) footLocation.textContent = CATALOG.shopDetails.location;
    if (footNote)     footNote.textContent     = CATALOG.shopDetails.note;
    const display = formatPhone(CATALOG.whatsappNumber);
    if (footWa) footWa.textContent = `WhatsApp: ${display}`;
    if (footCall) {
      footCall.textContent = `Call: ${display}`;
      footCall.href = `tel:${display.replace(/\s/g, "")}`;
    }
  }

  /* ── init ───────────────────────────────────────────────────────────── */
  renderStaticText();
  wireGeneralWaLinks();
  render();

})();
