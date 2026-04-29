import { View, Text, StyleSheet } from "react-native";
import { colors, typography, spacing } from "../../constants/theme";

const LibraryScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Library</Text>
    </View>
  );
};

export default LibraryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
});
