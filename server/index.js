require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const pg = require('pg');
const argon2 = require('argon2');

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

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) throw new ClientError(400, 'username and password are required fields');
    const hashedPassword = await argon2.hash(password);
    const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        on conflict ("username")
        do nothing
        returning "userId", "username", "createdAt"
      `;
    const params = [username, hashedPassword];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(409, 'username is already in use');
    }
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

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

module.exports = app;
