"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactNative = require("react-native");

var _Ionicons = require("react-native-vector-icons/Ionicons");

var _Ionicons2 = _interopRequireDefault(_Ionicons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Option = require("./option");
var Overlay = require("./overlay");
var Items = require("./items");

var window = _reactNative.Dimensions.get("window");

var SELECT = "SELECT";

var styles = _reactNative.StyleSheet.create({
  container: {
    borderColor: "#BDBDC1",
    borderWidth: 2 / window.scale
  }
});

var Select = function (_React$Component) {
  _inherits(Select, _React$Component);

  function Select(props) {
    _classCallCheck(this, Select);

    var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, props));

    _this.pageX = 0;
    _this.pageY = 0;

    _this.state = {
      value: _this.props.initKey ? _this.props.data.filter(function (item) {
        return item.key === _this.props.initKey;
      })[0].label : _this.props.placeholder || null,
      show_options: false,
      search_text: ""
    };
    return _this;
  }

  _createClass(Select, [{
    key: "_reset",
    value: function _reset() {
      var placeholder = this.props.placeholder;

      this.setState({ value: placeholder, show_options: false });
      this.props.onSelect(null, null);
    }
  }, {
    key: "_onPress",
    value: function _onPress() {
      if (this.state.show_options) {
        this.setState({ show_options: false, search_text: "" });
      } else {
        this.setState({ show_options: true });
      }
    }
  }, {
    key: "_handleSelect",
    value: function _handleSelect(key, label) {
      this.setState({ show_options: false, value: label, search_text: "" });
      this.props.onSelect(key, label);
    }
  }, {
    key: "_onChangeInput",
    value: function _onChangeInput(text) {
      this.setState({ search_text: text });
    }
  }, {
    key: "_onOverlayPress",
    value: function _onOverlayPress() {
      this.setState({
        show_options: false,
        search_text: ""
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          width = _props.width,
          height = _props.height,
          data = _props.data,
          style = _props.style,
          styleOption = _props.styleOption,
          styleText = _props.styleText;

      var dimensions = { width: width, height: height };

      return _react2.default.createElement(
        _reactNative.View,
        null,
        this.state.show_options && _react2.default.createElement(Overlay, { onPress: this._onOverlayPress.bind(this) }),
        _react2.default.createElement(
          _reactNative.View,
          {
            style: [styles.container, style, dimensions, { flexDirection: "row", justifyContent: "space-between" }]
          },
          this.state.show_options && this.props.search ? _react2.default.createElement(
            _reactNative.TouchableWithoutFeedback,
            { onPress: this._onPress.bind(this) },
            _react2.default.createElement(
              _reactNative.View,
              {
                style: {
                  flex: 3,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }
              },
              _react2.default.createElement(_Ionicons2.default, {
                name: "ios-search-outline",
                style: {
                  color: "black",
                  fontSize: 26,
                  marginLeft: 5,
                  flex: 1
                }
              }),
              _react2.default.createElement(_reactNative.TextInput, {
                onChangeText: this._onChangeInput.bind(this),
                placeholder: "Search",
                underlineColorAndroid: "transparent",
                style: { flex: 5 }
              })
            )
          ) : _react2.default.createElement(
            _reactNative.TouchableWithoutFeedback,
            { onPress: this._onPress.bind(this) },
            _react2.default.createElement(
              _reactNative.View,
              {
                style: {
                  flex: 3
                }
              },
              _react2.default.createElement(
                Option,
                { style: styleOption, styleText: styleText },
                this.state.value
              )
            )
          ),
          _react2.default.createElement(
            _reactNative.View,
            {
              style: {
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center"
              }
            },
            _react2.default.createElement(
              _reactNative.TouchableWithoutFeedback,
              { onPress: this._reset.bind(this) },
              _react2.default.createElement(_Ionicons2.default, {
                name: "ios-close",
                style: {
                  color: "black",
                  fontSize: 26,
                  marginRight: 15
                }
              })
            ),
            _react2.default.createElement(
              _reactNative.TouchableWithoutFeedback,
              { onPress: this._onPress.bind(this) },
              _react2.default.createElement(_Ionicons2.default, {
                name: "md-arrow-dropdown",
                style: {
                  color: "black",
                  fontSize: 24,
                  marginRight: 5
                }
              })
            )
          )
        ),
        this.state.show_options && _react2.default.createElement(Items, {
          items: data.filter(function (item) {
            var parts = _this2.state.search_text.trim().split(/[ \-:]+/);
            var regex = new RegExp("(" + parts.join("|") + ")", "ig");
            return regex.test(item.label);
          }),
          width: width,
          height: height,
          onPress: this._handleSelect.bind(this)
        })
      );
    }
  }]);

  return Select;
}(_react2.default.Component);

Select.propTypes = {
  width: _react2.default.PropTypes.number,
  height: _react2.default.PropTypes.number,
  onSelect: _react2.default.PropTypes.func,
  search: _react2.default.PropTypes.bool,
  initKey: _react2.default.PropTypes.string
};

Select.defaultProps = {
  width: 200,
  height: 40,
  onSelect: function onSelect() {},
  search: true
};

module.exports = Select;