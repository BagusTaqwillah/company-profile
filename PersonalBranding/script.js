/* ===== Simple & Reliable JavaScript ===== */

/* ===== Debounce Function ===== */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


/* =========================================
   MOBILE BOTTOM NAVIGATION
========================================= */

document.addEventListener('DOMContentLoaded', () => {

    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNavigation() {

        const scrollPosition = window.scrollY + 180;
        let currentSection = 'home';

        sections.forEach(section => {

            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection = section.id;
            }

        });

        navItems.forEach(item => {

            const isActive =
                item.dataset.section === currentSection;

            item.classList.toggle('active', isActive);

        });
    }

    navItems.forEach(item => {

        item.addEventListener('click', event => {

            event.preventDefault();

            const sectionId = item.dataset.section;
            const target = document.getElementById(sectionId);

            if (!target) return;

            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });

        });

    });

    let ticking = false;

    window.addEventListener('scroll', () => {

        if (!ticking) {

            window.requestAnimationFrame(() => {

                updateActiveNavigation();
                ticking = false;

            });

            ticking = true;
        }

    }, { passive: true });

    updateActiveNavigation();

});

/* ===== Scroll Indicator Handler ===== */
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.pointerEvents = 'none';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.pointerEvents = 'auto';
            }
        });

        scrollIndicator.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                window.scrollTo({
                    top: aboutSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    }
});

/* ===== Smooth Scroll for Anchor Links ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80;

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/* ===== Navbar Background Change on Scroll ===== */
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 13, 20, 0.98)';
            navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 13, 20, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
});

/* ===== Parallax Scroll Effect ===== */
document.addEventListener('DOMContentLoaded', function() {
    const layers = document.querySelectorAll('.parallax-layer');

    if (layers.length > 0) {
        window.addEventListener('scroll', debounce(() => {
            const scrollY = window.scrollY;

            layers.forEach((layer, index) => {
                const speed = [0.3, 0.5, 0.7][index] || 0.5;
                layer.style.transform = `translateY(${scrollY * speed}px)`;
            });
        }, 10));
    }
});

/* ===== Hero Background Parallax ===== */
document.addEventListener('DOMContentLoaded', function() {
    const bgContainer = document.querySelector('.hero-bg-container');

    if (bgContainer) {
        window.addEventListener('scroll', debounce(() => {
            const scrollY = window.scrollY;
            const hero = document.querySelector('.hero');

            if (hero) {
                const heroBottom = hero.offsetHeight + hero.offsetTop;
                if (scrollY < heroBottom) {
                    bgContainer.style.transform = `translateY(${scrollY * 0.5}px)`;
                }
            }
        }, 10));
    }
});

/* ===== Form Submission ===== */
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.textContent = 'Pesan Terkirim! ✓';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

                this.reset();

                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});

/* ===== Mobile Menu Toggle ===== */
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            if (navLinks) {
                navLinks.classList.toggle('active');
                this.classList.toggle('active');
            }
        });

        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks) navLinks.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            });
        });
    }
});

/* ===== Floating Cards Mouse Parallax ===== */
document.addEventListener('DOMContentLoaded', function() {
    const floatingCards = document.querySelectorAll('.floating-card');

    if (floatingCards.length > 0) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;

            floatingCards.forEach(card => {
                const parallaxValue = parseFloat(card.getAttribute('data-parallax')) || 0.5;
                const offsetX = (mouseX - 0.5) * parallaxValue * 20;
                const offsetY = (mouseY - 0.5) * parallaxValue * 20;

                card.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
            });
        });
    }
});

/* ===== Profile Image 3D Tilt ===== */
document.addEventListener('DOMContentLoaded', function() {
    const profileImage = document.querySelector('.profile-image');

    if (profileImage) {
        document.addEventListener('mousemove', (e) => {
            const rect = profileImage.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const angleX = (e.clientY - centerY) / 15;
            const angleY = (e.clientX - centerX) / 15;

            profileImage.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
        });

        document.addEventListener('mouseleave', () => {
            profileImage.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
});

/* ===== Particle Canvas Animation (Simplified) ===== */
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('particleCanvas');

    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.size = Math.random() * 1.5;
            this.opacity = Math.random() * 0.4 + 0.2;
            this.color = Math.random() > 0.5 ? '#c9a961' : '#6366f1';
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.opacity -= 0.003;

            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.opacity;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function animate() {
        ctx.fillStyle = 'rgba(15, 20, 25, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (Math.random() > 0.96 && particles.length < 80) {
            particles.push(new Particle());
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();

            if (particles[i].opacity <= 0) {
                particles.splice(i, 1);
            }
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(animate);
    }

    animate();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});

/* ===== Console Welcome Message ===== */
console.log('%c✨ Moh Bagus Taqwillah - Portfolio', 'color: #c9a961; font-size: 16px; font-weight: bold;');
console.log('%c🚀 Premium Elegant Design with Advanced Animations', 'color: #6366f1; font-size: 13px;');
console.log('%c📱 Mobile Responsive | ✨ Smooth Animations | 💎 Professional Design', 'color: #14b8a6; font-size: 11px;');

AOS.init({
    duration: 900,
    easing: 'ease-in-out',
    once: false,
    mirror: true,
    offset: 80,
    delay: 50,
    anchorPlacement: 'top-bottom'
});

window.addEventListener('load', () => {
    AOS.refreshHard();
});


document.addEventListener("DOMContentLoaded", () => {

    const playlist = [
        {
            title: "Background Music 1",
            src: "song.mp3"
        }
    ];

    const audio = document.getElementById("backgroundMusic");
    const toggle = document.getElementById("musicToggle");
    const next = document.getElementById("musicNext");
    const title = document.getElementById("musicTitle");
    const status = document.getElementById("musicStatus");

    let currentTrack = 0;

    function loadTrack(index) {
        currentTrack = index;
        audio.src = playlist[index].src;
        title.textContent = playlist[index].title;
    }

    async function playMusic() {
        try {
            await audio.play();

            toggle.innerHTML = '<i class="fas fa-pause"></i>';
            status.textContent = "Now Playing";
        } catch (error) {
            toggle.innerHTML = '<i class="fas fa-play"></i>';
            status.textContent = "Klik untuk mengaktifkan musik";
        }
    }

    function pauseMusic() {
        audio.pause();
        toggle.innerHTML = '<i class="fas fa-play"></i>';
        status.textContent = "Music Paused";
    }

    function nextTrack() {
        currentTrack = (currentTrack + 1) % playlist.length;
        loadTrack(currentTrack);
        playMusic();
    }

    toggle.addEventListener("click", () => {
        if (audio.paused) {
            playMusic();
        } else {
            pauseMusic();
        }
    });

    next.addEventListener("click", nextTrack);

    audio.addEventListener("ended", nextTrack);

    audio.addEventListener("error", () => {
        status.textContent = "Musik gagal dimuat";
    });

    // Coba autoplay saat website dibuka
    loadTrack(0);
    playMusic();

});

