import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen({ navigation }) {
  
  const goToSignIn = () => {
    navigation.navigate('SignIn');
  }

  const handleSubmit = () => {
    navigation.navigate('Register')
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trippers</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.top}>
          <Text>Connection to your account</Text>
        </View>
        <View style={styles.main}>
          <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={() => goToSignIn()}>
            <Text style={styles.btnText}><FontAwesome name={'at'} size={20} color={'#FFFFFF'}/> Continue with your email</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleSubmit()}>
            <Text>Not registered yet ?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 48,
    color: 'blue'
  },
  body: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    flex: 1,
  },
  btn: {
    backgroundColor: 'black',
    padding: 8,
    borderRadius: 8,
  },
  btnText: {
    color: 'white',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  }
});
