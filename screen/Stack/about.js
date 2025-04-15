import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Updates from 'expo-updates';
import { GlobalStyle } from "../../constants/globalstyle";
import { useState } from "react";





const About = () => {
  const [updateStatus, setUpdateStatus] = useState("");



  async function onFetchUpdateAsync() {
    try {
      setUpdateStatus("Working on update");
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {

        // Fetch the update if available
        setUpdateStatus("Try to fetch available updates");
        await Updates.fetchUpdateAsync();

        // Reload the app with the new update
        setUpdateStatus("App reloading");
        await Updates.reloadAsync();

      } else {
        setUpdateStatus("App is up-to-date!");
      }

    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }


    return(
        <View style={styles.container}>
            <Text>About this app</Text>
            <Text>Version: 1.0.7</Text>
            <TouchableOpacity style={styles.btn} onPress={onFetchUpdateAsync}>
                <Text style={styles.btntext}>Update</Text>
            </TouchableOpacity>
                <Text>Status: {updateStatus}</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
      alignItems: "center",
    },
    btn: {
        backgroundColor: GlobalStyle.colors.accentcolor,
        padding: 10,
        width: 100,
        alignItems: "center",
        borderRadius: 8,
        marginTop: 20,
        marginBottom: 20

    },
    btntext: {
        color: GlobalStyle.colors.whitecolor,
        fontWeight: "bold"
    }
  });





export default About;