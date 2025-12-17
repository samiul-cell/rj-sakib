// ==========================================
// ✅ FINAL CLEANED & CONSOLIDATED JAVASCRIPT LOGIC
// ==========================================

// 1. Skill Bar Animation Logic (Intersection Observer)
const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress-bar');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.getAttribute('data-width');
        progressBar.style.width = value;
        progressBar.style.opacity = 1;
    });
}

function hideProgress() {
    progressBars.forEach(p => {
        p.style.width = 0;
        p.style.opacity = 0;
    });
}

const sectionObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        showProgress();
    } else {
        hideProgress(); 
    }
}, { 
    threshold: 0.3 
});

if (skillSection) {
    sectionObserver.observe(skillSection);
}

// ------------------------------------------

// 2. Hamburger Menu & Navbar Scroll Effect
const hamburger = document.querySelector('.hamburger');
const menu = document.querySelector('.menu');
const navbar = document.querySelector('.navbar');

if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    document.querySelectorAll('.menu li a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });

    document.addEventListener('click', (e) => {
        if (!menu.contains(e.target) && !hamburger.contains(e.target)) {
            menu.classList.remove('active');
        }
    });
}

// Navbar Scroll Effect
if (navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled'); 
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ------------------------------------------

// 3. Lenis Initialization (Only for Desktop/Large Screens)
let lenis; 

if (typeof Lenis !== 'undefined' && window.innerWidth > 768) { // এই শর্তটি মোবাইলে স্ক্রিপ্ট বন্ধ রাখবে
    lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        smooth: true,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}
// ------------------------------------------

// 4. Custom Mouse Cursor Movement
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursorPosition() {
    if (cursorDot && cursorRing) {
        cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        cursorRing.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(updateCursorPosition);
}
requestAnimationFrame(updateCursorPosition);

// Hover State
const links = document.querySelectorAll('a, .btn, button, .menu li, .cv-btn, .social-icons a'); 
if (cursorDot) {
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (cursorRing) cursorRing.classList.add('active');
        });
        link.addEventListener('mouseleave', () => {
            if (cursorRing) cursorRing.classList.remove('active');
        });
    });
}

// ------------------------------------------

// 5. Number Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 400; 

const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target');
            
            const updateCount = () => {
                const current = +counter.innerText;
                const increment = target / speed; 

                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
            observer.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => {
    counterObserver.observe(counter);
});

// ------------------------------------------

// 6. Dark Mode Toggle Logic
const icon = document.getElementById("icon");

const currentTheme = localStorage.getItem("theme");
if (currentTheme === "dark") {
    document.body.classList.add("dark-mode");
    if(icon) { icon.classList.remove("fa-moon"); icon.classList.add("fa-sun"); }
}

function myFunction() {
   document.body.classList.toggle("dark-mode");
   
   let theme = "light";
   if (document.body.classList.contains("dark-mode")) {
       theme = "dark";
       if(icon) { icon.classList.remove("fa-moon"); icon.classList.add("fa-sun"); }
   } else {
       if(icon) { icon.classList.remove("fa-sun"); icon.classList.add("fa-moon"); }
   }
   localStorage.setItem("theme", theme);
}

// Auto Check on Load
if (!currentTheme && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
   document.body.classList.add("dark-mode");
   if(icon) { icon.classList.remove("fa-moon"); icon.classList.add("fa-sun"); }
}

// Listen for System Change
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    if (event.matches) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        if(icon) { icon.classList.remove("fa-moon"); icon.classList.add("fa-sun"); }
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        if(icon) { icon.classList.remove("fa-sun"); icon.classList.add("fa-moon"); }
    }
});

// ==========================================
// 7. Testimonial Slider Logic
// ==========================================
let slideIndex = 1;
showSlides(slideIndex);

window.currentSlide = function(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("testimonial-item");
    let dots = document.getElementsByClassName("dot");

    if (slides.length === 0) return; 

    if (n > slides.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = slides.length}

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
        slides[i].classList.remove("active");
    }

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex-1].style.display = "flex";  
    slides[slideIndex-1].classList.add("active");
    dots[slideIndex-1].className += " active";
}

setInterval(() => {
    slideIndex++;
    showSlides(slideIndex);
}, 5000);

// ==========================================
// 8. Portfolio Filtering Logic
// ==========================================
const filterButtons = document.querySelectorAll('.portfolio-filter li');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');

            if (filterValue === 'all' || filterValue === itemCategory) {
                item.classList.remove('hide');
                item.classList.add('show');
            } else {
                item.classList.remove('show');
                item.classList.add('hide');
            }
        });
    });
});

// ==========================================
// 9. 3D Tilt Effect
// ==========================================
const cards = document.querySelectorAll('.service-box');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; 
        const y = e.clientY - rect.top;  

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; 
        const rotateY = ((x - centerX) / centerX) * 10; 

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});
// ================= BACKGROUND SHAPE SCROLL ANIMATION =================

const shapes = document.querySelectorAll('.back-shape');

const shapeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // যখনই ইউজার সেকশনটি দেখবে
        if (entry.isIntersecting) {
            entry.target.classList.add('active-anim'); // ক্লাস যোগ হবে (ভেসে উঠবে)
        } else {
            // অপশনাল: যদি চান প্রতিবার স্ক্রল করে ফিরে গেলে আবার এনিমেশন হোক, 
            // তবে নিচের লাইনটি রাখুন। আর যদি একবারই চান, তবে নিচের লাইনটি কেটে দিন।
            entry.target.classList.remove('active-anim'); 
        }
    });
}, {
    threshold: 0.5 // ছবির ৫০% দেখা গেলেই এনিমেশন শুরু হবে
});

shapes.forEach(shape => {
    shapeObserver.observe(shape);
});
// ================= GLOBAL WEBSITE SCROLL ANIMATION =================

document.addEventListener("DOMContentLoaded", function () {
    
    // ১. কোন কোন জিনিস এনিমেট হবে তার তালিকা
    const elementsToAnimate = document.querySelectorAll(
        'section h2, section p, .hero-content, .hero-img, .about-img, .about-text, .service-box, .portfolio-item, .skill-item, .blog-item, .newsletter-wrapper, .contact-info, .contact-form'
    );

    // ২. সবগুলোর মধ্যে 'reveal-item' ক্লাস যোগ করা হলো (CSS এর জন্য)
    elementsToAnimate.forEach(el => {
        el.classList.add('reveal-item');
    });

    // ৩. অবজার্ভার সেটআপ (যাতে স্ক্রল করলে ডিটেক্ট করতে পারে)
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // দৃশ্যমান হলে ক্লাস যোগ হবে
                entry.target.classList.add('reveal-active');
                
                // একবার এনিমেশন হয়ে গেলে আর নড়বে না (ভাল UX এর জন্য)
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.15 // এলিমেন্টের ১৫% দেখা গেলেই এনিমেশন শুরু হবে
    });

    // ৪. অবজার্ভার চালু করা
    elementsToAnimate.forEach(el => {
        revealObserver.observe(el);
    });
});