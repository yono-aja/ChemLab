# ChemLab — Simulasi Unsur Kimia

Aplikasi edukasi React + Vite untuk memilih unsur dan mensimulasikan contoh pembentukan senyawa.

## Menjalankan lokal

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Folder hasil build adalah `dist/`.

## Deploy ke Vercel

1. Upload folder project ini ke repository GitHub.
2. Di Vercel pilih **Add New → Project** lalu import repository.
3. Framework preset: **Vite**.
4. Build command: `npm run build`.
5. Output directory: `dist`.
6. Klik Deploy.

## Catatan sains

Hasil simulasi berasal dari daftar reaksi edukatif yang dikurasi di `src/App.jsx`. Aplikasi ini tidak memprediksi seluruh reaksi kimia dan bukan instruksi eksperimen laboratorium.
