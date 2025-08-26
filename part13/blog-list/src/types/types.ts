export interface Blog {
  id: number;
  author?: string;
  url: string;
  title: string;
  likes: number;
}

export interface LoginUser {
  token: string;
  username: string;
  name: string;
}

export interface UserData {
  username: string;
  password: string;
}

export interface DecodedToken {
  username: string;
  id: number;
  sessionId: number;
}
