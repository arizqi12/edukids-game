import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import { submitStudentScore } from "../services/dataService"; // ✅ Pastikan path ini benar

export default function Certificate({
  score,
  totalQuestions,
  categoryTitle,
  onRestart,
}) {
  const [childName, setChildName] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const certRef = useRef(null);

  const handleGenerate = async () => {
    if (!childName.trim()) {
      alert("Silakan ketik nama terlebih dahulu!");
      return;
    }

    await submitStudentScore({
      studentName: childName,
      categoryTitle: categoryTitle,
      score: score,
      totalQuestions: totalQuestions,
    });

    setIsGenerated(true);
  };

  const handleDownload = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, {
      scale: 2,
      useCORS: true,
    });
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = `Sertifikat-${childName || "AnakPintar"}.png`;
    link.click();
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">
      {!isGenerated ? (
        <div className="w-full bg-white rounded-3xl p-6 shadow-xl border-4 border-emerald-400 flex flex-col items-center gap-4 text-center">
          <span className="text-5xl">🏆</span>
          <h2 className="text-2xl font-black text-slate-800">Hebat Sekali!</h2>
          <p className="text-slate-600 font-bold text-sm">
            Kamu berhasil menjawab{" "}
            <span className="text-blue-600 font-black">{score}</span> dari{" "}
            {totalQuestions} pertanyaan!
          </p>

          <input
            type="text"
            placeholder="Ketik Nama Kamu..."
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="w-full p-3.5 rounded-2xl border-2 border-slate-300 font-extrabold text-center text-base focus:border-blue-500 outline-none"
          />

          <button
            onClick={handleGenerate}
            className="btn-chunky w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black py-3.5 rounded-2xl shadow-lg active:scale-95 transition-all text-base cursor-pointer border-2 border-emerald-400"
          >
            Simpan Skor & Sertifikat 🎓
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          <div
            ref={certRef}
            className="w-[310px] h-[540px] bg-gradient-to-b from-blue-100 to-yellow-50 border-8 border-amber-300 rounded-3xl p-5 flex flex-col items-center justify-between text-center relative shadow-2xl"
          >
            <div className="flex items-center gap-2 mt-2">
              <span className="text-3xl">🦁</span>
              <span className="font-black text-lg text-blue-600">
                EduKids Game
              </span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <span className="text-5xl">🎓</span>
              <h1 className="text-lg font-black text-slate-700 uppercase tracking-wider">
                Sertifikat Pintar
              </h1>
              <p className="text-xs text-slate-500 font-bold">
                Diberikan Kepada:
              </p>
              <h2 className="text-2xl font-black text-pink-600 underline underline-offset-4">
                {childName || "Anak Pintar"}
              </h2>
            </div>

            <p className="text-xs font-bold text-slate-600 px-2">
              Telah berhasil menyelesaikan Kuis dengan nilai <br />
              <span className="text-lg font-black text-emerald-600">
                ⭐ {score} / {totalQuestions} ⭐
              </span>
            </p>

            <div className="w-full pt-3 border-t-2 border-dashed border-slate-300 flex items-center justify-between px-2">
              <div className="text-left">
                <p className="text-[9px] font-bold text-slate-400">
                  Main gratis di:
                </p>
                <p className="text-xs font-black text-blue-600">
                  edukids.vercel.app
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <button
              onClick={handleDownload}
              className="btn-chunky flex-1 bg-blue-500 text-white font-black py-3 rounded-2xl text-xs cursor-pointer"
            >
              📥 Simpan Gambar
            </button>
            <button
              onClick={onRestart}
              className="btn-chunky bg-slate-200 text-slate-700 font-black px-4 py-3 rounded-2xl text-xs cursor-pointer"
            >
              🔄 Main Lagi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
