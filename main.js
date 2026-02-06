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
            
            // Инициализация прогресс-бара
            updateProgress();
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
            <h2 style="margin-bottom: 10px;">${userStats.name}</h2>
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px; flex-wrap: wrap;">
                <span style="color: #666;">
                    <i class="fas fa-at"></i> ${userStats.nickname}
                </span>
                ${userStats.isVerified ? '<i class="fas fa-check-circle verified-badge" title="Проверенный пользователь"></i>' : ''}
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
            displayTopUsers();
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

// Обновляем функцию createReviewCard, чтобы добавлять data-review-id
function createReviewCard(review) {
    const card = document.createElement('div');
    card.className = 'review-card glass-effect';
    card.setAttribute('data-review-id', review.id); // Добавляем ID отзыва
    
    // ... существующий код создания карточки (не меняем) ...
    // (оставляем как есть, просто карточка теперь будет иметь data-review-id)
    
    return card; // Функция уже существует, возвращаем карточку
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
            const personalAttacks = ['дурак', 'идиот', 'тупой', 'грубый', 'глупый', 'грубым', 'глупым', 'тупым', 'глуп', 'туп'];
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

        // Настройка поиска и фильтров
        function setupSearchAndFilters() {
            // Поиск
            if (searchBtn && searchInput) {
                searchBtn.addEventListener('click', performSearch);
                searchInput.addEventListener('keyup', function(e) {
                    if (e.key === 'Enter') performSearch();
                });
            }
            
            // Фильтры
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    applyFilters();
                });
            });
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

// Обновленная функция setupSearchAndFilters
function setupSearchAndFilters() {
    // Поиск
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') performSearch();
            // Если поле пустое, сбрасываем поиск
            if (this.value.trim() === '') {
                resetSearch();
            }
        });
        
        // Добавляем кнопку сброса поиска прямо в поле ввода
        const resetBtn = document.createElement('button');
        resetBtn.innerHTML = '<i class="fas fa-times"></i>';
        resetBtn.title = 'Сбросить поиск';
        resetBtn.id = 'search-reset-btn';
        resetBtn.style.cssText = `
            position: absolute;
            right: 45px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: #777;
            cursor: pointer;
            padding: 5px;
            font-size: 1rem;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.2s, visibility 0.2s;
        `;
        
        resetBtn.addEventListener('click', resetSearch);
        
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
            searchContainer.style.position = 'relative';
            searchContainer.appendChild(resetBtn);
            
            // Показывать/скрывать кнопку сброса при вводе
            searchInput.addEventListener('input', function() {
                const hasValue = this.value.trim() !== '';
                resetBtn.style.opacity = hasValue ? '1' : '0';
                resetBtn.style.visibility = hasValue ? 'visible' : 'hidden';
            });
        }
    } else {
        console.warn('Элементы поиска не найдены на странице');
    }
    
    // Фильтры
    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                applyFilters();
                
                // При смене фильтра обновляем поиск, если есть активный поисковый запрос
                if (searchInput && searchInput.value.trim()) {
                    performSearch();
                }
            });
        });
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

// ==================== ФУНКЦИЯ ДЛЯ ОТОБРАЖЕНИЯ ТОП-САЙТОВ ====================
function displayTopSites() {
    // Создаем контейнер если его нет
    let topSitesContainer = document.getElementById('top-sites-container');
    
    if (!topSitesContainer) {
        const statsPage = document.getElementById('stats-page');
        if (!statsPage) return;
        
        // Создаем новый раздел для топ-сайтов
        const sectionHTML = `
            <div style="margin-top: 40px;">
                <h3 style="margin-bottom: 20px; color: var(--secondary-color);">
                    <i class="fas fa-trophy"></i> Рейтинг сайтов
                </h3>
                <div id="top-sites-container"></div>
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
        topSitesContainer.innerHTML = '<p style="text-align: center; color: #666;">Недостаточно данных для рейтинга</p>';
        return;
    }
    
    // Ограничиваем 10 топ-сайтами
    const topSites = siteStats.slice(0, 10);
    
    // Очищаем контейнер
    topSitesContainer.innerHTML = '';
    
    // Создаем таблицу или список
    const table = document.createElement('div');
    table.style.cssText = `
        display: grid;
        gap: 10px;
        margin-top: 20px;
    `;
    
    topSites.forEach((site, index) => {
        const siteCard = createSiteRankingCard(site, index + 1);
        table.appendChild(siteCard);
    });
    
    topSitesContainer.appendChild(table);
}

// ==================== ФУНКЦИЯ ДЛЯ РАСЧЕТА ВЗВЕШЕННЫХ РЕЙТИНГОВ (ОБНОВЛЁННАЯ) ====================
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
                authorReviews: 0, // Количество авторских отзывов
                regularReviews: 0 // Количество обычных отзывов
            };
        }
        
        // Проверяем, является ли отзыв авторским
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
    
    // Рассчитываем взвешенный рейтинг с штрафом за авторские отзывы
    const sites = Object.values(siteMap)
        .filter(site => site.count >= 1)
        .map(site => {
            const avgRating = site.totalRating / site.count;
            
            // ШТРАФ ЗА АВТОРСКИЕ ОТЗЫВЫ
            const authorPenalty = calculateAuthorPenalty(site.authorReviews, site.regularReviews);
            
            // ВЗВЕШЕННЫЙ РЕЙТИНГ с учетом штрафа
            const minReviewsForFullWeight = 5;
            const weight = Math.min(site.count / minReviewsForFullWeight, 1);
            const countBonus = Math.min(site.count / 10, 0.5);
            
            // Итоговый рейтинг с штрафом (авторские отзывы снижают итог)
            const baseScore = (avgRating * weight) + countBonus;
            const finalScore = baseScore - authorPenalty;
            
            return {
                ...site,
                avgRating: avgRating,
                formattedRating: avgRating.toFixed(1),
                weightedScore: Math.max(finalScore, 0.1), // Не ниже 0.1
                authorPenalty: authorPenalty.toFixed(2),
                authorPercentage: site.count > 0 ? (site.authorReviews / site.count * 100).toFixed(0) : 0,
                lastReview: site.reviews.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date
            };
        })
        // Сортируем по взвешенному рейтингу (уже с вычетом штрафа)
        .sort((a, b) => b.weightedScore - a.weightedScore);
    
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

// ==================== ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ РЕЙТИНГА САЙТА ====================
function createSiteRankingCard(site, position) {
    const card = document.createElement('div');
    card.className = 'site-rank-card glass-effect';
    
    // Определяем цвета и иконки для топ-3
    let rankColor = '#3498db'; // Синий для остальных
    let rankIcon = '';
    
    if (position === 1) {
        rankColor = '#FFD700'; // Золотой
        rankIcon = '<i class="fas fa-crown"></i>';
    } else if (position === 2) {
        rankColor = '#C0C0C0'; // Серебряный
        rankIcon = '<i class="fas fa-medal"></i>';
    } else if (position === 3) {
        rankColor = '#CD7F32'; // Бронзовый
        rankIcon = '<i class="fas fa-award"></i>';
    } else {
        rankIcon = `<span style="color: #777; font-weight: bold;">${position}</span>`;
    }
    
    // Создаем звезды для отображения рейтинга
    let starsHTML = '';
    const fullStars = Math.floor(site.avgRating);
    const hasHalfStar = site.avgRating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHTML += '<i class="fas fa-star" style="color: #FFD700;"></i>';
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt" style="color: #FFD700;"></i>';
        } else {
            starsHTML += '<i class="far fa-star" style="color: #ddd;"></i>';
        }
    }
    
    // Извлекаем домен для отображения
    let domain = site.url;
    try {
        const url = new URL(site.url);
        domain = url.hostname.replace('www.', '');
    } catch (e) {
        // Оставляем как есть
    }
    
    card.style.cssText = `
        display: flex;
        align-items: center;
        padding: 15px 20px;
        border-radius: 12px;
        transition: all 0.3s ease;
        border-left: 4px solid ${rankColor};
        position: relative;
        overflow: hidden;
    `;
    
    // Специальные стили для топ-3
    if (position <= 3) {
        card.style.background = `linear-gradient(135deg, ${rankColor}15, rgba(255,255,255,0.9))`;
        card.style.boxShadow = `0 4px 15px ${rankColor}30`;
    }
    
    card.innerHTML = `
        <div style="width: 50px; text-align: center; font-size: 1.5rem; color: ${rankColor};">
            ${rankIcon}
        </div>
        
        <div style="flex-grow: 1; margin: 0 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <h4 style="margin: 0; color: var(--secondary-color); font-size: 1.1rem;">
                    <a href="${site.url}" target="_blank" rel="noopener" 
                       style="color: inherit; text-decoration: none;"
                       onmouseover="this.style.textDecoration='underline'"
                       onmouseout="this.style.textDecoration='none'">
                        ${site.name}
                    </a>
                </h4>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div style="font-weight: bold; color: var(--secondary-color);">
                        ${site.formattedRating}/5
                    </div>
                    <div style="background: rgba(52, 152, 219, 0.1); padding: 3px 10px; border-radius: 12px; 
                                font-size: 0.85rem; color: var(--primary-color);">
                        ${site.count} отзыв${site.count === 1 ? '' : site.count >= 5 ? 'ов' : 'а'}
                    </div>
                </div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap;">
                <div style="font-size: 0.9rem; color: #666; display: flex; align-items: center; gap: 5px;">
                    <i class="fas fa-globe" style="font-size: 0.8rem;"></i>
                    <span title="${site.url}">${domain.length > 30 ? domain.substring(0, 30) + '...' : domain}</span>
                </div>
                
                <div style="display: flex; align-items: center;">
                    ${starsHTML}
                </div>
            </div>
        </div>
        
        ${position <= 3 ? `
        <div style="position: absolute; top: -10px; right: -10px; background: ${rankColor}; 
                    color: white; font-size: 0.7rem; padding: 2px 8px; border-radius: 10px; 
                    transform: rotate(15deg); font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            ${position === 1 ? 'ЛУЧШИЙ' : position === 2 ? '2 МЕСТО' : '3 МЕСТО'}
        </div>
        ` : ''}
    `;
    
    // Добавляем hover эффект
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = `0 8px 25px ${position <= 3 ? rankColor + '40' : 'rgba(0,0,0,0.15)'}`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = position <= 3 ? `0 4px 15px ${rankColor}30` : 'var(--shadow)';
    });
    
    return card;
}

// ==================== ФУНКЦИЯ ДЛЯ РЕЙТИНГА ПОЛЬЗОВАТЕЛЕЙ ====================

function displayTopUsers() {
    // Создаем контейнер если его нет
    let topUsersContainer = document.getElementById('top-users-container');
    
    if (!topUsersContainer) {
        const statsPage = document.getElementById('stats-page');
        if (!statsPage) return;
        
        // Создаем новый раздел для топ-пользователей
        const sectionHTML = `
            <div style="margin-top: 40px;">
                <h3 style="margin-bottom: 20px; color: var(--secondary-color);">
                    <i class="fas fa-users"></i> Рейтинг пользователей
                </h3>
                <div id="top-users-container"></div>
            </div>
        `;
        
        // Вставляем после рейтинга сайтов
        const topSitesContainer = document.getElementById('top-sites-container');
        if (topSitesContainer && topSitesContainer.parentNode) {
            topSitesContainer.parentNode.insertAdjacentHTML('afterend', sectionHTML);
        } else {
            // Или просто в конец контейнера статистики
            const statsContainer = statsPage.querySelector('.glass-effect');
            if (statsContainer) {
                statsContainer.insertAdjacentHTML('beforeend', sectionHTML);
            }
        }
        
        topUsersContainer = document.getElementById('top-users-container');
    }
    
    // Получаем данные о пользователях
    const userStats = calculateUserRatings();
    
    if (userStats.length === 0) {
        topUsersContainer.innerHTML = '<p style="text-align: center; color: #666;">Нет данных о пользователях</p>';
        return;
    }
    
    // Ограничиваем 10 топ-пользователями
    const topUsers = userStats.slice(0, 10);
    
    // Очищаем контейнер
    topUsersContainer.innerHTML = '';
    
    // Создаем таблицу
    const table = document.createElement('div');
    table.style.cssText = `
        display: grid;
        gap: 10px;
        margin-top: 20px;
    `;
    
    topUsers.forEach((user, index) => {
        const userCard = createUserRankingCard(user, index + 1);
        table.appendChild(userCard);
    });
    
    topUsersContainer.appendChild(table);
}

// ==================== ФУНКЦИЯ ДЛЯ РАСЧЕТА РЕЙТИНГОВ ПОЛЬЗОВАТЕЛЕЙ ====================

function calculateUserRatings() {
    const userMap = {};
    
    // Собираем статистику по пользователям
    reviews.forEach(review => {
        const userKey = review.email || review.name; // Используем email как уникальный ключ
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
                avgUserRating: 0, // Средняя оценка, которую ставит пользователь
                consistency: 0 // Насколько стабильны его оценки
            };
        }
        
        userMap[userKey].totalRating += review.rating;
        userMap[userKey].count++;
        userMap[userKey].reviews.push({
            rating: review.rating,
            site: review.siteName,
            date: review.date,
            comment: review.comment
        });
        userMap[userKey].sitesReviewed.add(review.siteUrl);
    });
    
    // Рассчитываем метрики для каждого пользователя
    const users = Object.values(userMap)
        .filter(user => user.count >= 1)
        .map(user => {
            // Средняя оценка, которую ставит пользователь
            const avgUserRating = user.totalRating / user.count;
            
            // Консистентность оценок (стандартное отклонение)
            const ratings = user.reviews.map(r => r.rating);
            const mean = avgUserRating;
            const variance = ratings.reduce((sum, rating) => sum + Math.pow(rating - mean, 2), 0) / ratings.length;
            const consistency = 5 - Math.sqrt(variance); // Чем выше, тем консистентнее
            
            // "Вес" пользователя: активность + консистентность + разнообразие
            const activityScore = Math.min(user.count / 10, 1) * 2; // Максимум 2 балла
            const consistencyScore = consistency; // До 5 баллов
            const diversityScore = Math.min(user.sitesReviewed.size / 5, 1); // Максимум 1 балл
            
            const userScore = activityScore + consistencyScore + diversityScore;
            
            return {
                ...user,
                avgUserRating: avgUserRating,
                formattedAvgRating: avgUserRating.toFixed(1),
                consistency: consistency,
                consistencyFormatted: consistency.toFixed(1),
                sitesCount: user.sitesReviewed.size,
                userScore: userScore,
                lastReview: user.reviews.sort((a, b) => new Date(b.date) - new Date(a.date))[0]?.date
            };
        })
        // Сортируем по userScore
        .sort((a, b) => b.userScore - a.userScore);
    
    return users;
}

// ==================== ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ РЕЙТИНГА ПОЛЬЗОВАТЕЛЯ ====================

function createUserRankingCard(user, position) {
    const card = document.createElement('div');
    card.className = 'user-rank-card glass-effect';
    
    // Определяем цвета и иконки для топ-3
    let rankColor = '#3498db'; // Синий для остальных
    let rankIcon = '';
    
    if (position === 1) {
        rankColor = '#FFD700'; // Золотой
        rankIcon = '<i class="fas fa-crown"></i>';
    } else if (position === 2) {
        rankColor = '#C0C0C0'; // Серебряный
        rankIcon = '<i class="fas fa-medal"></i>';
    } else if (position === 3) {
        rankColor = '#CD7F32'; // Бронзовый
        rankIcon = '<i class="fas fa-award"></i>';
    } else {
        rankIcon = `<span style="color: #777; font-weight: bold;">${position}</span>`;
    }
    
    // Определяем тип пользователя по активности
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
    
    card.style.cssText = `
        display: flex;
        align-items: center;
        padding: 15px 20px;
        border-radius: 12px;
        transition: all 0.3s ease;
        border-left: 4px solid ${rankColor};
        position: relative;
        overflow: hidden;
    `;
    
    // Специальные стили для топ-3
    if (position <= 3) {
        card.style.background = `linear-gradient(135deg, ${rankColor}15, rgba(255,255,255,0.9))`;
        card.style.boxShadow = `0 4px 15px ${rankColor}30`;
    }
    
    card.innerHTML = `
        <div style="width: 50px; text-align: center; font-size: 1.5rem; color: ${rankColor};">
            ${rankIcon}
        </div>
        
        <div style="flex-grow: 1; margin: 0 20px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                <div>
                    <h4 style="margin: 0; color: var(--secondary-color); font-size: 1.1rem;">
                        ${user.name}
                    </h4>
                    <div style="font-size: 0.85rem; color: #666; margin-top: 3px; display: flex; align-items: center; gap: 10px;">
                        <span style="background: ${typeColor}15; color: ${typeColor}; padding: 2px 8px; border-radius: 10px;">
                            ${userType}
                        </span>
                        <span style="color: #777;">
                            <i class="fas fa-at"></i> ${user.nickname}
                        </span>
                    </div>
                </div>
                <div style="display: flex; align-items: center; gap: 15px;">
                    <div style="text-align: center;">
                        <div style="font-weight: bold; color: var(--secondary-color); font-size: 1.2rem;">
                            ${user.avgUserRating.toFixed(1)}
                        </div>
                        <div style="font-size: 0.75rem; color: #666;">средняя оценка</div>
                    </div>
                    <div style="background: rgba(52, 152, 219, 0.1); padding: 3px 10px; border-radius: 12px; 
                                font-size: 0.85rem; color: var(--primary-color);">
                        ${user.count} отзыв${user.count === 1 ? '' : user.count >= 5 ? 'ов' : 'а'}
                    </div>
                </div>
            </div>
            
            <div style="display: flex; align-items: center; gap: 15px; flex-wrap: wrap; margin-top: 10px;">
                <div style="font-size: 0.85rem; color: #666; display: flex; align-items: center; gap: 5px;">
                    <i class="fas fa-star" style="color: #FFD700;"></i>
                    <span>Стиль: <strong>${ratingStyle}</strong></span>
                </div>
                
                <div style="font-size: 0.85rem; color: #666; display: flex; align-items: center; gap: 5px;">
                    <i class="fas fa-chart-line" style="color: #2ecc71;"></i>
                    <span>Консистентность: <strong>${user.consistencyFormatted}/5</strong></span>
                </div>
                
                <div style="font-size: 0.85rem; color: #666; display: flex; align-items: center; gap: 5px;">
                    <i class="fas fa-globe" style="color: #9b59b6;"></i>
                    <span>Сайтов: <strong>${user.sitesCount}</strong></span>
                </div>
            </div>
            
            <!-- Последние оценки -->
            <div style="margin-top: 10px; font-size: 0.8rem; color: #888;">
                <i class="fas fa-history"></i> Последние: 
                ${user.reviews
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .slice(0, 2)
                    .map(r => `${r.site} (${r.rating}.0)`)
                    .join(', ')}
            </div>
        </div>
        
        ${position <= 3 ? `
        <div style="position: absolute; top: -10px; right: -10px; background: ${rankColor}; 
                    color: white; font-size: 0.7rem; padding: 2px 8px; border-radius: 10px; 
                    transform: rotate(15deg); font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
            ${position === 1 ? 'ТОП-РЕЦЕНЗЕНТ' : position === 2 ? '2 МЕСТО' : '3 МЕСТО'}
        </div>
        ` : ''}
    `;
    
    // Добавляем hover эффект
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = `0 8px 25px ${position <= 3 ? rankColor + '40' : 'rgba(0,0,0,0.15)'}`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = position <= 3 ? `0 4px 15px ${rankColor}30` : 'var(--shadow)';
    });
    
    return card;
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
