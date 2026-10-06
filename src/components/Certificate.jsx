import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";

export default function Certificate({ score, totalQuestions, onRestart }) {
  const [childName, setChildName] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const certRef = useRef(null);

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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Anakku Pintar!",
          text: `Wah, ${childName || "Si kecil"} berhasil menyelesaikan kuis di EduKids! Coba mainkan kuis edukasi gratisnya di:`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share canceled", err);
      }
    } else {
      alert(
        "Fitur bagikan otomatis didukung langsung saat dibuka via Smartphone!",
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">
      {!isGenerated ? (
        <div className="w-full bg-white rounded-3xl p-6 shadow-xl border-4 border-[var(--color-kid-green)] flex flex-col items-center gap-4 text-center">
          <span className="text-5xl">🏆</span>
          <h2 className="text-2xl font-black text-gray-800">Hebat Sekali!</h2>
          <p className="text-gray-600 font-bold">
            Kamu berhasil menjawab{" "}
            <span className="text-[var(--color-kid-blue)]">{score}</span> dari{" "}
            {totalQuestions} pertanyaan!
          </p>

          <input
            type="text"
            placeholder="Ketik Nama Kamu..."
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="w-full p-3 rounded-2xl border-2 border-gray-300 font-bold text-center text-lg focus:border-[var(--color-kid-blue)] outline-none"
          />

          <button
            onClick={() => setIsGenerated(true)}
            className="w-full bg-[var(--color-kid-green)] text-black font-black py-3 rounded-2xl shadow-lg active:scale-95 transition-all text-lg cursor-pointer"
          >
            Buat Sertifikat 🎓
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4 w-full">
          {/* Sertifikat Aspect Ratio 9:16 untuk IG Story / WA Status */}
          <div
            ref={certRef}
            className="w-[320px] h-[568px] bg-gradient-to-b from-blue-100 to-yellow-50 border-8 border-[var(--color-kid-yellow)] rounded-3xl p-6 flex flex-col items-center justify-between text-center relative shadow-2xl"
          >
            <div className="flex items-center gap-2 mt-2">
              <span className="text-3xl">🦁</span>
              <span className="font-black text-xl text-[var(--color-kid-blue)]">
                EduKids Game
              </span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-6xl">🎓</span>
              <h1 className="text-xl font-black text-gray-700 tracking-wider uppercase">
                Sertifikat Pintar
              </h1>
              <p className="text-xs text-gray-500 font-bold">
                Diberikan Kepada:
              </p>
              <h2 className="text-2xl font-black text-[var(--color-kid-pink)] underline underline-offset-4">
                {childName || "Anak Pintar"}
              </h2>
            </div>

            <p className="text-sm font-bold text-gray-600 px-2">
              Telah berhasil menyelesaikan Kuis Edukasi Anak dengan nilai <br />
              <span className="text-xl font-black text-green-600">
                ⭐ {score} / {totalQuestions} ⭐
              </span>
            </p>

            <div className="w-full pt-4 border-t-2 border-dashed border-gray-300 flex items-center justify-between px-2">
              <div className="text-left">
                <p className="text-[10px] font-bold text-gray-400">
                  Main gratis di:
                </p>
                <p className="text-xs font-black text-[var(--color-kid-blue)]">
                  edukids.vercel.app
                </p>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center text-[8px] font-bold text-gray-500">
                [QR CODE]
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full">
            <div className="flex gap-3 w-full">
              <button
                onClick={handleDownload}
                className="flex-1 bg-[var(--color-kid-blue)] text-white font-black py-3 rounded-2xl shadow-lg active:scale-95 transition-all text-sm cursor-pointer"
              >
                📥 Simpan Gambar
              </button>
              <button
                onClick={handleShare}
                className="flex-1 bg-[var(--color-kid-green)] text-white font-black py-3 rounded-2xl shadow-lg active:scale-95 transition-all text-sm cursor-pointer"
              >
                📲 Bagikan (WA/IG)
              </button>
            </div>
            <button
              onClick={onRestart}
              className="w-full bg-gray-200 text-gray-700 font-black py-3 rounded-2xl active:scale-95 transition-all text-sm cursor-pointer"
            >
              🔄 Main Kuis Lain
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
