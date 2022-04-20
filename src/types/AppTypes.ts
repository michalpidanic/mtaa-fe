export type AuthData = {
  accessToken: string;
  refreshToken: string;
  userName: string;
  userId: string;
};

export type RegistrationData = {
  userName: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
};

export type UserResponse = {
  id: number;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  messageNotifications: boolean;
  callNotifications: boolean;
  mentionNotifications: boolean;
  lastSeen: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: null;
};
