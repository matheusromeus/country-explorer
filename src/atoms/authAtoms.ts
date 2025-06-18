import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const cookieKey = "auth";

export const isAuthenticatedAtom = atomWithStorage<boolean>(cookieKey, false);

// sync cookie on login/logout
export const syncAuthCookieAtom = atom(null, (get, set, value: boolean) => {
  set(isAuthenticatedAtom, value);
  if (typeof window !== "undefined") {
    document.cookie = `${cookieKey}=${value}; path=/`;
  }
});
