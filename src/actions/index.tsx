import { getToken, setToken, refreshToken } from './authActions';
import { setDetails, getTracks, getTrack } from './spotifyActions';

const authActions = { getToken, setToken, refreshToken };

const spotifyActions = { setDetails, getTracks, getTrack };

export { authActions, spotifyActions };