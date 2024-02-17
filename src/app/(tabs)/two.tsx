import { ActivityIndicator, FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import { Stack } from 'expo-router';
import StockListItem from '@/src/components/StockListItem/StockListItem';
import { useQuery, gql } from "@apollo/client";

const query = gql`
query MyQuery($user_id: String!) {
  favoritesByUser_id(user_id: $user_id) {
    id
    quote {
      name
      close
      percent_change
      symbol
    }
  }
}
`


export default function TabTwoScreen() {

  const {loading, data, error} = useQuery(query, {variables: {user_id: 'vadim'}})


  if(loading)
    return <ActivityIndicator />
  if(error)
    return <Text>ERROR</Text>

  const stocks = data.favoritesByUser_id.map((fav) => fav.quote);
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: 'Favorites'}} />
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
  }
});
