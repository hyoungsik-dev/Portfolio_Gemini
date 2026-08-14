document.addEventListener('DOMContentLoaded', () => {
    // 1. Tab Switching (IDE Files & Tabs)
    const treeFiles = document.querySelectorAll('.tree-file');
    const editorTabs = document.querySelectorAll('.editor-tabs .tab');
    const tabContents = document.querySelectorAll('.tab-content');

    function switchTab(tabId) {
        // Update tree active
        treeFiles.forEach(f => {
            if (f.getAttribute('data-tab') === tabId) {
                f.classList.add('active');
            } else {
                f.classList.remove('active');
            }
        });

        // Update tab header active
        editorTabs.forEach(t => {
            if (t.getAttribute('data-tab') === tabId) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        // Update content view active
        tabContents.forEach(c => {
            if (c.id === `tab-${tabId}`) {
                c.classList.add('active');
            } else {
                c.classList.remove('active');
            }
        });
    }

    treeFiles.forEach(file => {
        file.addEventListener('click', () => {
            const tabId = file.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    editorTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // 2. SQL Project Filters
    const sqlFilters = document.querySelectorAll('.sql-filter');
    const sqlCards = document.querySelectorAll('.sql-card[data-company]');

    if (sqlFilters.length > 0 && sqlCards.length > 0) {
        sqlFilters.forEach(btn => {
            btn.addEventListener('click', () => {
                sqlFilters.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                sqlCards.forEach(card => {
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

    // 3. Terminal Email Copy
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', () => {
            const email = copyEmailBtn.getAttribute('data-email');
            if (email) {
                navigator.clipboard.writeText(email).then(() => {
                    const originalText = copyEmailBtn.innerText;
                    copyEmailBtn.innerText = '[Copied!]';
                    copyEmailBtn.style.background = '#2ecc71';
                    setTimeout(() => {
                        copyEmailBtn.innerText = originalText;
                        copyEmailBtn.style.background = '#007acc';
                    }, 2000);
                });
            }
        });
    }
});
