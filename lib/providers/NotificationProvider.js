'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _notification = require('../reducers/notification');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class AppNotification extends _react2.default.Component {

  constructor(props) {
    var _this;

    _this = super(props);
    this.showing = [];
    this.withChildren = false;

    this.removeNotificationItem = function (id) {
      return function () {
        _this.showing = _this.showing.filter(function (notifItem) {
          return notifItem.id !== id;
        });
        _this.forceUpdate();
      };
    };

    this.filterActive = function (notifications) {
      const stillShowing = notifications.filter(function (propNotif) {
        return _this.showing.some(function (stateNotif) {
          return stateNotif.id === propNotif.id;
        });
      });

      return stillShowing;
    };

    this.onRemoveHandler = function (id) {
      return function () {
        _this.props.hideNotification(id);
      };
    };

    this.getArrayDifference = function (arr1, arr2) {
      return arr1.filter(function (notif1) {
        return !arr2.some(function (notif2) {
          return notif2.id === notif1.id;
        });
      });
    };

    this.withChildren = !!this.props.children;
  }

  componentWillUpdate(nextProps, nextState) {
    var _this2 = this;

    const newNotifications = this.getArrayDifference(nextProps.notification, this.props.notification);

    if (newNotifications.length) {
      if (this.props.onShow) this.props.onShow(newNotifications);
      if (this.props.autoClose) newNotifications.map(function (closeNotification) {
        return _this2.props.autoClose(closeNotification.id);
      });
    }

    let formatNewNotifications = [];
    let formatOldNotifications = [];

    if (this.withChildren) {
      formatNewNotifications = newNotifications.map(function (notifItem) {
        return _extends({}, notifItem, {
          open: true,
          updateState: _this2.removeNotificationItem(notifItem.id)
        });
      });

      if (!this.props.autoClose) {
        formatOldNotifications = this.showing.map(function (notifItem) {
          const stillOpen = nextProps.notification.some(function (nextNotif) {
            return nextNotif.id === notifItem.id;
          });
          if (stillOpen) return notifItem;

          return _extends({}, notifItem, {
            open: false
          });
        });
      }
    }

    this.showing = [...formatOldNotifications, ...formatNewNotifications];
  }

  render() {
    const Parent = _react2.default.cloneElement(this.props.children);

    const elements = this.showing.map(function (notifItem) {
      return _react2.default.cloneElement(Parent.props.children, _extends({}, notifItem));
    });

    return _react2.default.createElement(
      Parent.type,
      Parent.props,
      _react2.default.Children.toArray(elements)
    );
  }
}

exports.default = AppNotification;