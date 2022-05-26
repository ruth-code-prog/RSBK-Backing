import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from 'react-native';
import FIREBASE from '../../config/FIREBASE';
import {HeadlineItem} from '../../components';

const Headline = () => {
  const [headline, setHeadline] = useState([]);
  const [active, setActive] = useState(0);

  const onChange = ({nativeEvent}) => {
    const active = Math.floor(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
    );

    setActive(active);

    console.log(active);
  };

  useEffect(() => {
    FIREBASE.database()
      .ref('headline/')
      .once('value')
      .then(res => {
        if (res.val()) {
          setHeadline(res.val());
        }
      })
      .catch(Error => {
        showError;
      });
  }, []);

  const openHeadline = url => {
    Linking.openURL('https://' + url);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        onMomentumScrollEnd={onChange}
        horizontal
        showsHorizontalScrollIndicator={false}>
        {headline.map(item => {
          return (
            <TouchableOpacity
              onPress={() => openHeadline(item.link)}
              key={item.id}>
              <HeadlineItem
                key={`headline-${item.id}`}
                headline={item.headline}
                image={item.image}
              />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.dotView}>
        {headline.map((k, i) => (
          <View
            key={i}
            style={{
              backgroundColor: i === active ? "blue" : "white", // My problem is here
              height: 20,

              width: 10,

              margin: 8,
              borderRadius: 6,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Headline;
const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#F8C471',
    borderRadius: 10,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
