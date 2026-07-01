import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../service/axiosConfig';
import { LoadingIndicator, ProductCard } from '../../components';
import { setLoading, setProducts } from '../../redux/productSlice';
import { wp } from '../../helpers/common';
import { useNavigation } from '@react-navigation/native';
const Products = () => {
  const dispatch = useDispatch();
  let navigation = useNavigation()
  const { loading, products, selectedCategory, searchQuery } = useSelector(
    state => state.product
  );
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const limit = 10;

  const getProducts = async (skipValue = 0, isLoadMore = false) => {
    if (!isLoadMore) {
      dispatch(setLoading(true));
    } else {
      setLoadingMore(true);
    }

    try {
      let endpoint;

      if (searchQuery) {
        endpoint = `/products/search?q=${searchQuery}&limit=${limit}&skip=${skipValue}`;
      } else if (selectedCategory === 'all') {
        endpoint = `/products?limit=${limit}&skip=${skipValue}`;
      } else {
        endpoint = `/products/category/${selectedCategory}?limit=${limit}&skip=${skipValue}`;
      }
      const response = await axiosInstance.get(endpoint);

      if (isLoadMore) {
        dispatch(setProducts([...products, ...response.data.products]));
      } else {
        dispatch(setProducts(response.data.products));
      }

      setHasMore(response.data.products.length === limit);
      setSkip(skipValue + limit);
    } catch (error) {
      console.log(error);
    } finally {
      if (!isLoadMore) {
        dispatch(setLoading(false));
      } else {
        setLoadingMore(false);
      }
    }
  };

  useEffect(() => {
    setSkip(0);
    getProducts(0, false);
  }, [selectedCategory, searchQuery]);

  const handleLoadMore = () => {
    if (!hasMore || loadingMore) return;
    getProducts(skip, true);
  };
  const renderFooter = () => {
    return loadingMore ? <LoadingIndicator /> : null;
  };
  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard item={item} cardWidth={"49%"} onPress={() => {
              navigation.navigate('ProductDetails', { product: item })
            }} />
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', padding: 5 }}
          showsVerticalScrollIndicator={false}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListFooterComponentStyle={{ paddingBottom: wp(5) }}
          scrollEnabled={true}
        />
      )}
    </View>
  );
};
export { Products };