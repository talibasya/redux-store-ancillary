"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _notification = require("../reducers/notification");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AppNotification =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppNotification, _React$Component);

  function AppNotification(props) {
    var _this;

    _classCallCheck(this, AppNotification);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppNotification).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "showing", []);

    _defineProperty(_assertThisInitialized(_this), "withChildren", false);

    _defineProperty(_assertThisInitialized(_this), "closeTimeouts", []);

    _defineProperty(_assertThisInitialized(_this), "removeNotifComponent", function (id) {
      return function () {
        _this.showing = _this.showing.filter(function (notifItem) {
          return notifItem.props.id !== id;
        });

        _this.forceUpdate();
      };
    });

    _defineProperty(_assertThisInitialized(_this), "onRemoveHandler", function (id) {
      return function () {
        _this.props.hideNotification(id);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getArrayDifference", function (arr1, arr2) {
      return arr1.filter(function (notif1) {
        return !arr2.some(function (notif2) {
          return notif2.id === notif1.id;
        });
      });
    });

    _this.withChildren = !!_this.props.children;
    return _this;
  }

  _createClass(AppNotification, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.closeTimeouts.map(function (timeoutItem) {
        return clearTimeout(timeoutItem);
      });
    }
  }, {
    key: "componentWillUpdate",
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
          return _react.default.cloneElement(_this2.props.children.props.children, _objectSpread({}, notifItem, {
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

          return _react.default.cloneElement(notifItem, _objectSpread({}, notifItem.props, {
            open: false
          }));
        });
        this.showing = [].concat(_toConsumableArray(formatOldNotifications), _toConsumableArray(formatNewNotifications));
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.props.children) return null;

      var Parent = _react.default.cloneElement(this.props.children); // const elements = this.components.map(notifItem => (
      //   React.cloneElement(Parent.props.children, {
      //     ...notifItem
      //   })
      // ))


      return _react.default.createElement(Parent.type, Parent.props, this.showing.map(function (Component) {
        return _react.default.createElement(Component.type, _extends({}, Component.props, {
          key: Component.props.id
        }));
      }));
    }
  }]);

  return AppNotification;
}(_react.default.Component);

var _default = AppNotification;
exports.default = _default;