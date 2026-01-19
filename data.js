// data.js
const reviews = [
    {
        id: 1,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 5,
        comment: "Лучший сайт с генератором промптов! Экономит по 16 часов в месяц.",
        date: "2026-01-09T16:59:00"
    },
    {
        id: 2,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/hranilishe.github.io/",
        siteName: "Хранилище",
        rating: 5,
        comment: "Хороший вебсайт, отлично подходит для пиара своих ресурсов. На мой сайт перешло 100 человек, хотя было 2!",
        date: "2026-01-09T17:02:00"
    },
    {
        id: 3,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://www.youtube.com/",
        siteName: "YouTube",
        rating: 4,
        comment: "Лучший видеохостинг! Но у меня не получается стать популярной...",
        date: "2026-01-09T17:30:00"
    },
    {
        id: 4,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 2,
        comment: "Ставлю 2 звезды, потому что сначала думала, что идея и реализация хорошие, но сгенерированный промпт уступает тому, что я делаю вручную, а будущие платные тарифы для школьников не всегда доступны. (Раньше было 3 звезды). Но теперь, я пересмотрела свою позицию, и из-за включения цензуры, отказа добавления 18+ режима. Также, автор оказался грубым, и глупым.",
        date: "2026-01-09T17:30:00"
    },
    {
        id: 5,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://xn--d1ah4a.com/feed",
        siteName: "итд.com",
        rating: 5,
        comment: "Соцсеть имба. КУЛЬТ ПЛАМЕННОГО СЕРДЦА ВПЕРЁД! ❤️‍🔥❤️‍🔥❤️‍🔥",
        date: "2026-01-09T17:30:00"
    },
    {
        id: 6,
        name: "Роман",
        nickname: "morfiks689",
        email: "morfiks689@gmail.com",
        siteUrl: "https://tlauncher.ru/",
        siteName: "TLauncher",
        rating: 3,
        comment: "Хороший лаунчер, но если есть лицензия, советую Modrinth",
        date: "2026-01-09T17:40:00"
    },
    {
        id: 7,
        name: "Константин",
        nickname: "speedtelly1",
        email: "timosha.sibilev@gmail.com",
        siteUrl: "https://funpay.com/",
        siteName: "FunPay",
        rating: 3,
        comment: "Пользовался FunPay несколько лет назад — купил там почту timosha.sibilev@gmail.com (история длинная 😄). Что понравилось: большой выбор цифровых товаров, безопасная сделка через гаранта. Что не понравилось: высокие комиссии, риск мошенников. Для разовых покупок — нормально, но проверяйте отзывы продавца!",
        date: "2026-01-10T09:07:00"
    },
    {
        id: 8,
        name: "Константин",
        email: "timosha.sibilev@gmail.com",
        nickname: "speedtelly1",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 3,
        comment: "Хороший сервис, но генератор немного плох, и скуден по функционалу. Видно, писала нейронка, и плохо, просто замена переменных.",
        date: "2026-01-10T09:07:00"
    },
    {
        id: 9,
        name: "Федати",
        email: "1234playergp@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 2,
        comment: "Цензура не дала создать хороший промпт для песни...",
        date: "2026-01-10T10:07:00"
    },
    {
        id: 10,
        name: "Тимоша",
        email: "timi.sibi.maxi2010@gmail.com",
        nickname: "timsib",
        siteUrl: "https://yandex.ru/games/app/191972",
        siteName: "Битва за территории",
        rating: 5,
        comment: "Лучшая игра в свое время! (2021-22 года)",
        date: "2026-01-10T10:07:00"
    },
    {
        id: 11,
        name: "Тимоша",
        nickname: "timsib",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://miro.com/app/dashboard/",
        siteName: "Miro",
        rating: 5,
        comment: "Хорошая доска, для уроков и презентаций подходит",
        date: "2026-01-12T21:27:00"
    },
    {
        id: 12,
        name: "Федати",
        email: "1234playergp@gmail.com",
        siteUrl: "https://chat.deepseek.com/",
        siteName: "DeepSeek",
        rating: 5,
        comment: "Хорошая нейросеть, но лучше купите платного Chat GPT",
        date: "2026-01-12T21:28:00"
    },
    {
        id: 13,
        name: "Тимоша",
        nickname: "timsib",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://www.duolingo.com/",
        siteName: "Duolingo",
        rating: 1,
        comment: "Решил я написать свой первый плохой отзыв, и это будет отзыв на Duolingo. Короче. Раньше, это была хорошая платформа, но знаете, почему я ушел с неё? Потому что они убрали возможность загружать фото профиля! я зол.",
        date: "2026-01-15T13:15:00"
    },
    {
        id: 14,
        name: "Тимоша",
        nickname: "timsib",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://www.kinopoisk.ru/",
        siteName: "Кинопоиск",
        rating: 5,
        comment: "Кинопоиск крутой",
        date: "2026-01-15T13:16:00"
    },
    {
        id: 15,
        name: "Роман",
        email: "morfiks689@gmail.com",
        nickname: "morfiks689",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 3,
        comment: "Вполне хороший генератор промптов, но я вижу, как он начал скатываться не в ту сторону :)",
        date: "2026-01-15T13:19:00"
    },
    {
        id: 16,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://speedtelly1.github.io/sitereview.github.io/",
        siteName: "SiteReview",
        rating: 4,
        comment: "Ну что сказать? Хороший отзовик. Но есть подозрение, что отзывы на нем - от ботов",
        date: "2026-01-15T13:21:00"
    },
    {
        id: 17,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://www.youtube.com/",
        siteName: "YouTube",
        rating: 5,
        comment: "Лучший видеохостинг всех времен! Но у меня там походу теневой бан... (Загуглите, если интересно)",
        date: "2026-01-15T13:22:00"
    }
];

// Добавьте в data.js
const categories = {
    'Все': () => true,
    'Соцсети': (review) => ['YouTube', 'итд.com', 'VK', 'Telegram', 'Instagram'].some(name => 
        review.siteName.includes(name) || review.comment.includes('соцсеть')
    ),
    'Игры': (review) => ['TLauncher', 'Битва за территории', 'Steam', 'Epic Games'].some(name =>
        review.siteName.includes(name) || review.comment.includes('игр') || review.comment.includes('гейм')
    ),
    'Инструменты': (review) => ['TAIPrompts', 'Хранилище', 'GitHub', 'Figma', 'Notion'].some(name =>
        review.siteName.includes(name) || review.comment.includes('инструмент') || review.comment.includes('сервис')
    ),
    'Магазины': (review) => ['FunPay', 'Steam', 'Epic Games'].some(name =>
        review.siteName.includes(name) || review.comment.includes('купил') || review.comment.includes('покуп')
    ),
    'Критические': (review) => review.rating <= 2,
    'Авторские': (review) => {
        // Определяем, является ли отзыв авторским
        const isAuthor = review.comment.includes('мой сайт') || 
                         review.comment.includes('я автор') ||
                         // Специфические случаи:
                         (review.name === 'Тимофей' && review.siteName === 'TAIPrompts') ||
                         (review.name === 'Тимофей' && review.siteName === 'Хранилище');
        
        // Только если это автор И рейтинг высокий
        return isAuthor && review.rating >= 4;
    },
    'Позитивные': (review) => review.rating >= 4
};

// Функция генерации анонимного никнейма
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

// Функция для добавления нового отзыва
function addReview(newReview) {
    const maxId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) : 0;
    
    // Генерируем никнейм для нового отзыва, если он не указан
    let nickname = newReview.nickname || '';
    if (!nickname.trim()) {
        // Проверяем, хочет ли пользователь быть анонимным
        const comment = newReview.comment || '';
        const wantsAnonim = comment.toLowerCase().includes('аноним') ||
                           comment.toLowerCase().includes('anonim') ||
                           comment.toLowerCase().includes('скрыть имя');
        
        if (wantsAnonim) {
            nickname = generateAnonimNickname(newReview.email);
        } else {
            // Если нет nickname, оставляем пустым - будет использован username из email
            nickname = '';
        }
    }
    
    const reviewWithId = {
        id: maxId + 1,
        nickname: nickname, // Может быть пустым
        ...newReview,
        date: new Date().toISOString().split('T')[0]
    };
    reviews.push(reviewWithId);
    return reviewWithId;
}

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
