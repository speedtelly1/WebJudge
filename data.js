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
        siteUrl: "https://chat.deepseek.com/",
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
        nickname: "timsib",
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
    'Позитивные': (review) => review.rating >= 4,
    'Нейтральные': (review) => review.rating == 3
};

// В начало data.js после categories добавьте:

// Группы сайтов для объединения
const siteGroups = {
    'Яндекс': {
        sites: [
            'https://yandex.ru/',
            'https://yandex.ru/games/',
            'https://music.yandex.ru/',
            'https://books.yandex.ru/',
            'https://yandex.com/',
            'yandex.ru',
            'yandex.com'
        ],
        icon: '🔍',
        displayName: 'Яндекс'
    },
    'Google': {
        sites: [
            'https://google.com/',
            'https://one.google.com/',
            'https://www.google.com/',
            'https://accounts.google.com/',
            'google.com'
        ],
        icon: '🔍',
        displayName: 'Google'
    },
    'VK': {
        sites: [
            'https://vk.com/',
            'https://vk.ru/',
            'https://m.vk.com/',
            'vk.com',
            'vk.ru'
        ],
        icon: '💬',
        displayName: 'VK'
    },
    'YouTube': {
        sites: [
            'https://youtube.com/',
            'https://www.youtube.com/',
            'https://m.youtube.com/',
            'youtube.com'
        ],
        icon: '🎬',
        displayName: 'YouTube'
    },
    'Telegram': {
        sites: [
            'https://telegram.org/',
            'https://web.telegram.org/',
            'https://t.me/',
            'telegram.org',
            't.me'
        ],
        icon: '📱',
        displayName: 'Telegram'
    },
    'TAIPrompts': {
        sites: [
            'https://timoshamoscow.github.io/taiprompts.github.io/',
            'taiprompts'
        ],
        icon: '🤖',
        displayName: 'TAIPrompts'
    },
    'SiteReview': {
        sites: [
            'https://speedtelly1.github.io/sitereview.github.io/',
            'sitereview'
        ],
        icon: '⭐',
        displayName: 'SiteReview'
    },
    'GitHub': {
        sites: [
            'https://github.com/',
            'github.com',
            'https://github.io/',
            '.github.io'
        ],
        icon: '💻',
        displayName: 'GitHub'
    },
    'Discord': {
        sites: [
            'https://discord.com/',
            'https://discord.gg/',
            'discord.com'
        ],
        icon: '👾',
        displayName: 'Discord'
    },
    'Twitch': {
        sites: [
            'https://twitch.tv/',
            'https://www.twitch.tv/',
            'twitch.tv'
        ],
        icon: '🎮',
        displayName: 'Twitch'
    }
};

// Функция для получения группы сайта
function getSiteGroup(siteUrl, siteName) {
    // Приводим всё к нижнему регистру для сравнения
    const url = siteUrl.toLowerCase();
    const name = siteName.toLowerCase();
    
    // Проверяем по URL
    for (const [groupName, group] of Object.entries(siteGroups)) {
        for (const site of group.sites) {
            const siteLower = site.toLowerCase();
            if (url.includes(siteLower) || name.includes(siteLower.replace('https://', '').replace('www.', ''))) {
                return {
                    name: group.displayName,
                    icon: group.icon,
                    originalUrl: siteUrl,
                    originalName: siteName
                };
            }
        }
    }
    
    // Проверяем по имени (на всякий случай)
    for (const [groupName, group] of Object.entries(siteGroups)) {
        if (name.includes(group.displayName.toLowerCase()) || 
            group.displayName.toLowerCase().includes(name)) {
            return {
                name: group.displayName,
                icon: group.icon,
                originalUrl: siteUrl,
                originalName: siteName
            };
        }
    }
    
    // Если группа не найдена, возвращаем как есть
    return {
        name: siteName,
        icon: '🌐',
        originalUrl: siteUrl,
        originalName: siteName
    };
}

// Функция для группировки отзывов по сайтам (с объединением)
function groupReviewsBySite(reviews) {
    const grouped = {};
    
    reviews.forEach(review => {
        const group = getSiteGroup(review.siteUrl, review.siteName);
        const groupKey = group.name;
        
        if (!grouped[groupKey]) {
            grouped[groupKey] = {
                name: group.name,
                icon: group.icon,
                reviews: [],
                totalRating: 0,
                count: 0,
                originalUrls: new Set(),
                originalNames: new Set()
            };
        }
        
        grouped[groupKey].reviews.push(review);
        grouped[groupKey].totalRating += review.rating;
        grouped[groupKey].count++;
        grouped[groupKey].originalUrls.add(review.siteUrl);
        grouped[groupKey].originalNames.add(review.siteName);
        
        // Сохраняем самый популярный URL для перехода
        if (!grouped[groupKey].mainUrl) {
            grouped[groupKey].mainUrl = review.siteUrl;
        }
    });
    
    // Преобразуем Set в массивы
    Object.keys(grouped).forEach(key => {
        grouped[key].originalUrls = Array.from(grouped[key].originalUrls);
        grouped[key].originalNames = Array.from(grouped[key].originalNames);
        grouped[key].avgRating = grouped[key].totalRating / grouped[key].count;
        
        // Выбираем самый короткий URL для отображения
        if (grouped[key].originalUrls.length > 0) {
            grouped[key].displayUrl = grouped[key].originalUrls
                .sort((a, b) => a.length - b.length)[0];
        } else {
            grouped[key].displayUrl = grouped[key].mainUrl;
        }
    });
    
    return Object.values(grouped);
}

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

// Функция для получения рекомендованных сайтов (с группировкой)
function getRecommendedSites() {
    // Группируем отзывы с помощью новой функции groupReviewsBySite
    const groupedSites = groupReviewsBySite(reviews);
    
    // Рассчитываем средний рейтинг для каждой группы и добавляем дополнительную информацию
    const sitesWithRating = groupedSites.map(site => {
        // Находим последний отзыв
        const lastReview = site.reviews.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        )[0];
        
        const lastReviewDate = new Date(lastReview.date);
        const daysSinceLastReview = Math.floor((new Date() - lastReviewDate) / (1000 * 60 * 60 * 24));
        
        // Проверяем авторские отзывы
        const authorReviews = site.reviews.filter(review => 
            isGitHubPagesAuthor(review) || 
            review.comment.includes('мой сайт') || 
            review.comment.includes('я автор')
        ).length;
        
        // Рассчитываем "чистый" рейтинг (исключая авторские отзывы)
        let cleanRating = site.avgRating;
        if (authorReviews > 0) {
            const regularReviews = site.reviews.filter(review => 
                !isGitHubPagesAuthor(review) && 
                !review.comment.includes('мой сайт') && 
                !review.comment.includes('я автор')
            );
            
            if (regularReviews.length > 0) {
                const regularTotalRating = regularReviews.reduce((sum, r) => sum + r.rating, 0);
                cleanRating = regularTotalRating / regularReviews.length;
            }
        }
        
        return {
            // Основная информация о группе
            url: site.displayUrl,
            name: site.name,
            icon: site.icon,
            
            // Статистика
            totalRating: site.totalRating,
            count: site.count,
            avgRating: site.avgRating,
            cleanRating: cleanRating,
            formattedRating: cleanRating.toFixed(1),
            
            // Авторские отзывы
            authorReviews: authorReviews,
            authorPercentage: site.count > 0 ? (authorReviews / site.count * 100).toFixed(0) : 0,
            
            // Время
            lastReview: lastReviewDate,
            daysSinceLastReview: daysSinceLastReview,
            
            // Подробности о составе группы
            originalUrls: site.originalUrls,
            originalNames: site.originalNames,
            
            // Для сортировки и фильтрации
            hasMultipleSites: site.originalUrls.length > 1,
            isRecent: daysSinceLastReview <= 30, // Не старше месяца
            
            // Все отзывы (для проверки)
            reviews: site.reviews
        };
    });
    
    // Фильтруем сайты с хорошим рейтингом (≥ 4.0) и хотя бы 2 отзыва
    const recommended = sitesWithRating
        .filter(site => {
            // Основные критерии
            const hasGoodRating = site.cleanRating >= 4.0;
            const hasEnoughReviews = site.count >= 2;
            
            // Дополнительные критерии
            const hasRegularReviews = (site.count - site.authorReviews) >= 1; // Хотя бы 1 неавторский отзыв
            const notTooOld = site.daysSinceLastReview <= 180; // Не старше 6 месяцев
            
            return hasGoodRating && hasEnoughReviews && hasRegularReviews && notTooOld;
        })
        .sort((a, b) => {
            // Сначала сортируем по чистому рейтингу (учитывая авторские отзывы)
            if (b.cleanRating !== a.cleanRating) {
                return b.cleanRating - a.cleanRating;
            }
            
            // Если рейтинг одинаковый, по количеству отзывов
            if (b.count !== a.count) {
                return b.count - a.count;
            }
            
            // Если количество одинаковое, по актуальности (новые выше)
            return a.daysSinceLastReview - b.daysSinceLastReview;
        });
    
    return recommended;
}

// Функция для получения сайтов, которые нуждаются в отзывах (с группировкой)
function getSitesNeedingReviews() {
    const currentDate = new Date();
    
    // Группируем отзывы
    const groupedSites = groupReviewsBySite(reviews);
    
    const sites = groupedSites.map(site => {
        // Находим последний отзыв в группе
        const lastReview = site.reviews.sort((a, b) => 
            new Date(b.date) - new Date(a.date)
        )[0];
        
        const lastReviewDate = new Date(lastReview.date);
        const daysSinceLastReview = Math.floor((currentDate - lastReviewDate) / (1000 * 60 * 60 * 24));
        
        // Рассчитываем стандартное отклонение оценок
        const ratings = site.reviews.map(r => r.rating);
        const ratingStd = calculateStandardDeviation(ratings);
        
        // Определяем приоритет
        let priority = 0;
        
        // Критерий 1: Мало отзывов
        if (site.count <= 2) {
            priority += 100 - (site.count * 10);
        }
        
        // Критерий 2: Давно не было отзывов
        if (daysSinceLastReview > 30) {
            priority += Math.min(daysSinceLastReview / 10, 50);
        }
        
        // Критерий 3: Низкий рейтинг
        if (site.avgRating < 3.0) {
            priority += (3.0 - site.avgRating) * 20;
        }
        
        // Критерий 4: Противоречивые оценки
        if (ratingStd > 1.5) {
            priority += ratingStd * 10;
        }
        
        return {
            ...site,
            daysSinceLastReview: daysSinceLastReview,
            avgRating: site.avgRating.toFixed(1),
            priority: priority,
            needsReviewsReason: getNeedsReason(site.count, daysSinceLastReview, site.avgRating),
            lastReviewDate: lastReviewDate
        };
    });
    
    // Сортируем по приоритету и ограничиваем 5 сайтами
    return sites
        .sort((a, b) => b.priority - a.priority)
        .slice(0, 5);
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
