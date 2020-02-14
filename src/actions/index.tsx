import { getToken, setToken, refreshToken } from './authActions';
import { setDetails, getTracks } from './spotifyActions';

const authActions = { getToken, setToken, refreshToken };

const spotifyActions = { setDetails, getTracks };

export { authActions, spotifyActions };