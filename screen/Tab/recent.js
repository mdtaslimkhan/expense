import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity, FlatList, Alert} from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { fetchMember, deleteMember } from '../../utils/members_controller';
import { Listitems, Memberitem } from '../../components/listitems';


function Recent({navigation, route}){
    const [alldata, setData] = useState([]);
    const useFocused = useIsFocused();

    function handlepress(){
        console.log('helablg');
        navigation.navigate('About');
    }

    function onCreateAction() {
        console.log("add button wlrik");
        navigation.navigate('CreateMember');
    }

    async function getData(){
            const data = await fetchMember();
            setData(data);
    }

    useEffect(() => {

        navigation.setOptions({title: "Members list", headerRight: () => {
            return (<TouchableOpacity style={styles.btnmargin} onPress={onCreateAction} >
                <AntDesign name="user" size={26} color="#fff" />
                </TouchableOpacity>);
        }});
        
        if(useFocused){
            getData();
        }
    },[useFocused]);


    function deletenote(items) {       
        Alert.alert("Are you sure!","You want to delte this item?",[
        {
            text: 'cancel',
            onPress: ()=> {
                console.log("canceled");
            }
        },
        {
            text: "Ok",
            onPress: async () => {
                await deleteMember(items.id);
                getData();
                // dispatch(removeItem({id: items.id, data: listitem.data}));
            }
        }
    ]);
    }

    return(
        <>
        <View style={styles.container}>
            <FlatList
            data={alldata}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
                return <Memberitem items={item} deletenote={deletenote} />
            }}
            /> 
        </View>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10
  },
  btnmargin: {
    marginRight: 16
  }
});

export default Recent;