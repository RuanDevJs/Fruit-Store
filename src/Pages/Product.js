import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { GestureHandlerRootView, GestureDetector, Gesture } from "react-native-gesture-handler"

import { AntDesign } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, interpolate, Extrapolate, withTiming } from 'react-native-reanimated';

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');
const NUMBERS = [1,2,3,4,5,6,7];

export default function Product() {
    const scrollY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });
    const animatedImageValue = useSharedValue(-100);

    const { params: { product } } = useRoute();

    const handleGesture = Gesture.Pan()
    .onStart((event) => {
        context.value = { y: scrollY.value }
    })
    .onUpdate((event) => {
        scrollY.value = context.value.y + event.translationY;
        if(scrollY.value <= -100){
            scrollY.value = -100
            return
        }
        if(scrollY.value >= (WIDTH * 0.1) / 4){
            scrollY.value = (WIDTH * 0.1) / 4;
        }
    })

    const menuStyled = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: withSpring(scrollY.value),
                }
            ]
        }
    });

    const descriptionStyled = useAnimatedStyle(() => {
        return {
            opacity: interpolate(
                scrollY.value,
                [-120, 0],
                [1, 0]
            )
        }
    });

    const styledShop = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollY.value,
                        [-100, -50, 0],
                        [0, 8, 30],
                        Extrapolate.CLAMP
                    )
                }
            ]
        }
    });

    useEffect(() => {
        animatedImageValue.value = withSpring(0);
    }, []);

    const styledImage = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: animatedImageValue.value
                }
            ]
        }
    });

    return (
        <GestureHandlerRootView style={[styles.container, { backgroundColor: product.color }]}>
            <View style={styles.poster}>
                <View style={styles.posterContainer}>
                    <Animated.Image
                        source={product.source}
                        style={[styles.posterImage, styledImage]}
                    />
                </View>
            </View>
            <GestureDetector gesture={handleGesture}>
                <Animated.View style={[styles.product, menuStyled]}>
                    <View style={styles.productContainer}>
                        <View style={styles.titleWrap}>
                            <Text style={styles.title}>{product.name}</Text>
                            <View style={[styles.rate, { backgroundColor: product.color }]}>
                                <AntDesign name="star" size={16} color="#fff" />
                                <Text style={styles.rateText}>5</Text>
                            </View>
                        </View>
                        <View style={styles.descriptionWrap}>
                            <Animated.Text style={[styles.descriptionStyled, descriptionStyled]}>
                                {product.description}
                            </Animated.Text>
                        </View>
                        <Animated.View style={[styles.shop, styledShop]}>
                            <TouchableOpacity style={[
                                styles.button,
                                { backgroundColor: product.color }
                            ]}>
                                <Text style={styles.addCart}>
                                    ADD CART
                                </Text>
                                <AntDesign name="shoppingcart" size={24} color="#fff" />
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative'
    },
    poster: {
        height: 420,
        padding: 18
    },
    posterContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    posterImage: {
        width: WIDTH * 0.9,
        height: WIDTH * 0.9
    },
    product: {
        flex: 1,
        position: 'absolute',
        top: HEIGHT * 0.8,
        right: 0,
        left: 0,
        bottom: 0,
        height: HEIGHT,
        backgroundColor: "#fff",
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60,
    },
    productContainer: {
        flex: 1,
    },
    titleWrap: {
        paddingTop: 32,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    title: {
        fontFamily: 'Roboto_700Bold',
        fontSize: 32,
        color: '#111427',
        textAlign: 'left',
        marginHorizontal: 32,
        textTransform: 'capitalize'
    },
    rate: {
        marginRight: 32,
        width: 60,
        padding: 4,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50
    },
    rateText: {
        marginLeft: 4,
        fontFamily: 'Roboto_900Black',
        color: "#fff"
    },
    descriptionStyled: {
        fontFamily: 'Roboto_400Regular',
        color: "#c2c2c2"
    },
    descriptionWrap: {
        marginHorizontal: 32,
        marginVertical: 16
    },
    shop: {
        flex: 1,
        width: '100%',
        backgroundColor: '#111427',
        borderRadius: 32,
        paddingVertical: 12,
        alignItems: 'center'
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 220,
        padding: 8,

        borderRadius: 4
    },
    addCart: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        color: "#fff",
        marginRight: 8
    }
})
