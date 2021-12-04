import React, {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';

const supportedURL = 'https://ekosetiaji.my.id';

const App = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://wa.me/+628111199968')}>
          <Image
                  source={require("../../assets/IC.png")}
                  style={styles.chat}
                  resizeMode={"contain"}
                />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {alignItems: 'center', marginTop: 12, marginBottom: 12},
  chat: {
    width: 160,
    height: 88,
    resizeMode: "contain",
    marginBottom: 100,
  },
  //url: {marginTop: 6}
});

export default App;
