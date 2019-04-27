import { createAction, handleActions } from "redux-actions";
import { Map, List } from "immutable";
import * as PostAPI from "lib/api/post";
import { pender } from "redux-pender";

const CHANGE_INPUT = "posts/CHANGE_INPUT";
const INITIALIZE_FORM = "posts/INITIALIZE_FORM";
const GET_POST_LIST = "posts/GET_POST_LIST";
const SEARCH_BY_TITLE = "posts/SEARCH_BY_TITLE";
const SEARCH_BY_USERNAME = "posts/SEARCH_BY_USERNAME";

export const changeInput = createAction(CHANGE_INPUT);
export const initializeForm = createAction(INITIALIZE_FORM);
export const getPostList = createAction(GET_POST_LIST, PostAPI.getPostsList);
export const searchByTitle = createAction(
  SEARCH_BY_TITLE,
  PostAPI.searchByTitle
);
export const searchByUsername = createAction(
  SEARCH_BY_USERNAME,
  PostAPI.searchByUsername
);

const initialState = Map({
  list: List([
    Map({
      post: Map({
        date: "",
        is_edited: "",
        photo: "",
        tags: "",
        text: "",
        title: "",
        _id: "",
        username: ""
      })
    })
  ]),
  search: Map({
    title: ""
  }),
  write: Map({
    form: Map({
      title: "",
      username: "",
      text: "",
      photo: "",
      tags: "",
    })
    // meta: Map({
    //   likes: 0,
    //   favorites: 0
    // })
  }),
  result: Map({})
});

export default handleActions(
  {
    [CHANGE_INPUT]: (state, action) => {
      const { value } = action.payload;
      return state.setIn(["search", "title"], value);
    },
    [INITIALIZE_FORM]: (state, action) => {
      const initialForm = initialState.get(action.payload);
      return state.set(action.payload, initialForm);
    },
    ...pender({
      type: GET_POST_LIST,
      onSuccess: (state, action) => {
        state.setIn(["list", "post"], action.payload.data);
      }
    }),
  },
  initialState
);
