// Kullanıcının token'ını URL'den alır ve kullanıcı bilgilerini getirir
async function getUserInfo() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
        const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                'client_id': '1292393068506517615',
                'client_secret': '_9DQh1-Pam10sBwISNLAmypQw2s3d8oP',
                'grant_type': 'authorization_code',
                'code': code,
                'redirect_uri': 'https://traqsinc.github.io/KurdinetProjects/'
            })
        });

        const tokenData = await tokenResponse.json();
        if (tokenData.access_token) {
            const userResponse = await fetch('https://discord.com/api/users/@me', {
                headers: {
                    'Authorization': `Bearer ${tokenData.access_token}`
                }
            });

            const userData = await userResponse.json();
            localStorage.setItem('discordUser', JSON.stringify(userData));

            displayUserInfo(userData);
        } else {
            console.error('Token alınamadı:', tokenData);
        }
    } else {
        const userData = JSON.parse(localStorage.getItem('discordUser'));
        if (userData) {
            displayUserInfo(userData);
        }
    }
}

// Kullanıcı bilgilerini gösterir
function displayUserInfo(userData) {
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = `
        <h2>Hoşgeldin, ${userData.username}!</h2>
        <img src="${userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : 'https://via.placeholder.com/128'}" alt="Avatar" />
    `;
}

// Admin girişi için kullanıcı adı ve şifre kontrolü
function adminLogin() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    if (username === 'admin' && password === 'بيرجو إنجين بولات') {
        // Admin girişi başarılı olduğunda ekrandaki her şeyi temizle
        document.body.innerHTML = '';
        showAdminPanel();
    } else {
        alert('Hatalı kullanıcı adı veya şifre!');
    }
}

// Admin panelini göster
function showAdminPanel() {
    const adminPanel = document.getElementById('admin-panel');
    adminPanel.style.display = 'block';
}

// Duyuru oluşturma işlemi
function createAnnouncement() {
    const announcementInput = document.getElementById('announcement-input');
    const announcementDuration = document.getElementById('announcement-duration');
    const announcementText = announcementInput.value;
    const duration = parseInt(announcementDuration.value) * 1000; // saniyeyi milisaniyeye çevir

    if (announcementText && duration > 0) {
        const announcementDiv = document.getElementById('announcement');
        announcementDiv.innerText = announcementText;
        announcementDiv.style.display = 'block';

        setTimeout(() => {
            announcementDiv.style.display = 'none';
        }, duration);
    } else {
        alert('Duyuru metni ve süre gerekli!');
    }
}

// Temanın siyah veya beyaz olarak değişmesini sağlar
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Admin giriş formunu aç/kapat
function toggleAdminLogin() {
    const adminLogin = document.getElementById('admin-login');
    adminLogin.style.display = adminLogin.style.display === 'none' ? 'block' : 'none';
}

// Sayfa yüklendiğinde kullanıcı bilgilerini getir
window.onload = getUserInfo;
