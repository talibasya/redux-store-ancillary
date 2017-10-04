'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showInfo = exports.showWarning = exports.showSuccess = exports.showError = exports.cleanStack = exports.hideNotification = exports.showNotification = exports.cleanStackType = exports.hideNotificationType = exports.showNotificationType = exports.NotificationProvider = undefined;

var _ACTION_HANDLERS;

var _math = require('../utils/math');

var _NotificationProvider2 = require('../providers/NotificationProvider');

var _NotificationProvider3 = _interopRequireDefault(_NotificationProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.NotificationProvider = _NotificationProvider3.default;
var showNotificationType = exports.showNotificationType = 'MIDDLEWARE/SHOW_NOTIFICATION';
var hideNotificationType = exports.hideNotificationType = 'MIDDLEWARE/HIDE_NOTIFICATION';
var cleanStackType = exports.cleanStackType = 'MIDDLEWARE/CLEAR_STACK';

var showNotification = exports.showNotification = function (level, payload) {
  return {
    type: showNotificationType,
    level: level,
    payload: payload,
    id: (0, _math.randomId)()
  };
};

var hideNotification = exports.hideNotification = function (id) {
  return {
    type: hideNotificationType,
    payload: {
      id: id
    }
  };
};

var cleanStack = exports.cleanStack = function () {
  return {
    type: cleanStackType
  };
};

var showError = exports.showError = function (payload) {
  return showNotification('error', payload);
};
var showSuccess = exports.showSuccess = function (payload) {
  return showNotification('success', payload);
};
var showWarning = exports.showWarning = function (payload) {
  return showNotification('warning', payload);
};
var showInfo = exports.showInfo = function (payload) {
  return showNotification('info', payload);
};

var initialState = [];

var deepCopy = function (state) {
  return [].concat(_toConsumableArray(state));
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
  var action = arguments[1];

  var handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

exports.default = reducer;