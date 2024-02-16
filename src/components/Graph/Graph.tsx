import React, { useState } from "react";
import { GraphPoint, LineGraph } from "react-native-graph";
import { Text, View } from "../Themed";
import Colors from "@/src/constants/Colors";
import timeseries from '@/assets/data/timeseries.json'
import { MonoText } from "../StyledText";


type Props = {};

const Graph = (props: Props) => {
  const points : GraphPoint[] = timeseries.values.map(v => {
    return {date: new Date(v.datetime), value: Number.parseFloat(v.close)}
  })

  const [selectedPoint, setSelectedPoint] = useState<GraphPoint>();


  const onPointSelected = (point : GraphPoint) => {
    setSelectedPoint(point);
  }


  return (
    <View>
      <MonoText style={{fontSize: 20, color: 'green'}}>${selectedPoint?.value.toFixed(1)}</MonoText>
      <Text style={{color:'gray'}}>{new Date().toDateString()}</Text>


      <LineGraph 
        style={{width: '100%', height: 300}}
        points={points}
        animated={true}
        gradientFillColors={[Colors.light.tint, '#000']}
        enablePanGesture
        enableIndicator
        indicatorPulsating
        onPointSelected={onPointSelected}
        color= {Colors.light.tint}/>
    </View>
  );
};

export default Graph;
