import React, {Component, useCallback, useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextTicker from 'react-native-text-ticker';
import FIREBASE from '../../config/FIREBASE';

const TextUser = props => {
  const [textUser, setTextUser] = useState(null);

  useEffect(() => {
    getTextUser();
  }, []);

  const getTextUser = () => {
    FIREBASE.database()
      .ref('text_user')
      .once('value')
      .then(res => {
        setTextUser(res?.val());
      })
      .catch(err => {
        console.error(err);
      });
  };

  return (
    <View style={styles.runningText}>
      {textUser ? (
            <View style={{flex: 1}}>
              <TextTicker
                style={{
                  fontSize: 16,
                  color: '#FFFFFF',
                  fontWeight: 'bold',
                  marginBottom: 0,
                  //width: Dimensions.get("screen").width - 40,
                }}
                duration={60000}
                loop
                // bounce
                repeatSpacer={50}>
                {textUser}
              </TextTicker>
            </View>
          ) : null}
    </View>
  )
}

export default TextUser

const styles = StyleSheet.create({
  runningText: {
    paddingTop: 20,
  }
})
