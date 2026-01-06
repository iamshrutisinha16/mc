document.addEventListener("DOMContentLoaded", function () {
    
    // --- 1. Sidebar/Navigation Logic ---
    const toggleBtn = document.getElementById('nav-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (toggleBtn && sidebar && overlay) {
        const toggleSidebar = () => {
            toggleBtn.classList.toggle('open');
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        };
        toggleBtn.addEventListener('click', toggleSidebar);
        overlay.addEventListener('click', toggleSidebar);
    }


    // --- 2. Main Banner Scroll Reveal Logic ---
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, { threshold: 0.5 });

        slides.forEach(slide => slideObserver.observe(slide));
    }


    // --- 3. FAQ Accordion Logic ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            faqItems.forEach(inner => {
                if (inner !== item) {
                    inner.classList.remove('active');
                    const innerIcon = inner.querySelector('i');
                    if(innerIcon) {
                        innerIcon.classList.add('fa-plus');
                        innerIcon.classList.remove('fa-minus');
                    }
                }
            });
            
            item.classList.toggle('active');
            const icon = item.querySelector('i');
            if(icon) {
                icon.classList.toggle('fa-plus');
                icon.classList.toggle('fa-minus');
            }
        });
    });


    // --- 4. Why Choose Us Animation (Fixed naming conflict) ---
    const whySection = document.querySelector('.mc-why-us-section');
    if (whySection) {
        const whyObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                whySection.classList.add('active');
            }
        }, { threshold: 0.3 });
        whyObserver.observe(whySection);
    }


    // --- 5. Products Slider Logic ---
    const track = document.getElementById('productTrack');
    const productCards = document.querySelectorAll('.product-card');
    const productDots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    if (track && productCards.length > 0) {
        function updateSlider(index) {
            currentIndex = index;
            const gap = 40;
            const cardWidth = productCards[0].offsetWidth + gap;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

            productCards.forEach((card, i) => {
                card.classList.remove('is-active', 'active'); // Dono classes handle kar raha hoon
                if (productDots[i]) productDots[i].classList.remove('active');
                
                if (i === currentIndex) {
                    card.classList.add('is-active', 'active');
                    if (productDots[i]) productDots[i].classList.add('active');
                }
            });
        }

        // Click on Dots
        productDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                clearInterval(slideInterval); // Click karne par auto-play rokein
                updateSlider(index);
                slideInterval = setInterval(autoPlay, 3500); // Phir se shuru karein
            });
        });

        function autoPlay() {
            currentIndex++;
            if (currentIndex >= productCards.length) currentIndex = 0;
            updateSlider(currentIndex);
        }

        updateSlider(0);
        let slideInterval = setInterval(autoPlay, 3500);

        track.addEventListener('mouseenter', () => clearInterval(slideInterval));
        track.addEventListener('mouseleave', () => slideInterval = setInterval(autoPlay, 3500));
    }


    // --- 6. Next Premium Spaces (Round to Full Banner) ---
    const spaceSections = document.querySelectorAll('.space-item');
    if (spaceSections.length > 0) {
        const spaceObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-active');
                } else {
                    entry.target.classList.remove('is-active');
                }
            });
        }, { threshold: 0.4 });

        spaceSections.forEach(section => spaceObserver.observe(section));
    }
});