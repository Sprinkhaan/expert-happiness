class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.isOpen = false;
    this.render();

    window.i18n?.onChange?.(() => {
      this.render();
    });
  }

  getSiteBase() {
  return window.location.hostname.includes("github.io")
    ? "/expert-happiness"
    : "";
  }

  applyRoutes(root) {
    const base = this.getSiteBase();

    const routes = {
      index: `${base}/`,
      solutions: `${base}/solutions/`,
      projects: `${base}/projects/`,
      contact: `${base}/contact/`,
    };

    root.querySelectorAll("[data-route]").forEach((link) => {
      const route = link.dataset.route;

      if (routes[route]) {
        link.href = routes[route];
      }
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;

    const menu = this.querySelector("[data-mobile-menu]");
    const icon = this.querySelector("[data-menu-icon]");

    menu?.classList.toggle("hidden", !this.isOpen);

    if (icon) {
      icon.setAttribute(
        "data-feather",
        this.isOpen ? "x" : "menu"
      );
    }

    feather?.replace?.();
  }

  async setLang(lang) {
    try {
      await window.i18n.load(lang);
      localStorage.setItem("lang", lang);
    } catch (err) {
      console.error(err);
      alert(`Taalbestand ontbreekt: ${lang}.json`);
    }
  }

  render() {
    const base = this.getSiteBase();

    this.innerHTML = `
      <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-dark/10">
        <nav class="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between gap-6">

          <a data-route="index" class="flex items-center gap-3 no-underline">
            <img
              src="${base}/assets/logo-jpeg.png"
              alt="Energo logo"
              class="h-10 md:h-11 w-auto"
              style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.15));"
            />
          </a>

          <!-- Desktop -->
          <div class="hidden md:flex items-center gap-8">
            <a data-route="solutions"
               class="font-medium hover:text-energo transition-colors"
               data-i18n="nav.solutions"></a>

            <a data-route="projects"
               class="font-medium hover:text-energo transition-colors"
               data-i18n="nav.projects"></a>

            <a data-route="contact"
               class="font-medium hover:text-energo transition-colors"
               data-i18n="nav.contact"></a>
          </div>

          <div class="hidden md:flex items-center gap-3">
            <button
              type="button"
              data-lang="nl"
              class="px-3 py-2 rounded-lg border border-dark/10 hover:bg-dark/5 text-sm">
              NL
            </button>

            <button
              type="button"
              data-lang="en"
              class="px-3 py-2 rounded-lg border border-dark/10 hover:bg-dark/5 text-sm">
              EN
            </button>

            <a
              data-route="contact"
              class="px-5 py-2 bg-energo text-white font-semibold rounded-lg hover:bg-[#0052CC] transition-all"
              data-i18n="nav.cta"></a>
          </div>

          <!-- Mobile button -->
          <button
            class="md:hidden p-2 rounded-lg border border-dark/10"
            type="button"
            aria-label="menu"
            data-mobile-btn>
            <i data-feather="menu" class="w-5 h-5" data-menu-icon></i>
          </button>

        </nav>

        <!-- Mobile menu -->
        <div class="md:hidden hidden border-t border-dark/10 bg-white" data-mobile-menu>
          <div class="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-4">

            <a data-route="solutions"
               class="font-medium"
               data-i18n="nav.solutions"></a>

            <a data-route="projects"
               class="font-medium"
               data-i18n="nav.projects"></a>

            <a data-route="contact"
               class="font-medium"
               data-i18n="nav.contact"></a>

            <div class="flex items-center gap-3 pt-2">

              <button
                type="button"
                data-lang="nl"
                class="px-3 py-2 rounded-lg border border-dark/10 hover:bg-dark/5 text-sm">
                NL
              </button>

              <button
                type="button"
                data-lang="en"
                class="px-3 py-2 rounded-lg border border-dark/10 hover:bg-dark/5 text-sm">
                EN
              </button>

              <a
                data-route="contact"
                class="ml-auto px-5 py-2 bg-energo text-white font-semibold rounded-lg"
                data-i18n="nav.cta"></a>

            </div>
          </div>
        </div>
      </header>
    `;

    this.applyRoutes(this);

    window.i18n?.apply?.(this);
    feather?.replace?.();

    this.querySelector("[data-mobile-btn]")?.addEventListener(
      "click",
      () => this.toggle()
    );

    this.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.setLang(btn.dataset.lang);
      });
    });

    this.querySelectorAll("[data-mobile-menu] a").forEach((link) => {
      link.addEventListener("click", () => {
        this.isOpen = false;

        const menu = this.querySelector("[data-mobile-menu]");
        const icon = this.querySelector("[data-menu-icon]");

        menu?.classList.add("hidden");

        if (icon) {
          icon.setAttribute("data-feather", "menu");
        }

        feather?.replace?.();
      });
    });
  }
}

customElements.define("custom-navbar", CustomNavbar);