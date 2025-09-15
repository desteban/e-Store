export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: string;
  avatar: string;
}

export interface CreateUserDTO extends Omit<User, 'id' | 'role'> {}

export interface UpdateUserDTO extends Partial<Omit<User, 'id' | 'role'>> {}
