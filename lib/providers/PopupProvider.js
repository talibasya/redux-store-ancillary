"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var PopupProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PopupProvider, _React$Component);

  function PopupProvider() {
    _classCallCheck(this, PopupProvider);

    return _possibleConstructorReturn(this, _getPrototypeOf(PopupProvider).apply(this, arguments));
  }

  _createClass(PopupProvider, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          popup = _this$props.popup;

      var Parent = _react.default.cloneElement(children);

      var modifiedChildren = [];

      _react.default.Children.forEach(children, function (child) {
        _react.default.Children.forEach(child.props.children, function (child2) {
          var currentPopup = popup.find(function (popup) {
            return popup.name === child2.props.name;
          });
          var params = currentPopup ? currentPopup.params : undefined;
          var open = !!currentPopup;

          var clonedElement = _react.default.cloneElement(child2, {
            open: open,
            params: params
          });

          modifiedChildren.push(clonedElement);
        });
      }); // console.log('children2', modifiedChildren[0]);


      return _react.default.createElement(Parent.type, Parent.props, modifiedChildren.map(function (Component) {
        return _react.default.createElement(Component.type, _extends({}, Component.props, {
          key: Component.props.name
        }));
      }));
    }
  }]);

  return PopupProvider;
}(_react.default.Component);

var _default = PopupProvider;
exports.default = _default;