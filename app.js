const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Carpeta para almacenar imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Añadir timestamp al nombre del archivo
  }
});

const upload = multer({ storage: storage });

// Crear la carpeta 'uploads' si no existe
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Ruta para subir imágenes
app.post('/upload', upload.single('image'), (req, res) => {
  res.send('Imagen subida con éxito');
});

// Servir archivos estáticos (HTML y CSS)
app.use(express.static('public'));

// Ruta principal
app.get('/', (req, res) => {
  res.send(`
    <h1>Sube una imagen</h1>
    <form action="/upload" method="post" enctype="multipart/form-data">
      <input type="file" name="image" accept="image/*" required>
      <button type="submit">Subir Imagen</button>
    </form>
  `);
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
