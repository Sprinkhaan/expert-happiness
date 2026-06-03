// script.js

// Scroll Reveal (optioneel)
function scrollReveal() {
  document.querySelectorAll(".reveal").forEach((el) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) el.classList.add("active");
    else el.classList.remove("active");
  });
}

window.addEventListener("load", scrollReveal);
window.addEventListener("scroll", scrollReveal);

// Contact form submit (tekst via i18n)
document.addEventListener("submit", (e) => {
  const form = e.target;
  if (!form || form.id !== "contactForm") return;

  e.preventDefault();

  const name = document.getElementById("name")?.value?.trim();
  const email = document.getElementById("email")?.value?.trim();
  const message = document.getElementById("message")?.value?.trim();
  const phone = document.getElementById("phone")?.value?.trim() || "";

  if (!name || !email || !message) {
    alert(window.i18n.t("home.contact.validation"));
    return;
  }

  console.log("Form submitted:", { name, email, phone, message });
  alert(window.i18n.t("home.contact.success"));
  form.reset();
});

// Gallery close on outside click + escape
document.addEventListener("click", (e) => {
  const gallery = document.querySelector("project-gallery");
  if (!gallery || gallery.style.display !== "flex") return;

  const path = e.composedPath ? e.composedPath() : [];
  const clickedInsideGallery = path.includes(gallery);

  if (!clickedInsideGallery) return;

  if (path[0] === gallery) {
    gallery.hide();
  }
});

document.addEventListener("keydown", (e) => {
  const gallery = document.querySelector("project-gallery");
  if (gallery && gallery.style.display === "flex" && e.key === "Escape") gallery.hide();
});