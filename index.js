const express = require('express'); // Import Express
const app = express(); // Membuat instance dari Express
const PORT = process.env.PORT || 3000; // Menentukan port

app.use(express.json()); // Middleware untuk mengubah request body ke JSON

// Database sementara untuk menyimpan pengguna
let users = [];

// Data YouTube video berdasarkan kategori
const videoLinks = {
  Plastic: [
    "https://youtu.be/y0NREey4ITY?si=hHbeu4g8hkGUmGom",
    "https://youtu.be/8sbgquJgKzM?si=_dEc_D6UatfoRYJK",
    "https://youtu.be/Xs2hAWuPmSg?si=d7h7ViwRmRNOGiMT",
    "https://youtu.be/QnMsuYUNYgo?si=FSAbUYX9CfYGWkiK",
    "https://youtu.be/As6S-6cETSU?si=4kQPLXOO6AfFtvGH",
    "https://youtu.be/vu8BJUuKw8Y?si=Ct48lTysjmQIP5Kd",
  ],
  Paper: [
    "https://youtu.be/Hu9gZGJ76Xo?si=eOmIYYoAdMbMjOQo",
    "https://youtu.be/umYPw_eFQ5Q?si=Oxw7VP2WAfKKcHQA",
    "https://youtu.be/FJBAC2JfoaY?si=MSxqA6yL_pfxem17",
    "https://youtu.be/zj2u_0rsyCA?si=UBkQB3NurifemgVg",
  ],
  Cardboard: [
    "https://youtu.be/K-zOIPZ3RXk?si=5nvLSDWU-Eu__SCm",
    "https://youtu.be/FJBAC2JfoaY?si=MSxqA6yL_pfxem17",
    "https://youtu.be/H03B8jIH9Fc?si=l15NYv91Ig6lK754",
    "https://youtu.be/zj2u_0rsyCA?si=UBkQB3NurifemgVg",
  ],
  Metal: [
    "https://youtu.be/YX8wgnTyfYo?si=w_0Y2RDSSFWrOO5d",
    "https://youtu.be/PQNbTpJ_eso?si=hWZtR4tsqKfuZFal",
  ],
  Glass: [
    "https://youtu.be/fhKYYYOC9V4?si=uwZ4JPTql-ifouZg",
  ],
  Clothes: [
    "https://youtu.be/cU_wxymF0ac?si=3hkiUNaIhiwfG5NP",
    "https://youtu.be/-WNmtNX1d0w?si=fCuhahchfNDi4_w8",
  ],
};

// Endpoint default untuk root URL (http://localhost:3000)
app.get('/', (req, res) => {
  res.send('Server berjalan dengan baik!');
});

// Endpoint untuk register user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const user = { id: users.length + 1, username, password };
  users.push(user);
  res.status(201).json({ message: 'User berhasil didaftarkan', user });
});

// Endpoint untuk login user
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    res.json({ message: 'Login berhasil', user });
  } else {
    res.status(401).json({ message: 'Username atau password salah' });
  }
});

// Endpoint untuk mendapatkan user berdasarkan id
app.get('/user/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User tidak ditemukan' });
  }
});

// Endpoint untuk mendapatkan video berdasarkan kategori
app.get('/api/category/:category', (req, res) => {
  const category = req.params.category;
  const videos = videoLinks[category];
  
  if (videos) {
    res.json({
      category,
      videos: videos.map(link => ({ link })),
    });
  } else {
    res.status(404).json({ message: "Kategori tidak ditemukan" });
  }
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
