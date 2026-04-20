const translations = {
    en: {
        eyebrow: "Responsive final project",
        title: "Nature Gallery",
        languageLabel: "Language",
        themeLabel: "Theme",
        themeAuto: "Auto",
        themeLight: "Light",
        themeDark: "Dark",
        intro1: "This responsive gallery uses real web images and keeps the layout clean on phones, tablets, and large screens without breaking the course requirements.",
        intro2: "You can switch the language, change the theme, and open every image in a new tab. The page still responds to reduced motion and system color preferences.",
        hint: "Click any image to open the full version in a new tab.",
        topLink: "Jump to the Top",
        captions: [
            "Alpine Lake",
            "Forest Mirror",
            "Desert Dunes",
            "Canyon River",
            "Ocean Sunset",
            "Golden Meadow",
            "Snow Crest",
            "Green Valley",
            "Mirror Water"
        ],
        alts: [
            "Mountain lake with rocky slopes and clear water.",
            "Forest lake bordered by tall evergreen trees.",
            "Desert dunes shaped by wind under a bright sky.",
            "River running through a canyon with steep rock walls.",
            "Ocean waves glowing under a warm sunset.",
            "Open meadow with long grass and soft daylight.",
            "Snow covered mountain peak under a pale sky.",
            "Green valley filled with forest and a winding trail.",
            "Still lake reflecting hills and sky."
        ]
    },
    ru: {
        eyebrow: "Адаптивный финальный проект",
        title: "Галерея природы",
        languageLabel: "Язык",
        themeLabel: "Тема",
        themeAuto: "Авто",
        themeLight: "Светлая",
        themeDark: "Тёмная",
        intro1: "Эта адаптивная галерея использует реальные изображения из интернета и сохраняет аккуратный вид на телефонах, планшетах и больших экранах, не выходя за рамки требований задания.",
        intro2: "Можно переключать язык, менять тему и открывать каждое изображение в новой вкладке. При этом страница всё равно учитывает reduced motion и системные настройки цвета.",
        hint: "Нажми на любое изображение, чтобы открыть полную версию в новой вкладке.",
        topLink: "Наверх",
        captions: [
            "Альпийское озеро",
            "Лесное зеркало",
            "Пустынные дюны",
            "Река в каньоне",
            "Океан на закате",
            "Золотой луг",
            "Снежная вершина",
            "Зелёная долина",
            "Зеркальная вода"
        ],
        alts: [
            "Горное озеро со скалистыми склонами и прозрачной водой.",
            "Лесное озеро, окружённое высокими хвойными деревьями.",
            "Пустынные дюны, сформированные ветром под ярким небом.",
            "Река, проходящая через каньон с крутыми каменными стенами.",
            "Океанские волны под тёплым закатом.",
            "Открытый луг с высокой травой при мягком дневном свете.",
            "Заснеженная горная вершина под светлым небом.",
            "Зелёная долина с лесом и извилистой тропой.",
            "Тихое озеро, отражающее холмы и небо."
        ]
    }
};

const langButtons = document.querySelectorAll("[data-lang]");
const themeButtons = document.querySelectorAll("[data-theme-choice]");
const translatable = document.querySelectorAll("[data-i18n]");
const captionNodes = document.querySelectorAll("[data-caption]");
const imageNodes = document.querySelectorAll(".gallery img");

function applyLanguage(lang) {
    const current = translations[lang] ? lang : "en";
    const data = translations[current];

    document.documentElement.lang = current;

    translatable.forEach((node) => {
        const key = node.dataset.i18n;
        if (data[key]) {
            node.textContent = data[key];
        }
    });

    captionNodes.forEach((node, index) => {
        node.textContent = data.captions[index];
    });

    imageNodes.forEach((img, index) => {
        img.alt = data.alts[index];
    });

    langButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === current);
        button.setAttribute("aria-pressed", button.dataset.lang === current ? "true" : "false");
    });

    localStorage.setItem("gallery-language", current);
}

function applyTheme(theme) {
    const current = ["auto", "light", "dark"].includes(theme) ? theme : "auto";
    document.body.dataset.theme = current;

    themeButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.themeChoice === current);
        button.setAttribute("aria-pressed", button.dataset.themeChoice === current ? "true" : "false");
    });

    localStorage.setItem("gallery-theme", current);
}

langButtons.forEach((button) => {
    button.addEventListener("click", () => {
        applyLanguage(button.dataset.lang);
    });
});

themeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        applyTheme(button.dataset.themeChoice);
    });
});

const savedLanguage = localStorage.getItem("gallery-language") || "en";
const savedTheme = localStorage.getItem("gallery-theme") || "auto";

applyLanguage(savedLanguage);
applyTheme(savedTheme);
