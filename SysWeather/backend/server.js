// backend/server.js

const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: 'Rm556607',
  password: '161103',
  connectString:
    '(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=Oracle.fiap.com.br)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=ORCL)))',
};

async function initialize() {
  try {
    await oracledb.createPool({
      user: dbConfig.user,
      password: dbConfig.password,
      connectString: dbConfig.connectString,
      poolMin: 1,
      poolMax: 5,
      poolIncrement: 1,
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

initialize();

const SECRET_KEY = 'SYSWEATHER_SECRET';

// Rotas de autenticação

app.post('/auth/signup', async (req, res) => {
  const { name, email, password, birthdate, role, city, phone, gender } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection();
    const hash = await bcrypt.hash(password, 10);
    const result = await connection.execute(
      `INSERT INTO users (id, name, email, password, birthdate, role, city, phone, gender)
       VALUES (users_seq.NEXTVAL, :name, :email, :password, TO_DATE(:birthdate, 'YYYY-MM-DD'), :role, :city, :phone, :gender)`,
      [name, email, hash, birthdate, role || 'user', city, phone || null, gender || null],
      { autoCommit: true }
    );
    res.status(201).json({ message: 'Usuário criado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/auth/signin', async (req, res) => {
  const { email, password } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT id, name, email, password, role, city FROM users WHERE email = :email`,
      [email],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.PASSWORD);
    if (!match) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }
    const token = jwt.sign(
      { id: user.ID, email: user.EMAIL, role: user.ROLE, city: user.CITY },
      SECRET_KEY,
      { expiresIn: '24h' }
    );
    delete user.PASSWORD;
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// Middleware de autenticação

async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });
  const [, token] = authHeader.split(' ');
  if (!token) return res.status(401).json({ error: 'Token inválido' });
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

// Rotas de cidades

app.get('/cities', authMiddleware, async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT id, name FROM cities ORDER BY name`,
      [],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/cities', authMiddleware, async (req, res) => {
  const { name } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection();
    await connection.execute(
      `INSERT INTO cities (id, name) VALUES (cities_seq.NEXTVAL, :name)`,
      [name],
      { autoCommit: true }
    );
    res.status(201).json({ message: 'Cidade adicionada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// Detalhes de cidade

app.get('/cities/:id', authMiddleware, async (req, res) => {
  const cityId = req.params.id;
  let connection;
  try {
    connection = await oracledb.getConnection();
    const resultCity = await connection.execute(
      `SELECT id, name FROM cities WHERE id = :id`,
      [cityId],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    if (resultCity.rows.length === 0) {
      return res.status(404).json({ error: 'Cidade não encontrada' });
    }
    const city = resultCity.rows[0];
    // Suponha que exista coluna population e weather_alert em cities ou calculada de acordo
    const cityDetail = {
      id: city.ID,
      name: city.NAME,
      country: null,
      latitude: null,
      longitude: null,
      population: null,
      weatherAlert: null
    };
    res.json({ city: cityDetail });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

// Rotas de eventos meteorológicos

app.get('/events/:cityId', authMiddleware, async (req, res) => {
  const cityId = req.params.cityId;
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT id, type, severity, TO_CHAR(event_timestamp, 'YYYY-MM-DD"T"HH24:MI:SS') AS timestamp
       FROM events
       WHERE city_id = :cityId
       ORDER BY event_timestamp DESC`,
      [cityId],
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/events', authMiddleware, async (req, res) => {
  const { city_id, type, severity, timestamp } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection();
    await connection.execute(
      `INSERT INTO events (id, city_id, type, severity, event_timestamp)
       VALUES (events_seq.NEXTVAL, :city_id, :type, :severity, TO_TIMESTAMP(:timestamp, 'YYYY-MM-DD"T"HH24:MI:SS'))`,
      [city_id, type, severity, timestamp],
      { autoCommit: true }
    );
    res.status(201).json({ message: 'Evento registrado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

const PORT = 3000;
app.listen(PORT);
