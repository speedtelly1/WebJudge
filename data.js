// data.js
const reviews = [
    {
        id: 1,
        name: "Тимофей",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 5,
        comment: "Лучший сайт с генератором промптов! Экономит по 16 часов в месяц.",
        date: "2026-01-09"
    },
    {
        id: 2,
        name: "Тимофей",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/hranilishe.github.io/",
        siteName: "Хранилище",
        rating: 5,
        comment: "Хороший вебсайт, отлично подходит для пиара своих ресурсов. На мой сайт перешло 100 человек, хотя было 2!",
        date: "2026-01-09"
    },
    {
        id: 3,
        name: "Алёна",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://www.youtube.com/",
        siteName: "YouTube",
        rating: 4,
        comment: "Лучший видеохостинг! Но у меня не получается стать популярной...",
        date: "2026-01-09"
    },
    {
        id: 4,
        name: "Алёна",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 2,
        comment: "Ставлю 2 звезды, потому что сначала думала, что идея и реализация хорошие, но сгенерированный промпт уступает тому, что я делаю вручную, а будущие платные тарифы для школьников не всегда доступны. (Раньше было 3 звезды). Но теперь, я пересмотрела свою позицию, и из-за включения цензуры, отказа добавления 18+ режима. Также, автор оказался грубым, и глупым.",
        date: "2026-01-09"
    },
    {
        id: 5,
        name: "Алёна",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://xn--d1ah4a.com/feed",
        siteName: "итд.com",
        rating: 5,
        comment: "Соцсеть имба. КУЛЬТ ПЛАМЕННОГО СЕРДЦА ВПЕРЁД! ❤️‍🔥❤️‍🔥❤️‍🔥",
        date: "2026-01-09"
    },
    {
        id: 6,
        name: "Роман",
        email: "morfiks689@gmail.com",
        siteUrl: "https://tlauncher.ru/",
        siteName: "TLauncher",
        rating: 3,
        comment: "Хороший лаунчер, но если есть лицензия, советую Modrinth",
        date: "2026-01-09"
    },
    {
        id: 7,
        name: "Константин",
        email: "timosha.sibilev@gmail.com",
        siteUrl: "https://funpay.com/",
        siteName: "FunPay",
        rating: 3,
        comment: "Пользовался FunPay несколько лет назад — купил там почту timosha.sibilev@gmail.com (история длинная 😄). Что понравилось: большой выбор цифровых товаров, безопасная сделка через гаранта. Что не понравилось: высокие комиссии, риск мошенников. Для разовых покупок — нормально, но проверяйте отзывы продавца!",
        date: "2026-01-10"
    },
    {
        id: 8,
        name: "Константин",
        email: "timosha.sibilev@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 3,
        comment: "Хороший сервис, но генератор немного плох, и скуден по функционалу. Видно, писала нейронка, и плохо, просто замена переменных.",
        date: "2026-01-10"
    },
    {
        id: 9,
        name: "Федати",
        email: "1234playergp@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 2,
        comment: "Цензура не дала создать хороший промпт для песни...",
        date: "2026-01-10"
    },
    {
        id: 10,
        name: "Тимоша",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://yandex.ru/games/app/191972",
        siteName: "Битва за территории",
        rating: 5,
        comment: "Лучшая игра в свое время! (2021-22 года)",
        date: "2026-01-10"
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

// Функция для добавления нового отзыва
function addReview(newReview) {
    const maxId = reviews.length > 0 ? Math.max(...reviews.map(r => r.id)) : 0;
    const reviewWithId = {
        id: maxId + 1,
        ...newReview,
        date: new Date().toISOString().split('T')[0]
    };
    reviews.push(reviewWithId);
    return reviewWithId;
}
