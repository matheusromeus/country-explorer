"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/lib/schema";
import { useSetAtom } from "jotai";
import { syncAuthCookieAtom } from "@/atoms/authAtoms";
import { useRouter } from "next/navigation";

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
    } else {
      setError("username", { message: "Invalid credentials" });
      setError("password", { message: "Invalid credentials" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-sm mx-auto p-4"
    >
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          {...register("username")}
          className="w-full p-2 border rounded"
        />
        {errors.username && (
          <p className="text-red-500 text-sm">{errors.username.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password")}
          className="w-full p-2 border rounded"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        Login
      </button>
    </form>
  );
}
