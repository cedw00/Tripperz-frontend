import { StyleSheet, Text, View, Image, ImageBackground, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({ navigation }) {

  const redirectTo = (path) => {
    navigation.navigate(`${path}`)
  }

  return (
    <ImageBackground source={require('../assets/background_1.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={require('../assets/logo.png')}/>
        </View>
        <View style={styles.body}>
          <View style={styles.top}>
            <Text style={styles.message}>Log In</Text>
          </View>
          <View style={styles.main}>
            <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
              <Text style={styles.btnText}><FontAwesome name={'apple'} size={20} color={'#FFFFFF'}/> Continue with apple</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
              <Text style={styles.btnText}><FontAwesome name={'google'} size={20} color={'#FFFFFF'}/> Continue with google</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.btn}>
              <Text style={styles.btnText}><FontAwesome name={'facebook-square'} size={20} color={'#FFFFFF'}/> Continue with Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => redirectTo('SignIn')}>
              <Text style={styles.btnText}><FontAwesome name={'at'} size={20} color={'#FFFFFF'}/> Continue with your email</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.bottom}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => redirectTo('Register')} style={styles.registerBtn}>
              <Text style={styles.register}>Not registered yet ?</Text>
            </TouchableOpacity>
          </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 3,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20%'
  },
  message: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
  },
  main: {
    flex: 1.5,
    width: '80%',
  },
  btn: {
    backgroundColor: 'black',
    padding: 8,
    margin: 5,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
    textAlign: 'center'
  },
  bottom: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  registerBtn: {
    width: '50%',
    backgroundColor: 'black',
    padding: 8,
    margin: 5,
    borderRadius: 8,
  },
  register: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
});
