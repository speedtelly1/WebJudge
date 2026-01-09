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
