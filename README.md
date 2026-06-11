# StoryKind

Personalised stories that prepare children for what's coming.

StoryKind is a React Native (Expo) app that generates short, calm **preparation
stories** — helping children get ready for new or stressful situations like a
dentist visit, a haircut, starting school, or a new sibling. A parent sets up a
child's profile once, then picks what's coming up and the story streams in,
written for that child.

## How it works

The app talks to a small **Next.js proxy**
([`storykind-proxy`](https://github.com/letizia-sorrentino/storykind-proxy),
deployed on Vercel) that owns the Anthropic API key and streams the response
back over Server-Sent Events. The app renders each delta as it arrives.

```
app (Expo / RN)  ──POST { messages }──▶  storykind-proxy (Next.js, Vercel)
       ▲                                          │
       └────────────  SSE deltas  ◀───────────────┘  (Anthropic key lives here)
```

## Tech

- **Expo + React Native + TypeScript**
- **React Navigation** — bottom tabs (Create / Library / Profile)
- State: `useState` + `useContext` (no Redux — deliberate at this scope)
- Persistence: **AsyncStorage** behind typed repositories
- Streaming: **`react-native-sse`** (`EventSource`)
- No UI/component libraries — components are hand-built against a small theme
  token set and organised by **atomic design**

## Project structure

```
src/
  screens/        Create (GenerateScreen), Library, Profile
  components/
    atoms/        Button, OptionButton, Eyebrow, Input
    molecules/    Field
    organisms/    ScenarioForm, StoryView
  hooks/          useStoryStream  (SSE lifecycle)
  navigation/     bottom-tab navigator + typed routes
  storage/        profileRepo  (typed AsyncStorage wrapper)
  constants/      theme tokens (colors, spacing, radius, typography)
  types.ts        Profile, Scenario, …
```

## Running locally

Requires Node, the Expo CLI (via `npx`), and the Expo Go app on a phone or a
simulator.

```bash
npm install

# point the app at a running proxy
echo "EXPO_PUBLIC_API_URL=https://<your-storykind-proxy>/api/generate" > .env

npx expo start -c
```

Then scan the QR code with Expo Go. `EXPO_PUBLIC_` vars are bundled (not
secret) — keep secrets in the proxy, never here.

## Status

Early build, in active development. Generate + streaming work end-to-end; the
navigation and information architecture have just been reworked into tabs.
Coming next: story persistence, a saved-stories library, refinement, and a
polish pass. A demo video and architecture write-up will land with the v1.
