class SolutionsSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  resolveHref(href) {
    if (!href || typeof href !== "string") return "#";

    if (
      href.startsWith("http://") ||
      href.startsWith("https://")
    ) {
      return href;
    }

    if (href.startsWith("/")) {
      return `.${href}`;
    }

    return href;
  }

  render() {
    const data = window.i18n.t("home.solutions");

    const items = Array.isArray(data?.items)
      ? data.items
      : [];

    const readMore =
      typeof data?.readMore === "string"
        ? data.readMore
        : "Lees meer";

    this.innerHTML = `
      <section id="oplossingen" class="py-24 bg-slate-50">

        <div class="container mx-auto px-6">

          <div class="max-w-4xl mx-auto text-center mb-16">

            <p class="text-energo font-semibold uppercase tracking-[0.25em] mb-3">
              Energo Oplossingen
            </p>

            <h2
              class="text-4xl md:text-5xl font-bold mb-6"
              data-i18n-html="home.solutions.title">
            </h2>

            <p class="text-lg text-dark/70">
              Van laadinfrastructuur en batterijopslag tot engineering
              en technische inspecties. Wij ontwerpen en realiseren
              complete energie-oplossingen voor bedrijven,
              vastgoed en logistiek.
            </p>

          </div>

          <div class="max-w-5xl mx-auto">

            ${items
              .map((it, index) => {
                const href = this.resolveHref(
                  it?.href || "#"
                );

                return `
                  <a
                    href="${href}"
                    class="group block">

                    <div
                      class="
                        py-8
                        border-b
                        border-black/10
                        transition-all
                        duration-300
                      ">

                      <div
                        class="
                          flex
                          flex-col
                          md:flex-row
                          md:items-start
                          gap-6
                        ">

                        <div
                          class="
                            text-4xl
                            md:text-5xl
                            font-bold
                            text-energo/20
                            shrink-0
                            w-20
                          ">
                          ${String(index + 1).padStart(2, "0")}
                        </div>

                        <div class="flex-1">

                          <div
                            class="
                              flex
                              items-center
                              gap-4
                              mb-3
                            ">

                            <div
                              class="
                                w-12
                                h-12
                                rounded-xl
                                bg-energo/10
                                flex
                                items-center
                                justify-center
                                text-energo
                              ">

                              <i
                                data-feather="${it.icon || "zap"}"
                                class="w-6 h-6">
                              </i>

                            </div>

                            <h3
                              class="
                                text-2xl
                                font-bold
                                transition-colors
                                duration-300
                                group-hover:text-energo
                              ">
                              ${it.title || ""}
                            </h3>

                          </div>

                          <p
                            class="
                              text-dark/70
                              leading-relaxed
                              max-w-3xl
                              mb-4
                            ">
                            ${it.desc || ""}
                          </p>

                          <div
                            class="
                              inline-flex
                              items-center
                              gap-2
                              text-energo
                              font-semibold
                            ">

                            ${readMore}

                            <i
                              data-feather="arrow-right"
                              class="
                                w-4
                                h-4
                                transition-transform
                                duration-300
                                group-hover:translate-x-2
                              ">
                            </i>

                          </div>

                        </div>

                      </div>

                    </div>

                  </a>
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

customElements.define(
  "solutions-section",
  SolutionsSection
);