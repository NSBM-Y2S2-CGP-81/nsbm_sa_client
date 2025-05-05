import { StyleSheet } from "react-native";

export default StyleSheet.create({
  page: {
    flex: 1,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  image: {
    width: "100%", // Make it even smaller and more noticeable
    aspectRatio: 1, // Keep it square
    alignSelf: "center", // Center it horizontally
    marginTop: 20, // Add some space at the top
    borderRadius: 10, // Add rounded corners
    borderWidth: 2, // Add border to make change obvious
    borderColor: "green", // Visible border
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    marginVertical: 10,
    textAlign: "center", // Center the title
  },
  menuTitle: {
    marginTop: 20,
    fontSize: 18,
    letterSpacing: 0.7,
  },
  subtitle: {
    fontSize: 15,
    color: "#525252",
    textAlign: "center", // Center the subtitle
  },
  container: {
    margin: 10,
  },
});
