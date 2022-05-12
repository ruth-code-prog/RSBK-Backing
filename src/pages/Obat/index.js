import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Gap} from '../../components';
import moment from 'moment';
import localization from 'moment/locale/id';
import Klinik from '../Klinik';
import CardAntrian from '../CardAntrian';

import VideoNotif from '../../components/atoms/VideoNotif';
import FIREBASE from '../../config/FIREBASE';
import {colors} from '../../utils';

const Obat = () => {
  const [data, setData] = useState([]);
  const [modalImage, setModalImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [indexActive, setIndexActive] = useState(0);

  const closeModal = () => {
    if (modalImage) {
      setModalImage(false)
    }
  }

  moment.updateLocale('id', localization);

  let tanggal = moment().locale('id');

  const getNotifImage = () => {
    FIREBASE.database()
      .ref('notifImage')
      .once('value')
      .then(snapshot => {
        const dataSnapshot = snapshot.val() || {};
        let arr = [];

        Object.entries(dataSnapshot).map(val => {
          arr.push({
            url: val[1],
          });
        });

        setData(arr);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getNotifImage();
  }, []);

  return (
    <View style={styles.page}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Gap height={10} />
        <Text style={styles.title}>Card Nomor Antrian Klinik</Text>
        <CardAntrian />
        <Text style={styles.title}>No Antrian Klinik Yang Sudah Terlayani</Text>
        <Text style={styles.subtitle}>(Pasien UMUM, Mitra & Asuransi)</Text>
        <Text style={styles.date}>Waktu Anda Berharga {tanggal.format('LLLL, a')}</Text>
        <Klinik />
        
        <Text style={styles.title}>Supported By Alo Care Apps</Text>
        <Gap height={20} />
        <VideoNotif />
        <Gap height={30} />
        <Text style={styles.title}>
          More Information
        </Text>
        <Text style={styles.subtitle}>
          Alert! "Zoom In: Click Image", "Zoom Out: Swipe Down Image/ Back Button"
        </Text>
        <Gap height={20} />
        <FlatList
          data={data}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={{paddingHorizontal: 20}}
          ItemSeparatorComponent={() => <Gap height={20} />}
          ListFooterComponent={() => <Gap height={200} />}
          renderItem={({item, index}) => (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  setModalImage(true);
                  setIndexActive(index);
                }}>
                <Image
                  width={200}
                  height={200}
                  style={styles.image}
                  source={{uri: item?.url}}
                />
              </TouchableOpacity>
            </View>
          )}
          ListEmptyComponent={() =>
            loading ? (
              <View style={{alignItems: 'center'}}>
                <ActivityIndicator size={40} color={colors.primary} />
              </View>
            ) : null
          }
        />
      </ScrollView>
      <Modal visible={modalImage} transparent onRequestClose={closeModal}>
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

export default Obat;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#112340',
  },
  header: {
    paddingHorizontal: 12,
    //paddingTop: 8,
    marginBottom: 100,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FBFCFC',
    paddingLeft: 10,
    textAlign: 'center',
  },
  date: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FBFCFC',
    paddingLeft: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#FBFCFC',
    paddingLeft: 10,
    textAlign: 'center',
  },
  KalkulatorDosisObat: {
    marginTop: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBFCFC',
  },
  DosisObatEmergency: {
    marginTop: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FBFCFC',
  },
  image: {
    height: 200,
    width: 200,
    borderRadius: 20,
  },
});
