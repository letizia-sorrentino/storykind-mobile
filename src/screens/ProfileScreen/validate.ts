import { Profile } from "../../types";

export type FormErrors = {
  name?: string;
  age?: string;
  pronouns?: string;
  sensitivities?: string;
};

const NAME_MAX_LENGTH = 40;
const AGE_MIN = 1;
const AGE_MAX = 12;

export function validateProfile(form: Partial<Profile>): FormErrors {
  const errors: FormErrors = {};

  const name = form.name?.trim() ?? "";
  const age = form.age;
  const pronouns = form.pronouns?.trim() ?? "";
  if (name !== undefined) {
    if (name.length === 0) {
      errors.name = "Please enter a name.";
    } else if (name.length > NAME_MAX_LENGTH) {
      errors.name = `Name must be at most ${NAME_MAX_LENGTH} characters`;
    }
  }

  if (age !== undefined) {
    if (typeof age !== "number" || isNaN(age)) {
      errors.age = "Age must be a number";
    } else if (age < AGE_MIN || age > AGE_MAX) {
      errors.age = `Age must be between ${AGE_MIN} and ${AGE_MAX}`;
    }
  }

  if (pronouns !== undefined) {
    if (pronouns.length === 0) {
      errors.pronouns = "Please choose pronouns.";
    }
  }

  return errors;
}
