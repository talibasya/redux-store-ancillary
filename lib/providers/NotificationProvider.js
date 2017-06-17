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
    this.closeTimeouts = [];

    this.removeNotifComponent = function (id) {
      return function () {
        _this.showing = _this.showing.filter(function (notifItem) {
          return notifItem.props.id !== id;
        });
        _this.forceUpdate();
      };
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

  componentWillUnmount() {
    this.closeTimeouts.map(function (timeoutItem) {
      return clearTimeout(timeoutItem);
    });
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
        return _react2.default.cloneElement(_this2.props.children.props.children, _extends({}, notifItem, {
          open: true
        }));
      });

      formatOldNotifications = this.showing.map(function (notifItem) {
        const stillOpen = nextProps.notification.some(function (nextNotif) {
          return nextNotif.id === notifItem.props.id;
        });
        if (stillOpen) return notifItem;

        let timeout = 0;
        if (notifItem.props.timeout) timeout = notifItem.props.timeout;

        _this2.closeTimeouts.push(setTimeout(_this2.removeNotifComponent(notifItem.props.id), timeout));

        return _react2.default.cloneElement(notifItem, _extends({}, notifItem.props, {
          open: false
        }));
      });

      this.showing = [...formatOldNotifications, ...formatNewNotifications];
    }
  }

  render() {

    if (!this.props.children) return null;

    const Parent = _react2.default.cloneElement(this.props.children

    // const elements = this.components.map(notifItem => (
    //   React.cloneElement(Parent.props.children, {
    //     ...notifItem
    //   })
    // ))

    );return _react2.default.createElement(
      Parent.type,
      Parent.props,
      this.showing.map(function (Component) {
        return _react2.default.createElement(Component.type, _extends({}, Component.props, { key: Component.props.id }));
      })
    );
  }
}

exports.default = AppNotification;