'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let showSpinnerType = exports.showSpinnerType = 'MIDDLEWARE/SHOW_SPINNER';
let hideSpinnerType = exports.hideSpinnerType = 'MIDDLEWARE/HIDE_SPINNER';

const showSpinner = exports.showSpinner = payload => ({
  type: showSpinnerType,
  payload
});

const hideSpinner = exports.hideSpinner = payload => ({
  type: hideSpinnerType,
  payload
});

const initialState = {
  list: [],
  rendering: null
};

const deepCopy = state => _extends({}, state, { list: [...state.list] });

const ACTION_HANDLERS = {
  [showSpinnerType]: (state, action) => {
    const newState = deepCopy(state);

    if (action.payload && action.payload.id) {
      newState.list.push({
        params: action.payload,
        id: action.payload.id
      });
    } else {
      newState.rendering = {
        params: action.payload
      };
    }

    return newState;
  },
  [hideSpinnerType]: (state, action) => {
    const newState = deepCopy(state);

    if (action.payload && action.payload.id) {
      newState.list = newState.list.filter(spinnerItem => spinnerItem.id !== action.payload.id);
    } else {
      newState.rendering = null;
    }

    return newState;
  }
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

exports.default = reducer;