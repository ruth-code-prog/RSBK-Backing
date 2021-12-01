import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import FIREBASE from '../../config/FIREBASE';

const Splash = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = FIREBASE.auth().onAuthStateChanged(user => {
      setTimeout(() => {
        {
          navigation.replace('MainApp');
        }
      }, 3000);
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.page}>
      <Image
        source={require('../../assets/logo.png')}
        style={{width: 150, height: 150}}
        resizeMode={'contain'}
      />
      <Text style={styles.title}>RS BAYUKARTA</Text>
      <Text style={styles.line}>Sakit itu gak Ribet, ke Bayukarta aja</Text>
      <Image
        source={require('../../assets/Akreditasi.png')}
        style={{
          width: 150,
          height: 150,
          position: 'absolute',
          bottom: 0,
          right: 0,
        }}
        resizeMode={'contain'}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontFamily: '#0000FF',
    color: '#0000FF',
    marginTop: 20,
  },
  line: {
    fontSize: 14,
    fontFamily: '#0000FF',
    color: '#0000FF',
    marginTop: 20,
  },
});
