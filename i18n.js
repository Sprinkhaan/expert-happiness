// i18n.js
(function () {
  const listeners = new Set();

  const BASE =
    window.location.hostname.includes("github.io")
      ? "/expert-happiness"
      : "";

  const i18n = {
    lang: document.documentElement.lang || "nl",
    dict: {},

    async load(lang) {
      const res = await fetch(
        `${BASE}/i18n/${lang}.json`,
        {
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          `i18n file not found: ${BASE}/i18n/${lang}.json`
        );
      }

      this.dict = await res.json();
      this.lang = lang;

      document.documentElement.lang = lang;

      this.apply(document);

      const title = this.t("site.title");

      if (title !== "site.title") {
        document.title = title;
      }

      listeners.forEach((fn) => fn(lang));
    },

    onChange(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },

    t(key, params = {}) {
      const value = key
        .split(".")
        .reduce(
          (obj, part) => (obj ? obj[part] : undefined),
          this.dict
        );

      if (value == null) {
        return key;
      }

      if (typeof value === "string") {
        return value.replace(
          /\{\{(\w+)\}\}/g,
          (_, k) => params[k] ?? ""
        );
      }

      return value;
    },

    apply(root = document) {
      root.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = this.t(
          el.getAttribute("data-i18n")
        );
      });

      root.querySelectorAll("[data-i18n-html]").forEach((el) => {
        el.innerHTML = this.t(
          el.getAttribute("data-i18n-html")
        );
      });

      root
        .querySelectorAll("[data-i18n-placeholder]")
        .forEach((el) => {
          el.setAttribute(
            "placeholder",
            this.t(
              el.getAttribute(
                "data-i18n-placeholder"
              )
            )
          );
        });

      root
        .querySelectorAll("[data-i18n-aria]")
        .forEach((el) => {
          el.setAttribute(
            "aria-label",
            this.t(
              el.getAttribute("data-i18n-aria")
            )
          );
        });
    },
  };

  window.i18n = i18n;
})();