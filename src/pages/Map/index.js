import React, {useCallback} from 'react';
import {
  Alert,
  Button,
  Dimensions,
  Linking,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';

const supportedURL = 'https://ekosetiaji.my.id';

const App = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>
          Linking.openURL('https://goo.gl/maps/AdGPaEB41bgPBTdu6')
        }>
        <Image
          source={require('../../assets/peta.png')}
          resizeMode="contain"
          style={styles.peta}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginTop: 40,},
  peta: {
    height: Dimensions.get('screen').height / 6,
    width: '100%',
    borderRadius: 10,
  },
  //url: {marginTop: 6}
});

export default App;