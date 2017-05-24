'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanStack = exports.updatePopupById = exports.updatePopup = exports.hidePopupById = exports.hidePopup = exports.showPopup = exports.cleanStackType = exports.updatePopupByIdType = exports.updatePopupType = exports.hidePopupByIdType = exports.hidePopupType = exports.showPopupType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _math = require('../utils/math');

// TODO: allow set from outside
let showPopupType = exports.showPopupType = 'MIDDLEWARE/SHOW_POPUP';

let hidePopupType = exports.hidePopupType = 'MIDDLEWARE/HIDE_POPUP';
let hidePopupByIdType = exports.hidePopupByIdType = 'MIDDLEWARE/HIDE_POPUP_BY_ID';

let updatePopupType = exports.updatePopupType = 'MIDDLEWARE/UPDATE_POPUP';
let updatePopupByIdType = exports.updatePopupByIdType = 'MIDDLEWARE/UPDATE_POPUP_BY_ID';

let cleanStackType = exports.cleanStackType = 'MIDDLEWARE/CLEAN_STACK';

const showPopup = exports.showPopup = (name, payload, id) => ({
  type: showPopupType,
  name, id, payload
});

const hidePopup = exports.hidePopup = name => ({
  type: hidePopupType,
  name
});

const hidePopupById = exports.hidePopupById = id => ({
  type: hidePopupByIdType,
  id
});

const updatePopup = exports.updatePopup = (name, payload) => ({
  type: updatePopupType,
  name, payload
});

const updatePopupById = exports.updatePopupById = (id, payload) => ({
  type: updatePopupByIdType,
  name, payload
});

const cleanStack = exports.cleanStack = () => ({
  type: cleanStackType
});

const initialState = [];

const deepCopy = state => {
  return state.map(popup => _extends({}, popup)).slice();
};

const ACTION_HANDLERS = {
  [showPopupType]: (state, action) => {
    const newState = deepCopy(state);

    newState.push({
      id: action.id !== undefined ? action.id : (0, _math.randomId)(),
      name: action.name,
      params: action.payload
    });

    return newState;
  },
  [hidePopupType]: (state, action) => {
    let newState = deepCopy(state);

    newState = newState.filter(popupItem => popupItem.name !== action.name);
    return newState;
  },
  [hidePopupByIdType]: (state, action) => {
    let newState = deepCopy(state);
    newState = newState.filter(popupItem => popupItem.id !== action.id);

    return newState;
  },
  [updatePopupType]: (state, action) => {
    let copyState = deepCopy(state);

    const newState = copyState.map(popup => {
      if (popup.name !== action.name) return popup;
      const newPopupState = _extends({}, popup, {
        params: action.payload
      });
    });

    return newState;
  },
  [updatePopupByIdType]: (state, action) => {
    let copyState = deepCopy(state);

    const newState = copyState.map(popup => {
      if (popup.id !== action.id) return popup;
      const newPopupState = _extends({}, popup, {
        params: action.payload
      });
    });

    return newState;
  },
  [cleanStackType]: (state, action) => {
    return [];
  }
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

exports.default = reducer;