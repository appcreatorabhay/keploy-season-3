const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../app'); // ✅ Fixed
const User = require('../models/user');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "integrationTEST" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User API Integration Tests', () => {
  let userId;

  it('POST /api/users - create user', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ name: 'Abhay', email: 'abhay@example.com', age: 25 });

    expect(res.statusCode).toBe(201); // ✅ Match controller
    expect(res.body).toHaveProperty('_id');
    userId = res.body._id;
  });

  it('GET /api/users - get all users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('PUT /api/users/:id - update user', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ name: 'Abhay Rathore', email: 'abhayr@example.com', age: 26 });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Abhay Rathore');
  });

  it('DELETE /api/users/:id - delete user', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User deleted successfully');
  });
});
