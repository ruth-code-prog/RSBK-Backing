import React, {Component, useCallback, useEffect, useState} from 'react';
import {StyleSheet, Text, View, Image, Dimensions} from 'react-native';
import TextTicker from 'react-native-text-ticker';
import FIREBASE from '../../config/FIREBASE';

const RunningText = props => {
  const [runningText, setRunningText] = useState(null);

  useEffect(() => {
    getRunningText();
  }, []);

  const getRunningText = () => {
    FIREBASE.database()
      .ref('text')
      .once('value')
      .then(res => {
        setRunningText(res?.val());
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
      {runningText ? (
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
            {runningText}
          </TextTicker>
        </View>
      ) : null}
    </View>
  );
};

export default RunningText;

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
