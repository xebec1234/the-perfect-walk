# The Perfect Walk --- Stage 2 Complete Requirements & Scope

**Project:** The Perfect Walk PWA\
**Trial:** 7-day paid build\
**Primary objective:** Deliver a polished, installable, mobile-first
walking experience that guides the user into the five-part Perfect Walk
practice and then gets out of the way.

> **North-star test:** If the phone disappeared into the user's pocket a
> few minutes into the walk and the experience still worked, the product
> is doing its job.

------------------------------------------------------------------------

## 0. How to Use This Document

This is the **scope-control document** for the Stage 2 trial.

It has four kinds of information:

1.  **Client requirements** --- things Elliot explicitly requires.
2.  **Guide requirements** --- behavior and philosophy taken from the
    Perfect Walk guide.
3.  **Implementation decisions** --- choices we make so the project can
    actually be built within 7 days.
4.  **Out of scope** --- features we will deliberately not build during
    the trial.

When a new idea appears during development, compare it against this
document.

### Scope rule

A feature is allowed into the Stage 2 build only if it:

-   satisfies an explicit client requirement,
-   is necessary for the five-part walk to work,
-   directly improves the pocket-first experience,
-   fixes a reliability/accessibility problem,
-   or is a small implementation detail required by an existing feature.

Everything else goes into **Future Ideas**, not the current build.

------------------------------------------------------------------------

# 1. Product Definition

## 1.1 What Perfect Walk is

The Perfect Walk turns an ordinary morning walk into a five-part daily
practice designed around different states of attention and feeling.

The guide describes the five parts as:

1.  **Opening Your Heart** --- always first.
2.  **Feeling Your Power**
3.  **Letting Go & Total Presence**
4.  **Connecting with Higher Power**
5.  **Celebrate & Raise Your Vibration** --- always last.

The middle three may be reordered. Part 1 and Part 5 may not be moved.

The guide emphasizes that words are only an entrance to the experience.
The user should eventually need fewer prompts and become able to reach
the desired state through practice. fileciteturn1file0L25-L49

The guide also describes the mind as an anchor: use thought to reach a
feeling, then release the thought and focus on the feeling itself.
fileciteturn1file0L87-L97

### Product interpretation

The app is therefore **not primarily a reading app**.

It is an **audio-led walking experience**.

The interface should:

-   orient the user,
-   start the practice,
-   give short anchors,
-   show only useful progress information,
-   transition between parts,
-   and then disappear from the user's attention.

------------------------------------------------------------------------

# 2. Stage 2 Success Criteria

The trial is successful when all of the following are true.

## 2.1 Mandatory payment checklist

### 1. Live HTTPS URL

-   App loads from a public HTTPS URL.
-   Opens on a phone.
-   No login is required before starting the walk.
-   URL must be shareable.

### 2. Five parts

All five parts exist and are correctly named.

Order rules:

-   Part 1 is always first.
-   Part 5 is always last.
-   Parts 2--4 are reorderable.

### 3. Reordering

User can choose the order of the middle three parts before starting a
walk.

Valid examples:

-   1 → 2 → 3 → 4 → 5
-   1 → 3 → 4 → 2 → 5
-   1 → 4 → 2 → 3 → 5

Invalid examples:

-   2 → 1 → 3 → 4 → 5
-   1 → 2 → 5 → 3 → 4
-   5 → 1 → 2 → 3 → 4

### 4. Audio

-   Every part has audio.
-   Audio starts reliably after user interaction.
-   Audio transitions cleanly between parts.
-   Voice guidance and music are coordinated.
-   Audio should continue when the phone is placed in a pocket where the
    platform/browser permits background playback.
-   This must be tested on a real iPhone, not assumed to work.

### 5. Complete walk

The user can:

-   start,
-   progress through all five parts,
-   reach the final part,
-   finish the walk,
-   and see a completion state.

No broken route, stuck timer, missing audio, or dead-end screen.

### 6. Daily streak

-   Completing a walk records the completion locally.
-   Closing and reopening the app does not erase the streak.
-   The current streak is calculated locally.
-   There is no account or backend.

### 7. Demo

Deliver a screen recording of approximately 3 minutes showing:

-   the home screen,
-   starting a walk,
-   the five-part order,
-   changing the middle-three order,
-   audio/walk flow,
-   completion,
-   streak persistence,
-   and the overall experience.

The developer must also explain in their own words what Perfect Walk is.

------------------------------------------------------------------------

# 3. Explicit Constraints

## 3.1 Platform

**Required:**

-   Web app.
-   PWA.
-   Mobile-first.
-   Installable to a phone home screen.
-   HTTPS.
-   Works without an account.
-   Designed around phone-in-pocket use.

**Not required:**

-   iOS native app.
-   Android native app.
-   App Store submission.
-   Google Play submission.

## 3.2 Backend

There is **no backend** for Stage 2.

Do not build:

-   API server,
-   database,
-   authentication server,
-   user accounts,
-   cloud profile,
-   server-side streaks,
-   analytics backend.

All user state is stored on the device.

## 3.3 Hosting

Free hosting is acceptable.

Recommended:

-   Vercel for the Next.js application.

Alternative free HTTPS hosting is acceptable if it supports the PWA
requirements.

## 3.4 Audio copyright

Do **not** upload Elliot's Spotify tracks as MP3 files.

The guide lists Spotify tracks as examples of music that fits each
section. fileciteturn1file0L99-L107 fileciteturn1file0L145-L153

For the trial, use one of these approaches:

**Preferred for the trial:**

-   royalty-free placeholder music bundled with the app.

Possible alternatives:

-   Spotify deep links as optional references.
-   A future "bring your own music" system.

The app must clearly document the audio approach in `README.md`.

------------------------------------------------------------------------

# 4. Product Principles

These principles override cosmetic feature ideas.

## Principle 1 --- Experience over information

The user should experience the practice rather than read instructions.

The guide explicitly says that experience is where learning and growth
happen. fileciteturn1file0L41-L51

## Principle 2 --- Anchor, then release

The interface/audio can provide an anchor.

Once the user reaches the feeling:

-   stop talking,
-   stop asking questions,
-   stop requiring interaction,
-   let music and walking carry the experience.

## Principle 3 --- The phone should disappear

The user should not have to:

-   repeatedly unlock the phone,
-   read paragraphs,
-   press Next,
-   inspect progress constantly,
-   choose an emotion,
-   or operate a complicated interface.

## Principle 4 --- Do not prescribe an emotion

The app should not communicate:

> "You should feel X now."

Instead:

> "Notice what is here."

or:

> "Use this thought as an anchor, then let it go."

This is especially important for Part 3, where the guide explicitly says
there is no need to try to feel anything.
fileciteturn1file0L193-L213

## Principle 5 --- Gentle relationship with the mind

The guide says to have a peaceful relationship with the mind rather than
an aggressive one. fileciteturn1file0L211-L219

Therefore avoid:

-   failure language,
-   punishment,
-   aggressive streak-loss messaging,
-   "you failed" states,
-   shame-based notifications.

## Principle 6 --- Practice becomes deeper

The guide says repetition makes the practice easier to access and
eventually reduces the need for anchor points.
fileciteturn1file0L79-L97

The Stage 2 implementation should leave room for progressive guidance in
the future, but **does not need a complicated Day 1--Day 60 adaptive
system**.

## Principle 7 --- Simple enough to actually use

The user is supposed to do this in the morning before the phone takes
over their attention. The guide specifically recommends getting outside
before getting absorbed in social media, messages, email, etc.
fileciteturn1file0L65-L81

The app should therefore require as few decisions as possible before
starting.

------------------------------------------------------------------------

# 5. Target User Flow

## Flow A --- First visit

``` text
Open URL
   ↓
Home
   ↓
See today's walk
   ↓
Optional: review/reorder parts
   ↓
Start Walk
   ↓
Part 1
   ↓
Part 2/3/4 in selected order
   ↓
Part 5
   ↓
Walk Complete
   ↓
Streak updated
   ↓
Return to Home
```

No account creation.

No onboarding questionnaire.

No payment screen.

No profile setup.

------------------------------------------------------------------------

# 6. Pages / Screens

The application should have a small number of screens.

## Page 1 --- Home

### Purpose

The home page is the entry point to the daily practice.

### Required content

-   App name: **The Perfect Walk**
-   Short grounding statement.
-   Current streak.
-   Primary CTA: **Start Walk**
-   Secondary CTA: **Choose Your Flow** / **Arrange Parts**
-   Small indication that Part 1 always starts and Part 5 always ends.

### Suggested layout

``` text
The Perfect Walk

Good morning.

Your practice is here.

🔥 7 day streak

[ Start Walk ]

[ Choose Your Flow ]

Opening Your Heart → ... → Celebrate
```

### Important

Do not turn Home into a dashboard.

Do not add:

-   steps,
-   calories,
-   distance,
-   GPS,
-   charts,
-   badges,
-   achievements,
-   social feed,
-   motivational quote feed,
-   weather,
-   news,
-   notifications dashboard.

The goal is to start walking.

------------------------------------------------------------------------

# 7. Page 2 --- Flow / Part Order

## Purpose

Allow the user to select the order of the middle three parts before
starting.

### Fixed parts

``` text
1. Opening Your Heart     [LOCKED]
2. Middle section         [MOVE]
3. Middle section         [MOVE]
4. Middle section         [MOVE]
5. Celebrate & Raise...   [LOCKED]
```

### Interaction

Use drag-and-drop on supported devices.

Also provide accessible up/down controls so reordering does not depend
exclusively on drag gestures.

Example:

``` text
Opening Your Heart        🔒

Feeling Your Power        ↑ ↓
Letting Go & Total Presence ↑ ↓
Connecting with Higher Power ↑ ↓

Celebrate & Raise Your Vibration 🔒

[ Save Flow ]
[ Start Walk ]
```

### Rules

-   Part 1 cannot move.
-   Part 5 cannot move.
-   Only parts 2--4 can move.
-   The selected order persists locally.
-   Starting a walk uses the saved order.

### Do not build

-   AI-generated routines.
-   Unlimited custom stages.
-   User-created stages.
-   Per-stage drag duration.
-   Complex playlist editor.

------------------------------------------------------------------------

# 8. Page 3 --- Walk Screen

This is the most important screen.

## Purpose

Provide a minimal visual anchor while the actual practice is audio-led.

### Required content

-   Current part number.
-   Current part name.
-   Simple progress indicator.
-   Optional elapsed/remaining time.
-   Audio state/play-pause control.
-   Emergency/exit control.

### Example

``` text
PART 2 OF 5

Feeling Your Power

● ● ○ ○ ○

06:42

[ Pause ]

Keep walking.
```

### Screen behavior

Once the walk starts:

-   no long text,
-   no scrolling,
-   no article content,
-   no repeated prompts,
-   no required reading.

The screen may dim naturally.

The user should be able to put the phone away.

------------------------------------------------------------------------

# 9. Page 4 --- Walk Completion

## Purpose

Close the practice positively without turning completion into a gamified
reward system.

### Required content

-   Completion message.
-   Updated streak.
-   Optional "Done" / "Back Home" button.

Example:

``` text
Walk complete.

You showed up.

🔥 8 day practice

[ Done ]
```

### Tone

Celebratory but calm.

Avoid:

-   "YOU WON!"
-   "PERFECT SCORE!"
-   "DON'T BREAK YOUR STREAK!"
-   "FAILURE!"

The guide's closing section is explicitly about celebration and raising
energy. fileciteturn1file0L257-L291

------------------------------------------------------------------------

# 10. Optional Page --- About / Guide

This is **not required for the payment checklist**.

If implemented, keep it extremely small.

It can explain:

-   what Perfect Walk is,
-   the five parts,
-   why the practice is audio-led,
-   the anchor → feeling → release concept.

Do not recreate the entire guide inside the app.

The guide is reference material, not a requirement to build a reading
experience.

If time is tight, **skip this page**.

------------------------------------------------------------------------

# 11. Five Parts --- Product Requirements

Each part has:

-   a unique ID,
-   title,
-   subtitle,
-   sequence position,
-   duration,
-   intro/voice guidance,
-   music,
-   transition behavior.

------------------------------------------------------------------------

## Part 1 --- Opening Your Heart

### Fixed position

Always first.

### Guide duration

The guide says approximately **5--10 minutes**.
fileciteturn1file0L99-L119

### Stage 2 implementation

Use a fixed **7-minute** experience.

### Experience goal

Guide attention toward:

-   heart,
-   love,
-   gratitude,
-   connection,
-   appreciation for life,
-   appreciation for being outside,
-   appreciation for oneself.

The guide describes using a loved one, pet, child, or another meaningful
person as an anchor, then shifting attention from the thought to the
feeling. fileciteturn1file0L117-L143

### Audio sequence

``` text
Short voice introduction
↓
Anchor cue
↓
Brief silence / transition
↓
Music
↓
Long walking period
↓
Optional single gentle reminder
↓
End transition
```

### Interface

Minimal.

Do not display a long meditation script.

------------------------------------------------------------------------

# 12. Part 2 --- Feeling Your Power

### Position

Middle section; reorderable.

### Stage 2 duration

Fixed **5 minutes**.

### Experience goal

Bring attention toward:

-   body,
-   strength,
-   energy,
-   confidence,
-   powerful movement,
-   decisive walking.

The guide specifically suggests squeezing fists, taking firm steps, and
feeling the body fill with power and energy.
fileciteturn1file0L159-L179

### Audio sequence

``` text
Voice anchor
↓
Movement cue
↓
Music
↓
Walking
↓
Minimal reminder
↓
Transition
```

### Important

Do not turn this into a fitness workout.

No:

-   heart-rate target,
-   repetitions,
-   pushups,
-   running requirements,
-   calories,
-   pace measurement.

The physical movement is part of the emotional experience, not a fitness
metric.

------------------------------------------------------------------------

# 13. Part 3 --- Letting Go & Total Presence

### Position

Middle section; reorderable.

### Stage 2 duration

Fixed **5 minutes**.

### Experience goal

Guide the user toward present-moment awareness.

Possible anchors:

-   current step,
-   breath,
-   sound,
-   sight,
-   physical sensation.

The guide emphasizes noticing the current moment and gently returning
when the mind wanders. fileciteturn1file0L185-L215

### Audio sequence

``` text
Voice explains the practice briefly
↓
Present-moment anchor
↓
Music / ambient walking
↓
Long silence
↓
Optional gentle return cue
↓
End transition
```

### Critical rule

Do not force a feeling.

Good:

> "Notice what is here."

Bad:

> "Now feel peaceful."

The user discovers the experience.

------------------------------------------------------------------------

# 14. Part 4 --- Connecting with Higher Power

### Position

Middle section; reorderable.

### Stage 2 duration

Fixed **5 minutes**.

### Experience goal

Create space for connection with whatever the user believes.

The guide explicitly makes this inclusive of religion, spirituality, or
no religion. fileciteturn1file0L223-L255

### Language requirements

Use inclusive language such as:

-   "whatever you believe,"
-   "whatever you call it,"
-   "or nothing at all,"
-   "connection with everything around you."

Avoid assuming:

-   Christianity,
-   Islam,
-   Buddhism,
-   Hinduism,
-   atheism,
-   a specific concept of God.

### Audio

Short reflective guidance followed by music/space.

Do not turn this into:

-   prayer submission,
-   religious instruction,
-   theological lesson,
-   denomination-specific meditation.

------------------------------------------------------------------------

# 15. Part 5 --- Celebrate & Raise Your Vibration

### Fixed position

Always last.

### Stage 2 duration

Fixed **5 minutes**.

### Experience goal

End with increased energy and celebration.

The guide describes celebrating:

-   showing up,
-   life,
-   being able to walk,
-   overcoming challenges,
-   family,
-   growth,
-   the experience itself.

It emphasizes the energy of celebration rather than a specific object of
celebration. fileciteturn1file0L257-L291

### Audio

This should be the most energetic section.

``` text
Closing voice cue
↓
Celebration cue
↓
Energetic music
↓
Long walking period
↓
Final celebratory cue
↓
Music ends
↓
Walk Complete
```

### Important

This is the end of the formal practice.

Do not automatically start another section.

------------------------------------------------------------------------

# 16. Stage Timing Model

## Decision

Use **fixed stage durations** for Stage 2.

### Default durations

  Part                                   Duration Fixed?
  ---------------------------------- ------------ --------
  Opening Your Heart                        7 min Yes
  Feeling Your Power                        5 min Yes
  Letting Go & Total Presence               5 min Yes
  Connecting with Higher Power              5 min Yes
  Celebrate & Raise Your Vibration          5 min Yes
  **Total**                            **27 min** Yes

### Why fixed timers

This avoids scope creep around:

-   GPS,
-   distance,
-   music-track-length detection,
-   user pacing,
-   adaptive timing,
-   route tracking.

The walk is a guided practice, not a navigation or fitness application.

### Future

A later version could experiment with:

-   track-length stages,
-   flexible stage lengths,
-   user-selected duration,
-   adaptive practice depth.

Do not implement these in Stage 2.

------------------------------------------------------------------------

# 17. Audio Architecture

## 17.1 Audio has two conceptual layers

### Layer A --- Voice guidance

Short prerecorded voice instructions.

Purpose:

-   orient,
-   create an anchor,
-   explain the next action,
-   release the user.

### Layer B --- Music

Longer music/ambient audio.

Purpose:

-   support the state,
-   allow the user to walk,
-   reduce screen dependency.

------------------------------------------------------------------------

# 18. Voice Design Rules

Voice should **not** continuously narrate the entire stage.

The pattern is:

``` text
Guide
↓
Anchor
↓
Release
↓
Music / walking
↓
Experience
```

This directly reflects the guide's anchor philosophy: the mind can be
used to reach the feeling, but once the feeling appears, attention
should move to the feeling itself. fileciteturn1file0L87-L97

### Voice requirements

-   Short.
-   Calm when appropriate.
-   Energetic for Part 5.
-   Clear.
-   No unnecessary explanation.
-   No constant talking.
-   No requirement to look at the screen.

### Preferred implementation

Use prerecorded audio files.

Do not depend on browser text-to-speech for the primary experience
because voice quality and platform behavior can vary.

------------------------------------------------------------------------

# 19. Music Requirements

For Stage 2:

-   Use royalty-free music/ambient tracks.
-   Store files in the application's public/static assets.
-   Each stage has at least one playable track.
-   Audio filenames should be stable and descriptive.
-   Do not use copyrighted Spotify audio files.

Example:

``` text
/public/audio/
  voice/
    opening-intro.mp3
    power-intro.mp3
    presence-intro.mp3
    higher-power-intro.mp3
    celebration-intro.mp3

  music/
    opening-music.mp3
    power-music.mp3
    presence-music.mp3
    higher-power-music.mp3
    celebration-music.mp3
```

Actual filenames may differ.

------------------------------------------------------------------------

# 20. Audio State Machine

The audio system should have explicit states.

``` text
IDLE
  ↓
INTRO_PLAYING
  ↓
MUSIC_PLAYING
  ↓
PAUSED
  ↓
MUSIC_PLAYING
  ↓
STAGE_COMPLETE
  ↓
NEXT_STAGE
```

Possible error state:

``` text
AUDIO_ERROR
```

If audio fails:

-   show a clear play/retry control,
-   do not crash the walk,
-   keep the stage alive,
-   allow the user to retry.

------------------------------------------------------------------------

# 21. Background / Locked Screen Audio

This is a high-priority technical risk.

The user explicitly asked about iPhone locked-screen/background audio
during the trial.

### Required validation

Test on a real device:

-   Safari iPhone.
-   Installed PWA if possible.
-   Phone locked.
-   Screen off.
-   Phone in pocket.
-   Headphones/Bluetooth if available.
-   Audio playing.
-   Pause/resume.
-   Incoming interruption.
-   Return from lock.
-   App switching.

### Do not assume

A desktop browser test is not enough.

### Implementation strategy

Use native browser audio primitives:

-   `HTMLAudioElement`
-   `AudioContext` only if genuinely needed
-   Media Session API where supported
-   document visibility events
-   page lifecycle events

Avoid building a complicated audio framework.

------------------------------------------------------------------------

# 22. User Controls During Walk

Keep controls minimal.

## Required

-   Play/pause.
-   Ability to recover audio.
-   Ability to exit/end the walk.

## Optional

-   Previous/next stage only if needed for recovery/testing.

## Do not require

-   Pressing "Next" to advance a normal stage.
-   Reading instructions before each stage.
-   Rating the stage.
-   Choosing an emotion.
-   Journaling during the walk.

The normal walk should advance automatically.

------------------------------------------------------------------------

# 23. Stage Transition Behavior

At the end of a stage:

``` text
Current music fades/ends
↓
Short transition
↓
Next stage voice
↓
Next stage music
```

The transition should feel like one continuous walk, not five unrelated
pages.

### Do not

-   show a large modal,
-   require confirmation,
-   force the user to unlock the phone,
-   display a long explanation.

------------------------------------------------------------------------

# 24. Pause / Resume

If the user pauses:

-   stage timer stops,
-   music pauses,
-   voice stops/does not restart unexpectedly,
-   state is preserved.

When resumed:

-   continue from current position.

### Browser interruption

If the operating system/browser interrupts audio:

-   preserve current stage,
-   preserve timer state as reliably as possible,
-   provide a clear recovery control.

------------------------------------------------------------------------

# 25. Walk Completion Rules

A walk counts as completed only when:

``` text
Part 1 complete
AND
Part 2/3/4 selected sequence complete
AND
Part 5 complete
```

No partial walk should count toward the streak.

### Completion timestamp

Store the local calendar date on completion.

Example:

``` text
2026-09-04
```

Use the device's local date.

------------------------------------------------------------------------

# 26. Streak Requirements

## Goal

Reward consistency without creating pressure.

The guide recommends practicing every day. fileciteturn1file0L79-L85

## Required behavior

-   Completed walks are stored locally.
-   Current streak persists after closing/reopening.
-   The streak survives refresh.
-   The streak survives browser restart.
-   The streak is based on completed days, not app opens.

## Recommended streak logic

Let:

-   `lastCompletedDate` = last calendar date with a completed walk.
-   `currentStreak` = number of consecutive completed calendar days.

When a walk completes:

### Same day

Do not increment more than once.

### Previous calendar day

Increment streak by 1.

### More than one day missed

Reset streak to 1.

### First completed walk

Set streak to 1.

------------------------------------------------------------------------

# 27. Missed Day Experience

Do not punish the user.

Avoid:

``` text
STREAK LOST!
YOU FAILED!
```

Use:

``` text
Welcome back.

Your practice is still here.
```

or equivalent.

The exact copy may be polished later.

The guide's philosophy supports a peaceful relationship with the mind
rather than an aggressive one. fileciteturn1file0L211-L219

------------------------------------------------------------------------

# 28. Local Storage Data Model

No backend means local persistence is essential.

Use a single versioned application state object.

Example:

``` ts
type AppState = {
  schemaVersion: number;

  selectedOrder: StageId[];

  streak: {
    current: number;
    lastCompletedDate: string | null;
    totalCompleted: number;
  };

  completedDates: string[];

  preferences: {
    audioVolume?: number;
    hasCompletedFirstRun?: boolean;
  };

  lastWalk?: {
    startedAt: string;
    completedAt?: string;
    stageId?: StageId;
    stageIndex?: number;
  };
};
```

------------------------------------------------------------------------

# 29. Required Local Variables

## 29.1 Application state

### `schemaVersion`

Type:

``` ts
number
```

Purpose:

-   future local-storage migrations.

Initial value:

``` text
1
```

------------------------------------------------------------------------

## 29.2 Selected stage order

### `selectedOrder`

Type:

``` ts
StageId[]
```

Default:

``` ts
[
  "opening-heart",
  "feeling-power",
  "letting-go",
  "higher-power",
  "celebrate"
]
```

Purpose:

-   persist the user's selected order of the middle three.

Validation:

-   exactly five IDs,
-   first ID must be `opening-heart`,
-   last ID must be `celebrate`,
-   middle IDs must contain exactly:
    -   `feeling-power`
    -   `letting-go`
    -   `higher-power`.

------------------------------------------------------------------------

# 30. Stage Data

Stage definitions should be static application data, not user state.

``` ts
type StageId =
  | "opening-heart"
  | "feeling-power"
  | "letting-go"
  | "higher-power"
  | "celebrate";

type Stage = {
  id: StageId;
  number: number;
  title: string;
  subtitle: string;
  durationSeconds: number;
  voiceIntroSrc: string;
  musicSrc: string;
  position: "first" | "middle" | "last";
};
```

### Suggested static values

``` ts
opening-heart:
  durationSeconds: 420
  position: "first"

feeling-power:
  durationSeconds: 300
  position: "middle"

letting-go:
  durationSeconds: 300
  position: "middle"

higher-power:
  durationSeconds: 300
  position: "middle"

celebrate:
  durationSeconds: 300
  position: "last"
```

------------------------------------------------------------------------

# 31. Streak State

### `current`

Type:

``` ts
number
```

Purpose:

Current consecutive completed days.

### `lastCompletedDate`

Type:

``` ts
string | null
```

Format:

``` text
YYYY-MM-DD
```

### `totalCompleted`

Type:

``` ts
number
```

Purpose:

Lifetime local count.

This is optional to display but useful internally.

------------------------------------------------------------------------

# 32. Completion History

### `completedDates`

Type:

``` ts
string[]
```

Example:

``` json
[
  "2026-09-01",
  "2026-09-02",
  "2026-09-03"
]
```

Purpose:

-   calculate streak reliably,
-   prevent duplicate same-day increments,
-   support future history without requiring a backend.

Keep the implementation simple.

Do not build a calendar UI for Stage 2.

------------------------------------------------------------------------

# 33. Walk Runtime State

Runtime state does not necessarily need to persist permanently.

Use React state for:

``` ts
type WalkRuntimeState = {
  isRunning: boolean;
  isPaused: boolean;
  currentStageIndex: number;
  currentStageId: StageId;
  elapsedSeconds: number;
  remainingSeconds: number;
  audioState:
    | "idle"
    | "intro"
    | "music"
    | "paused"
    | "error"
    | "complete";
};
```

Persist only enough state to recover from normal browser lifecycle
issues if useful.

Do not create a complicated offline walk-resume database.

------------------------------------------------------------------------

# 34. Date Handling

Use local device dates.

Required helper functions:

``` ts
getLocalDateKey(): string
```

Returns:

``` text
YYYY-MM-DD
```

Also implement:

``` ts
isYesterday(dateKey: string): boolean
```

``` ts
isToday(dateKey: string): boolean
```

``` ts
calculateStreak(completedDates: string[]): number
```

Do not use server time because there is no backend.

------------------------------------------------------------------------

# 35. Required Core Functions

## App state

``` ts
loadAppState()
saveAppState(state)
resetAppState()
migrateAppState(state)
```

## Order

``` ts
getDefaultOrder()
validateStageOrder(order)
saveStageOrder(order)
moveStage(stageId, direction)
```

## Walk

``` ts
startWalk()
pauseWalk()
resumeWalk()
endWalk()
advanceStage()
completeWalk()
```

## Timer

``` ts
startTimer()
pauseTimer()
resumeTimer()
resetTimer()
getRemainingTime()
```

## Audio

``` ts
loadAudio()
playVoice()
playMusic()
pauseAudio()
resumeAudio()
stopAudio()
handleAudioEnded()
handleAudioError()
```

## Streak

``` ts
recordCompletion()
calculateCurrentStreak()
hasCompletedToday()
```

------------------------------------------------------------------------

# 36. Suggested Project Structure

``` text
src/
  app/
    page.tsx
    walk/
      page.tsx
    flow/
      page.tsx
    complete/
      page.tsx

  components/
    home/
      StartWalkButton.tsx
      StreakDisplay.tsx

    flow/
      StageOrderList.tsx
      StageOrderItem.tsx

    walk/
      WalkHeader.tsx
      WalkProgress.tsx
      WalkControls.tsx
      StageTimer.tsx
      AudioControls.tsx

    complete/
      CompletionSummary.tsx

  data/
    stages.ts

  hooks/
    useWalk.ts
    useTimer.ts
    useAudio.ts
    useAppState.ts

  lib/
    storage.ts
    streak.ts
    dates.ts
    stage-order.ts

  types/
    stage.ts
    app-state.ts
    walk.ts

  styles/
    globals.css

public/
  audio/
    voice/
    music/
  icons/
```

Exact structure can change if the implementation remains clear and
maintainable.

------------------------------------------------------------------------

# 37. Recommended Libraries

Keep the dependency list small.

## Required / recommended

### Next.js

Purpose:

-   application framework,
-   routing,
-   production build,
-   deployment.

### React

Purpose:

-   UI and state-driven interface.

### TypeScript

Purpose:

-   type safety,
-   safer stage/audio/state handling.

### PWA library

Recommended:

-   `@serwist/next`

Purpose:

-   service worker,
-   installability,
-   caching strategy.

If a simpler stable PWA implementation is already available in the
chosen Next.js version, use it instead.

### Drag-and-drop

Recommended:

-   `@dnd-kit/core`
-   `@dnd-kit/sortable`

Purpose:

-   reorder the middle three stages.

If native buttons provide a simpler and more reliable mobile
interaction, drag-and-drop may be reduced to an enhancement. Up/down
controls must remain available.

### Icons

Recommended:

-   `lucide-react`

Purpose:

-   simple play/pause,
-   lock,
-   arrows,
-   settings/flow icons.

## No library needed for

### Audio

Use browser APIs:

-   `HTMLAudioElement`
-   Media Session API where supported.

### Storage

Use:

-   `localStorage`

IndexedDB is unnecessary for Stage 2 because the amount of state is
tiny.

### Timer

Use:

-   React state,
-   `setInterval` / `requestAnimationFrame` as appropriate.

No timer library required.

------------------------------------------------------------------------

# 38. Package Scope

The application should not accumulate dependencies just because a
package exists.

### Approved dependency categories

-   framework,
-   PWA support,
-   drag-and-drop,
-   icons.

### Avoid

-   UI mega-framework unless already required.
-   Redux/Zustand for this small state model.
-   animation framework unless a simple CSS transition cannot do the
    job.
-   audio player framework.
-   analytics SDK.
-   authentication SDK.
-   database SDK.
-   chatbot/AI SDK.
-   fitness SDK.

------------------------------------------------------------------------

# 39. UI / Visual Direction

The guide's emotional tone is:

-   calm,
-   intentional,
-   experiential,
-   energetic when appropriate,
-   spacious,
-   personal.

The interface should feel like a doorway into a practice, not a
productivity dashboard.

## Visual priorities

1.  readability,
2.  calmness,
3.  large touch targets,
4.  low cognitive load,
5.  clear hierarchy,
6.  minimal interaction.

## Avoid

-   excessive gradients,
-   excessive animations,
-   gamification overload,
-   notification-like UI,
-   dense cards,
-   dashboards,
-   tiny text,
-   tiny buttons,
-   excessive menus.

------------------------------------------------------------------------

# 40. Responsive Design

Primary target:

-   modern iPhone-sized screen.

Must also work on:

-   Android phones,
-   desktop browsers for demo/development.

Minimum practical considerations:

-   safe-area insets,
-   portrait orientation,
-   touch targets,
-   viewport height,
-   browser address-bar changes,
-   screen lock behavior.

------------------------------------------------------------------------

# 41. Accessibility

Required basics:

-   semantic buttons,
-   keyboard support,
-   visible focus states,
-   sufficient contrast,
-   `aria-label` for icon-only buttons,
-   accessible reorder controls,
-   do not rely on color alone,
-   respect reduced-motion preference where animations exist.

For drag-and-drop:

-   provide a non-drag alternative.

------------------------------------------------------------------------

# 42. PWA Requirements

The application must be installable.

Required:

-   valid web app manifest,
-   app name,
-   short name,
-   icons,
-   theme/background configuration,
-   start URL,
-   appropriate display mode,
-   service worker,
-   HTTPS.

Recommended:

``` text
display: standalone
```

The installed app should feel like an app rather than a normal browser
tab.

------------------------------------------------------------------------

# 43. Offline Strategy

Because there is no backend, the app should be designed to work reliably
once assets are available.

### Goal

After the initial load/install:

-   application shell should remain available,
-   stage data should remain available,
-   bundled audio should remain available if service-worker caching
    succeeds,
-   streak/state remains local.

### Do not promise

"Works offline under every browser condition."

Instead test:

1.  Load app online.
2.  Start/visit required pages.
3.  Install PWA.
4.  Disable network.
5.  Reopen.
6.  Verify core shell and cached assets.

------------------------------------------------------------------------

# 44. Home Screen Install Experience

The app should be installable from a phone.

Do not build a complicated custom installation wizard.

Optional:

-   a small dismissible install hint.

Example:

> Add The Perfect Walk to your home screen for an easier morning start.

Do not repeatedly nag.

------------------------------------------------------------------------

# 45. First-Launch Experience

Do not build a long onboarding flow.

First visit should allow:

``` text
Home
↓
Start Walk
```

Optionally show one concise explanation:

> Five parts. One walk. Start with the heart. End with celebration.

Then get out of the way.

------------------------------------------------------------------------

# 46. Morning-First Design

The guide strongly recommends doing the walk first thing in the morning
before getting pulled into the phone and outside-world loop.
fileciteturn1file0L65-L77

The app therefore should:

-   make Start Walk the dominant action,
-   keep home lightweight,
-   avoid social content,
-   avoid news,
-   avoid feed-based browsing,
-   avoid notifications,
-   avoid requiring users to explore before walking.

### Important product principle

The app should help the user **use the phone less**, even though the
phone starts the practice.

------------------------------------------------------------------------

# 47. "Feeling Nothing" Requirement

A first-time user may not immediately experience a dramatic emotional
shift.

The app must not treat this as failure.

Use guidance such as:

-   "You don't need to force anything."
-   "Notice what is here."
-   "Stay with the moment."
-   "Let the experience unfold."

Part 3 especially supports this approach.
fileciteturn1file0L193-L213

Do not implement:

-   emotion scoring,
-   "Did you feel powerful?" surveys,
-   mood charts,
-   success/failure based on emotions.

------------------------------------------------------------------------

# 48. Progressive Guidance --- Stage 2 Boundary

The guide suggests that with repeated practice the user can find the
feelings more easily and eventually need fewer anchor points.
fileciteturn1file0L79-L97

This is a strong future product direction.

### Stage 2

Do **not** build a complex adaptive system.

However, structure the code so a future stage can support:

``` ts
guidanceLevel:
  | "full"
  | "reduced"
  | "minimal";
```

This should be optional architecture, not a required user-facing
feature.

### Future concept

Day 1:

``` text
More guidance
```

Later:

``` text
Shorter anchor
Longer experience
```

Eventually:

``` text
Minimal prompt
```

------------------------------------------------------------------------

# 49. Navigation Rules

Recommended routes:

``` text
/
```

Home.

``` text
/flow
```

Choose/reorder middle stages.

``` text
/walk
```

Active walk.

``` text
/complete
```

Completion.

Optional:

``` text
/about
```

Guide/product explanation.

### Important

Do not create a route for every stage.

Stages are states within the walk, not separate application pages.

------------------------------------------------------------------------

# 50. Walk URL / State Safety

If a user refreshes `/walk`:

Preferred behavior:

-   recover the active walk if enough runtime state is available,
-   otherwise return to Home safely.

Never show:

-   blank page,
-   undefined stage,
-   broken audio,
-   `NaN` timer,
-   missing stage.

------------------------------------------------------------------------

# 51. Error Handling

Every failure should degrade gracefully.

## Audio failure

Show:

``` text
Audio couldn't start.

[ Try Again ]
```

The app remains usable.

## Storage failure

Fallback:

-   use in-memory state for the session,
-   warn only if persistence is unavailable.

Do not crash.

## Invalid local state

If local storage contains invalid/old data:

``` text
validate
↓
migrate if possible
↓
otherwise reset to safe defaults
```

The user should still be able to start the walk.

------------------------------------------------------------------------

# 52. Security / Privacy

No account means minimal user data.

Do not collect:

-   name,
-   email,
-   phone number,
-   location,
-   health information,
-   contacts,
-   microphone data,
-   camera data.

No analytics is required for the trial.

------------------------------------------------------------------------

# 53. No GPS / Fitness Tracking

Explicitly out of scope.

Do not add:

-   GPS,
-   maps,
-   route tracking,
-   steps,
-   distance,
-   pace,
-   calories,
-   heart rate,
-   Apple Health,
-   Google Fit.

Reason:

These features would move the product toward a fitness tracker instead
of the intended experiential practice.

------------------------------------------------------------------------

# 54. No Social Features

Out of scope:

-   profiles,
-   friends,
-   followers,
-   sharing,
-   public streaks,
-   leaderboards,
-   comments,
-   community feed.

------------------------------------------------------------------------

# 55. No Authentication

Out of scope:

-   signup,
-   login,
-   password reset,
-   OAuth,
-   accounts.

The walk must start without authentication.

------------------------------------------------------------------------

# 56. No Payments

This Stage 2 build is a paid development trial for the developer.

The app itself does **not** need:

-   subscriptions,
-   checkout,
-   Stripe,
-   trials,
-   purchase flow,
-   billing.

------------------------------------------------------------------------

# 57. No AI

Do not build:

-   AI coach,
-   chatbot,
-   generated meditation,
-   AI recommendations,
-   AI emotional analysis.

This is unnecessary for the Stage 2 objective.

------------------------------------------------------------------------

# 58. No Notifications

Do not build push notifications in the trial.

Reason:

-   requires additional platform/browser complexity,
-   conflicts with simple scope,
-   not required by the checklist.

Future product may revisit reminders.

------------------------------------------------------------------------

# 59. No User-Generated Playlists

Stage 2:

-   fixed app-provided audio.

Future:

-   user music,
-   Spotify integration,
-   personal playlists.

Do not build music library management now.

------------------------------------------------------------------------

# 60. No Complex Settings

Do not create a Settings page unless needed.

Potential future settings:

-   voice on/off,
-   music volume,
-   stage duration,
-   music source,
-   accessibility.

For Stage 2, only implement controls that are actually necessary.

------------------------------------------------------------------------

# 61. Testing Requirements

Testing must include both technical and experiential testing.

## 61.1 Desktop

Test:

-   Chrome,
-   Safari if available,
-   responsive phone viewport.

## 61.2 Real iPhone

High priority.

Test:

-   Safari.
-   PWA installed.
-   screen locked.
-   screen off.
-   phone in pocket.
-   headphones.
-   Bluetooth audio if available.
-   pause/resume.
-   audio interruptions.
-   returning to app.
-   browser reload.
-   closing/reopening.
-   network off after initial load.

## 61.3 Android

Test at least one modern Android device/browser if available.

------------------------------------------------------------------------

# 62. Mandatory Real-World Walk Test

Before delivery, actually perform the walk.

Do not only click through it while sitting at a desk.

Test:

``` text
Wake up
↓
Open app
↓
Start walk
↓
Put phone in pocket
↓
Walk
↓
Listen
↓
Do not touch phone unnecessarily
↓
Complete all five parts
```

Ask:

> Did I remember that I was using an app?

If yes, investigate why.

------------------------------------------------------------------------

# 63. Pocket Test Checklist

During the real walk:

-   [ ] Can I start without reading much?
-   [ ] Can I put the phone away?
-   [ ] Can I hear the voice?
-   [ ] Can I hear the music?
-   [ ] Does music continue with screen locked?
-   [ ] Do stages advance automatically?
-   [ ] Do I need to touch the phone?
-   [ ] Is the transition smooth?
-   [ ] Does the app feel like one continuous practice?
-   [ ] Does the final celebration feel like a real ending?

------------------------------------------------------------------------

# 64. Functional QA Checklist

## Home

-   [ ] Loads on mobile.
-   [ ] Streak displays.
-   [ ] Start Walk works.
-   [ ] Flow page works.

## Flow

-   [ ] Part 1 locked.
-   [ ] Part 5 locked.
-   [ ] Middle three can reorder.
-   [ ] Invalid order cannot be saved.
-   [ ] Order persists after refresh.
-   [ ] Start Walk uses selected order.

## Walk

-   [ ] Part 1 starts automatically.
-   [ ] Correct title appears.
-   [ ] Voice plays.
-   [ ] Music plays.
-   [ ] Timer counts correctly.
-   [ ] Pause works.
-   [ ] Resume works.
-   [ ] Stage ends.
-   [ ] Next stage begins.
-   [ ] Selected middle order is respected.
-   [ ] Part 5 is always last.
-   [ ] Completion occurs only after Part 5.

## Completion

-   [ ] Completion screen appears.
-   [ ] Streak increments correctly.
-   [ ] Same-day duplicate completion does not double count.
-   [ ] Closing/reopening preserves streak.

## PWA

-   [ ] HTTPS.
-   [ ] Manifest valid.
-   [ ] Icons valid.
-   [ ] Installable.
-   [ ] Service worker registered.
-   [ ] Cached shell tested.

------------------------------------------------------------------------

# 65. Streak QA Examples

Assume today is September 4.

### Case 1

No previous walk.

Complete today.

Expected:

``` text
streak = 1
```

### Case 2

Last completed September 3.

Complete September 4.

Expected:

``` text
streak = previous + 1
```

### Case 3

Last completed September 4.

Complete another walk September 4.

Expected:

``` text
streak unchanged
```

### Case 4

Last completed September 2.

Complete September 4.

Expected:

``` text
streak = 1
```

### Case 5

Last completed September 3.

Close browser.

Reopen September 4.

Expected:

``` text
streak remains correct
```

------------------------------------------------------------------------

# 66. Audio QA Matrix

  Test                 Expected
  -------------------- ----------------------------------------------
  Start Walk           Audio starts after user gesture
  Voice ends           Music starts
  Music ends           Next stage begins
  Pause                Audio and timer pause
  Resume               Audio and timer resume
  Lock screen          Audio should continue where platform permits
  Screen off           Audio should continue where platform permits
  Bluetooth            Audio routes correctly
  Audio interruption   App recovers gracefully
  Audio failure        Retry available
  Final music ends     Completion state appears

------------------------------------------------------------------------

# 67. Data Persistence QA

Test:

1.  Set a custom middle-three order.
2.  Refresh.
3.  Verify order.
4.  Close browser.
5.  Reopen.
6.  Verify order.
7.  Complete walk.
8.  Close app.
9.  Reopen.
10. Verify streak.

------------------------------------------------------------------------

# 68. Build Order --- 7 Day Plan

## Day 1 --- Foundation

### Deliver internally

-   Next.js project.
-   TypeScript.
-   PWA setup.
-   Basic routing.
-   Stage data.
-   Local storage abstraction.
-   Initial deployment.

### Goal

Have a live URL as early as possible.

------------------------------------------------------------------------

## Day 2 --- Core Walk

Build:

-   Home.
-   Walk screen.
-   stage progression.
-   fixed timers.
-   completion screen.

### Goal

Five-part walk works without polished audio.

------------------------------------------------------------------------

## Day 3 --- Audio

Build:

-   voice intro playback,
-   music playback,
-   stage transitions,
-   audio state management.

### Highest priority

Test on real iPhone immediately.

Do not wait until Day 7.

------------------------------------------------------------------------

## Day 4 --- Flow + Streak

Build:

-   middle-three reordering,
-   order persistence,
-   streak calculation,
-   completion persistence.

### Goal

All seven checklist requirements are technically present.

------------------------------------------------------------------------

## Day 5 --- Experience Polish

Improve:

-   voice → anchor → release,
-   stage transitions,
-   visual hierarchy,
-   minimal walk UI,
-   completion tone,
-   missed-day language.

### Goal

Make the app feel like Perfect Walk, not a generic timer.

------------------------------------------------------------------------

## Day 6 --- Real Walk + Reliability

Do an actual morning walk.

Test:

-   pocket use,
-   lock screen,
-   screen off,
-   headphones,
-   audio interruptions,
-   PWA,
-   offline behavior,
-   reopen,
-   streak persistence.

Fix only high-value issues.

------------------------------------------------------------------------

## Day 7 --- Delivery

Final:

-   bug fixes,
-   mobile polish,
-   deployment,
-   README,
-   VISION.md,
-   public repository,
-   3-minute demo video,
-   final real-device check.

Do not start new features.

------------------------------------------------------------------------

# 69. Definition of Done

A feature is done when:

-   it works on a real phone,
-   it does not break the walk,
-   it matches the product philosophy,
-   it does not require unnecessary screen interaction,
-   it does not create scope elsewhere,
-   and it has been tested.

A feature is **not** done merely because:

-   it compiles,
-   it works on desktop,
-   it looks good in Figma,
-   it works in a simulator.

------------------------------------------------------------------------

# 70. Delivery Package

The final delivery must contain:

## 1. Live URL

HTTPS public URL.

## 2. Public repository

Clean, runnable source code.

## 3. 3-minute demo video

Show the actual working product.

Recommended demo order:

``` text
0:00 — Home
0:20 — Explain concept
0:40 — Reorder middle stages
1:00 — Start walk
1:20 — Show audio/stage transition
1:50 — Show completion
2:10 — Show streak persistence
2:30 — Show PWA / mobile experience
2:45 — Explain product decision
3:00 — End
```

## 4. `VISION.md`

Maximum **300 words**.

Must explain:

-   what Perfect Walk means to you,
-   the core product philosophy,
-   one design decision you are proud of.

## 5. `README.md`

Must explain:

-   project overview,
-   how to install,
-   how to run locally,
-   how to build,
-   how to deploy,
-   PWA setup,
-   local storage approach,
-   audio approach,
-   why royalty-free audio is used,
-   known browser limitations,
-   what you would build next with another two weeks.

------------------------------------------------------------------------

# 71. README Technical Requirements

The README should contain:

``` text
# The Perfect Walk

## Overview

## Tech Stack

## Requirements

## Local Development

## Environment Variables

## Running the App

## Building for Production

## PWA

## Local Storage

## Audio

## Testing

## Deployment

## Known Limitations

## What I Would Build Next
```

### Environment variables

Prefer **none**.

If none are required, explicitly say:

``` text
No environment variables are required for the Stage 2 build.
```

------------------------------------------------------------------------

# 72. VISION.md Guidance

The core idea to communicate:

> The Perfect Walk is a guided experience designed to make itself less
> necessary over time.

Explain:

-   walking is the physical container,
-   the five stages create a sequence of states,
-   audio gives the mind an anchor,
-   once the user reaches the experience, the app gets out of the way.

The strongest design decision to highlight is likely:

> **The phone becomes a guide at the beginning and disappears into the
> pocket during the experience.**

------------------------------------------------------------------------

# 73. Recommended Commit Structure

Keep commits understandable.

Example:

``` text
feat: initialize PWA foundation
feat: add five stage data model
feat: build home screen
feat: build walk progression
feat: add stage audio
feat: add middle stage reordering
feat: persist walk order
feat: add streak persistence
fix: improve iPhone audio recovery
fix: handle invalid local state
style: polish mobile walk experience
docs: add README and VISION
```

Avoid one giant final commit.

------------------------------------------------------------------------

# 74. Git / Repository Hygiene

Repository should not contain:

-   secrets,
-   private credentials,
-   unnecessary large files,
-   unused packages,
-   debug logs,
-   abandoned experiments,
-   personal files.

Audio files are allowed only if their license permits redistribution.

------------------------------------------------------------------------

# 75. Scope Freeze

Once the following are working:

-   Home,
-   five stages,
-   reorder,
-   audio,
-   complete walk,
-   streak,
-   PWA,

**stop adding features.**

Use remaining time for:

-   iPhone audio reliability,
-   transition quality,
-   mobile layout,
-   accessibility,
-   bug fixing,
-   real-world testing,
-   documentation,
-   demo quality.

This is more valuable than adding features.

------------------------------------------------------------------------

# 76. Explicitly Out of Scope for Stage 2

The following must NOT be built unless Elliot explicitly changes scope:

### Accounts

-   [ ] Signup
-   [ ] Login
-   [ ] Profiles
-   [ ] Password reset
-   [ ] OAuth

### Backend

-   [ ] Database
-   [ ] API
-   [ ] Server-side state
-   [ ] Cloud streak sync

### Payments

-   [ ] Stripe
-   [ ] Subscription
-   [ ] Checkout
-   [ ] In-app purchases

### Fitness

-   [ ] GPS
-   [ ] Maps
-   [ ] Steps
-   [ ] Calories
-   [ ] Pace
-   [ ] Distance
-   [ ] Heart rate
-   \[HealthKit
-   [ ] Google Fit

### Social

-   [ ] Friends
-   [ ] Followers
-   [ ] Feed
-   [ ] Comments
-   [ ] Leaderboards
-   [ ] Public profiles

### AI

-   [ ] Chatbot
-   [ ] AI coach
-   [ ] AI meditation generation
-   [ ] AI mood analysis

### Music platform integration

-   [ ] Spotify authentication
-   [ ] Spotify SDK
-   [ ] Music library
-   [ ] User playlists

### Notifications

-   [ ] Push notifications
-   [ ] Morning reminders
-   [ ] Email reminders
-   [ ] SMS

### Gamification

-   [ ] Badges
-   [ ] Levels
-   \[XP
-   [ ] Leaderboards
-   [ ] Achievement system
-   [ ] Streak fireworks

### Content platform

-   [ ] CMS
-   [ ] User-generated practices
-   [ ] Content editor
-   [ ] Multiple programs

### Advanced personalization

-   [ ] Adaptive AI routines
-   [ ] Emotion selection
-   [ ] Mood tracking
-   [ ] Personalized stage generation

------------------------------------------------------------------------

# 77. Future Ideas --- Do Not Build Now

These are possible later features, not Stage 2 requirements.

## Practice depth

-   reduced guidance over time,
-   Day 1 vs Day 60 experiences,
-   optional advanced practice mode.

## Music

-   Spotify integration,
-   user-owned music,
-   playlists,
-   music preferences.

## Personalization

-   preferred stage durations,
-   custom stage order presets,
-   favorite anchor points.

## Habit

-   optional reminders,
-   calendar history,
-   weekly reflection.

## Social

-   sharing a completed walk,
-   private groups,
-   community challenges.

## Content

-   additional guided walks,
-   different voice styles,
-   seasonal practices.

These must wait until the core experience is proven.

------------------------------------------------------------------------

# 78. Product Risks

## Risk 1 --- Audio doesn't work when screen is locked

### Severity

Very high.

### Mitigation

Test on a real iPhone on Day 3.

------------------------------------------------------------------------

## Risk 2 --- App becomes too interactive

### Severity

Very high.

### Mitigation

Apply the pocket test after every UX change.

------------------------------------------------------------------------

## Risk 3 --- User has no emotional response

### Severity

High.

### Mitigation

Do not force emotion.

Use gentle anchors and allow experience to develop.

------------------------------------------------------------------------

## Risk 4 --- Streak becomes stressful

### Severity

Medium/high.

### Mitigation

Use welcoming language and no punitive UI.

------------------------------------------------------------------------

## Risk 5 --- Scope creep

### Severity

Very high.

### Mitigation

Follow this document and the out-of-scope list.

------------------------------------------------------------------------

## Risk 6 --- Audio copyright

### Severity

High.

### Mitigation

Use properly licensed royalty-free audio for Stage 2.

------------------------------------------------------------------------

## Risk 7 --- PWA works on desktop but fails on phone

### Severity

High.

### Mitigation

Deploy early and test on actual devices.

------------------------------------------------------------------------

# 79. Product Quality Bar

The product should feel:

### Before the walk

Simple.

``` text
Open
↓
Start
```

### During the walk

Invisible.

``` text
Voice
↓
Music
↓
Walking
↓
Feeling
```

### Between stages

Seamless.

### At the end

Celebratory.

### After the walk

Quietly satisfying.

Not:

-   addictive,
-   noisy,
-   gamified,
-   complicated,
-   data-heavy.

------------------------------------------------------------------------

# 80. The Five-Part Experience in One View

``` text
┌─────────────────────────────┐
│ 1. OPENING YOUR HEART       │
│    Love / gratitude         │
│    ↓                        │
│ 2/3/4. YOUR FLOW            │
│    Power                    │
│    Presence                 │
│    Connection               │
│    ↓                        │
│ 5. CELEBRATE                │
│    Energy / celebration    │
└─────────────────────────────┘
```

Part 1 is always first.

Part 5 is always last.

The middle three are flexible.

------------------------------------------------------------------------

# 81. Final Decision Log

These are the implementation decisions for this trial.

  Decision                  Stage 2 Choice
  ------------------------- ---------------------------------------------------------
  Platform                  PWA/web
  Framework                 Next.js
  Language                  TypeScript
  UI                        React
  Backend                   None
  Persistence               localStorage
  PWA                       Serwist or equivalent stable Next.js PWA implementation
  Audio                     Browser audio APIs
  Voice                     Prerecorded audio
  Music                     Royalty-free bundled audio
  Stage timing              Fixed
  Part 1                    7 minutes
  Parts 2--4                5 minutes each
  Part 5                    5 minutes
  Middle order              User-selectable
  First stage               Locked
  Last stage                Locked
  Streak                    Local calendar-day streak
  Auth                      None
  Payments                  None
  Analytics                 None
  GPS                       None
  Fitness tracking          None
  Social                    None
  AI                        None
  Notifications             None
  Demo                      \~3 minutes
  VISION.md                 ≤300 words
  README                    Required
  Real walk test            Required
  iPhone lock-screen test   Required

------------------------------------------------------------------------

# 82. Final Delivery Checklist

## Product

-   [ ] Product feels like a walking practice, not a generic app.
-   [ ] Five parts exist.
-   [ ] Correct names.
-   [ ] Part 1 fixed first.
-   [ ] Part 5 fixed last.
-   [ ] Middle three reorderable.
-   [ ] Audio exists for every part.
-   [ ] Walk completes automatically.
-   [ ] Completion state exists.
-   [ ] Streak persists.

## Experience

-   [ ] Start is fast.
-   [ ] Minimal reading.
-   [ ] Voice acts as anchor.
-   [ ] Voice gets out of the way.
-   [ ] Music carries the experience.
-   [ ] User can put phone away.
-   [ ] No forced emotion.
-   [ ] No punitive streak language.
-   [ ] Part 5 feels like a genuine closing ceremony.

## Technical

-   [ ] HTTPS.
-   [ ] Public URL.
-   [ ] PWA installable.
-   [ ] Service worker.
-   [ ] Local state persistence.
-   [ ] No backend.
-   [ ] No login.
-   [ ] No copyrighted music uploads.
-   [ ] Audio recovery works.
-   [ ] Real iPhone tested.
-   [ ] Locked-screen behavior tested.

## Delivery

-   [ ] Live URL.
-   [ ] Public repository.
-   [ ] 3-minute demo video.
-   [ ] `VISION.md` ≤300 words.
-   [ ] `README.md`.
-   [ ] Audio approach documented.
-   [ ] Known limitations documented.
-   [ ] Future work documented.
-   [ ] Final real-world walk completed.

------------------------------------------------------------------------

# 83. The One Sentence to Remember

> **The Perfect Walk is a guided experience designed to make itself less
> necessary over time: use the interface and voice to give the mind an
> anchor, then let the phone disappear and let the user experience the
> walk.**

------------------------------------------------------------------------

# 84. Final Scope Rule

If a proposed feature does not directly help the user:

1.  start the walk,
2.  enter the intended experience,
3.  keep walking without touching the phone,
4.  complete all five parts,
5.  and build a consistent daily practice,

**do not build it during the Stage 2 trial.**

The goal is not to build the biggest app.

The goal is to build the **smallest, most intentional version that makes
Elliot say: "Yes --- this understands Perfect Walk."**
