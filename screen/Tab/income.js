import { useEffect, useState } from 'react';
import {View, Text, StyleSheet, Pressable, TouchableOpacity, FlatList, Alert} from 'react-native'
import { useIsFocused } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { fetchMember, deleteMember } from '../../utils/members_controller';
import { Listitems, Memberitem, MemberCollectionitem } from '../../components/listitems';
import { fetchCollection, deleteCollection } from '../../utils/collection_controller';
import { LastMonthIncomeSummary, LastMonthSummary } from '../../components/LastMonthSummary';


function Income({navigation}){
  const [alldata, setData] = useState([]);
  const [allMembers, setAllMembers] = useState([]);
  const useFocused = useIsFocused();

  
  function onCreateAction() {
        console.log("add button wlrik");
        navigation.navigate('CreateMemberCollection');
    }

    async function getData(){
            const data = await fetchCollection();
            const member = await fetchMember();
            setData(data);
            setAllMembers(member);
            console.log(data);
    }

    useEffect(() => {

        navigation.setOptions({title: "Member's Collections", headerRight: () => {
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
                await deleteCollection(items.id);
                getData();
                // dispatch(removeItem({id: items.id, data: listitem.data}));
            }
        }
    ]);
    }




    return(
        <View style={styles.container}>
            <LastMonthIncomeSummary data={alldata} />
             <FlatList
            data={alldata}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
                let m = allMembers.filter((mitem) => mitem.id == item.member_id);
                item.name = m[0]?.name;
                return <MemberCollectionitem items={item} deletenote={deletenote} />
            }}
            /> 
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8
  },
  btnmargin: {
    marginRight: 16
  }
});

export default Income;