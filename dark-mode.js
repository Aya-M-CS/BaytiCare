(function () {
    const savedMode = localStorage.getItem('fakhama_darkmode');

    if (savedMode === 'enabled') {
        document.documentElement.classList.add('dark-mode');
    }

    const style = document.createElement('style');
    style.textContent = `
        html.dark-mode,
        html.dark-mode body,
        body.dark-mode {
            background-color: #18191a !important; /* Facebook page bg */
            color: #e4e6eb !important;
        }

        html.dark-mode .navbar,
        html.dark-mode .footer {
            background-color: #242526 !important; /* Facebook top bar */
            border-bottom: 1px solid #3a3b3c !important;
        }

        html.dark-mode .box,
        html.dark-mode .card,
        html.dark-mode .cont1,
        html.dark-mode .container1,
        html.dark-mode .new,
        html.dark-mode .section,
        html.dark-mode .footer-container,
        html.dark-mode .contant .cont-button a {
            background-color: #242526 !important; /* Facebook card bg */
            color: #e4e6eb !important;
            border-color: #3a3b3c !important;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4) !important;
        }

        html.dark-mode .cont1 .text,
        html.dark-mode .cont1 .span .text {
            background-color: #3a3b3c !important;
            border-color: #4e9fa3 !important;
            color: #e4e6eb !important;
        }

        html.dark-mode input,
        html.dark-mode select,
        html.dark-mode textarea {
            background-color: #3a3b3c !important;
            color: #e4e6eb !important;
            border-color: #4a4b4c !important;
        }

        html.dark-mode input::placeholder,
        html.dark-mode textarea::placeholder {
            color: #b0b3b8 !important;
        }

        html.dark-mode .form-search .input-container,
        html.dark-mode .form-search div {
            background-color: #3a3b3c !important;
            border-color: #4a4b4c !important;
            box-shadow: 0 0 15px rgba(0,0,0,0.3) !important;
        }

        html.dark-mode .search {
            background-color: #3a3b3c !important;
            color: #e4e6eb !important;
        }

        html.dark-mode .search::placeholder {
            color: #b0b3b8 !important;
        }

        html.dark-mode .search-results-dropdown {
            background-color: #242526 !important;
            border-color: #3a3b3c !important;
            box-shadow: 0 5px 20px rgba(0,0,0,0.5) !important;
        }

        html.dark-mode .search-result-item {
            border-bottom-color: #3a3b3c !important;
        }

        html.dark-mode .search-result-item:hover {
            background-color: #3a3b3c !important;
        }

        html.dark-mode .search-result-title {
            color: #e4e6eb !important;
        }

        html.dark-mode .search-result-category {
            color: #b0b3b8 !important;
        }

        html.dark-mode p,
        html.dark-mode h1,
        html.dark-mode h2,
        html.dark-mode h3,
        html.dark-mode h4,
        html.dark-mode h5,
        html.dark-mode h6,
        html.dark-mode span,
        html.dark-mode label {
            color: #e4e6eb !important;
        }

        html.dark-mode a {
            color: #e4e6eb !important;
        }

        html.dark-mode .cont1 hr {
            border-color: #3a3b3c !important;
        }

        html.dark-mode .btn,
        html.dark-mode button {
            border-color: #4a4b4c !important;
        }

        html.dark-mode .back-home,
        html.dark-mode .forgot,
        html.dark-mode .forgot a {
            color: #e4e6eb !important;
        }

        html.dark-mode .overlay {
            background-color: rgba(24, 25, 26, 0.75) !important;
        }

        html.dark-mode .contant .cont-button a:hover {
            background-color: #3a3b3c !important;
        }

        html.dark-mode .break {
            border-color: #3a3b3c !important;
        }

        .global-dark-toggle {
            position: fixed;
            top: 50px;
            right: 18px;
            z-index: 99999;
            width: 42px;
            height: 42px;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            background: #ffffff;
            color: #222222;
            box-shadow: 0 4px 14px rgba(0,0,0,.25);
            font-size: 18px;
        }

        html.dark-mode .global-dark-toggle {
            background: #3a3b3c;
            color: #e4e6eb;
        }
    `;
    document.head.appendChild(style);
})();

document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const html = document.documentElement;

    if (localStorage.getItem('fakhama_darkmode') === 'enabled') {
        html.classList.add('dark-mode');
        body.classList.add('dark-mode');
    }

    let darkBtn = document.getElementById('darkModeToggle');

    if (!darkBtn) {
        darkBtn = document.createElement('button');
        darkBtn.type = 'button';
        darkBtn.id = 'darkModeToggle';
        darkBtn.className = 'global-dark-toggle';
        document.body.appendChild(darkBtn);
    }

    function updateIcon() {
        darkBtn.textContent = html.classList.contains('dark-mode') ? '☀️' : '🌙';
    }

    updateIcon();

    darkBtn.addEventListener('click', () => {
        html.classList.toggle('dark-mode');
        body.classList.toggle('dark-mode');

        if (html.classList.contains('dark-mode')) {
            localStorage.setItem('fakhama_darkmode', 'enabled');
        } else {
            localStorage.setItem('fakhama_darkmode', 'disabled');
        }

        updateIcon();
    });
});