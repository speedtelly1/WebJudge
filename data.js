// data.js
const users = [
    {
        id: 1, 
        email: "timosha.sibilev@gmail.com", // Моя очта
        emoji: "🔵", // Эмоджи-клан для аватара
        verified: true // Верифицирован ли
    }
    ];
    
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
        date: "2026-01-10T09:07:00",
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
        date: "2026-01-10T09:08:00",
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
        siteUrl: "https://yandex.ru/games/",
        siteName: "Яндекс.Игры",
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
    },
    {
        id: 23,
        name: "Timofey",
        nickname: "timofey_goryachev_2026",
        email: "timofeyeng9@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 5,
        comment: "Привет! Спасибо! Это Супер сайт. Я пользуюсь месяц сайтом! Спасибо!❤️",
        date: "2026-02-05T11:11:00"
    },
    {
        id: 24,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://yandex.ru/games/",
        siteName: "Яндекс.Игры",
        rating: 3,
        comment: "Хорошая игра, но конкретно эта хуже других. Лучше скачайте оригинальную игру в плей маркете",
        date: "2026-02-05T11:47:00"
    },
    {
        id: 25,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://chat.deepseek.com/",
        siteName: "DeepSeek",
        rating: 4,
        comment: "Нейросеть хорошая, но минус в том, что токены очень быстро заканчиваются, плюс нельзя создавать изображения",
        date: "2026-02-05T11:48:00"
    },
    {
        id: 26,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/hranilishe.github.io/",
        siteName: "Хранилище",
        rating: 2,
        comment: "Система продвижения не работает! И оформление кринж",
        date: "2026-02-05T11:58:00"
    },
    {
        id: 27,
        name: "Роман",
        nickname: "morfiks689",
        email: "morfiks689@gmail.com",
        siteUrl: "https://character.ai/",
        siteName: "Character.ai",
        rating: 5,
        comment: "Сайт имба. Много персонажей для удовлетворения твоего пубертата. Все же мы понимаем, зачем мы туда ходим?",
        date: "2026-02-05T15:18:00"
    },
    {
        id: 28,
        name: "Роман",
        nickname: "morfiks689",
        email: "morfiks689@gmail.com",
        siteUrl: "https://miro.com/app/dashboard/",
        siteName: "Miro",
        rating: 2,
        comment: "Как по мне, данная доска переоценена. Она осталась в прошлом. Где то в 2021-2023 годах (Мое мнение, не бейте)",
        date: "2026-02-05T15:20:00"
    },
    {
        id: 29,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://www.kinopoisk.ru/",
        siteName: "Кинопоиск",
        rating: 3,
        comment: "Кинопоиск топ, но с него постепенно удаляются многие фильмы и тд, поэтому думаю скоро уйду с него.",
        date: "2026-02-05T15:23:00"
    },
    {
        id: 30,
        name: "Timofey",
        nickname: "timofey_goryachev_2026",
        email: "timofeyeng9@gmail.com",
        siteUrl: "https://www.youtube.com/",
        siteName: "YouTube",
        rating: 5,
        comment: "Стрим супер!",
        date: "2026-02-05T16:38:00"
    },
    {
        id: 31,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://www.duolingo.com/",
        siteName: "Duolingo",
        rating: 5,
        comment: "дуолинго прикольный. благодаря новому курсу шахмат, я понял, что оскар нарцисс",
        date: "2026-02-05T16:39:00"
    },
    {
        id: 32,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://www.movavi.com/",
        siteName: "Movavi",
        rating: 3,
        comment: "Раньше был топ, но потом появился капкут",
        date: "2026-02-05T16:40:00"
    },
    {
        id: 33,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://akkumulator950-bit.github.io/promptflame.github.io/",
        siteName: "PromptFlame",
        rating: 1,
        comment: "Просто если честно, промпты плохие, вёрстка сломана. Помню, похвалил Алёну в письме. Так вот. Я был не прав.",
        date: "2026-02-05T17:05:00"
    },
    {
        id: 34,
        name: "Константин",
        nickname: "speedtelly1",
        email: "timosha.sibilev@gmail.com",
        siteUrl: "https://xn--d1ah4a.com/feed",
        siteName: "итд.com",
        rating: 3,
        comment: "Не понимаю, почему все так счастливы от этой соцсети. Обычная соцсеть, не более.",
        date: "2026-02-05T17:37:00"
    },
    {
        id: 35,
        name: "Константин",
        nickname: "speedtelly1",
        email: "timosha.sibilev@gmail.com",
        siteUrl: "https://akkumulator950-bit.github.io/promptflame.github.io/",
        siteName: "PromptFlame",
        rating: 3,
        comment: "Проверил данный генератор, и могу сказать, что прошлый отзыв прав на 50%. Генератор не так уж и плох, но верстка генератора сломана",
        date: "2026-02-05T17:54:00"
    },
    {
        id: 36,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://akkumulator950-bit.github.io/promptflame.github.io/",
        siteName: "PromptFlame",
        rating: 5,
        comment: "Заметила спорные оценки на свой сайт, и не буду скрывать, да. это мой сайт. Ну что сказать, Тимоша. Ты начал войну. А так, сайт имба, в отличии от TAIPrompts",
        date: "2026-02-05T21:19:00"
    },
    {
        id: 37,
        name: "Timofey",
        nickname: "timofey_goryachev_2026",
        email: "timofeyeng9@gmail.com",
        siteUrl: "https://one.google.com/",
        siteName: "Google One",
        rating: 1,
        comment: "Самый ужасный сайт!!! 🤬🤬🤬",
        date: "2026-02-06T09:12:00"
    },
    {
        id: 38,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://www.twitch.tv/",
        siteName: "Twitch",
        rating: 4,
        comment: "Стримы топ, но в последнее время ужасно просело качество, зависать стало. Но если не учитывать проблем, то имба",
        date: "2026-02-06T13:22:00"
    },
    {
        id: 39,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://kick.com/",
        siteName: "KICK",
        rating: 1,
        comment: "Если ты стримишь на этой платформе, ну тогда че. Ты лох получается. Платформа для тех, кого забанили на других. Отстой в общем",
        date: "2026-02-06T13:23:00"
    },
    {
        id: 40,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://one.google.com/",
        siteName: "Google One",
        rating: 5,
        comment: "Топовое облако, не знаю, почему его захейтили на сайт ревью. Короче круто",
        date: "2026-02-06T19:17:00"
    },
    {
        id: 41,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://web.telegram.org/",
        siteName: "Telegram Web",
        rating: 1,
        comment: "Кто-то пользуется веб версией?",
        date: "2026-02-06T19:18:00"
    },
    {
        id: 42,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://tlauncher.ru/",
        siteName: "TLauncher",
        rating: 3,
        comment: "Хороший лаунчер, но легаси версия лучше",
        date: "2026-02-06T19:37:00"
    },
    {
        id: 43,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://funpay.com/",
        siteName: "FunPay",
        rating: 5,
        comment: "Сайт имба, пополнение стим практически без комиссии",
        date: "2026-02-06T19:40:00"
    },
    {
        id: 44,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://character.ai/",
        siteName: "Character.ai",
        rating: 5,
        comment: "Сайт топовый. Наверное после пубертата перестану туда ходить (ну или нет)",
        date: "2026-02-06T19:41:00"
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
                         // Конкретный случай: Тимофей о TAIPrompts
                         (review.name === 'Тимофей' && 
                         review.email === 'roll3ogurec0@gmail.com' && 
                         review.siteName === 'TAIPrompts');
        
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

// Функция для добавления нового отзыва (ОБНОВЛЕННАЯ ВЕРСИЯ)
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
            // Если хочет быть анонимным - генерируем анонимный ник
            nickname = generateAnonimNickname(newReview.email);
        } else {
            // Если не указал nickname и не хочет быть анонимным
            // Оставляем пустым - функция getDisplayNickname сама решит
            nickname = '';
        }
    }
    
    const reviewWithId = {
        id: maxId + 1,
        nickname: nickname, // Может быть пустым - это нормально
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

// Функция для получения сайтов, которые нуждаются в отзывах (ОБНОВЛЁННАЯ)
function getSitesNeedingReviews() {
    const siteMap = {};
    const currentDate = new Date();
    
    // Собираем статистику по сайтам
    reviews.forEach(review => {
        if (!siteMap[review.siteUrl]) {
            siteMap[review.siteUrl] = {
                url: review.siteUrl,
                name: review.siteName,
                lastReview: new Date(review.date),
                reviewCount: 0,
                ratings: []
            };
        }
        
        const reviewDate = new Date(review.date);
        if (reviewDate > siteMap[review.siteUrl].lastReview) {
            siteMap[review.siteUrl].lastReview = reviewDate;
        }
        
        siteMap[review.siteUrl].reviewCount++;
        siteMap[review.siteUrl].ratings.push(review.rating);
    });
    
    const sites = Object.values(siteMap).map(site => {
        // Рассчитываем сколько дней прошло с последнего отзыва
        const daysSinceLastReview = Math.floor((currentDate - site.lastReview) / (1000 * 60 * 60 * 24));
        
        // Рассчитываем средний рейтинг
        const avgRating = site.ratings.reduce((sum, r) => sum + r, 0) / site.ratings.length;
        
        // Определяем приоритет (чем выше, тем больше нуждается)
        let priority = 0;
        
        // Критерий 1: Мало отзывов (высший приоритет)
        if (site.reviewCount <= 2) {
            priority += 100 - (site.reviewCount * 10); // 1 отзыв = 90, 2 отзыва = 80
        }
        
        // Критерий 2: Давно не было отзывов (>30 дней)
        if (daysSinceLastReview > 30) {
            priority += Math.min(daysSinceLastReview / 10, 50); // Максимум +50 баллов
        }
        
        // Критерий 3: Низкий рейтинг (<3.0)
        if (avgRating < 3.0) {
            priority += (3.0 - avgRating) * 20; // Чем ниже рейтинг, тем выше приоритет
        }
        
        // Критерий 4: Противоречивые оценки (высокий разброс)
        const ratingStd = calculateStandardDeviation(site.ratings);
        if (ratingStd > 1.5) { // Большой разброс оценок
            priority += ratingStd * 10;
        }
        
        return {
            ...site,
            daysSinceLastReview: daysSinceLastReview,
            avgRating: avgRating.toFixed(1),
            priority: priority,
            needsReviewsReason: getNeedsReason(site.reviewCount, daysSinceLastReview, avgRating)
        };
    });
    
    // Сортируем по приоритету (высший приоритет = больше нуждается)
    return sites
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 10); // Ограничиваем 10 сайтами
}

// Вспомогательная функция: рассчитывает стандартное отклонение
function calculateStandardDeviation(numbers) {
    const mean = numbers.reduce((sum, num) => sum + num, 0) / numbers.length;
    const variance = numbers.reduce((sum, num) => sum + Math.pow(num - mean, 2), 0) / numbers.length;
    return Math.sqrt(variance);
}

// Вспомогательная функция: определяет причину
function getNeedsReason(count, days, rating) {
    const reasons = [];
    
    if (count <= 2) {
        reasons.push(count === 1 ? '1 отзыв' : '2 отзыва');
    }
    
    if (days > 30) {
        const months = Math.floor(days / 30);
        reasons.push(`${months} ${months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев'} без отзывов`);
    }
    
    if (rating < 3.0) {
        reasons.push('низкий рейтинг');
    }
    
    return reasons.join(' • ');
}

// ==================== СИСТЕМА ЭМОДЖИ-АВАТАРОК ====================

// 1. Получить эмоджи аватарку по email
function getUserEmojiAvatar(email) {
    const user = users.find(u => u.email === email);
    
    if (!user) {
        // Если пользователя нет в массиве - генерируем эмоджи из email
        return generateEmojiFromEmail(email);
    }
    
    // Если есть в массиве - используем его эмоджи
    return user.emoji || "👤";
}

// 2. Генерация эмоджи из email (если пользователя нет в массиве)
function generateEmojiFromEmail(email) {
    const emailToEmoji = {
        'timosha.sibilev@gmail.com': '🔵',      // Я
    };
    
    return emailToEmoji[email] || getRandomEmoji(email);
}

// 3. Случайный эмоджи на основе email (для новых пользователей)
function getRandomEmoji(email) {
    const emojiSets = {
        // Синий набор для верифицированных
        verified: ['🔷', '💎'],
        // Разноцветный для обычных
        default: ['😊', '😎', '🤓', '🧐', '🤩', '😄', '😁', '😃']
    };
    
    // Проверяем верификацию
    const user = users.find(u => u.email === email);
    const isVerified = user ? user.verified : false;
    
    // Выбираем набор
    const set = isVerified ? emojiSets.verified : emojiSets.default;
    
    // Генерируем индекс из email
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
        hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % set.length);
    
    return set[index];
}

// 4. Отображение аватарки в интерфейсе
function renderEmojiAvatar(email, size = 'medium') {
    const emoji = getUserEmojiAvatar(email);
    const user = users.find(u => u.email === email);
    const isVerified = user ? user.verified : false;
    
    const sizes = {
        small: '30px',
        medium: '40px',
        large: '60px',
        xlarge: '80px'
    };
    
    const fontSize = {
        small: '1.2rem',
        medium: '1.5rem',
        large: '2rem',
        xlarge: '2.5rem'
    };
    
    // Цвет рамки для верифицированных
    const borderStyle = isVerified 
        ? 'border: 2px solid #3498db; box-shadow: 0 0 10px rgba(52, 152, 219, 0.5);'
        : 'border: 2px solid rgba(0,0,0,0.1);';
    
    return `
        <div class="emoji-avatar" style="
            width: ${sizes[size]};
            height: ${sizes[size]};
            ${borderStyle}
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: ${fontSize[size]};
            background: rgba(255,255,255,0.9);
            cursor: pointer;
            transition: all 0.3s ease;
            user-select: none;
        " title="${email}${isVerified ? 'Проверенный пользователь' : ''}">
            ${emoji}
        </div>
    `;
}

// 5. Обновить карточки отзывов с эмоджи-аватарками
function updateReviewCardsWithAvatars() {
    document.querySelectorAll('.review-card').forEach(card => {
        const reviewId = parseInt(card.getAttribute('data-review-id'));
        const review = reviews.find(r => r.id === reviewId);
        
        if (review && review.email) {
            // Находим заголовок карточки
            const header = card.querySelector('.review-header .reviewer-info');
            if (header) {
                // Добавляем аватарку перед именем
                const avatarHtml = renderEmojiAvatar(review.email, 'small');
                header.insertAdjacentHTML('afterbegin', avatarHtml);
                
                // Добавляем стили для выравнивания
                const avatar = header.querySelector('.emoji-avatar');
                if (avatar) {
                    avatar.style.marginRight = '10px';
                    avatar.style.marginTop = '2px';
                }
            }
        }
    });
}

// 6. Обновить профили пользователей с аватарками
function updateUserProfilesWithAvatars() {
    document.querySelectorAll('[data-user-id]').forEach(element => {
        const userId = element.getAttribute('data-user-id');
        // Находим email по ID (нужно будет создать маппинг)
        const userEmail = getUserEmailById(userId);
        
        if (userEmail) {
            const avatarHtml = renderEmojiAvatar(userEmail, 'medium');
            element.insertAdjacentHTML('beforebegin', avatarHtml);
        }
    });
}

// 7. Вспомогательная функция для получения email по ID
function getUserEmailById(userId) {
    // Ищем в reviews
    const review = reviews.find(r => {
        const reviewUserId = generateUserId(r.email);
        return reviewUserId === userId;
    });
    
    return review ? review.email : null;
}

// 8. Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем карточки отзывов
    setTimeout(() => {
        updateReviewCardsWithAvatars();
    }, 100);
    
    // Добавляем CSS стили
    const style = document.createElement('style');
    style.textContent = `
        .emoji-avatar:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        }
        
        .review-header {
            display: flex;
            align-items: flex-start;
        }
        
        .review-header .emoji-avatar {
            flex-shrink: 0;
        }
    `;
    document.head.appendChild(style);
});

// 9. Показать все эмоджи пользователей (для отладки)
function showAllUserEmojis() {
    console.log('=== ЭМОДЖИ ПОЛЬЗОВАТЕЛЕЙ ===');
    const uniqueEmails = [...new Set(reviews.map(r => r.email))];
    
    uniqueEmails.forEach(email => {
        const emoji = getUserEmojiAvatar(email);
        const user = users.find(u => u.email === email);
        const verified = user ? user.verified : false;
        
        console.log(`${emoji} ${email} ${verified ? '✓' : ''}`);
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
