import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const NewsItem = ({title, body, image}) => {
  return (
    <View style={styles.container}>
        <View style={styles.titleWrapper}>
        <Text selectable={true} style={styles.title}>{title}</Text>
        <Text selectable={true} style={styles.body}>{body}</Text>
      <Image source={{uri: image}} style={styles.image} />
      </View>
    </View>
  );
};

export default NewsItem;

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
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
  titleWrapper: {flex: 1},
  title: {
    fontSize: 12,
    marginTop: 4,
  },
  body: {
    fontSize: 12,
   // fontFamily: fonts.primary.normal,
   // color: colors.text.secondary,
    marginTop: 4,
  },
  image: {width: 418, height: 300, borderRadius: 11},
});