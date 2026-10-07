import React, { useState } from "react";
import { saveScore } from "../services/scoreService";

export default function QuizResult({
  score,
  totalQuestions,
  grade,
  onRestart,
  onViewLeaderboard,
}) {
  const [playerName, setPlayerName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveScore = async (e) => {
    e.preventDefault();
    if (!playerName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const success = await saveScore(playerName, score, grade);
    setIsSubmitting(false);

    if (success) {
      setIsSaved(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-xl max-w-md mx-auto text-center">
      <span className="text-5xl mb-2">🎉</span>
      <h2 className="text-2xl font-bold text-slate-800">Kuis Selesai!</h2>
      <p className="text-slate-500 text-sm mt-1">
        Kamu berhasil menyelesaikan kuis Kelas {grade}
      </p>

      <div className="my-4 p-4 bg-indigo-50 border-2 border-indigo-100 rounded-2xl w-full">
        <span className="text-xs uppercase font-bold text-indigo-400 tracking-wider">
          Skor Kamu
        </span>
        <div className="text-4xl font-extrabold text-indigo-600 mt-1">
          {score} / {totalQuestions * 10}
        </div>
      </div>

      {/* Form Simpan Nama ke Leaderboard */}
      {!isSaved ? (
        <form onSubmit={handleSaveScore} className="w-full mb-4">
          <input
            type="text"
            placeholder="Masukkan Namamu..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-indigo-500 outline-none text-center font-bold text-slate-700 mb-2"
            maxLength={15}
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50"
          >
            {isSubmitting ? "Menyimpan..." : "⭐ Simpan ke Leaderboard"}
          </button>
        </form>
      ) : (
        <div className="w-full p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-xl text-sm font-bold mb-4">
          ✅ Skor berhasil masuk Papan Peringkat!
        </div>
      )}

      {/* Tombol Aksi */}
      <div className="flex gap-2 w-full">
        <button
          onClick={onRestart}
          className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition"
        >
          🔄 Main Lagi
        </button>
        <button
          onClick={onViewLeaderboard}
          className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition shadow-md"
        >
          🏆 Leaderboard
        </button>
      </div>
    </div>
  );
}
