import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import Header from "./components/Header";
import QuizCard from "./components/QuizCard";
import Certificate from "./components/Certificate";
import Leaderboard from "./components/Leaderboard";
import AdBanner from "./components/AdBanner";
import {
  getQuizCategories,
  getLeaderboardScores,
} from "./services/dataService";
import { seedQuestions } from "./services/seedService";

// Daftar Level/Rentang Umur (Mapping ke ageCategory di Firestore)
const AGE_LEVELS = [
  {
    id: "3-5",
    title: "Petualang Cilik",
    description: "Belajar warna, bentuk, angka & hewan",
    icon: "🐣",
    color: "bg-amber-100 border-amber-300 hover:bg-amber-200",
  },
  {
    id: "6-8",
    title: "Jagoan Pintar",
    description: "Penjumlahan, membaca & sains dasar",
    icon: "🦁",
    color: "bg-emerald-100 border-emerald-300 hover:bg-emerald-200",
  },
  {
    id: "9-12",
    title: "Penjelajah Hebat",
    description: "Perkalian, cerita & logika seru",
    icon: "🚀",
    color: "bg-sky-100 border-sky-300 hover:bg-sky-200",
  },
];

// Algoritma Pengacak Array Sempurna (Fisher-Yates Shuffle)
const shuffleArray = (array) => {
  if (!array || !Array.isArray(array)) return [];
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function App() {
  const [activeTab, setActiveTab] = useState("home"); // 'home' | 'levels' | 'categories' | 'quiz' | 'result' | 'leaderboard'
  const [selectedAgeLevel, setSelectedAgeLevel] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [leaderboardScores, setLeaderboardScores] = useState([]);

  // Load Kategori Soal dari Firestore saat level umur dipilih
  useEffect(() => {
    if (selectedAgeLevel) {
      getQuizCategories(selectedAgeLevel.id).then((data) =>
        setCategories(data || []),
      );
    }
  }, [selectedAgeLevel]);

  // Load Leaderboard saat halaman Papan Peringkat dibuka
  useEffect(() => {
    if (activeTab === "leaderboard") {
      getLeaderboardScores().then((data) => setLeaderboardScores(data || []));
    }
  }, [activeTab]);

  const handleSelectLevel = (level) => {
    setSelectedAgeLevel(level);
    setActiveTab("categories");
  };

  const handleSelectCategory = (cat, maxLimit = 10) => {
    const questions = cat.questions || [];

    // 1. Acak seluruh bank soal yang ada di kategori/sub-kategori tersebut
    const shuffledQuestions = shuffleArray(questions);

    // 2. Batasi jumlah soal (Default: maksimal 10 soal untuk siswa)
    const selectedQuestions = shuffledQuestions.slice(0, maxLimit);

    // 3. Acak pilihan jawaban (A, B, C, D) untuk setiap soal yang terpilih
    const randomizedQuestions = selectedQuestions.map((question) => {
      const originalOptions = question.options || [];
      const correctTarget = originalOptions[question.correctAnswerIndex ?? 0];

      const shuffledOptions = shuffleArray(originalOptions);

      const newCorrectIndex = shuffledOptions.findIndex(
        (opt) => opt === correctTarget,
      );

      return {
        ...question,
        options: shuffledOptions,
        correctAnswerIndex: newCorrectIndex !== -1 ? newCorrectIndex : 0,
      };
    });

    setSelectedCategory({
      ...cat,
      questions: randomizedQuestions,
    });

    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    setActiveTab("quiz");
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }

    const nextIndex = currentIndex + 1;
    if (selectedCategory && nextIndex < selectedCategory.questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      setIsFinished(true);
      setActiveTab("result");
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handleReset = () => {
    setActiveTab("home");
    setSelectedAgeLevel(null);
    setSelectedCategory(null);
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen w-full bg-[#f0f4ff] px-4 py-3 flex flex-col items-center justify-between">
      <div className="w-full max-w-md mx-auto flex flex-col gap-3 min-h-screen justify-between">
        {/* Header Section */}
        <header className="w-full">
          <Header
            score={score}
            totalQuestions={
              selectedCategory ? selectedCategory.questions.length : 0
            }
            onReset={handleReset}
          />
          <AdBanner />
        </header>

        {/* Main Content */}
        <main className="w-full my-auto py-2">
          {/* 1. LANDING PAGE */}
          {activeTab === "home" && (
            <div className="w-full bg-white rounded-3xl p-6 shadow-xl border-4 border-slate-100 flex flex-col items-center text-center gap-5">
              <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center border-4 border-amber-300 shadow-inner my-1">
                <span className="text-5xl animate-float">🦁</span>
              </div>

              <div>
                <h1 className="text-2xl font-black text-slate-800 leading-tight">
                  EduKids Game 🎓
                </h1>
                <p className="text-xs font-bold text-slate-500 mt-1">
                  Kuis Edukasi Seru & Pintar untuk Anak
                </p>
              </div>

              <div className="w-full flex flex-col gap-3">
                <button
                  onClick={() => setActiveTab("levels")}
                  className="btn-chunky w-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-4 px-6 rounded-2xl text-base border-2 border-amber-300 cursor-pointer shadow-md"
                >
                  🚀 Ayo Mulai Kuis!
                </button>

                <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-3 flex items-center justify-center gap-2">
                  <span className="text-xl">👫</span>
                  <span className="text-xs font-extrabold text-sky-800">
                    Mainnya bersama teman lebih seru!
                  </span>
                </div>

                <button
                  onClick={() => setActiveTab("leaderboard")}
                  className="btn-chunky w-full bg-sky-100 hover:bg-sky-200 text-sky-900 font-extrabold py-3 px-4 rounded-2xl text-xs border-2 border-sky-300 cursor-pointer flex items-center justify-center gap-2 mt-1"
                >
                  🏆 Lihat Papan Peringkat
                </button>
              </div>
            </div>
          )}

          {/* 2. PILIH LEVEL PETUALANGAN (RENTANG UMUR) */}
          {activeTab === "levels" && (
            <div className="w-full bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-100 flex flex-col items-center gap-4 text-center">
              <div className="bg-amber-100 border border-amber-200 rounded-2xl p-3 w-full flex items-center justify-center gap-3">
                <span className="text-3xl animate-float">🌟</span>
                <div className="text-left">
                  <h2 className="text-lg font-black text-amber-950 leading-tight">
                    Pilih Level Petualangan
                  </h2>
                  <p className="text-xs font-bold text-amber-800">
                    Pilih tingkat tantangan yang kamu mau:
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 w-full">
                {AGE_LEVELS.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => handleSelectLevel(level)}
                    className={`btn-chunky p-4 rounded-2xl border-2 flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-98 ${level.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl border border-slate-100 shadow-sm">
                        {level.icon}
                      </div>
                      <div className="text-left">
                        <h3 className="font-black text-base text-slate-800">
                          {level.title}
                        </h3>
                        <p className="text-xs font-bold text-slate-600 opacity-90">
                          {level.description}
                        </p>
                      </div>
                    </div>
                    <span className="text-lg">▶</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setActiveTab("home")}
                className="btn-chunky w-full bg-slate-100 text-slate-600 font-extrabold py-2.5 rounded-xl text-xs border border-slate-300 cursor-pointer mt-1"
              >
                ⬅ Kembali
              </button>
            </div>
          )}

          {/* 3. PILIH KATEGORI MATA PELAJARAN */}
          {activeTab === "categories" && (
            <div className="w-full bg-white rounded-3xl p-5 shadow-lg border-2 border-slate-100 flex flex-col items-center gap-4 text-center">
              <div className="bg-sky-100 border border-sky-200 rounded-2xl p-3 w-full flex items-center justify-center gap-3">
                <span className="text-3xl animate-float">🎨</span>
                <div className="text-left">
                  <h2 className="text-lg font-black text-sky-900 leading-tight">
                    Pilih Topik Kuis
                  </h2>
                  <p className="text-xs font-bold text-sky-700">
                    Mode:{" "}
                    <span className="underline">{selectedAgeLevel?.title}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2.5 w-full">
                {categories.length === 0 ? (
                  <p className="text-xs font-bold text-slate-400 py-4">
                    Memuat materi kuis...
                  </p>
                ) : (
                  categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat)}
                      className={`btn-chunky p-3.5 rounded-2xl border-2 flex items-center justify-between gap-3 cursor-pointer transition-all active:scale-98 ${cat.color || "bg-slate-50 border-slate-200"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl border border-slate-100 shadow-sm">
                          {cat.icon || "📚"}
                        </div>
                        <div className="text-left">
                          <h3 className="font-black text-base text-slate-800">
                            {cat.title}
                          </h3>
                          <p className="text-xs font-bold text-slate-600 opacity-80">
                            {cat.description}
                          </p>
                        </div>
                      </div>

                      <span className="bg-amber-400 text-amber-950 font-black px-3.5 py-1.5 rounded-xl text-xs border border-amber-300">
                        Main ▶
                      </span>
                    </button>
                  ))
                )}
              </div>

              <button
                onClick={() => setActiveTab("levels")}
                className="btn-chunky w-full bg-slate-100 text-slate-600 font-extrabold py-2.5 rounded-xl text-xs border border-slate-300 cursor-pointer mt-1"
              >
                ⬅ Pilih Level Lain
              </button>
            </div>
          )}

          {/* 4. KUIS */}
          {activeTab === "quiz" && selectedCategory && (
            <QuizCard
              questionData={selectedCategory.questions[currentIndex]}
              onAnswer={handleAnswer}
            />
          )}

          {/* 5. HASIL & SERTIFIKAT */}
          {activeTab === "result" && selectedCategory && (
            <Certificate
              score={score}
              totalQuestions={selectedCategory.questions.length}
              ageCategory={selectedAgeLevel?.id || "3-5"}
              onRestart={handleReset}
            />
          )}

          {/* 6. LEADERBOARD */}
          {activeTab === "leaderboard" && (
            <Leaderboard
              onClose={() => setActiveTab("home")}
              onBackToHome={() => setActiveTab("home")}
            />
          )}
        </main>

        {/* Footer Section */}
        <footer className="w-full">
          <AdBanner />
        </footer>
      </div>
    </div>
  );
}
