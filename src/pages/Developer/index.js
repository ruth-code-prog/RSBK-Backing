import React, {useCallback} from 'react';
import {Alert, Button, Linking, StyleSheet, View, TouchableOpacity, Text, Image} from 'react-native';

const supportedURL = 'https://ekosetiaji.my.id';

const App = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://wa.me/+62895600394345')}>
          <Image
                  source={require("../../assets/Chat.png")}
                  style={styles.chat}
                  resizeMode={"contain"}
                />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'center', marginTop: 12, marginBottom: 12},
  chat: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: 120,
    height: 68,
    resizeMode: "contain",
    marginBottom: 100,
  },
  //url: {marginTop: 6}
});

export default App;
