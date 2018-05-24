import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  Component,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  Text,
  Modal
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Overlay = require("./overlay");

const window = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "absolute",
    borderColor: "#BDBDC1",
    borderWidth: 2 / window.scale,
    backgroundColor: "white",
    opacity: 0.9
  }
});

class Items extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      items,
      onPress,
      width,
      height,
      location,
      show,
      handleClose,
      onChangeText,
      placeholder
    } = this.props;
    let x = 0;
    let y = 0;
    if (location) {
      x = location.fx;
      y = location.fy;
    }

    const renderedItems = items.map((item, idx) => {
      return item.section ? (
        <View style={{ padding: 5 }} key={idx}>
          <Text style={{ fontWeight: "bold" }}>{item.label}</Text>
        </View>
      ) : (
        <TouchableWithoutFeedback
          onPress={() => onPress(item.key, item.label)}
          key={idx}
        >
          <View style={{ padding: 5 }}>
            <Text style={{ marginLeft: 20 }}>{item.label}</Text>
          </View>
        </TouchableWithoutFeedback>
      );
    });

    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={show}
        onRequestClose={handleClose}
      >
        <Overlay onPress={handleClose} />
        <View style={[styles.container, { left: x, top: y, width: width }]}>
          <View
            style={{
              height: height,
              borderBottomColor: "#BDBDC1",
              borderBottomWidth: 2 / window.scale
            }}
          >
            <View
              style={{
                flex: 1,
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
                onChangeText={onChangeText}
                placeholder={placeholder}
                underlineColorAndroid="transparent"
                style={{ flex: 5, margin: 0, padding: 0 }}
              />
            </View>
          </View>
          <ScrollView
            style={{ width: width - 2, height: height * 3 }}
            automaticallyAdjustContentInsets={false}
            bounces={false}
          >
            {renderedItems}
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

Items.propTypes = {
  onPress: PropTypes.func
};

Items.defaultProps = {
  width: 0,
  height: 0,
  onPress: () => {}
};

module.exports = Items;
