import type { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import { colors, typography } from "../../../constants/theme";

type EyebrowProps = { children: ReactNode };

const Eyebrow = ({ children }: EyebrowProps) => {
  return <Text style={styles.eyebrow}>{children}</Text>;
};

const styles = StyleSheet.create({
  eyebrow: {
    ...typography.label,
    color: colors.textSubtle,
  },
});

export default Eyebrow;
