import { useState, useCallback } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Button from "../../components/atoms/Button";
import { profileRepo } from "../../storage/profileRepo";
import type { Profile, Scenario } from "../../types";
import type { NavigationProp } from "../../navigation/types";
import { colors, typography, spacing } from "../../constants/theme";
import { useStoryStream } from "./../../hooks/useStoryStream";
import ScenarioForm from "../../components/organisms/ScenarioForm";
import StoryView from "../../components/organisms/StoryView";

const GenerateScreen = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(
    null,
  );
  const [view, setView] = useState<"form" | "story">("form");
  const navigation = useNavigation<NavigationProp>();
  const { story, loading, error, generate, stop, reset } = useStoryStream();

  useFocusEffect(
    useCallback(() => {
      let active = true;
      (async () => {
        const saved = await profileRepo.load();
        if (active) setProfile(saved);
      })();
      return () => {
        active = false;
        stop();
      };
    }, [stop]),
  );

  if (!profile) {
    return (
      <View style={styles.empty}>
        <Text style={styles.heading}>Set up a profile first</Text>
        <Text style={styles.emptyBody}>
          Tell us about your child so we can write stories just for them.
        </Text>
        <Button
          label="Go to Profile"
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
    );
  }

  const handleGenerate = () => {
    if (!selectedScenario) return;
    generate({
      name: profile.name,
      age: profile.age,
      scenario: selectedScenario,
    });
    setView("story");
  };

  const handleNewStory = () => {
    reset();
    setView("form");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {view === "form" ? (
        <ScenarioForm
          childName={profile.name}
          childAge={profile.age}
          selected={selectedScenario}
          onSelect={setSelectedScenario}
          onGenerate={handleGenerate}
          loading={loading}
        />
      ) : (
        <StoryView
          scenario={selectedScenario ?? ""}
          childName={profile.name}
          story={story}
          loading={loading}
          error={error}
          onStop={stop}
          onNew={handleNewStory}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: spacing.lg, gap: spacing.lg },
  empty: {
    flex: 1,
    justifyContent: "center",
    padding: spacing.lg,
    gap: spacing.md,
  },
  heading: { ...typography.h1, color: colors.text },
  emptyBody: { ...typography.body, color: colors.textSubtle },
});

export default GenerateScreen;
