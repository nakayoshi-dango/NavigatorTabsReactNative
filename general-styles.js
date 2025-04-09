import { StyleSheet, Platform } from "react-native";

// OBSOLETO AHORA USO NATIVEWIND

export default StyleSheet.create({
  deadcenter: {
    flex: 1,
    backgroundColor: "#fff",
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
    margin: 10,
    backgroundColor: "red",
  },
  normaltext: {
    color: "black",
    fontSize: 11,
  },
  h2text: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  listitem: {
    marginTop: 5,
    marginBottom: 5,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 30,
    backgroundColor: "lightpink",
    width: "auto",
    height: "auto",
  },
  image: {
    width: 100,
    height: 170,
  },
});
