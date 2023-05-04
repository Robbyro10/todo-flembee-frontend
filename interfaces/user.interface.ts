
export interface IUser {
  id: string;
  email: string;
  fullName: string;
  role: 'admin' | 'user';
  active: boolean;
  token: string;
}