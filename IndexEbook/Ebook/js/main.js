	// ========== Accordion Sidebar ========== //
document.addEventListener("DOMContentLoaded", function() {
  const accordions = document.querySelectorAll(".accordion-header");

  accordions.forEach(header => {
    header.addEventListener("click", function() {
      const item = this.parentElement;
      item.classList.toggle("active");

      accordions.forEach(other => {
        if (other !== header) other.parentElement.classList.remove("active");
      });
    });
  });
});

