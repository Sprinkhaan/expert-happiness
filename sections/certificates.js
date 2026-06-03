class CertificatesSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  render() {
    const certs = [
      "/assets/certificates/cert1.svg",
      "/assets/certificates/cert2.svg",
      "/assets/certificates/cert3.svg",
      "/assets/certificates/cert4.svg"
    ];

    this.innerHTML = `
      <section class="py-16 bg-light">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold mb-12 text-center" data-i18n-html="home.certificates.title"></h2>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-center">
            ${certs.map((src, idx) => `
              <div class="flex justify-center">
                <img src="${src}" alt="Certificaat ${idx + 1}" class="h-20 md:h-24 object-contain grayscale hover:grayscale-0 transition-all duration-300">
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;

    window.i18n.apply(this);
  }
}
customElements.define("certificates-section", CertificatesSection);