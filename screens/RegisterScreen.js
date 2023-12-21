import { StyleSheet, Text, View, Image, ImageBackground, TextInput,
    SafeAreaView, Dimensions, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import CheckBox from 'expo-checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { updateUser } from '../reducers/user';
import Constants from 'expo-constants';

const backend = Constants.expoConfig.hostUri.split(`:`)[0]

export default function RegisterScreen({ navigation }) {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNb, setPhoneNb] = useState('');
  const [password, setPassword] = useState('');

  const checkForm = () => {
    let okay = 0;
    // Verify if email contains @ and .
    const pattern = /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/gi;
    // Verify if phone number contains 10 number and do not start with 00, 01 or 09
    const phonePattern = /0[2-8]{1}[0-9]{8}/;
    email.match(pattern) ? okay++ : okay = 0;
    // Verify if given username is not empty or only composed of spaces 
    pseudo.trim() !== '' ? okay++ : okay = 0;
    phoneNb.match(phonePattern) ? okay++ : okay = 0;
    if (okay === 3) {
      return true
    } else {
      return false;
    }
  }

  const handleReturn = () => {
    setShowError(false)
    navigation.navigate('Login')
  }

  const handleRegister = () => {
    if (!checkForm()) {
      setErrorMsg('Missing or invalid field(s)');
      setShowError(true)
    } else {
      if (toggleCheckBox) {
        setShowError(false)
        const user = {
          email: email,
          username: pseudo,
          phone: phoneNb,
          password: password,
        }
        fetch(`http://${backend}:3000/users/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(user),
        }).then(response => response.json()).then(data => {
          if (data.result) {
            // If response from backend is okay then send data of user in reducer user
            setEmail('');
            setPseudo('');
            setPhoneNb('');
            setPassword('');
            dispatch(updateUser(data.user));
            navigation.navigate('SetProfile')
          } else {
            setErrorMsg(data.error);
            setShowError(true)
          }
        })
      } else {
        setErrorMsg('Accept terms is required');
        setShowError(true)
      }
    }
  }

  return (
    <ImageBackground source={require('../assets/background_2.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.view}>
          <View style={styles.header}>
            <Image source={require('../assets/logo.png')}/>
          </View>
          <View style={styles.form}>
            <View style={styles.top}>
                <Text style={styles.title}>Register</Text>
            </View>
            <View style={styles.textArea}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Pseudo" placeholderTextColor={'#FFFFFF'} onChangeText={(value) => setPseudo(value)} value={pseudo}
                    style={styles.input}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Email" placeholderTextColor={'#FFFFFF'} onChangeText={(value) => setEmail(value)} value={email}
                    style={styles.input}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Phone number" placeholderTextColor={'#FFFFFF'} onChangeText={(value) => setPhoneNb(value)} value={phoneNb}
                    style={styles.input}/>  
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Password" placeholderTextColor={'#FFFFFF'} secureTextEntry={true} onChangeText={(value) => setPassword(value)}
                    value={password} style={styles.input}/>
                </View>
            </View>
            <View style={styles.terms}>
              <CheckBox disabled={false} value={toggleCheckBox} onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
              <Text style={styles.conditions}>Accept general use terms</Text>
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleRegister()} style={styles.button}>
                <Text style={styles.textBtn}>Register</Text>
            </TouchableOpacity>
            { showError && <View style={styles.error}>
                  <Ionicons name={'warning'} size={25} color={'#FFFFFF'} />
                  <Text style={styles.errorText}>{errorMsg}</Text>
              </View> }
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
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 15,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  textArea: {
    width: '100%',
    flex: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    height: '20%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 8,
    paddingTop: 8,
  },
  input: {
    color: '#FFFFFF',
    textAlignVertical: 'center',
  },
  terms: {
    width: '70%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  conditions: {
    marginLeft: 5,
    color: '#FFFFFF'
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
