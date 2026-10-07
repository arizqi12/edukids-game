import React, { useState, useEffect } from "react";

export default function QuizCard({ questionData, onAnswer }) {
  const [selectedOption, setSelectedOption] = useState(null);

  // Fungsi Pemutar Suara AI Bawaan Browser (Dukung ID & EN)
  const playVoice = (text, customLang) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel(); // Hentikan suara yang sedang berjalan
      const utterance = new SpeechSynthesisUtterance(text);

      // Pilih bahasa dari data soal atau default ke Bahasa Indonesia
      utterance.lang = customLang || questionData.lang || "id-ID";
      utterance.pitch = 1.2; // Pitch suara ceria
      utterance.rate = 0.85; // Kecepatan agak lambat agar jelas untuk anak

      window.speechSynthesis.speak(utterance);
    }
  };

  // Otomatis putar suara pertanyaan saat soal berganti
  useEffect(() => {
    setSelectedOption(null);
    const textToSpeak =
      questionData?.speechText ||
      questionData?.title ||
      questionData?.questionText;
    if (textToSpeak) {
      playVoice(textToSpeak);
    }
  }, [questionData]);

  const handleSelect = (option, index) => {
    // Tentukan apakah jawaban benar (mendukung field isCorrect atau correctAnswerIndex)
    const isCorrect =
      option.isCorrect !== undefined
        ? option.isCorrect
        : index === questionData.correctAnswerIndex;

    const optId = option.id !== undefined ? option.id : index;
    setSelectedOption(optId);

    // Respon suara berdasarkan bahasa soal
    const isEnglish = questionData.lang === "en-US";
    if (isCorrect) {
      playVoice(
        isEnglish
          ? "Great job! That's correct!"
          : "Wah, hebat sekali! Jawabannya benar!",
        questionData.lang,
      );
    } else {
      playVoice(
        isEnglish ? "Try again!" : "Hampir benar, coba tebak lagi ya!",
        questionData.lang,
      );
    }

    // Jeda 1.2 detik sebelum lanjut ke soal berikutnya
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1200);
  };

  if (!questionData) return null;

  const questionTitle = questionData.title || questionData.questionText;
  const questionSpeech = questionData.speechText || questionTitle;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-5 shadow-xl border-4 border-slate-100 flex flex-col items-center gap-5 relative">
      {/* Tombol Pemutar Suara Ulang Pertanyaan */}
      <button
        onClick={() => playVoice(questionSpeech)}
        className="btn-chunky flex items-center gap-2.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-extrabold py-3 px-6 rounded-2xl text-base cursor-pointer border-2 border-amber-200"
      >
        <span className="text-2xl">🔊</span>
        <span>
          {questionData.lang === "en-US"
            ? "Listen Question"
            : "Dengar Pertanyaan"}
        </span>
      </button>

      {/* Gambar Pertanyaan (Jika Ada) */}
      {(questionData.questionImage || questionData.image) && (
        <div className="w-full max-h-48 rounded-2xl overflow-hidden border-2 border-slate-100 shadow-sm flex items-center justify-center bg-slate-50">
          <img
            src={questionData.questionImage || questionData.image}
            alt="Gambar Soal"
            className="w-full h-48 object-contain"
          />
        </div>
      )}

      {/* Teks Pertanyaan */}
      <h2 className="text-xl font-black text-slate-800 text-center leading-snug px-2">
        {questionTitle}
      </h2>

      {/* Grid Tombol Pilihan Jawaban (2x2) */}
      <div className="grid grid-cols-2 gap-3.5 w-full">
        {questionData.options.map((opt, index) => {
          // Normalisasi opsi (dukung format objek {id, label, image} atau string biasa)
          const isObject = typeof opt === "object";
          const optLabel = isObject ? opt.label || opt.text : opt;
          const optImage = isObject ? opt.image || opt.imageUrl : null;
          const optId = isObject && opt.id !== undefined ? opt.id : index;

          const isCorrect =
            isObject && opt.isCorrect !== undefined
              ? opt.isCorrect
              : index === questionData.correctAnswerIndex;

          const isSelected = selectedOption === optId;

          return (
            <button
              key={optId}
              onClick={() => handleSelect(opt, index)}
              disabled={selectedOption !== null}
              className={`btn-chunky p-3.5 rounded-2xl border-3 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
                isSelected
                  ? isCorrect
                    ? "bg-emerald-100 border-emerald-500 text-emerald-900 scale-102"
                    : "bg-rose-100 border-rose-400 text-rose-900"
                  : "bg-slate-50 hover:bg-sky-50 border-slate-200 text-slate-800"
              }`}
            >
              {/* Render Gambar Opsi jika ada */}
              {optImage && (
                <div className="w-16 h-16 bg-white rounded-xl p-2 flex items-center justify-center border border-slate-100 shadow-sm">
                  <img
                    src={optImage}
                    alt={optLabel || `Opsi ${index + 1}`}
                    className="w-12 h-12 object-contain pointer-events-none"
                  />
                </div>
              )}

              {/* Render Teks Opsi */}
              {optLabel && (
                <span className="font-extrabold text-base tracking-wide text-center">
                  {optLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
