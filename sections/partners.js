class PartnersSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  render() {
    const partners = [
      "/assets/partners/partner1.svg",
      "/assets/partners/partner2.svg",
      "/assets/partners/partner3.svg",
      "/assets/partners/partner4.svg",
      "/assets/partners/partner5.svg"
    ];

    this.innerHTML = `
      <section class="py-16 bg-white">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold mb-12 text-center" data-i18n-html="home.partners.title"></h2>

          <div class="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
            ${partners.map((src, idx) => `
              <div class="flex justify-center">
                <img src="${src}" alt="Partner ${idx + 1}" class="h-12 md:h-16 object-contain opacity-70 hover:opacity-100 transition-all duration-300">
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;

    window.i18n.apply(this);
  }
}
customElements.define("partners-section", PartnersSection);