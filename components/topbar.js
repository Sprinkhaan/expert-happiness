class CustomTopbar extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n?.onChange?.(() => this.render());
  }

  render() {
    this.innerHTML = `
      <div class="bg-dark text-light text-sm">
        <div class="max-w-[1400px] mx-auto px-6 py-2 flex items-center justify-between gap-4">
          <div class="flex items-center gap-6">
            <a href="tel:+31621382111" class="flex items-center gap-2 hover:text-energo transition-colors">
              <i data-feather="phone" class="w-4 h-4"></i>
              <span>0621382111</span>
            </a>
            <a href="mailto:info@energo.nl" class="flex items-center gap-2 hover:text-energo transition-colors">
              <i data-feather="mail" class="w-4 h-4"></i>
              <span>info@energo.nl</span>
            </a>
          </div>

          <div class="hidden sm:flex items-center gap-2 text-light/80">
            <i data-feather="map-pin" class="w-4 h-4"></i>
            <span data-i18n="topbar.workArea"></span>
          </div>
        </div>
      </div>
    `;

    window.i18n?.apply?.(this);
    feather.replace();
  }
}

customElements.define("custom-topbar", CustomTopbar);