# Spesifikasi Dokumentasi Test Case: Mocking Modules

Dokumen ini berisi spesifikasi pengujian unit (*unit testing*) untuk modul-modul yang berada pada berkas `src/mocking.js`. Pengujian ini sangat bergantung pada teknik **Mocking** dan **Spying** menggunakan Vitest (`vi.mock`, `vi.spyOn`) untuk mengisolasi logika fungsi dari dependensi eksternal (seperti API pembayaran, pengiriman email, dan fungsi utilitas lainnya).

---

## 1. Ringkasan Eksekusi Pengujian

| Komponen Sistem | Target Berkas Pengujian | Framework | Fokus Pengujian | Status |
| :--- | :--- | :--- | :--- | :--- |
| Mocking & Dependencies | `tests/mocking.test.js` | Vitest | Fungsi Eksternal, Isolasi Modul, *Spies*, dan *Stubs* | Terintegrasi |

---

## 2. Matriks Detail Skenario Pengujian

### 2.1. Modul: `getPriceInCurrency`
Fungsi ini mengubah harga (*price*) ke dalam mata uang target dengan memanggil dependensi eksternal `getExchangeRate` dari modul `currency`.

| ID Test Case | Deskripsi Skenario | Skenario Mock (Arrange) | Input | Ekspektasi Output / Validasi (Assert) |
| :--- | :--- | :--- | :--- | :--- |
| **TC-MOCK-PRC-01** | Menghitung konversi harga dengan *exchange rate* yang sesuai. | `getExchangeRate` mengembalikan `1.5` | `price: 10`, `currency: 'AUD'` | Mengembalikan `15`. Memanggil `getExchangeRate` dengan ('USD', 'AUD') sebanyak 1 kali. |
| **TC-MOCK-PRC-02** | Menghitung harga saat nilai dasar adalah `0`. | `getExchangeRate` mengembalikan `0.9` | `price: 0`, `currency: 'EUR'` | Mengembalikan `0`. Memastikan *mock* tetap dipanggil. |
| **TC-MOCK-PRC-03** | Mengembalikan harga asli tanpa perubahan jika mata uang target sama ('USD'). | `getExchangeRate` mengembalikan `1` | `price: 50`, `currency: 'USD'` | Mengembalikan `50`. Memanggil *mock* dengan ('USD', 'USD'). |

---

### 2.2. Modul: `getShippingInfo`
Fungsi ini memanggil dependensi `getShippingQuote` dari modul `shipping` untuk mendapatkan data biaya dan waktu pengiriman.

| ID Test Case | Deskripsi Skenario | Skenario Mock (Arrange) | Input | Ekspektasi Output / Validasi (Assert) |
| :--- | :--- | :--- | :--- | :--- |
| **TC-MOCK-SHIP-01** | Mengembalikan string format info pengiriman yang valid. | `getShippingQuote` mengembalikan `{ cost: 20, estimatedDays: 5 }` | `destination: 'New York'` | `"Shipping Cost: $20 (5 Days)"`. Memastikan *mock* dipanggil dengan 'New York'. |
| **TC-MOCK-SHIP-02** | Menangani kondisi rute pengiriman yang tidak tersedia. | `getShippingQuote` mengembalikan `null` | `destination: 'Invalid City'` | `"Shipping Unavailable"`. |

---

### 2.3. Modul: `renderPage`
Fungsi ini merender halaman HTML dan secara asinkronus mencatat analitik halaman menggunakan dependensi `trackPageView` dari modul `analytics`. 
*> Catatan: Terdapat kasus uji spesifik yang diatur agar secara sengaja gagal (`it.fails`).*

| ID Test Case | Deskripsi Skenario | Fokus Validasi | Ekspektasi Output / Hasil Uji |
| :--- | :--- | :--- | :--- |
| **TC-MOCK-RNDR-01** | Memastikan analitik halaman dipanggil dengan jalur (*path*) yang benar. | *Tracking* Halaman | `trackPageView` dipanggil dengan argumen `'/home'`. |
| **TC-MOCK-RNDR-02** | Memastikan fungsi merender elemen HTML yang benar. | *Return Value* | Mengembalikan string `'<div>content</div>'`. |
| **TC-MOCK-RNDR-03** | **[EXPECTED FAIL]** Memastikan perhitungan pemanggilan analitik salah. | *Fail Test Case* | Sistem mengharapkan pemanggilan 5 kali (*sengaja gagal*). |
| **TC-MOCK-RNDR-04** | **[EXPECTED FAIL]** Memastikan render HTML tidak sesuai dengan yang salah. | *Fail Test Case* | Sistem mengharapkan `'<div>wrong content</div>'` (*sengaja gagal*). |

---

### 2.4. Modul: `submitOrder`
Fungsi memproses pesanan dan melakukan penagihan kartu kredit menggunakan fungsi asinkronus `charge` dari modul `payment`.

| ID Test Case | Deskripsi Skenario | Skenario Mock (Arrange) | Ekspektasi Output / Validasi (Assert) |
| :--- | :--- | :--- | :--- |
| **TC-MOCK-ORDR-01** | Mengembalikan status sukses ketika API pembayaran berhasil. | `charge` *resolve* dengan `{ status: 'success' }` | Mengembalikan `{ success: true }`. Memastikan `charge` dipanggil dengan data kartu & jumlah total. |
| **TC-MOCK-ORDR-02** | Mengembalikan status gagal beserta error jika API pembayaran menolak kartu. | `charge` *resolve* dengan `{ status: 'failed' }` | Mengembalikan `{ success: false, error: 'payment_error' }`. |

---

### 2.5. Modul: `signUp`
Fungsi pendaftaran yang memvalidasi email dan mengirimkan email sambutan melalui fungsi `sendEmail` dari modul `email`.

| ID Test Case | Deskripsi Skenario | Input Email | Ekspektasi Output / Validasi (Assert) |
| :--- | :--- | :--- | :--- |
| **TC-MOCK-SIGN-01** | Mencegah pendaftaran dan tidak memicu pengiriman email jika format salah. | `'bukan-format-email-yang-benar'` | Mengembalikan `false`. Fungsi mock `sendEmail` **TIDAK** dipanggil. |
| **TC-MOCK-SIGN-02** | Berhasil mendaftarkan pengguna dan memicu pengiriman email. | `'budi@example.com'` | Mengembalikan `true`. Fungsi mock `sendEmail` dipanggil 1 kali dengan pesan "Welcome aboard!". |

---

### 2.6. Modul: `login`
Fungsi autentikasi yang menghasilkan kode OTP keamanan dengan memanggil *method* dari objek eksternal (menggunakan `vi.spyOn`), lalu mengirimkannya melalui `sendEmail`.

| ID Test Case | Deskripsi Skenario | Setup Spy & Mock | Ekspektasi Output / Validasi (Assert) |
| :--- | :--- | :--- | :--- |
| **TC-MOCK-LGIN-01** | Memastikan kode keamanan digenerasi dan dikirim ke email pengguna. | `vi.spyOn(security, 'generateCode')` mengembalikan `123456` | `sendEmail` dipanggil dengan argumen email dan string `'123456'`. Fungsi *spy* dipanggil 1 kali. |

---

### 2.7. TODO / Modul Terencana
Pengujian berikut telah dideklarasikan dalam kode namun belum diimplementasikan (menggunakan fitur `describe.todo`).

| Modul | ID Test Case | Deskripsi Rencana Pengujian (TODO) | Target Logika |
| :--- | :--- | :--- | :--- |
| `isOnline` | **TC-TODO-ONL-01** | Harus mengembalikan `true` jika jam saat ini antara pukul 8 hingga 20. | Logika Sistem Waktu (*Time/Date Mocking*) |
| `isOnline` | **TC-TODO-ONL-02** | Harus mengembalikan `false` jika jam saat ini tidak berada di rentang 8 hingga 20. | Logika Sistem Waktu (*Time/Date Mocking*) |
| `getDiscount` | **TC-TODO-DSC-01** | Harus mengembalikan `0` jika tanggal saat ini bukan akhir pekan (*weekend*). | Logika Kalender (*Date Mocking*) |
| `getDiscount` | **TC-TODO-DSC-02** | Harus mengembalikan `0.2` (20%) jika tanggal saat ini adalah akhir pekan. | Logika Kalender (*Date Mocking*) |

---

## 3. Struktur Pemetaan Berkas Implementasi Kode

```javascript
import { describe, it, expect, vi, afterEach } from 'vitest';
// ... imports

// Setup Global Mocks
vi.mock(import('../src/libs/currency.js'), () => ({ /* ... */ }));
vi.mock(import('../src/libs/shipping.js'), () => ({ /* ... */ }));
vi.mock(import('../src/libs/analytics.js'), async () => ({ /* ... */ }));
vi.mock(import('../src/libs/payment.js'), async () => ({ /* ... */ }));
vi.mock(import('../src/libs/email.js'), async (importOriginal) => { /* ... */ });

describe("Mocking Modules", () => {
    describe('getPriceInCurrency', () => { /* 3 Skenario, penggunaan vi.mocked */ });
    describe('getShippingInfo', () => { /* 2 Skenario */ });
    describe('renderPage', () => { /* 4 Skenario (2 Valid, 2 .fails) */ });
    describe('submitOrder', () => { /* 2 Skenario untuk asynchronous mockResolvedValue */ });
    describe('signUp', () => { /* 2 Skenario pengujian not.toHaveBeenCalled & toHaveBeenCalledWith */ });
    describe('login', () => { /* 1 Skenario menggunakan vi.spyOn pada object methods */ });
    describe.todo('isOnline', () => { /* Rencana 2 Skenario Pengujian Waktu */ });
    describe.todo('getDiscount', () => { /* Rencana 2 Skenario Pengujian Kalender */ });
});
```