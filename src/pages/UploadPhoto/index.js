import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {IconAddPhoto, IconRemovePhoto, ILNullPhoto} from '../../assets';
import {Button, Gap, Header, Link} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {colors, fonts, showError, storeData} from '../../utils';

const UploadPhoto = ({navigation, route}) => {
  const {fullName, uid} = route.params;
  const [photoForDB, setPhotoForDB] = useState('');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [photo, setPhoto] = useState(ILNullPhoto);

  const uploadPhoto = () => {
    ImagePicker.openCamera({
      width: 400,
      height: 300,
      cropping: true,
      includeBase64: true,
    })
      .then(image => {
        const source = {uri: image.path};

        setPhotoForDB(`data:${image.mime};base64,${image.data}`);
        setPhoto(source);
        setHasPhoto(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const continuePage = () => {
    FIREBASE.database()
      .ref('users/' + uid + '/')
      .update({photo: photoForDB});

    const data = route.params;
    data.photo = photoForDB;

    storeData('user', data);

    navigation.replace('MainApp');
  };

  return (
    <View style={styles.page}>
      <View style={styles.content}>
        <View style={styles.profile}>
          <TouchableOpacity style={styles.avatarWrapper} onPress={uploadPhoto}>
            <Image source={photo} style={styles.avatar} />
            {hasPhoto && <IconRemovePhoto style={styles.addPhoto} />}
            {!hasPhoto && <IconAddPhoto style={styles.addPhoto} />}
          </TouchableOpacity>
          <Text style={styles.name}>{fullName}</Text>
          <Gap height={10} />
          <Text style={styles.verification}>Uploud Foto KTP Anda</Text>
          <Text style={styles.verification}> untuk proses Verifikasi Data</Text>
          <Gap height={180} />
          <Text style={styles.verification2}>Keamanan Data Digital di jamin Undang-Undang</Text>
        </View>
        <View>
          <Button
            disable={!hasPhoto}
            title="Upload and Continue"
            onPress={continuePage}
          />
          <Gap height={30} />
        </View>
      </View>
    </View>
  );
};

export default UploadPhoto;

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: '#112340'},
  content: {
    paddingHorizontal: 40,
    paddingBottom: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  profile: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  avatar: {width: 110, height: 110, borderRadius: 110 / 2},
  avatarWrapper: {
    width: 130,
    height: 130,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 130 / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPhoto: {position: 'absolute', bottom: 8, right: 6},
  name: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: fonts.primary[600],
    textAlign: 'center',
  },
  verification: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 4,
  },
  verification2: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 4,
    fontStyle: "italic",
  },
});

