"use client";

import { Button } from "@/components/ui/button";
import { useAtomValue, useSetAtom } from "jotai";
import { isAuthenticatedAtom, syncAuthCookieAtom } from "@/atoms/authAtoms";
import Link from "next/link";

const LogoutButton = () => {
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const setAuth = useSetAtom(syncAuthCookieAtom);

  return (
    <div>
      {isAuthenticated ? (
        <Button onClick={() => setAuth(false)} className="cursor-pointer">
          Logout
        </Button>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
};

export default LogoutButton;
