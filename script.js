// ===== LANGUAGE DATA =====
const textData = {
    zh: {
        "hero-title": ["虔誠齋戒 改變", "你我的命運"],
        "hero-content": [
            "曾幾何時，人們認為動物應該是人的食物？",
            "又是什麼時候開始，人們吞入口的生靈，",
            "卻成為自己恐懼的源頭？"
        ],
        "p1-title": ["您的一秒鐘 決定", "的一輩子"],
        "p1-content": [
            "當您瀏覽網頁的時間裡，",
            "條生命正在消逝",
            "根據聯合國糧食與農業組織農糧署",
            "(FAO)的統計數據，",
            "自2000年以來，",
            "人類對於家畜、家禽的養殖量節節上升。",
            "當人們決定吃肉，",
            "就有一條生命隨著我們剎那間的決定，",
            "終結牠不自由、充滿恐懼的一生。"
        ],
        "p2-title": "如果這是您的一餐，您的選擇是？",
        "copyright-text": [
            "Copyright © 2020 Open Source Matters. All rights reserved.",
            "Copyright, Tzu Chi Foundation."
        ],
        "backhome-btn": "回首頁",
        "backp2-btn": "重新選餐",
        "meat-title": "選擇吃肉，您該知道的事",
        "leg-title": "吞食生命，小心病從口入"
    },
    en: {
        "hero-title": ["Devout vegetarian practice", "reshapes the fate of all—", ", you, and me."],
        "hero-content": [
            "When did we begin to believe that animals were meant to be our food?",
            "And at what point did the living beings we swallowed become the source of our fear?",
            ""
        ],
        "p1-title": ["Your One-Second Decision", "Determines Lifetime"],
        "p1-content": [
            "In the time you spend browsing this page,",
            "lifes are fading away.",
            "According to statistics from the United Nations Food and Agriculture Organization (FAO),",
            "since the year 2000, the quantity of livestock and poultry farmed by humans has steadily increased.",
            "When people choose to eat meat,",
            "a life ends with our instantaneous decision,",
            "terminating its lifetime of captivity and fear."
        ],
        "p2-title": "If this were your meal, what would be your choice?",
        "copyright-text": [
            "Copyright © 2020 Open Source Matters. All rights reserved.",
            "Copyright, Tzu Chi Foundation."
        ],
        "backhome-btn": "Back to Home",
        "backp2-btn": "Reselect Meal",
        "meat-title": "What You Should Know When Choosing to Eat Meat",
        "leg-title": "Ingesting Life, Beware Illness Entering Through the Mouth"
    },
    es: {
        "hero-title": ["Una práctica vegetariana devota", "cambia el destino de todos:", ", de ti y de mí."],
        "hero-content": [
            "¿Cuándo empezamos a creer que los animales debían ser alimento para los humanos?",
            "¿Y en qué momento los seres vivos que ingerimos se convirtieron en la raíz de nuestro temor?",
            ""
        ],
        "p1-title": ["Su Decisión de un Segundo", "Determina Toda ", "Vida"],
        "p1-content": [
            "En el tiempo que pasa navegando por esta página,",
            "una vida se está extinguiendo.",
            "Según las estadísticas de la Organización de las Naciones Unidas para la Alimentación y la Agricultura (FAO),",
            "desde el año 2000, la cantidad de ganado y aves de corral criados por humanos ha aumentado constantemente.",
            "Cuando la gente decide comer carne,",
            "una vida termina con nuestra decisión instantánea,",
            "poniendo fin a su vida de cautiverio y miedo."
        ],
        "p2-title": "¿Si esta fuera su comida, cuál sería su elección?",
        "copyright-text": [
            "Copyright © 2020 Open Source Matters. Todos los derechos reservados.",
            "Copyright, Tzu Chi Foundation."
        ],
        "backhome-btn": "Volver al Inicio",
        "backp2-btn": "Seleccionar Comida Nuevamente",
        "meat-title": "Lo que Debe Saber al Elegir Comer Carne",
        "leg-title": "Ingiriendo Vida, Cuidado con las Enfermedades que Entran por la Boca"
    }
};

// ===== GLOBAL STATE =====
let currentLang = 'zh';
let lostLives = 0;
let currentVideoIndex = 0;
let popupHls = null;

// Video URLs
const backgroundVideos = [
    "https://customer-cvpm5ik9o37c3vts.cloudflarestream.com/d9eea2699ec9c9bad2bd6cfbe3834523/manifest/video.m3u8",
    "https://customer-cvpm5ik9o37c3vts.cloudflarestream.com/d71b445e3792cff403311b7834a42319/manifest/video.m3u8",
    "https://customer-cvpm5ik9o37c3vts.cloudflarestream.com/d39ba9a17b4931b266b63359964f9a2a/manifest/video.m3u8"
];
const popupVideoUrl = "https://customer-cvpm5ik9o37c3vts.cloudflarestream.com/3f03671f9f2f6e36878416470f83f362/manifest/video.m3u8";

// Detect if we're in a subfolder
const isSubfolder = window.location.pathname.includes('/en/') || window.location.pathname.includes('/es/');
const basePath = isSubfolder ? '../' : '';

// Image sources for different languages (Cloudflare CDN)
const imageSrc = {
    zh: "https://imagedelivery.net/JVmYbduioNVkRm0SvNGcew/it-tw/default",
    en: "https://imagedelivery.net/JVmYbduioNVkRm0SvNGcew/hero-it-en/default",
    es: "https://imagedelivery.net/JVmYbduioNVkRm0SvNGcew/hero-it-es/default"
};

const p1ImageSrc = {
    zh: "https://imagedelivery.net/JVmYbduioNVkRm0SvNGcew/it-tw/default",
    en: "https://imagedelivery.net/JVmYbduioNVkRm0SvNGcew/p1-it-en/default",
    es: "https://imagedelivery.net/JVmYbduioNVkRm0SvNGcew/p1-it-es/default"
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Detect language from URL
    const path = window.location.pathname;
    if (path.includes('/en/') || path.endsWith('/en')) {
        currentLang = 'en';
    } else if (path.includes('/es/') || path.endsWith('/es')) {
        currentLang = 'es';
    } else {
        currentLang = 'zh';
    }

    // Initialize everything
    initLanguageButtons();
    updateContent();
    initBackgroundVideo();
    initPopupVideo();
    initClock();
    initLostLivesCounter();
    initDishRotation();
    initScrollButtons();
    updateLinks();
});

// ===== LANGUAGE FUNCTIONS =====
function initLanguageButtons() {
    const container = document.getElementById('lang-buttons');
    if (!container) return;

    // Determine correct paths based on current location
    const languages = [
        { code: 'zh', label: '中', path: isSubfolder ? '../index.html' : 'index.html' },
        { code: 'en', label: 'EN', path: isSubfolder ? '../en/index.html' : 'en/index.html' },
        { code: 'es', label: 'ES', path: isSubfolder ? '../es/index.html' : 'es/index.html' }
    ];

    container.innerHTML = '';
    languages.filter(l => l.code !== currentLang).forEach(lang => {
        const btn = document.createElement('button');
        btn.className = 'lang-btn';
        btn.textContent = lang.label;
        btn.addEventListener('click', () => {
            window.location.href = lang.path;
        });
        container.appendChild(btn);
    });
}

function updateContent() {
    const data = textData[currentLang];
    if (!data) return;

    // Update hero title
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle) {
        heroTitle.className = `hero-title lang-${currentLang}`;
        if (currentLang === 'zh') {
            heroTitle.innerHTML = `
                ${data["hero-title"][0]}
                <span class="p1-subtitle"><img src="${imageSrc[currentLang]}" alt="牠"></span>
                ${data["hero-title"][1]}
            `;
        } else {
            heroTitle.innerHTML = `
                <div>${data["hero-title"][0]}</div>
                <div>${data["hero-title"][1]}</div>
                <div class="hero-title-row">
                    <span class="p1-subtitle"><img src="${imageSrc[currentLang]}" alt="牠"></span>
                    <span class="hero-title-text">${data["hero-title"][2]}</span>
                </div>
            `;
        }
    }

    // Update hero description
    const heroDesc = document.getElementById('hero-description');
    if (heroDesc) {
        heroDesc.className = `hero-description lang-${currentLang}`;
        heroDesc.innerHTML = `${data["hero-content"][0]}<br>${data["hero-content"][1]}<br>${data["hero-content"][2]}`;
    }

    // Update hero below description (mobile)
    const heroBelowDesc = document.getElementById('hero-below-description');
    if (heroBelowDesc) {
        heroBelowDesc.className = `hero-description lang-${currentLang}`;
        heroBelowDesc.innerHTML = `${data["hero-content"][0]}<br>${data["hero-content"][1]}<br>${data["hero-content"][2]}`;
    }

    // Update P1 section
    const p1Container = document.getElementById('p1');
    if (p1Container) {
        p1Container.className = `p1-container lang-${currentLang}`;
    }

    const p1Title = document.getElementById('p1-title');
    if (p1Title) {
        p1Title.className = `p1-title lang-${currentLang}`;
        if (currentLang === 'zh') {
            p1Title.innerHTML = `
                ${data["p1-title"][0]}
                <span class="p1-subtitle"><img src="${p1ImageSrc[currentLang]}" alt="牠"></span>
                ${data["p1-title"][1]}
            `;
        } else if (currentLang === 'en') {
            p1Title.innerHTML = `
                <div>${data["p1-title"][0]}</div>
                <div style="display:flex;align-items:center;justify-content:center;">
                    <span class="p1-subtitle-lang"><img src="${p1ImageSrc[currentLang]}" alt="牠"></span>
                    <div>${data["p1-title"][1]}</div>
                </div>
            `;
        } else {
            p1Title.innerHTML = `
                <div>${data["p1-title"][0]}</div>
                <div style="display:flex;align-items:center;justify-content:center;">
                    <div>${data["p1-title"][1]}</div>
                    <span class="p1-subtitle-lang"><img src="${p1ImageSrc[currentLang]}" alt="牠"></span>
                    <div>${data["p1-title"][2]}</div>
                </div>
            `;
        }
    }

    // Update P2 title
    const p2Title = document.getElementById('p2-title');
    if (p2Title) {
        p2Title.textContent = data["p2-title"];
    }

    // Update footer
    const footer1 = document.getElementById('footer1');
    const footer2 = document.getElementById('footer2');
    if (footer1) footer1.textContent = data["copyright-text"][0];
    if (footer2) {
        footer2.innerHTML = `${data["copyright-text"][1].split("Tzu Chi Foundation.")[0]}<a href="https://go-vegetarian.tzuchi.org.tw/" target="_blank" rel="noopener noreferrer">Tzu Chi Foundation.</a>`;
    }
}

function updateP1Content() {
    const data = textData[currentLang];
    const p1Content = document.getElementById('p1-content');
    if (!p1Content || !data) return;

    let html = `<p>${data["p1-content"][0]}</p>`;
    html += `<p class="p1-lost-lives">
        <span class="p1-lost-lives-number" id="lost-lives-number">${lostLives.toLocaleString()}</span>
        <span class="p1-lost-lives-text">${data["p1-content"][1]}</span>
    </p>`;

    const startIndex = currentLang === 'zh' ? 2 : 2;
    const endIndex = currentLang === 'zh' ? 9 : 7;

    for (let i = startIndex; i < endIndex; i++) {
        if (data["p1-content"][i]) {
            html += `<p>${data["p1-content"][i]}</p>`;
        }
    }

    p1Content.innerHTML = html;
}

function updateLinks() {
    // If already in subfolder, links are relative (meat.html, leg.html)
    // If in root, need to add language path for non-zh
    const path = isSubfolder ? '' : (currentLang === 'zh' ? '' : currentLang + '/');

    const meatLink = document.getElementById('meat-link');
    const legLink = document.getElementById('leg-link');

    if (meatLink) meatLink.href = path + 'meat.html';
    if (legLink) legLink.href = path + 'leg.html';
}

// ===== VIDEO FUNCTIONS =====
let bgHls = null;
let preloadHls = null;
let isPreloaded = false;

function initBackgroundVideo() {
    const video = document.getElementById('bg-video');
    if (!video) return;

    loadBackgroundVideo(video);

    // Preload next video when current is 70% done
    video.addEventListener('timeupdate', () => {
        if (video.duration && video.currentTime > video.duration * 0.7 && !isPreloaded) {
            preloadNextVideo();
        }
    });

    video.addEventListener('ended', () => {
        currentVideoIndex = (currentVideoIndex + 1) % backgroundVideos.length;
        switchToPreloadedVideo(video);
    });
}

function loadBackgroundVideo(video) {
    const url = backgroundVideos[currentVideoIndex];

    if (bgHls) {
        bgHls.destroy();
        bgHls = null;
    }

    if (typeof Hls !== 'undefined' && Hls.isSupported()) {
        bgHls = new Hls();
        bgHls.loadSource(url);
        bgHls.attachMedia(video);
        bgHls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(e => console.log('Autoplay prevented:', e));
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = url;
        video.addEventListener('loadedmetadata', () => {
            video.play().catch(e => console.log('Autoplay prevented:', e));
        });
    }
}

function preloadNextVideo() {
    const nextIndex = (currentVideoIndex + 1) % backgroundVideos.length;
    const url = backgroundVideos[nextIndex];

    if (typeof Hls !== 'undefined' && Hls.isSupported()) {
        preloadHls = new Hls();
        preloadHls.loadSource(url);
        preloadHls.on(Hls.Events.MANIFEST_PARSED, () => {
            isPreloaded = true;
        });
    } else {
        isPreloaded = true;
    }
}

function switchToPreloadedVideo(video) {
    // Destroy old HLS
    if (bgHls) {
        bgHls.destroy();
        bgHls = null;
    }

    if (preloadHls && typeof Hls !== 'undefined' && Hls.isSupported()) {
        // Use preloaded HLS
        bgHls = preloadHls;
        bgHls.attachMedia(video);
        video.play().catch(e => console.log('Autoplay prevented:', e));
        preloadHls = null;
    } else {
        // Fallback to regular load
        loadBackgroundVideo(video);
    }

    isPreloaded = false;
}

function initPopupVideo() {
    const playBtn = document.getElementById('play-btn');
    const popup = document.getElementById('video-popup');
    const popupVideo = document.getElementById('popup-video');
    const closeBtn = document.getElementById('close-popup');
    const overlay = document.getElementById('popup-overlay');

    if (!playBtn || !popup) return;

    playBtn.addEventListener('click', () => {
        popup.style.display = 'flex';
        loadPopupVideo(popupVideo);
    });

    const closePopup = () => {
        popup.style.display = 'none';
        if (popupHls) {
            popupHls.destroy();
            popupHls = null;
        }
        popupVideo.pause();
        popupVideo.src = '';
    };

    closeBtn.addEventListener('click', closePopup);
    overlay.addEventListener('click', closePopup);
}

function loadPopupVideo(video) {
    if (Hls.isSupported()) {
        popupHls = new Hls();
        popupHls.loadSource(popupVideoUrl);
        popupHls.attachMedia(video);
        popupHls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play().catch(e => console.log('Play prevented:', e));
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = popupVideoUrl;
        video.addEventListener('loadedmetadata', () => {
            video.play().catch(e => console.log('Play prevented:', e));
        });
    }
}

// ===== CLOCK FUNCTIONS =====
function initClock() {
    updateClock();
    setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours() % 12;

    const secondAngle = seconds * 6 + 90;
    const minuteAngle = minutes * 6 + seconds * 0.1 + 90;
    const hourAngle = hours * 30 + minutes * 0.5 + 90;

    const secondHand = document.getElementById('second-hand');
    const minuteHand = document.getElementById('minute-hand');
    const hourHand = document.getElementById('hour-hand');

    if (secondHand) secondHand.style.transform = `translateY(-50%) rotate(${secondAngle}deg)`;
    if (minuteHand) minuteHand.style.transform = `translateY(-50%) rotate(${minuteAngle}deg)`;
    if (hourHand) hourHand.style.transform = `translateY(-50%) rotate(${hourAngle}deg)`;
}

// ===== LOST LIVES COUNTER =====
function initLostLivesCounter() {
    updateP1Content();

    setInterval(() => {
        lostLives += 2443;
        const counter = document.getElementById('lost-lives-number');
        if (counter) {
            counter.textContent = lostLives.toLocaleString();
        }
    }, 1000);
}

// ===== DISH ROTATION =====
function initDishRotation() {
    const dishes = document.querySelectorAll('.p2-dish-item');
    const rotations = { meat: 0, leg: 0 };

    dishes.forEach(dish => {
        const type = dish.dataset.dish;
        const topping = dish.querySelector('.topping');

        dish.addEventListener('mouseenter', () => {
            rotations[type] += 360;
            if (topping) {
                topping.style.transform = `translate(-50%, -50%) rotate(${rotations[type]}deg)`;
            }
        });
    });
}

// ===== SCROLL BUTTONS =====
function initScrollButtons() {
    const scrollArrow = document.getElementById('scroll-arrow');
    const scrollArrowMobile = document.getElementById('scroll-arrow-mobile');

    const scrollToP1 = () => {
        const p1 = document.getElementById('p1');
        if (p1) p1.scrollIntoView({ behavior: 'smooth' });
    };

    if (scrollArrow) scrollArrow.addEventListener('click', scrollToP1);
    if (scrollArrowMobile) scrollArrowMobile.addEventListener('click', scrollToP1);
}
