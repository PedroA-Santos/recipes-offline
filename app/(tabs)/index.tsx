import {
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  Pressable,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import InputSearch from "@/components/InputSearch";
import { useCallback, useState } from "react";
import axios from "axios";
import { RecipeSearchQuery, RecipeSummary } from "@/types/recipes";
import { FlatList } from "react-native-gesture-handler";
import RecipeDetailsModal from "@/components/RecipeDetailsModal";

const keyApi = "a7a587dfeb14444cb52fe6104668ac2b";

const RecipeListItem = ({
  recipe,
  onPressRecipe,
}: {
  recipe: RecipeSummary;
  onPressRecipe: (id: number) => void;
}) => {
  return (
    <Pressable
      style={styles.recipeItemContainer}
      onPress={() => onPressRecipe(recipe.id)}
    >
      <Image
        style={{ width: 100, height: 100, borderRadius: 8 }}
        source={{
          uri: recipe.image,
        }}
      />
      <Text style={styles.recipeItemTitle}>{recipe.title}</Text>
    </Pressable>
  );
};

export default function HomeScreen() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [selectedRecipeId, setSelectedRecipeId] = useState<number>();

  const onPressRecipe = (recipeId: number) => {
    setSelectedRecipeId(recipeId);
  };

  const handleSearch = useCallback(async () => {
    try {
      setLoading(true);
      const { data }: RecipeSearchQuery = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${keyApi}&query=${input}&number=10`
      );
      setRecipes(data.results);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [input]);

  if (loading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <>
      <SafeAreaView>
        <View style={styles.inputContainer}>
          <InputSearch
            placeholder="Search Recipes"
            value={input}
            setValue={setInput}
            handleSearch={handleSearch}
          />
        </View>
        <View style={{ paddingHorizontal: 16 }}>
          <FlatList
            data={recipes}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <RecipeListItem recipe={item} onPressRecipe={onPressRecipe} />
            )}
          />
        </View>
        <RecipeDetailsModal
          visible={Boolean(selectedRecipeId)}
          onClose={() => setSelectedRecipeId(undefined)}
          recipeId={selectedRecipeId}
          offline={false}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    padding: 12,
  },
  recipeItemContainer: {
    flexDirection: "row",
    gap: 16,
    padding: 8,
    marginVertical: 8,
    backgroundColor: "#fafafa",
    borderRadius: 8,
  },
  recipeItemTitle: {
    fontSize: 22,
    color: "#007363",
    flexShrink: 1,
  },
});