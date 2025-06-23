// ✅ Mock User model correctly
jest.mock('../models/user', () => {
  const saveMock = jest.fn(); // mock for save method

  const UserMock = jest.fn(function () {
    this.save = saveMock;
  });

  UserMock.find = jest.fn();

  // expose saveMock so we can reset/mock return values in tests
  UserMock.__saveMock = saveMock;

  return UserMock;
});

const User = require('../models/user');
const { getUsers, createUser } = require('../controllers/userController');

describe('User Controller (Mocked)', () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    jest.clearAllMocks();
    User.find.mockReset();
    User.__saveMock.mockReset(); // reset the mock between tests
  });

  it('getUsers returns users', async () => {
    const usersMock = [{ name: 'Abhay' }];
    User.find.mockResolvedValue(usersMock);

    await getUsers({}, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(usersMock);
  });

it('createUser creates and returns user', async () => {
  const req = { body: { name: 'John' } };

  // Ensure that save() resolves to expected object
  User.__saveMock.mockResolvedValue(req.body);

  await createUser(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(req.body);  // ✅ corrected
});

});