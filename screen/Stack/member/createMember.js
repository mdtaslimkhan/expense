import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet,TextInput, TouchableOpacity } from "react-native";
import { GlobalStyle } from "../../../constants/globalstyle";
import { insertMember } from "../../../utils/members_controller";

const CreateMember = ({navigation, route}) => {
    const [name, setText] = useState("");
    const [account, setAccount] = useState("");
    
    async function saveItem(){
      console.log('rendured');
      console.log('rendured' + name + " " + account);
      await insertMember({name, account});
       navigation.goBack();
    }

    useEffect(() => {
        navigation.setOptions({
          title: "Add member"
        });
        
        console.log('rendured');
    },[])



    return(
        <View style={styles.container}>
            <Text>Name</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(text) => setText(text)}
             />

            <Text>Account</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(text) => setAccount(text)}
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


export default CreateMember;