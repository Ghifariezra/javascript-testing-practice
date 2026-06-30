# Spesifikasi Dokumentasi Test Case: Intro Modules

Dokumen ini berisi spesifikasi pengujian unit (*unit testing*) untuk modul-modul dasar yang terdapat pada berkas `src/intro.js`. Seluruh skenario pengujian diimplementasikan menggunakan *framework* **Vitest** dan mengikuti pendekatan struktur **AAA (Arrange, Act, Assert)**.

---

## 1. Ringkasan Eksekusi Pengujian

| Komponen Sistem | Target Berkas Pengujian | Framework | Pola Desain | Status |
| :--- | :--- | :--- | :--- | :--- |
| Core Utility | `tests/intro.test.js` | Vitest | AAA (Arrange-Act-Assert) | Terintegrasi |

---

## 2. Matriks Detail Skenario Pengujian

### 2.1. Modul: `max`
Fungsi ini digunakan untuk mengevaluasi dua buah argumen numerik dan mengembalikan nilai yang paling besar di antara keduanya. Jika kedua nilai bernilai sama, maka fungsi akan mengembalikan nilai argumen pertama.

#### Tabel Kasus Uji `max`
| ID Test Case | Deskripsi Skenario | Langkah Pengujian (AAA) | Ekspektasi Output |
| :--- | :--- | :--- | :--- |
| **TC-MAX-001** | Mengembalikan argumen pertama jika nilainya terbukti lebih besar dari argumen kedua. | **Arrange:** `a = 2`, `b = 1`<br>**Act:** `max(a, b)`<br>**Assert:** `expect(result).toBe(2)` | `2` |
| **TC-MAX-002** | Mengembalikan argumen kedua jika nilainya terbukti lebih besar dari argumen pertama. | **Arrange:** `a = 1`, `b = 2`<br>**Act:** `max(a, b)`<br>**Assert:** `expect(result).toBe(2)` | `2` |
| **TC-MAX-003** | Mengembalikan nilai argumen tersebut apabila kedua argumen bernilai sama persis. | **Arrange:** `a = 1`, `b = 1`<br>**Act:** `max(a, b)`<br>**Assert:** `expect(result).toBe(1)` | `1` |

---

### 2.2. Modul: `fizzBuzz`
Fungsi bersyarat yang mengevaluasi input angka tunggal dan mengembalikan representasi string numerik ("Fizz", "Buzz", "FizzBuzz") atau angka itu sendiri dalam bentuk string berdasarkan sifat keterbagiannya terhadap angka 3 dan 5.

#### Tabel Kasus Uji `fizzBuzz`
| ID Test Case | Deskripsi Skenario | Input | Ekspektasi Tipe Data | Ekspektasi Output |
| :--- | :--- | :--- | :--- | :--- |
| **TC-FB-001** | Mengembalikan string `"Fizz"` jika angka habis dibagi 3 secara mutlak. | `3` | `string` | `"Fizz"` |
| **TC-FB-002** | Mengembalikan string `"Buzz"` jika angka habis dibagi 5 secara mutlak. | `5` | `string` | `"Buzz"` |
| **TC-FB-003** | Mengembalikan string `"FizzBuzz"` jika angka habis dibagi oleh 3 sekaligus 5 (kelipatan 15). | `15` | `string` | `"FizzBuzz"` |
| **TC-FB-004** | Mengembalikan angka tersebut sebagai karakter string jika tidak habis dibagi 3 maupun 5. | `7` | `string` | `"7"` |

---

### 2.3. Modul: `calculateAverage`
Fungsi utilitas statistika untuk menghitung nilai rata-rata aritmatika dari sebuah himpunan angka di dalam *array*. Fungsi harus menangani kondisi pengecualian jika *array* kosong.

#### Tabel Kasus Uji `calculateAverage`
| ID Test Case | Deskripsi Skenario | Input (Array) | Ekspektasi Output | Catatan Validasi |
| :--- | :--- | :--- | :--- | :--- |
| **TC-AVG-001** | Menghitung total nilai secara akurat dari deretan angka yang valid lalu membaginya dengan panjang array. | `[1, 2, 3, 4, 5]` | `3` | Pengujian umum (*Happy Path*) |
| **TC-AVG-002** | Menghasilkan nilai `NaN` apabila array yang dimasukkan kosong (tidak memiliki elemen). | `[]` | `NaN` | Penanganan *Edge Case* pembagian dengan nol |

---

### 2.4. Modul: `calculateFactorial`
Fungsi matematika rekursif/iteratif untuk mencari nilai faktorial dari suatu bilangan bulat ($n!$). Fungsi ini juga membatasi input agar tidak memproses bilangan negatif.

#### Tabel Kasus Uji `calculateFactorial`
| ID Test Case | Deskripsi Skenario | Input ($n$) | Ekspektasi Output | Status Matematika |
| :--- | :--- | :--- | :--- | :--- |
| **TC-FACT-001** | Menghitung faktorial bilangan positif secara berantai (contoh: $5! = 5 \times 4 \times 3 \times 2 \times 1$). | `5` | `120` | Validasi Kalkulasi Standar |
| **TC-FACT-002** | Mengembalikan nilai `1` jika input yang dimasukkan adalah angka `0`. | `0` | `1` | Definisi Kombinatorika $0! = 1$ |
| **TC-FACT-003** | Mengembalikan nilai `1` jika input yang dimasukkan adalah angka `1`. | `1` | `1` | Definisi Dasar $1! = 1$ |
| **TC-FACT-004** | Mengembalikan `undefined` jika input berupa bilangan bulat negatif. | `-1` | `undefined` | Batasan Logika Aplikasi (*Error Handling*) |

---

## 3. Struktur Pemetaan Berkas Implementasi Kode

Berikut adalah struktur representasi bagaimana test suite dituliskan di dalam kode sumber JavaScript:

```javascript
import { describe, test, it, expect } from "vitest";
import { calculateAverage, calculateFactorial, fizzBuzz, max } from "../src/intro";

describe("Intro Modules", () => {
    describe("Max", () => {
        it("should return the first argument if it is greater", () => { /* ... */ });
        it("should return the second argument if it is greater", () => { /* ... */ });
        it("should return the first argument if both are equal", () => { /* ... */ });
    });

    describe("FizzBuzz", () => {
        it("should return 'Fizz' if the number is divisible by 3", () => { /* ... */ });
        it("should return 'Buzz' if the number is divisible by 5", () => { /* ... */ });
        it("should return 'FizzBuzz' if the number is divisible by both 3 and 5", () => { /* ... */ });
        it("should return the number as a string if it is not divisible by 3 or 5", () => { /* ... */ });
    });

    describe("Calculate Average", () => {
        it("should return the average of an array of numbers", () => { /* ... */ });
        it("should return NaN if the array is empty", () => { /* ... */ });
    });

    describe("Factorial", () => {
        it("should return 120 if we calculate the factorial of a number", () => { /* ... */ });
        it("should return 1 if the number is 0", () => { /* ... */ });
        it("should return 1 if the number is 1", () => { /* ... */ });
        it("should return undefined if the number is negative", () => { /* ... */ });
    });
});
```