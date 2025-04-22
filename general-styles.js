import { StyleSheet, Platform } from "react-native";

const globalStyles = StyleSheet.create({
  deadcenter: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  icons: {
    width: Platform.OS === "web" ? 36 : 24,
    height: Platform.OS === "web" ? 36 : 24,
  },
  pressables: {
    width: "auto",
    height: "auto",
    margin: 2,
    backgroundColor: "#ef4444",
  },
  normaltext: {
    color: "black",
    fontSize: 11,
  },
  h2text: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 1,
  },
  textinput: {
    color: "black",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "#6b7280",
    paddingHorizontal: 8,
  },
  itemdetail: {
    marginTop: 2,
    marginBottom: 2,
    marginHorizontal: 2,
    padding: 16, 
    borderRadius: 30,
    backgroundColor: "#f472b6", 
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
    backgroundColor: "#d1d5db",
    width: "auto",
    height: "auto",
  },
});

export default globalStyles;
