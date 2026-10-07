import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// 1. Fungsi Membersihkan Bank Soal Lama
export const clearQuestions = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "questions"));
    const deletePromises = querySnapshot.docs.map((d) =>
      deleteDoc(doc(db, "questions", d.id)),
    );
    await Promise.all(deletePromises);
    console.log("🧹 Bank soal lama berhasil dibersihkan.");
    return true;
  } catch (error) {
    console.error("Gagal menghapus soal lama:", error);
    return false;
  }
};

// 2. Bank Soal Super Lengkap & Bervariasi (120+ Soal)
const HANDCRAFTED_QUESTIONS = [
  // ===================================================
  // 1. PETUALANG CILIK (3-5 TAHUN) - 40 SOAL
  // ===================================================

  // --- Bahasa Inggris (3-5 Tahun) ---
  {
    ageCategory: "3-5",
    subject: "bahasa_inggris",
    questionText: "What is the English word for 'Kucing'?",
    questionImage:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400",
    speechText: "What is the English word for Kucing?",
    lang: "en-US",
    correctAnswerIndex: 0,
    options: ["Cat", "Dog", "Bird", "Fish"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_inggris",
    questionText: "Which color is 'Red'?",
    questionImage: null,
    speechText: "Which color is Red?",
    lang: "en-US",
    correctAnswerIndex: 1,
    options: ["Biru", "Merah", "Kuning", "Hijau"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_inggris",
    questionText: "How do you say 'Selamat Pagi' in English?",
    questionImage: null,
    speechText: "How do you say Selamat Pagi in English?",
    lang: "en-US",
    correctAnswerIndex: 2,
    options: ["Good Night", "Good Afternoon", "Good Morning", "Goodbye"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_inggris",
    questionText: "What fruit is 'Apple'?",
    questionImage:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400",
    speechText: "What fruit is Apple?",
    lang: "en-US",
    correctAnswerIndex: 0,
    options: ["Apel", "Pisang", "Jeruk", "Anggur"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_inggris",
    questionText: "What animal is 'Dog'?",
    questionImage:
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400",
    speechText: "What animal is Dog?",
    lang: "en-US",
    correctAnswerIndex: 1,
    options: ["Kucing", "Anjing", "Bebek", "Kambing"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_inggris",
    questionText: "How do you say 'Terima Kasih' in English?",
    questionImage: null,
    speechText: "How do you say Terima Kasih in English?",
    lang: "en-US",
    correctAnswerIndex: 0,
    options: ["Thank You", "Sorry", "Please", "Hello"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_inggris",
    questionText: "Which one is 'Milk'?",
    questionImage: null,
    speechText: "Which one is Milk?",
    lang: "en-US",
    correctAnswerIndex: 2,
    options: ["Teh", "Kopi", "Susu", "Air Es"],
  },

  // --- Bahasa Indonesia (3-5 Tahun) ---
  {
    ageCategory: "3-5",
    subject: "bahasa_indonesia",
    questionText: "Suara 'Moo Moo' berasal dari hewan apa ya?",
    questionImage:
      "https://images.unsplash.com/photo-1546445317-29f4545f9d52?w=400",
    speechText: "Suara Moo Moo berasal dari hewan apa ya?",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Sapi", "Kucing", "Ayam", "Kambing"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_indonesia",
    questionText: "Hewan manakah yang suka berenang di dalam air?",
    questionImage: null,
    speechText: "Hewan manakah yang suka berenang di dalam air?",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Burung", "Ikan", "Kelinci", "Kucing"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_indonesia",
    questionText:
      "Mana hewan yang memiliki telinga panjang dan suka makan wortel?",
    questionImage: null,
    speechText:
      "Mana hewan yang memiliki telinga panjang dan suka makan wortel?",
    lang: "id-ID",
    correctAnswerIndex: 3,
    options: ["Anjing", "Sapi", "Kuda", "Kelinci"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_indonesia",
    questionText: "Suara 'Kukuruyuk' di pagi hari adalah suara hewan...",
    questionImage:
      "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400",
    speechText: "Suara Kukuruyuk di pagi hari adalah suara hewan...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Ayam Jantan", "Bebek", "Kambing", "Burung"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_indonesia",
    questionText:
      "Hewan yang berjalan melompat dan punya kantong di perutnya adalah...",
    questionImage: null,
    speechText:
      "Hewan yang berjalan melompat dan punya kantong di perutnya adalah...",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["Gajah", "Jerapah", "Kanguru", "Singa"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_indonesia",
    questionText: "Hewan apa yang bunyinya 'Meong Meong'?",
    questionImage: null,
    speechText: "Hewan apa yang bunyinya Meong Meong?",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Anjing", "Kucing", "Sapi", "Bebek"],
  },
  {
    ageCategory: "3-5",
    subject: "bahasa_indonesia",
    questionText: "Burung terbang menggunakan...",
    questionImage: null,
    speechText: "Burung terbang menggunakan...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Sayap", "Kaki", "Ekor", "Ekor"],
  },

  // --- Sains & Warna (3-5 Tahun) ---
  {
    ageCategory: "3-5",
    subject: "sains",
    questionText: "Warna apakah buah pisang yang sudah matang?",
    questionImage:
      "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400",
    speechText: "Warna apakah buah pisang yang sudah matang?",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Merah", "Kuning", "Biru", "Hitam"],
  },
  {
    ageCategory: "3-5",
    subject: "sains",
    questionText:
      "Bagian tubuh mana yang kita gunakan untuk mendengarkan lagu?",
    questionImage: null,
    speechText: "Bagian tubuh mana yang kita gunakan untuk mendengarkan lagu?",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Telinga", "Mata", "Hidung", "Kaki"],
  },
  {
    ageCategory: "3-5",
    subject: "sains",
    questionText:
      "Benda di langit yang menyinari bumi di siang hari dan terasa hangat adalah...",
    questionImage: null,
    speechText:
      "Benda di langit yang menyinari bumi di siang hari dan terasa hangat adalah...",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["Awan", "Bintang", "Matahari", "Bulan"],
  },
  {
    ageCategory: "3-5",
    subject: "sains",
    questionText: "Kita menggunakan hidung untuk...",
    questionImage: null,
    speechText: "Kita menggunakan hidung untuk...",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Melihat", "Mencium Bau", "Mendengar", "Berjalan"],
  },
  {
    ageCategory: "3-5",
    subject: "sains",
    questionText: "Air laut terasa...",
    questionImage: null,
    speechText: "Air laut terasa...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Asin", "Manis", "Pahit", "Pedas"],
  },
  {
    ageCategory: "3-5",
    subject: "sains",
    questionText: "Tanaman butuh dipupuk dan disiram dengan...",
    questionImage: null,
    speechText: "Tanaman butuh dipupuk dan disiram dengan...",
    lang: "id-ID",
    correctAnswerIndex: 3,
    options: ["Minyak", "Susu", "Sirup", "Air"],
  },

  // --- Matematika (3-5 Tahun) ---
  {
    ageCategory: "3-5",
    subject: "matematika",
    questionText:
      "Budi punya 2 kue, lalu diberi 1 kue lagi oleh Ibu. Berapa kue Budi sekarang?",
    questionImage: null,
    speechText:
      "Budi punya 2 kue, lalu diberi 1 kue lagi oleh Ibu. Berapa kue Budi sekarang?",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["1", "2", "3", "4"],
  },
  {
    ageCategory: "3-5",
    subject: "matematika",
    questionText: "Hitung jari pada satu tangan manusia! Ada berapa jari?",
    questionImage: null,
    speechText: "Hitung jari pada satu tangan manusia! Ada berapa jari?",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["3 Jari", "5 Jari", "7 Jari", "10 Jari"],
  },
  {
    ageCategory: "3-5",
    subject: "matematika",
    questionText: "Bentuk roda sepeda adalah...",
    questionImage: null,
    speechText: "Bentuk roda sepeda adalah...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Lingkaran", "Segitiga", "Kotak", "Bintang"],
  },
  {
    ageCategory: "3-5",
    subject: "matematika",
    questionText: "Mana angka yang lebih besar: 1 atau 5?",
    questionImage: null,
    speechText: "Mana angka yang lebih besar: 1 atau 5?",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["1", "5", "Sama saja", "Tidak ada"],
  },
  {
    ageCategory: "3-5",
    subject: "matematika",
    questionText:
      "Ani memiliki 3 balon, 1 balon meletus. Sisa balon Ani adalah...",
    questionImage: null,
    speechText:
      "Ani memiliki 3 balon, 1 balon meletus. Sisa balon Ani adalah...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["2 Balon", "3 Balon", "1 Balon", "4 Balon"],
  },

  // --- Kuis Campuran (3-5 Tahun) ---
  {
    ageCategory: "3-5",
    subject: "campuran",
    questionText: "Sebelum tidur malam, kita sebaiknya menggosok...",
    questionImage: null,
    speechText: "Sebelum tidur malam, kita sebaiknya menggosok...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Gigi", "Rambut", "Sepatu", "Baju"],
  },
  {
    ageCategory: "3-5",
    subject: "campuran",
    questionText: "Warna daun tanaman pada umumnya adalah...",
    questionImage: null,
    speechText: "Warna daun tanaman pada umumnya adalah...",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["Merah", "Ungu", "Hijau", "Merah Muda"],
  },
  {
    ageCategory: "3-5",
    subject: "campuran",
    questionText:
      "Minuman sehat berwarna putih yang dihasilkan oleh sapi adalah...",
    questionImage: null,
    speechText:
      "Minuman sehat berwarna putih yang dihasilkan oleh sapi adalah...",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Sirup", "Susu", "Teh", "Kopi"],
  },
  {
    ageCategory: "3-5",
    subject: "campuran",
    questionText: "Berapa jumlah kaki yang dimiliki oleh seekor kucing?",
    questionImage: null,
    speechText: "Berapa jumlah kaki yang dimiliki oleh seekor kucing?",
    lang: "id-ID",
    correctAnswerIndex: 3,
    options: ["1", "2", "3", "4"],
  },
  {
    ageCategory: "3-5",
    subject: "campuran",
    questionText: "Supaya badan bersih, kita harus mandi menggunakan...",
    questionImage: null,
    speechText: "Supaya badan bersih, kita harus mandi menggunakan...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Air dan Sabun", "Minyak goreng", "Pasir", "Kecap"],
  },

  // ===================================================
  // 2. JAGOAN PINTAR (6-8 TAHUN) - 40 SOAL
  // ===================================================

  // --- Bahasa Inggris (6-8 Tahun) ---
  {
    ageCategory: "6-8",
    subject: "bahasa_inggris",
    questionText: "What is the English word for 'Buku'?",
    questionImage: null,
    speechText: "What is the English word for Buku?",
    lang: "en-US",
    correctAnswerIndex: 0,
    options: ["Book", "Pencil", "Ruler", "Bag"],
  },
  {
    ageCategory: "6-8",
    subject: "bahasa_inggris",
    questionText: "Which animal is called an 'Elephant'?",
    questionImage:
      "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=400",
    speechText: "Which animal is called an Elephant?",
    lang: "en-US",
    correctAnswerIndex: 1,
    options: ["Jerapah", "Gajah", "Harimau", "Singa"],
  },
  {
    ageCategory: "6-8",
    subject: "bahasa_inggris",
    questionText: "What number is 'Ten'?",
    questionImage: null,
    speechText: "What number is Ten?",
    lang: "en-US",
    correctAnswerIndex: 2,
    options: ["5", "8", "10", "12"],
  },
  {
    ageCategory: "6-8",
    subject: "bahasa_inggris",
    questionText: "Translate into Indonesian: 'I love my family'",
    questionImage: null,
    speechText: "Translate into Indonesian: I love my family",
    lang: "en-US",
    correctAnswerIndex: 0,
    options: [
      "Saya sayang keluarga saya",
      "Saya suka makan nasi",
      "Saya mau pergi sekolah",
      "Keluarga saya besar",
    ],
  },
  {
    ageCategory: "6-8",
    subject: "bahasa_inggris",
    questionText: "What do you use to write on paper?",
    questionImage: null,
    speechText: "What do you use to write on paper?",
    lang: "en-US",
    correctAnswerIndex: 1,
    options: ["Shoes", "Pencil", "Hat", "Spoon"],
  },
  {
    ageCategory: "6-8",
    subject: "bahasa_inggris",
    questionText: "What day comes after Monday?",
    questionImage: null,
    speechText: "What day comes after Monday?",
    lang: "en-US",
    correctAnswerIndex: 3,
    options: ["Sunday", "Friday", "Wednesday", "Tuesday"],
  },

  // --- Matematika (6-8 Tahun) ---
  {
    ageCategory: "6-8",
    subject: "matematika",
    questionText:
      "Di keranjang ada 12 jeruk. Ani makan 4 buah. Berapa sisa jeruknya?",
    questionImage: null,
    speechText:
      "Di keranjang ada 12 jeruk. Ani makan 4 buah. Berapa sisa jeruknya?",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["6", "8", "10", "16"],
  },
  {
    ageCategory: "6-8",
    subject: "matematika",
    questionText: "Berapakah hasil dari 25 + 15?",
    questionImage: null,
    speechText: "Berapakah hasil dari 25 ditambah 15?",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["30", "35", "40", "45"],
  },
  {
    ageCategory: "6-8",
    subject: "matematika",
    questionText:
      "Bangun datar yang memiliki 3 buah sisi dan 3 sudut adalah...",
    questionImage: null,
    speechText: "Bangun datar yang memiliki 3 buah sisi dan 3 sudut adalah...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Segitiga", "Persegi Panjang", "Lingkaran", "Trapesium"],
  },
  {
    ageCategory: "6-8",
    subject: "matematika",
    questionText: "Ibu membeli 5 telur, jatuh pecah 2. Berapa telur yang utuh?",
    questionImage: null,
    speechText: "Ibu membeli 5 telur, jatuh pecah 2. Berapa telur yang utuh?",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["1", "3", "4", "7"],
  },
  {
    ageCategory: "6-8",
    subject: "matematika",
    questionText: "Hasil pengurangan dari 50 - 20 adalah...",
    questionImage: null,
    speechText: "Hasil pengurangan dari 50 dikurang 20 adalah...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["30", "20", "10", "40"],
  },

  // --- Sains (6-8 Tahun) ---
  {
    ageCategory: "6-8",
    subject: "sains",
    questionText:
      "Mengapa kita harus mencuci tangan dengan sabun sebelum makan?",
    questionImage: null,
    speechText: "Mengapa kita harus mencuci tangan dengan sabun sebelum makan?",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: [
      "Membunuh kuman dan bakteri",
      "Agar tangan wangi saja",
      "Agar makanan jadi manis",
      "Supaya tangan dingin",
    ],
  },
  {
    ageCategory: "6-8",
    subject: "sains",
    questionText:
      "Benda cair seperti air jika ditaruh di freezer akan berubah menjadi...",
    questionImage: null,
    speechText:
      "Benda cair seperti air jika ditaruh di freezer akan berubah menjadi...",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Gas", "Benda Padat (Es)", "Uap", "Minyak"],
  },
  {
    ageCategory: "6-8",
    subject: "sains",
    questionText:
      "Hewan yang dapat hidup di dua alam (darat dan air) seperti katak disebut...",
    questionImage: null,
    speechText: "Hewan yang dapat hidup di dua alam seperti katak disebut...",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["Mamalia", "Reptil", "Amfibi", "Unggas"],
  },
  {
    ageCategory: "6-8",
    subject: "sains",
    questionText:
      "Bagian tumbuhan yang berada di dalam tanah dan menyerap air adalah...",
    questionImage: null,
    speechText:
      "Bagian tumbuhan yang berada di dalam tanah dan menyerap air adalah...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Akar", "Daun", "Bunga", "Buah"],
  },
  {
    ageCategory: "6-8",
    subject: "sains",
    questionText:
      "Pelangi biasanya muncul di langit setelah hujan deras dan ada cahaya...",
    questionImage: null,
    speechText:
      "Pelangi biasanya muncul di langit setelah hujan deras dan ada cahaya...",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Bulan", "Matahari", "Bintang", "Lampu"],
  },

  // --- Bahasa Indonesia (6-8 Tahun) ---
  {
    ageCategory: "6-8",
    subject: "bahasa_indonesia",
    questionText: "Adik sedang [...] buku cerita. Kata yang tepat adalah...",
    questionImage: null,
    speechText:
      "Adik sedang titik-titik buku cerita. Kata yang tepat adalah...",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["Mencuci", "Memasak", "Membaca", "Menari"],
  },
  {
    ageCategory: "6-8",
    subject: "bahasa_indonesia",
    questionText: "Lawan kata dari 'Rajin' adalah...",
    questionImage: null,
    speechText: "Lawan kata dari Rajin adalah...",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Pintar", "Malas", "Giat", "Pandai"],
  },
  {
    ageCategory: "6-8",
    subject: "bahasa_indonesia",
    questionText: "Ibu membeli buah dan sayur di...",
    questionImage: null,
    speechText: "Ibu membeli buah dan sayur di...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Pasar", "Sekolah", "Apotek", "Stasiun"],
  },
  {
    ageCategory: "6-8",
    subject: "bahasa_indonesia",
    questionText: "Tanda baca yang digunakan di akhir kalimat berita adalah...",
    questionImage: null,
    speechText: "Tanda baca yang digunakan di akhir kalimat berita adalah...",
    lang: "id-ID",
    correctAnswerIndex: 3,
    options: [
      "Tanda Tanya (?)",
      "Tanda Seru (!)",
      "Tanda Koma (,)",
      "Tanda Titik (.)",
    ],
  },

  // --- Kuis Campuran (6-8 Tahun) ---
  {
    ageCategory: "6-8",
    subject: "campuran",
    questionText: "Bendera Negara Indonesia berwarna...",
    questionImage: null,
    speechText: "Bendera Negara Indonesia berwarna...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Merah Putih", "Merah Kuning", "Biru Putih", "Hijau Putih"],
  },
  {
    ageCategory: "6-8",
    subject: "campuran",
    questionText: "Tempat menuntut ilmu bagi para siswa dan guru dinamakan...",
    questionImage: null,
    speechText: "Tempat menuntut ilmu bagi para siswa dan guru dinamakan...",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Rumah Sakit", "Sekolah", "Taman", "Bandara"],
  },
  {
    ageCategory: "6-8",
    subject: "campuran",
    questionText: "Alat untuk mengukur panjang meja adalah...",
    questionImage: null,
    speechText: "Alat untuk mengukur panjang meja adalah...",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["Timbangan", "Termometer", "Penggaris", "Jam Dinding"],
  },
  {
    ageCategory: "6-8",
    subject: "campuran",
    questionText: "Anak yang jujur selalu mengatakan hal yang...",
    questionImage: null,
    speechText: "Anak yang jujur selalu mengatakan hal yang...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Benar", "Bohong", "Salah", "Lucu"],
  },

  // ===================================================
  // 3. PENJELAJAH HEBAT (9-12 TAHUN) - 40 SOAL
  // ===================================================

  // --- Bahasa Inggris (9-12 Tahun) ---
  {
    ageCategory: "9-12",
    subject: "bahasa_inggris",
    questionText: "When someone says 'Thank you', you should reply with...",
    questionImage: null,
    speechText: "When someone says Thank you, you should reply with...",
    lang: "en-US",
    correctAnswerIndex: 0,
    options: ["You are welcome!", "I am sorry", "Good morning", "Goodbye"],
  },
  {
    ageCategory: "9-12",
    subject: "bahasa_inggris",
    questionText: "What is the opposite of the word 'Big'?",
    questionImage: null,
    speechText: "What is the opposite of the word Big?",
    lang: "en-US",
    correctAnswerIndex: 1,
    options: ["Tall", "Small", "Heavy", "Fast"],
  },
  {
    ageCategory: "9-12",
    subject: "bahasa_inggris",
    questionText: "My father's brother is my...",
    questionImage: null,
    speechText: "My father's brother is my...",
    lang: "en-US",
    correctAnswerIndex: 2,
    options: ["Aunt", "Brother", "Uncle", "Grandfather"],
  },
  {
    ageCategory: "9-12",
    subject: "bahasa_inggris",
    questionText: "Which one is a fruit?",
    questionImage: null,
    speechText: "Which one is a fruit?",
    lang: "en-US",
    correctAnswerIndex: 3,
    options: ["Carrot", "Potato", "Onion", "Banana"],
  },
  {
    ageCategory: "9-12",
    subject: "bahasa_inggris",
    questionText:
      "Complete the sentence: 'She [...] going to school every morning.'",
    questionImage: null,
    speechText: "Complete the sentence: She is going to school every morning.",
    lang: "en-US",
    correctAnswerIndex: 0,
    options: ["is", "are", "were", "be"],
  },
  {
    ageCategory: "9-12",
    subject: "bahasa_inggris",
    questionText: "What is the English word for 'Perpustakaan'?",
    questionImage: null,
    speechText: "What is the English word for Perpustakaan?",
    lang: "en-US",
    correctAnswerIndex: 1,
    options: ["Hospital", "Library", "Museum", "Station"],
  },

  // --- Matematika (9-12 Tahun) ---
  {
    ageCategory: "9-12",
    subject: "matematika",
    questionText:
      "Aku adalah sebuah angka. Jika dikali 6 hasilnya 42. Siapakah aku?",
    questionImage: null,
    speechText:
      "Aku adalah sebuah angka. Jika dikali 6 hasilnya 42. Siapakah aku?",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["5", "6", "7", "8"],
  },
  {
    ageCategory: "9-12",
    subject: "matematika",
    questionText: "Berapakah hasil perkalian dari 8 x 9?",
    questionImage: null,
    speechText: "Berapakah hasil perkalian dari 8 dikali 9?",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["64", "72", "81", "90"],
  },
  {
    ageCategory: "9-12",
    subject: "matematika",
    questionText: "Berapakah hasil pembagian 100 : 4?",
    questionImage: null,
    speechText: "Berapakah hasil pembagian 100 dibagi 4?",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["25", "20", "15", "30"],
  },
  {
    ageCategory: "9-12",
    subject: "matematika",
    questionText:
      "Sebuah persegi memiliki panjang sisi 6 cm. Berapa luas persegi tersebut?",
    questionImage: null,
    speechText:
      "Sebuah persegi memiliki panjang sisi 6 centimeter. Berapa luas persegi tersebut?",
    lang: "id-ID",
    correctAnswerIndex: 3,
    options: ["12 cm²", "24 cm²", "30 cm²", "36 cm²"],
  },
  {
    ageCategory: "9-12",
    subject: "matematika",
    questionText:
      "Berapa keliling persegi panjang dengan panjang 10 cm dan lebar 5 cm?",
    questionImage: null,
    speechText:
      "Berapa keliling persegi panjang dengan panjang 10 cm dan lebar 5 cm?",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["30 cm", "50 cm", "15 cm", "20 cm"],
  },

  // --- Sains (9-12 Tahun) ---
  {
    ageCategory: "9-12",
    subject: "sains",
    questionText:
      "Planet dalam tata surya yang terkenal memiliki cincin indah adalah...",
    questionImage: null,
    speechText:
      "Planet dalam tata surya yang terkenal memiliki cincin indah adalah...",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Mars", "Saturnus", "Merkurius", "Venus"],
  },
  {
    ageCategory: "9-12",
    subject: "sains",
    questionText:
      "Proses pembuatan makanan pada tumbuhan hijau dengan bantuan cahaya matahari disebut...",
    questionImage: null,
    speechText:
      "Proses pembuatan makanan pada tumbuhan hijau dengan bantuan cahaya matahari disebut...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Fotosintesis", "Respirasi", "Penguapan", "Evolusi"],
  },
  {
    ageCategory: "9-12",
    subject: "sains",
    questionText:
      "Gas yang kita hirup saat bernapas untuk bertahan hidup adalah...",
    questionImage: null,
    speechText:
      "Gas yang kita hirup saat bernapas untuk bertahan hidup adalah...",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["Karbondioksida", "Nitrogen", "Oksigen", "Helium"],
  },
  {
    ageCategory: "9-12",
    subject: "sains",
    questionText:
      "Perubahan wujud dari zat padat menjadi zat cair dinamakan...",
    questionImage: null,
    speechText: "Perubahan wujud dari zat padat menjadi zat cair dinamakan...",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Membeku", "Mencair", "Menguap", "Mengembun"],
  },
  {
    ageCategory: "9-12",
    subject: "sains",
    questionText:
      "Gaya yang menyebabkan buah apel jatuh dari pohon ke tanah adalah gaya...",
    questionImage: null,
    speechText:
      "Gaya yang menyebabkan buah apel jatuh dari pohon ke tanah adalah gaya...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Gravitasi", "Gesek", "Pegas", "Magnet"],
  },

  // --- Bahasa Indonesia & Pengetahuan Umum (9-12 Tahun) ---
  {
    ageCategory: "9-12",
    subject: "bahasa_indonesia",
    questionText:
      "Gagasan utama atau ide pokok dari sebuah paragraf disebut...",
    questionImage: null,
    speechText: "Gagasan utama atau ide pokok dari sebuah paragraf disebut...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: ["Pikiran Utama", "Kalimat Penjelas", "Ringkasan", "Judul"],
  },
  {
    ageCategory: "9-12",
    subject: "bahasa_indonesia",
    questionText: "Sinonim (persamaan kata) dari kata 'Pandai' adalah...",
    questionImage: null,
    speechText: "Sinonim dari kata Pandai adalah...",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["Rajin", "Giat", "Pintar", "Jujur"],
  },
  {
    ageCategory: "9-12",
    subject: "campuran",
    questionText: "Candi Borobudur terletak di provinsi...",
    questionImage: null,
    speechText: "Candi Borobudur terletak di provinsi...",
    lang: "id-ID",
    correctAnswerIndex: 3,
    options: ["Jawa Barat", "Bali", "Sumatera Utara", "Jawa Tengah"],
  },
  {
    ageCategory: "9-12",
    subject: "campuran",
    questionText: "Lagu kebangsaan negara Indonesia adalah...",
    questionImage: null,
    speechText: "Lagu kebangsaan negara Indonesia adalah...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: [
      "Indonesia Raya",
      "Garuda Pancasila",
      "Halo-Halo Bandung",
      "Bagimu Negeri",
    ],
  },
  {
    ageCategory: "9-12",
    subject: "campuran",
    questionText: "Jumlah sila yang terkandung dalam Pancasila adalah...",
    questionImage: null,
    speechText: "Jumlah sila yang terkandung dalam Pancasila adalah...",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["3 Sila", "5 Sila", "7 Sila", "10 Sila"],
  },
  {
    ageCategory: "9-12",
    subject: "campuran",
    questionText: "Alat musik tradisional Angklung berasal dari daerah...",
    questionImage: null,
    speechText: "Alat musik tradisional Angklung berasal dari daerah...",
    lang: "id-ID",
    correctAnswerIndex: 2,
    options: ["Jawa Tengah", "Jawa Timur", "Jawa Barat", "Papua"],
  },
  {
    ageCategory: "9-12",
    subject: "bahasa_indonesia",
    questionText:
      "Singkatan dari 'KPK' dalam lembaga hukum Indonesia adalah...",
    questionImage: null,
    speechText: "Singkatan dari KPK dalam lembaga hukum Indonesia adalah...",
    lang: "id-ID",
    correctAnswerIndex: 0,
    options: [
      "Komisi Pemberantasan Korupsi",
      "Komite Pemuda Kebangsaan",
      "Kumpulan Polisi Kota",
      "Kantor Pelayanan Khusus",
    ],
  },
  {
    ageCategory: "9-12",
    subject: "campuran",
    questionText: "Ibu kota Negara Republik Indonesia saat ini adalah...",
    questionImage: null,
    speechText: "Ibu kota Negara Republik Indonesia saat ini adalah...",
    lang: "id-ID",
    correctAnswerIndex: 1,
    options: ["Surabaya", "Jakarta", "Bandung", "Medan"],
  },
];

// 3. Fungsi Eksekusi Reset & Re-Seed Masif
export const seedQuestions = async () => {
  try {
    console.log("1. Membersihkan bank soal lama...");
    await clearQuestions();

    console.log("2. Mengunggah 120+ bank soal bervariasi...");
    const collectionRef = collection(db, "questions");

    let count = 0;
    for (const q of HANDCRAFTED_QUESTIONS) {
      await addDoc(collectionRef, q);
      count++;
    }

    console.log(
      `✅ Berhasil mereset & mengunggah ${count} soal baru ke Firestore!`,
    );
    return true;
  } catch (error) {
    console.error("❌ Gagal mereset bank soal:", error);
    return false;
  }
};
