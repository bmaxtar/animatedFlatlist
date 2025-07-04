import React from "react";
import { View, FlatList, StyleSheet, ViewToken, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from "react-native-reanimated";
import { ListItem } from "./components/ListItem";

const data = new Array(50).fill(0).map((_, index) => ({ id: index }));

export default function App() {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const animatedTitleStyle = useAnimatedStyle(() => {
    return {
      position: "absolute",
      top: 50,
      zIndex: 10,
      backgroundColor: "#fff",
      opacity: interpolate(scrollY.value, [0, 60], [1, 0.7], Extrapolate.CLAMP),
      transform: [
        {
          translateY: interpolate(
            scrollY.value,
            [0, 60],
            [0, -20],
            Extrapolate.CLAMP
          ),
        },
      ],
      alignItems: "center",
    };
  });

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={{ paddingTop: 40, paddingBottom: 20 }}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
        renderItem={({ item, index }) => {
          const isRight = index % 2 === 0;
          return (
            <ListItem
              item={item}
              viewableItems={viewableItems}
              key={item.id}
              style={{ marginTop: isRight ? 40 : 0, marginHorizontal: 10 }}
            />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
