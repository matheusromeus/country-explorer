"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import LoginForm from "@/components/login/login-form";
import { toast } from "sonner";

const Page = () => {
  return (
    <div className="grid min-h-svh lg:grid-cols-3">
      <div className="flex flex-col gap-4 p-6 md:p-10 lg:col-span-1">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="flex text-xl items-center justify-center rounded-md">
              🌍
            </div>
            <span className="text-xl font-black">Country Explorer</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            {/* <LoginForm />
             */}
            <div className={cn("flex flex-col gap-6")}>
              <Card>
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">Welcome back</CardTitle>
                  <CardDescription>Where in the world are you?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <div className="grid gap-6">
                      <div className="flex flex-col gap-4">
                        <Button
                          variant="outline"
                          className="w-full cursor-pointer"
                          onClick={() => {
                            toast.error("Sorry, this feature is coming soon!");
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                              fill="currentColor"
                            />
                          </svg>
                          Login with Google
                        </Button>
                      </div>
                      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-card text-muted-foreground relative z-10 px-2">
                          Or continue with
                        </span>
                      </div>
                      <LoginForm />
                      <div className="text-center text-sm">
                        Forgot password?{" "}
                        <Link
                          target="_blank"
                          href="https://github.com/matheusromeus/country-explorer/blob/main/README.md"
                          className="underline underline-offset-4 cursor-pointer"
                        >
                          Check Readme
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block lg:col-span-2">
        <video
          src="/assets/videos/login.mp4"
          autoPlay
          preload="metadata"
          muted
          loop
          width={100}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Page;
