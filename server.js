// Importar dependencias
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

// Crear la aplicación de Express
const app = express();
const port = 3000;

// Conexión con la base de datos
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',     
  password: '', 
  database: 'zapdac', 
});

// Verificar la conexión con la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error de conexión a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Middleware para manejar JSON y datos del cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Servir archivos estáticos

// Ruta para el registro de usuarios (POST)
app.post('/registrar', (req, res) => {
  const { nombre, correo, password } = req.body;

  // SQL para insertar datos del usuario
  const query = 'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)';

  db.query(query, [nombre, correo, password], (err, result) => {
    if (err) {
      console.error('Error al registrar el usuario:', err);  // Muestra el error en la consola
      res.status(500).send({ message: 'Error al registrar el usuario' });  // Enviar respuesta con mensaje
    } else {
      console.log('Usuario registrado:', result);  // Muestra el resultado en la consola
      res.status(200).send({ message: 'Usuario registrado correctamente' });  // Responder con mensaje de éxito
    }
  });
});

// Ruta para el inicio de sesión (POST)
app.post('/login', (req, res) => {
  const { correo, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE correo = ? AND password = ?';

  db.query(query, [correo, password], (err, result) => {
    if (err) {
      console.error('Error al iniciar sesión:', err);
      res.status(500).send({ message: 'Error al iniciar sesión' });
    } else {
      if (result.length > 0) {
        res.status(200).send({ message: 'Inicio de sesión exitoso' });
      } else {
        res.status(400).send({ message: 'Correo o contraseña incorrectos' });
      }
    }
  });
});

// Ruta principal (para verificar si Express está funcionando)
app.get('/', (req, res) => {
  res.send('¡Servidor Express funcionando!');
});

// Iniciar el servidor en el puerto 3000
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
