import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { Stack } from 'expo-router';

import top5 from '@/assets/data/top5.json';
import StockListItem from '@/src/components/StockListItem/StockListItem';

import { useQuery, gql } from '@apollo/client';

const query = gql`
query MyQuery($symbol: String = "") {
  quotes(symbol: $symbol) {
    value {
      name
      symbol
      percent_change
      close
    }
  }
}
`

export default function TabOneScreen() {
  // const stocks = Object.values(top5);
  const {loading, data, error} = useQuery(query, {variables: {symbol: 'AAPL,TSLA'}});

  if(loading)
    return <ActivityIndicator />
  
    if(error){
      return <Text>Failed to fetch data</Text>
    }

    // console.log(data);

    const stocks = data.quotes.map((q) => q.value);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Stocks'}} />
      <FlatList
        data={stocks}
        contentContainerStyle={{gap:2, padding:5}}
        renderItem={({item}) => <StockListItem stock={item}/> }>

      </FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
    
  },
});
