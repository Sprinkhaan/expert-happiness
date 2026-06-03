class FaqSection extends HTMLElement {
  connectedCallback() {
    this.render();
    window.i18n.onChange(() => this.render());
  }

  render() {
    const data = window.i18n.t("home.faq");
    const items = Array.isArray(data?.items) ? data.items : [];

    this.innerHTML = `
      <section class="py-20 bg-light">
        <div class="container mx-auto px-6">
          <h2 class="text-3xl font-bold mb-12 text-center" data-i18n-html="home.faq.title"></h2>
          <div class="max-w-3xl mx-auto">
            ${items.map((it) => `
              <div class="mb-4 border-b border-light/20 pb-4">
                <button class="faq-question flex justify-between items-center w-full text-left font-semibold text-lg">
                  <span>${it.q || ""}</span>
                  <i data-feather="chevron-down" class="w-5 h-5 transform transition-transform duration-300"></i>
                </button>
                <div class="faq-answer mt-2 text-dark/70 hidden">
                  <p>${it.a || ""}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </section>
    `;

    window.i18n.apply(this);
    feather.replace();

    this.querySelectorAll(".faq-question").forEach((question) => {
      question.addEventListener("click", () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector("i");
        answer.classList.toggle("hidden");
        icon.style.transform = answer.classList.contains("hidden") ? "rotate(0deg)" : "rotate(180deg)";
      });
    });
  }
}

customElements.define("faq-section", FaqSection);