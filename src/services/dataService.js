import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";

// Helper: Ambil atau Buat Player ID Unik khusus untuk Browser/HP ini
export const getOrCreatePlayerId = () => {
  let playerId = localStorage.getItem("edukids_player_id");
  if (!playerId) {
    playerId =
      "player_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7);
    localStorage.setItem("edukids_player_id", playerId);
  }
  return playerId;
};

// Metadata visual dan deskripsi untuk setiap mata pelajaran/topik
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

/**
 * 1. MENGAMBIL & MENGELOMPOKKAN SOAL BERDASARKAN LEVEL UMUR (ageCategory)
 */
export const getQuizCategories = async (ageCategory = "3-5") => {
  try {
    const q = query(
      collection(db, "questions"),
      where("ageCategory", "==", ageCategory),
    );

    const querySnapshot = await getDocs(q);
    const questionsBySubject = {};

    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      const subject = data.subject || "campuran";

      if (!questionsBySubject[subject]) {
        questionsBySubject[subject] = [];
      }

      questionsBySubject[subject].push({
        id: docSnap.id,
        title: data.questionText || data.title,
        speechText: data.speechText || data.questionText || data.title,
        lang: data.lang || (subject === "bahasa_inggris" ? "en-US" : "id-ID"),
        questionImage: data.questionImage || data.image || null,
        correctAnswerIndex: data.correctAnswerIndex ?? 0,
        options: data.options || [],
      });
    });

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

/**
 * 2. MENYIMPAN / MENGUPDATE SKOR LEADERBOARD (ONE PLAYER, ONE HIGH SCORE)
 */
export const saveOrUpdateScore = async (
  playerName,
  score,
  ageCategory = "3-5",
  avatar = "🦁",
) => {
  if (!playerName || playerName.trim() === "") return;

  const playerId = getOrCreatePlayerId();
  const docId = `${playerId}_${ageCategory}`;
  const docRef = doc(db, "leaderboards", docId);

  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const existingData = docSnap.data();
      if (score > existingData.score) {
        await setDoc(
          docRef,
          {
            playerName: playerName.trim(),
            score: score,
            ageCategory: ageCategory,
            avatar: avatar,
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        );
        console.log("🏆 Rekor personal baru berhasil diperbarui!");
      }
    } else {
      await setDoc(docRef, {
        playerId: playerId,
        playerName: playerName.trim(),
        score: score,
        ageCategory: ageCategory,
        avatar: avatar,
        updatedAt: serverTimestamp(),
      });
      console.log("🎉 Skor pertama berhasil dicatat ke Leaderboard!");
    }
  } catch (error) {
    console.error("Gagal menyimpan skor ke leaderboard:", error);
  }
};

/**
 * 3. MENGAMBIL TOP 10 SKOR UNTUK LEADERBOARD (Bisa disaring per Level Umur)
 */
export const getLeaderboardScores = async (ageCategory = "3-5") => {
  try {
    const q = query(
      collection(db, "leaderboards"),
      where("ageCategory", "==", ageCategory),
      orderBy("score", "desc"),
      limit(10),
    );
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("Gagal mengambil skor leaderboard:", error);
    return [];
  }
};

/**
 * 4. MENYIMPAN LAPORAN PERKEMBANGAN MURID (TEACHER REPORT)
 */
export const saveStudentReport = async (reportData) => {
  try {
    const docRef = await addDoc(collection(db, "student_reports"), {
      ...reportData,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Gagal menyimpan laporan perkembangan murid:", error);
    return null;
  }
};
