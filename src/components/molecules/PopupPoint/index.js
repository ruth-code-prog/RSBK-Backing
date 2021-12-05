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

const PopupPoint = ({visible, onClose}) => {
  const [imageUri, setImageUri] = useState('');

  useEffect(() => {
    getImage();
  }, []);

  const getImage = () => {
    FIREBASE.database()
      .ref('popup_banner')
      .once('value', snapshot => {
        setImageUri(snapshot.val());
      });
  };

  return (
    <Modal animationType="fade" visible={visible} transparent>
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => onClose && onClose()}
            style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Image style={styles.image} source={{uri: imageUri}} />
        </View>
      </View>
    </Modal>
  );
};

export default PopupPoint;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: Dimensions.get('screen').height / 2,
    width: Dimensions.get('screen').width - 40,
    borderRadius: 40,
  },
  text: {
    position: 'absolute',
    bottom: 20,
    fontSize: 24,
    color: "#FFFFFF",
  },
  closeButton: {
    position: 'absolute',
    zIndex: 9999,
    right: 24,
    top: 8,
  },
  closeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: "#FFFFFF",
  },
});