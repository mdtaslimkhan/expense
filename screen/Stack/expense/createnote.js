import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet,TextInput, TouchableOpacity } from "react-native";
import { insertExpense } from "../../../utils/database";
import { Expense } from "../../../models/expense";
import { GlobalStyle } from "../../../constants/globalstyle";

const Createnote = ({route}) => {
    const [text, setText] = useState("");
    const [desc, setDesc] = useState("");
    const navigation = useNavigation();
    
    async function saveItem(){
      console.log('rendured');
      await insertExpense({text, desc});
       navigation.goBack();
    }

    useEffect(() => {
        console.log('rendured');
    },[])



    return(
        <View style={styles.container}>
            <Text>Head</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(text) => setText(text)}
             />

            <Text>Amount</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(text) => setDesc(text)}
            keyboardType='numeric'
            />

            <TouchableOpacity style={styles.btn} onPress={saveItem}>
                <Text style={styles.btntext}>Save</Text>
            </TouchableOpacity>
        </View>
    );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginTop: 8,
    marginBottom: 20
  },
  btn: {
    backgroundColor: GlobalStyle.colors.primary300,
    alignItems: 'center',
    borderRadius: 8, 
    padding: 10
  },
  btntext: {
    color: GlobalStyle.colors.whitecolor
  }
  
});


export default Createnote;