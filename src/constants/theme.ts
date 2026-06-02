export const colors = {
  background: "#F0F4F8",
  surface: "#FFFFFF",
  primary: "#9DB4D6",
  accent: "#F6BF5F",
  text: "#2D3748",
  textSubtle: "#718096",
  border: "#CBD5E0",
  muted: "#A0AEC0",
} as const;

export const typography = {
  // Headings: line height 1.2
  display: { fontSize: 32, fontWeight: "700", lineHeight: 38 },
  h1: { fontSize: 24, fontWeight: "700", lineHeight: 29 },
  h2: { fontSize: 18, fontWeight: "600", lineHeight: 22 },
  // Body and below: line height 1.4
  body: { fontSize: 16, fontWeight: "400", lineHeight: 22 },
  caption: { fontSize: 13, fontWeight: "400", lineHeight: 18 },
  label: { fontSize: 12, fontWeight: "500", lineHeight: 16 },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  pill: 999,
} as const;
