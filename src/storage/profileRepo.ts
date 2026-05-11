import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Profile } from "../types";

const KEY = "@profile";

export const profileRepo = {
  async save(profile: Profile): Promise<void> {
    await AsyncStorage.setItem(KEY, JSON.stringify(profile));
  },

  async load(): Promise<Profile | null> {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Profile) : null;
  },

  async clear(): Promise<void> {
    await AsyncStorage.removeItem(KEY);
  },
};
