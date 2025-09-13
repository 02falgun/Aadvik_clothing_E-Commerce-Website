/* eslint-disable @typescript-eslint/no-require-imports */
const loginHandler = require('@/app/api/auth/login/route').POST;
const registerHandler = require('@/app/api/auth/register/route').POST;
const User = require('@/models/User').default;

// Mock the database connection
jest.mock('@/lib/mongodb', () => ({
  __esModule: true,
  default: jest.fn(),
}))

// Mock the User model
jest.mock('@/models/User', () => ({
  __esModule: true,
  default: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}))

const mockUser = {
  _id: '1',
  email: 'test@example.com',
  firstName: 'John',
  lastName: 'Doe',
  role: 'user',
  comparePassword: jest.fn(),
}

describe('Auth API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/auth/login', () => {
    it('should login user with valid credentials', async () => {
      User.findOne.mockResolvedValue(mockUser)
      mockUser.comparePassword.mockResolvedValue(true)

      const request = new Request('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
        }),
      })

      const response = await loginHandler(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.user.email).toBe('test@example.com')
    })

    it('should return error for invalid credentials', async () => {
      User.findOne.mockResolvedValue(null)

      const request = new Request('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'wrongpassword',
        }),
      })

      const response = await loginHandler(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.success).toBe(false)
      expect(data.message).toBe('Invalid email or password')
    })
  })

  describe('POST /api/auth/register', () => {
    it('should register new user successfully', async () => {
      User.findOne.mockResolvedValue(null) // User doesn't exist
      User.create.mockResolvedValue(mockUser)

      const request = new Request('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
        }),
      })

      const response = await registerHandler(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.user.email).toBe('test@example.com')
    })

    it('should return error if user already exists', async () => {
      User.findOne.mockResolvedValue(mockUser) // User already exists

      const request = new Request('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
        }),
      })

      const response = await registerHandler(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.message).toBe('User already exists with this email')
    })
  })
})
