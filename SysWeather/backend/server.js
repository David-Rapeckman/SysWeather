const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  user: 'Rm558127',
  password: '270406',
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

app.get('/cities', async (req, res) => {
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(`SELECT id, name FROM cities`);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/cities', async (req, res) => {
  const { name } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection();
    await connection.execute(
      `INSERT INTO cities (id, name) VALUES (cities_seq.NEXTVAL, :name)`,
      [name],
      { autoCommit: true }
    );
    res.status(201).json({ message: 'City added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.get('/events/:cityId', async (req, res) => {
  const cityId = req.params.cityId;
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT id, type, severity, TO_CHAR(event_timestamp, 'YYYY-MM-DD"T"HH24:MI:SS') AS timestamp FROM events WHERE city_id = :cityId ORDER BY event_timestamp DESC`,
      [cityId]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

app.post('/events', async (req, res) => {
  const { city_id, type, severity, timestamp } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection();
    await connection.execute(
      `INSERT INTO events (id, city_id, type, severity, event_timestamp) VALUES (events_seq.NEXTVAL, :city_id, :type, :severity, TO_TIMESTAMP(:timestamp, 'YYYY-MM-DD"T"HH24:MI:SS'))`,
      [city_id, type, severity, timestamp],
      { autoCommit: true }
    );
    res.status(201).json({ message: 'Event recorded' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    if (connection) await connection.close();
  }
});

const PORT = 3000;
app.listen(PORT);
