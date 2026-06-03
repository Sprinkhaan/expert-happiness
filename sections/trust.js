class TrustSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  render() {
    this.innerHTML = `
      <section class="py-12 bg-white">
        <div class="container mx-auto px-6">
          <div class="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
            <div class="col-span-2 md:col-span-1 text-center md:text-left">
              <p class="text-sm text-dark/70 mb-1" data-i18n="home.trust.workAreaLabel"></p>
              <p class="text-xl font-bold" data-i18n="home.trust.workAreaValue"></p>
            </div>

            <div class="text-center">
              <p class="text-2xl font-bold text-energo">250+</p>
              <p class="text-sm text-dark/70" data-i18n="home.trust.stats.installationsLabel"></p>
            </div>

            <div class="text-center">
              <p class="text-2xl font-bold text-energo">5MW</p>
              <p class="text-sm text-dark/70" data-i18n="home.trust.stats.solarLabel"></p>
            </div>

            <div class="text-center">
              <p class="text-2xl font-bold text-energo">500+</p>
              <p class="text-sm text-dark/70" data-i18n="home.trust.stats.chargepointsLabel"></p>
            </div>
          </div>
        </div>
      </section>
    `;

    window.i18n.apply(this);
  }
}
customElements.define("trust-section", TrustSection);