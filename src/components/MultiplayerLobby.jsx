import React, { useState, useEffect } from "react";
import {
  createRoom,
  joinRoom,
  listenRoom,
  startRoomGame,
} from "../services/multiplayerService";
import { getOrCreatePlayerId } from "../services/dataService";

export default function MultiplayerLobby({ onStartGame, onBack }) {
  const [mode, setMode] = useState("menu"); // menu | peer_create | join | teacher_auth | teacher_create | waiting
  const [playerName, setPlayerName] = useState("");
  const [ageCategory, setAgeCategory] = useState("3-5");
  const [roomCode, setRoomCode] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Proteksi Akses Guru
  const [teacherPin, setTeacherPin] = useState("");
  const CORRECT_TEACHER_PIN = "1234";

  const currentPlayerId = getOrCreatePlayerId();

  useEffect(() => {
    if (!roomCode) return;

    const unsubscribe = listenRoom(roomCode, (data) => {
      setRoomData(data);
      if (data.status === "playing") {
        onStartGame(data);
      }
    });

    return () => unsubscribe();
  }, [roomCode, onStartGame]);

  // Handle Buat Room Teman (Max 5 orang)
  const handleCreatePeerRoom = async () => {
    if (!playerName.trim()) return setErrorMsg("Masukkan nama kamu dulu ya!");
    setLoading(true);
    setErrorMsg("");

    try {
      const code = await createRoom({
        hostName: playerName,
        ageCategory,
        roomType: "peer",
        avatar: "🦁",
      });
      setRoomCode(code);
      setMode("waiting");
    } catch (err) {
      setErrorMsg("Gagal membuat room.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Buat Room Guru (Max 30 orang)
  const handleCreateTeacherRoom = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const code = await createRoom({
        hostName: "Guru",
        ageCategory,
        roomType: "teacher",
        avatar: "👩‍🏫",
      });
      setRoomCode(code);
      setMode("waiting");
    } catch (err) {
      setErrorMsg("Gagal membuat room kelas.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Join Room
  const handleJoinRoom = async () => {
    if (!playerName.trim()) return setErrorMsg("Masukkan nama kamu dulu ya!");
    if (!inputCode.trim()) return setErrorMsg("Masukkan kode room!");
    setLoading(true);
    setErrorMsg("");

    try {
      const code = await joinRoom(inputCode, playerName, "🐰");
      setRoomCode(code);
      setMode("waiting");
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Verifikasi PIN Guru
  const handleVerifyTeacher = () => {
    if (teacherPin === CORRECT_TEACHER_PIN) {
      setErrorMsg("");
      setMode("teacher_create");
    } else {
      setErrorMsg("PIN Guru Salah! Akses khusus Tenaga Pengajar.");
    }
  };

  // Handle Mulai Game dari Waiting Room
  const handleStartGame = async () => {
    setErrorMsg("");
    try {
      await startRoomGame(roomCode);
    } catch (err) {
      setErrorMsg(err.message);
    }
  };

  const isHost = roomData?.hostId === currentPlayerId;

  return (
    <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-xl border-4 border-sky-400 flex flex-col items-center gap-4 text-center">
      <div className="flex items-center gap-2">
        <span className="text-3xl">🎮</span>
        <h2 className="text-xl font-black text-gray-800">Mode Main Bersama</h2>
      </div>

      {errorMsg && (
        <div className="bg-rose-100 text-rose-700 p-2.5 rounded-xl text-xs font-bold w-full">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* 1. MENU UTAMA MULTIPLAYER */}
      {mode === "menu" && (
        <div className="flex flex-col gap-3 w-full my-2">
          <button
            onClick={() => setMode("peer_create")}
            className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-black py-3 rounded-2xl shadow-md active:scale-95 transition-all text-sm cursor-pointer"
          >
            👫 Main Bersama Teman (2-5 Orang)
          </button>

          <button
            onClick={() => setMode("join")}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-3 rounded-2xl shadow-md active:scale-95 transition-all text-sm cursor-pointer"
          >
            🔑 Masuk Pakai Kode Room
          </button>

          <button
            onClick={() => setMode("teacher_auth")}
            className="w-full bg-purple-100 hover:bg-purple-200 text-purple-900 border-2 border-purple-300 font-extrabold py-3 rounded-2xl active:scale-95 transition-all text-sm cursor-pointer mt-1"
          >
            👩‍🏫 Ruang Mode Guru (Max 30 Siswa)
          </button>

          <button
            onClick={onBack}
            className="w-full bg-gray-100 text-gray-600 font-bold py-2 rounded-2xl text-xs cursor-pointer mt-2"
          >
            ← Kembali ke Beranda
          </button>
        </div>
      )}

      {/* 2. VERIFIKASI AKSES GURU */}
      {mode === "teacher_auth" && (
        <div className="flex flex-col gap-3 w-full">
          <p className="text-xs font-bold text-gray-600">
            Akses Khusus Guru. <br /> Masukkan PIN Akses (Default: 1234):
          </p>
          <input
            type="password"
            placeholder="Masukkan PIN Guru..."
            value={teacherPin}
            onChange={(e) => setTeacherPin(e.target.value)}
            className="p-3 rounded-2xl border-2 border-purple-300 text-center font-black text-lg outline-none"
          />
          <button
            onClick={handleVerifyTeacher}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-3 rounded-2xl shadow-md active:scale-95 transition-all text-sm cursor-pointer"
          >
            Verifikasi Guru 🔓
          </button>
          <button
            onClick={() => setMode("menu")}
            className="text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            Batal
          </button>
        </div>
      )}

      {/* 3. FORM BUAT ROOM GURU */}
      {mode === "teacher_create" && (
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-sm font-black text-purple-900">
            Buat Kelas Kuis Guru
          </h3>
          <div className="text-left">
            <label className="text-xs font-bold text-gray-500 mb-1 block">
              Pilih Tingkat Level Kuis:
            </label>
            <select
              value={ageCategory}
              onChange={(e) => setAgeCategory(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-gray-300 font-bold text-center text-xs outline-none"
            >
              <option value="3-5">🎈 Petualang Cilik</option>
              <option value="6-8">🚀 Jagoan Pintar</option>
              <option value="9-12">🏆 Penjelajah Hebat</option>
            </select>
          </div>

          <button
            onClick={handleCreateTeacherRoom}
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-3 rounded-2xl shadow-md active:scale-95 transition-all text-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? "Membuat..." : "Buka Room Kelas Siswa (Max 30) 🚀"}
          </button>
          <button
            onClick={() => setMode("menu")}
            className="text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            Batal
          </button>
        </div>
      )}

      {/* 4. FORM BUAT ROOM TEMAN */}
      {mode === "peer_create" && (
        <div className="flex flex-col gap-3 w-full">
          <input
            type="text"
            placeholder="Ketik Nama Kamu..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="p-3 rounded-2xl border-2 border-gray-300 font-bold text-center text-sm outline-none"
          />

          <div className="text-left">
            <label className="text-xs font-bold text-gray-500 mb-1 block">
              Pilih Level Kuis:
            </label>
            <select
              value={ageCategory}
              onChange={(e) => setAgeCategory(e.target.value)}
              className="w-full p-3 rounded-2xl border-2 border-gray-300 font-bold text-center text-xs outline-none"
            >
              <option value="3-5">🎈 Petualang Cilik</option>
              <option value="6-8">🚀 Jagoan Pintar</option>
              <option value="9-12">🏆 Penjelajah Hebat</option>
            </select>
          </div>

          <button
            onClick={handleCreatePeerRoom}
            disabled={loading}
            className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-black py-3 rounded-2xl shadow-md active:scale-95 transition-all text-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? "Membuat..." : "Buat Room (2-5 Teman) 🚀"}
          </button>
          <button
            onClick={() => setMode("menu")}
            className="text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            Batal
          </button>
        </div>
      )}

      {/* 5. FORM MASUK PAKAI KODE */}
      {mode === "join" && (
        <div className="flex flex-col gap-3 w-full">
          <input
            type="text"
            placeholder="Ketik Nama Kamu..."
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            className="p-3 rounded-2xl border-2 border-gray-300 font-bold text-center text-sm outline-none"
          />

          <input
            type="text"
            placeholder="Kode Room (Contoh: X7B9K2)"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            className="p-3 rounded-2xl border-2 border-gray-300 font-black text-center text-base tracking-widest uppercase outline-none"
          />

          <button
            onClick={handleJoinRoom}
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-black py-3 rounded-2xl shadow-md active:scale-95 transition-all text-sm cursor-pointer disabled:opacity-50"
          >
            {loading ? "Mencari..." : "Bergabung ke Room 🎮"}
          </button>
          <button
            onClick={() => setMode("menu")}
            className="text-xs font-bold text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            Batal
          </button>
        </div>
      )}

      {/* 6. RUANG TUNGGU (WAITING ROOM) */}
      {mode === "waiting" && roomData && (
        <div className="flex flex-col gap-3 w-full">
          <div className="bg-amber-50 border-2 border-amber-300 p-3 rounded-2xl">
            <p className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">
              Kode Room{" "}
              {roomData.roomType === "teacher" ? "Kelas Guru" : "Teman"}:
            </p>
            <h1 className="text-3xl font-black text-pink-500 tracking-widest my-1 select-all">
              {roomData.roomCode}
            </h1>
          </div>

          <div className="w-full text-left">
            <p className="text-xs font-bold text-gray-500 mb-1">
              Peserta Terhubung ({roomData.players.length}/{roomData.maxPlayers}
              ):
            </p>

            {roomData.roomType === "peer" && roomData.players.length < 2 && (
              <div className="bg-orange-50 border border-orange-200 text-orange-800 p-2 rounded-xl text-[11px] font-bold mb-2">
                📢 Ajak minimal 1 teman lagi untuk bisa mulai bermain!
              </div>
            )}

            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
              {roomData.players.map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded-xl text-xs font-bold border border-gray-200"
                >
                  <div className="flex items-center gap-2">
                    <span>{p.avatar}</span>
                    <span>{p.name}</span>
                  </div>
                  {p.isHost && (
                    <span className="bg-amber-200 text-amber-900 text-[9px] px-1.5 py-0.5 rounded font-black">
                      HOST
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isHost || roomData.roomType === "teacher" ? (
            <button
              onClick={handleStartGame}
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-slate-900 font-black py-3 rounded-2xl shadow-md active:scale-95 transition-all text-sm cursor-pointer mt-1"
            >
              Mulai Kuis Bersama 🚀
            </button>
          ) : (
            <p className="text-xs font-bold text-gray-400 animate-pulse mt-1">
              Menunggu Host/Guru memulai kuis... ⏳
            </p>
          )}
        </div>
      )}
    </div>
  );
}
