
import { useState, useCallback  } from "react";
import { View, Text, StyleSheet, Pressable, TouchableOpacity, Alert } from "react-native";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import { GlobalStyle } from "../constants/globalstyle";
import { AntDesign } from '@expo/vector-icons';

export function Listitems({items,deletenote}){
    const navigation = useNavigation();
    function navTo(){
        navigation.navigate('Editnote', {items: items});
    }
    return(
        <View style={styles.liststyle}>
            <TouchableOpacity style={styles.listclickable} onPress={navTo}>
            <View style={styles.items}>
                <Text style={styles.head}>{items.value} </Text>
                <Text style={styles.desc}>{items.date}</Text>
            </View>
            <View style={styles.amount}>
              <Text style={styles.amountstyle}>Tk. {items.intValue}</Text>
            </View>
            </TouchableOpacity>
            <View style={styles.action}>
            <TouchableOpacity onPress={() => deletenote(items)} >
                <AntDesign name="delete" size={26} color={GlobalStyle.colors.whitecolor} />
            </TouchableOpacity>
            </View>
        </View>
    )
}

export function Memberitem({items,deletenote}){
  const navigation = useNavigation();
  function navTo(){
      navigation.navigate('EditMember', {items: items});
  }
  return(
      <View style={styles.liststyle}>
          <TouchableOpacity style={styles.listclickable} onPress={navTo}>
          <View style={styles.items}>
              <Text style={styles.head}>{items.name}</Text>
              <Text style={styles.desc}>Account: {items.account}</Text>
          </View>
          </TouchableOpacity>
          <View style={styles.action}>
          <TouchableOpacity onPress={() => deletenote(items)} >
              <AntDesign name="delete" size={26} color={GlobalStyle.colors.whitecolor} />
          </TouchableOpacity>
          </View>
      </View>
  )
}


export function MemberCollectionitem({items,deletenote}){
  const navigation = useNavigation();
  function navTo(){
      navigation.navigate('EditMemberCollection', {items: items});
  }
  return(
      <View style={styles.liststyle}>
          <TouchableOpacity style={styles.listclickable} onPress={navTo}>
          <View style={styles.items}>
              <Text style={styles.head}>{items.name}</Text>
              <Text style={styles.desc}>Tk. {items.amount} ; Data: {items.date}</Text>
          </View>
          </TouchableOpacity>
          <View style={styles.action}>
          <TouchableOpacity onPress={() => deletenote(items)} >
              <AntDesign name="delete" size={26} color={GlobalStyle.colors.whitecolor} />
          </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%'
  },
  liststyle: {
    backgroundColor: GlobalStyle.colors.primary300,
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
    paddingTop: 5,
    paddingBottom: 5,
    marginRight: 10,
    fontWeight: 'bold',
    borderRadius: 8
  },
  amountstyle: {
    color: '#000',
    fontSize: 14,
    width: 80,
    textAlign: 'center'
    }
});
