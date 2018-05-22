import React from "react";
import {
  Dimensions,
  StyleSheet,
  Component,
  TouchableWithoutFeedback,
  View,
  TextInput,
  Modal
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Option = require("./option");
const Items = require("./items");

const window = Dimensions.get("window");

const SELECT = "SELECT";

const styles = StyleSheet.create({
  container: {
    borderColor: "#BDBDC1",
    borderWidth: 2 / window.scale
  }
});

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.pageX = 0;
    this.pageY = 0;

    this.state = {
      value: this.props.initKey
        ? this.props.data.filter(item => item.key === this.props.initKey)[0]
            .label
        : this.props.placeholder,
      show_options: false,
      search_text: ""
    };
  }

  _reset() {
    const { placeholder } = this.props;
    this.setState({ value: placeholder, show_options: false, search_text: "" });
    this.props.onSelect(null, null);
    if (this.props.parentScrollEnable) {
      this.props.parentScrollEnable();
    }
  }

  _onPress() {
    this._select.measure((width, height, px, py, fx, fy) => {
      const location = {
        fx: fx,
        fy: fy,
        px: px,
        py: py,
        width: width,
        height: height
      };
      this.setState({ location });
    });
    if (this.state.show_options) {
      this.setState({ show_options: false, search_text: "" });
    } else {
      this.setState({ show_options: true });
      if (this.props.parentScrollDisable) {
        this.props.parentScrollDisable();
      }
    }
  }

  _handleSelect(key, label) {
    this.setState({ show_options: false, value: label, search_text: "" });
    this.props.onSelect(key, label);
    if (this.props.parentScrollEnable) {
      this.props.parentScrollEnable();
    }
  }

  _onChangeInput(text) {
    this.setState({ search_text: text });
  }

  _handleOptionsClose() {
    this.setState({
      show_options: false,
      search_text: ""
    });
    if (this.props.parentScrollEnable) {
      this.props.parentScrollEnable();
    }
  }

  render() {
    const {
      width,
      height,
      data,
      style,
      styleOption,
      styleText,
      search
    } = this.props;
    const dimensions = { width, height };

    return (
      <View>
        <View
          ref={ref => {
            this._select = ref;
          }}
          style={[
            styles.container,
            style,
            dimensions,
            { flexDirection: "row", justifyContent: "space-between" }
          ]}
        >
          {this.state.show_options && search ? (
            <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
              <View
                style={{
                  flex: 3,
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center"
                }}
              >
                <Icon
                  name="ios-search-outline"
                  style={{
                    color: "black",
                    fontSize: 26,
                    marginLeft: 5,
                    flex: 1
                  }}
                />
                <TextInput
                  onChangeText={this._onChangeInput.bind(this)}
                  placeholder={this.props.searchPlaceholder}
                  underlineColorAndroid="transparent"
                  style={{ flex: 5 }}
                />
              </View>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
              <View
                style={{
                  flex: 3
                }}
              >
                <Option style={styleOption} styleText={styleText}>
                  {this.state.value}
                </Option>
              </View>
            </TouchableWithoutFeedback>
          )}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center"
            }}
          >
            <TouchableWithoutFeedback onPress={this._reset.bind(this)}>
              <Icon
                name="ios-close"
                style={{
                  color: "black",
                  fontSize: 26,
                  marginRight: 15
                }}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this._onPress.bind(this)}>
              <Icon
                name="md-arrow-dropdown"
                style={{
                  color: "black",
                  fontSize: 24,
                  marginRight: 5
                }}
              />
            </TouchableWithoutFeedback>
          </View>
        </View>
        {this.state.show_options && (
          <Items
            items={data.filter(item => {
              const parts = this.state.search_text.trim().split(/[ \-:]+/);
              const regex = new RegExp(`(${parts.join("|")})`, "ig");
              return regex.test(item.label);
            })}
            show={this.state.show_options}
            width={width}
            height={height}
            location={this.state.location}
            onPress={this._handleSelect.bind(this)}
            handleClose={this._handleOptionsClose.bind(this)}
          />
        )}
      </View>
    );
  }
}

Select.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  onSelect: React.PropTypes.func,
  search: React.PropTypes.bool,
  searchPlaceholder: React.PropTypes.string,
  initKey: React.PropTypes.number
};

Select.defaultProps = {
  width: 200,
  height: 40,
  onSelect: () => {},
  search: true,
  initKey: 0,
  placeholder: "Select",
  searchPlaceholder: "Search"
};

module.exports = Select;
