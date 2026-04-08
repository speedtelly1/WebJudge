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
        comment: "Ставлю 2 звезды, потому что сначала думала, что идея и реализация хорошие, но сгенерированный промпт уступает тому, что я делаю вручную, а будущие платные тарифы для школьников не всегда доступны. (Раньше было 3 звезды). Но теперь, я пересмотрела свою позицию, и из-за включения цензуры, отказа добавления 18+ режима.",
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
        comment: "Пользовался FunPay несколько лет назад — купил там почту timosha.sibilev@gmail.com (история длинная). Понравился большой выбор цифровых товаров, безопасные сделки. Есть одно но, например, высокие комиссии, риск мошенников. Для разовых покупок нормально, но проверяйте отзывы продавца",
        date: "2026-01-10T09:07:00",
        verified: true
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
        verified: true
    },
    {
        id: 9,
        name: "Федати",
        email: "1234playergp@gmail.com",
        nickname: "1234playergp",
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
        nickname: "timbrayrot",
        siteUrl: "https://yandex.ru/games/",
        siteName: "Яндекс.Игры",
        rating: 5,
        comment: "Лучшая игра в свое время! (2021-22 года)",
        date: "2026-01-10T10:09:00"
    },
    {
        id: 11,
        name: "Тимоша",
        nickname: "timbrayrot",
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
        nickname: "1234playergp",
        siteUrl: "https://www.deepseek.com/",
        siteName: "DeepSeek",
        rating: 5,
        comment: "Хорошая нейросеть, но лучше купите платного Chat GPT",
        date: "2026-01-12T21:28:00"
    },
    {
        id: 13,
        name: "Тимоша",
        nickname: "timbrayrot",
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
        nickname: "timbrayrot",
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
        comment: "Ну что сказать? Хороший отзовик. Но есть подозрение, что отзывы на нем не все реальны",
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
        comment: "Лучший видеохостинг всех времен! Но у меня там походу теневой бан.",
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
        nickname: "timbrayrot",
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
        nickname: "timbrayrot",
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
        comment: "Ставлю 2 звезды. Изначально казалось, что идея и реализация хорошие, однако сгенерированные промпты уступают тем, что я делаю вручную. Будущие платные тарифы выглядят сомнительно доступными для школьников при таком качестве результата. После включения жёсткой цензуры и отказа от добавления 18+ режима сервис стал менее пригоден для творчества",
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
        siteUrl: "https://www.deepseek.com/",
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
        comment: "Как по мне, данная доска переоценена. Она осталась в прошлом. Где то в 2021-2023 годах",
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
        date: "2026-02-05T17:37:00",
        verified: true
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
        date: "2026-02-05T17:54:00",
        verified: true
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
        comment: "Если ты стримишь на этой платформе, ну тогда че. Не повезло тебе. Платформа для тех, кого забанили на других. Отстой в общем",
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
    },
    {
        id: 45,
        name: "Timofey",
        nickname: "timofey_goryachev_2026",
        email: "timofeyeng9@gmail.com",
        siteUrl: "https://web.telegram.org/",
        siteName: "Telegram Web",
        rating: 5,
        comment: "Супер!",
        date: "2026-02-07T08:15:00"
    },
    {
        id: 46,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://xtv27.github.io/MAX-OS/",
        siteName: "MAX OS",
        rating: 3,
        comment: "Система норм, но надо больше функций, допилить старые и разделить код на разные файлы. Смотрел репозиторий, там все в одном файле",
        date: "2026-02-07T08:18:00"
    },
    {
        id: 47,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://character.ai/",
        siteName: "Character.ai",
        rating: 1,
        comment: "Был топовый сайт, но меня там забанили",
        date: "2026-02-07T16:24:00"
    },
    {
        id: 48,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://www.deepseek.com/",
        siteName: "DeepSeek",
        rating: 1,
        comment: "Клод лучше",
        date: "2026-02-07T16:25:00"
    },
    {
        id: 49,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://funpay.com/",
        siteName: "FunPay",
        rating: 2,
        comment: "Скам контора",
        date: "2026-02-07T16:28:00"
    },
    {
        id: 50,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://miro.com/app/dashboard/",
        siteName: "Miro",
        rating: 1,
        comment: "Дизайн из 90-х",
        date: "2026-02-07T16:30:00"
    },
    {
        id: 51,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://rutube.ru/",
        siteName: "Rutube",
        rating: 2,
        comment: "Ютуб лучше",
        date: "2026-02-07T21:00:00"
    },
    {
        id: 52,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://tlauncher.ru/",
        siteName: "TLauncher",
        rating: 2,
        comment: "Лаунчеру дизлайк",
        date: "2026-02-07T21:00:10"
    },
    {
        id: 53,
        name: "Тимоша",
        nickname: "timbrayrot",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://akkumulator950-bit.github.io/promptflame.github.io/",
        siteName: "PromptFlame",
        rating: 1,
        comment: "Дизайн режет глазки, сайт сломан",
        date: "2026-02-07T21:01:00"
    },
    {
        id: 54,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://books.yandex.ru/",
        siteName: "Яндекс.Книги",
        rating: 5,
        comment: "Очень смешная история. Советую любителям классики. (Смешно, Мудро, Весело)",
        date: "2026-02-10T08:42:00"
    },
    {
        id: 55,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://music.yandex.ru/",
        siteName: "Яндекс.Музыка",
        rating: 5,
        comment: "Сервис имба. Люблю Яндекс",
        date: "2026-02-10T20:48:00"
    },
    {
        id: 56,
        name: "Константин",
        email: "timosha.sibilev@gmail.com",
        nickname: "speedtelly1",
        siteUrl: "https://www.youtube.com/",
        siteName: "YouTube",
        rating: 5,
        comment: "Лучший сайт ever!",
        date: "2026-02-11T19:30:00",
        verified: true
    },
    {
        id: 57,
        name: "Константин",
        email: "timosha.sibilev@gmail.com",
        nickname: "speedtelly1",
        siteUrl: "https://www.deepseek.com/",
        siteName: "DeepSeek",
        rating: 4,
        comment: "Топовая нейронка",
        date: "2026-02-11T19:35:00",
        verified: true
    },
    {
        id: 58,
        name: "Константин",
        email: "timosha.sibilev@gmail.com",
        nickname: "speedtelly1",
        siteUrl: "https://kick.com/",
        siteName: "KICK",
        rating: 3,
        comment: "Нормальный хостинг для стримов, почему он никому не нравится?",
        date: "2026-02-12T10:32:00",
        verified: true
    },
    {
        id: 59,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://www.mos.ru/",
        siteName: "Mos.ru",
        rating: 1,
        comment: "Самый худший сайт, который я видел. Ужасно неудобный, навигация хромает. Застрял на этапе логина",
        date: "2026-02-12T14:28:00"
    },
    {
        id: 60,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://max.ru/",
        siteName: "MAX",
        rating: 1,
        comment: "Приложение Max полный отстой! Выглядит как сырая копия телеграм, нельзя сделать импорт из телеграм, мало настроек, нельзя создавать каналы (группы можно), и это просто капец! Одна звезда",
        date: "2026-02-13T10:35:00"
    },
    {
        id: 61,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 4,
        comment: "Спасибо, что убрали платные тарифы, осталось только улучшить генератор, и отказаться от телеграм бота. А так, все гудик 😉",
        date: "2026-02-13T10:36:10"
    },
    {
        id: 62,
        name: "Федати",
        email: "1234playergp@gmail.com",
        nickname: "1234playergp",
        siteUrl: "https://rutube.ru/",
        siteName: "Rutube",
        rating: 4,
        comment: "В принципе нормальный хостинг, но рекомендации надо чинить",
        date: "2026-03-12T09:13:00"
    },
    {
        id: 63,
        name: "Федати",
        email: "1234playergp@gmail.com",
        nickname: "1234playergp",
        siteUrl: "https://max.ru/",
        siteName: "MAX",
        rating: 1,
        comment: "Ну не смешите мои колени, этим кто то будет пользоваться? Качайте телеграм + VPN и ваши проблемы решаться ",
        date: "2026-03-12T09:14:00"
    },
    {
        id: 64,
        name: "Алёна",
        nickname: "fanalenki",
        email: "akkumulator950@gmail.com",
        siteUrl: "https://suno.com/",
        siteName: "Suno",
        rating: 4,
        comment: "Сайт топовый, но платные подписки конечно манят...",
        date: "2026-03-16T19:31:10"
    },
    {
        id: 65,
        name: "Роман",
        nickname: "morfiks689",
        email: "morfiks689@gmail.com",
        siteUrl: "https://boosty.to/",
        siteName: "Boosty",
        rating: 5,
        comment: "Очень топовый сайт для блогеров, недооценен.",
        date: "2026-03-16T19:38:00"
    },
    {
        id: 66,
        name: "Федати",
        email: "1234playergp@gmail.com",
        nickname: "1234playergp",
        siteUrl: "https://xn--d1ah4a.com/feed",
        siteName: "итд.com",
        rating: 3,
        comment: "Телеграм лучше:)",
        date: "2026-03-16T19:39:00"
    },
    {
        id: 67,
        name: "Тимоша",
        nickname: "timbrayrot",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://yandex.ru/images/",
        siteName: "Яндекс.Картинки",
        rating: 5,
        comment: "Яндекс картинки топ. Даже придраться не к чему",
        date: "2026-03-17T10:49:00"
    },
    {
        id: 68,
        name: "Тимоша",
        nickname: "timbrayrot",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://www.canva.com/",
        siteName: "Canva",
        rating: 1,
        comment: "Сайт недоступен в РФ!!! 😡😡",
        date: "2026-03-17T10:50:00"
    },
    {
        id: 69,
        name: "Тимоша",
        nickname: "timbrayrot",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://turbologo.ru/",
        siteName: "Turbologo",
        rating: 4,
        comment: "Сайт прикольный, но бесят вотермарки по площади всего лого! 😡🤬",
        date: "2026-03-17T10:51:00"
    },
    {
        id: 70,
        name: "Федати",
        email: "1234playergp@gmail.com",
        nickname: "1234playergp",
        siteUrl: "https://speedtelly1.github.io/sitereview.github.io/",
        siteName: "SiteReview",
        rating: 4,
        comment: "Хотел я уже писать плохой отзыв на этот сайт из-за того, что мне поставили имя Федор, хотя я Федати! Фе-Да-Ти! Но мне сменили на Федати, так что отзовик топовый, хотя и есть странные отзывы",
        date: "2026-03-17T11:23:00"
    },
    {
        id: 71,
        name: "Тимофей",
        nickname: "timoshamoscow",
        email: "roll3ogurec0@gmail.com",
        siteUrl: "https://superyogurt118.github.io/Patriot/",
        siteName: "Patriot OS",
        rating: 4,
        comment: "Я конечно понимаю, что это я с другом создал эту OS, но мы создали её как демонстрацию, так что, обращаюсь к правительству РФ. Не надо делать такую OS, и разблокируйте сайты в рунете! Но наша демонстрация получилась годная",
        date: "2026-03-20T20:23:00"
    },
    {
        id: 72,
        name: "Константин",
        email: "timosha.sibilev@gmail.com",
        nickname: "speedtelly1",
        siteUrl: "https://superyogurt118.github.io/Patriot/",
        siteName: "Patriot OS",
        rating: 2,
        comment: "В принципе хороший сайт, OS, выглядит красиво, но половина функций не работает, поэтому нет.",
        date: "2026-03-27T14:32:00",
        verified: true
    },
    {
        id: 73,
        name: "Тимоша",
        nickname: "timbrayrot",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://moozoom.netlify.app/",
        siteName: "Moozoom",
        rating: 5,
        comment: "Хорошая соцсеть, жаль что нет реального бекенда, и особенность в том, что нельзя сменить эмодзи после входа (эмодзи ставится вместо авы)",
        date: "2026-03-27T14:38:00"
    },
    {
        id: 74,
        name: "Константин",
        email: "timosha.sibilev@gmail.com",
        nickname: "speedtelly1",
        siteUrl: "https://www.mos.ru/",
        siteName: "Mos.ru",
        rating: 5,
        comment: "Хороший сайт, свои функции выполняет, чего ещё от него нужно?",
        date: "2026-03-27T17:14:00",
        verified: true
    },
    {
        id: 75,
        name: "Даша",
        nickname: "dashulya2014",
        email: "dashulya2014yt@gmail.com",
        siteUrl: "https://max.ru/",
        siteName: "MAX",
        rating: 3,
        comment: "Всем привет! Я чупакабра! Макс впринцепе хороший, надёжный, но телега лучше.",
        date: "2026-04-06T09:16:00"
    },
    {
        id: 76,
        name: "Тимоша",
        nickname: "timbrayrot",
        email: "timi.sibi.maxi2010@gmail.com",
        siteUrl: "https://suno.com/",
        siteName: "Suno",
        rating: 5,
        comment: "Суно имба! Очень качественные песни генерит, буду ждать улучшений",
        date: "2026-04-07T18:06:00"
    },
    {
        id: 77,
        name: "Даша",
        nickname: "dashulya2014",
        email: "dashulya2014yt@gmail.com",
        siteUrl: "https://www.youtube.com/",
        siteName: "YouTube",
        rating: 5,
        comment: "Очень понравился. 5 звёзд. Поистине замечательный сайт",
        date: "2026-04-08T19:28:00"
    },
    {
        id: 78,
        name: "Даша",
        nickname: "dashulya2014",
        email: "dashulya2014yt@gmail.com",
        siteUrl: "https://www.deepseek.com/",
        siteName: "DeepSeek",
        rating: 5,
        comment: "Мне не очень понравилось.",
        date: "2026-04-08T19:30:00"
    },
    {
        id: 79,
        name: "Даша",
        nickname: "dashulya2014",
        email: "dashulya2014yt@gmail.com",
        siteUrl: "https://timoshamoscow.github.io/taiprompts.github.io/",
        siteName: "TAIPrompts",
        rating: 5,
        comment: "Прикольный :)",
        date: "2026-04-08T19:31:00"
    },
    {
        id: 80,
        name: "Даша",
        nickname: "dashulya2014",
        email: "dashulya2014yt@gmail.com",
        siteUrl: "https://web.telegram.org",
        siteName: "Telegram Web",
        rating: 2,
        comment: "Очень хороший",
        date: "2026-04-08T19:32:00"
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
        review.siteName.includes(name) || review.comment.includes('купит') || review.comment.includes('покуп')
    ),
    'Критические': (review) => review.rating <= 2,
    'Негативные': (review) => review.rating == 2,
    'Позитивные': (review) => review.rating >= 4,
    'Нейтральные': (review) => review.rating == 3
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
    
    // Фильтруем сайты с хорошим рейтингом
    const recommended = sitesWithRating
        .filter(site => site.avgRating >= 4.2 && site.count >= 3)
        .sort((a, b) => b.avgRating - a.avgRating);
    
    return recommended;
}

// Функция для получения сайтов, которые нуждаются в отзывах (ОБНОВЛЁННАЯ)
function getSitesNeedingReviews() {
    const siteMap = {};
    const currentDate = new Date();
    
    // Сначала получаем список рекомендованных сайтов, чтобы исключить их
    const recommendedSites = getRecommendedSites().map(site => site.url);
    
    // Собираем статистику по сайтам
    reviews.forEach(review => {
        if (!siteMap[review.siteUrl]) {
            siteMap[review.siteUrl] = {
                url: review.siteUrl,
                name: review.siteName,
                lastReview: new Date(review.date),
                reviewCount: 0,
                ratings: [],
                avgRating: 0
            };
        }
        
        const reviewDate = new Date(review.date);
        if (reviewDate > siteMap[review.siteUrl].lastReview) {
            siteMap[review.siteUrl].lastReview = reviewDate;
        }
        
        siteMap[review.siteUrl].reviewCount++;
        siteMap[review.siteUrl].ratings.push(review.rating);
    });
    
    // Рассчитываем средний рейтинг для каждого сайта
    Object.values(siteMap).forEach(site => {
        site.avgRating = site.ratings.reduce((sum, r) => sum + r, 0) / site.ratings.length;
    });
    
    const sites = Object.values(siteMap)
        .map(site => {
            const daysSinceLastReview = Math.floor((currentDate - site.lastReview) / (1000 * 60 * 60 * 24));
            
            // Определяем приоритет (чем выше, тем больше нуждается)
            let priority = 0;
            
            // Критерий 1: Мало отзывов (высший приоритет)
            if (site.reviewCount <= 2) {
                priority += 100 - (site.reviewCount * 10);
            }
            
            // Критерий 2: Давно не было отзывов (>30 дней)
            if (daysSinceLastReview > 30) {
                priority += Math.min(daysSinceLastReview / 10, 50);
            }
            
            // Критерий 3: Низкий рейтинг (<3.0)
            if (site.avgRating < 3.0) {
                priority += (3.0 - site.avgRating) * 20;
            }
            
            return {
                ...site,
                daysSinceLastReview,
                avgRating: site.avgRating,
                priority,
                needsReviewsReason: getNeedsReason(site.reviewCount, daysSinceLastReview, site.avgRating)
            };
        })
        // ❌ ИСКЛЮЧАЕМ РЕКОМЕНДОВАННЫЕ САЙТЫ
        .filter(site => !recommendedSites.includes(site.url))
        // 🎯 БЕРЁМ 3 ХУДШИХ (САМЫЙ ВЫСОКИЙ ПРИОРИТЕТ)
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 3);
    
    return sites;
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

// ==================== САЙТЫ, НА КОТОРЫЕ ЛУЧШЕ НЕ ЗАХОДИТЬ ====================

// Функция для получения сайтов из красной зоны
function getSitesToAvoid() {
    const siteMap = {};
    
    // Собираем статистику по сайтам
    reviews.forEach(review => {
        if (!siteMap[review.siteUrl]) {
            siteMap[review.siteUrl] = {
                url: review.siteUrl,
                name: review.siteName,
                totalRating: 0,
                count: 0,
                oneStarCount: 0,
                twoStarCount: 0,
                negativeComments: []
            };
        }
        
        siteMap[review.siteUrl].totalRating += review.rating;
        siteMap[review.siteUrl].count++;
        
        if (review.rating === 1) siteMap[review.siteUrl].oneStarCount++;
        if (review.rating === 2) siteMap[review.siteUrl].twoStarCount++;
    });
    
    // Рассчитываем рейтинг "опасности"
    const sites = Object.values(siteMap)
        .filter(site => site.count >= 1) // Хотя бы 1 отзыв
        .map(site => {
            const avgRating = site.totalRating / site.count;
            const negativePercentage = ((site.oneStarCount + site.twoStarCount) / site.count) * 100;
            
            // Формируем причину
            let reason = [];
            if (avgRating < 2.0) reason.push('катастрофически низкий');
            else if (avgRating < 2.5) reason.push('очень низкий');
            else if (avgRating < 3.0) reason.push('ниже среднего');
            
            if (negativePercentage > 80) reason.push('99% негатива');
            else if (negativePercentage > 60) reason.push('большинство негативных');
            else if (negativePercentage > 40) reason.push('много негатива');
            
            if (site.oneStarCount > 0) reason.push(`${site.oneStarCount} ★☆☆☆☆`);
            
            return {
                ...site,
                avgRating,
                formattedRating: avgRating.toFixed(1),
                negativePercentage,
                reason: reason.join(' • ') || 'проблемный сайт'
            };
        })
        .filter(site => site.avgRating < 3.0 || site.negativePercentage > 40) // Только проблемные
        .sort((a, b) => a.avgRating - b.avgRating) // Сначала самые низкие
        .slice(0, 3); // Топ-3 худших
    
    return sites;
}

// ==================== СИСТЕМА ЛАЙКОВ ====================

// Хранилище лайков (в localStorage)
const likesStorage = {
    // Получить все лайки текущего пользователя
    getUserLikes: function() {
        const user = JSON.parse(localStorage.getItem('siteReview_user') || '{}');
        if (!user.email) return {};
        
        const key = `likes_${user.email}`;
        return JSON.parse(localStorage.getItem(key) || '{}');
    },
    
    // Поставить лайк/дизлайк
    toggleLike: function(reviewId, type) {
        const user = JSON.parse(localStorage.getItem('siteReview_user') || '{}');
        if (!user.email) {
            alert('Войдите, чтобы ставить оценки');
            return null;
        }
        
        const key = `likes_${user.email}`;
        const userLikes = JSON.parse(localStorage.getItem(key) || '{}');
        
        // Если уже есть такой же лайк - удаляем (toggle off)
        if (userLikes[reviewId] === type) {
            delete userLikes[reviewId];
        } else {
            userLikes[reviewId] = type; // 'like' или 'dislike'
        }
        
        localStorage.setItem(key, JSON.stringify(userLikes));
        
        // Обновляем глобальную статистику лайков
        updateGlobalLikes(reviewId, type, userLikes[reviewId] ? 'added' : 'removed');
        
        return userLikes;
    },
    
    // Получить статистику лайков для отзыва
    getReviewStats: function(reviewId) {
        const globalStats = JSON.parse(localStorage.getItem('likes_global') || '{}');
        return globalStats[reviewId] || { likes: 0, dislikes: 0 };
    }
};

// Обновление глобальной статистики
function updateGlobalLikes(reviewId, type, action) {
    const globalStats = JSON.parse(localStorage.getItem('likes_global') || '{}');
    
    if (!globalStats[reviewId]) {
        globalStats[reviewId] = { likes: 0, dislikes: 0 };
    }
    
    if (action === 'added') {
        globalStats[reviewId][type === 'like' ? 'likes' : 'dislikes']++;
    } else {
        globalStats[reviewId][type === 'like' ? 'likes' : 'dislikes']--;
    }
    
    localStorage.setItem('likes_global', JSON.stringify(globalStats));
}

// ==================== УМНЫЕ РЕКОМЕНДАЦИИ ====================

// Получить рекомендации для пользователя
function getPersonalizedReviews(limit = 3) {
    const user = JSON.parse(localStorage.getItem('siteReview_user') || '{}');
    if (!user.email) {
        // Если пользователь не авторизован - показываем просто популярные
        return getPopularReviews(limit);
    }
    
    const userLikes = likesStorage.getUserLikes();
    const likedReviewIds = Object.keys(userLikes).filter(id => userLikes[id] === 'like');
    
    // Если пользователь ничего не лайкал - показываем популярные
    if (likedReviewIds.length === 0) {
        return getPopularReviews(limit);
    }
    
    // Собираем информацию о том, что нравится пользователю
    const likedReviews = reviews.filter(r => likedReviewIds.includes(r.id.toString()));
    
    // Какие авторы нравятся
    const favoriteAuthors = {};
    // Какие сайты нравятся
    const favoriteSites = {};
    // Какие теги нравятся
    const favoriteTags = {};
    
    likedReviews.forEach(review => {
        favoriteAuthors[review.name] = (favoriteAuthors[review.name] || 0) + 1;
        favoriteSites[review.siteName] = (favoriteSites[review.siteName] || 0) + 1;
        
        const tags = getReviewCategories(review);
        tags.forEach(tag => {
            favoriteTags[tag] = (favoriteTags[tag] || 0) + 1;
        });
    });
    
    // Сортируем по популярности
    const topAuthors = Object.keys(favoriteAuthors).sort((a,b) => favoriteAuthors[b] - favoriteAuthors[a]);
    const topSites = Object.keys(favoriteSites).sort((a,b) => favoriteSites[b] - favoriteSites[a]);
    const topTags = Object.keys(favoriteTags).sort((a,b) => favoriteTags[b] - favoriteTags[a]);
    
    // Оцениваем каждый отзыв (кроме уже лайкнутых)
    const scoredReviews = reviews
        .filter(r => !likedReviewIds.includes(r.id.toString()))
        .map(review => {
            let score = 0;
            
            // Бонус за автора
            if (topAuthors.includes(review.name)) {
                score += 3;
            }
            
            // Бонус за сайт
            if (topSites.includes(review.siteName)) {
                score += 2;
            }
            
            // Бонус за теги
            const tags = getReviewCategories(review);
            tags.forEach(tag => {
                if (topTags.includes(tag)) {
                    score += 1;
                }
            });
            
            // Бонус за популярность (лайки других)
            const stats = likesStorage.getReviewStats(review.id);
            score += stats.likes * 0.5;
            
            // Штраф за дизлайки
            score -= stats.dislikes * 0.3;
            
            return { review, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.review);
    
    return scoredReviews;
}

// Получить популярные отзывы (для неавторизованных)
function getPopularReviews(limit = 6) {
    const globalStats = JSON.parse(localStorage.getItem('likes_global') || '{}');
    
    return [...reviews]
        .map(review => ({
            review,
            popularity: (globalStats[review.id]?.likes || 0) * 2 - (globalStats[review.id]?.dislikes || 0)
        }))
        .sort((a, b) => b.popularity - a.popularity)
        .slice(0, limit)
        .map(item => item.review);
}

// Получить похожие отзывы (на основе текущего)
function getSimilarReviews(reviewId, limit = 3) {
    const currentReview = reviews.find(r => r.id === reviewId);
    if (!currentReview) return [];
    
    const currentTags = getReviewCategories(currentReview);
    
    return reviews
        .filter(r => r.id !== reviewId)
        .map(review => {
            let score = 0;
            const tags = getReviewCategories(review);
            
            // Похожесть по тегам
            tags.forEach(tag => {
                if (currentTags.includes(tag)) score += 2;
            });
            
            // Тот же автор
            if (review.name === currentReview.name) score += 3;
            
            // Тот же сайт
            if (review.siteName === currentReview.siteName) score += 4;
            
            return { review, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.review);
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
