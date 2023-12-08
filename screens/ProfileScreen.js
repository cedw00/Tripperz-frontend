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
            <FontAwesome name={'user-circle'} size={75} color={'#000000'}/>
          </View>
          <View style={styles.messageContainer}>
            <Text style={styles.message}>{pseudo}</Text>
          </View>
          <View style={styles.desc}>
            <Text style={styles.descText}>Description</Text>
            <Text style={styles.descText}>Globetrotter</Text>
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
          <View style={styles.section}>
            <Text>France</Text>
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
        backgroundColor: '#43C1E7'
      },
      header: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#067188',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        marginBottom: 15,
      },
      title: {
        fontWeight: 'bold',
        fontSize: 48,
        color: '#1AB4E7'
      },
      body: {
        flex: 8,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      top: {
        flex: 2,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#AFBBE8',
      },
      icon: {
        flex: 3,
        marginTop: 5,
      },
      messageContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      desc: {
        flex: 2,
        width: '90%',
        backgroundColor: '#FFFFFF',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        borderRadius: 10,
        marginBottom: 5,
      },
      descText: {
        fontSize: 14,
        paddingLeft: 8,
      },
      message: {
        fontSize: 18,
      },
      main: {
        flex: 4,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
      },
      section: {
        flex: 1,
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'black',
        borderBottomColor: 'silver',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingLeft: 10,
        marginTop: 10,
      },
      bottom: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }
});