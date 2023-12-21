import { StyleSheet, Text, View, Image, ImageBackground, TextInput,
    SafeAreaView, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser, updateProfile } from '../reducers/user';
import Constants from 'expo-constants';

const backend = Constants.expoConfig.hostUri.split(`:`)[0]

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleReturn = () => {
    setShowError(false)
    navigation.navigate('Login')
  }
  
  const checkForm = async () => {
    const user = {
      email: email,
      password: password,
    }
    const response = await fetch(`https://tripperz-backend.vercel.app/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    if (data.result) {
      dispatch(updateUser(data.user))
      dispatch(updateProfile(data.user))
      return true
    } else {
      setErrorMsg(data.error);
      return false
    }
  }

  const handleRegister = async () => {
    const canConnect = await checkForm();
    if (!canConnect) {
      setShowError(true)
    } else {
      navigation.navigate('DrawerNavigator')
    }
  }

  return (
    <ImageBackground source={require('../assets/background_1.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.view} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.header}>
            <Image source={require('../assets/logo.png')}/>
          </View>
          <View style={styles.form}>
            <View style={styles.textArea}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Email" placeholderTextColor={'#FFFFFF'}
                    onChangeText={(value) => setEmail(value)} value={email} style={styles.input}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Password" placeholderTextColor={'#FFFFFF'}
                    secureTextEntry={true} onChangeText={(value) => setPassword(value)} value={password} style={styles.input}/>
                </View>
                { showError && <View style={styles.error}>
                  <Ionicons name={'warning'} size={25} color={'#FFFFFF'} />
                  <Text style={styles.errorText}>{errorMsg}</Text>
                </View> }
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleRegister()} style={styles.button}>
                <Text style={styles.textBtn}>Connect</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleReturn()} style={styles.button}>
                <Text style={styles.textBtn}>Go back</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
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
  view: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 48,
    color: '#1AB4E7'
  },
  form: {
    flex: 2,
    width: '80%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 10,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    height: '10%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 8,
    paddingTop: 4,
  },
  input: {
    color: '#FFFFFF',
  },
  forgot: {
    marginTop: 15,
  },
  forgotText: {
    color: '#000000',
    fontSize: 18
  },
  bottom: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '60%',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    backgroundColor: 'black',
  },
  textBtn: {
    color: 'white',
  },
  error: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    backgroundColor: 'red',
  },
  errorText: {
    color: '#FFFFFF'
  }
});
