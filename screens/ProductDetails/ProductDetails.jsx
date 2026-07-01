import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../service/axiosConfig';
import { setLoading } from '../../redux/productSlice';
import { colors, fonts } from '../../Theme';
import { hp, wp } from '../../helpers/common';
import { LoadingIndicator, FavoriteButton, ImageCarousel, CollapsibleDescription, CartButton } from '../../components';

const ProductDetails = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.product);
  const [selectedProduct, setSelectedProduct] = useState(product);
  useEffect(() => {
    if (product?.id) {
      fetchFullProductDetail();
    }
  }, [product]);

  const fetchFullProductDetail = async () => {
    dispatch(setLoading(true));
    try {
      const response = await axiosInstance.get(`/products/${product.id}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading || !selectedProduct) {
    return <LoadingIndicator />;
  }

  const discountPercent = selectedProduct.discountPercentage
    ? Math.round(selectedProduct.discountPercentage)
    : 0;

  const discountedPrice = selectedProduct.discountPercentage
    ? (
      selectedProduct.price *
      (1 - selectedProduct.discountPercentage / 100)
    ).toFixed(2)
    : selectedProduct.price;

  const renderReview = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewRating}>
          {'⭐'.repeat(item.rating)}
        </Text>
        <Text style={styles.reviewUser}>{item.reviewerName}</Text>
      </View>
      <Text style={styles.reviewText}>{item.comment}</Text>
    </View>
  );

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <ScrollView contentContainerStyle={{ paddingBottom: hp(10) }} style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.carouselWrapper}>
          <ImageCarousel images={selectedProduct.images} />
          <View style={styles.favoriteBtnWrapper}>
            <FavoriteButton item={selectedProduct} />
          </View>
        </View>

        <View style={styles.stockStatus}>
          <Text
            style={[
              styles.stockText,
              {
                color: selectedProduct.stock > 0 ? colors.primary : colors.danger,
              },
            ]}
          >
            {selectedProduct.stock > 0
              ? `In Stock (${selectedProduct.stock})`
              : 'Out of Stock'}
          </Text>
        </View>

        <View style={styles.content}>
          <View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title} numberOfLines={2}>
                {selectedProduct.title}
              </Text>
              {selectedProduct.brand && (
                <Text style={styles.brand}>{selectedProduct.brand}</Text>
              )}
            </View>
          </View>
          <View style={styles.ratingRow}>
            <Text style={styles.rating}>
              ⭐ {selectedProduct.rating?.toFixed(1) || 'N/A'}
            </Text>
            <Text style={styles.reviewCount}>
              ({selectedProduct.reviews?.length || 0} reviews)
            </Text>
          </View>
          <View style={styles.priceSection}>
            <Text style={styles.discountedPrice}>₹{discountedPrice}</Text>
            {discountPercent > 0 && (
              <Text style={styles.originalPrice}>₹{selectedProduct.price}</Text>
            )}
            {discountPercent > 0 && (
              <Text style={styles.discountBadge}>-{discountPercent}%</Text>
            )}
          </View>
          <CollapsibleDescription description={selectedProduct.description} />
          {selectedProduct.warrantyInformation && (
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Warranty</Text>
              <Text style={styles.infoText}>
                {selectedProduct.warrantyInformation}
              </Text>
            </View>
          )}
          {selectedProduct.returnPolicy && (
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Return Policy</Text>
              <Text style={styles.infoText}>
                {selectedProduct.returnPolicy}
              </Text>
            </View>
          )}
          {selectedProduct.reviews && selectedProduct.reviews.length > 0 && (
            <Text style={styles.sectionTitle}>Reviews</Text>
          )}
        </View>
        {selectedProduct.reviews && selectedProduct.reviews.length > 0 && (
          <FlatList
            data={selectedProduct.reviews}
            renderItem={renderReview}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(_, index) => index.toString()}
            scrollEnabled={true}
            contentContainerStyle={styles.reviewsListContent}
          />
        )}
      </ScrollView>
      <View style={styles.bottomBar}>
        <CartButton item={selectedProduct} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  carouselWrapper: {
    width: '100%',
    position: 'relative',
    marginTop: -StatusBar.currentHeight + 10 || 0,
    paddingTop: StatusBar.currentHeight || 0,
  },
  favoriteBtnWrapper: {
    position: 'absolute',
    top: wp(StatusBar.currentHeight || 0),
    right: wp(4),
    zIndex: 10,
  },
  stockStatus: {
    paddingHorizontal: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: colors.background,
  },
  stockText: {
    fontSize: wp(4),
    fontFamily: fonts.fontFamily['600'],
  },
  content: {
    padding: wp(4),
  },
  title: {
    fontSize: wp(5),
    fontFamily: fonts.fontFamily['700'],
    color: colors.textDark,
  },
  brand: {
    fontSize: wp(3.5),
    fontFamily: fonts.fontFamily['500'],
    color: colors.textLight,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: wp(4),
    fontFamily: fonts.fontFamily['600'],
    marginRight: wp(2),
  },
  reviewCount: {
    fontSize: wp(3),
    color: colors.textLight,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  discountedPrice: {
    fontSize: wp(6),
    fontFamily: fonts.fontFamily['700'],
    color: colors.primary,
    marginRight: wp(2),
  },
  originalPrice: {
    fontSize: wp(4),
    textDecorationLine: 'line-through',
    color: colors.textLight,
    marginRight: wp(2),
  },
  discountBadge: {
    backgroundColor: colors.primary,
    color: colors.white,
    paddingHorizontal: wp(2),
    borderRadius: wp(1),
    fontFamily: fonts.fontFamily['600'],
    fontSize: wp(3),
  },
  infoCard: {
    backgroundColor: colors.background,
    padding: wp(3),
    borderRadius: wp(2),
  },
  infoLabel: {
    fontSize: wp(4),
    fontFamily: fonts.fontFamily['600'],
    color: colors.textDark,
  },
  infoText: {
    fontSize: wp(3.5),
    fontFamily: fonts.fontFamily['400'],
    color: colors.textLight,
  },
  sectionTitle: {
    fontSize: wp(4.5),
    fontFamily: fonts.fontFamily['700'],
    color: colors.textDark,
    paddingHorizontal: wp(4),
  },
  reviewsListContent: {
    paddingHorizontal: wp(4),
  },
  reviewCard: {
    backgroundColor: colors.background,
    padding: wp(3),
    borderRadius: wp(2),
    marginRight: wp(2),
    width: wp(70),
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  reviewRating: {
    fontSize: wp(3),
  },
  reviewUser: {
    fontSize: wp(3.5),
    fontFamily: fonts.fontFamily['600'],
    color: colors.textDark,
  },
  reviewText: {
    fontSize: wp(3.5),
    fontFamily: fonts.fontFamily['400'],
    color: colors.textLight,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    width:"100%",
    backgroundColor: colors.white,
    paddingHorizontal: wp(4),
    paddingVertical: wp(3),
    borderTopWidth: 1,
    borderTopColor: colors.background,
    
  },
});

export { ProductDetails };