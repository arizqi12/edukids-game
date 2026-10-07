import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  where, // 👈 TAMBAHKAN IMPORT INI
  orderBy,
  limit,
} from "firebase/firestore";

// Simpan skor pemain
export const saveScore = async (playerName, score, grade) => {
  try {
    await addDoc(collection(db, "leaderboards"), {
      name: playerName || "Pemain Cilik",
      score: Number(score),
      grade: grade || "Umum",
      createdAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error("Gagal menyimpan skor:", error);
    return false;
  }
};

export const getTopScores = async (ageCategory = "3-5") => {
  try {
    const q = query(
      collection(db, "leaderboards"),
      where("ageCategory", "==", ageCategory),
      orderBy("score", "desc"),
      limit(10),
    );

    const querySnapshot = await getDocs(q);
    const scores = [];
    querySnapshot.forEach((doc) => {
      scores.push({ id: doc.id, ...doc.data() });
    });

    return scores;
  } catch (error) {
    console.error("Gagal mengambil leaderboard:", error);
    return [];
  }
};
