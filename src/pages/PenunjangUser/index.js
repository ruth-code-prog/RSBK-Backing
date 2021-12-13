import AsyncStorage from '@react-native-community/async-storage';
import {useFocusEffect, useRoute} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button, Gap, Input} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {useForm, useFormSoul} from '../../utils';

const PenunjangUser = () => {
  const {profile} = useRoute().params || {};

  const [form, setForm] = useFormSoul({
    title: '',
    image: null,
  });
  const [uploadLoading, setUploadLoading] = useState(false);
  const [data, setData] = useState([]);
  const [uid, setUid] = useState('');
  const [modalImage, setModalImage] = useState(false);
  const [indexActive, setIndexActive] = useState(0);

  useFocusEffect(
    useCallback(() => {
      FIREBASE.auth().onAuthStateChanged(async data => {
        if (data) {
          getPenunjangData(data.uid);
          setUid(data?.uid);
        } else {
          AsyncStorage.clear();
        }
      });
    }, []),
  );

  const getPenunjangData = uidParams => {
    FIREBASE.database()
      .ref(`user-penunjang/${uidParams}`)
      .once('value')
      .then(snapshot => {
        const dataSnapshot = snapshot.val() || {};
        let arr = [];

        Object.entries(dataSnapshot).map(val => {
          arr.push({
            url: val[1]?.image,
            title: val[1]?.title,
            id: val[0],
          });
        });

        setData(arr);
      });
  };

  const showAlert = () => {
    Alert.alert('Pilih salah satu', '', [
      {
        text: 'Batal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Upload Langsung',

        onPress: () => {
          launchCamera({
            quality: 0.8,
            mediaType: 'photo',
            includeBase64: true,
          }).then(res => {
            if (!res.didCancel) {
              handleImage(res);
            }
          });
        },
      },
      {
        text: 'Dari Library',
        onPress: () => {
          launchImageLibrary({
            quality: 0.8,
            mediaType: 'photo',
            includeBase64: true,
          }).then(res => {
            if (!res.didCancel) {
              handleImage(res);
            }
          });
        },
      },
    ]);
  };

  const handleImage = res => {
    const {base64} = res?.assets[0] || {};
    setForm({image: `data:image/jpeg;base64, ${base64}`});
  };

  const handleUploadImage = () => {
    setUploadLoading(true);
    const ref = FIREBASE.database()
      .ref('user-penunjang/' + uid)
      .push({
        title: form.title,
        image: form.image,
      });
    console.log('awekoawke keyyy', ref.key);
    ref
      .then(() => {
        setUploadLoading(false);
        Alert.alert('Berhasil mengupload data penunjang');
        setForm({title: '', image: null});
        setData([
          ...data,
          {
            title: form.title,
            url: form.image,
            id: ref.key,
          },
        ]);
      })
      .catch(err => {
        setUploadLoading(false);
        console.error(err);
      });
  };

  const handleDelete = item => {
    Alert.alert('Apakah Anda yakin?', '', [
      {
        text: 'Batal',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Hapus',

        onPress: () => {
          FIREBASE.database()
            .ref('user-penunjang/' + uid + `/${item?.id}`)
            .remove()
            .then(() => {
              let arr = [...data];
              arr = arr.filter(val => val?.id !== item?.id);
              setData(arr);
            });
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Text
          style={
            styles.headerText
          }>{`Sampurasun ${profile?.fullName}\nIni adalah halaman User Uploud Gambar\nPemeriksaan Penunjang, Kartu ASKES\n Kartu Golongan Darah,dll`}</Text>
        <Gap height={20} />
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          contentContainerStyle={{paddingHorizontal: 20}}
          ItemSeparatorComponent={() => <Gap width={20} />}
          renderItem={({item, index}) => (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setModalImage(true);
                  setIndexActive(index);
                }}>
                <Image style={styles.image} source={{uri: item?.url}} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDelete(item)}
                style={styles.btnDelete}>
                <Text style={{fontSize: 16, color: 'white'}}>Hapus</Text>
              </TouchableOpacity>
              <Gap height={20} />
              <Text>{item?.title}</Text>
            </View>
          )}
        />
        <Gap height={70} />
        <View>
          <Text style={styles.headerText}>Tambah Foto Medical Record Anda</Text>
          <Gap height={20} />
          <Input
            value={form.title}
            onChangeText={val => setForm({title: val})}
            label={'Masukkan Judul'}
          />
          {form?.image && (
            <View style={{alignItems: 'center'}}>
              <Gap height={20} />
              <Image style={styles.image} source={{uri: form?.image}} />
            </View>
          )}
          <Gap height={20} />
          <Button
            onPress={showAlert}
            type={'secondary'}
            title={form?.image ? 'Ubah Gambar' : 'Upload Gambar'}
          />
          <Gap height={20} />
          <Button
            onPress={() => handleUploadImage()}
            disable={form.title === '' || !form.image}
            loading={uploadLoading}
            title={'Kirim'}
          />
        </View>
      </ScrollView>
      <Modal visible={modalImage} transparent>
        <ImageViewer
          index={indexActive}
          enableSwipeDown
          onSwipeDown={() => setModalImage(false)}
          imageUrls={data}
        />
      </Modal>
    </View>
  );
};

export default PenunjangUser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#112340',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20
  },
  btnDelete: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    position: 'absolute',
    right: 8,
    top: 8,
  },
});