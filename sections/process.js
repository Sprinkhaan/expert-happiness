class ProcessSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  render() {
    const raw = window.i18n.t("home.process.steps");
    const steps = Array.isArray(raw) ? raw : [];

    this.innerHTML = `
      <section class="py-20 bg-white">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold mb-12 text-center" data-i18n-html="home.process.title"></h2>

          <div class="relative">
            <div class="hidden md:block absolute left-1/2 h-full w-0.5 bg-energo/20 -translate-x-1/2"></div>

            <div class="space-y-12">
              ${steps.map((s, idx) => {
                const isRight = idx % 2 === 1;
                return `
                  <div class="relative flex md:justify-center">
                    <div class="md:w-1/2 ${isRight ? "md:pl-8 md:text-left md:ml-auto" : "md:pr-8 md:text-right"}">
                      <div class="p-6 bg-white border border-light/10 rounded-2xl relative ${isRight ? "md:ml-8" : "md:mr-8"} transition-all duration-300 hover:border-energo/30 hover:shadow-lg hover:shadow-energo/10">
                        <div class="absolute -left-4 ${isRight ? "" : "md:-right-4"} top-6 w-8 h-8 rounded-full bg-energo border-4 border-white flex items-center justify-center">
                          <span class="text-white font-bold">${s.n || idx + 1}</span>
                        </div>
                        <h3 class="text-xl font-bold mb-1">${s.title || ""}</h3>
                        <p class="text-dark/70 mb-2">${s.subtitle || ""}</p>
                        <p class="mt-3 text-dark/80">${s.desc || ""}</p>
                      </div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          </div>
        </div>
      </section>
    `;

    window.i18n.apply(this);
  }
}
customElements.define("process-section", ProcessSection);