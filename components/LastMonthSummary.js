
import { useState, useCallback  } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Alert } from "react-native";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { GlobalStyle } from "../constants/globalstyle";
import { AntDesign } from '@expo/vector-icons';

export function LastMonthSummary({data}){
    const currentValue = data.reduce((sum, data) => {
        return sum + data.intValue
    }, 0)
    const navigation = useNavigation();

    console.log(data);

    return(
        <View style={styles.liststyle}>
            <View style={styles.listclickable}>
                <Text style={styles.head}>Total:  </Text>
                <Text style={styles.desc}>Tk. {currentValue}</Text>
            </View>
        </View>
    )
}

export function LastMonthIncomeSummary({data}){
  const currentValue = data.reduce((sum, data) => {
      return sum + data.amount
  }, 0)
  const navigation = useNavigation();

  console.log(data);

  return(
      <View style={styles.liststyle}>
          <View style={styles.listclickable}>
              <Text style={styles.head}>Total:  </Text>
              <Text style={styles.desc}>Tk. {currentValue}</Text>
          </View>
      </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  listclickable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  liststyle: {
    backgroundColor: GlobalStyle.colors.accentcolor,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  items: {
  },
  head: {
    fontSize: 16,
    color: GlobalStyle.colors.whitecolor,
    fontWeight: 'bold'
  },
  desc: {
    color: GlobalStyle.colors.whitecolor
  },
  action: {
    alignSelf: 'center'
  },
  amount: {
    alignSelf: 'center',
    backgroundColor: GlobalStyle.colors.whitecolor,
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 10,
    fontWeight: 'bold'
  },
  amountstyle: {
    color: '#000',
    fontSize: 16,
    width: 80,
    textAlign: 'center'
    }
});
