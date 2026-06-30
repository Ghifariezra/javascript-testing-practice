# Spesifikasi Dokumentasi Test Case: Core Modules

Dokumen ini berisi spesifikasi pengujian unit (*unit testing*) untuk modul-modul inti yang terdapat pada berkas `src/core.js`. Pengujian ini menggunakan *framework* **Vitest** dan mencakup berbagai validasi data, struktur kelas, dan fungsi asinkronus.

---

## 1. Ringkasan Eksekusi Pengujian

| Komponen Sistem | Target Berkas Pengujian | Framework | Fokus Pengujian | Status |
| :--- | :--- | :--- | :--- | :--- |
| Core Business Logic | `tests/core.test.js` | Vitest | Validasi Tipe Data, Logika Kondisional, OOP (Stack), Asinkronus | Terintegrasi |

---

## 2. Matriks Detail Skenario Pengujian

### 2.1. Modul: `getCoupons`
Fungsi ini digunakan untuk mengambil daftar kupon yang tersedia dan memastikan setiap objek kupon memiliki struktur serta nilai yang terstandarisasi.

| ID Test Case | Deskripsi Skenario | Ekspektasi Output / Validasi |
| :--- | :--- | :--- |
| **TC-COUPON-001** | Mengembalikan array kupon yang berisi objek dengan properti `code` dan `discount`. | Tipe data `Array`, panjang `> 0`, memiliki kunci yang sesuai. |
| **TC-COUPON-002** | Memastikan nilai diskon (*discount*) berada pada rentang yang logis. | Nilai `discount` > 0 dan < 1. |
| **TC-COUPON-003** | Memastikan kode kupon dan nilai diskon tidak kosong (*falsy*). | Properti `code` dan `discount` bernilai *truthy*. |
| **TC-COUPON-004** | Memastikan tidak ada duplikasi pada kode kupon yang dikembalikan. | Ukuran `Set` dari kode sama dengan panjang array. |
| **TC-COUPON-005** | Memastikan nilai diskon memiliki tipe data yang benar. | Tipe data `discount` adalah `number`. |
| **TC-COUPON-006** | Memastikan kode kupon memiliki tipe data yang benar. | Tipe data `code` adalah `string`. |

---

### 2.2. Modul: `calculateDiscount`
Fungsi kalkulasi potongan harga berdasarkan kode promo yang dimasukkan pengguna.

| ID Test Case | Deskripsi Skenario | Input | Ekspektasi Output |
| :--- | :--- | :--- | :--- |
| **TC-DISC-001** | Menerapkan diskon 20% apabila menggunakan kode kupon "SAVE20". | `price`: 100, `code`: "SAVE20" | `80` |
| **TC-DISC-002** | Menangani kesalahan jika harga yang dimasukkan bukan angka. | `price`: "invalid", `code`: "SAVE20" | `"Invalid price"` |
| **TC-DISC-003** | Menangani kesalahan jika kode diskon bukan format string. | `price`: 100, `code`: 123 | `"Invalid discount code"` |
| **TC-DISC-004** | Mengembalikan harga normal jika kode diskon tidak dikenali. | `price`: 100, `code`: "INVALID_CODE" | `100` |

---

### 2.3. Modul: `validateUserInput`
Fungsi untuk memvalidasi kelayakan data pengguna saat registrasi atau pembaruan profil.

| ID Test Case | Deskripsi Skenario | Input | Ekspektasi Output |
| :--- | :--- | :--- | :--- |
| **TC-VUSER-001** | Berhasil memvalidasi input pengguna yang memenuhi syarat. | `user`: "validUser", `age`: 25 | `"Validation successful"` |
| **TC-VUSER-002** | Menolak *username* yang jumlah karakternya terlalu pendek. | `user`: "va", `age`: 25 | `"Invalid username"` |
| **TC-VUSER-003** | Menolak pengguna yang usianya berada di bawah batas minimum. | `user`: "validUser", `age`: 17 | `"Invalid age"` |

---

### 2.4. Modul: `isPriceInRange`
Fungsi utilitas untuk memeriksa apakah sebuah harga berada di antara batas minimum dan maksimum.

| ID Test Case | Deskripsi Skenario | Input | Ekspektasi Output |
| :--- | :--- | :--- | :--- |
| **TC-RANGE-001** | Mengembalikan `true` jika harga berada di dalam rentang. | `price`: 50, `min`: 30, `max`: 70 | `true` |
| **TC-RANGE-002** | Mengembalikan `false` jika harga melebihi batas rentang. | `price`: 100, `min`: 30, `max`: 70 | `false` |

---

### 2.5. Modul: `isValidUsername`
Fungsi validasi tunggal untuk memeriksa kecukupan panjang karakter nama pengguna.

| ID Test Case | Deskripsi Skenario | Input | Ekspektasi Output |
| :--- | :--- | :--- | :--- |
| **TC-USER-001** | Menerima *username* yang memenuhi batas karakter minimum. | `"validUser"` | `true` |
| **TC-USER-002** | Menolak *username* yang terpotong atau terlalu pendek. | `"va"` | `false` |

---

### 2.6. Modul: `canDrive`
Fungsi pengecekan kelayakan mengemudi berdasarkan usia dan regulasi negara setempat.

| ID Test Case | Deskripsi Skenario | Input | Ekspektasi Output |
| :--- | :--- | :--- | :--- |
| **TC-DRIVE-001** | Mengizinkan pengemudi dengan usia minimum yang sah di wilayah US. | `age`: 16, `country`: "US" | `true` |
| **TC-DRIVE-002** | Mengizinkan pengemudi dengan usia minimum yang sah di wilayah UK. | `age`: 17, `country`: "UK" | `true` |
| **TC-DRIVE-003** | Menolak pengemudi yang usianya di bawah batas sah wilayah US. | `age`: 15, `country`: "US" | `false` |
| **TC-DRIVE-004** | Menolak pengemudi yang usianya di bawah batas sah wilayah UK. | `age`: 16, `country`: "UK" | `false` |
| **TC-DRIVE-005** | Mengembalikan pesan kesalahan jika kode negara tidak didukung/dikenali. | `age`: 16, `country`: "INVALID" | `"Invalid country code"` |

---

### 2.7. Modul: `fetchData` (Asynchronous)
Fungsi asinkronus untuk mengambil data tiruan (mock data) dari sumber eksternal. Pengujian ini menggunakan siklus hidup `beforeAll` untuk mengambil data satu kali sebelum semua *assertion* dijalankan.

| ID Test Case | Deskripsi Skenario | Ekspektasi Output |
| :--- | :--- | :--- |
| **TC-FETCH-001** | Berhasil mengambil data tanpa *error* dan mengembalikan *array* berisi elemen. | Tipe data `Array`, panjang `> 0`. |
| **TC-FETCH-002** | Memastikan semua item di dalam data yang diambil adalah angka. | Setiap item bertipe `number`. |
| **TC-FETCH-003** | Memastikan nilai data yang dikembalikan sama persis dengan yang diharapkan. | Nilai cocok dengan `[1, 2, 3]`. |

---

### 2.8. Modul: `Stack` (Class OOP)
Pengujian struktur data antrean LIFO (*Last In, First Out*) melalui implementasi kelas.

| ID Test Case | Deskripsi Skenario | Langkah Pengujian | Ekspektasi Output |
| :--- | :--- | :--- | :--- |
| **TC-STACK-001** | Menambahkan (*push*) item baru ke dalam *stack*. | Lakukan `stack.push(1)` | Properti `items` mengandung angka `1`. |
| **TC-STACK-002** | Mengambil dan menghapus (*pop*) item teratas dari *stack*. | `push(1)`, `push(2)`, lalu `pop()` | Fungsi mengembalikan `2`. |
| **TC-STACK-003** | Melihat (*peek*) item teratas tanpa menghapusnya dari *stack*. | `push(1)`, `push(2)`, lalu `peek()` | Fungsi mengembalikan `2`. |
| **TC-STACK-004** | Memeriksa ketersediaan elemen untuk memvalidasi *stack* kosong. | Panggil `isEmpty()` sebelum dan sesudah `push(1)` | Mengembalikan `true` lalu `false`. |
| **TC-STACK-005** | Mengembalikan ukuran atau jumlah elemen di dalam *stack*. | Panggil `size()` lalu `push` 2 elemen. | Nilai awal `0`, menjadi `2`. |
| **TC-STACK-006** | Menghapus seluruh elemen (*clear*) di dalam *stack*. | `push` beberapa elemen, lalu `clear()` | `isEmpty()` mengembalikan `true`. |

---

### 2.9. Modul: `createProduct`
Fungsi pembuatan entitas produk dengan memvalidasi kelengkapan properti sebelum dipublikasikan.

| ID Test Case | Deskripsi Skenario | Input Object | Ekspektasi Output |
| :--- | :--- | :--- | :--- |
| **TC-PROD-001** | Berhasil membuat produk jika seluruh datanya valid. | `{ name: 'Product 1', price: 100 }` | `{ success: true, message: '...' }` |
| **TC-PROD-002** | Mengembalikan pesan kesalahan jika nama produk kosong. | `{ name: '', price: 100 }` | Error: `invalid_name` ("Name is missing") |
| **TC-PROD-003** | Mengembalikan pesan kesalahan jika harga produk bernilai nol. | `{ name: 'Product 1', price: 0 }` | Error: `invalid_price` ("Price is missing") |
| **TC-PROD-004** | Mengembalikan pesan kesalahan jika harga produk negatif. | `{ name: 'Product 1', price: -1 }` | Error: `invalid_price` ("Price is missing") |

---

### 2.10. Modul: `isStrongPassword`
Fungsi keamanan untuk memvalidasi kekuatan kata sandi pengguna.

| ID Test Case | Deskripsi Skenario | Input | Ekspektasi Output |
| :--- | :--- | :--- | :--- |
| **TC-PASS-001** | Mengembalikan `false` jika kata sandi terdeteksi lemah. | `"weak"` | `false` |
| **TC-PASS-002** | Mengembalikan `true` jika kata sandi memenuhi kriteria kuat. | `"Str0ngP@ssw0rd"` | `true` |

---

## 3. Struktur Pemetaan Berkas Implementasi Kode

```javascript
import { describe, test, it, expect, beforeAll, afterAll } from "vitest";
import { calculateDiscount, canDrive, createProduct, fetchData, getCoupons, isPriceInRange, isStrongPassword, isValidUsername, Stack, validateUserInput } from "../src/core";

describe("Core Modules", () => {
    describe("getCoupons", () => { /* 6 Skenario Pengujian */ });
    describe("calculateDiscount", () => { /* 4 Skenario Pengujian */ });
    describe("validateUserInput", () => { /* 3 Skenario Pengujian */ });
    describe("isPriceInRange", () => { /* 2 Skenario Pengujian */ });
    describe("isValidUsername", () => { /* 2 Skenario Pengujian */ });
    describe("canDrive", () => { /* 5 Skenario Pengujian */ });
    describe("fetchData", () => { /* Siklus beforeAll & 3 Skenario Pengujian */ });
    describe("Stack", () => { /* 6 Skenario Pengujian Metode Class */ });
    describe("createProduct", () => { /* 4 Skenario Pengujian Validasi Object */ });
    describe("isStrongPassword", () => { /* 2 Skenario Pengujian String */ });
});
```