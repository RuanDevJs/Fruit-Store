import React from 'react';
import { View, Text } from 'react-native';

import Header from '../Components/Header';
import Products from '../Components/Home/Products';

export default function Home() {
 return (
   <View style={{ flex: 1, backgroundColor: '#fff'}}>
      <Products />
   </View>
  );
}
