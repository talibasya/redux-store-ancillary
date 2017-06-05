'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PopupProvider extends _react2.default.Component {

  render() {
    const { children, popup } = this.props;

    const Parent = _react2.default.cloneElement(children);
    let modifiedChildren = [];

    _react2.default.Children.forEach(children, function (child) {
      _react2.default.Children.forEach(child.props.children, function (child2) {
        const currentPopup = popup.find(function (popup) {
          return popup.name === child2.props.name;
        });
        const params = currentPopup ? currentPopup.params : undefined;
        const open = !!currentPopup;

        const clonedElement = _react2.default.cloneElement(child2, { open, params });
        modifiedChildren.push(clonedElement);
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
}

exports.default = PopupProvider;