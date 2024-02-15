import { View, Text } from '@/src/components/Themed';
import React from 'react';
import { LineGraph, GraphPoint } from 'react-native-graph';
import timeseries from '@assets/data/timeseries.json';

const Chart = () => {
  const points: GraphPoint[] = timeseries.values.map((value) => ({
    date: new Date(value.datetime),
    value: Number.parseFloat(value.close),
  }));
  return (
    <View>
      <LineGraph
        style={{ width: '100%', height: 300 }}
        points={points}
        color="#017560"
        animated={true}
        gradientFillColors={['#0175605D', '#7476df00']}
      />
    </View>
  );
};

export default Chart;
