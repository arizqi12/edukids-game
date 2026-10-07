import React, { useEffect, useState } from "react";
import { getTopScores } from "../services/scoreService";

export default function Leaderboard({ onClose, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState("3-5");
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Daftar Kategori Level (Label Umur Dihapus)
  const ageCategories = [
    { id: "3-5", label: "Petualang Cilik 🎈" },
    { id: "6-8", label: "Jagoan Pintar 🚀" },
    { id: "9-12", label: "Penjelajah Hebat 🏆" },
  ];

  useEffect(() => {
    const fetchScores = async () => {
      setLoading(true);
      try {
        const data = await getTopScores(selectedCategory);
        setScores(data);
      } catch (error) {
        console.error("Gagal memuat leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [selectedCategory]);

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border-4 border-[var(--color-kid-yellow)] flex flex-col items-center gap-4 relative">
      {/* Tombol Tutup */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          ✕ Tutup
        </button>
      )}

      {/* Judul Modal */}
      <div className="flex items-center gap-2 text-center mt-2">
        <span className="text-3xl">🏆</span>
        <h2 className="text-xl font-black text-gray-800">
          Papan Peringkat Top 10
        </h2>
      </div>

      {/* Tab Filter Kategori (Petualang Cilik, Jagoan Pintar, Penjelajah Hebat) */}
      <div className="flex gap-1.5 w-full justify-center bg-gray-100 p-1.5 rounded-2xl">
        {ageCategories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex-1 py-2 text-[11px] font-black rounded-xl transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? "bg-[var(--color-kid-blue)] text-white shadow"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Daftar Peringkat */}
      <div className="w-full flex flex-col gap-2 my-2 min-h-[160px] justify-center">
        {loading ? (
          <p className="text-center text-sm font-bold text-gray-400 animate-pulse">
            Memuat nilai... ⏳
          </p>
        ) : scores.length === 0 ? (
          <p className="text-center text-sm font-bold text-gray-400">
            Belum ada skor tercatat di tingkat ini. <br />
            Jadilah yang pertama! 🌟
          </p>
        ) : (
          scores.map((item, index) => (
            <div
              key={item.id || index}
              className={`flex items-center justify-between p-3 rounded-2xl font-bold text-sm ${
                index === 0
                  ? "bg-amber-100 border-2 border-amber-300 text-amber-900"
                  : index === 1
                    ? "bg-slate-100 border-2 border-slate-300 text-slate-800"
                    : index === 2
                      ? "bg-orange-100 border-2 border-orange-300 text-orange-900"
                      : "bg-gray-50 text-gray-700"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 font-black text-center text-base">
                  {index === 0
                    ? "🥇"
                    : index === 1
                      ? "🥈"
                      : index === 2
                        ? "🥉"
                        : `#${index + 1}`}
                </span>
                <span>{item.avatar || "🦁"}</span>
                <span className="truncate max-w-[140px]">
                  {item.playerName || "Pemain"}
                </span>
              </div>
              <span className="font-black text-[var(--color-kid-blue)]">
                {item.score} pt
              </span>
            </div>
          ))
        )}
      </div>

      {/* Tombol Kembali ke Beranda */}
      {onBackToHome && (
        <button
          onClick={onBackToHome}
          className="w-full bg-[var(--color-kid-blue)] text-black font-black py-3 rounded-2xl shadow-lg active:scale-95 transition-all text-sm cursor-pointer mt-2"
        >
          Kembali ke Beranda
        </button>
      )}
    </div>
  );
}
