'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
let showNotificationType = exports.showNotificationType = 'MIDDLEWARE/SHOW_NOTIFICATION';
let hideNotificationType = exports.hideNotificationType = 'MIDDLEWARE/HIDE_NOTIFICATION';

const showNotification = exports.showNotification = (level, payload) => ({
  type: showNotificationType,
  level,
  payload
});

const hideNotification = exports.hideNotification = id => ({
  type: hideNotificationType,
  payload: {
    id
  }
});

const showError = exports.showError = payload => showNotification('error', payload);
const showSuccess = exports.showSuccess = payload => showNotification('success', payload);
const showWarning = exports.showWarning = payload => showNotification('warning', payload);
const showInfo = exports.showInfo = payload => showNotification('info', payload);

const initialState = [];

const deepCopy = state => [...state];

const randomId = () => {
  const randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const uniqid = randLetter + Date.now();
  return uniqid;
};

const ACTION_HANDLERS = {
  [showNotificationType]: (state, action) => {
    const newState = deepCopy(state);

    newState.push({
      id: randomId(),
      level: action.level,
      params: action.payload
    });

    return newState;
  },
  [hideNotificationType]: (state, action) => {
    const newState = state.filter(notificationItem => notificationItem.id !== action.payload.id);
    return newState;
  }
};

const reducer = (state = initialState, action) => {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
};

exports.default = reducer;