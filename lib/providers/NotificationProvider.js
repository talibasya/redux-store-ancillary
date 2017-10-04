'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _notification = require('../reducers/notification');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AppNotification = function (_React$Component) {
  _inherits(AppNotification, _React$Component);

  function AppNotification(props) {
    _classCallCheck(this, AppNotification);

    var _this = _possibleConstructorReturn(this, (AppNotification.__proto__ || Object.getPrototypeOf(AppNotification)).call(this, props));

    _this.showing = [];
    _this.withChildren = false;
    _this.closeTimeouts = [];

    _this.removeNotifComponent = function (id) {
      return function () {
        _this.showing = _this.showing.filter(function (notifItem) {
          return notifItem.props.id !== id;
        });
        _this.forceUpdate();
      };
    };

    _this.onRemoveHandler = function (id) {
      return function () {
        _this.props.hideNotification(id);
      };
    };

    _this.getArrayDifference = function (arr1, arr2) {
      return arr1.filter(function (notif1) {
        return !arr2.some(function (notif2) {
          return notif2.id === notif1.id;
        });
      });
    };

    _this.withChildren = !!_this.props.children;
    return _this;
  }

  _createClass(AppNotification, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.closeTimeouts.map(function (timeoutItem) {
        return clearTimeout(timeoutItem);
      });
    }
  }, {
    key: 'componentWillUpdate',
    value: function componentWillUpdate(nextProps, nextState) {
      var _this2 = this;

      var newNotifications = this.getArrayDifference(nextProps.notification, this.props.notification);

      if (newNotifications.length) {
        if (this.props.onShow) this.props.onShow(newNotifications);
        if (this.props.autoClose) newNotifications.map(function (closeNotification) {
          return _this2.props.autoClose(closeNotification.id);
        });
      }

      var formatNewNotifications = [];
      var formatOldNotifications = [];

      if (this.withChildren) {
        formatNewNotifications = newNotifications.map(function (notifItem) {
          return _react2.default.cloneElement(_this2.props.children.props.children, _extends({}, notifItem, {
            open: true
          }));
        });

        formatOldNotifications = this.showing.map(function (notifItem) {
          var stillOpen = nextProps.notification.some(function (nextNotif) {
            return nextNotif.id === notifItem.props.id;
          });
          if (stillOpen) return notifItem;

          var timeout = 0;
          if (notifItem.props.timeout) timeout = notifItem.props.timeout;

          _this2.closeTimeouts.push(setTimeout(_this2.removeNotifComponent(notifItem.props.id), timeout));

          return _react2.default.cloneElement(notifItem, _extends({}, notifItem.props, {
            open: false
          }));
        });

        this.showing = [].concat(_toConsumableArray(formatOldNotifications), _toConsumableArray(formatNewNotifications));
      }
    }
  }, {
    key: 'render',
    value: function render() {

      if (!this.props.children) return null;

      var Parent = _react2.default.cloneElement(this.props.children);

      // const elements = this.components.map(notifItem => (
      //   React.cloneElement(Parent.props.children, {
      //     ...notifItem
      //   })
      // ))

      return _react2.default.createElement(
        Parent.type,
        Parent.props,
        this.showing.map(function (Component) {
          return _react2.default.createElement(Component.type, _extends({}, Component.props, { key: Component.props.id }));
        })
      );
    }
  }]);

  return AppNotification;
}(_react2.default.Component);

exports.default = AppNotification;