import { GET_TOKEN, SET_TOKEN, AUTH_FAILURE, /*User,*/ AuthState } from '../types';

interface GetTokenAction {
  type: typeof GET_TOKEN,
  code: string
};

interface SetTokenAction {
  type: typeof SET_TOKEN,
  token: string
};

interface AuthFailureAction {
  type: typeof AUTH_FAILURE
};

type ActionTypes = SetTokenAction | GetTokenAction | AuthFailureAction;

const InitialState: AuthState = {};

const reducer = (state = InitialState, action: ActionTypes) => {
  switch (action.type) {
     case GET_TOKEN:
        return { ...state, loading: true };
     case SET_TOKEN:
        return { ...state, token: action.token, loading: false };
     case AUTH_FAILURE:
        return { ...state, loading: false, redirectToLogin: true };
     default:
        return state;
   }
};
export default reducer;
