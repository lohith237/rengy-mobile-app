import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
} from '../redux/cartSlice';
import { colors, fonts } from '../Theme';
import { wp } from '../helpers/common';
const CartButton = ({ item }) => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const cartItem = cartItems.find(cart => cart.id === item.id);
    const isOutOfStock =
        item.stock <= 0 ||
        item.availabilityStatus !== 'In Stock';
    return isOutOfStock ? (
        <Pressable style={[styles.button, styles.disabled]} disabled>
            <Text style={styles.buttonText}>Out of Stock</Text>
        </Pressable>
    ) : !cartItem ? (
        <Pressable
            style={styles.button}
            onPress={() => dispatch(addToCart(item))}
        >
            <Icon
                name="cart-outline"
                size={wp(5)}
                color={colors.white}
            />
            <Text style={styles.buttonText}>Add to Cart</Text>
        </Pressable>
    ) : (
        <View style={styles.quantityContainer}>
            <Pressable
                style={styles.iconButton}
                onPress={() => dispatch(decreaseQuantity(item.id))}
            >
                <Icon
                    name="remove"
                    size={wp(5)}
                    color={colors.white}
                />
            </Pressable>

            <Text style={styles.quantity}>
                {cartItem.quantity}
            </Text>

            <Pressable
                style={[
                    styles.iconButton,
                    cartItem.quantity >= item.stock && styles.disabled,
                ]}
                disabled={cartItem.quantity >= item.stock}
                onPress={() => dispatch(increaseQuantity(item.id))}
            >
                <Icon
                    name="add"
                    size={wp(5)}
                    color={colors.white}
                />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        height: wp(11),
        backgroundColor: colors.primary,
        borderRadius: wp(2),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: wp(2),
    },

    buttonText: {
        color: colors.white,
        fontSize: wp(4),
        fontFamily: fonts.fontFamily['600'],
    },

    quantityContainer: {
        height: wp(11),
        backgroundColor: colors.primary,
        borderRadius: wp(2),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: wp(2),
    },

    iconButton: {
        width: wp(8),
        height: wp(8),
        borderRadius: wp(4),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',
    },

    quantity: {
        color: colors.white,
        fontSize: wp(4),
        fontFamily: fonts.fontFamily['700'],
    },

    disabled: {
        opacity: 0.5,
    },
});

export { CartButton };