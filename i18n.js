// i18n.js
(function () {
  const listeners = new Set();

  const i18n = {
    lang: document.documentElement.lang || "nl",
    dict: {},
    async load(lang) {
      const res = await fetch(new URL(`./i18n/${lang}.json`, document.baseURI), { cache: "no-store" });
      if (!res.ok) throw new Error(`i18n file not found: ${lang}.json`);
      this.dict = await res.json();
      this.lang = lang;
      document.documentElement.lang = lang;
      this.apply(document);
      document.title = this.t("site.title");
      listeners.forEach((fn) => fn(lang));
    },
    onChange(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    t(key, params = {}) {
      const value = key.split(".").reduce((o, k) => (o ? o[k] : undefined), this.dict);
      if (value == null) return key; // fallback = toon key (handig bij missing keys)

      if (typeof value === "string") {
        return value.replace(/\{\{(\w+)\}\}/g, (_, k) => params[k] ?? "");
      }
      return value; // kan object/array zijn
    },
    apply(root = document) {
      // textContent
      root.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = this.t(el.getAttribute("data-i18n"));
      });

      // innerHTML (alleen gebruiken als je bewust HTML in json stopt)
      root.querySelectorAll("[data-i18n-html]").forEach((el) => {
        el.innerHTML = this.t(el.getAttribute("data-i18n-html"));
      });

      // placeholders
      root.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
        el.setAttribute("placeholder", this.t(el.getAttribute("data-i18n-placeholder")));
      });

      // aria-labels
      root.querySelectorAll("[data-i18n-aria]").forEach((el) => {
        el.setAttribute("aria-label", this.t(el.getAttribute("data-i18n-aria")));
      });
    },
  };

  window.i18n = i18n;
})();