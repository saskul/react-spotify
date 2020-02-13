import { getToken, refreshToken } from './authService';
import { getUserPlaylists } from './spotifyService';

const authService = { getToken, refreshToken };

const spotifyService = { getUserPlaylists };

export {
  authService,
  spotifyService
};