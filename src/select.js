import React from "react";
import {
  Dimensions,
  StyleSheet,
  Component,
  TouchableWithoutFeedback,
  View,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Option = require("./option");
const Overlay = require("./overlay");
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
        : this.props.placeholder || null,
      show_options: false,
      search_text: ""
    };
  }

  _reset() {
    const { placeholder } = this.props;
    this.setState({ value: placeholder, show_options: false, search_text: "" });
    this.props.onSelect(null, null);
    this.props.parentScrollEnable();
  }

  _onPress() {
    if (this.state.show_options) {
      this.setState({ show_options: false, search_text: "" });
    } else {
      this.setState({ show_options: true });
      this.props.parentScrollDisable();
    }
  }

  _handleSelect(key, label) {
    this.setState({ show_options: false, value: label, search_text: "" });
    this.props.onSelect(key, label);
    this.props.parentScrollEnable();
  }

  _onChangeInput(text) {
    this.setState({ search_text: text });
  }

  _onOverlayPress() {
    this.setState({
      show_options: false,
      search_text: ""
    });
    this.props.parentScrollEnable();
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
        {this.state.show_options && (
          <Overlay onPress={this._onOverlayPress.bind(this)} />
        )}
        <View
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
                  placeholder={"Search"}
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
            width={width}
            height={height}
            onPress={this._handleSelect.bind(this)}
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
  initKey: React.PropTypes.string
};

Select.defaultProps = {
  width: 200,
  height: 40,
  onSelect: () => {},
  search: true
};

module.exports = Select;
