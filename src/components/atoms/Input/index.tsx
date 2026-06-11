import { StyleSheet, TextInput } from "react-native";
import type { TextInputProps } from "react-native";
import { colors, radius, spacing, typography } from "../../../constants/theme";

const Input = ({ multiline, style, ...props }: TextInputProps) => {
  return (
    <TextInput
      style={[styles.input, multiline && styles.multiline, style]}
      placeholderTextColor={colors.muted}
      multiline={multiline}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
});

export default Input;
