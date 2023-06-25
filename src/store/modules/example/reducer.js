import * as types from '../types';

const initialState = {
  buttonClicked: false,
};
// eslint-disable-next-line default-param-last
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.CLICKED_BUTTON_SUCCESS: {
      console.log('success');
      const newState = { ...state };
      newState.buttonClicked = !newState.buttonClicked;
      return newState;
    }
    case types.CLICKED_BUTTON_FAILURE: {
      console.log('error');
      return state;
    }
    case types.CLICKED_BUTTON_REQUEST: {
      console.log('Doing req');
      return state;
    }

    default: return state;
  }
}
