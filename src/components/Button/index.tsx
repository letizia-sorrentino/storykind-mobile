import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";
import { colors, radius, spacing, typography } from "../../constants/theme";

type ButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
};

const Button = ({
  label,
  onPress,
  disabled = false,
  loading = false,
}: ButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={[styles.button, isDisabled && styles.disabled]}
      onPress={onPress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator color={colors.surface} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    padding: spacing.md,
    alignItems: "center",
  },
  disabled: {
    opacity: 0.6,
  },
  label: {
    ...typography.label,
    color: colors.surface,
    fontWeight: "600",
  },
});

export default Button;
