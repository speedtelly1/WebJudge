// Функции для работы с баннером
function initBanner() {
    const banner = document.getElementById('bottom-banner');
    const closeBtn = document.getElementById('banner-close');
    const hideTodayBtn = document.getElementById('banner-hide-today');
    
    if (!banner) return;
    
    // Проверяем, нужно ли показывать баннер
    const bannerHidden = localStorage.getItem('bannerHidden');
    const bannerHiddenTime = localStorage.getItem('bannerHiddenTime');
    
    // Если баннер был скрыт на 24 часа, проверяем время
    if (bannerHiddenTime) {
        const hideTime = parseInt(bannerHiddenTime);
        const currentTime = Date.now();
        const hoursPassed = (currentTime - hideTime) / (1000 * 60 * 60);
        
        // Если прошло больше 24 часов, показываем снова
        if (hoursPassed >= 24) {
            localStorage.removeItem('bannerHidden');
            localStorage.removeItem('bannerHiddenTime');
            banner.style.display = 'flex';
        } else {
            banner.style.display = 'none';
        }
    }
    // Если баннер закрыт навсегда
    else if (bannerHidden === 'true') {
        banner.style.display = 'none';
    }
    
    // Обработка кнопки закрытия навсегда
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            hideBanner('permanent');
        });
    }
    
    // Обработка кнопки скрытия на 24 часа
    if (hideTodayBtn) {
        hideTodayBtn.addEventListener('click', function() {
            hideBanner('24hours');
        });
    }
}

// Функция скрытия баннера
function hideBanner(type) {
    const banner = document.getElementById('bottom-banner');
    
    if (!banner) return;
    
    // Добавляем анимацию скрытия
    banner.classList.add('hiding');
    
    setTimeout(() => {
        if (type === 'permanent') {
            // Скрыть навсегда
            localStorage.setItem('bannerHidden', 'true');
        } else if (type === '24hours') {
            // Скрыть на 24 часа
            localStorage.setItem('bannerHiddenTime', Date.now().toString());
        }
        
        banner.style.display = 'none';
        banner.classList.remove('hiding');
    }, 500); // Время должно совпадать с длительностью анимации
}

// В функцию инициализации приложения добавьте вызов initBanner
document.addEventListener('DOMContentLoaded', function() {
    console.log('Загружено отзывов:', reviews.length);
    
    initNavigation();
    loadReviews();
    createCategoryButtons();
    updateStatistics();
    setupSearchAndFilters();
    
    // Инициализация прогресс-бара
    updateProgress();
    
    // Инициализация баннера
    initBanner();
});
