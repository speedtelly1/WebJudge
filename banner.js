// Константы для баннера
const BANNER_VERSION = '1.1.5'; // Меняйте при обновлении текста

// Функции для работы с баннером
function initBanner() {
    const banner = document.getElementById('bottom-banner');
    const closeBtn = document.getElementById('banner-close');
    const hideTodayBtn = document.getElementById('banner-hide-today');
    
    if (!banner) {
        console.warn('Баннер не найден на странице');
        return;
    }
    
    // Проверяем, нужно ли показывать баннер
    const bannerHidden = localStorage.getItem(`bannerHidden_v${BANNER_VERSION}`);
    const bannerHiddenTime = localStorage.getItem(`bannerHiddenTime_v${BANNER_VERSION}`);
    
    // Если баннер был скрыт на 24 часа, проверяем время
    if (bannerHiddenTime) {
        const hideTime = parseInt(bannerHiddenTime);
        const currentTime = Date.now();
        const hoursPassed = (currentTime - hideTime) / (1000 * 60 * 60);
        
        // Если прошло больше 24 часов, показываем снова
        if (hoursPassed >= 24) {
            localStorage.removeItem(`bannerHidden_v${BANNER_VERSION}`);
            localStorage.removeItem(`bannerHiddenTime_v${BANNER_VERSION}`);
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
            localStorage.setItem(`bannerHidden_v${BANNER_VERSION}`, 'true');
            localStorage.removeItem(`bannerHiddenTime_v${BANNER_VERSION}`);
        } else if (type === '24hours') {
            // Скрыть на 24 часа
            localStorage.setItem(`bannerHiddenTime_v${BANNER_VERSION}`, Date.now().toString());
            localStorage.removeItem(`bannerHidden_v${BANNER_VERSION}`);
        }
        
        banner.style.display = 'none';
        banner.classList.remove('hiding');
    }, 500);
}

// Инициализация баннера после загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Только инициализация баннера
    initBanner();
});

/*!
 * ============================================================
 * WebJudge - Система оценки веб-сайтов 
 * © 2026 Константин. Все права защищены.
 * 
 * ЛИЦЕНЗИЯ: ЗАПРЕЩЕНО любое использование, копирование, 
 * модификация или распространение без письменного разрешения.
 * 
 * Репозиторий: https://github.com/speedtelly1/WebJudge
 * ============================================================
 */
