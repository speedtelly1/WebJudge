// Константы для баннера
const BANNER_VERSION = '1.2.0'; // Меняйте при обновлении текста
const APP_VERSION = '1.2.2'; // Версия приложения

// Функции для работы с баннером
function initBanner() {
    const banner = document.getElementById('bottom-banner');
    const closeBtn = document.getElementById('banner-close');
    const hideTodayBtn = document.getElementById('banner-hide-today');
    
    if (!banner) {
        console.warn('Баннер не найден на странице');
        return;
    }
    
    // 1. ПРОВЕРЯЕМ, НУЖНО ЛИ ПРЕДЛОЖИТЬ ОЧИСТКУ КЭША
    checkForCacheClear();
    
    // 2. Существующая проверка скрытия баннера
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

// НОВАЯ ФУНКЦИЯ: Проверка необходимости очистки кэша
function checkForCacheClear() {
    const banner = document.getElementById('bottom-banner');
    if (!banner) return;
    
    const storedVersion = localStorage.getItem('appVersion');
    
    // Если версия изменилась или это первое посещение
    if (!storedVersion || storedVersion !== APP_VERSION) {
        // Показываем специальный баннер для очистки кэша
        showCacheClearBanner();
        localStorage.setItem('appVersion', APP_VERSION);
    }
}

// НОВАЯ ФУНКЦИЯ: Показать баннер очистки кэша
function showCacheClearBanner() {
    const banner = document.getElementById('bottom-banner');
    if (!banner) return;
    
    // Устанавливаем HTML баннера для очистки кэша
    banner.innerHTML = `
        <div class="banner-content">
            <div class="banner-text">
                <i class="fas fa-sync-alt" style="color: #3498db;"></i>
                <span><strong>Обновление ${APP_VERSION}!</strong> Для корректной работы сайта обновите страницу.</span>
            </div>
            <div class="banner-actions">
                <button id="force-reload-btn" class="banner-btn secondary" style="background: #27ae60; color: white;">
                    <i class="fas fa-redo"></i> Обновить сейчас
                </button>
                <button id="cache-later-btn" class="banner-btn primary">
                    <i class="fas fa-clock"></i> Позже
                </button>
            </div>
        </div>
    `;
    
    banner.style.display = 'flex';
    banner.style.background = 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
    banner.style.border = '2px solid #27ae60';
    banner.classList.add('cache-banner');
    
    // ОБРАБОТКА КНОПКИ "ОБНОВИТЬ СЕЙЧАС"
    document.getElementById('force-reload-btn').addEventListener('click', function() {
        console.log('Принудительное обновление кэша...');
        
        // ШАГ 1: Очищаем localStorage от старых версий
        localStorage.removeItem('appVersion');
        
        // ШАГ 2: Создаем URL с временной меткой для обхода кэша
        const timestamp = Date.now();
        let newUrl;
        
        // Если уже есть параметры в URL
        if (window.location.search) {
            // Удаляем старые параметры кэша и добавляем новый
            newUrl = window.location.href.replace(/([?&])t=\d+/, '');
            if (newUrl.includes('?')) {
                newUrl += '&t=' + timestamp;
            } else {
                newUrl += '?t=' + timestamp;
            }
        } else {
            // Если нет параметров, просто добавляем
            newUrl = window.location.origin + window.location.pathname + '?t=' + timestamp;
        }
        
        // ШАГ 3: Принудительная перезагрузка
        console.log('Перенаправление на:', newUrl);
        
        // Способ 1: location.replace (не сохраняет в истории)
        // window.location.replace(newUrl);
        
        // Способ 2: Обычный редирект с добавлением в историю
        window.location.href = newUrl;
        
        // ШАГ 4: Fallback - обычная перезагрузка через 1 секунду
        setTimeout(() => {
            location.reload(true); // true = игнорировать кэш
        }, 1000);
    });
    
    // ОБРАБОТКА КНОПКИ "ПОЗЖЕ"
    document.getElementById('cache-later-btn').addEventListener('click', function() {
        // Скрываем баннер на 24 часа
        hideBanner('24hours');
        
        // Помечаем, что пользователь отложил обновление
        localStorage.setItem('cacheUpdateDelayed', Date.now().toString());
    });
}

// Функция скрытия баннера (существующая, без изменений)
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
 * SiteReview - Система оценки веб-сайтов
 * © 2026 Константин. Все права защищены.
 * 
 * ЛИЦЕНЗИЯ: ЗАПРЕЩЕНО любое использование, копирование, 
 * модификация или распространение без письменного разрешения.
 * 
 * Репозиторий: https://github.com/speedtelly1/sitereview
 * ============================================================
 */
