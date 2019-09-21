"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "NotificationProvider", {
  enumerable: true,
  get: function () {
    return _NotificationProvider2.default;
  }
});
exports.default = exports.showInfo = exports.showWarning = exports.showSuccess = exports.showError = exports.cleanStack = exports.hideNotification = exports.showNotification = exports.cleanStackType = exports.hideNotificationType = exports.showNotificationType = void 0;

var _math = require("../utils/math");

var _NotificationProvider2 = _interopRequireDefault(require("../providers/NotificationProvider"));

var _ACTION_HANDLERS;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var showNotificationType = 'MIDDLEWARE/SHOW_NOTIFICATION';
exports.showNotificationType = showNotificationType;
var hideNotificationType = 'MIDDLEWARE/HIDE_NOTIFICATION';
exports.hideNotificationType = hideNotificationType;
var cleanStackType = 'MIDDLEWARE/CLEAR_STACK';
exports.cleanStackType = cleanStackType;

var showNotification = function (level, payload) {
  return {
    type: showNotificationType,
    level: level,
    payload: payload,
    id: (0, _math.randomId)()
  };
};

exports.showNotification = showNotification;

var hideNotification = function (id) {
  return {
    type: hideNotificationType,
    payload: {
      id: id
    }
  };
};

exports.hideNotification = hideNotification;

var cleanStack = function () {
  return {
    type: cleanStackType
  };
};

exports.cleanStack = cleanStack;

var showError = function (payload) {
  return showNotification('error', payload);
};

exports.showError = showError;

var showSuccess = function (payload) {
  return showNotification('success', payload);
};

exports.showSuccess = showSuccess;

var showWarning = function (payload) {
  return showNotification('warning', payload);
};

exports.showWarning = showWarning;

var showInfo = function (payload) {
  return showNotification('info', payload);
};

exports.showInfo = showInfo;
var initialState = [];

var deepCopy = function (state) {
  return _toConsumableArray(state);
};

var ACTION_HANDLERS = (_ACTION_HANDLERS = {}, _defineProperty(_ACTION_HANDLERS, showNotificationType, function (state, action) {
  var newState = deepCopy(state);
  newState.push({
    id: action.id,
    level: action.level,
    params: action.payload
  });
  return newState;
}), _defineProperty(_ACTION_HANDLERS, hideNotificationType, function (state, action) {
  var newState = state.filter(function (notificationItem) {
    return notificationItem.id !== action.payload.id;
  });
  return newState;
}), _defineProperty(_ACTION_HANDLERS, cleanStackType, function (state, action) {
  return [];
}), _ACTION_HANDLERS);

var reducer = function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

var _default = reducer;
exports.default = _default;