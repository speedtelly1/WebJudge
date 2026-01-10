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
        comment: "Пользовался FunPay несколько лет назад — купил там почту timosha.sibilev@gmail.com (история длинная 😄).",
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
    }
];

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
