import {
  View,
  Modal,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React from 'react';

const Loader = () => {
  return (
    <Modal visible={true} transparent>
      <View style={style.modalView}>
        <View style={style.mainView}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  modalView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  mainView: {
    width: 50,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Loader;
