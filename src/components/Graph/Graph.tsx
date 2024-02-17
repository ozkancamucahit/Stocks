import React, { useState } from "react";
import { GraphPoint, LineGraph } from "react-native-graph";
import { Text, View } from "../Themed";
import Colors from "@/src/constants/Colors";
import timeseries from "@/assets/data/timeseries.json";
import { MonoText } from "../StyledText";
import { useQuery, gql } from "@apollo/client";
import { ActivityIndicator } from "react-native";

interface Props {
  symbol : String;
  interval? : String;
};

const query = gql`
  query MyQuery($interval: String!, $symbol: String!) {
    timeSeries(interval: $interval, symbol: $symbol) {
      values {
        close
        datetime
      }
    }
  }
`;

const Graph = ({symbol, interval}: Props) => {
  
  const [selectedPoint, setSelectedPoint] = useState<GraphPoint>();
  
  const { data, loading, error } = useQuery(query, {
    variables: { symbol: symbol, interval: "1day" },
  });
  
  if (loading) 
  return <ActivityIndicator />;
  
  if (error) 
  return <Text>ERROR</Text>;

  console.log(JSON.stringify(data, null, 2));
  
  const points: GraphPoint[] = data.timeSeries.values.map((v) => {
    return { date: new Date(v.datetime), value: Number.parseFloat(v.close) };
  });

  const onPointSelected = (point: GraphPoint) => {
    setSelectedPoint(point);
  };

  return (
    <View>
      {selectedPoint ? (
        <MonoText style={{ fontSize: 20, color: "green" }}>
          ${selectedPoint?.value.toFixed(1)}
        </MonoText>
      ) : (
        <Text>hold down on a point</Text>
      )}

      <Text style={{ color: "gray" }}>{new Date().toDateString()}</Text>

      <LineGraph
        style={{ width: "100%", height: 300 }}
        points={points}
        animated={true}
        gradientFillColors={[Colors.light.tint, "#000"]}
        enablePanGesture
        enableIndicator
        indicatorPulsating
        onPointSelected={onPointSelected}
        color={Colors.light.tint}
      />
    </View>
  );
};

export default Graph;
