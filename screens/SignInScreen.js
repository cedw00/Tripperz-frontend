import { StyleSheet, Text, View, Image, TextInput,
    SafeAreaView, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import CheckBox from 'expo-checkbox';
import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { updateUser } from '../reducers/user';

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNb, setPhoneNb] = useState('');
  const [password, setPassword] = useState('');

  const checkForm = () => {
    let isValid = false;
    const pattern = /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/gi;
    email.match(pattern) ? isValid = true : isValid = false;
    if (isValid) {
        return true
    } else {
        return false
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
          pseudo: pseudo,
          phone: phoneNb,
          password: password,
        }
        setEmail('');
        setPseudo('');
        setPhoneNb('');
        dispatch(updateUser(user))
        navigation.navigate('SetProfile')
      } else {
        setErrorMsg('Accept terms is required');
        setShowError(true)
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
          <Text style={styles.title}>Trippers</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.top}>
            <Text>Connection</Text>
        </View>
        <View style={styles.textArea}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
                <TextInput placeholder="Pseudo" onChangeText={(value) => setPseudo(value)} value={pseudo} style={styles.input}/>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
                <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input}/>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
                <TextInput placeholder="Phone number" onChangeText={(value) => setPhoneNb(value)} value={phoneNb} style={styles.input}/>  
            </KeyboardAvoidingView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
                <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(value) => setPassword(value)} value={password} style={styles.input}/>
            </KeyboardAvoidingView>
        </View>
        <View style={styles.terms}>
          <CheckBox disabled={false} value={toggleCheckBox} onValueChange={(newValue) => setToggleCheckBox(newValue)}/>
            <Text>Accept general use terms</Text>
        </View>
      </View>
      <View style={styles.test}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleRegister()} style={styles.button}>
            <Text style={styles.textBtn}>Connect</Text>
        </TouchableOpacity>
        { showError && <View>
          <Text>{errorMsg}</Text>
        </View> }
        <TouchableOpacity activeOpacity={0.8} onPress={() => handleReturn()}>
            <Text>Return</Text>
        </TouchableOpacity>
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
  form: {
    flex: 1,
    width: '70%',
    backgroundColor: 'gray',
    alignItems: 'center',
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textArea: {
    width: '100%',
    flex: 3,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    backgroundColor: '#AFBBE8',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
  },
  input: {
    color: 'black',
  },
  terms: {
    width: '80%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  test: {
    flex: 1,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '60%',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: 'black',
  },
  textBtn: {
    color: 'white',
  }
});
