import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Field from "../../components/Field";
import OptionButton from "../../components/OptionButton";
import Button from "../../components/Button";
import { colors, radius, typography, spacing } from "../../constants/theme";
import { PRONOUNS, SCENARIOS } from "../../types";
import type { Profile } from "../../types";
import { validateProfile, type FormErrors } from "./validate";
import { profileRepo } from "../../storage/profileRepo";
import { useNavigation } from "@react-navigation/native";
import type { NavigationProp } from "../../navigation/types";

const ProfileScreen = () => {
  const [form, setForm] = useState<Partial<Profile>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    let active = true;
    (async () => {
      const saved = await profileRepo.load();
      if (active && saved) {
        setForm(saved);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleSave = async () => {
    const nextErrors = validateProfile(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    const profile: Profile = {
      id: form.id ?? Date.now().toString(),
      name: form.name!.trim(),
      age: form.age!,
      pronouns: form.pronouns!,
      scenario: form.scenario!,
      sensitivities: form.sensitivities?.trim() ?? "",
      createdAt: form.createdAt ?? new Date().toISOString(),
    };

    try {
      setSaving(true);
      await profileRepo.save(profile);
      setForm(profile);
      navigation.navigate("Generate");
    } catch {
      Alert.alert(
        "Could not save profile",
        "Something went wrong. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

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
          placeholder="1–12"
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

      <Button label="Save profile" onPress={handleSave} loading={saving} />
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
