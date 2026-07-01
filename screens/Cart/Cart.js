import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { CartButton, FavoriteButton } from '../../components';
import { colors, fonts } from '../../Theme';
import { wp } from '../../helpers/common';
const Cart = () => {
    const { cartItems, totalItems, totalPrice } = useSelector(state => state.cart);
    const renderItem = ({ item }) => {
        const discountedPrice = item.discountPercentage
            ? (item.price * (1 - item.discountPercentage / 100)).toFixed(2)
            : item.price;
        return (
            <View style={styles.card}>
                <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.image}
                    resizeMode="cover"
                />

                <View style={styles.content}>
                    <View style={styles.header}>
                        <View style={styles.info}>
                            <View>
                                <Text
                                    style={styles.title}
                                    numberOfLines={1}
                                >
                                    {item.title}
                                </Text>
                            </View>
                            <View style={styles.priceRow}>
                                <Text style={styles.price}>
                                    ₹{discountedPrice}
                                </Text>

                                <Text style={styles.oldPrice}>
                                    ₹{item.price}
                                </Text>
                            </View>

                            <View style={styles.cartWrapper}>
                                <CartButton item={item} />
                            </View>
                        </View>
                        <FavoriteButton item={item} />
                    </View>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={
                    <View style={styles.summary}>
                        <Text style={styles.summaryTitle}>
                            Price Details
                        </Text>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>
                                Total Items
                            </Text>

                            <Text style={styles.summaryValue}>
                                {totalItems}
                            </Text>
                        </View>

                        <View style={styles.summaryRow}>
                            <Text style={styles.summaryLabel}>
                                Total Price
                            </Text>

                            <Text style={styles.summaryValue}>
                                ₹{totalPrice.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },

    card: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        marginHorizontal: wp(4),
        marginTop: wp(3),
        padding: wp(3),
        borderRadius: wp(3),
        elevation: 2,
    },

    image: {
        width: wp(24),
        height: wp(24),
        borderRadius: wp(2),
    },

    content: {
        flex: 1,
        marginLeft: wp(3),
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    info: {
        flex: 1,
        marginRight: wp(3),
    },

    title: {
        fontSize: wp(4),
        fontFamily: fonts.fontFamily['600'],
        color: colors.textDark,
    },

    priceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: wp(2),
    },

    price: {
        fontSize: wp(4.2),
        color: colors.primary,
        fontFamily: fonts.fontFamily['700'],
    },

    oldPrice: {
        marginLeft: wp(2),
        fontSize: wp(3.2),
        color: colors.textLight,
        textDecorationLine: 'line-through',
    },

    cartWrapper: {
        marginTop: wp(3),
        alignSelf: 'flex-start',
    },

    summary: {
        backgroundColor: colors.white,
        margin: wp(4),
        padding: wp(4),
        borderRadius: wp(3),
    },

    summaryTitle: {
        fontSize: wp(4.5),
        fontFamily: fonts.fontFamily['700'],
        color: colors.textDark,
        marginBottom: wp(3),
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: wp(2),
    },

    summaryLabel: {
        fontSize: wp(3.8),
        color: colors.textLight,
        fontFamily: fonts.fontFamily['500'],
    },

    summaryValue: {
        fontSize: wp(3.8),
        color: colors.textDark,
        fontFamily: fonts.fontFamily['700'],
    },
});

export { Cart };