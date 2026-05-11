import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import Field from "../../components/Field";
import OptionButton from "../../components/OptionButton";
import { colors, radius, typography, spacing } from "../../constants/theme";
import { PRONOUNS, SCENARIOS } from "../../types";
import type { Profile } from "../../types";

const ProfileScreen = () => {
  const [form, setForm] = useState<Partial<Profile>>({});

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Child's Profile</Text>

      <Field label="Name">
        <TextInput
          style={styles.input}
          value={form.name ?? ""}
          onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
          placeholder="e.g. Jack"
          placeholderTextColor={colors.muted}
        />
      </Field>

      <Field label="Age">
        <TextInput
          style={styles.input}
          value={form.age?.toString() ?? ""}
          onChangeText={(text) => {
            const parsed = parseInt(text, 10);
            setForm((prev) => ({
              ...prev,
              age: isNaN(parsed) ? undefined : parsed,
            }));
          }}
          keyboardType="numeric"
          placeholder="1–17"
          placeholderTextColor={colors.muted}
        />
      </Field>

      <Field label="Pronouns">
        <View style={styles.optionsRow}>
          {PRONOUNS.map((option) => (
            <OptionButton
              key={option}
              label={option}
              selected={form.pronouns === option}
              onPress={() => setForm((prev) => ({ ...prev, pronouns: option }))}
            />
          ))}
        </View>
      </Field>

      <Field label="Scenario">
        <View style={styles.optionsRow}>
          {SCENARIOS.map((option) => (
            <OptionButton
              key={option}
              label={option}
              selected={form.scenario === option}
              onPress={() => setForm((prev) => ({ ...prev, scenario: option }))}
            />
          ))}
        </View>
      </Field>

      <Field label="Sensitivities (optional)">
        <TextInput
          style={[styles.input, styles.inputMultiline]}
          value={form.sensitivities ?? ""}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, sensitivities: text }))
          }
          placeholder="e.g. scared of dogs, doesn't like loud noises"
          placeholderTextColor={colors.muted}
          multiline
          numberOfLines={3}
          maxLength={500}
        />
      </Field>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  heading: {
    ...typography.h1,
    color: colors.text,
  },
  input: {
    ...typography.body,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  inputMultiline: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});

export default ProfileScreen;
