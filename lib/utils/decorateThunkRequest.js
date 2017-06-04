'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _spinner = require('../reducers/spinner');

var _notification = require('../reducers/notification');

const decorateThunkRequest = function ({ onCall, onSuccess, onError }) {
  return function (params) {
    let call, success, spinner;
    if (params) {
      call = params.call;
      success = params.success;
      spinner = params.spinner;
    }

    return function (dispatch, getState) {
      dispatch((0, _spinner.showSpinner)(spinner));
      onCall({ dispatch, getState, call }).then(function (...response) {
        dispatch((0, _spinner.hideSpinner)(spinner));
        onSuccess({ dispatch, getState, response, success });
      }).catch(function (error) {
        dispatch((0, _spinner.hideSpinner)(spinner));
        if (onError) onError({ dispatch, getState, call, error });else dispatch((0, _notification.showError)(error));
      });
    };
  };
};

exports.default = decorateThunkRequest;