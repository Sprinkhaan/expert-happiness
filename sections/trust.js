class TrustSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = "";
  }
}

customElements.define("trust-section", TrustSection);