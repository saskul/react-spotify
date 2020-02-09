import { GET_NEWS, NEWS_RECEIVED, News } from '../types';

interface State {
  news: Array<News>
};

interface NewsReceivedAction {
  type: typeof NEWS_RECEIVED,
  json: any
}
interface GetNewsAction {
  type: typeof GET_NEWS
  // payload: any
};

type ActionTypes = GetNewsAction | NewsReceivedAction;

const InitialState: State = {
  news: [
    { title: 'Header', content: 'Content' }
  ]
};

const reducer = (state = InitialState, action: ActionTypes) => {
  switch (action.type) {
     case GET_NEWS:
        return { ...state, loading: true };
     case NEWS_RECEIVED:
        return { ...state, news: action.json, loading: false };
     default:
        return state;
   }
};
export default reducer;
