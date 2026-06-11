import { Text, StyleSheet } from "react-native";
import Button from "../../atoms/Button";
import Eyebrow from "../../atoms/Eyebrow";
import { colors, typography } from "../../../constants/theme";

type Props = {
  scenario: string;
  childName: string;
  story: string;
  loading: boolean;
  error: string | null;
  onStop: () => void;
  onNew: () => void;
};

const StoryView = ({
  scenario,
  childName,
  story,
  loading,
  error,
  onStop,
  onNew,
}: Props) => {
  return (
    <>
      <Eyebrow>
        {scenario} · for {childName}
      </Eyebrow>
      {error && <Text style={styles.error}>{error}</Text>}
      {loading && !story ? <Eyebrow>Writing now…</Eyebrow> : null}
      {story ? <Text style={styles.story}>{story}</Text> : null}
      <Button
        label={loading ? "Stop" : "New story"}
        onPress={loading ? onStop : onNew}
      />
    </>
  );
};

const styles = StyleSheet.create({
  story: { ...typography.body, color: colors.text },
  error: { ...typography.body, color: colors.error },
});

export default StoryView;
