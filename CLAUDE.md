@AGENTS.md

Code structure

Every file in src/app/ is a route (Expo Router), so src/app/ holds only thin route files and _layout.tsx
files. All real code lives outside it, grouped by module:

src/
├── app/                      # routing only; route files just re-export the screen
│   ├── _layout.tsx
│   └── index.tsx             # export {default} from '@/modules/home';
├── modules/                  # one folder per module (feature), named after the module
│   └── home/
│       ├── index.tsx         # the screen component: UI only
│       ├── hooks.ts          # all logic and state (e.g. useHome)
│       ├── constants.ts      # constants for this screen
│       ├── styles.ts         # StyleSheet.create(...) for this screen
│       └── components/       # components used only by this screen
│           └── hint-row/     # same four files again, nested as deep as needed
│               ├── index.tsx
│               ├── hooks.ts
│               ├── constants.ts
│               └── styles.ts
├── components/               # shared, reusable components (same folder-per-component convention)
├── hooks/                    # shared hooks
├── constants/                # global constants (theme, spacing, ...)
├── services/                 # network and data access
└── types/                    # shared types





Each component gets its own kebab-case folder with index.tsx; it must not hold logic. Logic goes in hooks.ts,
constants in constants.ts, and styles in styles.ts. Create only the files a component actually needs.



A component broken into smaller pieces gets those pieces in a components/ folder inside its own folder, following
the same convention recursively.



Platform variants sit beside the file (index.tsx and index.web.tsx).



Import with the @/ alias (maps to src/), never deep relative paths across modules.

Reuse before building

Never hand-build what exists. Check in order: repo (src/components, src/hooks) -> Expo / Expo Router / Expo UI
(read the versioned docs) -> well-maintained library (check peer deps + last publish; npx expo install) -> build it
small. Say why in the summary when adding a library or keeping custom code.

Shared components and theme

Match the neatness of the default Expo starter (what create-expo-app generates:
https://github.com/expo/expo/tree/main/templates/expo-template-default), in our folder-per-component layout.





Use ThemedText / ThemedView (src/components), not raw Text/View with ad-hoc fonts/colours. New text style =
new ThemedText type.



Tokens only from src/constants/theme.ts (Colors, Fonts, Radius, Spacing, MaxContentWidth,
BottomTabInset). Design-only numbers stay in the module's constants.ts.



Used by more than one module, or generic (button, badge, card) -> src/components/<name>/.



src/app/** only re-exports from src/modules/<name> (root layout: modules/root-layout).

Platform insets

Why the platforms differ (checked against the React Native typings and
https://docs.expo.dev/router/advanced/native-tabs/):





ScrollView.contentInset is iOS-only: Android ignores it and web has no equivalent. So one screen needs three
treatments: iOS passes contentInset; Android puts the same numbers in contentContainerStyle padding (from
useSafeAreaInsets()); web uses fixed Spacing padding and centres content with maxWidth: MaxContentWidth.



Native tabs: iOS already applies automatic content-inset adjustment to the first ScrollView of a tab screen; Android
wraps the screen in a SafeAreaView for the bottom inset only (top/left/right are manual); web has neither. Start
from that and add padding only when content is clipped on a real device.



BottomTabInset is the height of the native tab bar that content must clear (iOS 50pt, Android 80dp Material 3 bar;
0 on web). The bottom spacing is safe-area bottom + BottomTabInset + Spacing.three where native tabs overlap
content.



Per-platform values: Platform.select({...}) ?? fallback. Whole-UI differences: .web.tsx file.



Native tabs only when NATIVE_TABS_SUPPORTED (Android, iOS 26+). iOS < 26 and web use in-flow JS tabs: no
BottomTabInset there. Gate on that flag, not Platform.OS.



Home header sits outside the ScrollView and owns the top inset; the ScrollView adds bottom only.



Never hard-code status bar / home indicator sizes.

Responsive layout





Never scale every number with the window width. Fonts, icons, paddings, radii, chips and buttons keep a fixed size
(the design's, as dp). Only layout containers respond: how many columns a grid has, how wide a column or card is,
how wide the content column and banners are.



useLayout() (src/hooks/use-layout.ts) gives the width class, contentWidth (capped at MAX_CONTENT_WIDTH) and the
margin beside it; pick({compact, medium, expanded}) chooses a per-class value. Breakpoints: compact < 600,
medium 600-1023, expanded >= 1024 or any wide, short window (a phone in landscape). useGrid() turns columns, gap and
inset into a column width. Put each section's per-class numbers (columns, gaps, insets) in its constants.ts.



A card's height comes from an aspect ratio, never from a scaled number. Artwork drawn at one size (category and brand
tiles) is scaled from its own column width inside that component only; text inside it stays fixed.



Anything fixed-height in a sheet or hero must also fit a short window (see the filter sheet body and the hero card).

Gotchas





Dev server: never CI=1 (disables file watching, edits not served). On SSR "unknown module" errors, restart it.



Web SSR renders with window width 0: guard components that reject 0 sizes.



Test UI on web with Playwright at several sizes (360x740, 393x852, 430x932, 932x430, 768x1024, 1180x820). Native iOS/Android can't run here; the user tests them, so say
what is unverified.



Never invent UI: search every Figma layer name/text before saying something is missing. A screen is often one long
frame, and fixed UI (header, bottom nav) sits inside it, not at the end.



Tab icons: outline grey when unselected, filled yellow when selected. If the design only has one state of an icon,
derive the other from the design's own icon (regenerate, don't redraw).



Native tab icons need PNG (no SVG), pre-coloured, no tint (assets/icons/tabs). iOS draws a PNG at px/scale pt, so a
24pt icon needs name.png 24px + @2x 48px + @3x 72px; a lone 96px file renders 96pt and breaks the glass bar.



Figma quota can run out for days (REST locks, MCP throttles bursts): fetch every asset a screen needs in one pass, in
small batches, and keep the originals outside the repo. A whole-node SVG export gives text as exact outlines.



Figma MCP is rate limited: use the REST API with your own personal access token in the FIGMA_TOKEN env var (never
commit it, never hard-code a file key here; the design link comes from the task).



Reanimated: read .value inline inside useAnimatedStyle; shared helper closures are not tracked.



RN 0.88: StyleSheet.absoluteFillObject is gone (use absoluteFill); ellipses need borderRadius: '50%'.



Hero carousel = react-native-reanimated-carousel (loop + autoplay). Native lays items from the left edge, so centre
with itemAnimation translateX, not padding. Web trackpad scroll is wheel.web.ts: it drives scrollOffsetValue
continuously and snaps to the nearest slide when it stops.



Figma SVGs with mask/filter (blurred or outlined text, patterned tiles) render wrong or heavy with expo-image on
Android: rasterize them at 3x to transparent WebP (Chromium via Playwright). Plain path SVGs (logos) stay SVG.



Home is one FlatList (explore-collection): sections are its header and the sticky filter bar is the first data
row.
With a ListHeaderComponent, stickyHeaderIndices counts the header as 0, so that row is index 1. Never nest a
virtualized list inside a ScrollView.



Catalogue data comes from services/catalogue.ts (mock: 2s delay on pages after the first). Swap it for the real API
there; the UI only calls fetchCataloguePage.



AI search: services/decisions ranks constants/search-catalogue with OpenAI's Decisions API (POST /v1/decisions,
predicate question per photo). HTTP goes through the singleton axios client services/openai-client (auth + error
interceptors). The key is AES-encrypted in .env (services/openai-key): obfuscation only, production needs a
proxy. Every search is a real call and costs money: ask the user before running many.



Animate transform/opacity, never width/height (re-runs native layout every frame; jank on device).



expo-image inside gesture areas on web: draggable={false}, or the browser cancels the gesture.



Playwright mouse.wheel deltas arrive doubled in Chrome; log real event.deltaX before reading test results.

Hygiene





No trash: when a change makes an asset, file, token or dependency unused, delete it in the same change. Keep tool
output (.playwright-mcp/, .DS_Store) out of git. Density files (@2x/@3x) look unreferenced but are not.

Code style





Use a 4-space indent in all code files (TS/TSX/JS/JSON-config alike).

