const PRODUCTS = [
  {
    id: 1, brand: "Maison Francis Kurkdjian", name: "Baccarat Rouge 540", slug: "baccarat-rouge-540",
    gender: "Unisex", family: "Древесно-амбровый", notes: ["шафран", "жасмин", "amberwood", "кедр"],
    description: "Воздушный древесно-амбровый аромат с эффектом тёплой кожи, шафрана и сухого кедра.", image: "powder",
    retailSizes: {2: 790, 5: 1690, 10: 2990, 20: 5590, 30: 7990, 50: 12490},
    wholesaleSizes: {100: 19800, 250: 44200, 500: 79800, 1000: 146000}, bestseller: true, new: false,
    niche: true, moods: ["Statement", "Date Night"], season: ["Осень", "Зима"], scores: {fresh: 42, sweet: 73, wood: 68, trail: 88, lasting: 92}
  },
  {
    id: 2, brand: "Creed", name: "Aventus", slug: "aventus", gender: "Для него", family: "Фруктово-шипровый",
    notes: ["ананас", "бергамот", "берёза", "мускус"], description: "Свежий ананас и бергамот на сухой дымной древесине — собранный и уверенный.", image: "sage",
    retailSizes: {2: 720, 5: 1540, 10: 2780, 20: 5190, 30: 7420, 50: 11600}, wholesaleSizes: {100: 18500, 250: 41500, 500: 75600, 1000: 138000}, bestseller: true, new: false, niche: true, moods: ["Office", "Statement"], season: ["Весна", "Лето"], scores: {fresh: 78, sweet: 43, wood: 71, trail: 76, lasting: 82}
  },
  {
    id: 3, brand: "Tom Ford", name: "Tobacco Vanille", slug: "tobacco-vanille", gender: "Unisex", family: "Пряно-гурманский",
    notes: ["табак", "ваниль", "какао", "сухофрукты"], description: "Густой табак, пряная ваниль и сухофрукты для прохладного вечера.", image: "amber",
    retailSizes: {2: 610, 5: 1320, 10: 2390, 20: 4490, 30: 6490, 50: 10100}, wholesaleSizes: {100: 16100, 250: 36200, 500: 65900, 1000: 121000}, bestseller: true, new: false, niche: false, moods: ["Comfort", "Date Night"], season: ["Осень", "Зима"], scores: {fresh: 18, sweet: 86, wood: 61, trail: 84, lasting: 89}
  },
  {
    id: 4, brand: "Tom Ford", name: "Lost Cherry", slug: "lost-cherry", gender: "Unisex", family: "Восточно-гурманский",
    notes: ["вишня", "cherry", "миндаль", "бобы тонка"], description: "Сочная тёмная вишня с миндалём и тёплой ванильно-бобовой базой.", image: "cherry",
    retailSizes: {2: 650, 5: 1390, 10: 2510, 20: 4720, 30: 6790, 50: 10590}, wholesaleSizes: {100: 16900, 250: 37900, 500: 68900, 1000: 126000}, bestseller: true, new: false, niche: false, moods: ["Date Night", "Statement"], season: ["Осень", "Зима"], scores: {fresh: 22, sweet: 91, wood: 38, trail: 81, lasting: 85}
  },
  {
    id: 5, brand: "Kilian", name: "Angels' Share", slug: "angels-share", gender: "Unisex", family: "Древесно-гурманский",
    notes: ["коньяк", "корица", "дуб", "пралине"], description: "Тёплый коньячный аккорд, корица и дуб с мягкой гурманской сладостью.", image: "sand",
    retailSizes: {2: 690, 5: 1490, 10: 2690, 20: 5050, 30: 7290, 50: 11390}, wholesaleSizes: {100: 18100, 250: 40500, 500: 73700, 1000: 135000}, bestseller: true, new: false, niche: true, moods: ["Comfort", "Date Night"], season: ["Осень", "Зима"], scores: {fresh: 16, sweet: 89, wood: 66, trail: 86, lasting: 90}
  },
  {
    id: 6, brand: "Dior", name: "Sauvage", slug: "sauvage", gender: "Для него", family: "Ароматический фужерный",
    notes: ["бергамот", "перец", "лаванда", "амброксан"], description: "Холодный бергамот, сухой перец и чистый амброксан с заметным шлейфом.", image: "blue",
    retailSizes: {2: 390, 5: 820, 10: 1490, 20: 2780, 30: 3990, 50: 6190}, wholesaleSizes: {100: 9900, 250: 22100, 500: 40200, 1000: 73800}, bestseller: true, new: false, niche: false, moods: ["Office", "Statement"], season: ["Весна", "Лето"], scores: {fresh: 82, sweet: 28, wood: 63, trail: 88, lasting: 87}
  },
  {
    id: 7, brand: "Chanel", name: "Bleu de Chanel", slug: "bleu-de-chanel", gender: "Для него", family: "Древесно-ароматический",
    notes: ["грейпфрут", "ладан", "имбирь", "сандал"], description: "Сдержанный цитрус, дымный ладан и гладкое дерево — универсально и чисто.", image: "ink",
    retailSizes: {2: 420, 5: 890, 10: 1610, 20: 3010, 30: 4320, 50: 6720}, wholesaleSizes: {100: 10700, 250: 23900, 500: 43500, 1000: 79800}, bestseller: true, new: false, niche: false, moods: ["Office", "Clean"], season: ["Весна", "Осень"], scores: {fresh: 70, sweet: 25, wood: 74, trail: 67, lasting: 78}
  },
  {
    id: 8, brand: "Yves Saint Laurent", name: "Libre", slug: "libre", gender: "Для неё", family: "Цветочно-ароматический",
    notes: ["лаванда", "флердоранж", "ваниль", "мандарин"], description: "Лаванда и яркий апельсиновый цвет на гладкой ванильной базе.", image: "lilac",
    retailSizes: {2: 390, 5: 840, 10: 1520, 20: 2840, 30: 4080, 50: 6350}, wholesaleSizes: {100: 10100, 250: 22600, 500: 41100, 1000: 75400}, bestseller: true, new: false, niche: false, moods: ["Statement", "Date Night"], season: ["Весна", "Осень"], scores: {fresh: 52, sweet: 67, wood: 29, trail: 79, lasting: 82}
  },
  {
    id: 9, brand: "Giorgio Armani", name: "Stronger With You", slug: "stronger-with-you", gender: "Для него", family: "Восточно-фужерный",
    notes: ["каштан", "ваниль", "лаванда", "шалфей"], description: "Сладковатый каштан, ваниль и ароматические травы в уютном вечернем звучании.", image: "smoke",
    retailSizes: {2: 360, 5: 760, 10: 1380, 20: 2580, 30: 3710, 50: 5770}, wholesaleSizes: {100: 9200, 250: 20500, 500: 37300, 1000: 68400}, bestseller: true, new: false, niche: false, moods: ["Comfort", "Date Night"], season: ["Осень", "Зима"], scores: {fresh: 24, sweet: 83, wood: 51, trail: 75, lasting: 80}
  },
  {
    id: 10, brand: "Parfums de Marly", name: "Delina", slug: "delina", gender: "Для неё", family: "Цветочно-фруктовый",
    notes: ["роза", "личи", "ревень", "мускус"], description: "Прозрачная роза, терпкий ревень и личи на чистой мускусной базе.", image: "rose",
    retailSizes: {2: 680, 5: 1460, 10: 2640, 20: 4960, 30: 7130, 50: 11120}, wholesaleSizes: {100: 17700, 250: 39600, 500: 72000, 1000: 132000}, bestseller: true, new: true, niche: true, moods: ["Date Night", "Statement"], season: ["Весна", "Лето"], scores: {fresh: 62, sweet: 73, wood: 24, trail: 78, lasting: 84}
  },
  {
    id: 11, brand: "Byredo", name: "Bal d'Afrique", slug: "bal-d-afrique", gender: "Unisex", family: "Цветочно-древесный",
    notes: ["бергамот", "фиалка", "ветивер", "мускус"], description: "Солнечный бергамот, сухой ветивер и мягкая фиалковая пудровость.", image: "sun",
    retailSizes: {2: 540, 5: 1160, 10: 2090, 20: 3920, 30: 5640, 50: 8790}, wholesaleSizes: {100: 14000, 250: 31300, 500: 56900, 1000: 104000}, bestseller: true, new: true, niche: true, moods: ["Summer", "Clean"], season: ["Весна", "Лето"], scores: {fresh: 74, sweet: 38, wood: 56, trail: 59, lasting: 68}
  },
  {
    id: 12, brand: "Le Labo", name: "Another 13", slug: "another-13", gender: "Unisex", family: "Мускусно-древесный",
    notes: ["амброксан", "мускус", "жасмин", "мох"], description: "Чистая кожа, сухой мускус и прозрачная древесность, которая держится близко.", image: "mist",
    retailSizes: {2: 570, 5: 1220, 10: 2200, 20: 4130, 30: 5940, 50: 9250}, wholesaleSizes: {100: 14700, 250: 32900, 500: 59800, 1000: 109800}, bestseller: true, new: true, niche: true, moods: ["Clean", "Office"], season: ["Весна", "Лето", "Осень"], scores: {fresh: 66, sweet: 21, wood: 58, trail: 64, lasting: 76}
  }
];

const MOOD_LABELS = {
  Clean: "Свежесть, воздух, чистая кожа", "Date Night": "Тёплые, глубокие, притягательные",
  Office: "Спокойные и ненавязчивые", Summer: "Цитрус, море, зелень",
  Statement: "Ароматы, которые замечают", Comfort: "Ваниль, амбра, мягкое дерево"
};
