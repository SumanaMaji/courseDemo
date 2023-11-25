import MealsList from "../components/MealsList/MealsList";
import { useContext } from "react";
import { FavouritesContext } from "../store/context/favourites-context";
import { MEALS } from "../data/dummy-data";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import favourites from "../store/redux/favourites";

function FavoritesScreen() {
//   const favouriteMealsCtx = useContext(FavouritesContext);
const favouriteMealIds = useSelector(state.favouriteMeals.ids);
//   const favouritesMeals = MEALS.filter(
//     (meal) => meal.id === favouriteMealsCtx.ids.includes(meal.id)
//   );
const favouritesMeals = MEALS.filter((meal) =>
    favouriteMealIds.includes(meal.id)
  );
if(favouritesMeals.length === 0){
    return(
        <View style={styles.rootContainer}>
            <Text style={styles.text}>No Favorites yet!</Text>
        </View>
    );
}
  return <MealsList items={favouritesMeals} />;
}
export default FavoritesScreen;

const styles = StyleSheet.create({
    rootContainer: {
     flex:1,
      justifyContent: "center",
      alignItems: 'center'
    },
   text:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
   }
  });