

export interface CreateUser {
  email: string;
  password: string;
  name: string;
}

export interface User {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}
