import React, { useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { wp } from '../helpers/common';
import { colors } from '../Theme';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../redux/favoritesSlice';

const FavoriteButton = ({ item }) => {
  const dispatch = useDispatch();
  const { favorites } = useSelector(state => state.favorites);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorited = favorites.some(fav => fav.id === item.id);
    setIsFavorite(favorited);
  }, [favorites, item.id]);

  const handleFavoritePress = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(item.id));
    } else {
      dispatch(addToFavorites(item));
    }
  };
  return (
    <TouchableOpacity
      style={[styles.favoriteBtn]}
      onPress={handleFavoritePress}
    >
      <Icon
        name={isFavorite ? 'heart' : 'heart-outline'}
        size={wp(5)}
        color={isFavorite ? colors.primary : colors.white}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
  favoriteBtnActive: {
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
  },
});

export { FavoriteButton };