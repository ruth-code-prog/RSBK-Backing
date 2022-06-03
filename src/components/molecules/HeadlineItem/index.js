import React from 'react'
import { Dimensions, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

export default function HeadlineItem({onPress, image}) {
   
    return (
    <View style={styles.container} onPress={onPress}>
        <Image source={{uri: image}} style={styles.image} />
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginTop: 6,
        marginRight: 12,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 6,
        shadowColor: '#000',
        height: Dimensions.get('screen').height / 5,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
      },
      image: {
        width: Dimensions.get('screen').width - 120,
        height: Dimensions.get('screen').height / 5, 
        borderRadius: 10, },
})
