(() => {
  const linkedInUrl = "https://www.linkedin.com/showcase/cisoopenmic";
  document.querySelectorAll("footer").forEach((footer) => {
    const copyright = footer.firstElementChild;
    if (!copyright || copyright.querySelector(".linkedin-footer-link")) return;
    const link = document.createElement("a");
    link.className = "linkedin-footer-link";
    link.href = linkedInUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "in";
    link.title = "Follow CISO Open Mic on LinkedIn";
    link.setAttribute("aria-label", "Follow CISO Open Mic on LinkedIn");
    link.style.cssText = "display:inline-grid;place-items:center;width:23px;height:23px;margin-left:9px;border-radius:5px;background:#0a66c2;color:#fff;font-size:12px;font-weight:800;line-height:1;text-decoration:none;vertical-align:middle";
    copyright.append(link);
  });
})();
