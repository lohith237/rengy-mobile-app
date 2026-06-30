import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import { colors, fonts } from '../Theme';
import { wp } from '../helpers/common';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../redux/productSlice';
import { useDebounce } from '../utils';

const Header = ({
  title = 'ShopEasy',
  onCartPress,
  placeholder = 'Search products...',
}) => {
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');
  const debouncedSearch = useDebounce(searchInput, 500);

  React.useEffect(() => {
    dispatch(setSearchQuery(debouncedSearch));
  }, [debouncedSearch, dispatch]);

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <TouchableOpacity onPress={onCartPress}>
            <Ionicons name="cart-outline" size={wp(7)} color={colors.white} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.searchContainer} activeOpacity={0.8}>
          <Ionicons name="search-outline" size={wp(5)} color={colors.textLight} />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={colors.textLight}
            onChangeText={handleSearchChange}
            value={searchInput}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    paddingVertical: wp(4),
    paddingHorizontal: wp(4),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: wp(3),
  },
  title: {
    fontSize: wp(6),
    fontFamily: fonts.fontFamily['700'],
    color: colors.white,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: wp(3),
    paddingHorizontal: wp(3),
    height: wp(12),
  },
  input: {
    flex: 1,
    marginLeft: wp(2),
    color: colors.textDark,
    fontSize: wp(3.5),
    fontFamily: fonts.fontFamily['400'],
  },
});

export { Header };