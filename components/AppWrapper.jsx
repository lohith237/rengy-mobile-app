import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../Theme'
import { ScrollView } from 'react-native-gesture-handler'

const AppWrapper = ({ children,
    style,
    scroll = false,
    contentContainerStyle }) => {
    return (
        <SafeAreaView style={[style, styles.container]}>
            {
                scroll ? (
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={contentContainerStyle}>
                        {children}
                    </ScrollView>
                ) : (
                    children
                )
            }
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding:15
    }
})
export { AppWrapper }