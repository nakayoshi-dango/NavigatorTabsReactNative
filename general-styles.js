import { StyleSheet } from "react-native";

export default function getGlobalStyles(isDarkMode) {
  return StyleSheet.create({
    deadcenter: {
      flex: 1,
      backgroundColor: isDarkMode ? "#1f2937" : "white",
      alignItems: "center",
      justifyContent: "center",
    },
    icons: {
      width: 36,
      height: 36,
    },
    pressableOpacity: {
      backgroundColor: "#86efac",
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 8,
      alignSelf: "flex-start",
      opacity: 0.9,
      marginVertical: 2.5,
    },
    pressables: {
      width: "auto",
      height: "auto",
      margin: 2,
      backgroundColor: "#ef4444",
    },
    inputStyle: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 5,
      padding: 10,
      marginBottom: 15,
    },
    normaltext: {
      color: isDarkMode ? "white" : "black",
      fontSize: 11,
    },
    boldtext: {
      color: isDarkMode ? "white" : "black",
      fontSize: 11,
      fontWeight: "bold",
    },
    h2text: {
      color: isDarkMode ? "white" : "black",
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 1,
    },
    textinput: {
      color: isDarkMode ? "white" : "black",
      borderWidth: 2,
      borderRadius: 8,
      borderColor: isDarkMode ? "#9ca3af" : "#6b7280",
      paddingHorizontal: 8,
      marginVertical: 2.5,
    },
    itemdetail: {
      marginTop: 2,
      marginBottom: 2,
      marginHorizontal: 2,
      padding: 16,
      borderRadius: 30,
      backgroundColor: isDarkMode ? "#9d174d" : "#f472b6",
      width: "auto",
      height: "auto",
    },
    bigimage: {
      objectFit: "contain",
      width: 190,
      height: 300,
    },
    listitem: {
      marginTop: 2,
      marginBottom: 2,
      marginHorizontal: 2,
      padding: 16,
      borderRadius: 30,
      backgroundColor: isDarkMode ? "#374151" : "#d1d5db",
      width: "auto",
      height: "auto",
    },
  });
}
