document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Observer (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 2. Count-Up Animation for Stat Cards
    const counters = document.querySelectorAll('.counter');
    let counted = false;

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    let count = 0;
                    const speed = Math.max(1, Math.floor(1400 / (target > 100 ? 50 : target)));
                    const increment = target > 100 ? Math.ceil(target / 40) : 1;
                    
                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            counter.innerText = count.toLocaleString() + '+';
                            setTimeout(updateCount, speed);
                        } else {
                            counter.innerText = target.toLocaleString() + '+';
                        }
                    };
                    updateCount();
                });
            }
        });
    }, { threshold: 0.3 });

    const statsSection = document.querySelector('.hero-stats-grid');
    if (statsSection) {
        countObserver.observe(statsSection);
    }

    // 3. 3D Tilt Effect on Cards
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
        });
    });

    // 4. Project Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-company]');

    if (filterBtns.length > 0 && projectCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const company = card.getAttribute('data-company');
                    if (filter === 'all' || filter === company) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // 5. Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 6. Email Copy Button
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            if (email) {
                navigator.clipboard.writeText(email).then(() => {
                    const originalIcon = copyEmailBtn.innerHTML;
                    copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #059669;"></i>';
                    setTimeout(() => {
                        copyEmailBtn.innerHTML = originalIcon;
                    }, 2000);
                });
            }
        });
    }
});
