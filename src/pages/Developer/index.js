import React, {useCallback} from 'react';
import {
  Alert,
  Button,
  Linking,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/core';

const supportedURL = 'https://ekosetiaji.my.id';

const App = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{marginLeft: 4}} />
      <View style={styles.wrapper}>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://wa.me/+628111199968')}>
          <Image
            source={require('../../assets/IC.png')}
            style={styles.chat}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>

      <View style={{marginLeft: 20}} />
      <View style={styles.rowCenter}>
        <TouchableOpacity onPress={() => navigation.navigate('Appoitment')}>
          <Image
            source={require('../../assets/Appo.png')}
            style={styles.chat}
            resizeMode={'contain'}
          />
          <Text style={styles.keluar}>Appoitment Klinik</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    padding: 2,
    backgroundColor: '#112340',
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 3.84,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 200,
  },
  wrapper: {
    // flex: 1,
    paddingTop: 0,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  chat: {
    width: 180,
    height: 108,
    resizeMode: 'contain',
    marginBottom: 2,
    borderRadius: 20,
  },
  keluar: {
    textAlign: 'center',
  },
  //url: {marginTop: 6}
});

export default App;
