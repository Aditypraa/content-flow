import {
  User,
  ProfileResponse,
  LoginResponse,
  RegisterResponse,
} from '@/types/auth';

// Dummy users data
export const dummyUsers: User[] = [
  {
    id: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    username: 'admin_user',
    role: 'Admin',
    createdAt: '2025-06-23T01:20:10.113Z',
    updatedAt: '2025-06-23T01:20:10.113Z',
  },
  {
    id: 'b2c3d4e5-f6g7-4h8i-9j0k-l1m2n3o4p5q6',
    username: 'tech_writer',
    role: 'User',
    createdAt: '2025-06-22T09:15:00.000Z',
    updatedAt: '2025-06-22T09:15:00.000Z',
  },
  {
    id: 'c3d4e5f6-g7h8-4i9j-0k1l-m2n3o4p5q6r7',
    username: 'business_expert',
    role: 'User',
    createdAt: '2025-06-21T11:30:00.000Z',
    updatedAt: '2025-06-21T11:30:00.000Z',
  },
  {
    id: 'd4e5f6g7-h8i9-4j0k-1l2m-n3o4p5q6r7s8',
    username: 'design_guru',
    role: 'User',
    createdAt: '2025-06-20T13:45:00.000Z',
    updatedAt: '2025-06-20T13:45:00.000Z',
  },
];

// Dummy login response
export function createDummyLoginResponse(username: string): LoginResponse {
  const user = dummyUsers.find((u) => u.username === username);
  if (!user) {
    throw new Error('User not found');
  }

  return {
    token: `dummy_token_${user.id}_${Date.now()}`,
    role: user.role,
  };
}

// Dummy register response
export function createDummyRegisterResponse(
  username: string,
  role: 'User' | 'Admin',
): RegisterResponse {
  const newUser: RegisterResponse = {
    id: `new_user_${Date.now()}`,
    username,
    role,
    password: '$2a$10$dummy_hashed_password_placeholder',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return newUser;
}

// Dummy profile response
export function createDummyProfileResponse(userId: string): ProfileResponse {
  const user = dummyUsers.find((u) => u.id === userId);
  if (!user) {
    throw new Error('User not found');
  }

  return {
    id: user.id,
    username: user.username,
    role: user.role,
  };
}

// Validate dummy credentials
export function validateDummyCredentials(
  username: string,
  password: string,
): boolean {
  // For dummy data, accept these test credentials
  const validCredentials = [
    { username: 'admin_user', password: 'admin123' },
    { username: 'tech_writer', password: 'user123' },
    { username: 'business_expert', password: 'user123' },
    { username: 'design_guru', password: 'user123' },
    { username: 'test_admin', password: 'admin123' },
    { username: 'test_user', password: 'user123' },
  ];

  return validCredentials.some(
    (cred) => cred.username === username && cred.password === password,
  );
}

// Check if username is available
export function isDummyUsernameAvailable(username: string): boolean {
  return !dummyUsers.some((user) => user.username === username);
}
