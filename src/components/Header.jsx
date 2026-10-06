import React from "react";

export default function Header({ score, totalQuestions, onReset }) {
  return (
    <header className="w-full max-w-md mx-auto bg-white/90 backdrop-blur-md rounded-full px-5 py-3 shadow-md border-2 border-slate-100 flex items-center justify-between mb-4">
      {/* Logo & Tombol Home */}
      <button
        onClick={onReset}
        className="flex items-center gap-2.5 cursor-pointer bg-amber-100 hover:bg-amber-200 px-3.5 py-1.5 rounded-full transition-all border border-amber-300 active:scale-95"
      >
        <span className="text-2xl animate-float">🦁</span>
        <div className="text-left leading-none">
          <h1 className="text-base font-extrabold text-amber-900 tracking-wide">
            EduKids
          </h1>
          <span className="text-[10px] font-bold text-amber-700">Beranda</span>
        </div>
      </button>

      {/* Papan Skor Bintang */}
      <div className="bg-emerald-50 border-2 border-emerald-200 px-4 py-1 rounded-full flex items-center gap-2">
        <span className="text-xl">⭐</span>
        <span className="font-extrabold text-emerald-700 text-base">
          {score}{" "}
          <span className="text-emerald-400 font-bold">/ {totalQuestions}</span>
        </span>
      </div>
    </header>
  );
}
