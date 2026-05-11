import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors, radius, typography, spacing } from "../../constants/theme";

type OptionButtonProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const OptionButton = ({ label, selected, onPress }: OptionButtonProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={onPress}
    >
      <Text style={[styles.label, selected && styles.labelSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  containerSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  label: { ...typography.body, color: colors.text },
  labelSelected: { color: colors.surface },
});

export default OptionButton;
