import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer({ navigation }) {
    const redirect = (path) => {
        navigation.navigate(`${path}`)
    }

    return (
        <View style={styles.footer}>
            <View style={styles.footerSection}>
                <Entypo name={'home'} size={35} color={'#000000'} onPress={() => redirect('Home')}/>
                <Text style={styles.text}>Dashboard</Text>
            </View>
            <View style={styles.footerMiddle}>
                <Feather name={'message-circle'} size={35} color={'#000000'} onPress={() => redirect('Messages')}/>
                <Text style={styles.text}>Messages</Text>
            </View>
            <View style={styles.footerSection}>
                <Ionicons name={'notifications-outline'} size={35} color={'#000000'} onPress={() => redirect('Notifications')}/>
                <Text style={styles.text}>Notifications</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        marginTop: 15,
    },
    footerSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerMiddle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderStyle: 'solid',
        borderLeftWidth: 1,
        borderLeftColor: 'grey',
        borderRightWidth: 1,
        borderRightColor: 'grey',
    },
    text: {
        color: '#FFFFFF'
    },
})