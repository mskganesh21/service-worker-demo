# Offline Notes PWA

Offline-first notes demo app built with React + TypeScript + Vite.

## What this demo shows

- Notes CRUD with local persistence in IndexedDB.
- App shell available offline after first online visit.
- Online/offline status and server reachability indicator.
- Service worker lifecycle visibility.
- Update-available flow with user-triggered activation.

## Run locally

```bash
npm install
npm run dev
```

For service worker behavior, always test using production build + preview:

```bash
npm run build
npm run preview
```

## Phase 5 / offline verification

1. Start preview and open the app online once.
2. Add a note and confirm it appears on dashboard.
3. In DevTools, set network to `Offline`.
4. Refresh the page.
5. Confirm:
   - App shell still loads with styles.
   - Existing note is visible.
   - You can still add/edit/delete notes (IndexedDB-backed).

## Phase 6 / update-available verification

This proves the waiting service worker transition.

1. Start with `npm run build && npm run preview`.
2. Open app in browser and keep the tab open.
3. Make a visible code change (example: edit text in `src/components/Header.tsx`).
4. Run `npm run build` again and restart `npm run preview`.
5. Return to the same open tab and refresh once.
6. Confirm status panel now shows:
   - `SW: update available`
   - `Update: Available`
   - Update banner with `Refresh` button
7. Click `Refresh` in the banner.
8. Confirm:
   - Page reloads into the new version.
   - Status returns to offline-ready state.
   - Short `Update: Activated` chip appears.

## Notes

- Browser `Network` status comes from `navigator.onLine`.
- `Server` status is a reachability probe and can differ from `Network`.
