import React, {useEffect, useState, useRef} from 'react';
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
  RefreshControl,
  Animated,
} from 'react-native';
import {VideoPlayer} from '../../components';
import FIREBASE from '../../config/FIREBASE';
import {useDispatch} from 'react-redux';
import {ExpandingDot} from 'react-native-animated-pagination-dots';

const PaidVideo = ({navigation}) => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [videoLink, setVideoLink] = useState('');
  const [videoModal, setVideoModal] = useState('');

  const [refreshing, setRefreshing] = React.useState(false);

  const [selectedLink, setSelectedLink] = useState(null);
  const dispatch = useDispatch();

  const scrollX = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch({type: 'SET_LOADING', value: true});
    FIREBASE.database()
      .ref('video-informasi/')
      .once('value')
      .then(res => {
        const snapshotVal = res.val();
        const arr = snapshotVal.filter(val => val);
        setRefreshing(true);
        setData(arr);
        setAllData(arr);
        dispatch({type: 'SET_LOADING', value: false});
        wait(2000).then(() => setRefreshing(false));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
      });
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  return (
    <View style={styles.pages}>
      {loading ? (
        <ActivityIndicator size={24} color="#0000FF" />
      ) : (
        <FlatList
          horizontal
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: scrollX}}}],
            {
              useNativeDriver: false,
            },
          )}
          decelerationRate={'normal'}
          scrollEventThrottle={16}
          keyExtractor={(_, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={getData} />
          }
          data={data}
          contentContainerStyle={styles.listContentContainer}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                {
                  setVideoLink(item?.link);
                  setVideoModal(true);
                }
              }}
              activeOpacity={0.8}
              style={styles.videoContainer}>
              <View>
                <Image source={{uri: item?.image}} style={styles.thumbnail} />
                <Image
                  source={require('../../assets/gif.gif')}
                  style={{width: 50, height: 50}}
                  resizeMode={'contain'}
                />
                <Text style={styles.title}>
                  {item?.title.substring(0, 34)}...
                </Text>

                <Text
                  numberOfLines={6}
                  lineBreakMode="tail"
                  style={styles.body}>
                  {item?.body}
                </Text>

                <ExpandingDot
                  data={data}
                  expandingDotWidth={30}
                  scrollX={scrollX}
                  inActiveDotOpacity={0.6}
                  dotStyle={{
                    marginTop: 380,
                    width: 10,
                    height: 10,
                    backgroundColor: '#347af0',
                    borderRadius: 5,
                    marginHorizontal: 5,
                  }}
                  containerStyle={{
                    top: 30,
                  }}
                />
              </View>
            </TouchableOpacity>
          )}
          //numColumns={2}
          //columnWrapperStyle={styles.columnWrapperStyle}
          titleWrapperStyle={styles.titleWrapperStyle}
        />
      )}
      <VideoPlayer
        link={videoLink}
        visible={videoModal}
        onClose={() => setVideoModal(false)}
      />
    </View>
  );
};

export default PaidVideo;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
  },
  listContentContainer: {
    padding: 20,
    // justifyContent: "space-between",
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  titleWrapperStyle: {
    flex: 1,
  },
  videoContainer: {
    height: 400,
    marginRight: 10,
    flexDirection: 'row',
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  thumbnail: {
    width: 280,
    height: 240,
    borderRadius: 11,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0000FF',
    marginTop: 20,
  },
  body: {
    fontSize: 12,
    color: '#0000FF',
  },
});
