"use client";

import { Button } from "@/components/ui/button";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogIn } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

const Login = () => {
  const { mutateAsync, isPending, error } = useLogIn();
  const router = useRouter();
  const [form, setForm] = useState({
    email: "test@mail.com",
    password: "testuser",
  });

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <>
      <div className="space-y-2">
        <CardTitle className="text-2xl">Welcome back</CardTitle>
        <CardDescription>Sign in to continue to LedgerFlow</CardDescription>
      </div>

      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          console.log("Form", form);
          const data = await mutateAsync(form);

          if (error) {
            console.log("Login Error", error);
            toast.error(error.message);
            return;
          }

          console.log("Login Data", data);
          toast.success("Welcom back");
          router.replace("/dashboard");
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={handleForm}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleForm}
            required
          />
        </div>

        <Button className="w-full" size="lg" type="submit" loading={isPending}>
          Log In
        </Button>

        <div className="text-right">
          <Link
            href="/auth/forgot-password"
            className="text-primary text-sm hover:underline"
          >
            Forgot password?
          </Link>
        </div>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="border-border w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card text-muted-foreground px-2">or</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full bg-transparent"
        size="lg"
        disabled={true}
      >
        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
          <text x="0" y="20" fontSize="20" fill="currentColor">
            G
          </text>
        </svg>
        Continue with Google
      </Button>

      <p className="text-muted-foreground text-center text-xs">
        Secure login. Your data is protected.
      </p>
    </>
  );
};

export default Login;
