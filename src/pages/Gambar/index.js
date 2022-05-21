import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Linking,
  RefreshControl,
} from "react-native";
import {
  Gap,
  Header,
  Input,
  VideoPlayer,
} from "../../components";
import ImageViewer from 'react-native-image-zoom-viewer';
import FIREBASE from '../../config/FIREBASE';
import { colors } from "../../utils";
import {useDispatch} from 'react-redux';

const Gambar = () => {
  const [data, setData] = useState([]);
  const [modalImage, setModalImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [indexActive, setIndexActive] = useState(0);
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();

  const closeModal = () => {
    if (modalImage) {
      setModalImage(false);
    }
  };

  const getNotifImage = () => {
    dispatch({type: 'SET_LOADING', value: true});
    FIREBASE.database()
      .ref('notifImage')
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
        dispatch({type: 'SET_LOADING', value: false});
        setRefreshing(true);
        setData(arr);
        setLoading(false);
        wait(2000).then(() => setRefreshing(false));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    getNotifImage();
  }, []);

  return (
    <View style={styles.pages}>
      <Text style={styles.title}>More Information</Text>
      <Text style={styles.subtitle}>
        Alert! "Zoom In: Click Image", "Zoom Out: Back Button"
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
            <Text style={styles.keteranganGambar}>{item?.title}</Text>
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

export default Gambar;

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
    fontSize: 18,
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
    height: 280,
    width: 280,
    borderRadius: 20,
  },
  keteranganGambar: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#FBFCFC',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
