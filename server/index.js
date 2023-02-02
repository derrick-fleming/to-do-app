require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const pg = require('pg');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleWare = express.json();

app.use(jsonMiddleWare);

app.get('/api/hello', (req, res) => {
  res.json({ hello: 'world' });
});

app.post('/api/todos', async (req, res) => {
  try {
    const { todoItem, isCompleted = false } = req.body;
    if (!todoItem || typeof isCompleted !== 'boolean') {
      res.status(400).json({
        error: 'task (string) and isCompleted (boolean) are required fields'
      });
      return;
    }
    const sql = `
    insert into "todos" ("task", "isCompleted")
    values ($1, $2)
    returning *`;

    const params = [todoItem, isCompleted];
    const dbresult = await db.query(sql, params);
    const [todo] = dbresult.rows;
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occcurred'
    });
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
