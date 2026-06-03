class UspSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  render() {
    const raw = window.i18n.t("home.usp.items");
    const items = Array.isArray(raw) ? raw : [];

    this.innerHTML = `
      <section class="py-20 bg-dark text-white">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold mb-12 text-center" data-i18n-html="home.usp.title"></h2>

          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            ${items.map((it) => `
              <div class="text-center">
                <div class="w-20 h-20 rounded-full bg-energo/10 flex items-center justify-center text-energo mx-auto mb-6">
                  <i data-feather="${it.icon || "shield"}" class="w-8 h-8"></i>
                </div>
                <h3 class="text-xl font-bold mb-2">${it.title || ""}</h3>
                <p class="text-light/70">${it.desc || ""}</p>
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
customElements.define("usp-section", UspSection);