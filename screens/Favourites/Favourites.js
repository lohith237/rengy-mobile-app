import React from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';
import { useSelector } from 'react-redux';
import { ProductCard } from '../../components';
import { colors, fonts } from '../../Theme';
import { wp } from '../../helpers/common';

const Favourites = ({ navigation }) => {
    const { favorites } = useSelector(state => state.favorites);
    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                numColumns={2}
                keyExtractor={item => item.id.toString()}
                columnWrapperStyle={styles.row}
                contentContainerStyle={[
                    styles.contentContainer,
                    favorites.length === 0 && styles.emptyContainer,
                ]}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <ProductCard
                        item={item}
                        cardWidth="49%"
                        onPress={() =>
                            navigation.navigate('ProductDetails', {
                                product: item,
                            })
                        }
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.emptyView}>
                        <Text style={styles.emptyTitle}>
                            No Favourite Products
                        </Text>
                        <Text style={styles.emptyText}>
                            Add products to your favourites to see them here.
                        </Text>
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

    contentContainer: {
        padding: wp(3),
    },

    row: {
        justifyContent: 'space-between',
    },

    emptyContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    emptyView: {
        alignItems: 'center',
        paddingHorizontal: wp(8),
    },

    emptyTitle: {
        fontSize: wp(5),
        fontFamily: fonts.fontFamily['700'],
        color: colors.textDark,
        marginBottom: wp(2),
    },

    emptyText: {
        fontSize: wp(3.8),
        fontFamily: fonts.fontFamily['400'],
        color: colors.textLight,
        textAlign: 'center',
    },
});

export { Favourites };