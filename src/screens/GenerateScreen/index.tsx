import { View, Text, StyleSheet } from "react-native";
import { colors, typography, spacing } from "../../constants/theme";

const GenerateScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate</Text>
    </View>
  );
};

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

export default GenerateScreen;
