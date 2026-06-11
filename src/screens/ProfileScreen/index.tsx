import { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Field from "../../components/molecules/Field";
import OptionButton from "../../components/atoms/OptionButton";
import Button from "../../components/atoms/Button";
import Input from "../../components/atoms/Input";
import { colors, typography, spacing } from "../../constants/theme";
import { PRONOUNS } from "../../types";
import type { Profile } from "../../types";
import { validateProfile, type FormErrors } from "./validate";
import { profileRepo } from "../../storage/profileRepo";

const ProfileScreen = () => {
  const [form, setForm] = useState<Partial<Profile>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

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
      sensitivities: form.sensitivities?.trim() ?? "",
      createdAt: form.createdAt ?? new Date().toISOString(),
    };

    try {
      setSaving(true);
      await profileRepo.save(profile);
      setForm(profile);
      Alert.alert("Saved", "Profile updated.");
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
        <Input
          value={form.name ?? ""}
          onChangeText={(text) => setForm((prev) => ({ ...prev, name: text }))}
          placeholder="e.g. Jack"
        />
      </Field>

      <Field label="Age">
        <Input
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

      <Field label="Sensitivities (optional)">
        <Input
          value={form.sensitivities ?? ""}
          onChangeText={(text) =>
            setForm((prev) => ({ ...prev, sensitivities: text }))
          }
          placeholder="e.g. scared of dogs, doesn't like loud noises"
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
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
});

export default ProfileScreen;
