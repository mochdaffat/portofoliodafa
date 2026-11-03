# 🚀 Portofolio Diri Modern & Responsif

Portofolio web pribadi profesional yang dibangun menggunakan **HTML5, CSS3, dan Vanilla JavaScript murni** (tanpa framework berat), dirancang untuk tampil memukau dan berfungsi sempurna di berbagai ukuran layar: **Handphone (Mobile), Tablet, Laptop, hingga Monitor Desktop**.

---

## ✨ Fitur Utama

- 📱 **100% Responsif**: Tata letak fleksibel dengan CSS Grid, Flexbox, dan media queries khusus untuk handphone, tablet, dan laptop.
- 🌓 **Dark & Light Mode**: Dilengkapi sakelar pergantian tema gelap dan terang dengan penyimpanan otomatis ke `localStorage`.
- ⌨️ **Animasi Mengetik Interaktif**: Efek mesin tik (*typing effect*) pada judul peran di bagian Beranda (Hero).
- 🧭 **Navigasi Cerdas (Scroll Spy & Hamburger)**:
  - Menu navigasi mobile *drawer* yang halus.
  - Penyorotan menu otomatis saat halaman digulir (*active scroll spy*).
  - *Navbar* dengan efek *glassmorphism* dan bayangan saat digulir.
- 📊 **Animasi Bar Keahlian & Counter Statistik**: Angka statistik dan persentase keahlian bergerak dinamis saat digulir ke layar (*IntersectionObserver*).
- 💼 **Penyaring Portofolio (Filter Tab)**: Filter proyek berdasarkan kategori (Semua, Web App, Responsive & Landing, UI/UX Design).
- 🔍 **Modal Detail Proyek**: Jendela *pop-up preview* interaktif untuk setiap proyek dengan detail fitur, tombol demo langsung, dan kode sumber.
- ✉️ **Formulir Kontak Terintegrasi**: Validasi input formulir di sisi klien dengan notifikasi *toast* yang modern.
- 💬 **Aksi Cepat WhatsApp**: Tombol melayang (*floating button*) langsung menuju chat WhatsApp dengan pesan kustom.
- ⬆️ **Tombol Kembali ke Atas (Back to Top)**: Tombol melayang yang muncul otomatis saat halaman digulir ke bawah.

---

## 📁 Struktur Berkas

```
project1/
│
├── index.html       # Struktur utama halaman web (HTML5 Semantik)
├── style.css        # Seluruh styling, CSS Variables, animasi, dan responsivitas
├── script.js        # Logika interaktif, dark mode, filter proyek, animasi, dan modal
└── README.md        # Panduan penggunaan dan kustomisasi
```

---

## 🚀 Cara Menjalankan

### Cara 1: Langsung Buka di Browser (Paling Mudah)
Cukup klik dua kali berkas `index.html` di File Explorer Anda, atau klik kanan lalu pilih **Open with > Google Chrome** (atau browser pilihan Anda).

### Cara 2: Menggunakan VS Code Live Server (Direkomendasikan untuk Pengembangan)
1. Buka folder ini di Visual Studio Code.
2. Pasang ekstensi **Live Server**.
3. Klik kanan pada berkas `index.html` dan pilih **Open with Live Server**.
4. Website akan terbuka di `http://127.0.0.1:5500/`.

---

## 🎨 Panduan Kustomisasi

Anda dapat menyesuaikan portofolio ini sesuai data diri Anda dengan sangat mudah:

### 1. Mengubah Nama & Deskripsi Diri
Buka [index.html](index.html):
- Cari teks `Mochamad Daffa T` dan ubah menjadi nama lengkap Anda.
- Cari judul logo `Daffa.dev` dan ubah menjadi inisial atau nama Anda.
- Pada bagian `<section class="hero">` dan `<section class="about">`, sesuaikan kalimat ringkasan dan profil diri Anda.

### 2. Mengubah Teks Animasi Mengetik
Buka [script.js](script.js):
- Cari array `roles` di baris sekitar 100:
  ```javascript
  const roles = [
    "Full-Stack Web Developer",
    "Frontend Engineer",
    "UI/UX Enthusiast",
    "Creative Problem Solver"
  ];
  ```
- Tambahkan atau ubah peran yang sesuai dengan keahlian Anda.

### 3. Mengganti Foto Profil / Avatar
Pada [index.html](index.html) bagian `.avatar-placeholder`:
```html
<!-- Ganti ikon dengan tag gambar foto Anda: -->
<div class="avatar-placeholder">
  <img src="foto-anda.jpg" alt="Foto Profil" />
</div>
```

### 4. Mengubah Nomor WhatsApp, Email & Media Sosial
- Email saat ini diatur ke `daffa@example.com` (silakan ubah jika ada email pribadi Anda).
- WhatsApp sudah diatur ke nomor Anda: `628122047831`.
- Instagram sudah diatur ke profil Anda: `https://instagram.com/mochdaffat_` (`@mochdaffat_`).

### 5. Menghubungkan Berkas CV (PDF)
1. Letakkan berkas CV Anda (misal `cv-saya.pdf`) ke dalam folder proyek ini.
2. Buka [index.html](index.html), cari tombol:
   ```html
   <a href="cv-saya.pdf" download class="btn btn-secondary btn-cv">
     <i class="fa-solid fa-download"></i>
     <span>Unduh CV</span>
   </a>
   ```

### 6. Menambah atau Mengubah Proyek Portofolio
- Di [index.html](index.html) pada bagian `<section class="projects">`, Anda dapat mengubah judul, deskripsi, teknologi (`<span class="tag">`), serta tautan GitHub dan demo.
- Di [script.js](script.js) pada bagian objek `projectDetails`, Anda dapat mengubah rincian fitur yang tampil di dalam modal *pop-up*.

---

## 🌐 Cara Mengunggah (Deploy) ke Internet Secara Gratis

Setelah selesai menyesuaikan data diri, Anda dapat mempublikasikan portofolio ini secara gratis ke internet menggunakan salah satu layanan berikut:

1. **GitHub Pages**:
   - Buat repositori baru di GitHub (misal `username.github.io`).
   - Unggah seluruh file (`index.html`, `style.css`, `script.js`).
   - Masuk ke **Settings > Pages** dan pilih branch `main`. Portofolio Anda langsung aktif secara gratis!
2. **Vercel / Netlify**:
   - Cukup *drag and drop* folder proyek ini ke dashboard [Netlify Drop](https://app.netlify.com/drop) atau tautkan repositori ke [Vercel](https://vercel.com).
   - Website langsung memiliki domain gratis ber-SSL (HTTPS).

