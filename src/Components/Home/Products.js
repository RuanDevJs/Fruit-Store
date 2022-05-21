import React, { useRef } from 'react';
import { Animated, View, Text, FlatList, Image, StyleSheet, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import DATA from '../../Services/fruits';
import Header from '../Header';

const { width } = Dimensions.get('window');
const ITEM_SIZE = width * 0.72;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;

export default function Products() {
    const navigate = useNavigation();
    const scrollX = useRef(new Animated.Value(0)).current;
    const data = [
        {
            key: 'left-spacer'
        },
        ...DATA,
        {
            key: 'right-spacer'
        }
    ]

    function handleNavigate(prodcut){
        navigate.navigate('Product', {
            product: prodcut
        })
    }

    return (
        <ScrollView style={styles.products} bounces={false} showsVerticalScrollIndicator={false}>
            <Header />
            <View style={{ flex: 1 }}>
                <View>
                    <Text style={styles.title}> Choose a Fruit </Text>
                    <Text style={styles.title}> You Like</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'center', marginTop: 32}}>
                    <Animated.FlatList
                        data={data}
                        renderItem={(({ item, index }) => {
                            const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, index * width]
                            if(item.key){
                                return <View style={{ width: SPACER_ITEM_SIZE }} />;
                            }

                            return(
                                <View style={{ width: ITEM_SIZE }}>
                                    <Animated.View
                                        style={[styles.product, {
                                            backgroundColor: item.color,
                                            transform: [
                                                {
                                                    translateY: scrollX.interpolate({
                                                        inputRange,
                                                        outputRange: [-20, -50, -10]
                                                    })
                                                }
                                            ]
                                        }]}
                                    >
                                        <TouchableOpacity onPress={() => {
                                            handleNavigate(item)
                                        }}>
                                            <Image
                                                source={item.source}
                                                style={styles.poster}
                                            />
                                        </TouchableOpacity>
                                        <View style={styles.info}>
                                            <Text style={styles.priceTitle}>{item.name}</Text>
                                            <Text style={styles.price}>R$ {item.price}</Text>
                                        </View>
                                    </Animated.View>
                                </View>
                            )
                        })}
                        keyExtractor={((el, index) => index)}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        decelerationRate={0}
                        scrollEventThrottle={16}
                        pagingEnabled
                        bounces={false}
                        snapToInterval={ITEM_SIZE}
                        onScroll={Animated.event([{ nativeEvent: {contentOffset: {x: scrollX}}}], {
                            useNativeDriver: false
                        })}
                        contentContainerStyle={{
                            alignItems: 'center',
                            paddingTop: 50
                        }}
                    />
                </View>
            </View>
            <View style={styles.menu}>
                <View>
                    <Text style={styles.menuTitle}>All Sales</Text>
                </View>
                <View>
                    <FlatList
                        data={DATA}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={16}
                        renderItem={({ item }) => {
                            return(
                                <View style={{ marginRight: 12, backgroundColor: item.color, borderRadius: 12 }}>
                                    <TouchableOpacity style={{ padding: 12 }}>
                                        <Image
                                            source={item.source}
                                            style={[styles.poster, { width: 120, height: 120}]}
                                        />
                                        <View>
                                            <Text style={[styles.priceTitle, {
                                                fontSize: 16,
                                                paddingVertical: 4
                                            }]}>{item.name}</Text>
                                            <Text style={styles.price}> R$ {item.price},00 </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    products: {
        flex: 1,
    },
    title: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 32,
        color: '#111427',
        textAlign: 'left',
        marginHorizontal: 32
    },
    poster: {
        width: 180,
        height: 180,
        resizeMode: 'stretch',
        alignSelf: 'center'
    },
    product: {
        marginHorizontal: 10,
        height: 300,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    info: {
        width: '100%',
        justifyContent: 'center',
        padding: 12
    },
    priceTitle: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 24,
        textTransform: 'capitalize',
        color: '#fff'
    },
    price: {
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
        textTransform: 'capitalize',
        color: '#fff'
    },
    menu: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 32,
        paddingVertical: 12,
        backgroundColor: "#111427",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50
    },
    menuTitle: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 18,
        textTransform: 'capitalize',
        color: '#fff',
        paddingVertical: 12
    }
})
