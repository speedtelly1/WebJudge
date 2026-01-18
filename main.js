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
        
        // Текущий год в футере
        document.getElementById('current-year').textContent = new Date().getFullYear();

// Функция для получения отображаемого никнейма
function getDisplayNickname(review) {
    // 1. Если у отзыва есть nickname, используем его
    if (review.nickname && review.nickname.trim() !== '') {
        return review.nickname;
    }
    
    // 2. Если нет nickname, генерируем анонимный ник (anonim_XXXX)
    return generateAnonimNickname(review.email);
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
                    
                    if (pageId === 'stats') {
                        updateStatistics();
                        displayRatingDistribution();
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
        }

        // Отображение избранных отзывов (последние 3)
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

        // Отображение всех отзывов
        function displayAllReviews(reviewsArray) {
            if (!allReviewsContainer) return;
            
            allReviewsContainer.innerHTML = '';
            
            if (reviewsArray.length === 0) {
                allReviewsContainer.innerHTML = '<div class="no-results"><i class="fas fa-search"></i><h3>Ничего не найдено</h3><p>Попробуйте изменить параметры поиска</p></div>';
                return;
            }
            
            reviewsArray.forEach(review => {
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
                        <h3>${review.name}</h3>
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
                            review.siteUrl.includes('timoshamoscow.github.io') && review.email === 'roll3ogurec0@gmail.com';
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
            
            // Проверка 5: Личная критика
            const personalAttacks = ['дурак', 'идиот', 'тупой', 'грубый', 'глупый', 'грубым', 'глупым', 'тупым'];
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

        // Выполнение поиска
        function performSearch() {
            const searchTerm = searchInput.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                displayAllReviews(reviews);
                return;
            }
            
            const filteredReviews = reviews.filter(review => {
                return (
                    review.name.toLowerCase().includes(searchTerm) ||
                    review.email.toLowerCase().includes(searchTerm) ||
                    review.nickname.toLowerCase().includes(searchTerm) ||
                    review.siteName.toLowerCase().includes(searchTerm) ||
                    review.siteUrl.toLowerCase().includes(searchTerm) ||
                    review.comment.toLowerCase().includes(searchTerm)
                );
            });
            
            displayAllReviews(filteredReviews);
        }

        // Применение фильтров
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
                // 'all' - без фильтрации
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

        // Функция фильтрации отзывов
        function filterByCategory(category) {
            const filteredReviews = reviews.filter(categories[category]);
            displayAllReviews(filteredReviews);
            
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
