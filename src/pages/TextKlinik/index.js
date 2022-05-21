import React, {Component, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import FIREBASE from '../../config/FIREBASE';

const TextKlinik = props => {
  const [textKlinik, setTextKlinik] = useState(null);

  useEffect(() => {
    getTextKlinik();
  }, []);

  const getTextKlinik = () => {
    FIREBASE.database()
      .ref('text_klinik')
      .once('value')
      .then(res => {
        setTextKlinik(res?.val());
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <View style={styles.runningText}>
      <Image
        style={styles.runningTextLogo}
        source={require('../../assets/megaphone.png')}
      />
      {textKlinik ? (
        <View style={{flex: 1}}>
          <TextTicker
            style={{
              fontSize: 16,
              color: '#FFFFFF',
              width: Dimensions.get('screen').width - 40,
            }}
            duration={40000}
            loop
            // bounce
            repeatSpacer={50}>
            {textKlinik}
          </TextTicker>
        </View>
      ) : null}
    </View>
  );
};

export default TextKlinik;

const styles = StyleSheet.create({
  runningText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  runningTextLogo: {
    height: 44,
    width: 44,
    marginRight: 0,
  },
});
