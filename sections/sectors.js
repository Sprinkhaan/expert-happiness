class SectorsSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  render() {
    const raw = window.i18n.t("home.sectors.items");
    const items = Array.isArray(raw) ? raw : [];

    this.innerHTML = `
      <section class="py-20 bg-light">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold mb-12 text-center" data-i18n-html="home.sectors.title"></h2>

          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            ${items.map((it) => `
              <div class="group bg-white border border-light/10 rounded-2xl p-6 transition-all duration-300 hover:border-energo/30 hover:shadow-lg hover:shadow-energo/10 hover:-translate-y-2">
                <div class="w-16 h-16 rounded-lg bg-energo/10 flex items-center justify-center text-energo mb-4 group-hover:bg-energo/20 transition-all duration-300">
                  <i data-feather="${it.icon || "grid"}" class="w-8 h-8"></i>
                </div>
                <h3 class="text-xl font-bold mb-2">${it.title || ""}</h3>
                <p class="text-dark/70">${it.desc || ""}</p>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;

    window.i18n.apply(this);
    feather.replace();
  }
}
customElements.define("sectors-section", SectorsSection);