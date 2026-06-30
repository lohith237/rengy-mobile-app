import React, { useEffect } from 'react';
import { View, FlatList, Pressable, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import axiosInstance from '../../service/axiosConfig';
import { setCategories, setLoading, setSelectedCategory } from '../../redux/productSlice';
import { colors, fonts } from '../../Theme';
import { wp } from '../../helpers/common';
import { LoadingIndicator } from '../../components';
const Categories = () => {
    const dispatch = useDispatch();
    const { loading, categories, selectedCategory } = useSelector(state => state.product);
    const getData = async () => {
        try {
            const response = await axiosInstance.get('/products/categories');
            const allCategory = { name: 'All', slug: 'all' };
            dispatch(setCategories([allCategory, ...response.data]));
            dispatch(setSelectedCategory('all'));
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    const renderItem = ({ item }) => {
        return (
            <Pressable style={[styles.item, selectedCategory === item.slug && styles.selectedItem]} onPress={() => dispatch(setSelectedCategory(item.slug))}>
                <Text style={[styles.text, selectedCategory === item.slug && styles.selectedText]}>{item.name}</Text>
            </Pressable>
        );
    };
    return (
        <View>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.slug}
                renderItem={renderItem}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    item: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#eee',
        borderRadius: 20,
        marginRight: 10,
    },
    text: {
        fontSize: wp(4.5),
        fontFamily: fonts.fontFamily[500],
        color: colors.textDark,
    },
    selectedItem: {
        backgroundColor: colors.primary,
    },

    selectedText: {
        color: '#fff',
    },
})
export { Categories };