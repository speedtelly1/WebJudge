// data.js
const reviews = [
    {
        id: 1,
        name: "Александр Иванов",
        email: "alex.ivanov@example.com",
        siteUrl: "https://github.com",
        siteName: "GitHub",
        rating: 5,
        comment: "Отличная платформа для хостинга кода и совместной работы над проектами.",
        date: "2024-03-15"
    },
    {
        id: 2,
        name: "Дмитрий Петров",
        email: "dmitry.p@example.com",
        siteUrl: "https://css-tricks.com",
        siteName: "CSS-Tricks",
        rating: 5,
        comment: "Лучший ресурс по CSS.",
        date: "2024-03-05"
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
