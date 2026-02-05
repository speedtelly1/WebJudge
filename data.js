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
        date: "2026-01-09T17:31:00"
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
        date: "2026-01-09T17:35:00"
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
        date: "2026-01-10T09:08:00"
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
        date: "2026-01-10T10:09:00"
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
    },
    {
        id: 18,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://rutube.ru/",
        siteName: "Rutube",
        rating: 2,
        comment: "Ютуб лучше. Нееет, конечно рутьюб тоже хороший, но единственный минус в том, что там очень частая реклама. Хотелось бы сделать её реже, или вообще убрать для всех",
        date: "2026-02-01T13:42:00"
    },
    {
        id: 19,
        name: "Роман",
        nickname: "morfiks689",
        email: "morfiks689@gmail.com",
        siteUrl: "https://xn--d1ah4a.com/feed",
        siteName: "итд.com",
        rating: 5,
        comment: "итд топ. я в пути",
        date: "2026-02-02T14:08:00"
    },
    {
        id: 20,
        name: "Тимоша",
        nickname: "timsib",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 5,
        comment: "Я только вхожу в мир нейросетей, сайт нашел через ютуб (В ютубе ссылки не было, поэтому еле еле нашел через браузер). В общем, сайт топ, удачи ему в развитии. И да, прошу, не вводите тарифы. Пожалуйста.",
        date: "2026-02-02T14:10:00"
    },
    {
        id: 21,
        name: "Тимоша",
        nickname: "timsib",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://speedtelly1.github.io/sitereview.github.io/",
        siteName: "SiteReview",
        rating: 4,
        comment: "Отзовик прикольный, но порой приходится ждать публикации неделями! Также, некорректные даты отзывов (Конечно, если это дата одобрения отзыва, тогда ок!). И добавьте хоть какие то правила публикации",
        date: "2026-02-02T14:11:00"
    },
    {
        id: 22,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 2,
        comment: "Ставлю 2 звезды. Изначально казалось, что идея и реализация хорошие, однако сгенерированные промпты уступают тем, что я делаю вручную. Будущие платные тарифы выглядят сомнительно доступными для школьников при таком качестве результата. После включения жёсткой цензуры и отказа от добавления 18+ режима сервис стал менее пригоден для творчества, а общение с автором показало его как грубого и глупого.",
        date: "2026-02-05T10:15:00"
    }
];

// Добавьте в data.js
const categories = {
    'Все': () => true,
    'Соцсети': (review) => ['YouTube', 'итд.com', 'VK', 'Telegram', 'Instagram'].some(name => 
        review.siteName.includes(name) || review.comment.includes('соцсе')
    ),
    'Игры': (review) => ['TLauncher', 'Битва за территории', 'Steam', 'Epic Games'].some(name =>
        review.siteName.includes(name) || review.comment.includes('игр') || review.comment.includes('гейм')
    ),
    'Инструменты': (review) => ['TAIPrompts', 'Хранилище', 'GitHub', 'Figma', 'Notion'].some(name =>
        review.siteName.includes(name) || review.comment.includes('инструм') || review.comment.includes('серв')
    ),
    'Магазины': (review) => ['FunPay', 'Steam', 'Epic Games'].some(name =>
        review.siteName.includes(name) || review.comment.includes('купи') || review.comment.includes('покуп')
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

// Добавьте в конец файла data.js, перед финальным комментарием:

// Функция для получения рекомендованных сайтов (хороший рейтинг)
function getRecommendedSites() {
    // Группируем отзывы по сайтам и считаем средний рейтинг
    const siteMap = {};
    
    reviews.forEach(review => {
        if (!siteMap[review.siteUrl]) {
            siteMap[review.siteUrl] = {
                url: review.siteUrl,
                name: review.siteName,
                totalRating: 0,
                count: 0,
                lastReview: new Date(review.date)
            };
        }
        
        siteMap[review.siteUrl].totalRating += review.rating;
        siteMap[review.siteUrl].count++;
        
        const reviewDate = new Date(review.date);
        if (reviewDate > siteMap[review.siteUrl].lastReview) {
            siteMap[review.siteUrl].lastReview = reviewDate;
        }
    });
    
    // Рассчитываем средний рейтинг и фильтруем
    const sitesWithRating = Object.values(siteMap).map(site => ({
        ...site,
        avgRating: site.totalRating / site.count,
        daysSinceLastReview: Math.floor((new Date() - site.lastReview) / (1000 * 60 * 60 * 24))
    }));
    
    // Фильтруем сайты с хорошим рейтингом (≥ 4.0) и хотя бы 2 отзыва
    const recommended = sitesWithRating
        .filter(site => site.avgRating >= 4.0 && site.count >= 2)
        .sort((a, b) => b.avgRating - a.avgRating);
    
    return recommended;
}

// Функция для получения сайтов, которые нуждаются в отзывах
function getSitesNeedingReviews() {
    const siteMap = {};
    
    reviews.forEach(review => {
        if (!siteMap[review.siteUrl]) {
            siteMap[review.siteUrl] = {
                url: review.siteUrl,
                name: review.siteName,
                lastReview: new Date(review.date),
                reviewCount: 0
            };
        }
        
        const reviewDate = new Date(review.date);
        if (reviewDate > siteMap[review.siteUrl].lastReview) {
            siteMap[review.siteUrl].lastReview = reviewDate;
        }
        
        siteMap[review.siteUrl].reviewCount++;
    });
    
    const sites = Object.values(siteMap).map(site => ({
        ...site,
        daysSinceLastReview: Math.floor((new Date() - site.lastReview) / (1000 * 60 * 60 * 24))
    }));
    
    // Сортируем по давности отзыва и количеству отзывов
    // Приоритет: 1) мало отзывов (1-2), 2) давно не было отзывов (>30 дней)
    return sites
        .filter(site => site.reviewCount <= 2 || site.daysSinceLastReview > 30)
        .sort((a, b) => {
            // Сначала по количеству отзывов (чем меньше, тем выше)
            if (a.reviewCount !== b.reviewCount) {
                return a.reviewCount - b.reviewCount;
            }
            // Затем по давности (чем старее, тем выше)
            return b.daysSinceLastReview - a.daysSinceLastReview;
        })
        .slice(0, 10); // Ограничиваем 10 сайтами
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
