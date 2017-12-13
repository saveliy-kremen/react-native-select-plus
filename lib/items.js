"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var window = _reactNative.Dimensions.get("window");

var styles = _reactNative.StyleSheet.create({
  scrollView: {
    height: 120,
    width: 198 //TODO: this needs to be dynamic
  },
  container: {
    position: "absolute",
    borderColor: "#BDBDC1",
    borderWidth: 2 / window.scale,
    borderTopColor: "transparent",
    backgroundColor: "white",
    opacity: 0.9,
    zIndex: 9
  }
});

var Items = function (_React$Component) {
  _inherits(Items, _React$Component);

  function Items(props) {
    _classCallCheck(this, Items);

    return _possibleConstructorReturn(this, (Items.__proto__ || Object.getPrototypeOf(Items)).call(this, props));
  }

  _createClass(Items, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          items = _props.items,
          _onPress = _props.onPress,
          width = _props.width,
          height = _props.height;


      var renderedItems = items.map(function (item) {
        return item.section ? _react2.default.createElement(
          _reactNative.View,
          { style: { padding: 5 } },
          _react2.default.createElement(
            _reactNative.Text,
            { style: { fontWeight: "bold" } },
            item.label
          )
        ) : _react2.default.createElement(
          _reactNative.TouchableWithoutFeedback,
          {
            onPress: function onPress() {
              return _onPress(item.key, item.label);
            },
            key: item.key
          },
          _react2.default.createElement(
            _reactNative.View,
            { style: { padding: 5 } },
            _react2.default.createElement(
              _reactNative.Text,
              { style: { marginLeft: 20 } },
              item.label
            )
          )
        );
      });

      return _react2.default.createElement(
        _reactNative.View,
        { style: [styles.container, { top: height }] },
        _react2.default.createElement(
          _reactNative.ScrollView,
          {
            style: { width: width - 2, height: height * 3 },
            automaticallyAdjustContentInsets: false,
            bounces: false
          },
          renderedItems
        )
      );
    }
  }]);

  return Items;
}(_react2.default.Component);

Items.propTypes = {
  onPress: _react2.default.PropTypes.func
};

Items.defaultProps = {
  width: 0,
  height: 0,
  onPress: function onPress() {}
};

module.exports = Items;