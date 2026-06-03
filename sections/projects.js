class ProjectsSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  imageExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  async buildImages(folder) {
    const base = folder.replace(/\/$/, "");
    const exts = ["jpeg", "jpg", "png", "webp"];

    // cover eerst
    let cover = null;
    for (const ext of exts) {
      const url = `${base}/cover.${ext}`;
      if (await this.imageExists(url)) {
        cover = url;
        break;
      }
    }
    if (!cover) return [];

    const images = [cover];

    // 1..99, stop na 5 missers
    let misses = 0;
    for (let i = 1; i <= 99; i++) {
      let found = false;
      for (const ext of exts) {
        const url = `${base}/${i}.${ext}`;
        if (await this.imageExists(url)) {
          images.push(url);
          found = true;
          break;
        }
      }
      if (!found) {
        misses++;
        if (misses >= 5) break;
      } else {
        misses = 0;
      }
    }

    return images;
  }

  async render() {
    const data = window.i18n.t("home.projects");
    const allItems = Array.isArray(data?.items) ? data.items : [];
    const ctaView = typeof data?.ctaView === "string" ? data.ctaView : "Bekijk project";

    // NEW: limit via attribute: <projects-section limit="3"></projects-section>
    const limitAttr = this.getAttribute("limit");
    const limit = limitAttr ? Number(limitAttr) : null;
    const items = Number.isFinite(limit) && limit > 0 ? allItems.slice(0, limit) : allItems;

    const projectsWithImages = await Promise.all(
      items.map(async (p) => {
        if (Array.isArray(p.images) && p.images.length) return p;
        if (p.folder) {
          const imgs = await this.buildImages(p.folder);
          return { ...p, images: imgs };
        }
        return { ...p, images: [] };
      })
    );

    const showAllBtn = !this.hasAttribute("hide-all-cta");

    this.innerHTML = `
      <section class="py-20 bg-light">
        <div class="container mx-auto px-6">
          <div class="rounded-3xl border border-dark/10 bg-white p-6 md:p-10 shadow-sm">
            <h2 class="text-3xl font-bold mb-10 text-center" data-i18n-html="home.projects.title"></h2>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${projectsWithImages
                .map(
                  (p, idx) => `
                <div class="group bg-white border border-dark/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-energo/30 hover:shadow-lg hover:shadow-energo/10 cursor-pointer project-card"
                     data-project-index="${idx}">
                  <div class="h-48 overflow-hidden bg-light">
                    <img src="${p.images?.[0] || "./assets/images/overig/1.jpeg"}"
                         alt="${p.title || ""}"
                         class="w-full h-full object-cover transition-all duration-500 group-hover:scale-105">
                  </div>
                  <div class="p-6">
                    <div class="flex flex-wrap gap-2 mb-3">
                      ${(Array.isArray(p.tags) ? p.tags : [])
                        .map(
                          (t) =>
                            `<span class="px-3 py-1 bg-energo/10 text-energo text-xs rounded-full">${t}</span>`
                        )
                        .join("")}
                    </div>
                    <h3 class="text-xl font-bold mb-2">${p.title || ""}</h3>
                    <p class="text-dark/70 mb-4">${p.desc || ""}</p>
                    <div class="text-energo font-medium flex items-center gap-2">
                      ${ctaView} <i data-feather="arrow-right" class="w-4 h-4"></i>
                    </div>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>

            ${
              showAllBtn
                ? `
              <div class="text-center mt-10">
                <a href="./projects/index.html"
                   class="px-8 py-3 border-2 border-dark text-dark hover:bg-dark/5 font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1"
                   data-i18n="home.projects.ctaAll"></a>
              </div>
            `
                : ""
            }
          </div>
        </div>
      </section>
    `;

    window.i18n.apply(this);
    feather.replace();

    const gallery = document.querySelector("project-gallery");
    this.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("click", () => {
        const idx = Number(card.getAttribute("data-project-index"));
        const imgs = projectsWithImages[idx]?.images || [];
        if (gallery && imgs.length) gallery.show(imgs);
      });
    });
  }
}

customElements.define("projects-section", ProjectsSection);