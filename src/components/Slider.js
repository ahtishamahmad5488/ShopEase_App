import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Slider = () => {
  const [range, setRange] = useState([0, 100000]);

  return (
    <View style={styles.container}>
      <MultiSlider
        values={[range[0]]}
        min={0}
        max={100000}
        step={1}
        onValuesChange={values => setRange(values)}
        selectedStyle={{
          backgroundColor: '#fac0ee',
        }}
        markerStyle={{
          backgroundColor: '#ff6f6f',
        }}
      />
      <Text style={styles.rangeText}>{`Selected range: ${range[0]}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },

  rangeText: {
    color: 'black',
  },
});

export default Slider;
