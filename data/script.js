
document.addEventListener("DOMContentLoaded", function() {
    
    document.querySelector(".profile-img").src = config.profileImage;

    
    const usernameElement = document.querySelector(".username--style4");
    usernameElement.innerHTML = `${config.userName}
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg" alt="Onay Rozeti" class="verified-badge">
        <i class="fa-solid fa-badge-check badge"></i>`;

    
    // Kullanıcı adı rengi ve gölgesi dinamik ayarlama
    usernameElement.style.color = config.usernameColor;
    usernameElement.style.textShadow = `0px 0px 9px ${config.usernameShadowColor}`;

    
    document.querySelector(".profile p").innerHTML = `Merhaba, ben <strong>${config.userName}</strong> ve Türkiye'den bir yazılım geliştiricisiyim...`;

    
    document.querySelector(".music iframe").src = config.spotifyEmbedUrl;

    
    const socials = document.querySelector(".socials");
    socials.innerHTML = `
        <a href="${config.socialLinks.discord}" target="_blank"><i class="fab fa-discord"></i></a>
        <a href="${config.socialLinks.spotify}" target="_blank"><i class="fab fa-spotify"></i></a>
        <a href="${config.socialLinks.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="${config.socialLinks.custom}" target="_blank">
            <img src="${config.customIcon}" alt="Özel Sosyal Medya" class="custom-icon">
        </a>
    `;

    
    document.body.style.backgroundImage = `url(${config.backgroundImage})`;

    
    const credits = document.querySelector(".credits");
    credits.innerHTML = `
        <span class="created-by">created by </span>
        <a href="${config.createdBy.link}" class="credits-text">${config.createdBy.text}</a>
});
