import React, { useState } from 'react';
import { getClassScoresByCode } from '../services/dataService';

export default function TeacherReport({ onBack }) {
  const [inputClassCode, setInputClassCode] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearchScores = async (e) => {
    e.preventDefault();
    if (!inputClassCode.trim()) return;

    setLoading(true);
    setSearched(true);
    const data = await getClassScoresByCode(inputClassCode);
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-3xl p-5 shadow-xl border-4 border-slate-100 flex flex-col gap-4 text-center">
      {/* Header Guru */}
      <div className="bg-blue-100 border border-blue-300 rounded-2xl p-3 flex items-center justify-center gap-3">
        <span className="text-3xl">👩‍🏫</span>
        <div className="text-left">
          <h2 className="text-lg font-black text-blue-950 leading-tight">Pojok Rekap Nilai Guru</h2>
          <p className="text-xs font-bold text-blue-800">Cek hasil tugas & PR siswa</p>
        </div>
      </div>

      {/* Form Input Kode Kelas */}
      <form onSubmit={handleSearchScores} className="flex flex-col gap-2">
        <label className="text-xs font-extrabold text-slate-600 text-left">Masukkan Kode Kelas / Tugas:</label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Contoh: SDN1-IPA3"
            value={inputClassCode}
            onChange={(e) => setInputClassCode(e.target.value.toUpperCase())}
            className="flex-1 p-3 rounded-xl border-2 border-slate-300 font-extrabold text-sm uppercase focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            className="btn-chunky bg-blue-500 text-white font-black px-4 rounded-xl text-sm border-2 border-blue-400 cursor-pointer"
          >
            Cari 🔍
          </button>
        </div>
      </form>

      {/* Tabel Rekap Nilai */}
      {loading ? (
        <p className="text-xs font-bold text-slate-400 py-4">Memuat data nilai...</p>
      ) : searched && results.length === 0 ? (
        <p className="text-xs font-bold text-slate-400 py-4">
          Belum ada nilai terdata untuk kode <strong>"{inputClassCode}"</strong>.
        </p>
      ) : results.length > 0 ? (
        <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
          <div className="flex justify-between items-center px-2 py-1 text-[10px] font-black text-slate-400 border-b">
            <span>NAMA SISWA</span>
            <span>KATEGORI / NILAI</span>
          </div>
          {results.map((res, index) => (
            <div key={index} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-left">
              <div>
                <h4 className="font-extrabold text-slate-800 text-sm">{res.studentName}</h4>
                <p className="text-[10px] text-slate-400 font-bold">{res.categoryTitle}</p>
              </div>
              <span className="bg-emerald-500 text-white font-black px-3 py-1 rounded-lg text-xs">
                ⭐ {res.score} / {res.totalQuestions}
              </span>
            </div>
          ))}
        </div>
      ) : null}

      <button
        onClick={onBack}
        className="btn-chunky w-full bg-slate-200 text-slate-700 font-extrabold py-3 rounded-xl text-xs border-2 border-slate-300 cursor-pointer mt-1"
      >
        ⬅ Kembali
      </button>
    </div>
  );
}