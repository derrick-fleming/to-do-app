require('dotenv/config');
const express = require('express');
const staticMiddleware = require('./static-middleware');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const pg = require('pg');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const authorizationMiddleWare = require('./authorization-middleware');

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
    const updatePassword = await argon2.hash(password);
    const sql = `
        insert into "users" ("username", "hashedPassword")
        values ($1, $2)
        on conflict ("username")
        do nothing
        returning "userId", "username", "hashedPassword"
      `;
    const params = [username, updatePassword];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(409, 'username is already in use');
    }
    const [user] = result.rows;
    const { userId } = user;
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'invalid login');
    }
    const sql = `
    select "userId",
    "hashedPassword"
    from "users"
    where "username" = $1
  `;
    const params = [username];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'invalid login');
    }
    const { userId, hashedPassword } = user;
    const isMatching = await argon2.verify(hashedPassword, password);
    if (!isMatching) {
      throw new ClientError(401, 'invalid login');
    }
    const payload = { userId, username };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

app.use(authorizationMiddleWare);

app.get('/api/todos', async (req, res) => {
  const { userId } = req.user;
  try {
    const sql = `
    select *
    from "todos"
    where "userId" = $1
    order by "todoId"
    `;
    const params = [userId];
    const dbResponse = await db.query(sql, params);
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
    const { userId } = req.user;
    if (!todoItem || typeof isCompleted !== 'boolean') {
      res.status(400).json({
        error: 'task (string) and isCompleted (boolean) are required fields'
      });
      return;
    }
    const sql = `
    insert into "todos" ("userId", "task", "isCompleted")
    values ($1, $2, $3)
    returning *`;

    const params = [userId, todoItem, isCompleted];
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
    const { userId } = req.user;

    const sql = `
      update "todos"
        set "isCompleted" = $2
      where "todoId" = $1 and "userId" = $3
      returning *
    `;
    const params = [todoId, isCompleted, userId];
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

app.put('/api/todos', async (req, res) => {
  try {
    const { task, todoId } = req.body;
    const { userId } = req.user;
    if (!task || !todoId) {
      res.status(400).json({
        error: 'task (string) and todoId are required'
      });
      return;
    }
    const sql = `
    update "todos"
    set "task" = $1
    where "todoId" = $2 and "userId" = $3
    returning *
    `;
    const params = [task, todoId, userId];
    const dbresult = await db.query(sql, params);
    const [todo] = dbresult.rows;
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.delete('/api/todos', async (req, res) => {
  try {
    const { userId } = req.user;
    const { todoId } = req.body;
    const sql = `
    delete from "todos"
    where "todoId" = $1 and "userId" = $2
    returning *`;
    const params = [todoId, userId];
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
