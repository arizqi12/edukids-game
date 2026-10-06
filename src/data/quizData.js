// ==========================================
// 1. BANK SOAL BAHASA INDONESIA
// ==========================================

const animalQuestions = [
  {
    id: "a1",
    title: "Mana yang suaranya 'Moo'?",
    speechText: "Pilih hewan yang suaranya mooo!",
    lang: "id-ID",
    options: [
      {
        id: "a",
        label: "Kucing",
        image: "https://api.iconify.design/twemoji:cat-face.svg",
        isCorrect: false,
      },
      {
        id: "b",
        label: "Sapi",
        image: "https://api.iconify.design/twemoji:cow-face.svg",
        isCorrect: true,
      },
      {
        id: "c",
        label: "Bebek",
        image: "https://api.iconify.design/twemoji:duck.svg",
        isCorrect: false,
      },
      {
        id: "d",
        label: "Ayam",
        image: "https://api.iconify.design/twemoji:rooster.svg",
        isCorrect: false,
      },
    ],
  },
  {
    id: "a2",
    title: "Mana hewan yang suka makan Pisang?",
    speechText: "Mana hewan yang suka sekali makan pisang?",
    lang: "id-ID",
    options: [
      {
        id: "a",
        label: "Monyet",
        image: "https://api.iconify.design/twemoji:monkey-face.svg",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Anjing",
        image: "https://api.iconify.design/twemoji:dog-face.svg",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Kelinci",
        image: "https://api.iconify.design/twemoji:rabbit-face.svg",
        isCorrect: false,
      },
      {
        id: "d",
        label: "Ikan",
        image: "https://api.iconify.design/twemoji:fish.svg",
        isCorrect: false,
      },
    ],
  },
  {
    id: "a3",
    title: "Hewan mana yang punya Sayap dan Terbang?",
    speechText: "Hewan mana yang punya sayap dan bisa terbang tinggi?",
    lang: "id-ID",
    options: [
      {
        id: "a",
        label: "Gajah",
        image: "https://api.iconify.design/twemoji:elephant.svg",
        isCorrect: false,
      },
      {
        id: "b",
        label: "Burung",
        image: "https://api.iconify.design/twemoji:bird.svg",
        isCorrect: true,
      },
      {
        id: "c",
        label: "Kura-kura",
        image: "https://api.iconify.design/twemoji:turtle.svg",
        isCorrect: false,
      },
      {
        id: "d",
        label: "Singa",
        image: "https://api.iconify.design/twemoji:lion.svg",
        isCorrect: false,
      },
    ],
  },
  {
    id: "a4",
    title: "Hewan mana yang lehernya Sangat Panjang?",
    speechText: "Mana hewan tinggi yang lehernya sangat panjang?",
    lang: "id-ID",
    options: [
      {
        id: "a",
        label: "Jerapah",
        image: "https://api.iconify.design/twemoji:giraffe.svg",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Gajah",
        image: "https://api.iconify.design/twemoji:elephant.svg",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Kucing",
        image: "https://api.iconify.design/twemoji:cat-face.svg",
        isCorrect: false,
      },
      {
        id: "d",
        label: "Kuda",
        image: "https://api.iconify.design/twemoji:horse-face.svg",
        isCorrect: false,
      },
    ],
  },
];

const fruitQuestions = [
  {
    id: "f1",
    title: "Mana buah yang warnanya Merah?",
    speechText: "Mana buah yang warnanya merah segar?",
    lang: "id-ID",
    options: [
      {
        id: "a",
        label: "Apel",
        image: "https://api.iconify.design/twemoji:red-apple.svg",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Pisang",
        image: "https://api.iconify.design/twemoji:banana.svg",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Alpukat",
        image: "https://api.iconify.design/twemoji:avocado.svg",
        isCorrect: false,
      },
      {
        id: "d",
        label: "Anggur",
        image: "https://api.iconify.design/twemoji:grapes.svg",
        isCorrect: false,
      },
    ],
  },
  {
    id: "f2",
    title: "Mana buah yang warnanya Kuning?",
    speechText: "Pilih buah yang warnanya kuning cerah!",
    lang: "id-ID",
    options: [
      {
        id: "a",
        label: "Stroberi",
        image: "https://api.iconify.design/twemoji:strawberry.svg",
        isCorrect: false,
      },
      {
        id: "b",
        label: "Pisang",
        image: "https://api.iconify.design/twemoji:banana.svg",
        isCorrect: true,
      },
      {
        id: "c",
        label: "Semangka",
        image: "https://api.iconify.design/twemoji:watermelon.svg",
        isCorrect: false,
      },
      {
        id: "d",
        label: "Jeruk",
        image: "https://api.iconify.design/twemoji:tangerine.svg",
        isCorrect: false,
      },
    ],
  },
];

// ==========================================
// 2. BANK SOAL BAHASA INGGRIS (ENGLISH FOR KIDS)
// ==========================================

const englishQuestions = [
  {
    id: "e1",
    title: "Which one is a 'Cat'?",
    speechText: "Which picture is a cat?",
    lang: "en-US",
    options: [
      {
        id: "a",
        label: "Cat",
        image: "https://api.iconify.design/twemoji:cat-face.svg",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Dog",
        image: "https://api.iconify.design/twemoji:dog-face.svg",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Rabbit",
        image: "https://api.iconify.design/twemoji:rabbit-face.svg",
        isCorrect: false,
      },
      {
        id: "d",
        label: "Bird",
        image: "https://api.iconify.design/twemoji:bird.svg",
        isCorrect: false,
      },
    ],
  },
  {
    id: "e2",
    title: "Which fruit is 'Apple'?",
    speechText: "Which fruit is an apple?",
    lang: "en-US",
    options: [
      {
        id: "a",
        label: "Banana",
        image: "https://api.iconify.design/twemoji:banana.svg",
        isCorrect: false,
      },
      {
        id: "b",
        label: "Apple",
        image: "https://api.iconify.design/twemoji:red-apple.svg",
        isCorrect: true,
      },
      {
        id: "c",
        label: "Grapes",
        image: "https://api.iconify.design/twemoji:grapes.svg",
        isCorrect: false,
      },
      {
        id: "d",
        label: "Lemon",
        image: "https://api.iconify.design/twemoji:lemon.svg",
        isCorrect: false,
      },
    ],
  },
  {
    id: "e3",
    title: "Which one is Number 'One' (1)?",
    speechText: "Can you find number one?",
    lang: "en-US",
    options: [
      {
        id: "a",
        label: "One (1)",
        image: "https://api.iconify.design/twemoji:keycap-1.svg",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Two (2)",
        image: "https://api.iconify.design/twemoji:keycap-2.svg",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Three (3)",
        image: "https://api.iconify.design/twemoji:keycap-3.svg",
        isCorrect: false,
      },
      {
        id: "d",
        label: "Four (4)",
        image: "https://api.iconify.design/twemoji:keycap-4.svg",
        isCorrect: false,
      },
    ],
  },
  {
    id: "e4",
    title: "Which one is an 'Elephant'?",
    speechText: "Which animal is a big elephant?",
    lang: "en-US",
    options: [
      {
        id: "a",
        label: "Elephant",
        image: "https://api.iconify.design/twemoji:elephant.svg",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Lion",
        image: "https://api.iconify.design/twemoji:lion.svg",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Monkey",
        image: "https://api.iconify.design/twemoji:monkey-face.svg",
        isCorrect: false,
      },
      {
        id: "d",
        label: "Pig",
        image: "https://api.iconify.design/twemoji:pig-face.svg",
        isCorrect: false,
      },
    ],
  },
  {
    id: "e5",
    title: "Which one is the 'Sun'?",
    speechText: "Where is the bright sun?",
    lang: "en-US",
    options: [
      {
        id: "a",
        label: "Sun",
        image: "https://api.iconify.design/twemoji:sun-with-face.svg",
        isCorrect: true,
      },
      {
        id: "b",
        label: "Moon",
        image: "https://api.iconify.design/twemoji:crescent-moon.svg",
        isCorrect: false,
      },
      {
        id: "c",
        label: "Star",
        image: "https://api.iconify.design/twemoji:glowing-star.svg",
        isCorrect: false,
      },
      {
        id: "d",
        label: "Cloud",
        image: "https://api.iconify.design/twemoji:cloud.svg",
        isCorrect: false,
      },
    ],
  },
];

// Gabungan Semua Soal untuk Kategori "Campuran / All-in-One"
const allCombinedQuestions = [
  ...animalQuestions,
  ...fruitQuestions,
  ...englishQuestions,
];

export const quizCategories = [
  {
    id: "all",
    title: "Semua Kuis (Campuran)",
    icon: "🌟",
    description: "Campuran Bahasa Indonesia & Inggris",
    color: "bg-purple-100 border-purple-300 text-purple-900",
    questions: allCombinedQuestions,
  },
  {
    id: "english",
    title: "English for Kids 🔤",
    icon: "🇬🇧",
    description: "Basic Vocabulary (Animal, Fruit, Number)",
    color: "bg-blue-100 border-blue-300 text-blue-900",
    questions: englishQuestions,
  },
  {
    id: "animal",
    title: "Tebak Hewan",
    icon: "🦁",
    description: "Suara & Jenis Hewan",
    color: "bg-amber-100 border-amber-300 text-amber-900",
    questions: animalQuestions,
  },
  {
    id: "fruit",
    title: "Warna & Buah",
    icon: "🍎",
    description: "Buah-buahan Segar",
    color: "bg-rose-100 border-rose-300 text-rose-900",
    questions: fruitQuestions,
  },
];
