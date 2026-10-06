import { quizCategories } from "../data/quizData";

// FLAG KONFIGURASI TAHAP
// Set true nanti jika sudah terhubung ke Firebase Firestore
const USE_FIREBASE = false;

/**
 * 1. Mengambil Kategori dan Bank Soal
 */
export const getQuizCategories = async () => {
  if (USE_FIREBASE) {
    // TODO (Tahap 2): Fetch dari koleksi 'quizzes' di Firebase Firestore
    return [];
  }
  // Tahap 1: Gunakan Bank Soal Lokal
  return quizCategories;
};

/**
 * 2. Menyimpan Skor Hasil Kuis Siswa / Anak
 */
export const submitStudentScore = async ({
  studentName,
  classCode,
  categoryTitle,
  score,
  totalQuestions,
}) => {
  const submissionData = {
    id: Date.now().toString(),
    studentName: studentName.trim(),
    classCode: classCode ? classCode.trim().toUpperCase() : "UMUM",
    categoryTitle: categoryTitle || "Kuis",
    score: score,
    totalQuestions: totalQuestions,
    createdAt: new Date().toISOString(),
  };

  if (USE_FIREBASE) {
    // TODO (Tahap 2): addDoc ke koleksi 'student_submissions' di Firebase Firestore
    return true;
  }

  // Tahap 1: Simpan di LocalStorage HP/Browser
  const existingScores = JSON.parse(
    localStorage.getItem("edukids_leaderboard") || "[]",
  );
  const updatedScores = [submissionData, ...existingScores]
    .sort((a, b) => b.score - a.score)
    .slice(0, 20); // Simpan 20 riwayat terbaik

  localStorage.setItem("edukids_leaderboard", JSON.stringify(updatedScores));
  return true;
};

/**
 * 3. Mengambil Data Papan Peringkat (Leaderboard)
 */
export const getLeaderboardScores = async () => {
  if (USE_FIREBASE) {
    // TODO (Tahap 2): Query koleksi 'student_submissions' Firebase order by score desc limit 10
    return [];
  }

  // Tahap 1: Ambil dari LocalStorage
  const allScores = JSON.parse(
    localStorage.getItem("edukids_leaderboard") || "[]",
  );
  return allScores.slice(0, 10);
};
