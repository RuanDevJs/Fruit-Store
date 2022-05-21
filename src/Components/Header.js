import React from 'react';
import { View, Image, Dimensions, Platform, StyleSheet } from 'react-native';

import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const HEADER_SIZE = (width * 0.4);

export default function Header() {
 return (
   <View style={styles.header}>
       <View style={styles.container}>
           <View>
                <Feather name="menu" size={45} color="#111427" />
           </View>
           <View>
                <Image
                    source={require('../assets/profile.png')}
                    style={styles.profile}
                />
           </View>
       </View>
   </View>
  );
}

const styles = StyleSheet.create({
    header: {
        height: HEADER_SIZE,
        padding: 32,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    profile: {
        width: 50,
        height:  50,
        borderRadius: 50,
        resizeMode: 'cover'
    }
})
