# PRD — Penyempurnaan Portofolio Fadhildianto

## 1. Ringkasan

Portofolio saat ini sudah memiliki fondasi yang baik: halaman statis yang ringan, desain visual konsisten, proyek dengan gambar, navigasi responsif, animasi masuk, dan tombol unduh CV. Tahap berikutnya adalah mengubahnya menjadi portofolio yang lebih kredibel untuk perekrut/klien, lebih mudah dieksplorasi, serta memiliki galeri sertifikat yang rapi dan dapat diverifikasi.

Produk tetap berupa situs statis GitHub Pages berbasis HTML, CSS, JavaScript, dan Vue dari CDN. Tidak diperlukan backend, akun pengguna, atau basis data.

## 2. Latar belakang dan temuan awal

### Kekuatan yang dipertahankan

- Visual light theme dengan aksen merah, tipografi Inter dan Space Grotesk, serta layout responsif.
- Konten proyek berbasis data di `index.js`, termasuk carousel untuk proyek Putra Printing.
- Interaksi yang sudah tersedia: scroll progress, active navigation, mobile navigation, reveal animation, carousel, dan back-to-top.
- Proyek utama menjelaskan konteks, kontribusi, teknologi, dan screenshot.

### Hal yang perlu diperbaiki

| Prioritas | Temuan | Dampak |
| --- | --- | --- |
| P0 | Tautan GitHub, LinkedIn, dan Instagram masih menggunakan `href="#"`. | Mengurangi kredibilitas dan membuat pengunjung tidak dapat memverifikasi profil. |
| P0 | Belum ada section sertifikat maupun bukti/verifikasi sertifikat. | Kompetensi formal tidak terlihat oleh perekrut. |
| P1 | Kartu proyek belum menyediakan detail hasil, peran, tantangan, dan bukti/link yang konsisten. | Nilai kontribusi personal kurang mudah dinilai. |
| P1 | Tidak ada pola `:focus-visible`, skip link, atau pengaturan pengurangan gerak. | Pengalaman keyboard dan aksesibilitas belum memadai. |
| P1 | Vue, Tailwind browser runtime, dan Google Fonts dimuat dari CDN tanpa strategi kegagalan/performa. | Waktu muat dan ketahanan halaman bergantung pada pihak ketiga. |
| P2 | Fungsi tilt terdapat di JavaScript tetapi belum dipakai pada markup. | Kode tidak terpakai; interaksi perlu diputuskan atau dibuang. |
| P2 | Marquee teknologi bergerak otomatis. | Berpotensi mengganggu pembaca dan perlu dapat dijeda/mengikuti reduced motion. |

## 3. Tujuan

1. Menyajikan identitas profesional, kontribusi, dan bukti kompetensi dalam 15–30 detik pertama kunjungan.
2. Memudahkan perekrut membuka CV, menghubungi pemilik, mengunjungi profil profesional, dan mengevaluasi proyek.
3. Menampilkan sertifikat secara visual, informatif, dan dapat diverifikasi tanpa membuat halaman berat.
4. Mempertahankan desain responsif, kecepatan, dan kemudahan pemeliharaan situs statis.

## 4. Non-tujuan

- Tidak membangun CMS, login, formulir kontak dengan penyimpanan data, atau backend.
- Tidak menjadikan semua animasi lebih banyak; interaksi hanya ditambahkan bila membantu eksplorasi atau bukti karya.
- Tidak mengubah identitas visual secara total kecuali ada keputusan desain lanjutan.

## 5. Pengguna utama dan kebutuhan

| Pengguna | Kebutuhan utama |
| --- | --- |
| Perekrut HR | Memahami profil, status, CV, sertifikat, dan cara menghubungi dengan cepat. |
| Hiring manager/klien | Menilai peran spesifik, teknologi, keputusan, dan hasil proyek. |
| Pemilik situs | Menambah proyek/sertifikat tanpa mengubah banyak markup atau logika. |

## 6. Arsitektur informasi target

Urutan desktop dan mobile:

1. Hero: positioning profesional, CTA proyek, CTA kontak/CV, tautan sosial valid.
2. Tentang saya: ringkasan kompetensi dan value proposition.
3. Proyek unggulan: filter, kartu ringkas, lalu modal/detail proyek.
4. Keahlian & teknologi.
5. Pengalaman.
6. Pendidikan.
7. **Sertifikat & pelatihan** (baru).
8. Kontak dan footer.

Navigasi utama perlu memuat `Sertifikat`; penomoran section setelahnya disesuaikan agar konsisten.

## 7. Kebutuhan fungsional

### 7.1 Identitas dan konversi

- Semua URL sosial di hero dan kontak diambil dari satu objek `profileLinks` di `index.js`; tidak boleh ada tautan `#` untuk profil publik.
- Hero menyediakan CTA utama **Lihat Proyek** dan CTA sekunder **Unduh CV** atau **Hubungi Saya**.
- CTA dan tautan eksternal memakai label yang jelas, `target="_blank"` dan `rel="noopener noreferrer"` bila membuka tab baru.
- Meta description, Open Graph, Twitter Card, canonical URL, favicon, dan structured data `Person` diperbarui menggunakan URL domain produksi dan profil aktual.

### 7.2 Proyek

- Tambahkan filter kategori (contoh: Semua, Sistem Informasi, Web, Visualisasi) yang bekerja dengan keyboard dan memiliki status filter aktif yang terlihat.
- Setiap proyek memiliki data minimum: `title`, `year`, `category`, `role`, `summary`, `problem`, `contribution`, `stack`, `outcome`, `image`, `alt`, serta tautan demo/repository bila dapat dipublikasikan.
- Tombol **Lihat studi kasus** membuka modal dialog yang dapat ditutup dengan tombol, klik overlay, dan `Escape`; fokus keyboard kembali ke pemicu saat modal ditutup.
- Bila demo/repository bersifat privat, tampilkan status jujur, misalnya “Proyek institusi — demo publik tidak tersedia”, bukan link kosong.
- Carousel gambar tetap hanya untuk proyek yang memiliki lebih dari satu gambar; dukung tombol previous/next, indikator, label aksesibel, dan hentikan autoplay saat pengguna berinteraksi.

### 7.3 Sertifikat & pelatihan (baru)

#### Tujuan section

Memperlihatkan bukti pembelajaran dan kompetensi secara ringkas; pengunjung dapat melihat preview dan membuka sertifikat/verifikasi secara sadar.

#### Tampilan

- Judul: **Sertifikat & Pelatihan**; deskripsi singkat mengenai pembelajaran berkelanjutan.
- Grid 1 kolom di mobile, 2 kolom tablet, 3 kolom desktop.
- Kartu memuat thumbnail rasio konsisten, nama sertifikat, penerbit, bulan/tahun, kategori, dan tag keterampilan.
- Filter kategori (misalnya Semua, Pengembangan Web, Data, Desain, Soft Skill) hanya ditampilkan bila data minimal dua kategori.
- Kartu memiliki aksi **Lihat sertifikat** dan, bila tersedia, **Verifikasi kredensial**.
- Klik preview membuka modal/lightbox dengan gambar resolusi lebih besar atau PDF; tersedia nama sertifikat, penerbit, tanggal terbit, ID kredensial (jika ada), tombol verifikasi, unduh, dan tutup.
- Sertifikat tidak ditampilkan bila belum memiliki nama, penerbit, tanggal, thumbnail, serta file atau URL verifikasi yang benar.

#### Model data

Sertifikat dikelola dalam array `certificates` pada `index.js` agar penambahan cukup dengan satu objek:

```js
{
  id: 'dicoding-web-dasar-2026',
  title: 'Belajar Dasar Pemrograman Web',
  issuer: 'Dicoding Indonesia',
  issuedAt: '2026-01',
  expiresAt: null,
  category: 'Pengembangan Web',
  skills: ['HTML', 'CSS', 'JavaScript'],
  credentialId: 'ISI-JIKA-ADA',
  thumbnail: './assets/images/certificates/dicoding-web-dasar.webp',
  documentUrl: './assets/docs/certificates/dicoding-web-dasar.pdf',
  verificationUrl: 'https://…',
  alt: 'Sertifikat Belajar Dasar Pemrograman Web dari Dicoding Indonesia'
}
```

Ketentuan aset:

- Thumbnail menggunakan WebP/AVIF jika memungkinkan, lebar target 800–1200 px, dan `loading="lazy"` di luar viewport awal.
- Dokumen asli disimpan di `assets/docs/certificates/`; thumbnail di `assets/images/certificates/`.
- Jangan menyertakan nomor identitas, alamat, QR code sensitif, atau informasi privat lain yang tidak perlu. Redaksi dokumen sebelum publikasi bila dibutuhkan.

### 7.4 Interaksi dan aksesibilitas

- Tambahkan skip link menuju konten utama dan bungkus konten utama dalam elemen `<main>`.
- Semua kontrol interaktif dapat dioperasikan dengan keyboard, mempunyai nama aksesibel, indikator fokus yang jelas, dan target sentuh minimal 44 × 44 px.
- Terapkan `@media (prefers-reduced-motion: reduce)` untuk menonaktifkan/menyederhanakan typing, reveal, marquee, cursor glow, smooth scroll, dan carousel autoplay.
- Hormati preferensi pengguna: marquee dapat dihentikan dengan hover/focus dan tidak berjalan pada reduced motion.
- Dialog menerapkan `role="dialog"`, `aria-modal="true"`, judul terhubung, focus trap, dan penutupan dengan `Escape`.
- Pastikan kontras teks, chip, dan state aktif memenuhi WCAG AA minimal 4.5:1 untuk teks normal.

### 7.5 Performa dan ketahanan

- Semua gambar non-kritis memakai `loading="lazy"`, `decoding="async"`, ukuran intrinsik/aspect ratio untuk mencegah layout shift, serta alt yang deskriptif.
- Optimalkan screenshot proyek dan thumbnail sertifikat; gunakan varian responsif bila ukuran aset besar.
- Evaluasi penggantian Tailwind browser runtime dengan CSS hasil build atau stylesheet statis. Jika belum dilakukan, dokumentasikan ketergantungan CDN dan pin versi Vue/Tailwind.
- Beri `defer` pada script non-kritis bila urutan eksekusi tetap aman; pertahankan fallback yang informatif bila JavaScript gagal dimuat.
- Tidak ada error pada console, broken image, atau link kosong di produksi.

## 8. Panduan desain

- Pertahankan palet putih/slate dengan aksen merah agar kesinambungan visual terjaga.
- Gunakan animasi halus dan singkat; jangan gunakan efek 3D/tilt kecuali memberi nilai jelas dan lolos reduced-motion.
- Kartu sertifikat memakai hierarki yang lebih tenang daripada proyek agar tidak bersaing dengan karya unggulan.
- Gunakan bahasa Indonesia yang ringkas, berorientasi hasil, dan konsisten; istilah Inggris hanya untuk nama teknologi/kredensial.
- Foto profil aktual berkualitas baik direkomendasikan menggantikan `profile-placeholder.svg` sebelum rilis.

## 9. Konten yang harus disiapkan pemilik

| Item | Format/keterangan |
| --- | --- |
| URL GitHub, LinkedIn, Instagram (opsional) | URL profil final; sembunyikan ikon jika tidak digunakan. |
| Domain produksi | Untuk canonical, Open Graph, sitemap, dan structured data. |
| Foto profil | Potret profesional, crop persegi, minimal 800 × 800 px. |
| Materi proyek | Peran, masalah, kontribusi, hasil/angka bila aman dipublikasikan, tautan demo/repository, screenshot yang sudah disensor bila diperlukan. |
| Sertifikat | Nama, penerbit, tanggal, kategori, skill, ID/URL verifikasi, file PDF/gambar, dan thumbnail. |
| CV | PDF versi terbaru dan konsisten dengan isi portofolio. |

## 10. Tahapan implementasi

### Fase 1 — Kredibilitas dan fondasi (P0)

1. Isi/hapus tautan sosial placeholder dan perbarui CTA hero.
2. Tambahkan data `profileLinks`, metadata SEO sosial, dan `<main>`/skip link.
3. Siapkan struktur folder serta array data sertifikat.
4. Implementasikan section sertifikat, filter opsional, dan modal preview/verifikasi.

### Fase 2 — Bukti proyek dan interaksi (P1)

1. Tambahkan kategori, data studi kasus, dan modal proyek.
2. Perbaiki carousel agar dapat diakses dan dikendalikan pengguna.
3. Tambahkan state fokus, reduced motion, serta uji keyboard/dialog.

### Fase 3 — Optimasi rilis (P1/P2)

1. Kompres/konversi aset gambar, lazy loading, dan pengukuran layout shift.
2. Evaluasi pengurangan runtime CDN dan hapus kode tilt yang tidak digunakan atau implementasikan secara terukur.
3. Audit link, metadata, mobile layout, dan console sebelum deploy.

## 11. Kriteria penerimaan

- [ ] Navigation desktop/mobile memuat Sertifikat dan mengarah ke section yang benar.
- [ ] Minimal satu sertifikat tampil lengkap dengan thumbnail, penerbit, tanggal, dan aksi preview; data tambahan mudah ditambah dari `index.js`.
- [ ] Preview sertifikat dapat dibuka/ditutup menggunakan mouse dan keyboard; `Escape` menutup modal dan fokus kembali.
- [ ] Link verifikasi hanya muncul bila URL valid tersedia; link membuka tujuan yang benar dan aman.
- [ ] Tidak ada `href="#"`, link rusak, gambar rusak, atau error console.
- [ ] Proyek dapat difilter dan setiap detail tersedia tanpa menyembunyikan konteks kontribusi.
- [ ] Seluruh navigasi, filter, carousel, dan dialog dapat dioperasikan dengan Tab, Enter/Space, dan Escape bila relevan.
- [ ] Pada `prefers-reduced-motion`, animasi kontinu dan autoplay tidak berjalan.
- [ ] Tampilan diverifikasi pada lebar 320 px, 768 px, 1024 px, dan 1440 px tanpa horizontal overflow.
- [ ] Lighthouse target pada halaman produksi: Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95; Performance ≥ 90 pada perangkat desktop dengan aset produksi teroptimasi.

## 12. Metrik keberhasilan pascarilis

- Semua tautan CTA/social/CV dapat dibuka dan tidak ada 404.
- Pengunjung dapat mencapai preview sertifikat dan halaman kontak dalam maksimal dua interaksi dari navigasi utama.
- Pemilik dapat menambah satu sertifikat baru hanya dengan menambahkan aset dan satu objek data.
- Audit manual mobile, keyboard, dan reduced motion lulus sebelum setiap rilis.

## 13. Risiko dan mitigasi

| Risiko | Mitigasi |
| --- | --- |
| Ukuran PDF/sertifikat membuat halaman lambat | Tampilkan thumbnail yang terkompresi; muat PDF hanya saat diminta. |
| Data pribadi tercantum dalam sertifikat | Audit dan redaksi sebelum upload publik. |
| Proyek institusi bersifat rahasia | Gunakan screenshot yang disetujui, anonimisasi data, dan jelaskan batasan publikasi. |
| URL verifikasi kedaluwarsa | Jadikan URL bagian dari data terpusat dan audit saat memperbarui konten. |
| CDN gagal dimuat | Pin versi dan rencanakan build aset lokal pada fase optimasi. |

## 14. Keputusan yang diperlukan sebelum implementasi

1. URL profil GitHub, LinkedIn, Instagram (atau ikon mana yang perlu disembunyikan).
2. Domain GitHub Pages/produksi final.
3. Daftar sertifikat pertama beserta file, metadata, dan link verifikasi.
4. Proyek mana yang boleh memiliki demo publik/repository/studi kasus detail.
5. Pilihan CTA hero sekunder: **Unduh CV** atau **Hubungi Saya**.
