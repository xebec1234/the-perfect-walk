# The Perfect Walk

A five-part morning walking practice built as an installable PWA.

## Live App

https://the-perfect-walk.vercel.app/

## Features

- Five-part walking practice
- Parts 1 and 5 fixed
- Middle three reorderable
- Audio-guided stages
- Progressive guidance: Discover → Remember → Trust → Embody
- Local daily streak
- Installable PWA
- Works without an account or backend
- Designed for phone-in-pocket use

## How to Run

### Requirements

- Node.js
- npm

### Install

npm install

### Development

npm run dev

Then open the local development URL.

### Production Build

npm run build
npm start

## Audio Approach

The app uses original procedural instrumental placeholder music bundled with the project.

No Spotify tracks are uploaded or redistributed.

The music files can be replaced later with music supplied or licensed for the final product.

Voice guidance is provided as local audio assets.

## Data & Privacy

There is no backend, account system, or analytics dashboard.

Walk completion and streak information are stored locally on the user's device.

## Design Direction

The central design principle is progressive independence.

The app begins with more guidance and gradually becomes quieter as the practice becomes familiar:

- Discover — 0–6 completed walks
- Remember — 7–29
- Trust — 30–59
- Embody — 60+

Users can request additional guidance when they need it.

## What I'd Build Next With Two More Weeks

1. More deliberate audio/content iteration based on real walks.
2. Deeper testing across iOS and Android devices, especially background audio and PWA lifecycle behaviour.
3. Refinement of the progressive-guidance experience based on actual repeated use.
4. Better onboarding around installing the PWA and beginning the first walk.
5. Further refinement of the music/voice transitions and accessibility.

## Scope

Intentionally no:

- Accounts
- Payments
- Social features
- Native apps
- Backend
- Analytics dashboard
- AI chatbot