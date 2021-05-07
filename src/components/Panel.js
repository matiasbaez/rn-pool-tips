import React, { useState } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  Platform,
  TouchableHighlight,
  UIManager,
  View,
} from 'react-native';
import HTML from "react-native-render-html";

import { Icon, Button } from 'react-native-elements'

const platform = Platform.OS;
if (
  platform === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function Panel(props) {

  const { title, description, withReminder, setIsVisible, showDatePicker } = props;
  const [expanded, setExpanded] = useState(false);

  const icons = {
    up: 'menu-down',
    down: 'menu-up'
  };

  const toggle = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setExpanded(!expanded);
  }

  return (
    <View style={styles.container}>

      <TouchableHighlight
        onPress={toggle}
        underlayColor="#f1f1f1"
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Icon
            type="material-community"
            name={expanded ? icons["down"] : icons["up"] }
            style={styles.buttonImage}>
          </Icon>
        </View>
      </TouchableHighlight>

      {expanded && (
        <View style={styles.body}>
          <HTML source={{ html: description }} classesStyles={htmlStyles} tagsStyles={tagStyles} />

          {withReminder === 1 && (
            <Button
              title="Avisarme en..."
              buttonStyle={styles.button}
              icon={
                <Icon
                  color="#fff"
                  style={styles.icon}
                  type="material-community"
                  name="clock-outline" />
              }
              onPress={showDatePicker} />
          )}
        </View>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  titleContainer: {
    flexDirection: "row",
    padding: 15,
  },
  title: {
    flex: 1,
    color: "#2a2f43",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: '#252d3d',
    marginTop: 20,
    width: "50%"
  },
  buttonImage: {
    width: 30,
    height: 25,
  },
  body: {
    alignItems: "center",
    padding: 20,
    paddingTop: 0,
    textAlign: 'justify',
  },
  icon: {
    marginRight: 5
  }
});

const tagStyles = {
  p: {
    textAlign: 'justify'
  },
  li: {
    textAlign: 'justify'
  }
}

const htmlStyles = {}