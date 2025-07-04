import React from "react";
import { ViewToken } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

type ListItemProps = {
  viewableItems: Animated.SharedValue<ViewToken[]>;
  item: {
    id: number;
  };
};

const DIMENSIONS = window.innerWidth || 400;
const ITEM_HEIGHT = DIMENSIONS * 0.4;
const ITEM_WIDTH = DIMENSIONS * 0.45;

const ListItem: React.FC<ListItemProps & { style?: any }> = React.memo(
  ({ item, viewableItems, style }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const isVisible = viewableItems.value.some(
        (viewToken) => viewToken.item.id === item.id && viewToken.isViewable
      );
      return {
        opacity: withTiming(isVisible ? 1 : 0.5, { duration: 600 }),
        transform: [
          {
            scale: withTiming(isVisible ? 1 : 0.1, { duration: 500 }),
          },
        ],
      };
    }, [viewableItems, item.id]);

    return (
      <Animated.View
        style={[
          {
            height: ITEM_HEIGHT,
            width: ITEM_WIDTH,
            backgroundColor: "#78CAD2",
            alignSelf: "center",
            borderRadius: 10,
            marginTop: 20,
          },
          style,
          animatedStyle,
        ]}
      />
    );
  }
);

export { ListItem };
