import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Footer({ navigation }) {
    const redirect = (path) => {
        navigation.navigate(`${path}`)
    }

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.footerSection} onPress={() => navigation.openDrawer()}>
                <Feather name={'menu'} size={25} color={'#000000'}/>
                <Text style={styles.text}>Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerMiddle} onPress={() => redirect('Home')}>
                <Entypo name={'home'} size={25} color={'#000000'}/>
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerSection} onPress={() => redirect('Notifications')}>
                <Ionicons name={'notifications-outline'} size={25} color={'#000000'}/>
                <Text style={styles.text}>Notifications</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footer: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#067188',
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