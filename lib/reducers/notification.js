'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showInfo = exports.showWarning = exports.showSuccess = exports.showError = exports.hideNotification = exports.showNotification = exports.hideNotificationType = exports.showNotificationType = exports.NotificationProvider = undefined;

var _math = require('../utils/math');

var _NotificationProvider2 = require('../providers/NotificationProvider');

var _NotificationProvider3 = _interopRequireDefault(_NotificationProvider2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.NotificationProvider = _NotificationProvider3.default;
let showNotificationType = exports.showNotificationType = 'MIDDLEWARE/SHOW_NOTIFICATION';
let hideNotificationType = exports.hideNotificationType = 'MIDDLEWARE/HIDE_NOTIFICATION';

const showNotification = exports.showNotification = function (level, payload) {
  return {
    type: showNotificationType,
    level,
    payload
  };
};

const hideNotification = exports.hideNotification = function (id) {
  return {
    type: hideNotificationType,
    payload: {
      id
    }
  };
};

const showError = exports.showError = function (payload) {
  return showNotification('error', payload);
};
const showSuccess = exports.showSuccess = function (payload) {
  return showNotification('success', payload);
};
const showWarning = exports.showWarning = function (payload) {
  return showNotification('warning', payload);
};
const showInfo = exports.showInfo = function (payload) {
  return showNotification('info', payload);
};

const initialState = [];

const deepCopy = function (state) {
  return [...state];
};

const ACTION_HANDLERS = {
  [showNotificationType]: function (state, action) {
    const newState = deepCopy(state);

    newState.push({
      id: (0, _math.randomId)(),
      level: action.level,
      params: action.payload
    });

    return newState;
  },
  [hideNotificationType]: function (state, action) {
    const newState = state.filter(function (notificationItem) {
      return notificationItem.id !== action.payload.id;
    });
    return newState;
  }
};

const reducer = function (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

exports.default = reducer;