'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanStack = exports.updatePopup = exports.hidePopup = exports.showPopup = exports.cleanStackType = exports.updatePopupType = exports.hidePopupType = exports.showPopupType = exports.PopupProvider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _PopupProvider2 = require('../providers/PopupProvider');

var _PopupProvider3 = _interopRequireDefault(_PopupProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.PopupProvider = _PopupProvider3.default;

// TODO: allow set from outside

let showPopupType = exports.showPopupType = 'MIDDLEWARE/SHOW_POPUP';
let hidePopupType = exports.hidePopupType = 'MIDDLEWARE/HIDE_POPUP';
let updatePopupType = exports.updatePopupType = 'MIDDLEWARE/UPDATE_POPUP';
let cleanStackType = exports.cleanStackType = 'MIDDLEWARE/CLEAN_STACK';

const showPopup = exports.showPopup = function (name, payload) {
  return {
    type: showPopupType,
    name, payload
  };
};

const hidePopup = exports.hidePopup = function (name) {
  return {
    type: hidePopupType,
    name
  };
};

const updatePopup = exports.updatePopup = function (name, payload) {
  return {
    type: updatePopupType,
    name, payload
  };
};

const cleanStack = exports.cleanStack = function () {
  return {
    type: cleanStackType
  };
};

const initialState = [];

const deepCopy = function (state) {
  return state.map(function (popup) {
    return _extends({}, popup);
  });
};

const ACTION_HANDLERS = {
  [showPopupType]: function (state, action) {
    const newState = deepCopy(state);

    if (!newState.some(function (popup) {
      return popup.name === action.name;
    })) {
      newState.push({
        name: action.name,
        params: action.payload
      });
    }

    return newState;
  },
  [hidePopupType]: function (state, action) {
    let newState = deepCopy(state);

    newState = newState.filter(function (popupItem) {
      return popupItem.name !== action.name;
    });
    return newState;
  },
  [updatePopupType]: function (state, action) {
    let copyState = deepCopy(state);

    const newState = copyState.map(function (popup) {
      if (popup.name !== action.name) return popup;
      return _extends({}, popup, {
        params: action.payload
      });
    });

    return newState;
  },
  [cleanStackType]: function (state, action) {
    return [];
  }
};

const reducer = function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

exports.default = reducer;