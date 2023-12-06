import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

export default function HomeScreen({ navigation }) {
  const { email, pseudo, phone, birthday, interests } = useSelector((state) => state.user.value)
  
    const handleReturn = () => {
        navigation.navigate('SetProfile')
    }

    const favorites = interests.map((data, i) => {
      return (
        <View key={i}>
          <Text>{data}</Text>
        </View>
      )
    })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trippers</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.top}>
          <Text>Welcome {pseudo}</Text>
        </View>
        <View style={styles.main}>
          <Text>Your email: {email}</Text>
          <Text>Your phone number: {phone}</Text>
          <Text>Your birthday: {birthday}</Text>
          {favorites}
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
      bottom: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }
});