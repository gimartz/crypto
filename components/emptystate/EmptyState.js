/**
 * Foodvila - React Native Template
 *
 * @format
 * @flow
 */

// import dependencies
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';

// import components
import {Paragraph} from '../text/CustomText';

// import colors
import Colors from '../../theme/colors';

// EmptyState Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryColor,
  },
  title: {
    marginBottom: 16,
    fontSize: 18,
    color: Colors.primaryText,
  },
  message: {
    paddingHorizontal: 48,
    paddingBottom: 32,
    fontSize: 14,
    textAlign: 'center',
  },
});

// EmptyState Props
type Props = {
  showIcon: boolean,
  iconName: string,
  title: string,
  message: string,
};

// EmptyState
const EmptyState = ({
  showIcon,
  iconName,
  title = 'Empty State Title',
  message = 'Empty State Message',
}: Props) => (
  <View style={styles.container}>
    {showIcon && (
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={iconName} size={32} color={Colors.onPrimaryColor} />
      </View>
    )}

    <Text style={styles.title}>{title}</Text>

    <Paragraph style={styles.message}>{message}</Paragraph>
  </View>
);

export default EmptyState;