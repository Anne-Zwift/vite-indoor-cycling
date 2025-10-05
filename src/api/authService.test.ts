const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: (key: string): string | null => store[key] || null,

    setItem: (key: string, value: unknown): void => { store[key] = String(value);

    },
    removeItem: (key: string): void => { delete store[key]; 

  },
    clear: (): void => { store = {}; 
  },
  };
})();

Object.defineProperty(global, 'localStorage', { value: mockLocalStorage,
  writable: true,
 });


// Mock the global fetch function
global.fetch = jest.fn() as jest.Mock;
global.Headers = jest.fn(() => ({ 
    append: jest.fn(), 
    'Content-Type': 'application/json' 
})) as unknown as typeof Headers;

import { login, register } from './authService';
import { getAccessToken, clearAccessToken } from '../utils/authUtils';

const mockFetchSuccess = (data: unknown) => {
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({ data: data, meta: {} }),
  });
};

const mockFetchFailure = (message: string) => {
  // The function performs an action (sets up a mock) but returns nothing.
  (fetch as jest.Mock).mockResolvedValueOnce({
    ok: false,
    json: () => Promise.resolve({ errors: [{ message }] }), 
  });
};


describe('Auth Service', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    clearAccessToken();
  });

  it('should successfully log in and save access token', async () => {
    const mockAuthResponse = {
      name: 'test',
      email: 'a@b.com',
      venueManager: false,
      accessToken: 'mock_token_123',
    };
    mockFetchSuccess(mockAuthResponse);

    const credentials = { email: 'a@b.com', password: 'pwd' };
    const userProfile = await login(credentials);

    expect(userProfile).toHaveProperty('name', 'test');
    expect(getAccessToken()).toBe('mock_token_123');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should successfully register a user and save access token', async () => {
    const mockAuthResponse = {
      name: 'new_user',
      email: 'new@user.com',
      venueManager: true,
      accessToken: 'mock_token_456',
    };
    mockFetchSuccess(mockAuthResponse);

    const newUserData = { 
        name: 'new_user', 
        email: 'new@user.com', 
        password: 'pwd', 
        venueManager: true 
    };
    const userProfile = await register(newUserData);

    // Assertions
    expect(userProfile).toHaveProperty('name', 'new_user');
    expect(getAccessToken()).toBe('mock_token_456');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw an error on login failure and NOT save the token', async () => {
    const errorMessage = 'Invalid email or password.';
    mockFetchFailure(errorMessage);

    const credentials = { email: 'bad@user.com', password: 'wrong' };

    // Act & Assert for rejection
    await expect(login(credentials)).rejects.toThrow(errorMessage);

    // Assert token state
    expect(getAccessToken()).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should throw an error on registration failure and NOT save the token', async () => {
    const errorMessage = 'Email already registered.';
    mockFetchFailure(errorMessage);

    const newUserData = { name: 'dup', email: 'dup@licate.com', password: 'pwd', venueManager: false };

    // Act & Assert for rejection
    await expect(register(newUserData)).rejects.toThrow(errorMessage);

    // Assert token state
    expect(getAccessToken()).toBeNull();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

