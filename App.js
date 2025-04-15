import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import Home from './screen/Stack/home';
import Products from './screen/Stack/products';
import About from './screen/Stack/about';
import Recent from './screen/Tab/recent';
import Income from './screen/Tab/income';
import Dashboard from './screen/Drawer/dashboard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyle } from './constants/globalstyle';
import Navdrawer from './screen/Drawer/navdrawer';
import Editnote from './screen/Stack/expense/editnote';
import Createnote from './screen/Stack/expense/createnote';
import { SQLiteProvider } from 'expo-sqlite';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store from './redux/store';
import persistStore from 'redux-persist/es/persistStore';
import { useEffect, useState } from 'react';
import { init } from './utils/database';
import CreateMember from './screen/Stack/member/createMember';
import EditMember from './screen/Stack/member/editMember';
import CreateMemberCollection from './screen/Stack/collection/createcollection';
import EditMemberCollection from './screen/Stack/collection/editcollection';


// redux persistore configure
let persistor = persistStore(store);

const initdb = async (db) => {
  try{
      await db.execAsync(`
          PRAGMA journal_mode = WAL;
          CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
          `);
         // console.log("db connected");
  }catch(err){
      console.log(err);
  }
}

export default function App() {
  const [initialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init().then(()=>{
      console.log("result innner ");
      setDbInitialized(true);
    }).catch((err) => {
      console.log("result innner "+ err);
    });
  },[])

  if(!initialized){
    return(<View><Text></Text></View>);
  }

  return (
    <NavigationContainer>
      {/* <SQLiteProvider databaseName="test2.db" onInit={init}> */}
        <Provider store={store} >
          <PersistGate persistor={persistor}>
                <StackNav />
          </PersistGate>
        </Provider>
      {/* </SQLiteProvider> */}
    </NavigationContainer>
  );
}

function StackNav(){
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
    screenOptions={{
      headerStyle: {backgroundColor: GlobalStyle.colors.primary200 },
      headerTintColor: GlobalStyle.colors.whitecolor,
      headerTitleAlign: 'center'
    }}>
      <Stack.Screen name='Dashboard' component={Tabnav} options={{
        headerShown: false,
      }} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Products' component={Products} />
      <Stack.Screen name='About' component={About} />
      <Stack.Screen name='Editnote' component={Editnote} />
      <Stack.Screen name='Createnote' component={Createnote} />
      <Stack.Screen name='CreateMember' component={CreateMember} />
      <Stack.Screen name='EditMember' component={EditMember} />
      <Stack.Screen name='CreateMemberCollection' component={CreateMemberCollection} />
      <Stack.Screen name='EditMemberCollection' component={EditMemberCollection} />
    </Stack.Navigator>

  );
}


function Tabnav(){
  const Tabnav = createBottomTabNavigator();
  return (
    <Tabnav.Navigator screenOptions={{
        headerStyle: {backgroundColor: GlobalStyle.colors.primary200},
        headerTintColor: GlobalStyle.colors.whitecolor,
        headerTitleAlign: 'center',
        tabBarActiveTintColor: GlobalStyle.colors.whitecolor,
        tabBarStyle: {backgroundColor: GlobalStyle.colors.primary300}
      }}
      >
      <Tabnav.Screen name='Tabnav' component={Drawer}
       options={{
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          return <Ionicons name='moon-outline' size={size} color={color} />
        }
       }}
      />
      <Tabnav.Screen name='Recent' component={Recent}
      options={{
        tabBarIcon: ({color, size}) => {
          return <Ionicons name='water-outline' size={size} color={color} />
        }
      }} />
      <Tabnav.Screen name='Collection' component={Income}
      options={{
        tabBarIcon: ({color, size}) => {
          return <Ionicons name='golf' size={size} color={color} />
        }
      }}
       />
    </Tabnav.Navigator>
  );
}

function Drawer(){
  const Drawer = createDrawerNavigator();
  return (
      <Drawer.Navigator screenOptions={{
        headerStyle: {backgroundColor: GlobalStyle.colors.primary200},
        headerTintColor: GlobalStyle.colors.whitecolor,
        headerTitleAlign: 'center',
        drawerContentStyle: {backgroundColor: GlobalStyle.colors.primary500},
        drawerActiveTintColor: GlobalStyle.colors.whitecolor,
        drawerInactiveTintColor: GlobalStyle.colors.whitecolor,
      }}
       drawerContent={(props) => <Navdrawer {...props} />}
      >
      <Drawer.Screen name='Dashboard' component={Dashboard} />
      </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
