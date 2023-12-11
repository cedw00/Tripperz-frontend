import { StyleSheet, Text, View, Image, ImageBackground, TextInput,
    SafeAreaView, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser, updateProfile } from '../reducers/user';

const user = [
  { email: 'user.admin@admin.fr', password: 'admin123', phone: '0652882068', birthday: '10/08/1990', gender: 'Male',
    homeCountry: 'France', favoriteCountry: 'Greece', favoriteFood: ['Vegan'], interests: ['Sea', 'Restaurant', 'Theater'] },
  { email: 'user.test@test.com', password: 'azerty000', phone: '0617935077', birthday: '21/05/1997', gender: 'Female',
    homeCountry: 'France', favoriteCountry: 'United States', favoriteFood: ['Fast-Food', 'Cakes'], interests: ['Sport', 'Amusement Park', 'Sea'] }
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
      const profile = { gender: 'Male', birthday: currentUser.birthday, homeCountry: currentUser.homeCountry,
      favoriteCountry: currentUser.favoriteCountry, favoriteFood: currentUser.favoriteFood, interests: currentUser.interests };
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
    <ImageBackground source={require('../assets/background_1.png')} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView style={styles.view} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={styles.header}>
            <Image source={require('../assets/logo.png')}/>
          </View>
          <View style={styles.form}>
            <View style={styles.textArea}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Email" placeholderTextColor={'#FFFFFF'} onChangeText={(value) => setEmail(value)} value={email}
                    style={styles.input}/>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput placeholder="Password" placeholderTextColor={'#FFFFFF'} secureTextEntry={true} onChangeText={(value) => setPassword(value)}
                    value={password} style={styles.input}/>
                </View>
                <View style={styles.forgot}>
                  <Text style={styles.forgotText}>Forgotten password</Text>
                </View>
            </View>
          </View>
          <View style={styles.bottom}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleRegister()} style={styles.button}>
                <Text style={styles.textBtn}>Connect</Text>
            </TouchableOpacity>
            { showError && <View>
              <Text>{errorMsg}</Text>
            </View> }
            <TouchableOpacity activeOpacity={0.8} onPress={() => handleReturn()}>
                <Text>Go back</Text>
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
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 8,
  },
  input: {
    color: 'black',
  },
  forgot: {
    marginTop: 20,
    marginBottom: 15,
  },
  forgotText: {
    color: '#000000',
    fontSize: 16
  },
  bottom: {
    flex: 1,
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    width: '60%',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
    backgroundColor: 'black',
  },
  textBtn: {
    color: 'white',
  }
});
