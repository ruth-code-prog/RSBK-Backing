import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, ScrollView} from 'react-native'
import FIREBASE from '../../config/FIREBASE';
import NewsItem from '../../components/NewsItem';
import PaidVideo from '../PaidVideo';

const Info = () => {
    const [news, setNews] = useState ([]);

    useEffect(() => {
    FIREBASE.database()
      .ref('news/')
      .once('value')
      .then(res => {
            console.log('news: ', res.val());
          if (res.val()) {
            setNews(res.val());    
        }
      })
      .catch(Error => {
        showError
      });
  }, []);

  const openNews = (url) => {
    Linking.openURL('https://' + url)
  }

    return (
    <View style={styles.container}>
      <PaidVideo />
            {news.map(item => {
                return (
                  <TouchableOpacity onPress={() => openNews(item.link)} key={item.id}>
                    <NewsItem
                    key={`news-${item.id}`}
                    title={item.title}
                    body={item.body}
                    image={item.image}
                    />
                  </TouchableOpacity>
                    );
            })}          
    </View>
    )}    
    

export default Info
const styles = StyleSheet.create({
    container: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 80,
    }
});
