"use client";

import { GENDER } from "@/api/auth";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSignUp } from "@/hooks/useAuth";
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

const genders: GENDER[] = ["male", "female", "others"];

const Signup = () => {
  const router = useRouter();
  const { mutateAsync, isPending } = useSignUp();

  const [form, setForm] = useState({
    email: "",
    full_name: "",
    password: "",
    confirm_password: "",
    dob: new Date(),
    gender: genders[0],
  });

  const [activeState, setActiveState] = useState({
    dob: false,
    gender: false,
  });

  const handleActiveState = (state: "dob" | "gender", value?: boolean) => {
    setActiveState((prev) => ({ ...prev, [state]: value ?? !prev[state] }));
  };

  const handleForm = (e: ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  return (
    <>
      <div className="space-y-2">
        <CardTitle className="text-2xl">
          Create your LedgerFlow account
        </CardTitle>
        <CardDescription>
          Start managing your business in minutes
        </CardDescription>
      </div>

      <form
        className="space-y-5"
        onSubmit={async (e) => {
          e.preventDefault();
          if (form.password !== form.confirm_password) {
            toast.warning("Password mismatch");
            return;
          }

          await mutateAsync(form);
          router.replace("/dashboard");
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="full-name">Full name</Label>
          <Input
            id="full_name"
            type="text"
            placeholder="John Doe"
            value={form.full_name}
            onChange={handleForm}
            required
          />
        </div>

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

        <div className="grid grid-cols-2 gap-3">
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

          <div className="space-y-2">
            <Label htmlFor="confirm_password">Confirm password</Label>
            <Input
              id="confirm_password"
              type="password"
              placeholder="••••••••"
              value={form.confirm_password}
              onChange={handleForm}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Gender</Label>
            <Select
              name="gender"
              value={form.gender}
              onValueChange={(value) =>
                setForm((prev) => ({ ...prev, gender: value as GENDER }))
              }
            >
              <SelectTrigger className="w-full capitalize">
                <SelectValue placeholder="Select your Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Gender</SelectLabel>
                  {genders.map((item, index) => (
                    <SelectItem key={index} value={item} className="capitalize">
                      {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* DOB */}
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Popover
              open={activeState.dob}
              onOpenChange={(value) => handleActiveState("dob", value)}
            >
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full justify-between font-normal"
                >
                  {form.dob ? form.dob.toLocaleDateString() : "Select date"}
                  <ChevronDownIcon />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <Calendar
                  mode="single"
                  selected={form.dob}
                  captionLayout="dropdown"
                  onSelect={(date) => {
                    setForm((prev) => ({ ...prev, dob: date! }));
                    handleActiveState("dob", false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button className="w-full" size="lg" loading={isPending} type="submit">
          Create Account
        </Button>
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
        Sign up with Google
      </Button>

      <div className="text-muted-foreground space-y-1 text-center text-xs">
        <p>Get 5 free credits every month</p>
        <p>No credit card required</p>
      </div>
    </>
  );
};

export default Signup;
