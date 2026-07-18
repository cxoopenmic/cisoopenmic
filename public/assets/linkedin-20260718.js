(() => {
  const linkedInUrl = "https://www.linkedin.com/showcase/cisoopenmic";
  document.querySelectorAll(".legal-links").forEach((links) => {
    if (links.querySelector(".linkedin-footer-link")) return;
    const separator = document.createElement("span");
    separator.textContent = "·";
    separator.setAttribute("aria-hidden", "true");
    const link = document.createElement("a");
    link.className = "linkedin-footer-link";
    link.href = linkedInUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "LinkedIn";
    link.setAttribute("aria-label", "Follow CISO Open Mic on LinkedIn");
    links.append(separator, link);
  });
})();
