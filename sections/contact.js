class ContactSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  render() {
    this.innerHTML = `
      <section class="py-16 bg-energo text-white">
        <div class="container mx-auto px-6">
          <div class="max-w-4xl mx-auto">
            <h2 class="text-3xl font-bold mb-4 text-center" data-i18n="home.contact.title"></h2>
            <p class="text-lg mb-8 text-center max-w-2xl mx-auto" data-i18n="home.contact.subtitle"></p>

            <form id="contactForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <input type="text" id="name" required
                  class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none placeholder-white/70"
                  data-i18n-placeholder="home.contact.name">
              </div>

              <div>
                <input type="email" id="email" required
                  class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none placeholder-white/70"
                  data-i18n-placeholder="home.contact.email">
              </div>

              <div>
                <input type="tel" id="phone"
                  class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none placeholder-white/70"
                  data-i18n-placeholder="home.contact.phone">
              </div>

              <div class="md:col-span-2">
                <textarea id="message" rows="4" required
                  class="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 focus:outline-none placeholder-white/70"
                  data-i18n-placeholder="home.contact.message"></textarea>
              </div>

              <div class="md:col-span-2 flex flex-col sm:flex-row gap-4 justify-center">
                <button type="submit"
                  class="px-8 py-3 bg-white hover:bg-white/90 text-energo font-semibold rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg"
                  data-i18n="home.contact.submit">
                </button>

                <a href="tel:+31621382111"
                  class="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-energo font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <i data-feather="phone" class="w-5 h-5"></i>
                  <span>+31 6 21382111</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;

    window.i18n.apply(this);
  }
}
customElements.define("contact-section", ContactSection);