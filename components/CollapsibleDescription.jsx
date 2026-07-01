import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { colors, fonts } from '../Theme';
import { wp } from '../helpers/common';

const CollapsibleDescription = ({ description }) => {
    const [expanded, setExpanded] = useState(false);
    const isLong = description && description.length > 150;
    return (
        <View style={styles.container}>
            <Text
                style={styles.description}
                numberOfLines={expanded ? undefined : 3}
            >
                {description}
            </Text>

            {isLong && (
                <TouchableOpacity
                    onPress={() => setExpanded(!expanded)}
                    style={styles.readMoreBtn}
                >
                    <Icon
                        name={expanded ? 'chevron-up' : 'chevron-down'}
                        size={wp(5)}
                        color={colors.primary}
                    />
                    <Text style={styles.readMore}>
                        {expanded ? 'Read Less' : 'Read More'}
                    </Text>
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: wp(4),
    },
    description: {
        fontSize: wp(3.5),
        fontFamily: fonts.fontFamily['400'],
        color: colors.textDark,
        lineHeight: wp(5.5),
    },
    readMoreBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: wp(2),
    },
    readMore: {
        fontSize: wp(3.5),
        fontFamily: fonts.fontFamily['600'],
        color: colors.primary,
        marginLeft: wp(1),
    },
});

export { CollapsibleDescription };