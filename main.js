// ==================== СИСТЕМА ЛОГИРОВАНИЯ ====================
const LOG_STYLES = {
    info: 'background: #3498db; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
    success: 'background: #27ae60; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
    warning: 'background: #f39c12; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
    error: 'background: #e74c3c; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
    debug: 'background: #9b59b6; color: white; padding: 2px 6px; border-radius: 3px; font-weight: bold;',
    star: 'background: #f1c40f; color: black; padding: 2px 6px; border-radius: 3px; font-weight: bold;'
};

const LOG_ICONS = {
    info: '📘',
    success: '✅',
    warning: '⚠️',
    error: '❌',
    debug: '🐞',
    star: '⭐'
};

// Основная функция логирования
function log(level, message, data = null) {
    const timestamp = new Date().toLocaleTimeString('ru-RU', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        fractionalSecondDigits: 3
    });
    
    const icon = LOG_ICONS[level] || '📌';
    const style = LOG_STYLES[level] || LOG_STYLES.info;
    
    console.log(
        `${icon} %c${level.toUpperCase()}%c [${timestamp}] ${message}`,
        style,
        'background: transparent; color: inherit; font-weight: normal;'
    );
    
    if (data) {
        console.log('   📦 Данные:', data);
    }
}

// Групповое логирование
function logGroup(name, callback) {
    console.group(`📁 ${name}`);
    callback();
    console.groupEnd();
}

// Счетчики производительности
const perfCounters = {};

function startTimer(label) {
    perfCounters[label] = performance.now();
    log('debug', `⏱️ Таймер запущен: ${label}`);
}

function endTimer(label) {
    if (perfCounters[label]) {
        const duration = (performance.now() - perfCounters[label]).toFixed(2);
        log('debug', `⏱️ Таймер завершен: ${label} — ${duration}ms`);
        delete perfCounters[label];
        return duration;
    }
    return null;
}

// Очищаем старые обработчики при перезагрузке
window.onload = function() {
    console.log('Очистка старых обработчиков...');
    setTimeout(checkAuth, 100);
};

// ==================== ОТЛАДКА АВТОРИЗАЦИИ ====================
console.log('%c🔍 РЕЖИМ ОТЛАДКИ АВТОРИЗАЦИИ ВКЛЮЧЕН', 'background: #ff0000; color: white; font-size: 14px; padding: 4px;');

// Перехватываем все ошибки
window.addEventListener('error', function(e) {
    console.error('❌ ГЛОБАЛЬНАЯ ОШИБКА:', {
        message: e.message,
        filename: e.filename,
        lineno: e.lineno,
        error: e.error
    });
});

// Проверяем загрузку Google API
setInterval(() => {
    if (window.google?.accounts?.oauth2) {
        console.log('✅ Google API загружен и доступен');
    } else {
        console.log('⏳ Google API еще загружается...');
    }
}, 1000);

// ==================== ПЕРЕХВАТЧИКИ СОБЫТИЙ ====================

// Логирование всех кликов
document.addEventListener('click', function(e) {
    const target = e.target;
    let description = '';
    
    if (target.tagName) description += target.tagName.toLowerCase();
    if (target.id) description += `#${target.id}`;
    if (target.className && typeof target.className === 'string') {
        const classes = target.className.split(' ').filter(c => c).join('.');
        if (classes) description += `.${classes}`;
    }
    if (target.innerText && target.innerText.length < 30) {
        description += ` («${target.innerText.trim()}»)`;
    }
    
    log('debug', `Клик: ${description || 'неизвестный элемент'}`);
}, true);

// Логирование загрузки страницы
window.addEventListener('load', function() {
    log('success', `🚀 Страница полностью загружена за ${performance.now().toFixed(2)}ms`);
    log('info', `📱 Размер окна: ${window.innerWidth}x${window.innerHeight}`);
    log('info', `🔋 Онлайн: ${navigator.onLine ? 'Да' : 'Нет'}`);
});

// Логирование ошибок
window.addEventListener('error', function(e) {
    log('error', `Ошибка: ${e.message}`, {
        файл: e.filename,
        строка: e.lineno,
        колонка: e.colno
    });
});

window.addEventListener('unhandledrejection', function(e) {
    log('error', `Unhandled Promise Rejection: ${e.reason}`);
});

// ==================== СТАРТОВОЕ ЛОГИРОВАНИЕ ====================

logGroup('🚀 ИНИЦИАЛИЗАЦИЯ SITEREVIEW', () => {
    log('info', `Версия ${new Date().toLocaleDateString('ru-RU')}`);
    log('info', `User Agent: ${navigator.userAgent}`);
    log('info', `Язык: ${navigator.language}`);
    log('info', `Cookies: ${document.cookie ? 'Есть' : 'Нет'}`);
    log('info', `LocalStorage: ${localStorage.length} записей`);
    log('info', `SessionStorage: ${sessionStorage.length} записей`);
});

// ==================== ОБЕРТКИ ДЛЯ СУЩЕСТВУЮЩИХ ФУНКЦИЙ ====================

// Сохраняем оригинальные функции
const originalInitBanner = window.initBanner;
const originalAddReview = window.addReview;
const originalDisplayAllReviews = window.displayAllReviews;
const originalFilterByCategory = window.filterByCategory;

// Переопределяем с логированием
window.initBanner = function() {
    log('info', '🖼️ Инициализация баннера');
    startTimer('banner-init');
    if (originalInitBanner) {
        const result = originalInitBanner.apply(this, arguments);
        endTimer('banner-init');
        log('success', '✅ Баннер инициализирован');
        return result;
    }
};

window.addReview = function(newReview) {
    logGroup('📝 ДОБАВЛЕНИЕ НОВОГО ОТЗЫВА', () => {
        log('info', `Автор: ${newReview.name || 'Не указан'}`);
        log('info', `Сайт: ${newReview.siteName || 'Не указан'}`);
        log('info', `Рейтинг: ${'★'.repeat(newReview.rating)}${'☆'.repeat(5 - newReview.rating)} (${newReview.rating})`);
        log('info', `Комментарий: "${newReview.comment?.substring(0, 50)}${newReview.comment?.length > 50 ? '...' : ''}"`);
    });
    
    if (originalAddReview) {
        const result = originalAddReview.apply(this, arguments);
        log('success', `✅ Отзыв добавлен с ID: ${result.id}`);
        return result;
    }
};

// ==================== DOM ЭЛЕМЕНТЫ ====================
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const filterBtns = document.querySelectorAll('.filter-btn');
const featuredReviewsContainer = document.getElementById('featured-reviews');
const allReviewsContainer = document.getElementById('all-reviews');
const ratingDistribution = document.getElementById('rating-distribution');

// Элементы для статистики
const totalReviewsEl = document.getElementById('total-reviews');
const uniqueSitesEl = document.getElementById('unique-sites');
const totalReviewersEl = document.getElementById('total-reviewers');
const avgRatingEl = document.getElementById('avg-rating');

const statsTotalReviewsEl = document.getElementById('stats-total-reviews');
const statsAvgRatingEl = document.getElementById('stats-avg-rating');
const statsReviewersEl = document.getElementById('stats-reviewers');
const statsSitesEl = document.getElementById('stats-sites');

// ==================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ====================

function isUserVerified(email) {
    return reviews.some(review => review.email === email && review.verified === true);
}

function getDisplayNickname(review) {
    if (review.nickname && review.nickname.trim() !== '') {
        return review.nickname;
    }
    if (review.email && review.email.trim() !== '') {
        return generateAnonimNickname(review.email);
    }
    if (review.name && review.name.trim() !== '') {
        return generateNicknameFromName(review.name);
    }
    return 'anonim_0000';
}

function generateNicknameFromName(name) {
    try {
        const translitMap = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
            'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
            'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
            'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
            'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
            'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        
        let cleanName = name.trim().toLowerCase();
        let englishName = '';
        
        for (let char of cleanName) {
            if (translitMap[char]) {
                englishName += translitMap[char];
            } else if (char.match(/[a-z0-9]/)) {
                englishName += char;
            }
        }
        
        if (!englishName) {
            return 'user_' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        }
        
        englishName = englishName.replace(/(.)\1+/g, '$1').substring(0, 12);
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        return `${englishName}_${randomNum}`;
    } catch (e) {
        return 'user_' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    }
}

function generateAnonimNickname(email) {
    if (!email) return 'anonim_0000';
    try {
        let hash = 0;
        for (let i = 0; i < email.length; i++) {
            hash = ((hash << 5) - hash) + email.charCodeAt(i);
            hash = hash & hash;
        }
        const numericHash = Math.abs(hash % 10000).toString().padStart(4, '0');
        return `anonim_${numericHash}`;
    } catch (e) {
        return 'anonim_0000';
    }
}

function extractUsername(email) {
    return email.split('@')[0];
}

// ==================== ИНИЦИАЛИЗАЦИЯ ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('Загружено отзывов:', reviews.length);
    
    initNavigation();
    loadReviews();
    createCategoryButtons();
    updateStatistics();
    setupSearchAndFilters();
    setupUserProfileLinks();
    handleProfileHash();
    updateProgress();
    initQuiz();
    
    if (!window.location.hash && document.querySelector('#profile-page.active')) {
        switchToPage('home');
    }
});

// ==================== НАВИГАЦИЯ ====================
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            navLinks.forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            
            pages.forEach(page => page.classList.remove('active'));
            
            const pageId = this.getAttribute('data-page');
            document.getElementById(`${pageId}-page`).classList.add('active');
            
            if (pageId === 'reviews') {
                displayAllReviews(reviews);
            }
            if (pageId === 'home') {
                displaySitesNeedingReviews();
                displayRecommendedSites();
                displaySitesToAvoid();
            }
            if (pageId === 'stats') {
                updateStatistics();
                displayRatingDistribution();
                displayTopSites();
                setTimeout(() => {
                    analyzeTimeStats();
                }, 100);
            }
        });
    });
}

// ==================== ЗАГРУЗКА ОТЗЫВОВ ====================
function loadReviews() {
    displayFeaturedReviews();
    displayAllReviews(reviews);
    displaySitesNeedingReviews();
    displayRecommendedSites();
    displaySitesToAvoid();
    
    setTimeout(() => {
        updateReviewCardsWithLinks();
    }, 100);
}

// ==================== ПРОФИЛИ ПОЛЬЗОВАТЕЛЕЙ ====================
function generateUserId(email) {
    if (!email) return 'user_0000';
    try {
        let hash = 0;
        for (let i = 0; i < email.length; i++) {
            hash = ((hash << 5) - hash) + email.charCodeAt(i);
            hash = hash & hash;
        }
        return `user_${Math.abs(hash % 10000).toString().padStart(4, '0')}`;
    } catch (e) {
        return 'user_0000';
    }
}

function generateAvatar(name) {
    if (!name) return '';
    
    const colors = [
        '#3498db', '#2ecc71', '#9b59b6', '#e74c3c', '#f39c12',
        '#1abc9c', '#34495e', '#7f8c8d', '#d35400', '#27ae60'
    ];
    
    const firstLetter = name.charAt(0).toUpperCase();
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash % colors.length);
    const color = colors[colorIndex];
    
    return `
        <div class="user-avatar" style="
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: ${color};
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 2.5rem;
            font-weight: bold;
            margin: 0 auto 20px;
            box-shadow: 0 4px 20px ${color}80;
        ">
            ${firstLetter}
        </div>
    `;
}

function getUserStats(userId) {
    const userReviews = reviews.filter(review => {
        const reviewUserId = generateUserId(review.email);
        return reviewUserId === userId;
    });
    
    if (userReviews.length === 0) return null;
    
    const totalReviews = userReviews.length;
    const avgRating = (userReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);
    const uniqueSites = [...new Set(userReviews.map(review => review.siteUrl))].length;
    
    const sites = {};
    userReviews.forEach(review => {
        if (!sites[review.siteUrl]) {
            sites[review.siteUrl] = {
                name: review.siteName,
                url: review.siteUrl,
                ratings: [],
                count: 0
            };
        }
        sites[review.siteUrl].ratings.push(review.rating);
        sites[review.siteUrl].count++;
    });
    
    Object.keys(sites).forEach(url => {
        sites[url].avgRating = (sites[url].ratings.reduce((a, b) => a + b, 0) / sites[url].count).toFixed(1);
    });
    
    const ratingCounts = {};
    userReviews.forEach(review => {
        ratingCounts[review.rating] = (ratingCounts[review.rating] || 0) + 1;
    });
    const mostCommonRating = Object.keys(ratingCounts).reduce((a, b) => 
        ratingCounts[a] > ratingCounts[b] ? a : b
    );
    
    return {
        name: userReviews[0].name,
        userId: userId,
        nickname: getDisplayNickname(userReviews[0]),
        totalReviews,
        avgRating,
        uniqueSites,
        sites: sites,
        reviews: userReviews.sort((a, b) => new Date(b.date) - new Date(a.date)),
        firstReviewDate: userReviews.reduce((oldest, review) => {
            return new Date(review.date) < new Date(oldest.date) ? review : oldest;
        }).date,
        lastReviewDate: userReviews.reduce((newest, review) => {
            return new Date(review.date) > new Date(newest.date) ? review : newest;
        }).date,
        isVerified: isUserVerified(userReviews[0].email),
        mostCommonRating: mostCommonRating,
        ratingStyle: getRatingStyle(parseFloat(avgRating))
    };
}

function getRatingStyle(avgRating) {
    if (avgRating >= 4.5) return 'Добряк';
    if (avgRating >= 4.0) return 'Позитивный';
    if (avgRating >= 3.0) return 'Объективный';
    if (avgRating >= 2.0) return 'Критик';
    return 'Строгий';
}

function displayUserProfile(userId) {
    const profileContent = document.getElementById('profile-content');
    if (!profileContent) return;
    
    const userStats = getUserStats(userId);
    
    if (!userStats) {
        profileContent.innerHTML = `
            <div class="no-profile" style="text-align: center; padding: 40px;">
                <i class="fas fa-user-slash" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
                <h3 style="color: #666; margin-bottom: 10px;">Пользователь не найден</h3>
                <p style="color: #888;">Отзывы от этого пользователя отсутствуют в базе.</p>
                <button onclick="switchToPage('reviews')" class="back-to-reviews" style="
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--glass-bg);
                    backdrop-filter: blur(5px);
                    border: 1px solid var(--glass-border);
                    color: var(--secondary-color);
                    padding: 10px 20px;
                    border-radius: 50px;
                    text-decoration: none;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    cursor: pointer;
                    margin-top: 20px;
                ">
                    <i class="fas fa-arrow-left"></i> Перейти к отзывам
                </button>
            </div>
        `;
        return;
    }
    
    const avatarHTML = generateAvatar(userStats.name);
    const firstReviewDate = new Date(userStats.firstReviewDate).toLocaleDateString('ru-RU');
    const lastReviewDate = new Date(userStats.lastReviewDate).toLocaleDateString('ru-RU');
    
    let userType = '';
    let typeColor = '#3498db';
    
    if (userStats.totalReviews >= 10) {
        userType = 'Эксперт';
        typeColor = '#27ae60';
    } else if (userStats.totalReviews >= 5) {
        userType = 'Активный';
        typeColor = '#3498db';
    } else if (userStats.totalReviews >= 3) {
        userType = 'Участник';
        typeColor = '#9b59b6';
    } else {
        userType = 'Новичок';
        typeColor = '#e74c3c';
    }
    
    let ratingStyleColor = '#3498db';
    switch(userStats.ratingStyle) {
        case 'Добряк': ratingStyleColor = '#27ae60'; break;
        case 'Позитивный': ratingStyleColor = '#2ecc71'; break;
        case 'Объективный': ratingStyleColor = '#3498db'; break;
        case 'Критик': ratingStyleColor = '#f39c12'; break;
        case 'Строгий': ratingStyleColor = '#e74c3c'; break;
    }
    
    profileContent.innerHTML = `
        <div class="profile-header" style="text-align: center; margin-bottom: 30px;">
            ${avatarHTML}
            <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin-bottom: 10px;">
                <h2 style="margin: 0; display: flex; align-items: center; gap: 8px;">
                    ${userStats.name}
                    ${userStats.isVerified ? '<i class="fas fa-check-circle verified-badge" title="Проверенный пользователь"></i>' : ''}
                </h2>
            </div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px; flex-wrap: wrap;">
                <span style="color: #666;">
                    <i class="fas fa-at"></i> ${userStats.nickname}
                </span>
                <span style="background: ${typeColor}15; color: ${typeColor}; padding: 4px 12px; border-radius: 20px; font-size: 0.9rem;">
                    ${userType}
                </span>
                <span style="background: ${ratingStyleColor}15; color: ${ratingStyleColor}; padding: 4px 12px; border-radius: 20px; font-size: 0.9rem;">
                    <i class="fas fa-star"></i> ${userStats.ratingStyle}
                </span>
            </div>
            <div style="color: #888; font-size: 0.9rem;">
                <i class="fas fa-id-card"></i> ID: ${userStats.userId}
            </div>
        </div>
        
        <div class="profile-stats" style="margin-bottom: 40px;">
            <h3 style="margin-bottom: 20px; color: var(--secondary-color);">
                <i class="fas fa-chart-bar"></i> Статистика
            </h3>
            <div class="stats-container" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
                <div class="stat-card glass-effect">
                    <i class="fas fa-comment"></i>
                    <div class="stat-value">${userStats.totalReviews}</div>
                    <div class="stat-label">Всего отзывов</div>
                </div>
                <div class="stat-card glass-effect">
                    <i class="fas fa-star"></i>
                    <div class="stat-value">${userStats.avgRating}</div>
                    <div class="stat-label">Ср. оценка</div>
                </div>
                <div class="stat-card glass-effect">
                    <i class="fas fa-globe"></i>
                    <div class="stat-value">${userStats.uniqueSites}</div>
                    <div class="stat-label">Сайтов оценено</div>
                </div>
                <div class="stat-card glass-effect">
                    <i class="fas fa-chart-pie"></i>
                    <div class="stat-value">${userStats.mostCommonRating}.0</div>
                    <div class="stat-label">Частый рейтинг</div>
                </div>
            </div>
            <div style="text-align: center; margin-top: 20px; color: #666; font-size: 0.9rem;">
                <i class="fas fa-calendar"></i> Активность: ${firstReviewDate} - ${lastReviewDate}
            </div>
        </div>
        
        <div class="profile-reviews">
            <h3 style="margin-bottom: 20px; color: var(--secondary-color);">
                <i class="fas fa-list"></i> Все отзывы пользователя (${userStats.totalReviews})
            </h3>
            <div id="user-reviews-container" class="reviews-container"></div>
        </div>
    `;
    
    const userReviewsContainer = document.getElementById('user-reviews-container');
    if (userReviewsContainer) {
        userReviewsContainer.innerHTML = '';
        userStats.reviews.forEach(review => {
            const card = createReviewCard(review);
            const nameElement = card.querySelector('[data-user-id]');
            if (nameElement) {
                nameElement.style.cursor = 'default';
                nameElement.style.textDecoration = 'none';
                nameElement.removeAttribute('data-user-id');
                nameElement.removeAttribute('onclick');
            }
            userReviewsContainer.appendChild(card);
        });
    }
}

function setupUserProfileLinks() {
    document.addEventListener('click', function(e) {
        let target = e.target;
        
        while (target && !target.hasAttribute('data-user-id') && target !== document.body) {
            target = target.parentElement;
        }
        
        if (target && target.hasAttribute('data-user-id')) {
            e.preventDefault();
            const userId = target.getAttribute('data-user-id');
            switchToPage('profile', userId);
        }
    });
}

function switchToPage(pageId, userId = null) {
    navLinks.forEach(link => link.classList.remove('active'));
    pages.forEach(page => page.classList.remove('active'));
    
    const pageLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (pageLink) {
        pageLink.classList.add('active');
    }
    
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    if (pageId !== 'profile') {
        window.history.pushState({}, '', window.location.pathname);
        localStorage.removeItem('currentProfileId');
    }
    
    switch(pageId) {
        case 'reviews':
            displayAllReviews(reviews);
            break;
        case 'home':
            displaySitesNeedingReviews();
            displayRecommendedSites();
            displaySitesToAvoid();
            break;
        case 'stats':
            updateStatistics();
            displayRatingDistribution();
            displayTopSites();
            setTimeout(() => {
                analyzeTimeStats();
            }, 100);
            break;
        case 'profile':
            if (userId) {
                displayUserProfile(userId);
                window.history.pushState({}, '', `#profile/${userId}`);
                localStorage.setItem('currentProfileId', userId);
            } else {
                document.getElementById('profile-content').innerHTML = `
                    <div style="text-align: center; padding: 40px;">
                        <i class="fas fa-user" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
                        <h3 style="color: #666; margin-bottom: 10px;">Выберите пользователя</h3>
                        <p style="color: #888; margin-bottom: 20px;">Нажмите на имя или никнейм любого пользователя в отзывах, чтобы посмотреть его профиль.</p>
                        <button onclick="switchToPage('reviews')" class="back-to-reviews" style="
                            display: inline-flex;
                            align-items: center;
                            gap: 8px;
                            background: var(--glass-bg);
                            backdrop-filter: blur(5px);
                            border: 1px solid var(--glass-border);
                            color: var(--secondary-color);
                            padding: 10px 20px;
                            border-radius: 50px;
                            text-decoration: none;
                            font-weight: 600;
                            transition: all 0.3s ease;
                            cursor: pointer;
                        ">
                            <i class="fas fa-arrow-left"></i> Перейти к отзывам
                        </button>
                    </div>
                `;
            }
            break;
    }
}

function updateReviewCardsWithLinks() {
    document.querySelectorAll('.review-card').forEach(card => {
        const nameElement = card.querySelector('.reviewer-info h3');
        const nicknameElement = card.querySelector('.reviewer-username');
        
        const reviewId = parseInt(card.getAttribute('data-review-id') || '0');
        const review = reviews.find(r => r.id === reviewId);
        
        if (review && review.email) {
            const userId = generateUserId(review.email);
            
            if (nameElement) {
                nameElement.setAttribute('data-user-id', userId);
                nameElement.style.cursor = 'pointer';
                nameElement.style.textDecoration = 'underline';
                nameElement.style.textDecorationStyle = 'dotted';
                nameElement.style.textUnderlineOffset = '3px';
                nameElement.title = 'Посмотреть профиль пользователя';
            }
            
            if (nicknameElement) {
                nicknameElement.setAttribute('data-user-id', userId);
                nicknameElement.style.cursor = 'pointer';
                nicknameElement.style.textDecoration = 'underline';
                nicknameElement.style.textDecorationStyle = 'dotted';
                nicknameElement.style.textUnderlineOffset = '2px';
                nicknameElement.title = 'Посмотреть профиль пользователя';
            }
        }
    });
}

function handleProfileHash() {
    const hash = window.location.hash;
    
    if (hash.startsWith('#profile/')) {
        const userId = hash.split('/')[1];
        switchToPage('profile', userId);
    }
}

// ==================== ПОДСКАЗКИ САЙТОВ ====================
function suggestSite(siteName, siteUrl) {
    alert(`Предлагаем оценить: ${siteName}\n\nURL: ${siteUrl}\n\nПри переходе в форму, вставьте этот URL в поле "URL сайта"`);
}

// ==================== ПРОГРЕСС-БАР ====================
function updateProgress() {
    const currentCount = reviews.length;
    const percentage = (currentCount / 50) * 100;
    const progressBar = document.getElementById('progress-bar');
    const currentCountEl = document.getElementById('current-count');
    
    if (progressBar && currentCountEl) {
        progressBar.style.width = Math.min(percentage, 100) + '%';
        currentCountEl.textContent = currentCount;
    }
}

// ==================== ОТОБРАЖЕНИЕ САЙТОВ ====================
function displaySitesNeedingReviews() {
    const container = document.getElementById('sites-needing-reviews');
    if (!container) return;
    
    const sitesNeedingReviews = getSitesNeedingReviews();
    
    if (sitesNeedingReviews.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center;">Все сайты имеют достаточно отзывов!</p>';
        return;
    }
    
    container.innerHTML = '';
    
    sitesNeedingReviews.forEach(site => {
        const siteElement = document.createElement('div');
        siteElement.className = 'site-needing-review';
        
        const reasonIcon = getReasonIcon(site.reviewCount, site.daysSinceLastReview, site.avgRating);
        siteElement.innerHTML = `
            <span style="margin-right: 8px; color: #666;">${reasonIcon}</span>
            <span class="site-name">${site.name}</span>
            <span class="site-info">${site.needsReviewsReason}</span>
        `;

        function getReasonIcon(count, days, rating) {
            if (count <= 2) return '<i class="fas fa-exclamation-circle" style="color: #e74c3c;"></i>';
            if (days > 30) return '<i class="fas fa-clock" style="color: #f39c12;"></i>';
            if (rating < 3.0) return '<i class="fas fa-thermometer-empty" style="color: #e74c3c;"></i>';
            return '<i class="fas fa-question-circle" style="color: #3498db;"></i>';
        }
        
        siteElement.addEventListener('click', () => {
            suggestSite(site.name, site.url);
        });
        
        container.appendChild(siteElement);
    });
}

function displayRecommendedSites() {
    const container = document.getElementById('recommended-sites');
    if (!container) return;
    
    const recommendedSites = getRecommendedSites();
    
    if (recommendedSites.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center;">Пока нет сайтов с достаточно высоким рейтингом</p>';
        return;
    }
    
    container.innerHTML = '';
    
    const topSites = recommendedSites.slice(0, 3);
    
    topSites.forEach(site => {
        const siteElement = document.createElement('a');
        siteElement.className = 'recommended-site';
        siteElement.href = site.url;
        siteElement.target = '_blank';
        siteElement.rel = 'noopener noreferrer';
        
        const formattedRating = site.avgRating.toFixed(1);
        
        let starsHTML = '';
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(site.avgRating)) {
                starsHTML += '<i class="fas fa-star" style="font-size: 0.7rem;"></i>';
            } else if (i < site.avgRating) {
                starsHTML += '<i class="fas fa-star-half-alt" style="font-size: 0.7rem;"></i>';
            } else {
                starsHTML += '<i class="far fa-star" style="font-size: 0.7rem;"></i>';
            }
        }
        
        siteElement.innerHTML = `
            <span class="site-name">${site.name}</span>
            <span class="site-rating" title="Средний рейтинг: ${formattedRating}">
                ${starsHTML} ${formattedRating}
            </span>
            <span class="site-count">${site.count} отзыв${site.count === 1 ? '' : site.count >= 5 ? 'ов' : 'а'}</span>
        `;
        
        if (recommendedSites.indexOf(site) === 0) {
            const badge = document.createElement('span');
            badge.className = 'recommended-badge';
            badge.textContent = 'Топ';
            siteElement.appendChild(badge);
        }
        
        container.appendChild(siteElement);
    });
}

function displayFeaturedReviews() {
    const container = document.getElementById('featured-reviews');
    if (!container) return;
    
    const recommended = typeof getPersonalizedReviews !== 'undefined' ? getPersonalizedReviews(3) : getPopularReviews(3);
    
    container.innerHTML = '';
    
    if (recommended.length === 0) {
        container.innerHTML = '<div class="no-results"><i class="fas fa-comment-slash"></i><h3>Отзывов пока нет</h3><p>Будьте первым, кто оставит отзыв!</p></div>';
        return;
    }
    
    const user = localStorage.getItem('siteReview_user');
    const header = document.createElement('div');
    header.style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
        grid-column: 1 / -1;
    `;
    
    if (user) {
        header.innerHTML = `
            <i class="fas fa-magic" style="color: #9b59b6; font-size: 1.2rem;"></i>
            <h3 style="margin: 0; color: var(--secondary-color);">Может вам понравится</h3>
            <span style="
                background: #9b59b6;
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 0.7rem;
            ">Персонально</span>
        `;
    } else {
        header.innerHTML = `
            <i class="fas fa-fire" style="color: #e67e22; font-size: 1.2rem;"></i>
            <h3 style="margin: 0; color: var(--secondary-color);">Популярные отзывы</h3>
            <span style="
                background: #e67e22;
                color: white;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 0.7rem;
            ">Топ недели</span>
        `;
    }
    
    container.appendChild(header);
    
    recommended.forEach(review => {
        container.appendChild(createReviewCard(review));
    });
}

function displayAllReviews(reviewsArray) {
    if (!allReviewsContainer) return;
    
    const sortedReviews = [...reviewsArray].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    allReviewsContainer.innerHTML = '';
    
    if (sortedReviews.length === 0) {
        allReviewsContainer.innerHTML = '<div class="no-results"><i class="fas fa-search"></i><h3>Ничего не найдено</h3><p>Попробуйте изменить параметры поиска</p></div>';
        return;
    }
    
    sortedReviews.forEach(review => {
        allReviewsContainer.appendChild(createReviewCard(review));
    });

    setTimeout(() => {
        updateReviewCardsWithLinks();
    }, 100);
}

function getPopularReviews(limit = 3) {
    return [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
}

// ==================== КАТЕГОРИИ ====================
function getReviewCategories(review) {
    const cats = [];
    const text = (review.siteName + ' ' + review.comment).toLowerCase();
    
    if (typeof categories !== 'undefined') {
        Object.entries(categories).forEach(([catName, filterFunc]) => {
            if (catName !== 'Все' && catName !== 'Критические' && catName !== 'Позитивные') {
                try {
                    if (filterFunc(review)) {
                        cats.push(catName);
                    }
                } catch (e) {}
            }
        });
    }
    
    if (review.rating <= 2 || review.comment.toLowerCase().includes('цензур') || 
        review.comment.toLowerCase().includes('груб') || review.comment.toLowerCase().includes('глуп')) {
        cats.push('Критические');
    } else if (review.rating >= 4 && (review.comment.toLowerCase().includes('лучш') ||
        review.comment.toLowerCase().includes('хорош') || review.comment.toLowerCase().includes('отличн'))) {
        cats.push('Позитивные');
    }
    
    return cats;
}

function getCategoryColor(category) {
    const colors = {
        'Соцсети': '#3498db',
        'Игры': '#9b59b6',
        'Инструменты': '#2ecc71',
        'Магазины': '#e74c3c',
        'Критические': '#f39c12',
        'Позитивные': '#1abc9c',
        'Авторские': '#1abc9c',
        'Все': '#95a5a6'
    };
    return colors[category] || '#95a5a6';
}

function generateRandomTime() {
    const hour = 9 + Math.floor(Math.random() * 9);
    const minute = Math.floor(Math.random() * 60);
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}

// ==================== КАРТОЧКА ОТЗЫВА ====================
function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card glass-effect';

    card.setAttribute('data-review-id', review.id);

    if (review.rating <= 2) {
        card.classList.add('critical');
    }
    
    const date = new Date(review.date);
    const formattedDate = date.toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    let formattedTime = '';
    if (review.date.includes('T')) {
        const timeParts = review.date.split('T')[1];
        formattedTime = timeParts.substring(0, 5);
    } else {
        formattedTime = generateRandomTime();
    }
    
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= review.rating) {
            starsHTML += '<i class="fas fa-star star filled"></i>';
        } else {
            starsHTML += '<i class="far fa-star star"></i>';
        }
    }
    
    let domain = review.siteUrl;
    try {
        const url = new URL(review.siteUrl);
        domain = url.hostname.replace('www.', '');
    } catch (e) {}

    const displayNickname = getDisplayNickname(review);
    
    let likeStats = { likes: 0, dislikes: 0 };
    let userVote = null;
    
    if (typeof likesStorage !== 'undefined' && likesStorage) {
        try {
            likeStats = likesStorage.getReviewStats ? likesStorage.getReviewStats(review.id) : { likes: 0, dislikes: 0 };
            const userLikes = likesStorage.getUserLikes ? likesStorage.getUserLikes() : {};
            userVote = userLikes[review.id];
        } catch (e) {
            console.warn('Ошибка получения лайков:', e);
        }
    }
            
    card.innerHTML = `
        <div class="review-header">
            <div class="reviewer-info">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <h3 style="margin: 0;">${review.name}</h3>
                    ${review.verified ? '<i class="fas fa-check-circle verified-badge"></i>' : ''}
                </div>
                <div class="reviewer-username">
                    <i class="fas fa-at"></i> ${displayNickname}
                </div>
            </div>
            <div class="rating-value">${review.rating}.0</div>
        </div>
        
        <div class="review-site">
            <i class="fas fa-link"></i> 
            <a href="${review.siteUrl}" target="_blank" rel="noopener">${review.siteName} (${domain})</a>
        </div>
        
        <div class="rating">
            <div class="stars">${starsHTML}</div>
        </div>
        
        <div class="review-text">${review.comment}</div>
        
        <div class="review-actions" style="
            display: flex;
            align-items: center;
            gap: 15px;
            margin: 15px 0 10px;
            padding-top: 10px;
            border-top: 1px solid rgba(0,0,0,0.05);
        ">
            <button class="like-btn ${userVote === 'like' ? 'active' : ''}" data-review-id="${review.id}" data-type="like" style="
                background: none;
                border: none;
                display: flex;
                align-items: center;
                gap: 5px;
                cursor: pointer;
                color: ${userVote === 'like' ? '#27ae60' : '#666'};
                font-size: 0.9rem;
                transition: all 0.2s;
            ">
                <i class="fas fa-thumbs-up"></i>
                <span class="likes-count">${likeStats.likes}</span>
            </button>
            
            <button class="dislike-btn ${userVote === 'dislike' ? 'active' : ''}" data-review-id="${review.id}" data-type="dislike" style="
                background: none;
                border: none;
                display: flex;
                align-items: center;
                gap: 5px;
                cursor: pointer;
                color: ${userVote === 'dislike' ? '#e74c3c' : '#666'};
                font-size: 0.9rem;
                transition: all 0.2s;
            ">
                <i class="fas fa-thumbs-down"></i>
                <span class="dislikes-count">${likeStats.dislikes}</span>
            </button>
            
            <button class="similar-btn" data-review-id="${review.id}" style="
                margin-left: auto;
                background: none;
                border: none;
                color: #3498db;
                cursor: pointer;
                font-size: 0.85rem;
                display: flex;
                align-items: center;
                gap: 5px;
            ">
                <i class="fas fa-project-diagram"></i> Похожие
            </button>
        </div>
        
        <div class="review-date">${formattedDate} • ${formattedTime}</div>
    `;

    addWarningLabels(card, review);

    const reviewCategories = getReviewCategories(review);
    if (reviewCategories.length > 0) {
        const tagsHtml = reviewCategories.map(cat => 
            `<span class="category-tag" style="
                display: inline-block;
                background: ${getCategoryColor(cat)}15;
                color: ${getCategoryColor(cat)};
                padding: 3px 10px;
                border-radius: 12px;
                font-size: 0.75rem;
                margin-right: 5px;
                border: 1px solid ${getCategoryColor(cat)}30;
            ">${cat}</span>`
        ).join('');
        
        const tagsDiv = `<div class="review-tags" style="margin: 8px 0 12px 0;">${tagsHtml}</div>`;
        const reviewTextDiv = card.querySelector('.review-text');
        if (reviewTextDiv) {
            reviewTextDiv.insertAdjacentHTML('beforebegin', tagsDiv);
        }
    }
    
    setTimeout(() => {
        const likeBtn = card.querySelector('.like-btn');
        const dislikeBtn = card.querySelector('.dislike-btn');
        const similarBtn = card.querySelector('.similar-btn');
        
        if (likeBtn) {
            likeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof handleLikeClick !== 'undefined') {
                    handleLikeClick(e, card);
                } else {
                    console.warn('Функция handleLikeClick не найдена');
                    alert('Функция лайков временно недоступна');
                }
            });
        }
        
        if (dislikeBtn) {
            dislikeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof handleLikeClick !== 'undefined') {
                    handleLikeClick(e, card);
                } else {
                    console.warn('Функция handleLikeClick не найдена');
                    alert('Функция дизлайков временно недоступна');
                }
            });
        }
        
        if (similarBtn) {
            similarBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (typeof showSimilarReviews !== 'undefined') {
                    showSimilarReviews(review.id);
                } else {
                    console.warn('Функция showSimilarReviews не найдена');
                    alert('Функция похожих отзывов временно недоступна');
                }
            });
        }
    }, 0);
    
    return card;
}

// ==================== ОПРЕДЕЛЕНИЕ АВТОРОВ GITHUB PAGES ====================
function isGitHubPagesAuthor(review) {
    try {
        const url = new URL(review.siteUrl);
        const hostname = url.hostname.toLowerCase();
        
        if (hostname.endsWith('.github.io')) {
            const githubUsername = hostname.replace('.github.io', '').toLowerCase();
            
            const displayNickname = getDisplayNickname(review).toLowerCase();
            if (displayNickname.includes(githubUsername) || githubUsername.includes(displayNickname)) {
                return true;
            }
            
            if (review.email) {
                const emailLower = review.email.toLowerCase();
                const emailUser = emailLower.split('@')[0];
                
                if (emailUser.includes(githubUsername) || githubUsername.includes(emailUser) || emailLower.includes(githubUsername)) {
                    return true;
                }
            }
            
            if (review.nickname) {
                const nicknameLower = review.nickname.toLowerCase();
                if (nicknameLower.includes(githubUsername) || githubUsername.includes(nicknameLower)) {
                    return true;
                }
            }
            
            if (review.name) {
                const nameLower = review.name.toLowerCase();
                if (nameLower.includes(githubUsername) || githubUsername.includes(nameLower)) {
                    return true;
                }
            }
        }
        
        return false;
    } catch (e) {
        return false;
    }
}

// ==================== ПРЕДУПРЕЖДЕНИЯ ====================
function addWarningLabels(cardElement, review) {
    const warnings = [];
    
    if (review.rating <= 2) {
        warnings.push({
            text: 'Низкий рейтинг',
            icon: 'fas fa-exclamation-triangle',
            color: '#e74c3c'
        });
    }
    
    const negativeWords = ['плохой', 'ужасный', 'кошмар', 'не советую', 'избегайте', 'мусор', 'говно', 'дерьмо', 'отстой'];
    const hasNegative = negativeWords.some(word => review.comment.toLowerCase().includes(word));
    if (hasNegative && review.rating <= 3) {
        warnings.push({
            text: 'Резко негативный',
            icon: 'fas fa-fire',
            color: '#f39c12'
        });
    }
    
    const isAuthor = review.comment.includes('мой сайт') || review.comment.includes('я автор') || isGitHubPagesAuthor(review);
    if (isAuthor && review.rating >= 4) {
        warnings.push({
            text: 'Автор оцениваемого сайта',
            icon: 'fas fa-user-edit',
            color: '#3CB371'
        });
    }

    const isOwner = review.name === 'Константин' && review.email === 'timosha.sibilev@gmail.com';
    if (isOwner) {
        warnings.push({
            text: 'Автор SiteReview',
            icon: 'fas fa-user-edit',
            color: '#1E90FF'
        });
    }
    
    const personalAttacks = ['дурак', 'идиот', 'тупой', 'грубый', 'глупый', 'грубым', 'глупым', 'тупым', 'глуп', 'туп', 'лох'];
    const hasPersonal = personalAttacks.some(word => review.comment.toLowerCase().includes(word));
    if (hasPersonal) {
        warnings.push({
            text: 'Личный конфликт',
            icon: 'fas fa-user-times',
            color: '#9b59b6'
        });
    }
    
    if (warnings.length > 0) {
        const warningContainer = document.createElement('div');
        warningContainer.className = 'warning-container';
        
        warnings.forEach(warning => {
            const badge = document.createElement('span');
            badge.className = 'warning-badge';
            badge.style.cssText = `
                display: inline-flex;
                align-items: center;
                gap: 5px;
                background: ${warning.color}15;
                color: ${warning.color};
                padding: 4px 10px;
                border-radius: 12px;
                font-size: 0.8rem;
                border: 1px solid ${warning.color}30;
                white-space: nowrap;
                margin: 2px 0;
            `;
            badge.innerHTML = `<i class="${warning.icon}"></i> ${warning.text}`;
            warningContainer.appendChild(badge);
        });
        
        const header = cardElement.querySelector('.review-header');
        if (header) {
            header.parentNode.insertBefore(warningContainer, header.nextSibling);
        }
    }
}

// ==================== ПОИСК И ФИЛЬТРЫ ====================
function setupSearchAndFilters() {
    populateFilterOptions();
    
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performAdvancedSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') performAdvancedSearch();
        });
    }
    
    document.getElementById('reset-search-btn')?.addEventListener('click', resetAllFilters);
    document.getElementById('rating-filter')?.addEventListener('change', performAdvancedSearch);
    document.getElementById('author-filter')?.addEventListener('change', performAdvancedSearch);
    document.getElementById('site-filter')?.addEventListener('change', performAdvancedSearch);
    document.getElementById('verified-only')?.addEventListener('change', performAdvancedSearch);
    document.getElementById('critical-only')?.addEventListener('change', performAdvancedSearch);
    document.getElementById('positive-only')?.addEventListener('change', performAdvancedSearch);
    document.getElementById('clear-all-filters')?.addEventListener('click', resetAllFilters);
}

function populateFilterOptions() {
    const uniqueAuthors = [...new Set(reviews.map(review => review.name))];
    const authorSelect = document.getElementById('author-filter');
    
    if (authorSelect) {
        const selectedAuthor = authorSelect.value;
        authorSelect.innerHTML = '<option value="all">Все авторы</option>';
        uniqueAuthors.sort().forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorSelect.appendChild(option);
        });
        if (selectedAuthor && selectedAuthor !== 'all') {
            authorSelect.value = selectedAuthor;
        }
    }
    
    const uniqueSites = [...new Set(reviews.map(review => review.siteName))];
    const siteSelect = document.getElementById('site-filter');
    
    if (siteSelect) {
        const selectedSite = siteSelect.value;
        siteSelect.innerHTML = '<option value="all">Все сайты</option>';
        uniqueSites.sort().forEach(site => {
            const option = document.createElement('option');
            option.value = site;
            option.textContent = site;
            siteSelect.appendChild(option);
        });
        if (selectedSite && selectedSite !== 'all') {
            siteSelect.value = selectedSite;
        }
    }
}

function performAdvancedSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const ratingFilter = document.getElementById('rating-filter').value;
    const authorFilter = document.getElementById('author-filter').value;
    const siteFilter = document.getElementById('site-filter').value;
    const verifiedOnly = document.getElementById('verified-only').checked;
    const criticalOnly = document.getElementById('critical-only').checked;
    const positiveOnly = document.getElementById('positive-only').checked;
    
    let filteredReviews = reviews.filter(review => {
        let matchesSearch = true;
        if (searchTerm) {
            const displayNickname = getDisplayNickname(review).toLowerCase();
            matchesSearch = (
                review.name.toLowerCase().includes(searchTerm) ||
                displayNickname.includes(searchTerm) ||
                review.siteName.toLowerCase().includes(searchTerm) ||
                review.comment.toLowerCase().includes(searchTerm)
            );
        }
        
        let matchesRating = true;
        if (ratingFilter !== 'all') {
            matchesRating = review.rating === parseInt(ratingFilter);
        }
        
        let matchesAuthor = true;
        if (authorFilter !== 'all') {
            matchesAuthor = review.name === authorFilter;
        }
        
        let matchesSite = true;
        if (siteFilter !== 'all') {
            matchesSite = review.siteName === siteFilter;
        }
        
        let matchesVerified = true;
        if (verifiedOnly) {
            matchesVerified = review.verified === true;
        }
        
        let matchesCritical = true;
        if (criticalOnly) {
            matchesCritical = review.rating <= 2;
        }
        
        let matchesPositive = true;
        if (positiveOnly) {
            matchesPositive = review.rating >= 4;
        }
        
        return matchesSearch && matchesRating && matchesAuthor && matchesSite && matchesVerified && matchesCritical && matchesPositive;
    });
    
    filteredReviews = filteredReviews.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    displayAllReviews(filteredReviews);
    showSearchResultsInfo(filteredReviews.length, searchTerm);
}

function showSearchResultsInfo(count, searchTerm) {
    const resultsInfo = document.getElementById('search-results-info');
    const resultsCount = document.getElementById('results-count');
    
    if (resultsInfo && resultsCount) {
        resultsCount.textContent = count;
        
        if (count > 0 || searchTerm || hasActiveFilters()) {
            resultsInfo.style.display = 'block';
        } else {
            resultsInfo.style.display = 'none';
        }
    }
}

function hasActiveFilters() {
    const ratingFilter = document.getElementById('rating-filter').value;
    const authorFilter = document.getElementById('author-filter').value;
    const siteFilter = document.getElementById('site-filter').value;
    const verifiedOnly = document.getElementById('verified-only').checked;
    const criticalOnly = document.getElementById('critical-only').checked;
    const positiveOnly = document.getElementById('positive-only').checked;
    
    return (
        ratingFilter !== 'all' ||
        authorFilter !== 'all' ||
        siteFilter !== 'all' ||
        verifiedOnly ||
        criticalOnly ||
        positiveOnly
    );
}

function resetAllFilters() {
    if (searchInput) {
        searchInput.value = '';
    }
    
    document.getElementById('rating-filter').value = 'all';
    document.getElementById('author-filter').value = 'all';
    document.getElementById('site-filter').value = 'all';
    document.getElementById('verified-only').checked = false;
    document.getElementById('critical-only').checked = false;
    document.getElementById('positive-only').checked = false;
    document.getElementById('search-results-info').style.display = 'none';
    
    displayAllReviews(reviews);
}

function updateSearchResultsCount(count, searchTerm) {
    const oldCountEl = document.getElementById('search-results-count');
    if (oldCountEl) oldCountEl.remove();
    
    if (count === 0) return;
    
    const resultsCountEl = document.createElement('div');
    resultsCountEl.id = 'search-results-count';
    resultsCountEl.className = 'search-results-info';
    resultsCountEl.style.cssText = `
        margin: 10px 0 20px 0;
        padding: 10px 15px;
        background: linear-gradient(135deg, rgba(52, 152, 219, 0.1), rgba(41, 128, 185, 0.1));
        border-radius: 10px;
        font-size: 0.9rem;
        border-left: 4px solid var(--primary-color);
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    `;
    
    resultsCountEl.innerHTML = `
        <i class="fas fa-search" style="color: var(--primary-color); font-size: 1rem;"></i>
        <span>Найдено <strong style="color: var(--primary-color);">${count}</strong> отзывов по запросу "<strong style="color: #2c3e50;">${searchTerm}</strong>"</span>
    `;
    
    const resetBtn = document.createElement('button');
    resetBtn.innerHTML = '<i class="fas fa-times"></i> Очистить поиск';
    resetBtn.style.cssText = `
        margin-left: auto;
        background: rgba(231, 76, 60, 0.1);
        color: #e74c3c;
        border: none;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 0.85rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 5px;
        transition: all 0.2s;
    `;
    
    resetBtn.addEventListener('mouseenter', function() {
        this.style.background = 'rgba(231, 76, 60, 0.2)';
    });
    
    resetBtn.addEventListener('mouseleave', function() {
        this.style.background = 'rgba(231, 76, 60, 0.1)';
    });
    
    resetBtn.addEventListener('click', function() {
        resetSearch();
    });
    
    resultsCountEl.appendChild(resetBtn);
    
    const reviewsPage = document.getElementById('reviews-page');
    if (reviewsPage) {
        const allReviewsHeader = reviewsPage.querySelector('.page-header h1, .section-header');
        if (allReviewsHeader) {
            allReviewsHeader.parentNode.insertBefore(resultsCountEl, allReviewsHeader.nextSibling);
        } else {
            allReviewsContainer.insertBefore(resultsCountEl, allReviewsContainer.firstChild);
        }
    }
}

function resetSearch() {
    if (searchInput) {
        searchInput.value = '';
        const resultsCountEl = document.getElementById('search-results-count');
        if (resultsCountEl) {
            resultsCountEl.remove();
        }
        displayAllReviews(reviews);
        
        const allCategoryBtn = document.querySelector('.category-btn[data-category="Все"]');
        if (allCategoryBtn) {
            allCategoryBtn.click();
        }
        
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        const recentFilter = document.querySelector('.filter-btn[data-filter="recent"]');
        if (recentFilter) {
            recentFilter.classList.add('active');
        }
    }
}

function applyFilters() {
    const activeFilter = document.querySelector('.filter-btn.active')?.getAttribute('data-filter') || 'recent';
    let filteredReviews = [...reviews];
    
    switch (activeFilter) {
        case 'recent':
            filteredReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            filteredReviews = [...reviews].sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'all':
            filteredReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
    }
    
    displayAllReviews(filteredReviews);
}

// ==================== КАТЕГОРИИ КНОПКИ ====================
function createCategoryButtons() {
    const container = document.getElementById('category-buttons');
    if (!container || typeof categories === 'undefined') return;
    
    const categoryCounts = {};
    Object.keys(categories).forEach(category => {
        if (category === 'Все') {
            categoryCounts[category] = reviews.length;
        } else {
            categoryCounts[category] = reviews.filter(categories[category]).length;
        }
    });
    
    container.innerHTML = '';
    
    Object.entries(categoryCounts).forEach(([category, count]) => {
        if (count === 0 && category !== 'Все') return;
        
        const button = document.createElement('button');
        button.className = 'category-btn';
        button.dataset.category = category;
        button.innerHTML = `
            <span class="category-name">${category}</span>
            <span class="category-count">${count}</span>
        `;
        
        if (category === 'Все') {
            button.classList.add('active');
            button.style.backgroundColor = 'var(--primary-color)';
            button.style.color = 'white';
        }
        
        button.addEventListener('click', () => {
            filterByCategory(category);
            updateActiveButton(button);
            updateCategoryInfo(category, count);
        });
        
        container.appendChild(button);
    });
}

function filterByCategory(category) {
    const filteredReviews = reviews.filter(categories[category]);
    const sortedReviews = [...filteredReviews].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    displayAllReviews(sortedReviews);
    
    const infoPanel = document.getElementById('selected-category');
    if (category === 'Все') {
        infoPanel.style.display = 'none';
    } else {
        infoPanel.style.display = 'block';
    }
}

function updateActiveButton(clickedButton) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
        btn.style.color = 'var(--secondary-color)';
    });
    
    clickedButton.classList.add('active');
    clickedButton.style.backgroundColor = 'var(--primary-color)';
    clickedButton.style.color = 'white';
}

function updateCategoryInfo(category, count) {
    document.getElementById('current-category-name').textContent = category;
    document.getElementById('category-count').textContent = count;
}

document.getElementById('clear-filter')?.addEventListener('click', () => {
    filterByCategory('Все');
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
        btn.style.color = 'var(--secondary-color)';
    });
    
    const allButton = document.querySelector('.category-btn[data-category="Все"]');
    if (allButton) {
        allButton.classList.add('active');
        allButton.style.backgroundColor = 'var(--primary-color)';
        allButton.style.color = 'white';
    }
    
    document.getElementById('selected-category').style.display = 'none';
});

// ==================== СТАТИСТИКА ====================
function updateStatistics() {
    const totalReviews = reviews.length;
    const avgRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);
    const uniqueSites = [...new Set(reviews.map(review => review.siteUrl))].length;
    const uniqueAuthors = [...new Set(reviews.map(review => review.email))].length;
    
    if (totalReviewsEl) totalReviewsEl.textContent = totalReviews;
    if (uniqueSitesEl) uniqueSitesEl.textContent = uniqueSites;
    if (totalReviewersEl) totalReviewersEl.textContent = uniqueAuthors;
    if (avgRatingEl) avgRatingEl.textContent = avgRating;
    
    if (statsTotalReviewsEl) statsTotalReviewsEl.textContent = totalReviews;
    if (statsAvgRatingEl) statsAvgRatingEl.textContent = avgRating;
    if (statsReviewersEl) statsReviewersEl.textContent = uniqueAuthors;
    if (statsSitesEl) statsSitesEl.textContent = uniqueSites;

    setTimeout(() => {
        displayTopSites();
        displayTopUsers();
        displayRatingDistribution();
    }, 100);
}

function displayRatingDistribution() {
    if (!ratingDistribution) return;
    
    const ratingCounts = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
    
    reviews.forEach(review => {
        ratingCounts[review.rating]++;
    });
    
    ratingDistribution.innerHTML = '';
    
    for (let rating = 5; rating >= 1; rating--) {
        const count = ratingCounts[rating];
        const percentage = reviews.length > 0 ? Math.round((count / reviews.length) * 100) : 0;
        
        const bar = document.createElement('div');
        bar.style.cssText = 'display: flex; align-items: center; gap: 15px;';
        
        let starsHTML = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHTML += '<i class="fas fa-star" style="color: #FFD700;"></i>';
            } else {
                starsHTML += '<i class="far fa-star" style="color: #ddd;"></i>';
            }
        }
        
        bar.innerHTML = `
            <div style="width: 100px; text-align: center;">${starsHTML}</div>
            <div style="flex-grow: 1; height: 20px; background: rgba(0,0,0,0.1); border-radius: 10px; overflow: hidden;">
                <div style="width: ${percentage}%; height: 100%; background: linear-gradient(90deg, var(--primary-light), var(--primary-color)); border-radius: 10px;"></div>
            </div>
            <div style="width: 80px; text-align: right; font-weight: 600;">${count} (${percentage}%)</div>
        `;
        
        ratingDistribution.appendChild(bar);
    }
}

// ==================== ТОП САЙТОВ ====================
function displayTopSites() {
    let topSitesContainer = document.getElementById('top-sites-container');
    
    if (!topSitesContainer) {
        const statsPage = document.getElementById('stats-page');
        if (!statsPage) return;
        
        const sectionHTML = `
            <div style="margin-top: 40px;">
                <h3 style="margin-bottom: 20px; color: var(--secondary-color);">
                    <i class="fas fa-trophy"></i> Рейтинги сайтов и пользователей
                </h3>
                <div class="two-columns-container">
                    <div class="ranking-column sites-ranking">
                        <div class="ranking-header glass-effect" style="padding: 15px 20px;">
                            <h3>
                                <i class="fas fa-globe"></i> Топ сайтов
                            </h3>
                            <span class="ranking-count" id="sites-count">0 сайтов</span>
                        </div>
                        <div id="top-sites-container"></div>
                    </div>
                    
                    <div class="ranking-column users-ranking">
                        <div class="ranking-header glass-effect" style="padding: 15px 20px;">
                            <h3>
                                <i class="fas fa-users"></i> Топ пользователей
                            </h3>
                            <span class="ranking-count" id="users-count">0 пользователей</span>
                        </div>
                        <div id="top-users-container"></div>
                    </div>
                </div>
            </div>
        `;
        
        const statsContainer = statsPage.querySelector('.glass-effect');
        if (statsContainer) {
            const ratingDist = statsPage.querySelector('#rating-distribution');
            if (ratingDist && ratingDist.parentNode) {
                ratingDist.parentNode.insertAdjacentHTML('afterend', sectionHTML);
            } else {
                statsContainer.insertAdjacentHTML('beforeend', sectionHTML);
            }
        }
        
        topSitesContainer = document.getElementById('top-sites-container');
    }
    
    if (typeof calculateSiteRatings === 'undefined') return;
    
    const siteStats = calculateSiteRatings();
    
    if (siteStats.length === 0) {
        topSitesContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Недостаточно данных для рейтинга</p>';
        return;
    }
    
    document.getElementById('sites-count').textContent = `${Math.min(siteStats.length, 10)} сайтов`;
    const topSites = siteStats.slice(0, 10);
    
    topSitesContainer.innerHTML = '';
    
    topSites.forEach((site, index) => {
        const siteCard = createSiteRankingCard(site, index + 1);
        topSitesContainer.appendChild(siteCard);
    });
    
    displayTopUsers();
}

function calculateSiteRatings() {
    if (typeof reviews === 'undefined') return [];
    
    const siteMap = {};
    
    reviews.forEach(review => {
        if (!siteMap[review.siteUrl]) {
            siteMap[review.siteUrl] = {
                url: review.siteUrl,
                name: review.siteName,
                totalRating: 0,
                count: 0,
                reviews: [],
                authorReviews: 0,
                regularReviews: 0
            };
        }
        
        const isAuthorReview = (typeof isGitHubPagesAuthor !== 'undefined' && isGitHubPagesAuthor(review)) || 
                              review.comment.includes('мой сайт') || 
                              review.comment.includes('я автор');
        
        siteMap[review.siteUrl].totalRating += review.rating;
        siteMap[review.siteUrl].count++;
        
        if (isAuthorReview) {
            siteMap[review.siteUrl].authorReviews++;
        } else {
            siteMap[review.siteUrl].regularReviews++;
        }
        
        siteMap[review.siteUrl].reviews.push({
            rating: review.rating,
            date: review.date,
            isAuthorReview: isAuthorReview,
            reviewer: review.name
        });
    });
    
    const sites = Object.values(siteMap)
        .filter(site => site.count >= 1)
        .map(site => {
            const avgRating = site.totalRating / site.count;
            
            const authorPenalty = typeof calculateAuthorPenalty !== 'undefined' ? 
                calculateAuthorPenalty(site.authorReviews, site.regularReviews) : 0;
            
            let lowReviewPenalty = 0;
            if (site.count === 1) lowReviewPenalty = 3.0;
            if (site.count === 2) lowReviewPenalty = 2.0;
            if (site.count === 3) lowReviewPenalty = 1.0;
            
            let popularityBonus = 0;
            if (site.count >= 8) popularityBonus = 0.2;
            if (site.count >= 15) popularityBonus = 0.4;
            
            let controversyPenalty = 0;
            if (site.count >= 3 && typeof calculateStandardDeviation !== 'undefined') {
                const ratings = site.reviews.map(r => r.rating);
                const std = calculateStandardDeviation(ratings);
                if (std > 1.5) controversyPenalty = 0.2;
                if (std > 2.0) controversyPenalty = 0.4;
            }
            
            let stabilityBonus = 0;
            if (site.count >= 3 && typeof calculateStandardDeviation !== 'undefined') {
                const ratings = site.reviews.map(r => r.rating);
                const std = calculateStandardDeviation(ratings);
                if (std < 0.8) stabilityBonus = 0.2;
            }
            
            let honestRating = avgRating;
            honestRating += popularityBonus;
            honestRating += stabilityBonus;
            honestRating -= authorPenalty;
            honestRating -= lowReviewPenalty;
            honestRating -= controversyPenalty;
            
            return {
                ...site,
                avgRating: avgRating,
                formattedRating: avgRating.toFixed(1),
                weightedScore: Math.max(honestRating, 0.1),
                honestRating: Math.max(honestRating, 0.1),
                authorPenalty: authorPenalty.toFixed(2),
                lowReviewPenalty: lowReviewPenalty.toFixed(1),
                controversyPenalty: controversyPenalty.toFixed(1),
                popularityBonus: popularityBonus.toFixed(1),
                stabilityBonus: stabilityBonus.toFixed(1),
                authorPercentage: site.count > 0 ? (site.authorReviews / site.count * 100).toFixed(0) : 0,
                lastReview: site.reviews.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date
            };
        })
        .sort((a, b) => b.honestRating - a.honestRating);
    
    return sites;
}

function calculateAuthorPenalty(authorCount, regularCount) {
    if (authorCount === 0) return 0;
    
    const total = authorCount + regularCount;
    const authorRatio = authorCount / total;
    
    let penalty = 0;
    
    if (authorRatio >= 0.5) {
        penalty = 1.5 + (authorRatio * 1.0);
    } else if (authorRatio >= 0.25) {
        penalty = 0.5 + (authorRatio * 2.0);
    } else if (authorRatio > 0) {
        penalty = authorRatio * 2.0;
    }
    
    if (regularCount === 0) {
        penalty += 1.0;
    }
    
    return penalty;
}

function calculateStandardDeviation(numbers) {
    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    const variance = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length;
    return Math.sqrt(variance);
}

function createSiteRankingCard(site, position) {
    const card = document.createElement('div');
    card.className = 'ranking-card glass-effect';
    
    if (position <= 3) {
        card.classList.add(`top-${position}`);
    }
    
    let rankIcon = '';
    if (position === 1) {
        rankIcon = '<i class="fas fa-crown" style="color: #FFD700;"></i>';
    } else if (position === 2) {
        rankIcon = '<i class="fas fa-medal" style="color: #C0C0C0;"></i>';
    } else if (position === 3) {
        rankIcon = '<i class="fas fa-award" style="color: #CD7F32;"></i>';
    } else {
        rankIcon = `<span style="color: var(--secondary-color);">${position}</span>`;
    }
    
    let domain = site.url;
    try {
        const url = new URL(site.url);
        domain = url.hostname.replace('www.', '');
    } catch (e) {}
    
    let starsHTML = '';
    const fullStars = Math.floor(site.avgRating);
    const hasHalfStar = site.avgRating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<i class="fas fa-star" style="color: #FFD700; font-size: 0.9rem;"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt" style="color: #FFD700; font-size: 0.9rem;"></i>';
        } else {
            starsHTML += '<i class="far fa-star" style="color: #ddd; font-size: 0.9rem;"></i>';
        }
    }
    
    card.innerHTML = `
        <div style="display: flex; align-items: center; width: 100%;">
            <div class="ranking-position">
                ${rankIcon}
            </div>
            
            <div class="ranking-content">
                <h4 class="ranking-title">
                    <a href="${site.url}" target="_blank" rel="noopener" 
                       style="color: inherit; text-decoration: none;"
                       onmouseover="this.style.textDecoration='underline'"
                       onmouseout="this.style.textDecoration='none'">
                        ${site.name}
                    </a>
                </h4>
                
                <div class="ranking-subtitle">
                    <i class="fas fa-globe" style="font-size: 0.8rem;"></i>
                    <span title="${site.url}" style="margin-left: 5px;">${domain.length > 25 ? domain.substring(0, 25) + '...' : domain}</span>
                </div>
                
                <div class="ranking-stats">
                    <div class="stat-badge">
                        <i class="fas fa-star"></i> ${site.formattedRating}/5
                    </div>
                    <div class="stat-badge">
                        <i class="fas fa-comment"></i> ${site.count} отзыв${site.count === 1 ? '' : site.count >= 5 ? 'ов' : 'а'}
                    </div>
                </div>
            </div>
        </div>
        
        ${position <= 3 ? `
        <div class="top-badge" style="background: ${position === 1 ? '#FFD700' : position === 2 ? '#C0C0C0' : '#CD7F32'}; color: ${position === 1 ? '#333' : 'white'};">
            ${position === 1 ? 'ЛУЧШИЙ' : position === 2 ? 'Топ-2' : 'Топ-3'}
        </div>
        ` : ''}
    `;
    
    return card;
}

function displayTopUsers() {
    const topUsersContainer = document.getElementById('top-users-container');
    if (!topUsersContainer) return;
    
    if (typeof calculateUserRatings === 'undefined') return;
    
    const userStats = calculateUserRatings();
    
    if (userStats.length === 0) {
        topUsersContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Нет данных о пользователях</p>';
        return;
    }
    
    document.getElementById('users-count').textContent = `${Math.min(userStats.length, 10)} пользователей`;
    const topUsers = userStats.slice(0, 10);
    
    topUsersContainer.innerHTML = '';
    
    topUsers.forEach((user, index) => {
        const userCard = createUserRankingCard(user, index + 1);
        topUsersContainer.appendChild(userCard);
    });
}

function calculateUserRatings() {
    const userMap = {};
    
    reviews.forEach(review => {
        const userKey = review.email || review.name;
        const displayNickname = getDisplayNickname(review);
        
        if (!userMap[userKey]) {
            userMap[userKey] = {
                name: review.name,
                email: review.email,
                nickname: displayNickname,
                totalRating: 0,
                count: 0,
                reviews: [],
                sitesReviewed: new Set(),
                authorReviews: 0,
                regularReviews: 0,
                avgUserRating: 0,
                consistency: 0
            };
        }
        
        const isAuthorReview = (typeof isGitHubPagesAuthor !== 'undefined' && isGitHubPagesAuthor(review)) || 
                              review.comment.includes('мой сайт') || 
                              review.comment.includes('я автор');
        
        userMap[userKey].totalRating += review.rating;
        userMap[userKey].count++;
        userMap[userKey].reviews.push({
            rating: review.rating,
            site: review.siteName,
            date: review.date,
            comment: review.comment,
            isAuthorReview: isAuthorReview,
            url: review.siteUrl,
            verified: review.verified || false,
            length: review.comment.length
        });
        userMap[userKey].sitesReviewed.add(review.siteUrl);
        
        if (isAuthorReview) {
            userMap[userKey].authorReviews++;
        } else {
            userMap[userKey].regularReviews++;
        }
    });
    
    const users = Object.values(userMap)
        .filter(user => user.count >= 1)
        .map(user => {
            const avgUserRating = user.totalRating / user.count;
            
            const ratings = user.reviews.map(r => r.rating);
            const mean = avgUserRating;
            const variance = ratings.reduce((sum, rating) => sum + Math.pow(rating - mean, 2), 0) / ratings.length;
            const consistency = 5 - Math.sqrt(variance);
            
            const authorPenalty = typeof calculateAuthorPenalty !== 'undefined' ? 
                calculateAuthorPenalty(user.authorReviews, user.regularReviews) : 0;
            
            const activityScore = Math.min(user.count / 10, 1) * 2;
            const consistencyScore = consistency;
            const diversityScore = Math.min(user.sitesReviewed.size / 5, 1);
            
            let qualityBonus = 0;
            const longReviews = user.reviews.filter(r => r.comment.length > 100).length;
            qualityBonus += longReviews * 0.2;
            
            const verifiedCount = user.reviews.filter(r => r.verified === true).length;
            if (verifiedCount > 0) {
                qualityBonus += (verifiedCount / user.count) * 0.5;
            }
            
            const uniqueRatings = new Set(user.reviews.map(r => r.rating)).size;
            if (uniqueRatings >= 3 && user.count >= 3) {
                qualityBonus += 0.15;
            }
            if (uniqueRatings >= 4) {
                qualityBonus += 0.1;
            }
            
            const cleanReviews = user.reviews.filter(r => 
                !r.comment.includes('груб') && 
                !r.comment.includes('глуп') && 
                !r.comment.includes('лох') &&
                !r.comment.includes('тупой')
            ).length;
            qualityBonus += (cleanReviews / user.count) * 0.1;
            
            let qualityPenalty = 0;
            const shortReviews = user.reviews.filter(r => r.comment.length < 20).length;
            qualityPenalty += shortReviews * 0.12;
            
            if (uniqueRatings <= 1 && user.count >= 3) {
                qualityPenalty += 0.3;
            }
            if (uniqueRatings <= 2 && user.count >= 5) {
                qualityPenalty += 0.1;
            }
            
            if (user.reviews.length > 0) {
                const lastDate = new Date(user.reviews.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date);
                const daysSinceLast = (new Date() - lastDate) / (1000 * 60 * 60 * 24);
                if (daysSinceLast > 30) {
                    qualityPenalty += 0.5;
                }
            }
            
            let userScore = activityScore + consistencyScore + diversityScore;
            userScore = userScore - authorPenalty + qualityBonus - qualityPenalty;
            userScore = Math.max(userScore, 0.1);
            
            return {
                ...user,
                avgUserRating: avgUserRating,
                formattedAvgRating: avgUserRating.toFixed(1),
                consistency: consistency,
                consistencyFormatted: consistency.toFixed(1),
                sitesCount: user.sitesReviewed.size,
                userScore: userScore,
                authorPenalty: authorPenalty,
                qualityBonus: qualityBonus.toFixed(2),
                qualityPenalty: qualityPenalty.toFixed(2),
                authorPercentage: user.count > 0 ? (user.authorReviews / user.count * 100).toFixed(0) : 0,
                lastReview: user.reviews.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date,
                isVerified: user.reviews.some(r => r.verified)
            };
        })
        .sort((a, b) => b.userScore - a.userScore);
    
    return users;
}

function createUserRankingCard(user, position) {
    const card = document.createElement('div');
    card.className = 'ranking-card glass-effect';
    
    if (position <= 3) {
        card.classList.add(`top-${position}`);
    }
    
    let rankIcon = '';
    if (position === 1) {
        rankIcon = '<i class="fas fa-crown" style="color: #FFD700;"></i>';
    } else if (position === 2) {
        rankIcon = '<i class="fas fa-medal" style="color: #C0C0C0;"></i>';
    } else if (position === 3) {
        rankIcon = '<i class="fas fa-award" style="color: #CD7F32;"></i>';
    } else {
        rankIcon = `<span style="color: var(--secondary-color);">${position}</span>`;
    }
    
    let userType = '';
    let typeColor = '#3498db';
    
    if (user.count >= 10) {
        userType = 'Эксперт';
        typeColor = '#27ae60';
    } else if (user.count >= 5) {
        userType = 'Активный';
        typeColor = '#3498db';
    } else if (user.count >= 3) {
        userType = 'Участник';
        typeColor = '#9b59b6';
    } else {
        userType = 'Новичок';
        typeColor = '#e74c3c';
    }
    
    let ratingStyle = '';
    if (user.avgUserRating >= 4.5) {
        ratingStyle = 'Добряк';
    } else if (user.avgUserRating >= 4.0) {
        ratingStyle = 'Позитивный';
    } else if (user.avgUserRating >= 3.0) {
        ratingStyle = 'Объективный';
    } else if (user.avgUserRating >= 2.0) {
        ratingStyle = 'Критик';
    } else {
        ratingStyle = 'Строгий';
    }
    
    card.innerHTML = `
        <div style="display: flex; align-items: center; width: 100%;">
            <div class="ranking-position">
                ${rankIcon}
            </div>
            
            <div class="ranking-content">
                <h4 class="ranking-title">
                    ${user.name}
                    ${user.isVerified ? '<i class="fas fa-check-circle verified-badge" style="margin-left: 5px;"></i>' : ''}
                </h4>
                
                <div class="ranking-subtitle" style="display: flex; align-items: center; gap: 10px;">
                    <span style="color: #666;">
                        <i class="fas fa-at"></i> ${user.nickname}
                    </span>
                    <span style="background: ${typeColor}15; color: ${typeColor}; padding: 2px 8px; border-radius: 10px; font-size: 0.75rem;">
                        ${userType}
                    </span>
                </div>
                
                <div class="ranking-stats">
                    <div class="stat-badge">
                        <i class="fas fa-star"></i> ${user.formattedAvgRating}/5
                    </div>
                    <div class="stat-badge">
                        <i class="fas fa-comment"></i> ${user.count} отзыв${user.count === 1 ? '' : user.count >= 5 ? 'ов' : 'а'}
                    </div>
                    <div class="stat-badge" style="background: rgba(46, 204, 113, 0.1); color: #27ae60;">
                        <i class="fas fa-chart-line"></i> ${ratingStyle}
                    </div>
                </div>
            </div>
        </div>
        
        ${position <= 3 ? `
        <div class="top-badge" style="background: ${position === 1 ? '#FFD700' : position === 2 ? '#C0C0C0' : '#CD7F32'}; color: ${position === 1 ? '#333' : 'white'};">
            ${position === 1 ? 'ТОП-РЕЦЕНЗЕНТ' : position === 2 ? 'Топ-2' : 'Топ-3'}
        </div>
        ` : ''}
    `;
    
    return card;
}

window.addEventListener('popstate', function(event) {
    if (!window.location.hash || !window.location.hash.startsWith('#profile/')) {
        const currentPage = document.querySelector('.page.active');
        if (currentPage && currentPage.id === 'profile-page') {
            switchToPage('home');
        }
    }
});

// ==================== PWA ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('service-worker.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
                checkPWAInstallPrompt();
            })
            .catch(function(error) {
                console.log('ServiceWorker registration failed: ', error);
            });
    });
}

function checkPWAInstallPrompt() {
    let deferredPrompt;
    const installButton = document.createElement('button');
    
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        showInstallButton();
    });
    
    function showInstallButton() {
        installButton.innerHTML = '<i class="fas fa-download"></i> Установить приложение';
        installButton.style.cssText = `
            position: fixed;
            bottom: 80px;
            right: 20px;
            background: linear-gradient(135deg, var(--primary-color), var(--primary-dark));
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 25px;
            font-weight: 600;
            cursor: pointer;
            box-shadow: 0 4px 15px rgba(52, 152, 219, 0.4);
            z-index: 9999;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s ease;
        `;
        
        installButton.addEventListener('mouseenter', () => {
            installButton.style.transform = 'translateY(-2px)';
            installButton.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.5)';
        });
        
        installButton.addEventListener('mouseleave', () => {
            installButton.style.transform = 'translateY(0)';
            installButton.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.4)';
        });
        
        installButton.addEventListener('click', () => {
            hideInstallButton();
            deferredPrompt.prompt();
            
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the install prompt');
                } else {
                    console.log('User dismissed the install prompt');
                }
                deferredPrompt = null;
            });
        });
        
        document.body.appendChild(installButton);
    }
    
    function hideInstallButton() {
        if (installButton.parentNode) {
            installButton.parentNode.removeChild(installButton);
        }
    }
    
    window.addEventListener('appinstalled', () => {
        console.log('PWA was installed');
        hideInstallButton();
    });
}

// ==================== СТАТИСТИКА ПО ВРЕМЕНИ ====================
function analyzeTimeStats() {
    const timeStatsContainer = document.getElementById('time-stats');
    if (!timeStatsContainer) return;
    
    const timeStats = {
        byHour: Array(24).fill(0),
        byDay: Array(7).fill(0),
        byMonth: Array(12).fill(0),
        peakHour: 0,
        peakDay: 0,
        totalReviews: reviews.length
    };
    
    reviews.forEach(review => {
        try {
            const date = new Date(review.date);
            const hour = date.getHours();
            timeStats.byHour[hour]++;
            
            const day = date.getDay();
            timeStats.byDay[day]++;
            
            const month = date.getMonth();
            timeStats.byMonth[month]++;
        } catch (e) {}
    });
    
    timeStats.peakHour = timeStats.byHour.indexOf(Math.max(...timeStats.byHour));
    timeStats.peakDay = timeStats.byDay.indexOf(Math.max(...timeStats.byDay));
    
    displayTimeStats(timeStats);
}

function displayTimeStats(stats) {
    const container = document.getElementById('time-stats');

    if (stats.totalReviews < 2) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px;">
                <i class="fas fa-chart-bar" style="font-size: 3rem; color: #ddd; margin-bottom: 20px;"></i>
                <h4 style="color: #666; margin-bottom: 10px;">Мало данных для анализа</h4>
                <p style="color: #888;">Нужно больше отзывов для статистики по времени.</p>
                <p style="color: #888; margin-top: 10px;">
                    <i class="fas fa-info-circle"></i> Сейчас: ${stats.totalReviews} отзывов<br>
                    <i class="fas fa-bullseye"></i> Нужно: минимум 2 отзыва
                </p>
                <button onclick="switchToPage('add-review')" style="
                    margin-top: 20px;
                    padding: 10px 20px;
                    background: var(--primary-color);
                    color: white;
                    border: none;
                    border-radius: 25px;
                    cursor: pointer;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <i class="fas fa-plus-circle"></i> Добавить отзыв
                </button>
            </div>
        `;
        return;
    }
    
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    
    const dates = reviews.map(r => new Date(r.date)).sort((a, b) => a - b);
    const firstDate = dates[0];
    const lastDate = dates[dates.length - 1];
    
    const formatDate = (date) => {
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };
    
    const firstReview = [...reviews].sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    
    const dayCount = {};
    reviews.forEach(review => {
        const date = new Date(review.date);
        const dateStr = date.toISOString().split('T')[0];
        dayCount[dateStr] = (dayCount[dateStr] || 0) + 1;
    });
    
    let maxDayCount = 0;
    let maxDayDate = '';
    
    Object.entries(dayCount).forEach(([date, count]) => {
        if (count > maxDayCount) {
            maxDayCount = count;
            maxDayDate = date;
        }
    });
    
    const maxDay = new Date(maxDayDate);
    const formattedMaxDay = maxDay.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    let maxHourCount = 0;
    let maxHour = 0;
    
    stats.byHour.forEach((count, hour) => {
        if (count > maxHourCount) {
            maxHourCount = count;
            maxHour = hour;
        }
    });
    
    const hourRanges = [
        { range: '00:00-06:00', name: 'Ночь (00:00-06:00)' },
        { range: '06:00-12:00', name: 'Утро (06:00-12:00)' },
        { range: '12:00-18:00', name: 'День (12:00-18:00)' },
        { range: '18:00-00:00', name: 'Вечер (18:00-00:00)' }
    ];
    
    let timeRangeCounts = [0, 0, 0, 0];
    reviews.forEach(review => {
        const hour = new Date(review.date).getHours();
        if (hour >= 0 && hour < 6) timeRangeCounts[0]++;
        else if (hour >= 6 && hour < 12) timeRangeCounts[1]++;
        else if (hour >= 12 && hour < 18) timeRangeCounts[2]++;
        else timeRangeCounts[3]++;
    });
    
    const maxRangeIndex = timeRangeCounts.indexOf(Math.max(...timeRangeCounts));
    const popularTimeRange = hourRanges[maxRangeIndex].name;
    
    const avgLength = Math.round(reviews.reduce((sum, r) => sum + r.comment.length, 0) / reviews.length);
    
    const ratingCounts = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
    reviews.forEach(r => ratingCounts[r.rating]++);
    let mostPopularRating = 5;
    let mostPopularCount = 0;
    Object.entries(ratingCounts).forEach(([rating, count]) => {
        if (count > mostPopularCount) {
            mostPopularCount = count;
            mostPopularRating = parseInt(rating);
        }
    });
    
    container.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px;">
                
                <div class="glass-effect" style="padding: 20px; border-radius: 12px; border-left: 4px solid #3498db;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div style="font-size: 2rem; color: #3498db;">
                            <i class="fas fa-flag"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: var(--secondary-color);">Первый отзыв</h4>
                            <div style="font-size: 1.1rem; font-weight: bold;">${formatDate(firstDate)}</div>
                        </div>
                    </div>
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.05);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="color: #666;">Сайт:</span>
                            <span style="font-weight: 600;">${firstReview.siteName}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #666;">Оценка:</span>
                            <span style="font-weight: 600; color: #f39c12;">
                                ${'★'.repeat(firstReview.rating)}${'☆'.repeat(5 - firstReview.rating)} ${firstReview.rating}.0
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="glass-effect" style="padding: 20px; border-radius: 12px; border-left: 4px solid #e67e22;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div style="font-size: 2rem; color: #e67e22;">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: var(--secondary-color);">Самый активный день</h4>
                            <div style="font-size: 1.1rem; font-weight: bold;">${formattedMaxDay}</div>
                        </div>
                    </div>
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.05);">
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #666;">Количество отзывов:</span>
                            <span style="font-weight: 600; color: #e67e22;">${maxDayCount} ${maxDayCount === 1 ? 'отзыв' : maxDayCount < 5 ? 'отзыва' : 'отзывов'}</span>
                        </div>
                    </div>
                </div>
                
                <div class="glass-effect" style="padding: 20px; border-radius: 12px; border-left: 4px solid #9b59b6;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div style="font-size: 2rem; color: #9b59b6;">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: var(--secondary-color);">Популярное время</h4>
                            <div style="font-size: 1.1rem; font-weight: bold;">${popularTimeRange}</div>
                        </div>
                    </div>
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.05);">
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #666;">Пиковый час:</span>
                            <span style="font-weight: 600;">${maxHour}:00-${maxHour+1}:00 (${maxHourCount} отзывов)</span>
                        </div>
                    </div>
                </div>
                
                <div class="glass-effect" style="padding: 20px; border-radius: 12px; border-left: 4px solid #27ae60;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div style="font-size: 2rem; color: #27ae60;">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: var(--secondary-color);">Любимый день</h4>
                            <div style="font-size: 1.1rem; font-weight: bold;">${daysOfWeek[stats.peakDay]}</div>
                        </div>
                    </div>
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.05);">
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #666;">Отзывов по ${daysOfWeek[stats.peakDay].toLowerCase()}м:</span>
                            <span style="font-weight: 600;">${stats.byDay[stats.peakDay]}</span>
                        </div>
                    </div>
                </div>
                
                <div class="glass-effect" style="padding: 20px; border-radius: 12px; border-left: 4px solid #34495e;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px;">
                        <div style="font-size: 2rem; color: #34495e;">
                            <i class="fas fa-chart-pie"></i>
                        </div>
                        <div>
                            <h4 style="margin: 0 0 5px 0; color: var(--secondary-color);">Интересные факты</h4>
                        </div>
                    </div>
                    <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.05);">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #666;">Средняя длина отзыва:</span>
                            <span style="font-weight: 600;">${avgLength} символов</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="color: #666;">Самый частый рейтинг:</span>
                            <span style="font-weight: 600; color: #f39c12;">
                                ${mostPopularRating} звезд${mostPopularRating === 1 ? 'а' : ''}
                            </span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #666;">Всего дней активности:</span>
                            <span style="font-weight: 600;">${Object.keys(dayCount).length} дней</span>
                        </div>
                    </div>
                </div>
                
            </div>
            
            <div style="margin-top: 20px; padding: 15px; background: rgba(52, 152, 219, 0.1); border-radius: 10px; border-left: 4px solid var(--primary-color);">
                <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-calendar" style="color: var(--primary-color);"></i>
                        <span>Первый отзыв: <strong>${formatDate(firstDate)}</strong></span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-calendar" style="color: var(--primary-color);"></i>
                        <span>Последний отзыв: <strong>${formatDate(lastDate)}</strong></span>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <i class="fas fa-clock" style="color: var(--primary-color);"></i>
                        <span>Всего активность длится: <strong>${Math.ceil((lastDate - firstDate) / (1000 * 60 * 60 * 24))} дней</strong></span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// ==================== ВИКТОРИНА ====================
let quizState = {
    currentQuestion: 0,
    score: 0,
    highScore: localStorage.getItem('quizHighScore') || 0,
    questions: [],
    totalQuestions: 5,
    gameActive: false
};

function initQuiz() {
    const highScoreEl = document.getElementById('quiz-highscore');
    if (highScoreEl) highScoreEl.textContent = quizState.highScore;
    
    document.getElementById('start-quiz-btn')?.addEventListener('click', startQuiz);
    document.getElementById('next-question-btn')?.addEventListener('click', nextQuestion);
    document.getElementById('restart-quiz-btn')?.addEventListener('click', restartQuiz);
    
    generateQuizQuestions();
}

function generateQuizQuestions() {
    if (typeof getSiteCategory === 'undefined' || typeof getSiteGroup === 'undefined') return;
    
    quizState.questions = [];
    
    const shuffledReviews = [...reviews].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < Math.min(quizState.totalQuestions, shuffledReviews.length); i++) {
        const review = shuffledReviews[i];
        
        const correctCategory = getSiteCategory(review);
        
        let wrongOptions = [];
        const siteGroup = getSiteGroup(review.siteName);
        
        let candidateSites = [];
        
        if (siteGroup) {
            candidateSites = reviews
                .filter(r => r.siteUrl !== review.siteUrl && getSiteGroup(r.siteName) === siteGroup)
                .map(r => ({ 
                    name: r.siteName, 
                    url: r.siteUrl,
                    category: getSiteCategory(r)
                }))
                .filter((value, index, self) => 
                    index === self.findIndex(t => t.url === value.url)
                );
        }
        
        if (candidateSites.length < 3) {
            const sameCategorySites = reviews
                .filter(r => r.siteUrl !== review.siteUrl && getSiteCategory(r) === correctCategory)
                .map(r => ({ 
                    name: r.siteName, 
                    url: r.siteUrl,
                    category: getSiteCategory(r)
                }))
                .filter((value, index, self) => 
                    index === self.findIndex(t => t.url === value.url)
                );
            
            sameCategorySites.forEach(site => {
                if (!candidateSites.find(c => c.url === site.url)) {
                    candidateSites.push(site);
                }
            });
        }
        
        if (candidateSites.length < 3) {
            const anySites = reviews
                .filter(r => r.siteUrl !== review.siteUrl)
                .map(r => ({ 
                    name: r.siteName, 
                    url: r.siteUrl,
                    category: getSiteCategory(r)
                }))
                .filter((value, index, self) => 
                    index === self.findIndex(t => t.url === value.url)
                );
            
            anySites.forEach(site => {
                if (!candidateSites.find(c => c.url === site.url) && candidateSites.length < 8) {
                    candidateSites.push(site);
                }
            });
        }
        
        wrongOptions = candidateSites
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        
        if (review.name === 'Алёна' && wrongOptions.length < 3) {
            const triggerSites = [
                {
                    name: 'TAIPrompts',
                    url: 'https://timoshamoscow.github.io/taiprompts.github.io/',
                    category: 'Инструменты'
                },
                {
                    name: 'PromptFlame',
                    url: 'https://akkumulator950-bit.github.io/promptflame.github.io/',
                    category: 'Инструменты'
                }
            ];
            
            triggerSites.forEach(site => {
                if (!wrongOptions.find(w => w.url === site.url) && wrongOptions.length < 3) {
                    wrongOptions.push(site);
                }
            });
        }
        
        const correctOption = {
            name: review.siteName,
            url: review.siteUrl,
            category: correctCategory,
            isCorrect: true
        };
        
        const allOptions = [...wrongOptions, correctOption]
            .sort(() => Math.random() - 0.5)
            .map((opt, idx) => ({
                ...opt,
                letter: String.fromCharCode(65 + idx)
            }));
        
        quizState.questions.push({
            review: review.comment,
            reviewer: review.name,
            correctSite: review.siteName,
            correctUrl: review.siteUrl,
            correctCategory: correctCategory,
            options: allOptions
        });
    }
}

function getSiteGroup(siteName) {
    if (!siteName) return null;
    const name = siteName.toLowerCase();
    
    if (name.includes('яндекс') || name.includes('yandex') || 
        name.includes('книги') || name.includes('музыка') || 
        name.includes('игры') || name.includes('games')) {
        return 'Яндекс';
    }
    
    if (name.includes('youtube') || name.includes('ютуб') ||
        name.includes('rutube') || name.includes('рутьюб') ||
        name.includes('twitch') || name.includes('твич') ||
        name.includes('kick')) {
        return 'Видео/Стримы';
    }
    
    if (name.includes('итд') || name.includes('telegram') || 
        name.includes('телеграм')) {
        return 'Соцсети';
    }
    
    if (name.includes('deepseek') || name.includes('character.ai') || 
        name.includes('chat')) {
        return 'Нейросети';
    }
    
    if (name.includes('taiprompts') || name.includes('promptflame') ||
        name.includes('miro') || name.includes('movavi')) {
        return 'Инструменты';
    }
    
    if (name.includes('launcher') || name.includes('funpay') || 
        name.includes('tlauncher')) {
        return 'Игры/Маркет';
    }
    
    if (name.includes('duolingo') || name.includes('дуолинго')) {
        return 'Образование';
    }
    
    return null;
}

function getSiteCategory(review) {
    if (!review) return 'Другое';
    const text = (review.siteName + ' ' + review.comment).toLowerCase();
    
    if ((text.includes('youtube') || text.includes('ютуб') || text.includes('rutube') || text.includes('рутьюб') || text.includes('видео') || text.includes('видеохостинг')) 
     && !text.includes('taiprompts') 
     && !text.includes('генератор')) {
         return 'Видеохостинг';
    }

    if (text.includes('twitch') || text.includes('твич') ||
        text.includes('kick') || text.includes('стрим')) {
        return 'Стриминг';
    }
    
    if (text.includes('итд') || text.includes('соцсет') ||
        text.includes('telegram')) {
        return 'Соцсеть';
    }
    
    if (text.includes('taiprompts') || text.includes('промпт') ||
        text.includes('генер') || text.includes('miro') ||
        text.includes('инструм')) {
        return 'Инструменты';
    }
    
    if (text.includes('deepseek') || text.includes('character.ai') ||
        text.includes('нейросет') || text.includes('нейрон')) {
        return 'Нейросеть';
    }
    
    if (text.includes('duolingo') || text.includes('дуолинго') ||
        text.includes('шахмат') || text.includes('урок')) {
        return 'Образование';
    }
    
    if (text.includes('launcher') || text.includes('tlauncher') ||
        text.includes('игр') || text.includes('гейм') ||
        text.includes('яндекс.игры')) {
        return 'Игры';
    }
    
    if (text.includes('funpay') || text.includes('покуп') ||
        text.includes('продав') || text.includes('комисс')) {
        return 'Маркетплейс';
    }
    
    return 'Другое';
}

function startQuiz() {
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.gameActive = true;
    
    updateScore();
    
    document.getElementById('quiz-start-screen').style.display = 'none';
    document.getElementById('quiz-game-area').style.display = 'block';
    
    showQuestion();
}

function showQuestion() {
    const questionData = quizState.questions[quizState.currentQuestion];
    if (!questionData) return;
    
    document.getElementById('quiz-question').innerHTML = `
        <div style="margin-bottom: 10px; color: #666; font-size: 0.9rem;">
            <i class="fas fa-user"></i> ${questionData.reviewer}
        </div>
        <div>"${questionData.review}"</div>
    `;
    
    const optionsContainer = document.getElementById('quiz-options');
    optionsContainer.innerHTML = '';
    
    questionData.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.dataset.correct = option.isCorrect || false;
        optionElement.dataset.url = option.url;
        
        optionElement.innerHTML = `
            <span class="option-letter">${option.letter}</span>
            <span>${option.name}</span>
        `;
        
        optionElement.addEventListener('click', () => selectAnswer(optionElement));
        optionsContainer.appendChild(optionElement);
    });
    
    document.getElementById('next-question-btn').style.display = 'none';
    document.getElementById('quiz-feedback').style.display = 'none';
    
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.style.pointerEvents = 'auto';
        opt.style.opacity = '1';
    });
}

function selectAnswer(selectedElement) {
    if (!quizState.gameActive) return;
    
    const isCorrect = selectedElement.dataset.correct === 'true';
    const correctUrl = quizState.questions[quizState.currentQuestion].correctUrl;
    const correctCategory = quizState.questions[quizState.currentQuestion].correctCategory;
    
    const selectedOption = quizState.questions[quizState.currentQuestion].options.find(
        opt => opt.url === selectedElement.dataset.url
    );
    const selectedCategory = selectedOption?.category || '';
    
    const isCategoryCorrect = selectedCategory === correctCategory;
    
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.style.pointerEvents = 'none';
        
        if (opt.dataset.url === correctUrl) {
            opt.classList.add('correct');
        } else if (opt === selectedElement && !isCorrect) {
            opt.classList.add('wrong');
        }
    });
    
    let points = 0;
    let feedbackText = '';
    
    if (isCorrect) {
        points += 10;
        feedbackText = 'Сайт угадан! +10';
    }
    
    if (isCategoryCorrect) {
        points += 5;
        feedbackText += feedbackText ? ' Категория угадана! +5' : 'Категория угадана! +5';
    }
    
    if (points > 0) {
        quizState.score += points;
        updateScore();
    }
    
    const feedbackElement = document.getElementById('quiz-feedback');
    feedbackElement.style.display = 'block';
    feedbackElement.className = points >= 15 ? 'correct' : (points > 0 ? 'correct' : 'wrong');
    
    feedbackElement.innerHTML = `
        <div style="display: flex; align-items: center; gap: 10px;">
            <i class="fas fa-${points >= 10 ? 'check-circle' : 'times-circle'}" style="font-size: 1.2rem;"></i>
            <div>
                <strong>${points >= 10 ? 'Правильно!' : 'Неверно!'}</strong><br>
                ${feedbackText || `Правильный ответ: ${quizState.questions[quizState.currentQuestion].correctSite} [${correctCategory}]`}
            </div>
        </div>
    `;
    
    document.getElementById('next-question-btn').style.display = 'block';
}

function nextQuestion() {
    quizState.currentQuestion++;
    
    if (quizState.currentQuestion < quizState.totalQuestions) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    quizState.gameActive = false;
    
    if (quizState.score > quizState.highScore) {
        quizState.highScore = quizState.score;
        localStorage.setItem('quizHighScore', quizState.highScore);
        document.getElementById('quiz-highscore').textContent = quizState.highScore;
    }
    
    document.getElementById('quiz-question').innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <i class="fas fa-trophy" style="font-size: 3rem; color: #FFD700; margin-bottom: 20px;"></i>
            <h3 style="color: var(--secondary-color); margin-bottom: 10px;">Викторина завершена!</h3>
            <p style="color: #666; margin-bottom: 5px;">Ваш счёт: <strong style="font-size: 1.2rem;">${quizState.score}</strong> очков</p>
            <p style="color: #666; margin-bottom: 5px;">Рекорд: <strong>${quizState.highScore}</strong> очков</p>
            <p style="color: #666;">Правильных ответов: <strong>${quizState.score / 10} из ${quizState.totalQuestions}</strong></p>
            
            ${quizState.score === quizState.totalQuestions * 10 ? 
                '<div style="margin-top: 15px; color: #27ae60;"><i class="fas fa-crown"></i> Идеальный результат!</div>' : 
                ''}
        </div>
    `;
    
    document.getElementById('quiz-options').innerHTML = '';
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('next-question-btn').style.display = 'none';
}

function restartQuiz() {
    generateQuizQuestions();
    document.getElementById('quiz-start-screen').style.display = 'block';
    document.getElementById('quiz-game-area').style.display = 'none';
}

function updateScore() {
    document.getElementById('current-score').textContent = quizState.score;
}

// ==================== АВТОРИЗАЦИЯ ====================
function showNotification(message, type = 'info') {
    console.log(`[${type}] ${message}`);
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        z-index: 10001;
        animation: slideIn 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 3000);
}

function loadGoogleAPI() {
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
        console.log('Google API уже загружен');
        return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => console.log('Google API загружен успешно');
    script.onerror = function() {
        console.warn('Google API не загрузился, показываем fallback');
        document.getElementById('fallback-login').style.display = 'block';
    };
    document.head.appendChild(script);
}

function handleGoogleSignIn(response) {
    console.log('✅ Google Sign-In успешен', response);
    
    try {
        if (!response.credential) {
            throw new Error('Нет credential в ответе');
        }
        
        const base64Url = response.credential.split('.')[1];
        if (!base64Url) {
            throw new Error('Неверный формат JWT токена');
        }
        
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(atob(base64));
        console.log('✅ Данные пользователя:', payload);
        
        const userData = {
            name: payload.name || 'Пользователь Google',
            email: payload.email,
            picture: payload.picture,
            sub: payload.sub,
            email_verified: payload.email_verified || false,
            loginTime: new Date().toISOString()
        };
        
        localStorage.setItem('siteReview_user', JSON.stringify(userData));
        showSiteAfterLogin();
        showNotification(`Добро пожаловать, ${userData.name}!`, 'success');
        
    } catch (error) {
        console.error('❌ Ошибка при обработке входа:', error);
        showNotification('Ошибка входа. Попробуйте еще раз.', 'error');
    }
}

function showSiteAfterLogin() {
    console.log('Показываем сайт после входа');
    
    const overlay = document.getElementById('login-overlay');
    const mainContent = document.getElementById('main-content');
    
    if (!overlay || !mainContent) return;
    
    overlay.style.opacity = '0';
    
    setTimeout(() => {
        overlay.style.display = 'none';
        mainContent.style.display = 'block';
        
        if (typeof loadReviews === 'function') {
            loadReviews();
        }
        
        console.log('Сайт открыт, пользователь авторизован');
    }, 500);
}

function checkAuth() {
    console.log('Проверка авторизации...');
    
    const savedUser = localStorage.getItem('siteReview_user');
    const overlay = document.getElementById('login-overlay');
    const mainContent = document.getElementById('main-content');
    
    if (!overlay || !mainContent) return;
    
    if (savedUser) {
        console.log('🔄 Сессия восстановлена:', JSON.parse(savedUser).email);
        overlay.style.display = 'none';
        mainContent.style.display = 'block';
    } else {
        console.log('❌ Пользователь не авторизован');
        overlay.style.display = 'flex';
        overlay.style.opacity = '1';
        mainContent.style.display = 'none';
    }
}

function simulateLogin() {
    console.log('Демо-вход');
    
    const demoUser = {
        name: 'Демо Пользователь',
        email: 'demo@sitereview.ru',
        picture: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
        sub: 'demo_' + Date.now(),
        email_verified: false,
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('siteReview_user', JSON.stringify(demoUser));
    showSiteAfterLogin();
    showNotification('Добро пожаловать, Демо Пользователь!', 'success');
}

function protectNavigation() {
    const originalSwitchToPage = window.switchToPage;
    if (originalSwitchToPage) {
        window.switchToPage = function(pageId, userId = null) {
            const isLoggedIn = localStorage.getItem('siteReview_user');
            
            if (!isLoggedIn) {
                document.getElementById('login-overlay').style.display = 'flex';
                document.getElementById('main-content').style.display = 'none';
                showNotification('Необходимо войти через Google', 'info');
                return;
            }
            
            originalSwitchToPage(pageId, userId);
        };
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM загружен, инициализация авторизации...');
    
    setTimeout(() => {
        loadGoogleAPI();
    }, 100);
    
    checkAuth();
    protectNavigation();
    
    setTimeout(() => {
        document.querySelectorAll('a[href]').forEach(link => {
            link.addEventListener('click', function(e) {
                const isLoggedIn = localStorage.getItem('siteReview_user');
                if (!isLoggedIn && !this.href.includes('#')) {
                    e.preventDefault();
                    document.getElementById('login-overlay').style.display = 'flex';
                    showNotification('Необходимо войти через Google', 'info');
                }
            });
        });
    }, 500);
});

window.handleGoogleSignIn = handleGoogleSignIn;
window.simulateLogin = simulateLogin;

// ==================== САЙТЫ ДЛЯ ИЗБЕГАНИЯ ====================
function displaySitesToAvoid() {
    const container = document.getElementById('sites-to-avoid');
    if (!container) return;
    
    const avoidSites = typeof getSitesToAvoid !== 'undefined' ? getSitesToAvoid() : [];
    
    if (avoidSites.length === 0) {
        container.innerHTML = '<p style="color: #27ae60; text-align: center;">✨ Пока всё чисто! Никто не попал в чёрный список</p>';
        return;
    }
    
    container.innerHTML = '';
    
    avoidSites.forEach(site => {
        const siteElement = document.createElement('div');
        siteElement.className = 'site-needing-review';
        siteElement.style.borderColor = '#e74c3c';
        
        let dangerIcon = '';
        if (site.avgRating < 2.0) {
            dangerIcon = '<i class="fas fa-skull" style="color: #e74c3c; margin-right: 8px;"></i>';
        } else if (site.avgRating < 2.5) {
            dangerIcon = '<i class="fas fa-exclamation-triangle" style="color: #e74c3c; margin-right: 8px;"></i>';
        } else {
            dangerIcon = '<i class="fas fa-exclamation-circle" style="color: #e74c3c; margin-right: 8px;"></i>';
        }
        
        siteElement.innerHTML = `
            <span style="margin-right: 8px; color: #666;">${dangerIcon}</span>
            <span class="site-name" style="color: #e74c3c;">${site.name}</span>
            <span class="site-info" style="background: rgba(231, 76, 60, 0.1); color: #e74c3c;">
                ${site.reason || 'проблемный сайт'}
            </span>
        `;
        
        siteElement.addEventListener('click', () => {
            const negativeReviews = reviews.filter(r => 
                r.siteUrl === site.url && r.rating <= 2
            );
            
            if (negativeReviews.length > 0) {
                let message = `🚫 ${site.name}\nРейтинг: ${site.formattedRating || site.avgRating?.toFixed(1) || '?'}/5\n\n`;
                message += negativeReviews.map(r => 
                    `${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)} - ${r.name}: ${r.comment}`
                ).join('\n\n');
                
                alert(message);
            } else {
                alert(`🚫 ${site.name}\nРейтинг: ${site.formattedRating || site.avgRating?.toFixed(1) || '?'}/5\n\nПричина: ${site.reason || 'негативные отзывы'}`);
            }
        });
        
        container.appendChild(siteElement);
    });
}

/*!
 * ============================================================
 * SiteReview - Система оценки веб-сайтов
 * © 2026 Константин. Все права защищены.
 * 
 * ЛИЦЕНЗИЯ: ЗАПРЕЩЕНО любое использование, копирование, 
 * модификация или распространение без письменного разрешения.
 * 
 * Репозиторий: https://github.com/speedtelly1/sitereview.github.io
 * ============================================================
 */
