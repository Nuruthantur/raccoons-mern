export interface User {
  _id: string;
  email: string;
  username?: string;
  createdAt: string;
}

export interface UserCredentials {
  email: string;
  password: string;
  userName: string;
  userImage?: string;
}
