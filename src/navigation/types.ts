import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Profile: undefined;
  Generate: undefined;
  Library: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
