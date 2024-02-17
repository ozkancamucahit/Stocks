
import { Text, View } from '@/src/components/Themed';
import { Stack, useLocalSearchParams } from 'expo-router'
import React from 'react'
import StockListItem from '@/src/components/StockListItem/StockListItem';
import Graph from '@/src/components/Graph/Graph';
import { useQuery, gql } from "@apollo/client";
import { ActivityIndicator } from 'react-native';


type Props = {}

const query = gql`
query MyQuery($symbol: String = "") {
  quote(symbol: $symbol) {
    name
    symbol
    close
    percent_change
  }
}
`

const StockDetails = (props: Props) => {

  const {symbol} = useLocalSearchParams();
  const {loading, data, error} = useQuery(query, {variables: {symbol}});

  if(loading)
    return <ActivityIndicator />

  if(error)
    return <Text>Stock with symbol :{symbol} could not be found</Text>
  
  const stock = data.quote;

  return (
    <View style={{padding:10}}>
      <Stack.Screen options={{title: stock.symbol, headerBackTitleVisible: false}}/>
      <StockListItem stock={stock}/>
      <Graph symbol={stock.symbol}/>
    </View>
  )
}

export default StockDetails

