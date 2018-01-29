import React from "react";
import {
  Dimensions,
  StyleSheet,
  Component,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  Text
} from "react-native";

const window = Dimensions.get("window");

const styles = StyleSheet.create({
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

class Items extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { items, onPress, width, height } = this.props;

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
      <View style={[styles.container, { top: height }]}>
        <ScrollView
          style={{ width: width - 2, height: height * 3 }}
          automaticallyAdjustContentInsets={false}
          bounces={false}
        >
          {renderedItems}
        </ScrollView>
      </View>
    );
  }
}

Items.propTypes = {
  onPress: React.PropTypes.func
};

Items.defaultProps = {
  width: 0,
  height: 0,
  onPress: () => {}
};

module.exports = Items;
