import { StyleSheet, Text, View, Image, SafeAreaView, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function ProfileScreen({ navigation }) {
  const { email, pseudo, phone, birthday, gender, interests } = useSelector((state) => state.user.value)
  
    const handleReturn = () => {
        navigation.navigate('SetProfile')
    }

    const favorites = interests.map((data, i) => {
      return (
        <View key={i}>
          <Text>{data} </Text>
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
          <View style={styles.icon}>
            <FontAwesome name={'user-circle'} size={75} color={'#000000'} />
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{pseudo}</Text>
          </View>
          <View style={styles.desc}>
            <Text>Description</Text>
            <Text>Globetrotter</Text>
          </View>
        </View>
        <View style={styles.main}>
          <View style={styles.section}>
            <Text>{email}</Text>
          </View>
          <View style={styles.section}>
            <Text>{phone}</Text>
          </View>
          <View style={styles.section}>
            <Text>{birthday}</Text>
          </View>
          <View style={styles.section}>
            <Text>{gender}</Text>
          </View>
          <ScrollView horizontal={true}>
            {favorites}
          </ScrollView>
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
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      top: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      icon: {
        flex: 2
      },
      messageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      desc: {
        flex: 2
      },
      message: {
        fontSize: 16,
      },
      main: {
        flex: 2,
        width: '80%'
      },
      section: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      },
      interests: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflow: 'scroll',
      },
      bottom: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }
});