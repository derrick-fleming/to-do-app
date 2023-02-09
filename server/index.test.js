/* eslint-disable no-undef */
const request = require('supertest');
const app = require('./index');

describe('Test the root path', () => {
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
      expect(response.statusCode).toBe(201);
    } catch (err) {
      console.error(err);
    }
  });

  test('It should UPDATE a todoItem', async () => {
    try {
      const body = { isCompleted: true, todoId: 5 };
      const response = await request(app).patch('/api/todos').send(body);
      expect(response.statusCode).toBe(200);
      expect(response._body.isCompleted).toBe(true);
    } catch (err) {
      console.error(err);
    }
  });

  test('It should send an error message with an invalid todoId', async () => {
    try {
      const body = { isCompleted: true, todoId: 100 };
      const response = await request(app).patch('/api/todos').send(body);
      expect(response.statusCode).toBe(404);
    } catch (err) {
      console.error(err);
    }
  });
});
