import { View, Text, StyleSheet } from "react-native";
import OptionButton from "../../atoms/OptionButton";
import Button from "../../atoms/Button";
import Eyebrow from "../../atoms/Eyebrow";
import { SCENARIOS } from "../../../types";
import type { Scenario } from "../../../types";
import { colors, typography, spacing } from "../../../constants/theme";

type Props = {
  childName: string;
  childAge: number;
  selected: Scenario | null;
  onSelect: (scenario: Scenario) => void;
  onGenerate: () => void;
  loading: boolean;
};

const ScenarioForm = ({
  childName,
  childAge,
  selected,
  onSelect,
  onGenerate,
  loading,
}: Props) => {
  return (
    <>
      <Text style={styles.heading}>Let’s make a story</Text>

      <Eyebrow>Who’s it for?</Eyebrow>
      <Text style={styles.child}>
        {childName}, {childAge}
      </Text>

      <Eyebrow>What’s coming up?</Eyebrow>
      <View style={styles.optionsRow}>
        {SCENARIOS.map((option) => (
          <OptionButton
            key={option}
            label={option}
            selected={selected === option}
            onPress={() => onSelect(option)}
          />
        ))}
      </View>

      <Button
        label="Generate story"
        onPress={onGenerate}
        loading={loading}
        disabled={!selected}
      />
    </>
  );
};

const styles = StyleSheet.create({
  heading: { ...typography.h1, color: colors.text },
  child: { ...typography.h2, color: colors.text },
  optionsRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
});

export default ScenarioForm;
