/* eslint-disable no-undef */
const request = require('supertest');
const app = require('./index');

describe('Test the root path', () => {

  let todoId;
  test('It should respond with the GET method', async () => {
    try {
      const response = await request(app).get('/api/todos');
      expect(response.statusCode).toBe(200);
    } catch (err) {
      console.error(err);
    }
  });

  test('It should POST a new todoItem', async () => {
    try {
      const body = { todoItem: 'Testing Sample', isCompleted: false };
      const response = await request(app).post('/api/todos').send(body);
      todoId = response._body.todoId;
      expect(response.statusCode).toBe(201);
    } catch (err) {
      console.error(err);
    }
  });

  test('It should UPDATE a todoItem', async () => {
    try {
      const body = { isCompleted: true, todoId };
      const response = await request(app).patch('/api/todos').send(body);
      expect(response.statusCode).toBe(200);
      expect(response._body.isCompleted).toBe(true);
    } catch (err) {
      console.error(err);
    }
  });

  test('It should send an error message with an invalid todoId', async () => {
    try {
      const body = { isCompleted: true, todoId: 10000 };
      const response = await request(app).patch('/api/todos').send(body);
      expect(response.statusCode).toBe(404);
    } catch (err) {
      console.error(err);
    }
  });

  test('It should DELETE a todoItem', async () => {
    try {
      const body = { todoId };
      const response = await request(app).delete('/api/todos').send(body);
      expect(response.statusCode).toBe(200);
      expect(response._body.todoId).toBe(todoId);
    } catch (err) {
      console.error(err);
    }
  });

  test('It should send an error message with an invalid todoId', async () => {
    try {
      const body = { todoId: 10000 };
      const response = await request(app).delete('/api/todos').send(body);
      expect(response.statusCode).toBe(404);
      expect(response._body.error).toBe('cannot find todo with todoId 10000');
    } catch (err) {
      console.error(err);
    }
  });

});
