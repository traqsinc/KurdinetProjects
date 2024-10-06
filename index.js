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
    document.getElementById('user-info').innerHTML = `
        <img src="${userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}` : 'default-avatar.png'}" alt="Avatar" style="width: 50px; border-radius: 50%;">
        <span>Discord ile Hoş Geldiniz, ${userData.username}!</span>
    `;
    document.getElementById('announcement').innerHTML = ""; // Sayfa yenilendiğinde duyuruyu gizle
}

// Tema değiştirici
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Admin girişi
function toggleAdminLogin() {
    const loginDiv = document.getElementById('admin-login');
    loginDiv.style.display = loginDiv.style.display === 'block' ? 'none' : 'block';
}

// Admin girişi kontrolü
function adminLogin() {
    const username = document.getElementById('admin-username').value;
    const password = document.getElementById('admin-password').value;

    if (username === 'admin' && password === 'بيرجو إنجين بولات') {
        alert('Admin girişi başarılı!');
        document.getElementById('admin-panel').style.display = 'block';
        toggleAdminLogin(); // Giriş formunu kapat
    } else {
        alert('Kullanıcı adı veya şifre yanlış!');
    }
}

// Admin panelini kapat
function toggleAdminPanel() {
    const panelDiv = document.getElementById('admin-panel');
    panelDiv.style.display = panelDiv.style.display === 'block' ? 'none' : 'block';
}

// Duyuru oluştur
function createAnnouncement() {
    const announcementInput = document.getElementById('announcement-input').value;
    const duration = parseInt(document.getElementById('announcement-duration').value) || 5; // Varsayılan süre 5 saniye
    document.getElementById('announcement').innerText = announcementInput;
    document.getElementById('announcement').style.display = 'block';
    
    // Duyuruyu gizlemek için zamanlayıcı
    setTimeout(() => {
        document.getElementById('announcement').style.display = 'none';
    }, duration * 1000);
}

// Sayfa yüklendiğinde kullanıcı bilgilerini getir
window.onload = getUserInfo;
