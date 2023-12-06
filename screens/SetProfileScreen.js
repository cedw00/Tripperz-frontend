import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity, TextInput,
KeyboardAvoidingView } from 'react-native';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { updateProfile } from '../reducers/user';

export default function SetProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [password, setPassword] = useState('');
  
    const handleReturn = () => {
        navigation.navigate('Register')
    };

    const handleSubmit = () => {
      const infos = {
        birthday: birthday,
        gender: gender,
        password: password,
      };
      dispatch(updateProfile(infos));
    }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trippers</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.top}>
          <FontAwesome name={'user-circle'} size={100} color={'#000000'} />
          <View style={styles.messageContainer}>
            <Text style={styles.message}>Configure your profile</Text>
          </View>
        </View>
        <View style={styles.main}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
                <TextInput placeholder="Birthday Date: DD/MM/YYYY" onChangeText={(value) => setBirthday(value)} value={birthday} style={styles.input}/>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
                <TextInput placeholder="Gender" onChangeText={(value) => setGender(value)} value={gender} style={styles.input}/>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
                <TextInput placeholder="Password" onChangeText={(value) => setPassword(value)} value={password} style={styles.input}/>
            </KeyboardAvoidingView>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => handleReturn()}>
            <Text>Return</Text>
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
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      top: {
        flex: 1,
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      messageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      message: {
        fontSize: 20,
      },
      main: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
      },
      inputContainer: {
        width: '80%',
        backgroundColor: '#AFBBE8',
        borderStyle: 'solid',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 5,
      },
      input: {
        color: 'black',
      },
      bottom: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }
});