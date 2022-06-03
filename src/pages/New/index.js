import {View, Text} from 'react-native';
import React from 'react';

const New = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{color: 'blue'}}>Welcome RS.Bayukarta</Text>
      <Text style={{color: 'blue'}}>this Screen on Build</Text>
    </View>
  );
};

export default New;
