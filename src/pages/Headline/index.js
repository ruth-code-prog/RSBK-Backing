import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity,  Linking, ScrollView} from 'react-native'
import FIREBASE from '../../config/FIREBASE';
import HeadlineItem from '../../components/HeadlineItem';

const Headline = () => {
    const [headline, setHeadline] = useState ([]);

    useEffect(() => {
    FIREBASE.database()
      .ref('headline/')
      .once('value')
      .then(res => {
            console.log('headline: ', res.val());
          if (res.val()) {
            setHeadline(res.val());    
        }
      })
      .catch(Error => {
        showError
      });
  }, []);

  const openHeadline = (url) => {
    Linking.openURL('https://' + url)
  }

    return (
    <View style={styles.container}>
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {headline.map(item => {
                return (
                  <TouchableOpacity onPress={() => openHeadline(item.link)} key={item.id}>
                    <HeadlineItem
                    key={`headline-${item.id}`}
                    headline={item.headline}
                    title={item.title}
                    subtitle={item.subtitle}
                    page={item.page}
                    image={item.image}
                />
                </TouchableOpacity>
                );
            })}          
      </ScrollView>
    </View>
    )}    
    

export default Headline
const styles = StyleSheet.create({
  container: {marginTop: 20,
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#F8C471',
    borderRadius: 5,
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
});
