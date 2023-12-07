import { StyleSheet, Text, View, Image, TextInput,
    SafeAreaView, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser, updateProfile } from '../reducers/user';

const user = [
  { email: 'user.admin@admin.fr', password: 'admin123', phone: '0652882068', birthday: '10/08/1990', interests: ['Sea', 'Restaurant', 'Theater'] },
  { email: 'user.test@test.com', password: 'azerty000', phone: '0617935077', birthday: '21/05/1997', interests: ['Sport', 'Amusement Park', 'Sea'] }
]

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const checkForm = () => {
    const currentUser = user.find(data => email === data.email);
    if (password === currentUser.password) {
      const user = { pseudo: 'User', password: password, email: email, phone: currentUser.phone };
      const profile = { gender: 'Male', birthday: currentUser.birthday, interests: currentUser.interests };
      dispatch(updateUser(user));
      dispatch(updateProfile(profile));
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
      setErrorMsg('Invalid email or password');
      setShowError(true)
    } else {
      setShowError(false);
      setEmail('');
      setPassword('');
      navigation.navigate('Profile')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.view} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.header}>
            <Text style={styles.title}>Trippers</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.top}>
              <Text>Connection</Text>
          </View>
          <View style={styles.textArea}>
              <View style={styles.inputContainer}>
                  <TextInput placeholder="Email" onChangeText={(value) => setEmail(value)} value={email} style={styles.input}/>
              </View>
              <View style={styles.inputContainer}>
                  <TextInput placeholder="Password" secureTextEntry={true} onChangeText={(value) => setPassword(value)} value={password} style={styles.input}/>
              </View>
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
      </KeyboardAvoidingView>
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
