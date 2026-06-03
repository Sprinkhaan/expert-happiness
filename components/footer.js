class CustomFooter extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n?.onChange?.(() => this.render());
  }

  render() {
    const year = new Date().getFullYear();

    this.innerHTML = `
      <footer class="bg-dark text-light">
        <div class="max-w-[1400px] mx-auto px-6 py-16">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <div class="text-2xl font-bold mb-3">
                Energo<span class="text-energo">.</span>
              </div>
              <p class="text-light/70 leading-relaxed" data-i18n="footer.about"></p>
              <div class="flex gap-3 mt-5">
                <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-energo transition-all" aria-label="LinkedIn">
                  <i data-feather="linkedin" class="w-5 h-5"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-energo transition-all" aria-label="Twitter">
                  <i data-feather="twitter" class="w-5 h-5"></i>
                </a>
                <a href="#" class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-energo transition-all" aria-label="Instagram">
                  <i data-feather="instagram" class="w-5 h-5"></i>
                </a>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4" data-i18n="footer.solutions"></h3>
              <ul class="space-y-3 text-light/70">
                <li><a class="hover:text-energo transition-colors" href="/oplossingen/laadpalen">Laadpalen</a></li>
                <li><a class="hover:text-energo transition-colors" href="/oplossingen/batterijen">Batterijen</a></li>
                <li><a class="hover:text-energo transition-colors" href="/oplossingen/zonnepanelen">Zonnepanelen</a></li>
                <li><a class="hover:text-energo transition-colors" href="/oplossingen/engineering">Engineering</a></li>
                <li><a class="hover:text-energo transition-colors" href="/oplossingen/schouwen">Schouwen</a></li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4" data-i18n="footer.company"></h3>
              <ul class="space-y-3 text-light/70">
                <li><a class="hover:text-energo transition-colors" href="/over-energo" data-i18n="nav.about"></a></li>
                <li><a class="hover:text-energo transition-colors" href="/projecten" data-i18n="nav.projects"></a></li>
                <li><a class="hover:text-energo transition-colors" href="/sectoren" data-i18n="nav.sectors"></a></li>
                <li><a class="hover:text-energo transition-colors" href="/contact" data-i18n="nav.contact"></a></li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4" data-i18n="footer.contact"></h3>
              <div class="space-y-4 text-light/70">
                <div class="flex gap-3">
                  <i data-feather="map-pin" class="w-5 h-5 mt-0.5"></i>
                  <div>Energolaan 123<br>1234 AB, Nieuwegein</div>
                </div>
                <div class="flex gap-3">
                  <i data-feather="phone" class="w-5 h-5 mt-0.5"></i>
                  <div>0621382111</div>
                </div>
                <div class="flex gap-3">
                  <i data-feather="mail" class="w-5 h-5 mt-0.5"></i>
                  <div>info@energo.nl</div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-white/10 mt-12 pt-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between text-light/60 text-sm">
            <div class="flex flex-wrap gap-4">
              <a class="hover:text-energo transition-colors" href="/privacy" data-i18n="footer.privacy"></a>
              <a class="hover:text-energo transition-colors" href="/algemene-voorwaarden" data-i18n="footer.terms"></a>
              <a class="hover:text-energo transition-colors" href="/cookies" data-i18n="footer.cookies"></a>
            </div>
            <div>&copy; ${year} Energo. <span data-i18n="footer.rights"></span></div>
            <div data-i18n="footer.kvk"></div>
          </div>
        </div>
      </footer>
    `;

    window.i18n?.apply?.(this);
    feather.replace();
  }
}

customElements.define("custom-footer", CustomFooter);