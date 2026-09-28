document.addEventListener("DOMContentLoaded", () => {
    
    // --- CONTROL PANTALLA DE CARGA (SPLASH SCREEN) ---
    const splash = document.getElementById("splash-screen");
    const mainContent = document.getElementById("main-content");
    const splashTime = 3500; 

    if (sessionStorage.getItem("kaaxSplashVisto") === "true") {
        if (splash) splash.remove(); 
        if (mainContent) {
            mainContent.classList.remove("hidden");
            mainContent.classList.add("visible-active");
        }
    } else {
        setTimeout(() => {
            if (splash) splash.classList.add("fade-out");
            if (mainContent) {
                mainContent.classList.remove("hidden");
                setTimeout(() => { mainContent.classList.add("visible-active"); }, 50);
            }
            sessionStorage.setItem("kaaxSplashVisto", "true");
            setTimeout(() => { if (splash) splash.remove(); }, 800); 
        }, splashTime);
    }

    // --- CARRUSEL INTERACTIVO ---
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("carouselDots");
    let currentSlide = 0;
    let carouselInterval;

    if (dotsContainer && slides.length > 0) {
        slides.forEach((_, index) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (index === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll(".dot");

        function updateCarousel() {
            slides.forEach((slide, index) => {
                slide.classList.toggle("active", index === currentSlide);
                if (dots[index]) dots[index].classList.toggle("active", index === currentSlide);
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
        }

        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel();
        }

        function goToSlide(index) {
            currentSlide = index;
            updateCarousel();
            resetTimer();
        }

        if (nextBtn) nextBtn.addEventListener("click", () => { nextSlide(); resetTimer(); });
        if (prevBtn) prevBtn.addEventListener("click", () => { prevSlide(); resetTimer(); });

        function startTimer() {
            carouselInterval = setInterval(nextSlide, 5000);
        }

        function resetTimer() {
            clearInterval(carouselInterval);
            startTimer();
        }

        startTimer();
    }

    // --- ACORDEÓN EXPANDIBLE (FAQ) ---
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", function() {
            const content = this.nextElementSibling;
            const span = this.querySelector("span");
            
            document.querySelectorAll(".accordion-content").forEach(item => {
                if (item !== content) {
                    item.style.maxHeight = null;
                    const itemSpan = item.previousElementSibling.querySelector("span");
                    if (itemSpan) itemSpan.textContent = "+";
                }
            });

            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                if (span) span.textContent = "+";
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                if (span) span.textContent = "-";
            }
        });
    });

    // --- REVELADO CON SCROLL ---
    const animatedElements = document.querySelectorAll('.scroll-animate');

    if (animatedElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});


// --- CONTROL DE VENTANA MODAL (CONTACTO) ---
const openContactBtn = document.getElementById("openContactBtn");
const closeContactBtn = document.getElementById("closeContactBtn");
const contactModal = document.getElementById("contactModal");

if (openContactBtn && contactModal) {
    // Abrir modal al dar clic en Contacto
    openContactBtn.addEventListener("click", () => {
        contactModal.classList.add("active");
    });

    // Cerrar modal al dar clic en la 'X'
    if (closeContactBtn) {
        closeContactBtn.addEventListener("click", () => {
            contactModal.classList.remove("active");
        });
    }

    // Cerrar modal al dar clic fuera de la caja
    contactModal.addEventListener("click", (e) => {
        if (e.target === contactModal) {
            contactModal.classList.remove("active");
        }
    });
}