import { GET_USER_PLAYLISTS, SET_USER_PLAYLISTS, SPOTIFY_FAILURE, Token } from '../types';

interface GetUserPlaylistsAction {
  type: typeof GET_USER_PLAYLISTS,
  token: Token
};

interface SetUserPlaylistsAction {
  type: typeof SET_USER_PLAYLISTS,
  playlists: any
};

interface SpotifyErrorAction {
  type: typeof SPOTIFY_FAILURE,
  error: any
};

type ActionTypes = GetUserPlaylistsAction | SetUserPlaylistsAction | SpotifyErrorAction;

const InitialState: object = {};

const reducer = (state = InitialState, action: ActionTypes) => {
  switch (action.type) {
     case GET_USER_PLAYLISTS:
        return { loading: true };
     case SET_USER_PLAYLISTS:
        return { ...state, playlists: action.playlists }
     case SPOTIFY_FAILURE:
        return { ...state, error: action.error, loading: false }
     default:
        return state;
   }
};
export default reducer;
