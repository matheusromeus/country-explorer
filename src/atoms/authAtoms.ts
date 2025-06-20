import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const cookieKey = "auth";

export const isAuthenticatedAtom = atomWithStorage<boolean>(cookieKey, false);

// sync cookie on login/logout
// derived atom
export const syncAuthCookieAtom = atom(
  null,
  async (get, set, value: boolean) => {
    set(isAuthenticatedAtom, value);

    if (!value) {
      try {
        await fetch("/api/auth/logout", { method: "POST" });
      } catch (error) {
        console.error("Logout error:", error);
      }
    }
  }
);
