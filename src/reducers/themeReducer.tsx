import { CHANGE_THEME } from '../types';
import themes from '../globals/themes';

interface ChangeThemeAction {
  type: typeof CHANGE_THEME,
  theme: string
};

type ActionTypes = ChangeThemeAction;

const InitialState: object = { current: themes[0] };

const reducer = (state = InitialState, action: ActionTypes) => {
  switch (action.type) {
     case CHANGE_THEME:
        return { current: action.theme };
     default:
        return state;
   }
};
export default reducer;