import { getToken, refreshToken } from './authService';
import { getUserPlaylists, getTracks } from './spotifyService';
import { getUser } from './userService';

const authService = { getToken, refreshToken };

const spotifyService = { getUserPlaylists, getTracks };

const userService = { getUser };

export {
  authService,
  spotifyService,
  userService
};