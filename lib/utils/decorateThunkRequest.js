"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spinner = require("../reducers/spinner");

var _notification = require("../reducers/notification");

var decorateThunkRequest = function (_ref) {
  var onCall = _ref.onCall,
      onSuccess = _ref.onSuccess,
      onError = _ref.onError;
  return function (params) {
    var call, success, spinner;

    if (params) {
      call = params.call;
      success = params.success;
      spinner = params.spinner;
    }

    return function (dispatch, getState) {
      dispatch((0, _spinner.showSpinner)(spinner));
      onCall({
        dispatch: dispatch,
        getState: getState,
        call: call
      }).then(function () {
        dispatch((0, _spinner.hideSpinner)(spinner));

        for (var _len = arguments.length, response = new Array(_len), _key = 0; _key < _len; _key++) {
          response[_key] = arguments[_key];
        }

        onSuccess({
          dispatch: dispatch,
          getState: getState,
          response: response,
          success: success
        });
      }).catch(function (error) {
        dispatch((0, _spinner.hideSpinner)(spinner));
        if (onError) onError({
          dispatch: dispatch,
          getState: getState,
          call: call,
          error: error
        });else dispatch((0, _notification.showError)(error));
      });
    };
  };
};

var _default = decorateThunkRequest;
exports.default = _default;