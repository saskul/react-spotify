import { getToken, refreshToken } from './authService';
import { getUserPlaylists } from './spotifyService';
import { getUser } from './userService';

const authService = { getToken, refreshToken };

const spotifyService = { getUserPlaylists };

const userService = { getUser };

export {
  authService,
  spotifyService,
  userService
};