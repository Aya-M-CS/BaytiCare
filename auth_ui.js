// Global Authentication UI Manager

document.addEventListener('DOMContentLoaded', () => {
    injectAuthStyles();
    initAuthUI();
    initFavorites();
});

function injectAuthStyles() {
    if (document.getElementById('auth-ui-styles')) return;
    const style = document.createElement('style');
    style.id = 'auth-ui-styles';
    style.innerHTML = `
        .user-profile-chip {
            background-color: #fff;
            border: 1px solid transparent;
        }
        .user-profile-chip:hover {
            background-color: #f1f1f1;
        }
        .user-profile-name {
            color: rgb(22, 136, 140);
        }
        
        body.dark-mode .user-profile-chip {
            background-color: var(--card-bg, #2c2c2c) !important;
            border: 1px solid #444 !important;
        }
        body.dark-mode .user-profile-chip:hover {
            background-color: #3a3a3a !important;
        }
        body.dark-mode .user-profile-name {
            color: #ffffff !important;
        }
    `;
    document.head.appendChild(style);
}

function initAuthUI() {
    const sessionStr = localStorage.getItem('fakhama_session');
    const rightGroups = document.querySelectorAll('.right-group');

    if (sessionStr) {
        const user = JSON.parse(sessionStr);
        let displayName = user.ownerName || user.name || user.fullName || 'User';
        let initial = displayName.charAt(0).toUpperCase();

        rightGroups.forEach(rg => {
            const loginLinks = rg.querySelectorAll('a[href*="login"], a[href*="signup"]');
            loginLinks.forEach(link => link.remove());

            let profileChip = document.createElement('a');
            const profilePage = user.role === 'PROVIDER' ? 'profile-owner.html' : 'profile-user.html';
            profileChip.href = profilePage;            
            profileChip.style = "display: flex; align-items: center; gap: 8px; text-decoration: none; padding: 4px 10px; border-radius: 12px; background-color: #fff; margin-left: 10px; cursor: pointer; transition: all 0.3s ease;";

            profileChip.onmouseover = () => profileChip.style.backgroundColor = '#f1f1f1';
            profileChip.onmouseout = () => profileChip.style.backgroundColor = '#fff';

            let avatar = document.createElement('div');
            avatar.style = "width: 28px; height: 28px; border-radius: 50%; background-color: rgb(22, 136, 140); color: #fff; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 15px;";
            avatar.innerText = initial;

            let nameLabel = document.createElement('span');
            nameLabel.style = "color: rgb(22, 136, 140); font-size: 13px; font-weight: bold;";
            nameLabel.innerText = displayName.split(' ')[0];

            profileChip.appendChild(avatar);
            profileChip.appendChild(nameLabel);

            if (!rg.querySelector('.user-profile-chip')) {
                profileChip.classList.add('user-profile-chip');
                rg.appendChild(profileChip);
            }
        });
    } 
    else {
        rightGroups.forEach(rg => {
            const hasLogin = rg.querySelector('a[href*="login"]');
            if (!hasLogin && !rg.querySelector('a[href="profile.html"]')) {
                let loginBtn = document.createElement('a');
                loginBtn.href = 'login2.html';
                loginBtn.style.color = '#fff';
                loginBtn.style.textDecoration = 'none';
                loginBtn.style.margin = '0 10px';
                loginBtn.innerText = 'Login';

                let signupBtn = document.createElement('a');
                signupBtn.href = 'signup2.html';
                signupBtn.style.color = '#fff';
                signupBtn.style.textDecoration = 'none';
                signupBtn.style.margin = '0 10px';
                signupBtn.innerText = 'Sign Up';

                rg.appendChild(loginBtn);
                rg.appendChild(signupBtn);
            }
        });
    }
}

function initFavorites() {
}