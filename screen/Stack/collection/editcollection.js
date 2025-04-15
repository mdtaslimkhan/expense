import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet,TextInput, TouchableOpacity } from "react-native";
import { editExpense } from "../../../utils/database";
import { GlobalStyle } from "../../../constants/globalstyle";

const EditMemberCollection = ({route}) => {
    const val = route.params.items;
    const [text, setText] = useState("");
    const [desc, setDesc] = useState();
    const navigation = useNavigation();
    console.log('rendured');
    console.log(val);
    console.log('rendured sdfdf');

    async function saveItem(){
       await editExpense({text: text, desc: desc, id: val.id});
       navigation.goBack();
    }

    useEffect(() => {
        setText(val.value);
        setDesc(val.intValue);
    },[route.params])



    return(
        <View style={styles.container}>
            <Text>Head</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(text) => setText(text)}
            value={text}
             />
            <Text>Amount</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(text) => setDesc(text)}
            value={desc}
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
    color: GlobalStyle.colors.primary300
  }
  
});


export default EditMemberCollection;