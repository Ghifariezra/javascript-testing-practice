# 🧪 JavaScript Unit Testing Practice

Sebuah repositori untuk melatih dan mendalami konsep *Unit Testing* pada JavaScript. *Codebase* awal (starter) pada repositori ini diadaptasi dari materi *JavaScript Testing* oleh Mosh Hamedani, yang kemudian saya kembangkan sebagai ruang latihan mandiri untuk menguasai pengujian perangkat lunak dan integrasi CI/CD.

## 📌 Tujuan Pembelajaran & Latihan

Repositori ini difokuskan pada praktik langsung untuk skenario pengujian dunia nyata, meliputi:

* **Fundamental Unit Testing:** Memahami pentingnya pengujian yang bersih, dapat dikelola, dan dapat dipercaya dalam ekosistem JavaScript.
* **Vitest Mastery:** Konfigurasi dan penggunaan Vitest sebagai *test runner* modern yang cepat.
* **Matchers & Assertions:** Menggunakan *matchers* untuk membuat asersi yang presisi.
* **Test Scenarios:** Melatih teknik pengujian *positive*, *negative*, dan *boundary* (nilai batas) untuk menjangkau berbagai *edge cases*.
* **Mocking Dependencies:** Mengisolasi fungsi yang diuji dengan melakukan *mocking* pada dependensi eksternal (seperti modul `libs/`, API, *database*, dsb).
* **CI/CD Automation:** Mengotomatiskan proses *testing* setiap kali ada *push* atau *Pull Request* menggunakan **GitHub Actions**.

## 📂 Dokumentasi Skenario Uji (Test Cases)

Selain kode sumber, repositori ini juga memuat spesifikasi dan dokumentasi skenario uji lengkap dengan pendekatan arsitektur AAA (*Arrange, Act, Assert*). Seluruh rekapitulasi pengujian terdokumentasi di dalam direktori `docs/`:

* 📄 [`TESTCASE_INTRO.md`](./docs/TESTCASE_INTRO.md) — Spesifikasi pengujian untuk fungsi-fungsi dasar dan utilitas matematika (`src/intro.js`).
* 📄 [`TESTCASE_CORE.md`](./docs/TESTCASE_CORE.md) — Spesifikasi pengujian logika inti bisnis, *asynchronous data fetching*, struktur data *Stack* (OOP), dan validasi objek (`src/core.js`).
* 📄 [`TESTCASE_MOCKING.md`](./docs/TESTCASE_MOCKING.md) — Spesifikasi pengujian tingkat lanjut yang melibatkan *mocking* dan *spying* pada dependensi modul eksternal (`src/mocking.js`).

## 📁 Struktur Direktori

```text
.
├── .github/          # Konfigurasi workflow CI/CD (GitHub Actions)
├── docs/             # Dokumentasi spesifikasi Test Case
├── src/              # Source code utama (intro, core, mocking)
│   └── libs/         # Modul dependensi eksternal (analytics, payment, dll)
├── tests/            # Berkas pengujian unit (vitest)
├── package.json      # Konfigurasi dependensi project & NPM scripts
└── README.md         # Dokumentasi repositori utama
```

## 🚀 Cara Menjalankan Project

### 1. Instalasi
Pastikan kamu sudah menginstal Node.js di sistemmu. Clone repositori ini dan jalankan perintah berikut untuk menginstal semua dependensi:

```bash
npm install
```

### 2. Pengujian
Untuk menjalankan pengujian, jalankan perintah berikut:

```bash
npm run test
```

### 3. CI/CD
Repositori ini sudah dilengkapi dengan GitHub Actions. Setiap kode yang di-push ke branch main akan secara otomatis memicu workflow untuk menjalankan environment Node.js, menginstal dependensi, dan menjalankan seluruh test suite untuk memastikan tidak ada kode yang error.

---

### 📚 Referensi & Sumber Pembelajaran
Starter codebase dan dasar materi untuk latihan di repositori ini berasal dari:
- Video Tutorial: [JavaScript Unit Testing Tutorial for Beginners](https://youtu.be/zuKbR4Q428o?si=-vrg5qYhOpXuar2d)
- Original Codebase: [Mosh Hamedani](https://github.com/mosh-hamedani/javascript-testing-starter)