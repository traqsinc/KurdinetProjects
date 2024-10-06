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
