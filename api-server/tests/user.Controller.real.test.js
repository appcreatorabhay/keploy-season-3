const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/user');
const { getUsers, createUser } = require('../controllers/userController');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: "verifyMASTER" });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User Controller (Real DB)', () => {
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('createUser creates user', async () => {
    const req = { body: { name: 'Abhay', email: 'a@a.com', age: 25 } };
    await createUser(req, res);
    expect(res.status).toHaveBeenCalledWith(201); // ✅ Fix: Match controller
    expect(res.json).toHaveBeenCalled();
  });

  it('getUsers returns users', async () => {
    const req = {};
    await getUsers(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
