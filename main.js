       // DOM элементы
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

function isUserVerified(email) {
    // Проверяем, есть ли у этого пользователя хотя бы один верифицированный отзыв
    return reviews.some(review => review.email === email && review.verified === true);
}

// Функция для получения отображаемого никнейма (ОБНОВЛЕННАЯ ВЕРСИЯ)
function getDisplayNickname(review) {
    // 1. Если у отзыва есть nickname, используем его
    if (review.nickname && review.nickname.trim() !== '') {
        return review.nickname;
    }
    
    // 2. Если есть email, генерируем анонимный ник из email
    if (review.email && review.email.trim() !== '') {
        return generateAnonimNickname(review.email);
    }
    
    // 3. Если нет email, создаем ник из имени + случайных цифр
    if (review.name && review.name.trim() !== '') {
        return generateNicknameFromName(review.name);
    }
    
    // 4. Если вообще ничего нет - дефолтный ник
    return 'anonim_0000';
}

// Новая функция: создает английский никнейм из имени
function generateNicknameFromName(name) {
    try {
        // Транслитерация русского имени в английское
        const translitMap = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
            'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
            'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
            'у': 'u', 'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch',
            'ш': 'sh', 'щ': 'sch', 'ъ': '', 'ы': 'y', 'ь': '',
            'э': 'e', 'ю': 'yu', 'я': 'ya'
        };
        
        // Приводим имя к нижнему регистру
        let cleanName = name.trim().toLowerCase();
        
        // Транслитерируем русские буквы в английские
        let englishName = '';
        for (let char of cleanName) {
            if (translitMap[char]) {
                englishName += translitMap[char];
            } else if (char.match(/[a-z0-9]/)) {
                // Оставляем английские буквы и цифры как есть
                englishName += char;
            }
            // Игнорируем другие символы (пробелы, знаки препинания)
        }
        
        // Если после транслитерации имя пустое
        if (!englishName) {
            return 'user_' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
        }
        
        // Ограничиваем длину и убираем возможные двойные символы
        englishName = englishName
            .replace(/(.)\1+/g, '$1') // Убираем повторяющиеся символы
            .substring(0, 12); // Ограничиваем длину
        
        // Добавляем случайные цифры для уникальности
        const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        
        // Формируем ник: englishname_числа
        return `${englishName}_${randomNum}`;
        
    } catch (e) {
        // В случае ошибки возвращаем дефолтный
        console.warn('Ошибка создания ника из имени:', e);
        return 'user_' + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    }
}

// Функция создания хеша для анонимного никнейма
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

// Извлекает username из email (можно оставить, если где-то ещё используется)
function extractUsername(email) {
    return email.split('@')[0];
}

        // Инициализация приложения
        document.addEventListener('DOMContentLoaded', function() {
            console.log('Загружено отзывов:', reviews.length);
            
            initNavigation();
            loadReviews();
            createCategoryButtons();
            updateStatistics();
            setupSearchAndFilters();

            // Добавляем обработчики для профилей
            setupUserProfileLinks();
    
            // Проверяем хэш URL при загрузке
            handleProfileHash();
            
            // Инициализация прогресс-бара
            updateProgress();

            initQuiz();
           // Если загрузили страницу без хэша, но активна страница профиля - переключаем
           if (!window.location.hash && document.querySelector('#profile-page.active')) {
               switchToPage('home');
           }
           setTimeout(() => {
               initAutoSync();
               startAutoUpdateCheck();
           }, 3000); // Через 3 секунды после загрузки
        });

// ==================== ФУНКЦИИ ДЛЯ РАБОТЫ С ПРОФИЛЯМИ ====================

// Функция для генерации уникального ID пользователя (без email)
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

// Функция для генерации аватара на основе имени
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

// Функция для получения статистики пользователя
function getUserStats(userId) {
    // Находим пользователя по ID
    const userReviews = reviews.filter(review => {
        const reviewUserId = generateUserId(review.email);
        return reviewUserId === userId;
    });
    
    if (userReviews.length === 0) return null;
    
    const totalReviews = userReviews.length;
    const avgRating = (userReviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);
    const uniqueSites = [...new Set(userReviews.map(review => review.siteUrl))].length;
    
    // Группируем по сайтам
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
    
    // Рассчитываем средний рейтинг для каждого сайта
    Object.keys(sites).forEach(url => {
        sites[url].avgRating = (sites[url].ratings.reduce((a, b) => a + b, 0) / sites[url].count).toFixed(1);
    });
    
    // Находим самый частый рейтинг
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

// Функция для определения стиля оценок
function getRatingStyle(avgRating) {
    if (avgRating >= 4.5) return 'Добряк';
    if (avgRating >= 4.0) return 'Позитивный';
    if (avgRating >= 3.0) return 'Объективный';
    if (avgRating >= 2.0) return 'Критик';
    return 'Строгий';
}

// Функция для отображения профиля
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
    
    // Генерируем аватар
    const avatarHTML = generateAvatar(userStats.name);
    
    // Форматируем даты
    const firstReviewDate = new Date(userStats.firstReviewDate).toLocaleDateString('ru-RU');
    const lastReviewDate = new Date(userStats.lastReviewDate).toLocaleDateString('ru-RU');
    
    // Рассчитываем тип пользователя
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
    
    // Определяем цвет стиля оценок
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
    
    // Отображаем отзывы пользователя
    const userReviewsContainer = document.getElementById('user-reviews-container');
    if (userReviewsContainer) {
        userReviewsContainer.innerHTML = '';
        userStats.reviews.forEach(review => {
            const card = createReviewCard(review);
            // Убираем кликабельность, так как мы уже в профиле
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

// Функция для обработки кликов на имена пользователей
function setupUserProfileLinks() {
    document.addEventListener('click', function(e) {
        // Проверяем, кликнули ли на имя пользователя или никнейм
        let target = e.target;
        
        // Ищем ближайший элемент с данными пользователя
        while (target && !target.hasAttribute('data-user-id') && target !== document.body) {
            target = target.parentElement;
        }
        
        if (target && target.hasAttribute('data-user-id')) {
            e.preventDefault();
            const userId = target.getAttribute('data-user-id');
            
            // Переключаемся на страницу профиля
            switchToPage('profile', userId);
        }
    });
}

// Вспомогательная функция для переключения страниц
function switchToPage(pageId, userId = null) {
    // Сбрасываем активные элементы
    navLinks.forEach(link => link.classList.remove('active'));
    pages.forEach(page => page.classList.remove('active'));
    
    // Находим и активируем нужную ссылку
    const pageLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (pageLink) {
        pageLink.classList.add('active');
    }
    
    // Находим и показываем нужную страницу
    const targetPage = document.getElementById(`${pageId}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Если переходим с профиля на другую страницу - очищаем URL
    if (pageId !== 'profile') {
        // Очищаем хэш профиля в URL
        window.history.pushState({}, '', window.location.pathname);
        // Очищаем сохраненный профиль
        localStorage.removeItem('currentProfileId');
    }
    
    // Обработка конкретных страниц
    switch(pageId) {
        case 'reviews':
            displayAllReviews(reviews);
            break;
        case 'home':
            displaySitesNeedingReviews();
            displayRecommendedSites();
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
                // Обновляем URL
                window.history.pushState({}, '', `#profile/${userId}`);
                localStorage.setItem('currentProfileId', userId);
            } else {
                // Показываем сообщение о выборе пользователя
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

// Функция для обновления карточек отзывов с кликабельными именами
function updateReviewCardsWithLinks() {
    document.querySelectorAll('.review-card').forEach(card => {
        // Находим элементы с именем и никнеймом
        const nameElement = card.querySelector('.reviewer-info h3');
        const nicknameElement = card.querySelector('.reviewer-username');
        
        // Находим ID отзыва
        const reviewId = parseInt(card.getAttribute('data-review-id') || '0');
        const review = reviews.find(r => r.id === reviewId);
        
        if (review && review.email) {
            const userId = generateUserId(review.email);
            
            // Добавляем атрибут с ID к имени
            if (nameElement) {
                nameElement.setAttribute('data-user-id', userId);
                nameElement.style.cursor = 'pointer';
                nameElement.style.textDecoration = 'underline';
                nameElement.style.textDecorationStyle = 'dotted';
                nameElement.style.textUnderlineOffset = '3px';
                nameElement.title = 'Посмотреть профиль пользователя';
            }
            
            // Также делаем кликабельным никнейм
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

// Обработка загрузки страницы с хэшем профиля
function handleProfileHash() {
    const hash = window.location.hash;
    
    if (hash.startsWith('#profile/')) {
        const userId = hash.split('/')[1];
        
        // Переключаемся на страницу профиля
        switchToPage('profile', userId);
    }
}

// Обновляем функцию initNavigation для поддержки профилей
function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const pageId = this.getAttribute('data-page');
            switchToPage(pageId);
        });
    });
}

        // Навигация между страницами
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
                    }
                    
                    if (pageId === 'stats') {
                       updateStatistics();
                       displayRatingDistribution();
                       displayTopSites(); // Добавляем эту строку
                           setTimeout(() => {
                               analyzeTimeStats(); // ЭТО ДОЛЖНО БЫТЬ!
                           }, 100);
                    }
                });
            });
        }

        // Функция для подсказок сайтов
        function suggestSite(siteName, siteUrl) {
            alert(`Предлагаем оценить: ${siteName}\n\nURL: ${siteUrl}\n\nПри переходе в форму, вставьте этот URL в поле "URL сайта"`);
        }

        // Функция обновления прогресс-бара
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

        // Загрузка и отображение отзывов
        function loadReviews() {
            displayFeaturedReviews();
            displayAllReviews(reviews);
            displaySitesNeedingReviews(); // Добавьте эту строку
            displayRecommendedSites(); // Добавьте эту строку
           // Добавляем ссылки на профили после загрузки отзывов
           setTimeout(() => {
               updateReviewCardsWithLinks();
           }, 100);
        }

// Функция для отображения сайтов, которым нужны отзывы
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
        
        // Определяем текст в зависимости от количества отзывов
        let infoText = '';
        if (site.reviewCount === 1) {
            infoText = '1 отзыв';
        } else if (site.reviewCount === 0) {
            infoText = 'нет отзывов';
        } else {
            infoText = `${site.reviewCount} отзыва`;
        }
        
        // Добавляем информацию о давности, если больше 30 дней
        if (site.daysSinceLastReview > 30) {
            infoText += ` • ${Math.floor(site.daysSinceLastReview / 30)} мес.`;
        }
        
        siteElement.innerHTML = `
            <span class="site-name">${site.name}</span>
            <span class="site-info">${site.needsReviewsReason}</span>
        `;

       // И добавим иконки в зависимости от причины
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
        
        // Добавляем обработчик клика для быстрой оценки
        siteElement.addEventListener('click', () => {
            suggestSite(site.name, site.url);
        });
        
        container.appendChild(siteElement);
    });
}

// Функция для отображения рекомендованных сайтов
function displayRecommendedSites() {
    const container = document.getElementById('recommended-sites');
    if (!container) return;
    
    const recommendedSites = getRecommendedSites();
    
    if (recommendedSites.length === 0) {
        container.innerHTML = '<p style="color: #666; text-align: center;">Пока нет сайтов с достаточно высоким рейтингом</p>';
        return;
    }
    
    container.innerHTML = '';
    
    // Ограничиваем 3 лучшими сайтами
    const topSites = recommendedSites.slice(0, 3);
    
    topSites.forEach(site => {
        const siteElement = document.createElement('a');
        siteElement.className = 'recommended-site';
        siteElement.href = site.url;
        siteElement.target = '_blank';
        siteElement.rel = 'noopener noreferrer';
        
        // Форматируем рейтинг
        const formattedRating = site.avgRating.toFixed(1);
        
        // Создаем звезды для рейтинга
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
        
        // Добавляем бейдж для топ-1 сайта
        if (recommendedSites.indexOf(site) === 0) {
            const badge = document.createElement('span');
            badge.className = 'recommended-badge';
            badge.textContent = 'Топ';
            siteElement.appendChild(badge);
        }
        
        container.appendChild(siteElement);
    });
}

// Также добавьте вызов при смене страниц, если нужно обновлять данные:

// 5. Отображение избранных отзывов (обновлено для консистентности)
function displayFeaturedReviews() {
    if (!featuredReviewsContainer) return;
    
    const sortedReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
    const featured = sortedReviews.slice(0, 3);
    
    featuredReviewsContainer.innerHTML = '';
    
    if (featured.length === 0) {
        featuredReviewsContainer.innerHTML = '<div class="no-results"><i class="fas fa-comment-slash"></i><h3>Отзывов пока нет</h3><p>Будьте первым, кто оставит отзыв!</p></div>';
        return;
    }
    
    featured.forEach(review => {
        featuredReviewsContainer.appendChild(createReviewCard(review));
    });
}

// 1. Отображение всех отзывов (обновлено)
function displayAllReviews(reviewsArray) {
    if (!allReviewsContainer) return;
    
    // Сортируем отзывы по дате (новые → старые)
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

    // ДОБАВЬ ЭТО ↓↓↓
    setTimeout(() => {
        updateReviewCardsWithLinks();
    }, 100);
}

        // Функция определения категорий для конкретного отзыва
        function getReviewCategories(review) {
            const cats = [];
            
            // Определяем по названию и комментарию
            const text = (review.siteName + ' ' + review.comment).toLowerCase();
            
            // Проверяем все категории из data.js
            Object.entries(categories).forEach(([catName, filterFunc]) => {
                if (catName !== 'Все' && catName !== 'Критические' && catName !== 'Позитивные') {
                    try {
                        if (filterFunc(review)) {
                            cats.push(catName);
                        }
                    } catch (e) {
                        console.warn('Ошибка в категории', catName, e);
                    }
                }
            });
            
            // Добавляем Критические и Позитивные в зависимости от рейтинга
            if (review.rating <= 2 || review.comment.toLowerCase().includes('цензур') || 
                review.comment.toLowerCase().includes('груб') || review.comment.toLowerCase().includes('глуп')) {
                cats.push('Критические');
            } else if (review.rating >= 4 && (review.comment.toLowerCase().includes('лучш') ||
                review.comment.toLowerCase().includes('хорош') || review.comment.toLowerCase().includes('отличн'))) {
                cats.push('Позитивные');
            }
            
            return cats;
        }

        // Цвета для категорий
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

        // Функция генерации случайного времени
        function generateRandomTime() {
            // Рабочее время с 9 до 18 для реалистичности
            const hour = 9 + Math.floor(Math.random() * 9); // 9-17
            const minute = Math.floor(Math.random() * 60); // 0-59
            return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        }

        // Создание карточки отзыва
        function createReviewCard(review) {
            const card = document.createElement('div');
            card.className = 'review-card glass-effect';

            card.setAttribute('data-review-id', review.id);

            // Добавляем класс для критических отзывов
            if (review.rating <= 2) {
                card.classList.add('critical');
            }
            
            // Форматирование даты
            const date = new Date(review.date);
            const formattedDate = date.toLocaleDateString('ru-RU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Добавляем время
            let formattedTime = '';
            if (review.date.includes('T')) {
                const timeParts = review.date.split('T')[1];
                formattedTime = timeParts.substring(0, 5);
            } else {
                // Если времени нет, добавляем случайное
                formattedTime = generateRandomTime();
            }
            
            // Создание звезд рейтинга
            let starsHTML = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= review.rating) {
                    starsHTML += '<i class="fas fa-star star filled"></i>';
                } else {
                    starsHTML += '<i class="far fa-star star"></i>';
                }
            }
            
            // Извлечение домена из URL для отображения
            let domain = review.siteUrl;
            try {
                const url = new URL(review.siteUrl);
                domain = url.hostname.replace('www.', '');
            } catch (e) {
                // Если URL некорректный, оставляем как есть
            }

            const displayNickname = getDisplayNickname(review);
                    
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
                
                <div class="review-date">${formattedDate} • ${formattedTime}</div>
            `;

            // Добавляем предупреждения
            addWarningLabels(card, review);

            // Добавляем категории как теги
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
                
                // Вставляем теги после названия сайта
                const tagsDiv = `<div class="review-tags" style="margin: 8px 0 12px 0;">${tagsHtml}</div>`;
                
                // Модифицируем HTML карточки
                const reviewTextDiv = card.querySelector('.review-text');
                if (reviewTextDiv) {
                    reviewTextDiv.insertAdjacentHTML('beforebegin', tagsDiv);
                }
            }
            
            return card;
        }

// ==================== ФУНКЦИЯ ДЛЯ ОПРЕДЕЛЕНИЯ АВТОРОВ GITHUB PAGES ====================

function isGitHubPagesAuthor(review) {
    try {
        const url = new URL(review.siteUrl);
        const hostname = url.hostname.toLowerCase();
        
        // Проверяем, это GitHub Pages?
        if (hostname.endsWith('.github.io')) {
            // Извлекаем username из домена
            // Пример: timoshamoscow.github.io → timoshamoscow
            const githubUsername = hostname.replace('.github.io', '').toLowerCase();
            
            // 1. Проверяем никнейм (основная проверка)
            const displayNickname = getDisplayNickname(review).toLowerCase();
            if (displayNickname.includes(githubUsername) || 
                githubUsername.includes(displayNickname)) {
                return true;
            }
            
            // 2. Проверяем email
            if (review.email) {
                const emailLower = review.email.toLowerCase();
                // Ищем username в email (до @ или полностью)
                const emailUser = emailLower.split('@')[0];
                
                if (emailUser.includes(githubUsername) || 
                    githubUsername.includes(emailUser) ||
                    emailLower.includes(githubUsername)) {
                    return true;
                }
            }
            
            // 3. Проверяем явный nickname из данных
            if (review.nickname) {
                const nicknameLower = review.nickname.toLowerCase();
                if (nicknameLower.includes(githubUsername) || 
                    githubUsername.includes(nicknameLower)) {
                    return true;
                }
            }
            
            // 4. Проверяем имя
            if (review.name) {
                const nameLower = review.name.toLowerCase();
                // Иногда имя может совпадать (timo → timoshamoscow)
                if (nameLower.includes(githubUsername) || 
                    githubUsername.includes(nameLower)) {
                    return true;
                }
            }
        }
        
        return false;
    } catch (e) {
        // Если URL некорректный
        console.debug('Ошибка проверки GitHub Pages авторства:', e);
        return false;
    }
}
                
        // Функция добавления предупреждений
        function addWarningLabels(cardElement, review) {
            const warnings = [];
            
            // Проверка 1: Очень низкий рейтинг
            if (review.rating <= 2) {
                warnings.push({
                    text: 'Низкий рейтинг',
                    icon: 'fas fa-exclamation-triangle',
                    color: '#e74c3c'
                });
            }
            
            // Проверка 2: Длинный негативный текст
            const negativeWords = ['плохой', 'ужасный', 'кошмар', 'не советую', 'избегайте', 'мусор', 'говно', 'дерьмо', 'отстой'];
            const hasNegative = negativeWords.some(word => 
                review.comment.toLowerCase().includes(word)
            );
            if (hasNegative && review.rating <= 3) {
                warnings.push({
                    text: 'Резко негативный',
                    icon: 'fas fa-fire',
                    color: '#f39c12'
                });
            }
            
            // Проверка 3: Конфликт интересов (автор сайта)
            const isAuthor = review.comment.includes('мой сайт') || 
                            review.comment.includes('я автор') ||
                            isGitHubPagesAuthor(review);
            if (isAuthor && review.rating >= 4) {
                warnings.push({
                    text: 'Автор оцениваемого сайта',
                    icon: 'fas fa-user-edit',
                    color: '#3CB371'
                });
            }

            // Проверка 4: Автор SiteReview
            const isOwner = review.name === 'Константин' && review.email === 'timosha.sibilev@gmail.com';
            if (isOwner) {
                warnings.push({
                    text: 'Автор SiteReview',
                    icon: 'fas fa-user-edit',
                    color: '#1E90FF'
                });
            }

            // Проверка : Редактор
            const isRedic = review.email === 'akkumulator950@gmail.com';
            if (isRedic) {
                warnings.push({
                    text: 'Редактор SiteReview',
                    icon: 'fas fa-user-edit',
                    color: '#24b500'
                });
            }
               
            // Проверка : Партнер
            const isPartner = review.name === 'Тимофей' && 
                  review.email === 'roll3ogurec0@gmail.com';
            if (isPartner) {
                warnings.push({
                    text: 'Партнер SiteReview',
                    icon: 'fa-solid fa-handshake',
                    color: '#1E90FF'
                });
            }
            
            // Проверка 5: Личная критика
            const personalAttacks = ['дурак', 'идиот', 'тупой', 'грубый', 'глупый', 'грубым', 'глупым', 'тупым', 'глуп', 'туп', 'лох'];
            const hasPersonal = personalAttacks.some(word => 
                review.comment.toLowerCase().includes(word)
            );
            if (hasPersonal) {
                warnings.push({
                    text: 'Личный конфликт',
                    icon: 'fas fa-user-times',
                    color: '#9b59b6'
                });
            }
            
            // Добавляем предупреждения в карточку
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
                
                // Вставляем после имени пользователя
                const header = cardElement.querySelector('.review-header');
                if (header) {
                    header.parentNode.insertBefore(warningContainer, header.nextSibling);
                }
            }
        }

// ==================== РАСШИРЕННЫЙ ПОИСК ====================

function setupSearchAndFilters() {
    // Заполняем фильтры авторов и сайтов
    populateFilterOptions();
    
    // Основной поиск
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performAdvancedSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') performAdvancedSearch();
        });
    }
    
    // Кнопка сброса поиска
    document.getElementById('reset-search-btn')?.addEventListener('click', resetAllFilters);
    
    // Фильтры
    document.getElementById('rating-filter')?.addEventListener('change', performAdvancedSearch);
    document.getElementById('author-filter')?.addEventListener('change', performAdvancedSearch);
    document.getElementById('site-filter')?.addEventListener('change', performAdvancedSearch);
    
    // Чекбоксы
    document.getElementById('verified-only')?.addEventListener('change', performAdvancedSearch);
    document.getElementById('critical-only')?.addEventListener('change', performAdvancedSearch);
    document.getElementById('positive-only')?.addEventListener('change', performAdvancedSearch);
    
    // Очистить все фильтры
    document.getElementById('clear-all-filters')?.addEventListener('click', resetAllFilters);
}

// Заполнение фильтров авторов и сайтов
function populateFilterOptions() {
    // Уникальные авторы
    const uniqueAuthors = [...new Set(reviews.map(review => review.name))];
    const authorSelect = document.getElementById('author-filter');
    
    if (authorSelect) {
        // Сохраняем выбранное значение
        const selectedAuthor = authorSelect.value;
        
        // Очищаем и добавляем авторов
        authorSelect.innerHTML = '<option value="all">Все авторы</option>';
        uniqueAuthors.sort().forEach(author => {
            const option = document.createElement('option');
            option.value = author;
            option.textContent = author;
            authorSelect.appendChild(option);
        });
        
        // Восстанавливаем выбранное значение
        if (selectedAuthor && selectedAuthor !== 'all') {
            authorSelect.value = selectedAuthor;
        }
    }
    
    // Уникальные сайты
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

// Расширенный поиск
function performAdvancedSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const ratingFilter = document.getElementById('rating-filter').value;
    const authorFilter = document.getElementById('author-filter').value;
    const siteFilter = document.getElementById('site-filter').value;
    const verifiedOnly = document.getElementById('verified-only').checked;
    const criticalOnly = document.getElementById('critical-only').checked;
    const positiveOnly = document.getElementById('positive-only').checked;
    
    // Фильтруем отзывы
    let filteredReviews = reviews.filter(review => {
        // Поисковый запрос
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
        
        // Фильтр по рейтингу
        let matchesRating = true;
        if (ratingFilter !== 'all') {
            matchesRating = review.rating === parseInt(ratingFilter);
        }
        
        // Фильтр по автору
        let matchesAuthor = true;
        if (authorFilter !== 'all') {
            matchesAuthor = review.name === authorFilter;
        }
        
        // Фильтр по сайту
        let matchesSite = true;
        if (siteFilter !== 'all') {
            matchesSite = review.siteName === siteFilter;
        }
        
        // Только проверенные
        let matchesVerified = true;
        if (verifiedOnly) {
            matchesVerified = review.verified === true;
        }
        
        // Только критические
        let matchesCritical = true;
        if (criticalOnly) {
            matchesCritical = review.rating <= 2;
        }
        
        // Только позитивные
        let matchesPositive = true;
        if (positiveOnly) {
            matchesPositive = review.rating >= 4;
        }
        
        return matchesSearch && matchesRating && matchesAuthor && 
               matchesSite && matchesVerified && matchesCritical && matchesPositive;
    });
    
    // Сортируем по дате (новые → старые)
    filteredReviews = filteredReviews.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    // Отображаем результаты
    displayAllReviews(filteredReviews);
    
    // Показываем информацию о результатах
    showSearchResultsInfo(filteredReviews.length, searchTerm);
}

// Показать информацию о результатах
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

// Проверка активных фильтров
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

// Сбросить все фильтры
function resetAllFilters() {
    // Очистить поисковую строку
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Сбросить выпадающие списки
    document.getElementById('rating-filter').value = 'all';
    document.getElementById('author-filter').value = 'all';
    document.getElementById('site-filter').value = 'all';
    
    // Сбросить чекбоксы
    document.getElementById('verified-only').checked = false;
    document.getElementById('critical-only').checked = false;
    document.getElementById('positive-only').checked = false;
    
    // Скрыть информацию о результатах
    document.getElementById('search-results-info').style.display = 'none';
    
    // Показать все отзывы
    displayAllReviews(reviews);
}

// Обновить фильтры при добавлении новых отзывов
function updateSearchFilters() {
    populateFilterOptions();
}

// 3. Выполнение поиска (обновлено)
function performSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        displayAllReviews(reviews); // Теперь это уже сортированные отзывы
        const resultsCountEl = document.getElementById('search-results-count');
        if (resultsCountEl) resultsCountEl.remove();
        return;
    }
    
    try {
        const filteredReviews = reviews.filter(review => {
            const displayNickname = getDisplayNickname(review).toLowerCase();
            
            return (
                review.name.toLowerCase().includes(searchTerm) ||
                displayNickname.includes(searchTerm) ||
                (review.email && review.email.toLowerCase().includes(searchTerm)) ||
                review.siteName.toLowerCase().includes(searchTerm) ||
                review.siteUrl.toLowerCase().includes(searchTerm) ||
                review.comment.toLowerCase().includes(searchTerm)
            );
        });
        
        // Сортируем результаты поиска по новизне
        const sortedSearchResults = [...filteredReviews].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        
        displayAllReviews(sortedSearchResults);
        updateSearchResultsCount(filteredReviews.length, searchTerm);
        
    } catch (error) {
        console.error('Ошибка при поиске:', error);
        displayAllReviews(reviews);
    }
}

// Функция для обновления счетчика результатов поиска
function updateSearchResultsCount(count, searchTerm) {
    // Удаляем старый счетчик, если есть
    const oldCountEl = document.getElementById('search-results-count');
    if (oldCountEl) oldCountEl.remove();
    
    // Если нет результатов, не показываем счетчик
    if (count === 0) return;
    
    // Создаем новый элемент с количеством результатов
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
    
    // Добавляем кнопку сброса поиска
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
    
    // Вставляем после заголовка раздела с отзывами
    const reviewsPage = document.getElementById('reviews-page');
    if (reviewsPage) {
        const allReviewsHeader = reviewsPage.querySelector('.page-header h1, .section-header');
        if (allReviewsHeader) {
            allReviewsHeader.parentNode.insertBefore(resultsCountEl, allReviewsHeader.nextSibling);
        } else {
            // Если не нашли заголовок, вставляем в начало контейнера с отзывами
            allReviewsContainer.insertBefore(resultsCountEl, allReviewsContainer.firstChild);
        }
    }
}

// 8. Сброс поиска (обновлено для корректного отображения после сброса)
function resetSearch() {
    if (searchInput) {
        searchInput.value = '';
        const resultsCountEl = document.getElementById('search-results-count');
        if (resultsCountEl) {
            resultsCountEl.remove();
        }
        displayAllReviews(reviews);
        
        // Также сбрасываем активную категорию на "Все"
        const allCategoryBtn = document.querySelector('.category-btn[data-category="Все"]');
        if (allCategoryBtn) {
            allCategoryBtn.click();
        }
        
        // Сбрасываем активный фильтр на "Сначала новые"
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        const recentFilter = document.querySelector('.filter-btn[data-filter="recent"]');
        if (recentFilter) {
            recentFilter.classList.add('active');
        }
    }
}

// 2. Применение фильтров (обновлено)
function applyFilters() {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    let filteredReviews = [...reviews];
    
    switch (activeFilter) {
        case 'recent':
            filteredReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            filteredReviews = [...reviews].sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'all':
            // "Все отзывы" теперь тоже сортируем по новизне
            filteredReviews = [...reviews].sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
    }
    
    displayAllReviews(filteredReviews);
}

        // Функция создания кнопок категорий
        function createCategoryButtons() {
            const container = document.getElementById('category-buttons');
            if (!container) return;
            
            // Считаем количество отзывов в каждой категории
            const categoryCounts = {};
            Object.keys(categories).forEach(category => {
                if (category === 'Все') {
                    categoryCounts[category] = reviews.length;
                } else {
                    categoryCounts[category] = reviews.filter(categories[category]).length;
                }
            });
            
            // Создаём кнопки
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
                
                // Активная кнопка
                if (category === 'Все') {
                    button.classList.add('active');
                    button.style.backgroundColor = 'var(--primary-color)';
                    button.style.color = 'white';
                }
                
                // Обработчик клика
                button.addEventListener('click', () => {
                    filterByCategory(category);
                    updateActiveButton(button);
                    updateCategoryInfo(category, count);
                });
                
                container.appendChild(button);
            });
        }

// 4. Фильтрация по категориям (обновлено)
function filterByCategory(category) {
    const filteredReviews = reviews.filter(categories[category]);
    
    // Сортируем по новизне
    const sortedReviews = [...filteredReviews].sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
    });
    
    displayAllReviews(sortedReviews);
    
    // Показываем информацию о выбранной категории
    const infoPanel = document.getElementById('selected-category');
    if (category === 'Все') {
        infoPanel.style.display = 'none';
    } else {
        infoPanel.style.display = 'block';
    }
}

        // Обновление активной кнопки
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

        // Обновление информации о категории
        function updateCategoryInfo(category, count) {
            document.getElementById('current-category-name').textContent = category;
            document.getElementById('category-count').textContent = count;
        }

        // Очистка фильтра
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

        // Обновление статистики
        function updateStatistics() {
            const totalReviews = reviews.length;
            const avgRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);
            const uniqueSites = [...new Set(reviews.map(review => review.siteUrl))].length;
            const uniqueAuthors = [...new Set(reviews.map(review => review.email))].length;
            
            // Обновляем элементы
            if (totalReviewsEl) totalReviewsEl.textContent = totalReviews;
            if (uniqueSitesEl) uniqueSitesEl.textContent = uniqueSites;
            if (totalReviewersEl) totalReviewersEl.textContent = uniqueAuthors;
            if (avgRatingEl) avgRatingEl.textContent = avgRating;
            
            if (statsTotalReviewsEl) statsTotalReviewsEl.textContent = totalReviews;
            if (statsAvgRatingEl) statsAvgRatingEl.textContent = avgRating;
            if (statsReviewersEl) statsReviewersEl.textContent = uniqueAuthors;
            if (statsSitesEl) statsSitesEl.textContent = uniqueSites;

            // Добавляем отображение топ-сайтов
            setTimeout(() => {
                displayTopSites();
                displayTopUsers();
                displayRatingDistribution();
            }, 100);
        }

        // Отображение распределения рейтингов
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

// ==================== ОБНОВЛЁННАЯ ФУНКЦИЯ ДЛЯ ОТОБРАЖЕНИЯ ТОП-САЙТОВ ====================
function displayTopSites() {
    // Создаем контейнер если его нет
    let topSitesContainer = document.getElementById('top-sites-container');
    
    if (!topSitesContainer) {
        const statsPage = document.getElementById('stats-page');
        if (!statsPage) return;
        
        // Создаем новый раздел для двухколоночного рейтинга
        const sectionHTML = `
            <div style="margin-top: 40px;">
                <h3 style="margin-bottom: 20px; color: var(--secondary-color);">
                    <i class="fas fa-trophy"></i> Рейтинги сайтов и пользователей
                </h3>
                <div class="two-columns-container">
                    <!-- Левая колонка: Топ сайтов -->
                    <div class="ranking-column sites-ranking">
                        <div class="ranking-header glass-effect" style="padding: 15px 20px;">
                            <h3>
                                <i class="fas fa-globe"></i> Топ сайтов
                            </h3>
                            <span class="ranking-count" id="sites-count">0 сайтов</span>
                        </div>
                        <div id="top-sites-container"></div>
                    </div>
                    
                    <!-- Правая колонка: Топ пользователей -->
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
        
        // Находим конец статистики и вставляем новый раздел
        const statsContainer = statsPage.querySelector('.glass-effect');
        if (statsContainer) {
            // Вставляем после распределения рейтингов
            const ratingDist = statsPage.querySelector('#rating-distribution');
            if (ratingDist && ratingDist.parentNode) {
                ratingDist.parentNode.insertAdjacentHTML('afterend', sectionHTML);
            } else {
                // Или просто в конец контейнера
                statsContainer.insertAdjacentHTML('beforeend', sectionHTML);
            }
        }
        
        topSitesContainer = document.getElementById('top-sites-container');
    }
    
    // Получаем данные о сайтах
    const siteStats = calculateSiteRatings();
    
    if (siteStats.length === 0) {
        topSitesContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Недостаточно данных для рейтинга</p>';
        return;
    }
    
    // Обновляем количество сайтов
    document.getElementById('sites-count').textContent = `${Math.min(siteStats.length, 10)} сайтов`;
    
    // Ограничиваем 10 топ-сайтами
    const topSites = siteStats.slice(0, 10);
    
    // Очищаем контейнер
    topSitesContainer.innerHTML = '';
    
    // Создаем карточки
    topSites.forEach((site, index) => {
        const siteCard = createSiteRankingCard(site, index + 1);
        topSitesContainer.appendChild(siteCard);
    });
    
    // Также отображаем топ пользователей
    displayTopUsers();
}

// ==================== НОВАЯ ФУНКЦИЯ ДЛЯ РАСЧЕТА ЧЕСТНЫХ РЕЙТИНГОВ САЙТОВ ====================
function calculateSiteRatings() {
    const siteMap = {};
    
    // Собираем статистику по сайтам
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
        
        const isAuthorReview = isGitHubPagesAuthor(review) || 
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
    
    // Рассчитываем ЧЕСТНЫЙ рейтинг
    const sites = Object.values(siteMap)
        .filter(site => site.count >= 1)
        .map(site => {
            const avgRating = site.totalRating / site.count;
            
            // 1. ШТРАФ ЗА АВТОРСКИЕ ОТЗЫВЫ (было)
            const authorPenalty = calculateAuthorPenalty(site.authorReviews, site.regularReviews);
            
            // 2. ШТРАФ ЗА МАЛО ОТЗЫВОВ (НОВОЕ!)
            let lowReviewPenalty = 0;
            if (site.count === 1) lowReviewPenalty = 3.0;
            if (site.count === 2) lowReviewPenalty = 2.0;
            if (site.count === 3) lowReviewPenalty = 1.0;
            
            // 3. БОНУС ЗА ПОПУЛЯРНОСТЬ (НОВОЕ!)
            let popularityBonus = 0;
            if (site.count >= 8) popularityBonus = 0.2;
            if (site.count >= 15) popularityBonus = 0.4;
            
            // 4. ШТРАФ ЗА ПРОТИВОРЕЧИВОСТЬ (НОВОЕ!)
            let controversyPenalty = 0;
            if (site.count >= 3) {
                const ratings = site.reviews.map(r => r.rating);
                const std = calculateStandardDeviation(ratings);
                if (std > 1.5) controversyPenalty = 0.2; // Спорный сайт
                if (std > 2.0) controversyPenalty = 0.4; // Очень спорный
            }
            
            // 5. БОНУС ЗА СТАБИЛЬНОСТЬ (НОВОЕ!)
            let stabilityBonus = 0;
            if (site.count >= 3) {
                const ratings = site.reviews.map(r => r.rating);
                const std = calculateStandardDeviation(ratings);
                if (std < 0.8) stabilityBonus = 0.2; // Все ставят примерно одинаково
            }

            // ========== ПРОЦЕНТНЫЕ БОНУСЫ (НЕВИДИМЫЕ) ==========

            // 6. БОНУС ЗА ПРОЦЕНТ ПОЛОЖИТЕЛЬНЫХ ОТЗЫВОВ (4-5★)
            const positiveReviews = site.reviews.filter(r => r.rating >= 4).length;
            const positivePercentage = site.count > 0 ? (positiveReviews / site.count) * 100 : 0;
            let positiveBonus = 0;

            if (positivePercentage >= 80) positiveBonus = 0.3;
            else if (positivePercentage >= 60) positiveBonus = 0.2;
            else if (positivePercentage >= 40) positiveBonus = 0.1;

            // 7. ШТРАФ ЗА ПРОЦЕНТ НЕГАТИВНЫХ ОТЗЫВОВ (1-2★)
            const negativeReviews = site.reviews.filter(r => r.rating <= 2).length;
            const negativePercentage = site.count > 0 ? (negativeReviews / site.count) * 100 : 0;
            let negativePenalty = 0;

            if (negativePercentage >= 50) negativePenalty = 0.5;
            else if (negativePercentage >= 30) negativePenalty = 0.3;
            else if (negativePercentage >= 20) negativePenalty = 0.1;

            // 8. БОНУС ЗА "НАРОДНОСТЬ" (процент обычных отзывов)
            const regularPercentage = site.count > 0 ? (site.regularReviews / site.count) * 100 : 0;
            let regularBonus = 0;

            if (regularPercentage >= 90) regularBonus = 0.25;
            else if (regularPercentage >= 75) regularBonus = 0.15;
            else if (regularPercentage >= 50) regularBonus = 0.05;
            
            // ЧЕСТНЫЙ РЕЙТИНГ = средний рейтинг + бонусы - штрафы
            let honestRating = avgRating;
            honestRating += popularityBonus;
            honestRating += stabilityBonus;
            honestRating += positiveBonus;      // ← ДОБАВЬ
            honestRating += regularBonus;       // ← ДОБАВЬ
            honestRating -= authorPenalty;
            honestRating -= lowReviewPenalty;
            honestRating -= controversyPenalty;
            honestRating -= negativePenalty;    // ← ДОБАВЬ
            
            // Для визуала ОСТАВЛЯЕМ СТАРЫЙ formattedRating!
            // Пользователи видят 4.8, но ТОП сортируется по honestRating
            
            return {
                ...site,
                avgRating: avgRating,
                formattedRating: avgRating.toFixed(1), // НЕ МЕНЯЕМ! Люди видят это
                weightedScore: Math.max(honestRating, 0.1), // СОРТИРУЕМ ПО ЭТОМУ
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
        // СОРТИРУЕМ ПО ЧЕСТНОМУ РЕЙТИНГУ!
        .sort((a, b) => b.honestRating - a.honestRating);
    
    return sites;
}

// ==================== ФУНКЦИЯ РАСЧЕТА ШТРАФА ЗА АВТОРСКИЕ ОТЗЫВЫ ====================
function calculateAuthorPenalty(authorCount, regularCount) {
    if (authorCount === 0) return 0; // Нет авторских - нет штрафа
    
    const total = authorCount + regularCount;
    const authorRatio = authorCount / total;
    
    // Штрафная формула: чем больше % авторских отзывов, тем больше штраф
    // Максимальный штраф при 100% авторских отзывов: 2.0 балла
    let penalty = 0;
    
    if (authorRatio >= 0.5) { // 50%+ авторских - серьёзный штраф
        penalty = 1.5 + (authorRatio * 1.0); // 1.5-2.5 балла
    } else if (authorRatio >= 0.25) { // 25-50% авторских
        penalty = 0.5 + (authorRatio * 2.0); // 0.5-1.5 балла
    } else if (authorRatio > 0) { // <25% авторских
        penalty = authorRatio * 2.0; // 0-0.5 балла
    }
    
    // Дополнительный штраф если мало обычных отзывов
    if (regularCount === 0) {
        penalty += 1.0; // +1 балл если ВСЕ отзывы авторские
    }
    
    return penalty;
}

// ==================== ОБНОВЛЁННАЯ ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ РЕЙТИНГА САЙТА ====================
function createSiteRankingCard(site, position) {
    const card = document.createElement('div');
    card.className = 'ranking-card glass-effect';
    
    // Добавляем класс для топ-3
    if (position <= 3) {
        card.classList.add(`top-${position}`);
    }
    
    // Определяем иконку для позиции
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
    
    // Извлекаем домен для отображения
    let domain = site.url;
    try {
        const url = new URL(site.url);
        domain = url.hostname.replace('www.', '');
    } catch (e) {
        // Оставляем как есть
    }
    
    // Создаем звезды для рейтинга
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
    
    // Формируем карточку
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
            ${position === 1 ? 'ТОП-1' : position === 2 ? 'ТОП-2' : 'ТОП-3'}
        </div>
        ` : ''}
    `;
    
    return card;
}

// ==================== ОБНОВЛЁННАЯ ФУНКЦИЯ ДЛЯ ОТОБРАЖЕНИЯ ТОП-ПОЛЬЗОВАТЕЛЕЙ ====================
function displayTopUsers() {
    const topUsersContainer = document.getElementById('top-users-container');
    if (!topUsersContainer) return;
    
    // Получаем данные о пользователях
    const userStats = calculateUserRatings();
    
    if (userStats.length === 0) {
        topUsersContainer.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Нет данных о пользователях</p>';
        return;
    }
    
    // Обновляем количество пользователей
    document.getElementById('users-count').textContent = `${Math.min(userStats.length, 10)} пользователей`;
    
    // Ограничиваем 10 топ-пользователями
    const topUsers = userStats.slice(0, 10);
    
    // Очищаем контейнер
    topUsersContainer.innerHTML = '';
    
    // Создаем карточки
    topUsers.forEach((user, index) => {
        const userCard = createUserRankingCard(user, index + 1);
        topUsersContainer.appendChild(userCard);
    });
}

// ==================== НОВАЯ ФУНКЦИЯ ДЛЯ РАСЧЕТА РЕЙТИНГОВ ПОЛЬЗОВАТЕЛЕЙ ====================
function calculateUserRatings() {
    const userMap = {};
    
    // Собираем статистику по пользователям
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
        
        const isAuthorReview = isGitHubPagesAuthor(review) || 
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
    
    // Рассчитываем метрики для каждого пользователя
    const users = Object.values(userMap)
        .filter(user => user.count >= 1)
        .map(user => {
            const avgUserRating = user.totalRating / user.count;
            
            // Консистентность оценок
            const ratings = user.reviews.map(r => r.rating);
            const mean = avgUserRating;
            const variance = ratings.reduce((sum, rating) => sum + Math.pow(rating - mean, 2), 0) / ratings.length;
            const consistency = 5 - Math.sqrt(variance);
            
            // ШТРАФ ЗА АВТОРСКИЕ ОТЗЫВЫ
            const authorPenalty = calculateAuthorPenalty(user.authorReviews, user.regularReviews);
            
            // БАЗОВЫЕ БАЛЛЫ (активность + консистентность + разнообразие)
            const activityScore = Math.min(user.count / 10, 1) * 2;
            const consistencyScore = consistency;
            const diversityScore = Math.min(user.sitesReviewed.size / 5, 1);
            
            // ========== НОВЫЕ БОНУСЫ ЗА КАЧЕСТВО ==========
            let qualityBonus = 0;
            
            // 1. Бонус за развёрнутые отзывы (>100 символов)
            const longReviews = user.reviews.filter(r => r.comment.length > 100).length;
            qualityBonus += longReviews * 0.2;
            
            // 2. Бонус за верификацию
            const verifiedCount = user.reviews.filter(r => r.verified === true).length;
            if (verifiedCount > 0) {
                qualityBonus += (verifiedCount / user.count) * 0.5;
            }
            
            // 3. Бонус за разнообразие ОЦЕНОК (не только 5 или только 1)
            const uniqueRatings = new Set(user.reviews.map(r => r.rating)).size;
            if (uniqueRatings >= 3 && user.count >= 3) {
                qualityBonus += 0.15; // Умеет ставить разные оценки
            }
            if (uniqueRatings >= 4) {
                qualityBonus += 0.1; // Ещё +0.1
            }
            
            // 4. Бонус за полезность (отзывы без конфликтов)
            const cleanReviews = user.reviews.filter(r => 
                !r.comment.includes('груб') && 
                !r.comment.includes('глуп') && 
                !r.comment.includes('лох') &&
                !r.comment.includes('тупой')
            ).length;
            qualityBonus += (cleanReviews / user.count) * 0.1;

            // ========== ПРОЦЕНТНЫЕ БОНУСЫ ПОЛЬЗОВАТЕЛЕЙ ==========

            // 5. БОНУС ЗА ПРОЦЕНТ ВЫСОКИХ ОЦЕНОК (4-5★)
            const highRatingCount = user.reviews.filter(r => r.rating >= 4).length;
            const highRatingPercentage = user.count > 0 ? (highRatingCount / user.count) * 100 : 0;

            if (highRatingPercentage >= 70) {
                qualityBonus += 0.25;
            } else if (highRatingPercentage >= 50) {
                qualityBonus += 0.15;
            } else if (highRatingPercentage >= 30) {
                qualityBonus += 0.05;
            }

            // 6. БОНУС ЗА ПРОЦЕНТ НИЗКИХ ОЦЕНОК (1-2★) - для критиков
            const lowRatingCount = user.reviews.filter(r => r.rating <= 2).length;
            const lowRatingPercentage = user.count > 0 ? (lowRatingCount / user.count) * 100 : 0;

            if (lowRatingPercentage >= 50) {
                qualityBonus += 0.2;
            } else if (lowRatingPercentage >= 30) {
                qualityBonus += 0.1;
            }

            // 7. БОНУС ЗА РАЗНООБРАЗИЕ ОЦЕНОК
            const ratingDistribution = {};
            user.reviews.forEach(r => { ratingDistribution[r.rating] = (ratingDistribution[r.rating] || 0) + 1; });
            const uniqueRatingCount = Object.keys(ratingDistribution).length;

            if (uniqueRatingCount >= 4 && user.count >= 5) {
                qualityBonus += 0.2;
            } else if (uniqueRatingCount >= 3 && user.count >= 4) {
                qualityBonus += 0.1;
            }

            // 8. ШТРАФ ЗА ПРОЦЕНТ КОРОТКИХ ОТЗЫВОВ (УСИЛЕНИЕ)
            const shortReviewsCount = user.reviews.filter(r => r.comment.length < 20).length;
            const shortPercentage = user.count > 0 ? (shortReviewsCount / user.count) * 100 : 0;

            if (shortPercentage >= 50) {
                qualityPenalty += 0.4;
            } else if (shortPercentage >= 30) {
                qualityPenalty += 0.25;
            } else if (shortPercentage >= 15) {
                qualityPenalty += 0.1;
            }

            // 9. БОНУС ЗА ПРОЦЕНТ ДЛИННЫХ ОТЗЫВОВ (УСИЛЕНИЕ)
            const longReviewsCount = user.reviews.filter(r => r.comment.length > 100).length;
            const longPercentage = user.count > 0 ? (longReviewsCount / user.count) * 100 : 0;

            if (longPercentage >= 50) {
                qualityBonus += 0.4;
            } else if (longPercentage >= 30) {
                qualityBonus += 0.25;
            } else if (longPercentage >= 15) {
                qualityBonus += 0.1;
            }

            // 10. ШТРАФ ЗА СЛИШКОМ ВЫСОКИЙ ПРОЦЕНТ ОДИНАКОВЫХ ОЦЕНОК
            let maxPercentage = 0;
            Object.values(ratingDistribution).forEach(count => {
                const percentage = (count / user.count) * 100;
                if (percentage > maxPercentage) maxPercentage = percentage;
            });

            if (maxPercentage >= 80 && user.count >= 5) {
                qualityPenalty += 0.3;
            } else if (maxPercentage >= 70 && user.count >= 5) {
                qualityPenalty += 0.15;
            }

            // 11. БОНУС ЗА СБАЛАНСИРОВАННОСТЬ
            if (maxPercentage < 40 && user.count >= 5) {
                qualityBonus += 0.2;
            }
            
            // ========== НОВЫЕ ШТРАФЫ ==========
            let qualityPenalty = 0;
            
            // 1. Штраф за слишком короткие отзывы (<20 символов)
            const shortReviews = user.reviews.filter(r => r.comment.length < 20).length;
            qualityPenalty += shortReviews * 0.12;
            
            // 2. Штраф за "однообразные" оценки (все 5 или все 1)
            if (uniqueRatings <= 1 && user.count >= 3) {
                qualityPenalty += 0.3; // Ставит только 5 или только 1
            }
            if (uniqueRatings <= 2 && user.count >= 5) {
                qualityPenalty += 0.1; // Только два варианта оценок
            }
            
            // 3. Штраф за неактивность (>30 дней без отзывов)
            if (user.reviews.length > 0) {
                const lastDate = new Date(user.reviews.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date);
                const daysSinceLast = (new Date() - lastDate) / (1000 * 60 * 60 * 24);
                if (daysSinceLast > 30) {
                    qualityPenalty += 0.5;
                }
            }
            
            // ИТОГОВЫЙ СЧЁТ = база + бонусы - штрафы
            let userScore = activityScore + consistencyScore + diversityScore;
            userScore = userScore - authorPenalty + qualityBonus - qualityPenalty;
            userScore = Math.max(userScore, 0.1);
            
            return {
                ...user,
                avgUserRating: avgUserRating,
                formattedAvgRating: avgUserRating.toFixed(1), // НЕ МЕНЯЕМ!
                consistency: consistency,
                consistencyFormatted: consistency.toFixed(1),
                sitesCount: user.sitesReviewed.size,
                userScore: userScore, // СОРТИРУЕМ ПО ЭТОМУ!
                authorPenalty: authorPenalty,
                qualityBonus: qualityBonus.toFixed(2),
                qualityPenalty: qualityPenalty.toFixed(2),
                authorPercentage: user.count > 0 ? (user.authorReviews / user.count * 100).toFixed(0) : 0,
                lastReview: user.reviews.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date
            };
        })
        // СОРТИРУЕМ ПО ИТОГОВОМУ СЧЁТУ (качество + активность)
        .sort((a, b) => b.userScore - a.userScore);
    
    return users;
}

// ==================== ОБНОВЛЁННАЯ ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ РЕЙТИНГА ПОЛЬЗОВАТЕЛЯ ====================
function createUserRankingCard(user, position) {
    const card = document.createElement('div');
    card.className = 'ranking-card glass-effect';
    
    // Добавляем класс для топ-3
    if (position <= 3) {
        card.classList.add(`top-${position}`);
    }
    
    // Определяем иконку для позиции
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
    
    // Определяем тип пользователя
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
    
    // Определяем стиль оценок
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
    
    // Формируем карточку
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
            ${position === 1 ? 'ЛУЧШИЙ' : position === 2 ? 'ВТОРОЙ' : 'ТРЕТИЙ'}
        </div>
        ` : ''}
    `;
    
    return card;
}

// Обработка кнопки "Назад" в браузере
window.addEventListener('popstate', function(event) {
    // Если вышли из профиля, переключаем на главную
    if (!window.location.hash || !window.location.hash.startsWith('#profile/')) {
        const currentPage = document.querySelector('.page.active');
        if (currentPage && currentPage.id === 'profile-page') {
            switchToPage('home');
        }
    }
});

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('service-worker.js')
      .then(function(registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        
        // Показываем уведомление об установке PWA
        checkPWAInstallPrompt();
      })
      .catch(function(error) {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

// Проверка и предложение установки PWA
function checkPWAInstallPrompt() {
  let deferredPrompt;
  const installButton = document.createElement('button');
  
  window.addEventListener('beforeinstallprompt', (e) => {
    // Предотвращаем автоматическое отображение подсказки
    e.preventDefault();
    deferredPrompt = e;
    
    // Показываем свою кнопку установки
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
  
  // Скрываем кнопку после установки
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed');
    hideInstallButton();
  });
}



// ==================== СТАТИСТИКА ПО ВРЕМЕНИ ====================

// Функция анализа активности по времени
function analyzeTimeStats() {
    const timeStatsContainer = document.getElementById('time-stats');
    if (!timeStatsContainer) return;
    
    // Анализируем время из отзывов
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
            
            // По часам
            const hour = date.getHours();
            timeStats.byHour[hour]++;
            
            // По дням недели (0-воскресенье, 1-понедельник...)
            const day = date.getDay();
            timeStats.byDay[day]++;
            
            // По месяцам
            const month = date.getMonth();
            timeStats.byMonth[month]++;
        } catch (e) {
            console.warn('Ошибка парсинга даты:', e);
        }
    });
    
    // Находим пиковые значения
    timeStats.peakHour = timeStats.byHour.indexOf(Math.max(...timeStats.byHour));
    timeStats.peakDay = timeStats.byDay.indexOf(Math.max(...timeStats.byDay));
    
    // Отображаем статистику
    displayTimeStats(timeStats);
}

// Отображение статистики
function displayTimeStats(stats) {
    const container = document.getElementById('time-stats');

    // Проверка на мало данных
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
    
    // Находим первый и последний отзывы
    const dates = reviews.map(r => new Date(r.date)).sort((a, b) => a - b);
    const firstDate = dates[0];
    const lastDate = dates[dates.length - 1];
    
    // Форматируем даты
    const formatDate = (date) => {
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };
    
    // Находим первый отзыв
    const firstReview = [...reviews].sort((a, b) => new Date(a.date) - new Date(b.date))[0];
    
    // Находим самый активный день
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
    
    // Форматируем самый активный день
    const maxDay = new Date(maxDayDate);
    const formattedMaxDay = maxDay.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    
    // Самое активное время
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
    
    // Средняя длина отзыва
    const avgLength = Math.round(reviews.reduce((sum, r) => sum + r.comment.length, 0) / reviews.length);
    
    // Самый популярный рейтинг
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
                
                <!-- Первый отзыв -->
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
                
                <!-- Самый активный день -->
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
                
                <!-- Самое популярное время -->
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
                
                <!-- День недели -->
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
                
                <!-- Общая статистика -->
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

// ==================== ВИКТОРИНА "УГАДАЙ САЙТ" ====================

let quizState = {
    currentQuestion: 0,
    score: 0,
    highScore: localStorage.getItem('quizHighScore') || 0,
    questions: [],
    totalQuestions: 5,
    gameActive: false
};

// Инициализация викторины при загрузке
function initQuiz() {
    document.getElementById('quiz-highscore').textContent = quizState.highScore;
    
    // Обработчики кнопок
    document.getElementById('start-quiz-btn')?.addEventListener('click', startQuiz);
    document.getElementById('next-question-btn')?.addEventListener('click', nextQuestion);
    document.getElementById('restart-quiz-btn')?.addEventListener('click', restartQuiz);
    
    // Генерируем вопросы из отзывов
    generateQuizQuestions();
}

// Генерация вопросов для викторины
function generateQuizQuestions() {
    quizState.questions = [];
    
    // Выбираем случайные отзывы для вопросов
    const shuffledReviews = [...reviews].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < Math.min(quizState.totalQuestions, shuffledReviews.length); i++) {
        const review = shuffledReviews[i];
        
        // ОПРЕДЕЛЯЕМ КАТЕГОРИЮ НА ЛЕТУ!
        const correctCategory = getSiteCategory(review);
        
        // === УМНЫЙ ПОДБОР ВАРИАНТОВ ===
        let wrongOptions = [];
        
        // 1. Определяем группу сайта
        const siteGroup = getSiteGroup(review.siteName);
        
        // 2. Собираем потенциальные варианты
        let candidateSites = [];
        
        if (siteGroup) {
            // Если есть группа — берём из той же группы
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
        
        // 3. Если в группе мало вариантов — добираем из той же категории
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
            
            // Добавляем уникальные
            sameCategorySites.forEach(site => {
                if (!candidateSites.find(c => c.url === site.url)) {
                    candidateSites.push(site);
                }
            });
        }
        
        // 4. ВСЁ ЕЩЁ МАЛО? Берём любые сайты (кроме правильного)
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
        
        // 5. Берём 3 случайных варианта
        wrongOptions = candidateSites
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
        
        // 6. ОСОБЫЙ РЕЖИМ: Алёна получает триггер-варианты 😈
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
        
        // Создаем правильный вариант с ЕГО КАТЕГОРИЕЙ
        const correctOption = {
            name: review.siteName,
            url: review.siteUrl,
            category: correctCategory,
            isCorrect: true
        };
        
        // Смешиваем варианты
        const allOptions = [...wrongOptions, correctOption]
            .sort(() => Math.random() - 0.5)
            .map((opt, idx) => ({
                ...opt,
                letter: String.fromCharCode(65 + idx) // A, B, C, D
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

// Функция для определения группы сайта
function getSiteGroup(siteName) {
    const name = siteName.toLowerCase();
    
    // Яндекс группа
    if (name.includes('яндекс') || name.includes('yandex') || 
        name.includes('книги') || name.includes('музыка') || 
        name.includes('игры') || name.includes('games')) {
        return 'Яндекс';
    }
    
    // Видео/Стримы
    if (name.includes('youtube') || name.includes('ютуб') ||
        name.includes('rutube') || name.includes('рутьюб') ||
        name.includes('twitch') || name.includes('твич') ||
        name.includes('kick')) {
        return 'Видео/Стримы';
    }
    
    // Соцсети
    if (name.includes('итд') || name.includes('telegram') || 
        name.includes('телеграм')) {
        return 'Соцсети';
    }
    
    // Нейросети
    if (name.includes('deepseek') || name.includes('character.ai') || 
        name.includes('chat')) {
        return 'Нейросети';
    }
    
    // Инструменты
    if (name.includes('taiprompts') || name.includes('promptflame') ||
        name.includes('miro') || name.includes('movavi')) {
        return 'Инструменты';
    }
    
    // Игры/Маркет
    if (name.includes('launcher') || name.includes('funpay') || 
        name.includes('tlauncher')) {
        return 'Игры/Маркет';
    }
    
    // Образование
    if (name.includes('duolingo') || name.includes('дуолинго')) {
        return 'Образование';
    }
    
    return null;
}

// Функция: определение категории сайта по отзыву
function getSiteCategory(review) {
    const text = (review.siteName + ' ' + review.comment).toLowerCase();
    
    // Видеохостинги
    if (text.includes('youtube') || text.includes('ютуб') || 
        text.includes('rutube') || text.includes('рутьюб') ||
        text.includes('видео') || text.includes('видеохостинг')) {
        return 'Видеохостинг';
    }
    
    // Стриминг
    if (text.includes('twitch') || text.includes('твич') ||
        text.includes('kick') || text.includes('стрим')) {
        return 'Стриминг';
    }
    
    // Соцсети
    if (text.includes('итд') || text.includes('соцсет') ||
        text.includes('telegram') || text.includes('телеграм')) {
        return 'Соцсеть';
    }
    
    // Инструменты / Генераторы
    if (text.includes('taiprompts') || text.includes('промпт') ||
        text.includes('генератор') || text.includes('miro') ||
        text.includes('инструмент')) {
        return 'Инструменты';
    }
    
    // Нейросети
    if (text.includes('deepseek') || text.includes('character.ai') ||
        text.includes('нейросет') || text.includes('нейрон')) {
        return 'Нейросеть';
    }
    
    // Образование
    if (text.includes('duolingo') || text.includes('дуолинго') ||
        text.includes('шахмат') || text.includes('урок')) {
        return 'Образование';
    }
    
    // Игры
    if (text.includes('launcher') || text.includes('tlauncher') ||
        text.includes('игр') || text.includes('гейм') ||
        text.includes('яндекс.игры')) {
        return 'Игры';
    }
    
    // Маркетплейсы
    if (text.includes('funpay') || text.includes('покуп') ||
        text.includes('продав') || text.includes('комисс')) {
        return 'Маркетплейс';
    }
    
    return 'Другое';
}

// Начать викторину
function startQuiz() {
    quizState.currentQuestion = 0;
    quizState.score = 0;
    quizState.gameActive = true;
    
    updateScore();
    
    // Показать игровую область
    document.getElementById('quiz-start-screen').style.display = 'none';
    document.getElementById('quiz-game-area').style.display = 'block';
    
    // Показать первый вопрос
    showQuestion();
}

// Показать вопрос
function showQuestion() {
    const questionData = quizState.questions[quizState.currentQuestion];
    if (!questionData) return;
    
    // Обновляем прогресс
    const progress = ((quizState.currentQuestion + 1) / quizState.totalQuestions) * 100;
    
    // Показываем вопрос
    document.getElementById('quiz-question').innerHTML = `
        <div style="margin-bottom: 10px; color: #666; font-size: 0.9rem;">
            <i class="fas fa-user"></i> ${questionData.reviewer}
        </div>
        <div>"${questionData.review}"</div>
    `;
    
    // Показываем варианты ответов
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
    
    // Скрыть кнопку "Следующий вопрос" и фидбек
    document.getElementById('next-question-btn').style.display = 'none';
    document.getElementById('quiz-feedback').style.display = 'none';
    
    // Разблокировать варианты ответов
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.style.pointerEvents = 'auto';
        opt.style.opacity = '1';
    });
}

// Выбор ответа
function selectAnswer(selectedElement) {
    if (!quizState.gameActive) return;
    
    const isCorrect = selectedElement.dataset.correct === 'true';
    const correctUrl = quizState.questions[quizState.currentQuestion].correctUrl;
    const correctCategory = quizState.questions[quizState.currentQuestion].correctCategory;
    
    // Получаем категорию выбранного варианта
    const selectedOption = quizState.questions[quizState.currentQuestion].options.find(
        opt => opt.url === selectedElement.dataset.url
    );
    const selectedCategory = selectedOption?.category || '';
    
    // Проверяем категорию
    const isCategoryCorrect = selectedCategory === correctCategory;
    
    // Блокируем все варианты
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.style.pointerEvents = 'none';
        
        // Подсвечиваем правильный/неправильный
        if (opt.dataset.url === correctUrl) {
            opt.classList.add('correct');
        } else if (opt === selectedElement && !isCorrect) {
            opt.classList.add('wrong');
        }
    });
    
    // Обновляем счёт (САЙТ + КАТЕГОРИЯ!)
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
    
    // Показываем фидбек
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
    
    // Показываем кнопку "Следующий вопрос"
    document.getElementById('next-question-btn').style.display = 'block';
}

// Следующий вопрос
function nextQuestion() {
    quizState.currentQuestion++;
    
    if (quizState.currentQuestion < quizState.totalQuestions) {
        showQuestion();
    } else {
        finishQuiz();
    }
}

// Завершить викторину
function finishQuiz() {
    quizState.gameActive = false;
    
    // Обновляем рекорд
    if (quizState.score > quizState.highScore) {
        quizState.highScore = quizState.score;
        localStorage.setItem('quizHighScore', quizState.highScore);
        document.getElementById('quiz-highscore').textContent = quizState.highScore;
    }
    
    // Показываем результаты
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
    
    // Очищаем варианты ответов
    document.getElementById('quiz-options').innerHTML = '';
    document.getElementById('quiz-feedback').style.display = 'none';
    document.getElementById('next-question-btn').style.display = 'none';
}

// Начать заново
function restartQuiz() {
    // Генерируем новые вопросы
    generateQuizQuestions();
    
    // Возвращаемся к стартовому экрану
    document.getElementById('quiz-start-screen').style.display = 'block';
    document.getElementById('quiz-game-area').style.display = 'none';
}

// Обновить счёт
function updateScore() {
    document.getElementById('current-score').textContent = quizState.score;
}

// ==================== PWA АВТО-СИНХРОНИЗАЦИЯ ====================

// Регистрация периодической синхронизации
async function registerPeriodicSync() {
    if ('periodicSync' in self.registration) {
        try {
            await self.registration.periodicSync.register('update-reviews', {
                minInterval: 12 * 60 * 60 * 1000, // 12 часов минимум
            });
            console.log('Периодическая синхронизация зарегистрирована (12 часов)');
            return true;
        } catch (error) {
            console.warn('Периодическая синхронизация не доступна:', error);
            return false;
        }
    }
    return false;
}

// Инициализация синхронизации
async function initAutoSync() {
    if ('serviceWorker' in navigator) {
        try {
            // Ждём регистрации Service Worker
            const registration = await navigator.serviceWorker.ready;
            
            // Регистрируем периодическую синхронизацию
            await registerPeriodicSync();
            
            // Проверяем обновления при запуске
            setTimeout(async () => {
                try {
                    const cache = await caches.open('sitereview-v1.2');
                    const response = await fetch('/sitereview.github.io/data.js');
                    
                    if (response.ok) {
                        await cache.put('/sitereview.github.io/data.js', response);
                        console.log('Данные обновлены при запуске');
                    }
                } catch (e) {
                    console.warn('Не удалось обновить данные при запуске:', e);
                }
            }, 2000);
            
        } catch (error) {
            console.warn('Ошибка инициализации авто-синхронизации:', error);
        }
    }
}

// Автоматическая проверка обновлений каждые 6 часов
function startAutoUpdateCheck() {
    // Проверяем каждые 6 часов (21600000 мс)
    setInterval(async () => {
        try {
            const cache = await caches.open('sitereview-v1.2');
            const response = await fetch('/sitereview.github.io/data.js');
            
            if (response.ok) {
                const cached = await cache.match('/sitereview.github.io/data.js');
                
                if (cached) {
                    const cachedText = await cached.text();
                    const newText = await response.text();
                    
                    if (cachedText !== newText) {
                        // Обновляем кэш если данные изменились
                        await cache.put('/sitereview.github.io/data.js', response);
                        console.log('Данные обновлены в фоне (раз в 6 часов)');
                        
                        // Можно добавить мягкое уведомление в консоль
                        if (typeof window !== 'undefined') {
                            console.info('📢 SiteReview: Данные обновлены в фоне');
                        }
                    }
                } else {
                    await cache.put('/sitereview.github.io/data.js', response);
                }
            }
        } catch (e) {
            // Молча игнорируем ошибки фоновой проверки
        }
    }, 6 * 60 * 60 * 1000); // 6 часов
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
