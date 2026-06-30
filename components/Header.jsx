import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native'
import React from 'react'
import { colors, fonts } from "../Theme"
import { wp } from "../helpers/common"
import Ionicons from 'react-native-vector-icons/Ionicons';
const Header = ({ title = "ShopEasy", onCartPress,
    placeholder = 'Search products...', }) => {
    return (
        <>
            <StatusBar backgroundColor={colors.primary} />
            <View style={styles.container}>
                <View style={styles.topRow}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <TouchableOpacity onPress={onCartPress}>
                        <Ionicons name="cart-outline" size={28} color="#000" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.searchContainer}>
                    <Ionicons name="search-outline" size={20} color="#888" />
                    <TextInput
                        style={styles.input}
                        placeholder={placeholder}
                        placeholderTextColor={colors.gray}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary,
        paddingVertical: 15,
        paddingHorizontal:15
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    title: {
        fontSize: wp(6),
        fontFamily: fonts.fontFamily[700],
        color: colors.textDark
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        paddingHorizontal: 12,
        height: 48,
    },
    input: {
        flex: 1,
        marginLeft: 8,
        color: '#000',
    },
})
export { Header }