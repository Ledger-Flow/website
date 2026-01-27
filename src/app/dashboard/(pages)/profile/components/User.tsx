"use client";

import EmptyState from "@/components/shared/EmptyState";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useProfile } from "@/context/profile-context";
import { cn } from "@/lib/utils";
import { Save, UploadIcon } from "lucide-react";
import Image from "next/image";

const User = () => {
  const { user, profileDispatcher } = useProfile();

  const updateNumber = (value: string) => {
    if (typeof value === "string") {
      profileDispatcher({
        type: "UPDATE_USER",
        payload: { field: "phone", value: "" },
      });
      return;
    }

    if (!isNaN(Number(value))) {
      const cleanValue = Number.parseInt(value);
      profileDispatcher({
        type: "UPDATE_USER",
        payload: { field: "phone", value: cleanValue.toString() },
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="px-5">
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your personal details</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-x-10 gap-y-4 sm:flex-row">
          {/* Profile Picture */}
          <div className="border-border bg-background relative size-40 shrink-0 overflow-clip rounded-xl border">
            {user.avatar ? (
              <Image alt="logo" src={"/user.png"} fill sizes="100%" />
            ) : (
              <EmptyState
                className="px-4! md:py-10"
                title=""
                description="Upload your profile picture"
              />
            )}

            <input
              className="absolute inset-0 z-1 cursor-pointer opacity-0"
              type="file"
              multiple={false}
            />

            <span
              className={cn(
                "absolute bottom-1 left-1/2 -translate-x-1/2 rounded-lg border border-black/15 bg-white/8 px-2 py-1 text-black backdrop-blur-md",
                { "border-white/5 text-white": user.avatar },
              )}
            >
              <UploadIcon className="size-4.5" />
            </span>
          </div>

          <form
            className="flex-1 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                value={user.fullName}
                onChange={(e) =>
                  profileDispatcher({
                    type: "UPDATE_USER",
                    payload: { field: "fullName", value: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                value={user.email}
                onChange={(e) =>
                  profileDispatcher({
                    type: "UPDATE_USER",
                    payload: { field: "email", value: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={user.phone}
                onChange={(e) => updateNumber(e.target.value)}
                required
              />
            </div>

            <Button className="gap-2" type="submit">
              <Save className="size-4" />
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            Update your password regularly for security
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="space-y-2">
              <label className="text-sm font-medium">Current Password</label>
              <Input type="password" required />
            </div>

            <main className="grid grid-cols-2 gap-4 sm:gap-8">
              <div className="space-y-2">
                <label className="text-sm font-medium">New Password</label>
                <Input type="password" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Confirm Password</label>
                <Input type="password" required />
              </div>
            </main>

            <Button className="gap-2" type="submit">
              <Save className="size-4" />
              Update Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default User;
