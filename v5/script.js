document.addEventListener('DOMContentLoaded', () => {
    // 1. Mouse Spotlight Effect for Bento Cards
    const spotlights = document.querySelectorAll('.spotlight');

    spotlights.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 2. Bento Project Filtering
    const bFilters = document.querySelectorAll('.b-filter');
    const pCards = document.querySelectorAll('.p-card[data-company]');

    if (bFilters.length > 0 && pCards.length > 0) {
        bFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                bFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                pCards.forEach(card => {
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

    // 3. Email Copy
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            if (email) {
                navigator.clipboard.writeText(email).then(() => {
                    const originalIcon = copyEmailBtn.innerHTML;
                    copyEmailBtn.innerHTML = '<i class="fa-solid fa-check" style="color: #34d399;"></i>';
                    setTimeout(() => {
                        copyEmailBtn.innerHTML = originalIcon;
                    }, 2000);
                });
            }
        });
    }
});
