import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FIREBASE from '../../../config/FIREBASE';

const Bonus = ({}) => {
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    FIREBASE.database()
      .ref('bonus')
      .once('value', snapshot => {
        setImageUri(snapshot.val());
      });
  };

  return (
      <View style={styles.container}>
        <View style={{alignItems: 'flex-start'}}>
          <Image style={styles.image} source={{uri: imageUri}} />
        </View>
      </View>
  );
};

export default Bonus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: Dimensions.get('screen').height / 5,
    width: Dimensions.get('screen').width - 140,
    borderRadius: 20,
  },
});