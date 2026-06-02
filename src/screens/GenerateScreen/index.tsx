import { useState } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { colors, typography, spacing } from "../../constants/theme";
import Button from "../../components/Button";
import { profileRepo } from "../../storage/profileRepo";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

const GenerateScreen = () => {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!API_URL) {
      setError("API URL is not defined");
      return;
    }
    const currentProfile = await profileRepo.load();

    if (!currentProfile) {
      setError("Profile not loaded");
      return;
    }

    setLoading(true);
    setError(null);
    setStory("");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Write a preparation story for ${currentProfile.name}, age ${currentProfile.age}, about ${currentProfile.scenario}.`,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      setStory(await response.text());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        label="Generate story"
        onPress={handleGenerate}
        loading={loading}
      />
      {error && <Text style={styles.error}>{error}</Text>}
      {story ? <Text style={styles.story}>{story}</Text> : null}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  story: {
    ...typography.body,
    color: colors.text,
  },
  error: {
    ...typography.body,
    color: "#D7263D", // swap for colors.error if/when you add one to the theme
  },
});

export default GenerateScreen;
