import { View, Text, Animated, StyleSheet, ImageBackground } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import { GlobalStyle } from '../../constants/globalstyle';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';



const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const nav = [
    {icon: 'Safety', label: 'Home Page', navigateTo: 'Home'},
    {icon: 'Safety', label: 'Products', navigateTo: 'Products'},
    {icon: 'Safety', label: 'About', navigateTo: 'About'},
];

function DrawerCustomItems(){
    const navigation = useNavigation();
    return nav.map((item, i) => {
    return (<DrawerItem 
    icon={({color, size}) => <AntDesign name={item.icon} size={size} color={color} />}
    label={item.label}
    onPress={() => navigation.navigate(item.navigateTo)}
    key={i}
    activeTintColor= {'red'}
    inactiveTintColor='white'
    />)});
}



function Navdrawer({props}) {
    return(
        <View style={styles.container}>
            <AnimatedLinearGradient
                colors={[GlobalStyle.colors.primary100, GlobalStyle.colors.primary600]}
                style={{flex: 1}}>
                        <ImageBackground style={styles.backgroundImg} source={require('../../assets/bg/a.jpg')} resizeMode='cover' >
                          <View style={styles.navheader}>
                                  <Avatar.Image style={styles.imgStyle} source={require('../../assets/bg/5.jpg')} />
                                  <View style={styles.infoTextHolder}>
                                      <Text style={styles.head} >adsalam773@gmail.com</Text>
                                      <Text style={styles.subhead} >User email</Text>
                                  </View>
                          </View>
                        </ImageBackground>
                    <DrawerContentScrollView contentContainerStyle={styles.scrollviewstyle} {...props} >
                        <DrawerCustomItems  />
                    </DrawerContentScrollView>
            </AnimatedLinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  navheader: {
    height: 150,
    backgroundColor: GlobalStyle.colors.ocolor100,
    width: '100%',
    paddingRight: 10,
    marginRight: 10,
    alignItems: 'center',

  },
  imgStyle: {
    marginTop: 30
  },
  head: {
    color: GlobalStyle.colors.whitecolor
  },
  subhead: {
    color: GlobalStyle.colors.whitecolor
  },
  scrollviewstyle: {
    paddingTop: 10,
    paddingRight: 0,
    marginRight: 0,
  },
  backgroundImg: {
    height: 150,
    justifyContent: 'center',
  }
});


export default Navdrawer;