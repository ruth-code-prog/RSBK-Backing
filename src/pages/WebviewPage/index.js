import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import WebView from 'react-native-webview';
import {useRoute} from '@react-navigation/native';

const WebviewPage = ({navigation}) => {
  const routes = useRoute();
  const {link} = routes?.params || {};
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.pages}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>{'<- Kembali'}</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size={40} />
        </View>
      ) : (
        <WebView style={{flex: 1}} source={{uri: link}} />
      )}
    </View>
  );
};

export default WebviewPage;

const styles = StyleSheet.create({
  pages: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    fontSize: 24,
    color: 'black',
    margin: 20,
  },
  loading: {
    alignSelf: 'center',
    margin: 20,
  },
});
