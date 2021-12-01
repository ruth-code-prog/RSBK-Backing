import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

export default function HeadlineItem({headline, onPress, title, subtitle, page, image}) {
   
    return (
    <View style={styles.container} onPress={onPress}>
        <Image source={{uri: image}} style={styles.image} />
        <Text style={styles.headline}>{headline}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <Text style={styles.page}>{page}</Text>
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 20,
        marginRight: 10,
        flexDirection: 'row',
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 5,
        marginBottom: 20,
        shadowColor: '#000',
        height: 180,
        width: 270,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
      },
      illustration: {
        marginBottom: 28,
      },
      headline: {
        fontSize: 12,
        color: '#000000',
        marginLeft: 6,
      },
      label: {
        fontSize: 12,
        color: '#000000'
      },
      title: {
        fontSize: 12,
        color: '#000000',
        marginTop: 100,
        position: 'absolute',
        marginLeft: 20,
      },
      subtitle: {
        fontSize: 12,
        color: '#000000',
        marginTop: 120,
        marginLeft: 20,
        position: 'absolute'
      }, 
      page: {
        fontSize: 12,
        color: '#000000',
        marginTop: 140,
        marginLeft: 20,
        position: 'absolute'
      }, 
      image: {width: 80, height: 80, borderRadius: 50},
})
