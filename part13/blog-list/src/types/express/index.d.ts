declare module 'express-serve-static-core' {
  interface Request {
    decodedToken: {
      username: string;
      id: number;
      sessionId: number;
    };
  }
}

export {};
