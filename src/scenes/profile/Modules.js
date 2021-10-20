import React from 'react';
import {Pressable, Text, StyleSheet, ActivityIndicator, View} from 'react-native';
import Modal from 'react-native-modal';

const Button = props => {
  const {title, onPress, styleProps, textProps, textStyle, isLoading} = props;
  return (
    <Pressable
      style={[styles.editButton, styleProps]}
      onPress={onPress}
      {...props}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <Text style={[styles.buttonText, textStyle]} {...textProps}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};


const BottomModal = props => {
  const {children, isVisible, dismiss, scrollView} = props;
  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      style={styles.modal}
      onBackButtonPress={dismiss}
      onBackdropPress={dismiss}
      onSwipeComplete={dismiss}
      propagateSwipe={true}
      scrollOffset={1}
      scrollTo={() => {}}
      useNativeDriverForBackdrop
      {...props}>
      <View
        style={
          scrollView
            ? // eslint-disable-next-line react-native/no-inline-styles
              {...styles.viewContainer, height: '65%'}
            : styles.viewContainer
        }>
        <View style={styles.modalLine} />
        {children}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  viewContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  modalLine: {
    borderBottomWidth: 4,
    borderBottomColor: '#e4e8ec',
    width: '10%',
    alignSelf: 'center',
    borderRadius: 10,
    marginVertical: 10,
  },
   editButton: {
    width: '38%',
    height: 43,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    borderWidth: 1.7,
    borderColor: '#04abf2',
    alignSelf: 'center',
  },
  buttonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 15,
    color: '#04abf2',
  }
});

export default {BottomModal,Button};