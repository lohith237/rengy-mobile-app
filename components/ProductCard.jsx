import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { wp, deviceWidth, hp } from '../helpers/common';
import { fonts, colors } from '../Theme';
import { FavoriteButton } from './FavoriteButton';
import { CartButton } from './CartButton';
const ProductCard = ({ item, onPress, cardWidth = "100%" }) => {
  const discountPercent = item.discountPercentage
    ? Math.round(item.discountPercentage)
    : 0;

  const discountedPrice = item.discountPercentage
    ? (item.price * (1 - item.discountPercentage / 100)).toFixed(2)
    : item.price;

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.thumbnail || item.image?.[0] }}
          style={styles.image}
          resizeMode="stretch"
        />

        {discountPercent > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{discountPercent}%</Text>
          </View>
        )}
        <FavoriteButton item={item} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>

        <View style={styles.ratingContainer}>
          <Icon name="star" size={wp(3.5)} color="#FFD700" />
          <Text style={styles.rating}>{item.rating?.toFixed(1) || 'N/A'}</Text>
          <Text style={styles.reviewCount}>
            ({item.reviews?.length || 0})
          </Text>
        </View>

        <View style={styles.priceContainer}>
          <Text style={styles.discountedPrice}>₹{discountedPrice}</Text>
          {item.discountPercentage > 0 && (
            <Text style={styles.originalPrice}>₹{item.price}</Text>
          )}
        </View>

        <Text
          style={[
            styles.stock,
            { color: item.stock > 0 ? colors.primary : colors.danger },
          ]}
        >
          {item.stock > 0 ? 'In Stock' : 'Out of Stock'}
        </Text>
        <View style={styles.cartContainer}>
          <CartButton item={item} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.white,
    borderRadius: wp(3),
    overflow: 'hidden',
    marginVertical: wp(2),
    elevation: 3,
    shadowColor: colors.textDark,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position:"relative"
  },
  imageContainer: {
    width: '100%',
    height: wp(40),
    backgroundColor: colors.background,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: wp(2),
    left: wp(2),
    backgroundColor: colors.primary,
    paddingHorizontal: wp(2),
    paddingVertical: wp(1),
    borderRadius: wp(1.5),
  },
  discountText: {
    color: colors.white,
    fontSize: wp(2.5),
    fontFamily: fonts.fontFamily['600'],
  },
  favoriteBtn: {
    position: 'absolute',
    bottom: wp(2),
    right: wp(2),
    width: wp(9),
    height: wp(9),
    borderRadius: wp(4.5),
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: wp(2.5),
  },
  title: {
    fontSize: wp(3.2),
    fontFamily: fonts.fontFamily['600'],
    color: colors.textDark,
    marginBottom: wp(1.5),
    minHeight:hp(5)
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(2),
  },
  rating: {
    fontSize: wp(2.8),
    fontFamily: fonts.fontFamily['600'],
    color: colors.textDark,
    marginLeft: wp(1),
  },
  reviewCount: {
    fontSize: wp(2.4),
    color: colors.textLight,
    marginLeft: wp(1),
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: wp(1.5),
  },
  discountedPrice: {
    fontSize: wp(4),
    fontFamily: fonts.fontFamily['700'],
    color: colors.primary,
  },
  originalPrice: {
    fontSize: wp(2.8),
    color: colors.textLight,
    textDecorationLine: 'line-through',
    marginLeft: wp(1.5),
  },
  stock: {
    fontSize: wp(2.4),
    fontFamily: fonts.fontFamily['600'],
  },
  cartContainer: {
  marginTop: wp(3),
},
});

export { ProductCard };