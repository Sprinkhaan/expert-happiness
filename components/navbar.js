class CustomNavbar extends HTMLElement {
  connectedCallback() {
    this.isOpen = false;
    this.render();
    window.i18n?.onChange?.(() => this.render());
  }

  // Resolve correct base: "/site" if served under /site, otherwise current dir.
  getSiteBase() {
    const p = window.location.pathname;
    const i = p.indexOf("/site/");
    return i >= 0 ? p.slice(0, i + 5) : ""; // includes "/site"
  }

  applyRoutes(root) {
    const base = this.getSiteBase();
    root.querySelectorAll("[data-route]").forEach((a) => {
      const route = a.getAttribute("data-route"); // e.g. "index", "solutions", "projects", "contact"
      let href = "#";

      if (route === "index") href = `${base}/index.html`;
      if (route === "solutions") href = `${base}/solutions/index.html`;
      if (route === "projects") href = `${base}/projects/index.html`;
      if (route === "contact") href = `${base}/contact.html`;

      a.setAttribute("href", href);
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    const menu = this.querySelector("[data-mobile-menu]");
    const icon = this.querySelector("[data-menu-icon]");
    menu.classList.toggle("hidden", !this.isOpen);
    icon.setAttribute("data-feather", this.isOpen ? "x" : "menu");
    feather.replace();
  }

  async setLang(lang) {
    try {
      await window.i18n.load(lang);
      localStorage.setItem("lang", lang);
    } catch (e) {
      alert(`Taalbestand ontbreekt: ${lang}.json`);
      console.error(e);
    }
  }

  render() {
    this.innerHTML = `
      <header class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-dark/10">
        <nav class="max-w-[1400px] mx-auto px-6 py-3 flex items-center justify-between gap-6">
          <a data-route="index" class="flex items-center gap-3 no-underline">
            <img
              src="${this.getSiteBase()}/assets/logo-jpeg.png"
              alt="Energo logo"
              class="h-10 md:h-11 w-auto"
              style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.15));"
            />
          </a>

          <!-- Desktop menu -->
          <div class="hidden md:flex items-center gap-8">
            <a data-route="solutions" class="font-medium hover:text-energo transition-colors" data-i18n="nav.solutions"></a>
            <a data-route="projects" class="font-medium hover:text-energo transition-colors" data-i18n="nav.projects"></a>
            <a data-route="contact" class="font-medium hover:text-energo transition-colors" data-i18n="nav.contact"></a>
          </div>

          <div class="hidden md:flex items-center gap-3">
            <button type="button" class="px-3 py-2 rounded-lg border border-dark/10 hover:bg-dark/5 text-sm" data-lang="nl">NL</button>
            <button type="button" class="px-3 py-2 rounded-lg border border-dark/10 hover:bg-dark/5 text-sm" data-lang="en">EN</button>

            <a data-route="contact" class="px-5 py-2 bg-energo text-white font-semibold rounded-lg hover:bg-[#0052CC] transition-all"
              data-i18n="nav.cta"></a>
          </div>

          <!-- Mobile button -->
          <button class="md:hidden p-2 rounded-lg border border-dark/10" type="button" aria-label="menu" data-mobile-btn>
            <i data-feather="menu" class="w-5 h-5" data-menu-icon></i>
          </button>
        </nav>

        <!-- Mobile menu -->
        <div class="md:hidden hidden border-t border-dark/10 bg-white" data-mobile-menu>
          <div class="max-w-[1400px] mx-auto px-6 py-4 flex flex-col gap-4">
            <a data-route="solutions" class="font-medium" data-i18n="nav.solutions"></a>
            <a data-route="projects" class="font-medium" data-i18n="nav.projects"></a>
            <a data-route="contact" class="font-medium" data-i18n="nav.contact"></a>

            <div class="flex items-center gap-3 pt-2">
              <button type="button" class="px-3 py-2 rounded-lg border border-dark/10 hover:bg-dark/5 text-sm" data-lang="nl">NL</button>
              <button type="button" class="px-3 py-2 rounded-lg border border-dark/10 hover:bg-dark/5 text-sm" data-lang="en">EN</button>

              <a data-route="contact" class="ml-auto px-5 py-2 bg-energo text-white font-semibold rounded-lg"
                data-i18n="nav.cta"></a>
            </div>
          </div>
        </div>
      </header>
    `;

    // Set correct hrefs everywhere
    this.applyRoutes(this);

    // i18n + icons
    window.i18n?.apply?.(this);
    feather.replace();

    // mobile toggle
    this.querySelector("[data-mobile-btn]")?.addEventListener("click", () => this.toggle());

    // language buttons
    this.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => this.setLang(btn.getAttribute("data-lang")));
    });

    // Close mobile menu when clicking a link
    this.querySelectorAll("[data-mobile-menu] a").forEach((a) => {
      a.addEventListener("click", () => {
        const menu = this.querySelector("[data-mobile-menu]");
        menu.classList.add("hidden");
        this.isOpen = false;
        const icon = this.querySelector("[data-menu-icon]");
        icon.setAttribute("data-feather", "menu");
        feather.replace();
      });
    });
  }
}

customElements.define("custom-navbar", CustomNavbar);