export const PRONOUNS = ["he/him", "she/her", "they/them"] as const;
export type Pronouns = (typeof PRONOUNS)[number];

export const SCENARIOS = [
  "dentist",
  "haircut",
  "doctor",
  "school-start",
  "new-sibling",
  "moving-house",
] as const;

export type Scenario = (typeof SCENARIOS)[number];

export type Profile = {
  id: string;
  name: string;
  age: number;
  pronouns: Pronouns;
  sensitivities: string;
  createdAt: string;
};
