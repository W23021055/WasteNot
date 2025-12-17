const state = { fails: 0, lockedUntil: 0 };
export const LOCKOUT_THRESHOLD = 5;
export const LOCKOUT_MS = 5 * 60 * 1000;

// locks user out 
export function isLocked(now = Date.now()) {
  return state.lockedUntil > now;
}

// Checks how many fails
export function registerFailure(now = Date.now()) {
  state.fails += 1;
  if (state.fails >= LOCKOUT_THRESHOLD) {
    state.lockedUntil = now + LOCKOUT_MS;
    state.fails = 0;
    // console.log('lockout triggered');
  }
}
//sets fail count to 0 on success
export function registerSuccess() {
  state.fails = 0;
  state.lockedUntil = 0;
}

// Sets locked info
export function lockInfo(now = Date.now()) {
  return { locked: isLocked(now), unlockAt: state.lockedUntil };
}
