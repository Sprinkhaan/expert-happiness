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

    window.i18n.onChange(() => window.i18n.apply(this));
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

  disconnectedCallback() {
    if (this.interval) clearInterval(this.interval);
  }

  render() {
    const firstImage = this.images[this.index];

    this.innerHTML = `
      <section class="relative min-h-[68vh] md:min-h-[72vh] flex items-center overflow-hidden pt-20">

        <!-- Background layers -->
        <div data-hero-layer
             class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
             style="background-image:url('${firstImage}'); opacity:1;"></div>

        <div data-hero-layer
             class="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
             style="opacity:0;"></div>

        <!-- Neutral dark overlay -->
        <div class="absolute inset-0 bg-black/35"></div>

        <!-- Top/bottom depth -->
        <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/55"></div>

        <!-- Radial halo BEHIND logo & text (no box) -->
        <div class="absolute inset-0 pointer-events-none"
             style="background:
               radial-gradient(
                 520px 300px at 50% 38%,
                 rgba(255,255,255,0.38),
                 rgba(255,255,255,0.18) 35%,
                 rgba(255,255,255,0) 70%
               );">
        </div>

        <!-- Soft vignette -->
        <div class="absolute inset-0 pointer-events-none"
             style="box-shadow: inset 0 0 120px rgba(0,0,0,0.6)"></div>

        <!-- Content -->
        <div class="container mx-auto px-6 z-10">
          <div class="flex flex-col items-center text-center">

            <!-- LOGO (no container, only glow) -->
            <img
              src="./assets/logo-jpeg.png"
              alt="Energo logo"
              class="h-20 md:h-24 w-auto mb-6 select-none hero-logo-breathe"
            />

            <h1 class="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white max-w-4xl"
                data-i18n-html="home.hero.title"></h1>

            <p class="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
               data-i18n="home.hero.subtitle"></p>

            <div class="flex flex-wrap gap-4 justify-center">
              <a href="#oplossingen"
                 class="px-8 py-3 bg-white text-energo font-semibold rounded-lg
                        hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                 data-i18n="home.hero.ctaPrimary"></a>
            </div>
          </div>
        </div>
      </section>
    `;

    window.i18n.apply(this);
  }
}

customElements.define("hero-section", HeroSection);