import { ERROR, CLEAR_ERRORS } from '../types';

interface errorAction {
  type: typeof ERROR,
  error: any
};

interface clearErrorsAction {
  type: typeof CLEAR_ERRORS
};

type ActionTypes = errorAction | clearErrorsAction;

const InitialState: object = {};

const reducer = (state = InitialState, action: ActionTypes) => {
  switch (action.type) {
     case ERROR:
        return { error: action.error };
     case CLEAR_ERRORS:
        return {};
     default:
        return state;
   }
};
export default reducer;
