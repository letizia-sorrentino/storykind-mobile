import { useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { colors, typography, spacing } from "../../constants/theme";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const GenerateScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Generate</Text>
    </ScrollView>
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
