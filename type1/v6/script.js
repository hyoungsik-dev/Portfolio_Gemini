document.addEventListener('DOMContentLoaded', () => {
    // 1. Editorial Project Filtering
    const edFilters = document.querySelectorAll('.ed-filter');
    const edCards = document.querySelectorAll('.ed-proj-card[data-company]');

    if (edFilters.length > 0 && edCards.length > 0) {
        edFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                edFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                edCards.forEach(card => {
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

    // 2. Email Copy
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            if (email) {
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = copyEmailBtn.innerHTML;
                    copyEmailBtn.innerHTML = '이메일 주소 복사 완료! <i class="fa-solid fa-check"></i>';
                    setTimeout(() => {
                        copyEmailBtn.innerHTML = originalText;
                    }, 2000);
                });
            }
        });
    }
});
