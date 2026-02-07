// ГЕНЕРАТОР ВЕРСИЙ - меняется КАЖДЫЙ РАЗ при обновлении
const APP_VERSION = (new Date()).getTime().toString(); // Уникальная версия на основе времени
const BANNER_VERSION = 'cache_cleaner_force';

// Функции для работы с баннером
function initBanner() {
    const banner = document.getElementById('bottom-banner');
    
    if (!banner) {
        console.warn('Баннер не найден на странице');
        return;
    }
    
    // ВСЕГДА проверяем и показываем баннер очистки кэша
    checkAndForceCacheClear();
}

// ПРИНУДИТЕЛЬНАЯ ОЧИСТКА КЭША У ВСЕХ
function checkAndForceCacheClear() {
    const banner = document.getElementById('bottom-banner');
    if (!banner) return;
    
    const lastCleared = localStorage.getItem('lastCacheClear');
    const currentTime = Date.now();
    
    // Если кэш не очищался в течение последних 5 минут
    if (!lastCleared || (currentTime - parseInt(lastCleared)) > 300000) {
        showMegaCacheClearBanner();
    }
}

// МЕГА-БАННЕР (нельзя закрыть, только обновить)
function showMegaCacheClearBanner() {
    const banner = document.getElementById('bottom-banner');
    if (!banner) return;
    
    // HTML баннера
    banner.innerHTML = `
        <div class="banner-content" style="width: 100%;">
            <div class="banner-text" style="flex-grow: 1;">
                <i class="fas fa-exclamation-triangle" style="color: #e74c3c; font-size: 1.5rem;"></i>
                <div style="margin-left: 15px;">
                    <strong style="color: #e74c3c; font-size: 1.1rem;">ВАЖНОЕ ОБНОВЛЕНИЕ!</strong>
                    <div style="color: #2c3e50; margin-top: 5px;">
                        Для корректной работы сайта необходимо обновить кэш браузера.
                        <div style="font-size: 0.9rem; color: #666; margin-top: 3px;">
                            Нажмите кнопку ниже или используйте <kbd>Ctrl+F5</kbd>
                        </div>
                    </div>
                </div>
            </div>
            <div class="banner-actions" style="flex-shrink: 0;">
                <button id="mega-force-reload" class="banner-btn mega-btn" 
                        style="background: linear-gradient(135deg, #e74c3c, #c0392b); 
                               color: white; font-weight: bold; padding: 12px 25px;">
                    <i class="fas fa-bolt"></i> ОБНОВИТЬ САЙТ
                </button>
            </div>
        </div>
        
        <!-- Инструкции -->
        <div id="cache-instructions" style="display: none; margin-top: 15px; padding: 15px; 
             background: rgba(231, 76, 60, 0.1); border-radius: 10px; border-left: 3px solid #e74c3c;">
            <h4 style="margin: 0 0 10px 0; color: #2c3e50;">
                <i class="fas fa-info-circle"></i> Если кнопка не помогла:
            </h4>
            <ol style="margin: 0; padding-left: 20px; color: #666;">
                <li>Нажмите <kbd>Ctrl+Shift+Delete</kbd> (Windows) или <kbd>Cmd+Shift+Delete</kbd> (Mac)</li>
                <li>Выберите "За всё время" и "Изображения и файлы в кэше"</li>
                <li>Нажмите "Удалить данные"</li>
                <li>Перезагрузите страницу с помощью <kbd>Ctrl+F5</kbd></li>
            </ol>
            <button onclick="location.reload(true)" style="
                margin-top: 10px;
                padding: 8px 15px;
                background: #3498db;
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
            ">
                <i class="fas fa-redo"></i> Перезагрузить снова
            </button>
        </div>
    `;
    
    // Стилизация
    banner.style.cssText = `
        position: fixed;
        top: 20px !important;
        bottom: auto !important;
        left: 50%;
        transform: translateX(-50%);
        width: 95%;
        max-width: 900px;
        background: linear-gradient(135deg, #fff5f5, #ffeaea) !important;
        color: #2c3e50;
        padding: 20px 25px;
        border-radius: 15px;
        box-shadow: 0 10px 40px rgba(231, 76, 60, 0.3),
                    0 0 0 3px #e74c3c;
        z-index: 9999;
        animation: pulseRed 1.5s infinite;
        border: none;
        backdrop-filter: blur(20px);
    `;
    
    banner.style.display = 'flex';
    banner.style.flexDirection = 'column';
    
    // Анимация пульсации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulseRed {
            0% { box-shadow: 0 10px 40px rgba(231, 76, 60, 0.3), 0 0 0 3px #e74c3c; }
            50% { box-shadow: 0 10px 50px rgba(231, 76, 60, 0.5), 0 0 0 5px #e74c3c; }
            100% { box-shadow: 0 10px 40px rgba(231, 76, 60, 0.3), 0 0 0 3px #e74c3c; }
        }
        
        .mega-btn:hover {
            transform: scale(1.05) !important;
            box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4) !important;
        }
        
        kbd {
            background: #2c3e50;
            color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-family: monospace;
            font-size: 0.9rem;
            margin: 0 3px;
        }
    `;
    document.head.appendChild(style);
    
    // Обработчик кнопки ОБНОВИТЬ САЙТ
    document.getElementById('mega-force-reload').addEventListener('click', function() {
        console.log('🔴 МЕГА-ОЧИСТКА КЭША ДЛЯ ВСЕХ ПОЛЬЗОВАТЕЛЕЙ');
        
        // 1. Сохраняем время очистки
        localStorage.setItem('lastCacheClear', Date.now().toString());
        localStorage.setItem('appVersion', APP_VERSION);
        
        // 2. Очищаем ВСЁ localStorage (опционально)
        // localStorage.clear();
        
        // 3. Создаем УНИКАЛЬНЫЙ URL с таймстампом
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(7);
        
        // Получаем текущий URL без параметров
        const baseUrl = window.location.origin + window.location.pathname;
        
        // Добавляем МНОГО параметров для гарантии
        const newUrl = `${baseUrl}?v=${APP_VERSION}&t=${timestamp}&r=${random}&nocache=1&force=1`;
        
        console.log('🔄 Перенаправление на:', newUrl);
        
        // 4. Показываем инструкции на случай, если не сработает
        document.getElementById('cache-instructions').style.display = 'block';
        
        // 5. Жесткий редирект
        setTimeout(() => {
            // Используем replace чтобы не было возможности вернуться назад
            window.location.replace(newUrl);
        }, 500);
        
        // 6. Fallback через 3 секунды
        setTimeout(() => {
            location.reload(true); // true = игнорировать кэш
        }, 3000);
    });
    
    // Автоматическое обновление через 30 секунд, если пользователь бездействует
    setTimeout(() => {
        if (document.getElementById('mega-force-reload')) {
            console.log('🔄 Автоматическое обновление через 30 секунд...');
            document.getElementById('mega-force-reload').click();
        }
    }, 30000);
}

// НУЖНО ДОБАВИТЬ В КАЖДЫЙ JS-ФАЙЛ В НАЧАЛО:

// В main.js, data.js, banner.js добавьте:
console.log(`🚀 SiteReview v${APP_VERSION} загружен`);
console.log('⚠️ Для разработчиков: отключите кэш в DevTools (F12 → Network → Disable cache)');

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔄 Инициализация принудительной очистки кэша...');
    initBanner();
    
    // Дополнительная проверка при загрузке
    setTimeout(() => {
        const currentVersion = localStorage.getItem('appVersion');
        if (!currentVersion || currentVersion !== APP_VERSION) {
            console.warn('⚠️ Обнаружена устаревшая версия в кэше');
            if (!document.querySelector('.mega-btn')) {
                showMegaCacheClearBanner();
            }
        }
    }, 1000);
});

// Экстренная функция для ручного вызова из консоли
window.forceCacheClearForAll = function() {
    console.log('🛠 Ручная очистка кэша для всех пользователей');
    showMegaCacheClearBanner();
    return 'Баннер очистки кэша активирован!';
};

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
