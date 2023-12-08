import {
  StyleSheet,
  Text,
  View,
  Alert,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";

export default function Slot(props) {


  return (
    <View style={styles.cont}>
      <Pressable>
        <View style={styles.slotContainer}>
          <View style={styles.slotContent} title="Slot">
            <Text style={styles.text} title="Activity">
              {props.activity}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    flexWrap: "wrap", // Permettre au texte de passer à la ligne
    wordWrap: "break-word", // Éviter de couper les mots en milieu de mot
    textAlign: "center",
    paddingVertical: 15
  },
  cont: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 'auto',
    marginVertical: 8,
    borderWidth: 3, // Pour visualiser la zone du conteneur
    paddingHorizontal: "20%", // Ajouter un padding pour l'espace intérieur
    backgroundColor: "lightyellow",
    borderRadius: "10%",
  },
});
