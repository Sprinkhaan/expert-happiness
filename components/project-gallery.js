class ProjectGallery extends HTMLElement {
  connectedCallback() {
    this.images = [];
    this.index = 0;

    this.renderShell();
    this.bindEvents();
  }

  renderShell() {
    this.innerHTML = `
      <div class="pg-overlay hidden" data-overlay>
        <div class="pg-modal" role="dialog" aria-modal="true" aria-label="Project foto's" data-modal>
          
          <!-- Close -->
          <button class="pg-close" type="button" aria-label="Sluiten" data-close>
            <span class="pg-close-x">×</span>
          </button>

          <!-- Main image -->
          <div class="pg-stage" data-stage>
            <img class="pg-img" data-img alt="Project foto" />
          </div>

          <!-- Controls -->
          <button class="pg-arrow pg-prev" type="button" aria-label="Vorige" data-prev>
            <span class="pg-arrow-icon">‹</span>
          </button>

          <button class="pg-arrow pg-next" type="button" aria-label="Volgende" data-next>
            <span class="pg-arrow-icon">›</span>
          </button>

          <!-- Dots -->
          <div class="pg-dots" data-dots aria-label="Foto selectie"></div>
        </div>
      </div>

      <style>
        .pg-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          background: rgba(0,0,0,0.78);
          backdrop-filter: blur(6px);
        }
        .pg-overlay.hidden { display: none; }

        .pg-modal {
          position: relative;
          width: min(980px, 100%);
          max-height: 86vh;
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.14);
          background: rgba(15,15,15,0.92);
          box-shadow: 0 24px 80px rgba(0,0,0,0.45);
          display: grid;
          grid-template-rows: 1fr auto;
        }

        .pg-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 52vh;
          background: rgba(0,0,0,0.22);
        }

        .pg-img {
          width: 100%;
          height: 100%;
          max-height: 76vh;
          object-fit: contain;
          user-select: none;
          -webkit-user-drag: none;
        }

        /* Close button - always visible */
        .pg-close {
          position: absolute;
          top: 14px;
          right: 14px;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(0,0,0,0.45);
          display: grid;
          place-items: center;
          cursor: pointer;
          z-index: 2;
        }
        .pg-close:hover { background: rgba(0,0,0,0.65); }
        .pg-close-x {
          color: #ff3b30; /* red X */
          font-size: 28px;
          line-height: 1;
          font-weight: 700;
          transform: translateY(-1px);
        }

        /* Arrows - solid, clear */
        .pg-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 52px;
          height: 52px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.22);
          background: rgba(0,0,0,0.55);
          display: grid;
          place-items: center;
          cursor: pointer;
          z-index: 2;
        }
        .pg-arrow:hover { background: rgba(0,0,0,0.75); }
        .pg-arrow:active { transform: translateY(-50%) scale(0.98); }

        .pg-prev { left: 14px; }
        .pg-next { right: 14px; }

        .pg-arrow-icon {
          color: #fff;
          font-size: 34px;
          line-height: 1;
          font-weight: 700;
          transform: translateY(-1px);
          text-shadow: 0 6px 16px rgba(0,0,0,0.55);
        }

        /* Dots */
        .pg-dots {
          padding: 12px 14px 16px;
          display: flex;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          background: rgba(0,0,0,0.25);
          border-top: 1px solid rgba(255,255,255,0.10);
        }

        .pg-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.22);
          cursor: pointer;
        }
        .pg-dot:hover { background: rgba(255,255,255,0.35); }
        .pg-dot.active {
          background: #ffffff;
          border-color: rgba(255,255,255,0.95);
          transform: scale(1.15);
        }

        /* Mobile tweaks */
        @media (max-width: 640px) {
          .pg-modal { max-height: 90vh; }
          .pg-stage { min-height: 56vh; }
          .pg-arrow { width: 48px; height: 48px; border-radius: 14px; }
          .pg-arrow-icon { font-size: 32px; }
          .pg-close { width: 46px; height: 46px; }
          .pg-close-x { font-size: 30px; }
        }
      </style>
    `;
  }

  bindEvents() {
    const overlay = this.querySelector("[data-overlay]");
    const modal = this.querySelector("[data-modal]");
    const closeBtn = this.querySelector("[data-close]");
    const prevBtn = this.querySelector("[data-prev]");
    const nextBtn = this.querySelector("[data-next]");

    // close when clicking dark overlay (outside modal)
    overlay.addEventListener("click", () => this.hide());

    // prevent overlay close when clicking inside modal
    modal.addEventListener("click", (e) => e.stopPropagation());

    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.hide();
    });

    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.prev();
    });

    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      this.next();
    });

    // keyboard
    document.addEventListener("keydown", (e) => {
      const overlayEl = this.querySelector("[data-overlay]");
      if (!overlayEl || overlayEl.classList.contains("hidden")) return;

      if (e.key === "Escape") this.hide();
      if (e.key === "ArrowLeft") this.prev();
      if (e.key === "ArrowRight") this.next();
    });
  }

  show(images = [], startIndex = 0) {
    this.images = Array.isArray(images) ? images.filter(Boolean) : [];
    this.index = Math.max(0, Math.min(startIndex, this.images.length - 1));

    const overlay = this.querySelector("[data-overlay]");
    overlay.classList.remove("hidden");

    this.renderDots();
    this.update();
  }

  hide() {
    const overlay = this.querySelector("[data-overlay]");
    overlay.classList.add("hidden");
  }

  prev() {
    if (!this.images.length) return;
    this.index = (this.index - 1 + this.images.length) % this.images.length;
    this.update();
  }

  next() {
    if (!this.images.length) return;
    this.index = (this.index + 1) % this.images.length;
    this.update();
  }

  renderDots() {
    const dotsWrap = this.querySelector("[data-dots]");
    if (!dotsWrap) return;

    dotsWrap.innerHTML = this.images
      .map(
        (_, i) => `
        <button class="pg-dot ${i === this.index ? "active" : ""}"
                type="button"
                aria-label="Ga naar foto ${i + 1}"
                data-dot="${i}"></button>
      `
      )
      .join("");

    dotsWrap.querySelectorAll("[data-dot]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = Number(btn.getAttribute("data-dot"));
        if (!Number.isFinite(idx)) return;
        this.index = idx;
        this.update();
      });
    });
  }

  update() {
    const imgEl = this.querySelector("[data-img]");
    if (!imgEl) return;

    const src = this.images[this.index];
    imgEl.src = src || "";

    // active dot
    const dots = this.querySelectorAll(".pg-dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === this.index));
  }
}

customElements.define("project-gallery", ProjectGallery);