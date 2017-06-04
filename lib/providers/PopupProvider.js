'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
      _react2.default.Children.toArray(modifiedChildren)
    );
  }
}

exports.default = PopupProvider;