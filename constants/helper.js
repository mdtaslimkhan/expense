
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export const getCurrentDate=()=>{
 
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    if(date < 10){
        date = "0" + date;
    }
    if(month < 10 ){
        month = "0" + month;
    }
    return date + '-' + month + '-' + year;//format: d-m-y;
}

export const GetDateCustom = ({date, type, setOpen}) => {
    return(
      
      <View style={{width: "100%"}}>
          <Text style={styles.text}>{type}</Text>
            <TouchableOpacity 
              onPress={() => setOpen(true)}>
                <Text style={styles.dateinput}>{ date }</Text>
          </TouchableOpacity>
      </View>
      
    )
  }

  export const getFullDate = (date) => {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    if(month < 10){
       month = '0'+month;
    }
    if(day < 10){
       day = '0'+day;
    }
    return(
      date.getFullYear() + "-" + month + "-" + day
    );
  }

  
export const styles = StyleSheet.create({
    dateinput: {
        backgroundColor: '#fff',
        padding: 10,
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 10,
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5,
    },
    text:{
        color: '#000',
        fontFamily: 'Roboto',
        fontSize: 14,
        fontWeight: 'bold'
      },
 
  
  });

  
