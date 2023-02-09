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

app.get('/api/todos', async (req, res) => {
  try {
    const sql = `
    select *
    from "todos"
    order by "todoId"`;
    const dbResponse = await db.query(sql);
    const todos = dbResponse.rows;
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
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

app.patch('/api/todos', async (req, res) => {
  try {
    const { isCompleted, todoId } = req.body;
    const sql = `
      update "todos"
        set "isCompleted" = $2
      where "todoId" = $1
      returning *
    `;
    const params = [todoId, isCompleted];
    const dbResult = await db.query(sql, params);
    const [todo] = await dbResult.rows;
    if (!todo) {
      res.status(404).json({
        error: `cannot find todo with todoId ${todoId}`
      });
      return;
    }
    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.delete('/api/todos', async (req, res) => {
  try {
    const { todoId } = req.body;
    const sql = `
    delete from "todos"
    where "todoId" = $1
    returning *`;
    const params = [todoId];
    const dbResult = await db.query(sql, params);
    const [todo] = await dbResult.rows;
    if (!todo) {
      res.status(404).json({
        error: `cannot find todo with todoId ${todoId}`
      });
      return;
    }
    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    res.stats(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

module.exports = app;
