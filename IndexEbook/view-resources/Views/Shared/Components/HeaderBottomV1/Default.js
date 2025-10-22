(function () {
    $(function () {
        // --- Hiển thị năm ---
        const yearEl = document.getElementById("year");
        if (yearEl) yearEl.textContent = new Date().getFullYear();

        // --- Mobile menu toggle ---
        const menuToggleButton = document.querySelector(".menu-toggle");
        const nav = document.getElementById("main-nav");
        if (menuToggleButton && nav) {
            menuToggleButton.addEventListener("click", () => {
                const expanded = nav.getAttribute("aria-expanded") === "true";
                nav.setAttribute("aria-expanded", String(!expanded));
                menuToggleButton.setAttribute("aria-expanded", String(!expanded));
            });
        }

        // --- Back to top ---
        const backToTop = document.querySelector(".back-to-top");
        const onScroll = () => {
            if (!backToTop) return;
            backToTop.classList.toggle("visible", window.scrollY > 400);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        if (backToTop) {
            backToTop.addEventListener("click", () => {
                window.scrollTo({ top: 0, behavior: "smooth" });
            });
        }

        
    });
})();
