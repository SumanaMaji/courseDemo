import {useLayoutEffect} from 'react';
import { View, Text, StyleSheet, FlatList  } from "react-native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealsList from './../components/MealsList/MealsList';
// import { useRoute } from "@react-navigation/native";

function MealsOverviewScreen({ route, navigation }) {
  // const route = useRoute();

 
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((mealitem) => {
    return mealitem.categoryIds.indexOf(catId) >= 0;
  });

  
  useLayoutEffect(()=>{
    const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;

    navigation.setOptions({
      title: categoryTitle
    });
  },[catId, navigation]);

 return <MealsList items={displayedMeals}></MealsList>
}
export default MealsOverviewScreen;

