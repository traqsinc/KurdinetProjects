require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Discord OAuth2 yetkilendirme URL'si
const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.DISCORD_REDIRECT_URI)}&response_type=code&scope=identify`;

app.get('/', (req, res) => {
  res.send(`<a href="${authUrl}">Discord ile Giriş Yap</a>`);
});

// Callback URL'si - Discord giriş yapıldıktan sonra buraya yönlendirme yapılacak
app.get('/callback', async (req, res) => {
  const code = req.query.code;

  // Discord'dan access token almak için istek
  const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
    client_id: process.env.DISCORD_CLIENT_ID,
    client_secret: process.env.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    code,
    redirect_uri: process.env.DISCORD_REDIRECT_URI,
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });

  const accessToken = tokenResponse.data.access_token;

  // Kullanıcı bilgilerini almak için Discord API'sine istek
  const userResponse = await axios.get('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    }
  });

  const user = userResponse.data;

  // Kullanıcı bilgilerini göster
  res.send(`
    <h1>Discord Girişi Başarılı</h1>
    <p>Kullanıcı Adı: ${user.username}</p>
    <img src="https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png" alt="Profil Fotoğrafı" />
  `);
});

app.listen(port, () => {
  console.log(`Uygulama şu adreste çalışıyor: http://localhost:${port}`);
});
