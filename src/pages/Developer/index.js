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
  container: {alignItems: 'center', marginTop: 12, marginBottom: 12, borderRadius: 20},
  chat: {
    width: 180,
    height: 108,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 20
  },
  //url: {marginTop: 6}
});

export default App;
