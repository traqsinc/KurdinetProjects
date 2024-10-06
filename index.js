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
            // Kullanıcı bilgilerini depolamak için localStorage kullanılıyor
            localStorage.setItem('discordUser', JSON.stringify(userData));

            displayUserInfo(userData);
        } else {
            console.error('Token alınamadı:', tokenData);
        }
    } else {
        // Eğer daha önce giriş yapılmışsa kullanıcı bilgilerini al
        const userData = JSON.parse(localStorage.getItem('discordUser'));
        if (userData) {
            displayUserInfo(userData);
        }
    }
}

// Kullanıcı bilgilerini gösterir
function displayUserInfo(userData) {
    document.getElementById('user-info').innerHTML = `
        <h2>Hoş Geldiniz, ${userData.username}!</h2>
        <img src="${userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : ''}" alt="Avatar" width="100">
    `;
}

// Sayfa yüklendiğinde kullanıcı bilgilerini al
window.onload = getUserInfo;

// Tema geçişi işlevi
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
