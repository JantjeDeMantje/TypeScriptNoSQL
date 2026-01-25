import axios from 'axios';

describe('System Tests', () => {
  const uniqueId = Date.now();
  const userDiff = `user${uniqueId}`;
  const modCode = `SYS_TEST_${uniqueId}`;

  const userPayload = {
    email: `${userDiff}@student.avans.nl`,
    password: 'Password123!',
    firstName: 'System',
    lastName: 'Tester'
  };

  const modulePayload = {
    code: modCode,
    name: 'System Test Module',
    ec: 3,
    level: 'NLQF-5',
    description: 'A test module'
  };

  let token = '';

  // Cleanup hook
  afterAll(async () => {
    // 1. Delete Module
    try {
      await axios.delete(`/api/modules/${modCode}`);
    } catch (e) {
      // Ignore if already deleted or fails
    }

    // 2. Delete User (cleanup self)
    if (token) {
      try {
        await axios.delete('/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` }
        });
      } catch (e) {
         console.warn('Failed to cleanup user', e);
      }
    }
  });

  // 1. Happy: Register User
  it('should register a new user', async () => {
    const res = await axios.post('/api/auth/register', userPayload);
    expect(res.status).toBe(201);
    expect(res.data).toHaveProperty('token');
  });

  // 2. Happy: Login User
  it('should login the user', async () => {
    const res = await axios.post('/api/auth/login', {
      email: userPayload.email,
      password: userPayload.password
    });
    expect(res.status).toBe(201);
    expect(res.data.token).toBeDefined();
    token = res.data.token;
  });

  // 3. Happy: Create Module
  it('should create a module', async () => {
    const res = await axios.post('/api/modules', modulePayload);
    expect(res.status).toBe(201);
    expect(res.data.code).toBe(modCode);
  });

  // 4. Happy: Get Module List
  it('should retrieve list of modules', async () => {
    const res = await axios.get('/api/modules');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);
    const found = res.data.find((m: any) => m.code === modCode);
    expect(found).toBeDefined();
  });

  // 5. Unhappy: Create Module with invalid data (Bad Request)
  it('should fail to create module with invalid level', async () => {
    try {
      await axios.post('/api/modules', {
        ...modulePayload,
        code: `BAD_${uniqueId}`,
        level: 'INVALID_LEVEL'
      });
      throw new Error('Should have failed');
    } catch (error: any) {
      expect(error.response?.status).toBe(400);
    }
  });

  // 6. Unhappy: Delete non-existent module (Not Found)
  it('should return 404 when deleting missing module', async () => {
    try {
      await axios.delete(`/api/modules/NON_EXISTENT_${uniqueId}`);
      throw new Error('Should have failed');
    } catch (error: any) {
      expect(error.response?.status).toBe(404);
    }
  });
});
