import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const Slider = () => {
  const [range, setRange] = useState([1000, 50000]); // Initial range values

  return (
    <View style={styles.container}>
      <MultiSlider
        values={[range[0], range[1]]}
        min={0}
        max={200000}
        step={1}
        onValuesChange={values => setRange(values)}
        selectedStyle={{
          backgroundColor: '#fac0ee',
        }}
        markerStyle={{
          backgroundColor: '#ff6f6f',
        }}
        sliderLength={280} // Adjust the slider length as needed
      />
      <Text style={styles.rangeText}>
        {`Selected range: Rs ${range[0]} - Rs ${range[1]}`}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 6,
    alignItems: 'center', // Center the slider and text
  },
  rangeText: {
    color: 'black',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Slider;
