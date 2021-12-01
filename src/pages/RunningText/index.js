import React, {Component, useCallback, useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
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
      {runningText ? (
            <View style={{flex: 1}}>
              <TextTicker
                style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  //width: Dimensions.get("screen").width - 40,
                }}
                duration={20000}
                loop
                // bounce
                repeatSpacer={50}>
                {runningText}
              </TextTicker>
            </View>
          ) : null}
    </View>
  )
}

export default RunningText

const styles = StyleSheet.create({
  runningText: {
    paddingTop: 20,
  }
})
