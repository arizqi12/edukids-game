import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";

// Map info visual & deskripsi untuk masing-masing topik/subject
const SUBJECT_METADATA = {
  campuran: {
    title: "Kuis Campuran 🎲",
    description: "Soal acak dari semua topik seru!",
    icon: "🎲",
    color: "bg-purple-100 border-purple-300 hover:bg-purple-200",
  },
  matematika: {
    title: "Matematika & Angka 🔢",
    description: "Belajar berhitung, angka & matematika dasar",
    icon: "🔢",
    color: "bg-emerald-100 border-emerald-300 hover:bg-emerald-200",
  },
  bahasa_indonesia: {
    title: "Bahasa Indonesia 🇮🇩",
    description: "Membaca, mengeja & kata-kata pintar",
    icon: "🇮🇩",
    color: "bg-rose-100 border-rose-300 hover:bg-rose-200",
  },
  bahasa_inggris: {
    title: "Bahasa Inggris 🇬🇧",
    description: "Vocabulary dasar & tebak kata Inggris",
    icon: "🇬🇧",
    color: "bg-sky-100 border-sky-300 hover:bg-sky-200",
  },
  sains: {
    title: "Sains & Alam 🔬",
    description: "Mengenal hewan, tumbuhan & alam sekitar",
    icon: "🔬",
    color: "bg-amber-100 border-amber-300 hover:bg-amber-200",
  },
};

// 1. Ambil & Kelompokkan Soal Berdasarkan Level Umur (ageCategory)
export const getQuizCategories = async (ageCategory = "3-5") => {
  try {
    const q = query(
      collection(db, "questions"),
      where("ageCategory", "==", ageCategory),
    );

    const querySnapshot = await getDocs(q);
    const questionsBySubject = {};

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const subject = data.subject || "campuran";

      if (!questionsBySubject[subject]) {
        questionsBySubject[subject] = [];
      }

      // Format data soal agar sesuai dengan kebutuhan QuizCard
      questionsBySubject[subject].push({
        id: doc.id,
        title: data.questionText || data.title,
        speechText: data.speechText || data.questionText || data.title,
        lang: data.lang || (subject === "bahasa_inggris" ? "en-US" : "id-ID"),
        questionImage: data.questionImage || data.image || null,
        correctAnswerIndex: data.correctAnswerIndex ?? 0,
        options: data.options || [],
      });
    });

    // Ubah hasil grouping menjadi array kategori yang siap ditampilkan di UI
    const categories = Object.keys(questionsBySubject).map((subjectKey) => {
      const meta = SUBJECT_METADATA[subjectKey] || {
        title: subjectKey.toUpperCase(),
        description: "Kuis edukasi menarik",
        icon: "📚",
        color: "bg-slate-100 border-slate-300",
      };

      return {
        id: subjectKey,
        title: meta.title,
        description: meta.description,
        icon: meta.icon,
        color: meta.color,
        questions: questionsBySubject[subjectKey],
      };
    });

    return categories;
  } catch (error) {
    console.error("Gagal mengambil data kuis dari Firestore:", error);
    return [];
  }
};

// 2. Ambil Top 10 Skor untuk Leaderboard
export const getLeaderboardScores = async () => {
  try {
    const q = query(
      collection(db, "leaderboards"),
      orderBy("score", "desc"),
      limit(10),
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Gagal mengambil skor leaderboard:", error);
    return [];
  }
};
