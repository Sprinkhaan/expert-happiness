class ProcessSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  render() {
    const raw = window.i18n.t("home.process.steps");
    const steps = Array.isArray(raw) ? raw : [];

    this.innerHTML = `
      <section class="py-24 bg-white overflow-hidden">

        <div class="container mx-auto px-6">

          <div class="max-w-3xl mx-auto text-center mb-20">

            <p class="text-energo font-semibold uppercase tracking-[0.25em] mb-3">
              Onze Werkwijze
            </p>

            <h2
              class="text-4xl md:text-5xl font-bold mb-6"
              data-i18n-html="home.process.title">
            </h2>

            <p class="text-lg text-dark/70">
              Van eerste analyse tot oplevering. Een gestructureerde aanpak
              waarmee we complexe energievraagstukken beheersbaar maken.
            </p>

          </div>

          <div class="max-w-5xl mx-auto relative">

            <!-- Vertical line -->
            <div
              class="absolute left-[26px] top-0 bottom-0 w-px bg-gradient-to-b from-energo/10 via-energo/30 to-energo/10">
            </div>

            ${steps
              .map(
                (s, idx) => `
                  <div
                    class="group relative pl-20 pb-14 process-item">

                    <!-- Number -->
                    <div
                      class="
                        absolute
                        left-0
                        top-0
                        w-14
                        h-14
                        rounded-2xl
                        bg-white
                        border
                        border-energo/10
                        shadow-md
                        flex
                        items-center
                        justify-center
                        transition-all
                        duration-300
                        group-hover:border-energo/30
                        group-hover:shadow-xl
                        group-hover:-translate-y-1
                      ">

                      <span
                        class="
                          text-lg
                          font-bold
                          text-energo
                        ">
                        ${s.n || idx + 1}
                      </span>

                    </div>

                    <!-- Content -->
                    <div
                      class="
                        rounded-3xl
                        border
                        border-black/5
                        bg-slate-50
                        p-8
                        transition-all
                        duration-300
                        group-hover:shadow-xl
                        group-hover:border-energo/10
                        group-hover:bg-white
                      ">

                      <p
                        class="
                          text-energo
                          text-sm
                          font-semibold
                          uppercase
                          tracking-wider
                          mb-2
                        ">
                        Stap ${s.n || idx + 1}
                      </p>

                      <h3
                        class="
                          text-2xl
                          font-bold
                          mb-2
                        ">
                        ${s.title || ""}
                      </h3>

                      <p
                        class="
                          text-dark/60
                          font-medium
                          mb-4
                        ">
                        ${s.subtitle || ""}
                      </p>

                      <p
                        class="
                          text-dark/80
                          leading-relaxed
                          max-w-3xl
                        ">
                        ${s.desc || ""}
                      </p>

                    </div>

                  </div>
                `
              )
              .join("")}

          </div>

        </div>
      </section>
    `;

    window.i18n.apply(this);

    this.animateItems();
  }

  animateItems() {
    const items = this.querySelectorAll(".process-item");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          entry.target.classList.add("process-visible");
        });
      },
      {
        threshold: 0.15,
      }
    );

    items.forEach((item, index) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(40px)";
      item.style.transition = `all 700ms ease ${index * 120}ms`;

      observer.observe(item);
    });

    const style = document.createElement("style");

    style.innerHTML = `
      .process-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    `;

    document.head.appendChild(style);
  }
}

customElements.define("process-section", ProcessSection);