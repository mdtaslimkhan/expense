import { useState, useEffect  } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
import { Listitems } from "../../components/listitems";
import { useDispatch, useSelector } from "react-redux";
import { fetchData, deleteExpense } from "../../utils/database";
import { getCurrentDate } from "../../constants/helper";
import { LastMonthSummary } from "../../components/LastMonthSummary";
import { StatusBar } from "expo-status-bar";
import { GlobalStyle } from "../../constants/globalstyle";



function Dashboard ({navigation, route}){
    const listitem = useSelector((state) => state.DashListReducer);
    // const db = useSQLiteContext();
    const [notes, setNote] = useState([]);
    const [allExp, setExp] = useState([]);
    const dispatch = useDispatch();
    const useFocused = useIsFocused();

  

    function onCreateAction() {
        navigation.navigate('Createnote');
    }
    async function getData(){
        const expdata = await fetchData();
        setExp(expdata);
    }

    useEffect(() => {
        navigation.setOptions({title: "Expense list", headerRight: () => {
            return (<TouchableOpacity style={styles.btnmargin} onPress={onCreateAction} >
                <AntDesign name="addfile" size={26} color="#fff" />
                </TouchableOpacity>);
        }});
        
        if(useFocused){
            getData();
        }
    },[useFocused]);


    // useFocusEffect(
    //     useCallback(()=>{
    //         (async () => {
    //          // dispatch(getItemList("hello date"));
    //         })()
    //     },[])
    // )

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
                await deleteExpense(items.id);
                getData();
               // dispatch(removeItem({id: items.id, data: listitem.data}));
            }
        }
    ]);
    }

    

    return(
        <>
        <View style={styles.container}>
            <StatusBar style="light" />
            <LastMonthSummary data={allExp} />
            <FlatList
            data={allExp}
            keyExtractor={val => val.id}
            renderItem={({item}) => {
                return <Listitems items={item} deletenote={deletenote} />
            }}
            />
        </View>
        </>
    );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyle.colors.primary80,
    padding: 10
  },
  btnmargin: {
    marginRight: 16
  }
});



export default Dashboard;