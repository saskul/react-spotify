import { getToken, refreshToken } from './authService';
import { getUserPlaylists, getTracks, getTrack } from './spotifyService';
import { getUser } from './userService';

const authService = { getToken, refreshToken };

const spotifyService = { getUserPlaylists, getTracks, getTrack };

const userService = { getUser };

export {
  authService,
  spotifyService,
  userService
};