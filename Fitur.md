Home Test Frontend Web Developer
Buat website manajemen artikel dengan role User dan Admin. Aplikasi harus mendukung autentikasi dan otorisasi, di mana pengguna yang terdaftar sebagai User hanya dapat mengakses fitur khusus User, dan pengguna dengan role Admin hanya dapat mengakses fitur khusus Admin. Lakukan slicing antarmuka pengguna (UI) berdasarkan Design yang responsif dan integrasikan aplikasi dengan API (gunakan base url https://test-fe.mysellerpintar.com/api) yang disediakan. Pastikan kode terstruktur, mudah dibaca, dan mengikuti best practice.
Berikut fitur - fitur dan halaman untuk role user dan admin:

1. User
   a) Authentication,

1) Login dengan validasi form.
2) Register dengan validasi form.
3) Setelah login/register sukses, redirect ke halaman list artikel.
4) Logout dengan redirect ke halaman login.
   b) List artikel
5) Filter artikel berdasarkan kategori
6) Searching artikel, dengan debounce (300-500ms)
7) Pagination, jika data lebih dari 9 item
   c) Detail Artikel
8) Detail artikel, tampilkan konten lengkap
9) Other articles, tampilkan maksimal 3 artikel dari kategori yang sama dengan artikel yang sedang dilihat user.

2. Admin
   a) Authentication,

1) Login dengan validasi form.
2) Register dengan validasi form.
3) Setelah login/register sukses, redirect ke halaman list artikel.
4) Logout dengan redirect ke halaman login.
   b) list categories
5) Searching category, dengan debounce (300-500ms)
6) Terapkan pagination, jika data lebih dari 10 items
   c) Create Category
   ● Terapkan form validation
   d) Edit category
   ● Terapkan form validation
   e) List artikel
7) Filter artikel berdasarkan kategori
8) Searching artikel, dengan debounce (300-500ms)
9) Pagination, jika data lebih dari 10 item
   f) Create article
10) Terapkan form validation
11) Buat tampilan preview sebelum submit (fetch api).
    g) Edit artikel
12) Terapkan form validation
13) Buat tampilan preview sebelum submit (fetch api).

3. Teknologi
   a) Next JS (app router, SSR dan CSR)
   b) Styling: Tailwind CSS (+ Shadcn/ui preferred).
   c) Fetching API: axios
   d) Icon: Lucide
   e) Form validation: Zod + React Hook Form
   f) Version Control: Gunakan Git dan GitHub (implementasi Git flow).
   Note: Diperbolehkan menambahkan teknologi lain jika diperlukan.
4. Note
   a) Siapkan backup data dummy untuk mengantisipasi jika server API yang digunakan terjadi gangguan saat presentasi / interview.
   b) Tambahkan method / logic untuk memanipulasi data jika data dari API yang digunakan tidak mendukung fitur - fitur tersebut.
   c) Perhatikan tampilan UI agar responsive di layar HP, Tablet, dan Desktop
   d) Improve, tambahkan UI untuk handling loading state, success message, dan error message.

# Dokumentasi API :

Tentu, berikut adalah penjelasan lengkap untuk setiap _endpoint_ API, lengkap dengan contoh permintaan (request) dan contoh respons (response) yang realistis berdasarkan skema yang Anda berikan.

---

### **Gambaran Umum**

API ini digunakan untuk sistem manajemen konten sederhana yang melibatkan Pengguna (Users), Kategori (Categories), dan Artikel (Articles). Sebagian besar aksi memerlukan autentikasi berbasis token.

**Alur Umum:**

1.  **Daftar (`/auth/register`)** atau **Login (`/auth/login`)** untuk mendapatkan token.
2.  Gunakan **token** tersebut di _Header_ `Authorization` untuk setiap permintaan yang memerlukan autentikasi (misalnya membuat artikel).

---

### **1. Auth (Autentikasi & Pengguna)**

Bagian ini mengelola semua yang terkait dengan akun pengguna.

#### **`POST /auth/register` - Mendaftarkan Pengguna Baru**

- **Fungsi**: Membuat akun pengguna baru.
- **Request Body**:
  ```json
  {
    "username": "gemini_writer",
    "password": "password123",
    "role": "User"
  }
  ```
- **Contoh Respons (`201 User registered successfully`)**:
  Server akan mengembalikan detail pengguna yang dibuat. Perhatikan bahwa password akan di-_hash_ (diacak) demi keamanan.
  ```json
  {
    "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    "username": "gemini_writer",
    "role": "User",
    "password": "$2a$10$m6uqvi.UKb2R5n58rillXeRCiY2C5bMNBJaV.BhkTaAz/qpJYvHee",
    "createdAt": "2025-06-23T01:20:10.113Z",
    "updatedAt": "2025-06-23T01:20:10.113Z"
  }
  ```

#### **`POST /auth/login` - Login Pengguna**

- **Fungsi**: Mengautentikasi pengguna dan memberikan token akses.
- **Request Body**:
  ```json
  {
    "username": "gemini_writer",
    "password": "password123"
  }
  ```
- **Contoh Respons (`200 Login successful`)**:
  Respons berisi token JWT (JSON Web Token) yang harus Anda simpan dan gunakan untuk permintaan selanjutnya.
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhMWIyYzNkNC1lNWY2LTRhN2ItOGM5ZC0wZTFmMmEzYjRjNWQiLCJyb2xlIjoiVXNlciIsImlhdCI6MTc1MDY0NDEwMH0.ABC123XYZ...",
    "role": "User"
  }
  ```
  - **Penjelasan**: `token` ini adalah kunci Anda untuk mengakses _endpoint_ lain.

#### **`GET /auth/profile` - Mendapatkan Profil Pengguna**

- **Fungsi**: Mengambil detail pengguna yang sedang login (berdasarkan token).
- **Header Wajib**: `Authorization: Bearer <TOKEN_DARI_LOGIN>`
- **Contoh Respons (`200 User profile`)**:
  ```json
  {
    "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    "username": "gemini_writer",
    "role": "User"
  }
  ```

---

### **2. Categories (Kategori)**

Mengelola kategori untuk artikel. Memerlukan autentikasi.

#### **`POST /categories` - Membuat Kategori Baru**

- **Header Wajib**: `Authorization: Bearer <TOKEN_DARI_LOGIN>`
- **Request Body**:
  ```json
  {
    "name": "Teknologi"
  }
  ```
- **Contoh Respons (`200 Created category`)**:
  ```json
  {
    "id": "f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d",
    "name": "Teknologi",
    "userId": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    "createdAt": "2025-06-23T01:22:05.134Z",
    "updatedAt": "2025-06-23T01:22:05.134Z"
  }
  ```
  - **Penjelasan**: `userId` menunjukkan siapa yang membuat kategori ini. Simpan `id` kategori (`f0e1...`) untuk digunakan saat membuat artikel.

#### **`GET /categories` - Mendapatkan Semua Kategori**

- **Fungsi**: Menampilkan daftar semua kategori dengan paginasi.
- **Contoh Respons (`200 List of categories`)**:
  ```json
  {
    "data": [
      {
        "id": "f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d",
        "name": "Teknologi",
        "userId": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
        "createdAt": "2025-06-23T01:22:05.134Z",
        "updatedAt": "2025-06-23T01:22:05.134Z"
      },
      {
        "id": "g1h2i3j4-k5l6-4m7n-8o9p-qrstuvwxyz12",
        "name": "Gaya Hidup",
        "userId": "another-user-id",
        "createdAt": "2025-06-22T10:15:00.000Z",
        "updatedAt": "2025-06-22T10:15:00.000Z"
      }
    ],
    "totalData": 2,
    "currentPage": 1,
    "totalPages": 1
  }
  ```

---

### **3. Articles (Artikel)**

Bagian inti dari API, digunakan untuk mengelola artikel.

#### **`POST /articles` - Membuat Artikel Baru**

- **Fungsi**: Mempublikasikan artikel baru. Memerlukan autentikasi.
- **Header Wajib**: `Authorization: Bearer <TOKEN_DARI_LOGIN>`
- **Request Body**:
  Gunakan `categoryId` yang sudah dibuat sebelumnya.
  ```json
  {
    "title": "Panduan REST API untuk Pemula",
    "content": "REST API adalah standar arsitektur untuk komunikasi antar sistem...",
    "categoryId": "f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d"
  }
  ```
- **Contoh Respons (`200 Created article`)**:
  Respons mencakup detail artikel lengkap, termasuk data pengguna dan kategori terkait.
  ```json
  {
    "id": "9z8y7x6w-5v4u-4t3s-2r1q-p0o9n8m7l6k5",
    "title": "Panduan REST API untuk Pemula",
    "content": "REST API adalah standar arsitektur untuk komunikasi antar sistem...",
    "userId": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    "categoryId": "f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d",
    "createdAt": "2025-06-23T01:25:15.090Z",
    "updatedAt": "2025-06-23T01:25:15.090Z",
    "category": {
      "id": "f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d",
      "name": "Teknologi",
      "userId": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
      "createdAt": "2025-06-23T01:22:05.134Z",
      "updatedAt": "2025-06-23T01:22:05.134Z"
    },
    "user": {
      "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
      "username": "gemini_writer",
      "role": "User"
    }
  }
  ```

#### **`GET /articles` - Mendapatkan Semua Artikel**

- **Fungsi**: Menampilkan daftar artikel dengan banyak pilihan filter dan urutan.
- **Contoh URL dengan Parameter**: `.../articles?category=f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d&sortBy=createdAt&sortOrder=desc`
- **Contoh Respons (`200 List of articles`)**:
  ```json
  {
    "data": [
      {
        "id": "9z8y7x6w-5v4u-4t3s-2r1q-p0o9n8m7l6k5",
        "title": "Panduan REST API untuk Pemula",
        "content": "REST API adalah standar arsitektur untuk komunikasi antar sistem...",
        "userId": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
        "categoryId": "f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d",
        "createdAt": "2025-06-23T01:25:15.090Z",
        "updatedAt": "2025-06-23T01:25:15.090Z",
        "category": {
          "id": "f0e1d2c3-b4a5-4987-8654-3c2b1a0f9e8d",
          "name": "Teknologi"
        },
        "user": {
          "id": "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
          "username": "gemini_writer"
        }
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  }
  ```
  - **Penjelasan**: `total` adalah jumlah total artikel yang ditemukan, `page` adalah halaman saat ini, dan `limit` adalah item per halaman.

#### **`GET /articles/{id}` - Mendapatkan Artikel Tunggal**

- **Fungsi**: Mengambil satu artikel spesifik berdasarkan ID-nya.
- **Contoh Respons (`200 Article found`)**: Responsnya akan sama persis dengan objek tunggal di dalam `data` pada `GET /articles`.

#### **`PUT /articles/{id}` - Memperbarui Artikel**

- **Fungsi**: Mengubah data artikel yang sudah ada. Memerlukan autentikasi dan otorisasi (biasanya hanya pemilik artikel atau admin yang bisa).
- **Header Wajib**: `Authorization: Bearer <TOKEN_DARI_LOGIN>`
- **Request Body**:
  ```json
  {
    "title": "Panduan REST API untuk Profesional (Updated)",
    "content": "Konten diperbarui dengan contoh penggunaan GraphQL sebagai perbandingan."
  }
  ```
- **Contoh Respons (`200 Updated article`)**: Mengembalikan data artikel yang telah diperbarui. `updatedAt` akan berubah.

#### **`DELETE /articles/{id}` - Menghapus Artikel**

- **Fungsi**: Menghapus artikel secara permanen. Memerlukan autentikasi dan otorisasi.
- **Header Wajib**: `Authorization: Bearer <TOKEN_DARI_LOGIN>`
- **Contoh Respons (`200 Article deleted`)**: API akan memberikan status 200 OK. Biasanya, respons body-nya kosong atau berisi pesan konfirmasi singkat.
  ```json
  {
    "message": "Article successfully deleted"
  }
  ```

---

### **4. Upload**

#### **`POST /upload` - Mengunggah Gambar**

- **Fungsi**: Mengunggah file gambar ke server (S3). Hanya untuk admin.
- **Request Body**: Ini bukan `application/json`, melainkan `multipart/form-data`. Anda akan mengirim file langsung.
- **Contoh Respons (`200 Image successfully uploaded`)**:
  ```json
  {
    "imageUrl": "https://your-s3-bucket.amazonaws.com/uploads/generated-image-name.jpg"
  }
  ```
