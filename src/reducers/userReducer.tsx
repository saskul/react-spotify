import { GET_USER, SET_USER, USER_FAILURE, Token } from '../types';

interface GetUserAction {
  type: typeof GET_USER,
  token: Token
};

interface SetUserAction {
  type: typeof SET_USER,
  user: any
};

interface UserErrorAction {
  type: typeof USER_FAILURE,
  error: any
};

type ActionTypes = GetUserAction | SetUserAction | UserErrorAction;

const InitialState: object = {};

const reducer = (state = InitialState, action: ActionTypes) => {
  switch (action.type) {
     case GET_USER:
        return { loading: true };
     case SET_USER:
        return { ...state, data: action.user, loading: false }
     case USER_FAILURE:
        return { ...state, error: action.error, loading: false }
     default:
        return state;
   }
};
export default reducer;
