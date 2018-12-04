'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PopupProvider = function (_React$Component) {
  _inherits(PopupProvider, _React$Component);

  function PopupProvider() {
    _classCallCheck(this, PopupProvider);

    return _possibleConstructorReturn(this, (PopupProvider.__proto__ || Object.getPrototypeOf(PopupProvider)).apply(this, arguments));
  }

  _createClass(PopupProvider, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          popup = _props.popup;


      var Parent = _react2.default.cloneElement(children);
      var modifiedChildren = [];

      _react2.default.Children.forEach(children, function (child) {
        _react2.default.Children.forEach(child.props.children, function (child2) {
          var currentPopup = popup[child2.props.name];
          var params = currentPopup ? currentPopup.params : undefined;
          var open = !!currentPopup;

          var clonedElement = _react2.default.cloneElement(child2, { open: open, params: params });
          if (popup.findIndex(function (element) {
            return element.name === clonedElement.props.name;
          }) !== -1) {
            modifiedChildren.push(clonedElement);
          }
        });
      });

      // console.log('children2', modifiedChildren[0]);

      return _react2.default.createElement(
        Parent.type,
        Parent.props,
        modifiedChildren.map(function (Component) {
          return _react2.default.createElement(Component.type, _extends({}, Component.props, { key: Component.props.name }));
        })
      );
    }
  }]);

  return PopupProvider;
}(_react2.default.Component);

exports.default = PopupProvider;