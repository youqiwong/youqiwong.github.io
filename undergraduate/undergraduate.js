const awardDialog = document.querySelector("#award-dialog");
const awardDialogImage = document.querySelector("#award-dialog-image");
const awardDialogTitle = document.querySelector("#award-dialog-title");
const awardDialogClose = document.querySelector(".award-dialog-close");
const awardCards = document.querySelectorAll(".award-card");

awardCards.forEach((card) => {
  card.addEventListener("click", () => {
    awardDialogImage.src = card.dataset.awardSrc;
    awardDialogImage.alt = card.querySelector("img").alt;
    awardDialogTitle.textContent = card.dataset.awardTitle;
    awardDialog.showModal();
  });
});

awardDialogClose.addEventListener("click", () => awardDialog.close());
awardDialog.addEventListener("click", (event) => {
  if (event.target === awardDialog) awardDialog.close();
});

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (reducedMotion || !("IntersectionObserver" in window)) {
  awardCards.forEach((card) => card.classList.add("award-visible"));
} else {
  const awardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("award-visible");
        awardObserver.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -7%", threshold: 0.08 }
  );

  awardCards.forEach((card) => awardObserver.observe(card));
}

if (!reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
  awardCards.forEach((card) => {
    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 7).toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.removeProperty("--tilt-x");
      card.style.removeProperty("--tilt-y");
    });
  });
}
