import { View, Text, Image } from "react-native";
import styles from "./styles";

// Create a mapping object for restaurant images
const imageMapping = {
  "Finagle_Cafe.jpg": require("../../../assets/data/images/Finagle_Cafe.jpg"),
  "restaurant1.jpeg": require("../../../assets/images/restaurant1.jpeg"),
  "restaurant4.jpeg": require("../../../assets/images/restaurant4.jpeg"),
  // Add any other images you need
};

const RestaurantHeader = ({ restaurant }) => {
  // Function to get the correct image source
  const getImageSource = () => {
    // First try to use the image mapping
    const imageName = restaurant.image.split("/").pop();

    if (imageMapping[imageName]) {
      return imageMapping[imageName];
    } else if (imageMapping[restaurant.image]) {
      return imageMapping[restaurant.image];
    }

    // Fallback to a default image
    return require("../../../assets/images/default.png");
  };

  return (
    <View style={styles.page}>
      <Image source={getImageSource()} style={styles.image} />

      <View style={styles.container}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          $ {restaurant.deliveryFee} &#8226; {restaurant.minDeliveryTime}-
          {restaurant.maxDeliveryTime} minutes
        </Text>

        <Text style={styles.menuTitle}>Menu</Text>
      </View>
    </View>
  );
};

export default RestaurantHeader;
