import { Stock } from '@/src/components/StockListItem/Stock';
import { View, Text } from '../Themed';
import { StyleSheet, Pressable } from 'react-native';
import Colors from '@/src/constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { MonoText } from '../StyledText';

import { useMutation, gql } from "@apollo/client";

type StockListItem = {
  stock: Stock;
};

const mutation = gql`
mutation MyMutation($symbol :String!, $user_id :String!) {
  insertFavorites(symbol: $symbol, user_id: $user_id) {
    id
    symbol
    user_id
  }
}
`

const StockListItem = ({ stock }: StockListItem) => {

  const [runMutation]  = useMutation(mutation, 
    {variables: {user_id : 'vadim', symbol: stock.symbol}});

  const onFavoritesPressed = () => {
    runMutation();
  }



  return (
    <Link href={`/pages/StockDetail/${stock.symbol}`} asChild>
      <Pressable style={styles.container}>
        <View style={{ flex: 1, gap: 5 }}>
          <Text
            style={styles.symbol}
            lightColor={Colors.light.tint}
            darkColor={Colors.light.tint}
          >
            {stock.symbol} <AntDesign onPress={onFavoritesPressed} name="staro" size={16} color="dimgray" />
          </Text>
          <Text lightColor="gray" darkColor="gray" numberOfLines={1}>
            {stock.name}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end', gap: 5 }}>
          <MonoText style={styles.price}>
            ${Number.parseFloat(stock.close).toFixed(1)}
          </MonoText>
          <MonoText
            style={{
              color:
                Number.parseFloat(stock.percent_change) > 0 ? 'green' : 'red',
            }}
          >
            {Number.parseFloat(stock.percent_change) > 0 && '+'}
            {Number.parseFloat(stock.percent_change).toFixed(1)}%
          </MonoText>
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
  },
  symbol: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    fontWeight: 'bold',
  },
});

export default StockListItem;
