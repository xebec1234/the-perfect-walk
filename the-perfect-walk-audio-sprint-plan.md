

# The Perfect Walk PWA - Sprint Plan

## Sprint Goal

Complete the guided walk audio experience so that each walk follows the intended sequence:

1. Start a walk
2. Play the selected guide audio first
3. Animate the core image/logo while the guide is speaking
4. Allow the user to skip the guide
5. Start the music
6. Continue through the current part
7. Move to the next part
8. Complete the walk

The guide audio should also follow the user's progression stage:

- Days 0-1: Discover
- Days 2-7: Remember
- Days 8-30: Trust
- Day 31+: Embody

## Sprint 1: Audio Architecture and Playback Foundation

- Difficulty: Hard
- Priority: P0

### Tasks

- Define the audio states:
  - Idle
  - Playing guide
  - Guide finished
  - Playing music
  - Paused
  - Skipped
- Create a centralized audio controller or service.
- Ensure only one audio source plays at a time.
- Add controls for:
  - Play
  - Pause
  - Resume
  - Stop
  - Skip guide
  - Move to next part
- Track:
  - Current part
  - Current progression stage
  - Current guide audio
  - Current music
  - Current playback state
- Establish the required sequence:
  - Part starts
  - Guide audio plays
  - Guide finishes
  - Music starts
  - Part continues until its duration ends
  - Next part begins

## Sprint 2: Generate Guided Audio

- Difficulty: Medium
- Priority: P0

### Tasks

- Create guide audio for each of the five walk parts.
- Create progression-specific versions for:
  - Discover
  - Remember
  - Trust
  - Embody
- Keep the progression consistent with the current implementation:
  - Discover should provide the most guidance.
  - Remember should provide less direct instruction.
  - Trust should become more concise and supportive.
  - Embody should provide minimal guidance.
- Organize the audio files using a predictable naming structure.
- Prepare the audio files so they can be connected to the appropriate part and progression stage.

### Audio Structure

The application should be able to determine:

- Current part
- User progression stage
- Matching guide audio
- Matching music
- Whether the guide has been skipped

## Sprint 3: Guide-to-Music Transition

- Difficulty: Medium
- Priority: P0

### Tasks

- Make guide audio play before music.
- Do not play the music underneath the guide.
- Automatically start music when the guide finishes.
- Keep music playing for the remainder of the current part.
- When the current part finishes, stop or transition the current music and move to the next part.
- Make sure the transition works without requiring the user to manually press another button.

### Expected Flow

Guide audio -> Guide finishes -> Music starts -> Part continues -> Next part

## Sprint 4: Core Image or Logo Talking Animation

- Difficulty: Medium
- Priority: P0

### Tasks

- Animate the core image/logo in the middle of the walk screen while guide audio is playing.
- Make the animation feel like the image/logo is the one speaking.
- Start the animation when guide audio starts.
- Stop the animation when guide audio finishes or is skipped.
- Keep the animation subtle enough that it does not distract from the walk.
- First implementation can use the audio playback state rather than real audio amplitude.

### Possible Animation Behavior

- Gentle scale or pulse
- Slight movement
- Subtle visual emphasis while speaking
- Return to the normal state when the guide ends

A true audio-amplitude or waveform-reactive animation can be considered later if needed.

## Sprint 5: Skip Guide and Start Music

- Difficulty: Easy
- Priority: P0

### Tasks

- Add a visible "Skip Guide" or "Skip Guide and Start Music" control while guide audio is playing.
- Stop the guide immediately when skipped.
- Start the music immediately after skipping.
- Keep the user in the current part.
- Do not skip the entire walk part.
- Stop the talking animation when the guide is skipped.
- Make sure the same behavior works consistently for every part and progression stage.

### Expected Flow

User selects skip -> Guide stops -> Talking animation stops -> Music starts -> Current part continues

## Sprint 6: Add Preferred Durations for Parts 2-4

- Difficulty: Easy
- Priority: P1

### Tasks

- Add preferred duration settings for:
  - Feeling Your Power
  - Letting Go & Total Presence
  - Connecting with Higher Power
- Keep Part 1 as a 5-10 minute section based on the guide.
- Keep Part 5 as the final celebration section.
- Allow Parts 2-4 to remain reorderable.
- Make sure the selected duration is respected during the walk.

### Note

The provided guide specifically gives a 5-10 minute duration for Opening Your Heart. It does not provide fixed durations for Parts 2-4, so these durations should be treated as application settings rather than source-defined requirements.

## Sprint 7: Optional Guide Setting

- Difficulty: Easy
- Priority: P1

### Tasks

- Add an option that allows the user to choose whether guide audio is enabled.
- If guide audio is enabled:
  - Guide plays first.
  - Music starts after the guide.
- If guide audio is disabled:
  - Skip directly to music.
- Preserve the progression system even when the guide is enabled.
- Make the setting easy to change before starting a walk.

### Recommended Behavior

The skip button should remain available even when guide audio is enabled. This gives the user control without requiring a separate configuration change.

## Sprint 8: Full Walk Audio Integration Testing

- Difficulty: Hard
- Priority: P0

### Test Scenarios

- Start a normal walk.
- Confirm the guide starts before music.
- Confirm the core image/logo animates while the guide is playing.
- Confirm the animation stops when the guide ends.
- Confirm music starts automatically after the guide.
- Confirm the skip button immediately stops the guide and starts music.
- Confirm skipping does not skip the current part.
- Confirm the correct guide is selected for each progression stage.
- Test:
  - Discover
  - Remember
  - Trust
  - Embody
- Pause and resume during guide playback.
- Pause and resume during music playback.
- Test transitions between all five parts.
- Confirm Part 1 remains first.
- Confirm Part 5 remains last.
- Confirm Parts 2-4 still follow the selected order.
- Test the walk through to completion.

## Suggested Sprint Order

1. Audio Architecture and Playback Foundation
2. Generate Guided Audio
3. Guide-to-Music Transition
4. Core Image or Logo Talking Animation
5. Skip Guide and Start Music
6. Add Preferred Durations for Parts 2-4
7. Optional Guide Setting
8. Full Walk Audio Integration Testing

## Definition of Done

The audio experience is considered complete when:

- Every walk part can play guide audio.
- The correct guide is selected according to the user's progression stage.
- Guide audio always plays before music when guidance is enabled.
- Music starts automatically after the guide finishes.
- The user can skip the guide and immediately start music.
- The core image/logo visually reacts while the guide is speaking.
- The audio state remains consistent when pausing and resuming.
- The walk correctly transitions from one part to the next.
- The five-part structure is preserved:
  - Part 1 is always first.
  - Part 5 is always last.
  - Parts 2-4 can be reordered.
- The full walk can be completed without audio or state-management errors.
"""

path = Path("/mnt/data/the-perfect-walk-pwa-sprint-plan.md")
path.write_text(content, encoding="utf-8")
print(path)
