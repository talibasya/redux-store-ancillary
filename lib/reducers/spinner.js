'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ACTION_HANDLERS;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var showSpinnerType = exports.showSpinnerType = 'MIDDLEWARE/SHOW_SPINNER';
var hideSpinnerType = exports.hideSpinnerType = 'MIDDLEWARE/HIDE_SPINNER';

var showSpinner = exports.showSpinner = function (payload) {
  return {
    type: showSpinnerType,
    payload: payload
  };
};

var hideSpinner = exports.hideSpinner = function (payload) {
  return {
    type: hideSpinnerType,
    payload: payload
  };
};

var initialState = {
  items: {},
  rendering: null
};

var deepCopy = function (state) {
  return _extends({}, state, { items: _extends({}, state.items) });
};

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, showSpinnerType, function (state, action) {
  var newState = deepCopy(state);

  if (action.payload && action.payload.id) {
    newState.items[action.payload.id] = {
      params: action.payload,
      id: action.payload.id
    };
  } else {
    newState.rendering = {
      params: action.payload
    };
  }

  return newState;
}), _defineProperty(_ACTION_HANDLERS, hideSpinnerType, function (state, action) {
  var newState = deepCopy(state);

  if (action.payload && action.payload.id) {
    delete newState.items[action.payload.id];
  } else {
    newState.rendering = null;
  }

  return newState;
}), _ACTION_HANDLERS);

var reducer = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

exports.default = reducer;