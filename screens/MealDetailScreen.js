import { useContext, useLayoutEffect } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";

import { MEALS } from "../data/dummy-data";
import MealDetails from "../components/MealDetails";
import SubTitle from "../components/MealDetail/SubTitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";
import { FavouritesContext } from "../store/context/favourites-context";
import { useDispatch, useSelector } from "react-redux";
import { addFavourite, removeFavourite } from './../store/redux/favourites'

function MealDetailScreen({ route, navigation }) {
  // const favouriteMealsCtx = useContext(FavouritesContext);
  const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids);
const dispatch = useDispatch();

  const mealId = route.params.mealId;

  const selectMeal = MEALS.find((meal) => meal.id === mealId);

  // const mealsIsFavourite = favouriteMealsCtx.ids.includes(mealId);
  const mealsIsFavourite = favouriteMealIds.includes(mealId);

  function changeFavouritesStatushandler() {
    if(mealsIsFavourite){
      dispatch(removeFavourite({ id: mealId }));
      // favouriteMealsCtx.removeFavourite(mealId);
    }else{
      // favouriteMealsCtx.addFavourite(mealId);
      dispatch(addFavourite({ id: mealId }));
    }
    console.log("pressed");
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <IconButton
            //icon="star"
            icon={mealsIsFavourite ? "star" : "star-outline"}
            color="white"
            onPress={changeFavouritesStatushandler}
          />
        );
      },
    }),
      [navigation, changeFavouritesStatushandler];
  });
  return (
    <ScrollView style={styles.rootContainer}>
      <View>
        <Image style={styles.image} source={{ uri: selectMeal.imageUrl }} />
        <Text style={styles.title}>{selectMeal.title}</Text>
        <MealDetails
          duration={selectMeal.duration}
          complexity={selectMeal.complexity}
          affordability={selectMeal.affordability}
          textStyle={styles.detailText}
        />
        <View style={styles.listOuterContainer}>
          <View style={styles.listContainer}>
            <SubTitle>Ingredients</SubTitle>
            <List data={selectMeal.ingredients}></List>
            <SubTitle>Steps</SubTitle>
            <List data={selectMeal.steps}></List>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
export default MealDetailScreen;

const styles = StyleSheet.create({
  rootContainer: {
    marginBottom: 32,
  },
  image: {
    width: "100%",
    height: 350,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    margin: 8,
    textAlign: "center",
    color: "white",
  },
  detailText: {
    color: "white",
  },
  listContainer: {
    maxWidth: "80%",
  },
  listOuterContainer: {
    alignItems: "center",
  },
});
