AOS.init({
  duration: 1000,
  once: true
});

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById('nav-toggle') || document.querySelector('.hamburger');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');

    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            this.classList.toggle('open');
   
            if (sidebar) sidebar.classList.toggle('active');
       
            if (overlay) overlay.classList.toggle('active');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', function() {
            if (toggleBtn) toggleBtn.classList.remove('open');
            if (sidebar) sidebar.classList.remove('active');
            this.classList.remove('active');
        });
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
    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        const question = item.querySelector(".faq-question");
        const icon = item.querySelector(".faq-question i");

        question.addEventListener("click", () => {

            faqItems.forEach(i => {
                if (i !== item) {
                    i.classList.remove("active");
                    const otherIcon = i.querySelector(".faq-question i");
                    otherIcon.classList.remove("fa-minus");
                    otherIcon.classList.add("fa-plus");
                }
            });

            item.classList.toggle("active");

            if (item.classList.contains("active")) {
                icon.classList.remove("fa-plus");
                icon.classList.add("fa-minus");
            } else {
                icon.classList.remove("fa-minus");
                icon.classList.add("fa-plus");
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
                card.classList.remove('is-active', 'active'); 
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
                clearInterval(slideInterval); 
                updateSlider(index);
                slideInterval = setInterval(autoPlay, 2000); 
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
        track.addEventListener('mouseleave', () => slideInterval = setInterval(autoPlay, 2000));
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

/*contact us*/
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); 

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();

    // Name validation
    if (name === "") {
        alert("Please enter your name");
        return;
    }

    let emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address");
        return;
    }

    if (phone !== "" && phone.length !== 10) {
        alert("Phone number must be 10 digits");
        return;
    }

    if (message.length < 10) {
        alert("Message must be at least 10 characters");
        return;
    }

    alert("Form is valid, Submitting data to the backend.");

});


/*gallery*/
// Initialize Animations
AOS.init({ duration: 1000, once: true });

// Filter Logic
const filterButtons = document.querySelectorAll('.filter-btn');
document.querySelectorAll('.control').forEach(button => {
    button.addEventListener('click', function() {
        // Active class change karna
        document.querySelectorAll('.control').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');

        const filterValue = this.getAttribute('data-filter');
        const items = document.querySelectorAll('.gallery-item');

        items.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
                setTimeout(() => { item.style.opacity = '1'; }, 10);
            } else {
                item.style.opacity = '0';
                setTimeout(() => { item.style.display = 'none'; }, 300);
            }
        });
    });
});

// Lightbox (Zoom in logic)
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        lightboxImg.src = imgSrc;
        lightbox.style.display = 'flex';
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target !== lightboxImg) lightbox.style.display = 'none';
});

const scrollBtn = document.getElementById("scrollUp");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add("show");
    } else {
        scrollBtn.classList.remove("show");
    }
});

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});