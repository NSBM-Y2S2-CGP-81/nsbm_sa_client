import { View, FlatList } from "react-native";
import DishListItem from "../../components/DishListItem";
import restaurants from "../../../assets/data/restaurants.json";
import Header from "./Header";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";

const RestaurantDetailsPage = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const id = route.params?.id;

  // Find the specific restaurant based on the ID from route params
  const restaurant = restaurants.find((r) => r.id === id) || restaurants[0];

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <Header restaurant={restaurant} />}
        data={restaurant.dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
      />
      {/* Back button removed from here */}
    </View>
  );
};

export default RestaurantDetailsPage;
