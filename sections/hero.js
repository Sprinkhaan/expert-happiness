class HeroSection extends HTMLElement {
  connectedCallback() {
    this.images = [
      "./assets/images/overig/1.jpeg",
      "./assets/images/overig/2.jpeg",
      "./assets/images/overig/3.jpeg",
      "./assets/images/overig/4.jpeg",
      "./assets/images/overig/5.jpeg",
      "./assets/images/overig/6.jpeg",
      "./assets/images/overig/7.jpeg",
    ];

    this.index = Math.floor(Math.random() * this.images.length);

    this.render();
    this.startSlideshow();
    this.animateCounters();

    window.i18n.onChange(() => {
      window.i18n.apply(this);
    });
  }

  startSlideshow() {
    const layers = this.querySelectorAll("[data-hero-layer]");
    if (layers.length !== 2) return;

    let active = 0;

    this.interval = setInterval(() => {
      const next = (active + 1) % 2;
      this.index = (this.index + 1) % this.images.length;

      layers[next].style.backgroundImage = `url('${this.images[this.index]}')`;
      layers[next].style.opacity = "1";
      layers[active].style.opacity = "0";

      active = next;
    }, 4500);
  }

  animateCounters() {
    const counters = this.querySelectorAll("[data-counter]");

    counters.forEach((counter) => {
      const target = Number(counter.dataset.counter);

      let current = 0;
      const step = Math.max(1, Math.ceil(target / 60));

      const timer = setInterval(() => {
        current += step;

        if (current >= target) {
          current = target;

          if (target === 250) counter.textContent = "250+";
          else if (target === 500) counter.textContent = "500+";
          else if (target === 5) counter.textContent = "5 MW";
          else counter.textContent = target;

          clearInterval(timer);
        } else {
          counter.textContent = current;
        }
      }, 25);
    });
  }

  disconnectedCallback() {
    if (this.interval) clearInterval(this.interval);
  }

  render() {
    const firstImage = this.images[this.index];

    this.innerHTML = `
      <section class="relative min-h-[72vh] md:min-h-[88vh] flex items-center overflow-hidden">

        <!-- Background -->
        <div
          data-hero-layer
          class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style="background-image:url('${firstImage}'); opacity:1;">
        </div>

        <div
          data-hero-layer
          class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style="opacity:0;">
        </div>

        <!-- overlays -->
        <div class="absolute inset-0 bg-black/55"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80"></div>

        <!-- content -->
        <div class="container mx-auto px-6 relative z-10">

          <div class="max-w-5xl mx-auto text-center">

            <img
              src="./assets/logo-jpeg.png"
              alt="Energo"
              class="h-16 md:h-20 mx-auto mb-6 hero-logo-breathe"
            />

            <h1
              class="text-white text-3xl md:text-6xl font-bold leading-tight mb-4"
              data-i18n-html="home.hero.title">
            </h1>

            <p
              class="text-white/90 text-lg md:text-xl max-w-3xl mx-auto mb-6"
              data-i18n="home.hero.subtitle">
            </p>

            <div class="flex flex-col sm:flex-row justify-center gap-3 mb-6">

              <a
                href="#oplossingen"
                class="w-full sm:w-auto px-8 py-3 bg-energo text-white rounded-xl font-semibold hover:-translate-y-1 transition-all shadow-xl"
                data-i18n="home.hero.ctaPrimary">
              </a>

              <a
                href="./projects/"
                class="w-full sm:w-auto px-8 py-3 bg-white/10 backdrop-blur text-white rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                Bekijk projecten
              </a>

            </div>

            <!-- Desktop only trust pills -->
            <div class="hidden md:flex flex-wrap justify-center gap-3 mb-8">

              <span class="px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm">
                ✓ Eigen engineering
              </span>

              <span class="px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm">
                ✓ Turnkey realisatie
              </span>

              <span class="px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white text-sm">
                ✓ Werkgebied Nederland
              </span>

            </div>

            <!-- Stats -->
            <div
              class="grid grid-cols-3 overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-white/10 backdrop-blur-xl max-w-2xl mx-auto">

              <div class="p-3 md:p-5">
                <div
                  class="text-2xl md:text-5xl font-bold text-white mb-1"
                  data-counter="250">
                  0
                </div>

                <div
                  class="text-white/70 text-[10px] md:text-sm"
                  data-i18n="home.trust.stats.installationsLabel">
                </div>
              </div>

              <div class="p-3 md:p-5 border-x border-white/10">
                <div
                  class="text-2xl md:text-5xl font-bold text-white mb-1"
                  data-counter="5">
                  0
                </div>

                <div
                  class="text-white/70 text-[10px] md:text-sm"
                  data-i18n="home.trust.stats.solarLabel">
                </div>
              </div>

              <div class="p-3 md:p-5">
                <div
                  class="text-2xl md:text-5xl font-bold text-white mb-1"
                  data-counter="500">
                  0
                </div>

                <div
                  class="text-white/70 text-[10px] md:text-sm"
                  data-i18n="home.trust.stats.chargepointsLabel">
                </div>
              </div>

            </div>

          </div>

        </div>

        <!-- Scroll indicator -->
        <div class="absolute bottom-3 left-1/2 -translate-x-1/2 text-white/70 animate-bounce z-30">
          <i data-feather="chevron-down" class="w-8 h-8"></i>
        </div>

      </section>
    `;

    window.i18n.apply(this);
    feather.replace();
  }
}

customElements.define("hero-section", HeroSection);