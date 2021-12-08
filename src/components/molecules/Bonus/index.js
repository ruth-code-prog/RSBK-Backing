import React from 'react';
import {Dimensions, Image, Linking, StyleSheet, TouchableOpacity} from 'react-native';

const Bonus = ({url, link}) => {
  // const [imageUri, setImageUri] = useState('');

  // useEffect(() => {
  //   getImage();
  // }, []);

  // const getImage = () => {
  //   FIREBASE.database()
  //     .ref('bonus')
  //     .once('value', snapshot => {
  //       setImageUri(snapshot.val());
  //     });
  // };

  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(`${link}`);
        console.log(link);
      }}
      style={styles.container}>
      <Image style={styles.image} source={{uri: url}} />
    </TouchableOpacity>
  );
};

export default Bonus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 12,
  },
  image: {
    height: '100%',
    width: '100%',
    borderRadius: 20,
  },
});