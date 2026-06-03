class SolutionsSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  resolveHref(href) {
    if (!href || typeof href !== "string") return "#";
    if (href.startsWith("http://") || href.startsWith("https://")) return href;
    if (href.startsWith("/")) return `.${href}`; // <-- KEY FIX
    return href;
  }

  render() {
    const data = window.i18n.t("home.solutions");
    const items = Array.isArray(data?.items) ? data.items : [];
    const readMore = typeof data?.readMore === "string" ? data.readMore : "Lees meer";

    this.innerHTML = `
      <section id="oplossingen" class="py-20">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold mb-12 text-center" data-i18n-html="home.solutions.title"></h2>

          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${items
              .map((it) => {
                const href = this.resolveHref(it?.href || "#");
                return `
                  <div class="group bg-white border border-light/10 rounded-2xl p-8 transition-all duration-300 hover:border-energo/30 hover:shadow-lg hover:shadow-energo/10 hover:-translate-y-2">
                    <div class="w-16 h-16 rounded-lg bg-energo/10 flex items-center justify-center text-energo mb-6 group-hover:bg-energo/20 transition-all duration-300">
                      <i data-feather="${it.icon || "zap"}" class="w-8 h-8"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">${it.title || ""}</h3>
                    <p class="text-dark/70 mb-4">${it.desc || ""}</p>

                    <a href="${href}" class="text-energo font-medium flex items-center gap-2">
                      ${readMore} <i data-feather="arrow-right" class="w-4 h-4"></i>
                    </a>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>
      </section>
    `;

    window.i18n.apply(this);
    feather.replace();
  }
}

customElements.define("solutions-section", SolutionsSection);