"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/schema";
import { useSetAtom } from "jotai";
import { syncAuthCookieAtom } from "@/atoms/authAtoms";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function LoginForm() {
  const setAuth = useSetAtom(syncAuthCookieAtom);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    if (data.username === "admin" && data.password === "admin12345") {
      setAuth(true);
      router.push("/");
      toast.success("Welcome to Country Explorer!");
    } else {
      setError("username", { message: "Invalid credentials" });
      setError("password", { message: "Invalid credentials" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
      <div className="grid gap-3">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          {...register("username")}
          placeholder="admin"
          className="w-full p-2 border rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      <div className="grid gap-3">
        <Label htmlFor="password">Password</Label>
        <Input
          autoComplete="off"
          id="password"
          type="password"
          {...register("password")}
          placeholder="admin12345"
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full cursor-pointer py-2">
        Login
      </Button>
    </form>
  );
}
