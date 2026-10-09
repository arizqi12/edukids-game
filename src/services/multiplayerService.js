import { db } from "./firebase";
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  onSnapshot,
  arrayUnion,
  serverTimestamp,
} from "firebase/firestore";
import { getOrCreatePlayerId } from "./dataService";

export const generateRoomCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// 1. BUAT ROOM (Mode: 'peer' [2-5 orang] atau 'teacher' [max 30 orang])
export const createRoom = async ({
  hostName,
  ageCategory,
  roomType = "peer",
  avatar = "🦁",
}) => {
  const roomCode = generateRoomCode();
  const playerId = getOrCreatePlayerId();
  const roomRef = doc(db, "rooms", roomCode);

  const initialPlayers =
    roomType === "peer"
      ? [
          {
            playerId,
            name: hostName.trim() || "Host Pintar",
            avatar,
            score: 0,
            isHost: true,
            isFinished: false,
          },
        ]
      : [];

  await setDoc(roomRef, {
    roomCode,
    ageCategory,
    roomType,
    status: "waiting",
    hostId: playerId,
    maxPlayers: roomType === "peer" ? 5 : 30,
    minPlayers: roomType === "peer" ? 2 : 1,
    players: initialPlayers,
    createdAt: serverTimestamp(),
  });

  return roomCode;
};

// 2. GABUNG ROOM
export const joinRoom = async (roomCode, playerName, avatar = "🐰") => {
  const formattedCode = roomCode.trim().toUpperCase();
  const roomRef = doc(db, "rooms", formattedCode);
  const roomSnap = await getDoc(roomRef);

  if (!roomSnap.exists()) {
    throw new Error("Kode Room tidak ditemukan!");
  }

  const roomData = roomSnap.data();

  if (roomData.status !== "waiting") {
    throw new Error("Kuis di room ini sudah dimulai atau selesai!");
  }

  if (roomData.players.length >= roomData.maxPlayers) {
    throw new Error(
      `Room sudah penuh! Maksimal ${roomData.maxPlayers} peserta.`,
    );
  }

  const playerId = getOrCreatePlayerId();
  const existingPlayer = roomData.players.find((p) => p.playerId === playerId);

  if (!existingPlayer) {
    const newPlayer = {
      playerId,
      name: playerName.trim() || "Teman Pintar",
      avatar,
      score: 0,
      isHost: false,
      isFinished: false,
    };

    await updateDoc(roomRef, {
      players: arrayUnion(newPlayer),
    });
  }

  return formattedCode;
};

// 3. LISTEN REAL-TIME DATA
export const listenRoom = (roomCode, callback) => {
  const roomRef = doc(db, "rooms", roomCode);
  return onSnapshot(roomRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data());
    }
  });
};

// 4. MULAI GAME
export const startRoomGame = async (roomCode) => {
  const roomRef = doc(db, "rooms", roomCode);
  const roomSnap = await getDoc(roomRef);

  if (roomSnap.exists()) {
    const data = roomSnap.data();

    if (data.roomType === "peer" && data.players.length < 2) {
      throw new Error("Minimal harus ada 2 teman di room untuk mulai bermain!");
    }

    if (data.roomType === "teacher" && data.players.length < 1) {
      throw new Error("Belum ada siswa yang masuk ke room!");
    }

    await updateDoc(roomRef, { status: "playing" });
  }
};

// 5. UPDATE SKOR REAL-TIME
export const updatePlayerScore = async (
  roomCode,
  currentScore,
  isFinished = false,
) => {
  const playerId = getOrCreatePlayerId();
  const roomRef = doc(db, "rooms", roomCode);
  const roomSnap = await getDoc(roomRef);

  if (roomSnap.exists()) {
    const roomData = roomSnap.data();
    const updatedPlayers = roomData.players.map((p) => {
      if (p.playerId === playerId) {
        return { ...p, score: currentScore, isFinished };
      }
      return p;
    });

    await updateDoc(roomRef, {
      players: updatedPlayers,
    });
  }
};
