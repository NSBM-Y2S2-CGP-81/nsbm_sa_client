import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Create the same image mapping
const imageMapping = {
  "Finagle_Cafe.jpg": require("../../../assets/data/images/Finagle_Cafe.jpg"),
  "restaurant1.jpeg": require("../../../assets/images/restaurant1.jpeg"),
  "restaurant4.jpeg": require("../../../assets/images/restaurant4.jpeg"),
  // Add any other images you need
};

const RestaurantItem = ({ restaurant }) => {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Restaurant", { id: restaurant.id });
  };

  // Function to get the correct image source
  const getImageSource = () => {
    // First try to use the image mapping
    const imageName = restaurant.image.startsWith("/")
      ? restaurant.image.split("/").pop()
      : restaurant.image;

    if (imageMapping[imageName]) {
      return imageMapping[imageName];
    }

    // Fallback to a default image
    return require("../../../assets/images/default.png");
  };

  return (
    <Pressable onPress={onPress} style={styles.restaurantContainer}>
      <Image source={getImageSource()} style={styles.image} />
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{restaurant.name}</Text>
          <Text style={styles.subtitle}>
            $ {restaurant.deliveryFee} &#8226; {restaurant.minDeliveryTime}-
            {restaurant.maxDeliveryTime} minutes
          </Text>
        </View>

        <View style={styles.rating}>
          <Text>{restaurant.rating}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default RestaurantItem;

const styles = StyleSheet.create({
  restaurantContainer: {
    width: "100%",
    marginVertical: 10,
  },
  image: {
    width: "100%",
    height: 240, // Make it smaller in height
    aspectRatio: 5 / 3, // Make it wider
    marginBottom: 5,
    borderRadius: 8, // Optional: add rounded corners
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
  },
  subtitle: {
    color: "grey",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    marginLeft: "auto",
    backgroundColor: "lightgray",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
