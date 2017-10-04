'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ACTION_HANDLERS;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
  list: [],
  rendering: null
};

var deepCopy = function (state) {
  return _extends({}, state, { list: [].concat(_toConsumableArray(state.list)) });
};

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, showSpinnerType, function (state, action) {
  var newState = deepCopy(state);

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
}), _defineProperty(_ACTION_HANDLERS, hideSpinnerType, function (state, action) {
  var newState = deepCopy(state);

  if (action.payload && action.payload.id) {
    newState.list = newState.list.filter(function (spinnerItem) {
      return spinnerItem.id !== action.payload.id;
    });
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