function login() {
    var username = $('#username').val();
    var password = $('#password').val();
  
    // Simula la validación de usuario y contraseña
    if (username === 'usuario' && password === 'contrasena') {
      // Login exitoso
      $('#login-form').hide();
      $('#financial-movements').show();
      // Aquí puedes cargar el listado de movimientos financieros del usuario
      // (puedes hacer una llamada a una API, por ejemplo)
    } else {
      // Login fallido, muestra un mensaje de error
      $('#error-message').text('Usuario o contraseña incorrectos');
    }
  }


  const connection = require('./db');

  const { Pool } = require('pg');

  // Configuración de la conexión a PostgreSQL
  const pool = new Pool({
    user: 'tuUsuario',
    host: 'localhost',
    database: 'tuBaseDeDatos',
    password: 'tuContraseña',
    port: 5432, // Cambia el puerto si es necesario
  });
  
  // Script SQL para crear las tablas
  const createTablesScript = `
    -- Crear la tabla de usuarios
    CREATE TABLE users (
      id serial NOT NULL,
      username varchar(50),
      pass varchar(500),
      email varchar(100),
      PRIMARY KEY (id)
    );
  
    -- Crear la tabla de facturas
    CREATE TABLE bill (
      id serial,
      date_bill date,
      user_id integer,
      value numeric(9),
      type integer,
      observation varchar(120),
      PRIMARY KEY (id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE NO ACTION ON UPDATE NO ACTION
    );
  `;
  
  // Ejecutar el script SQL
  async function createTables() {
    const client = await pool.connect();
  
    try {
      await client.query(createTablesScript);
      console.log('Tablas creadas exitosamente');
    } catch (err) {
      console.error('Error al crear las tablas:', err);
    } finally {
      client.release();
    }
  }
  
  // Llamar a la función para crear las tablas
  createTables();

// Cierra la conexión cuando hayas terminado
connection.end((err) => {
  if (err) {
    console.error('Error al cerrar la conexión', err);
  } else {
    console.log('Conexión cerrada correctamente');
  }
});