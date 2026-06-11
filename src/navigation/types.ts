import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
export type RootTabParamList = {
  Profile: undefined;
  Generate: undefined;
  Library: undefined;
};

export type NavigationProp = BottomTabNavigationProp<RootTabParamList>;
