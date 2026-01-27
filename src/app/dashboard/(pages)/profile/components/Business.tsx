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

const Business = () => {
  const { business, profileDispatcher } = useProfile();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Update your business details and branding
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Business Name</label>
            <Input
              value={business.name}
              onChange={(e) =>
                profileDispatcher({
                  type: "UPDATE_BUSINESS",
                  payload: { field: "name", value: e.target.value },
                })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Business Address</label>
            <Input
              value={business.address}
              onChange={(e) =>
                profileDispatcher({
                  type: "UPDATE_BUSINESS",
                  payload: { field: "address", value: e.target.value },
                })
              }
              required
            />
          </div>

          <main className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="business_email" className="text-sm font-medium">
                Business Email
              </label>
              <Input
                id="business_email"
                value={business.email}
                onChange={(e) =>
                  profileDispatcher({
                    type: "UPDATE_BUSINESS",
                    payload: { field: "email", value: e.target.value },
                  })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="business_number" className="text-sm font-medium">
                Business Number
              </label>
              <Input
                id="business_number"
                value={business.phone}
                onChange={(e) =>
                  profileDispatcher({
                    type: "UPDATE_BUSINESS",
                    payload: { field: "phone", value: e.target.value },
                  })
                }
                required
              />
            </div>
          </main>

          <main className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Industry</label>
              <Input
                value={business.industry}
                onChange={(e) =>
                  profileDispatcher({
                    type: "UPDATE_BUSINESS",
                    payload: { field: "industry", value: e.target.value },
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Currency</label>
              <Input
                value={business.currency}
                onChange={(e) =>
                  profileDispatcher({
                    type: "UPDATE_BUSINESS",
                    payload: { field: "currency", value: e.target.value },
                  })
                }
                required
              />
            </div>
          </main>
          <div className="space-y-2">
            <label className="text-sm font-medium">Tax ID</label>
            <Input
              value={business.taxId}
              onChange={(e) =>
                profileDispatcher({
                  type: "UPDATE_BUSINESS",
                  payload: { field: "taxId", value: e.target.value },
                })
              }
              required
            />
          </div>
          <Button className="gap-2">
            <Save className="size-4" />
            Save Business Info
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Branding</CardTitle>
          <CardDescription>
            Upload your business logo and banner
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <main className="mb-6 flex flex-col gap-x-10 gap-y-4 sm:flex-row">
            {/* Business Logo */}
            <div className="shrink-0 space-y-2">
              <label htmlFor="business_logo" className="text-sm font-medium">
                Business Logo
              </label>

              <div className="bg-background border-border fle relative size-40 shrink-0 items-center justify-center overflow-clip rounded-xl border">
                {business.logo ? (
                  <Image alt="logo" src={business.logo} fill sizes="100%" />
                ) : (
                  <EmptyState
                    className="px-4! md:py-10"
                    title=""
                    description="Upload your Business logo"
                  />
                )}

                <input
                  className="absolute inset-0 z-1 cursor-pointer opacity-0"
                  type="file"
                  id="business_logo"
                  multiple={false}
                />

                <span
                  className={cn(
                    "absolute bottom-1 left-1/2 -translate-x-1/2 rounded-lg border border-black/15 bg-white/8 px-2 py-1 text-black backdrop-blur-md",
                    { "border-white/5 text-white": business.logo },
                  )}
                >
                  <UploadIcon className="size-4.5" />
                </span>
              </div>
            </div>

            {/* Business Banner */}
            <div className="flex-1 space-y-2">
              <label htmlFor="business_banner" className="text-sm font-medium">
                Business Banner
              </label>

              <div className="bg-background border-border relative aspect-4/1 max-h-40 w-auto shrink-0 overflow-clip rounded-xl border">
                {business.banner ? (
                  <Image alt="logo" src={business.banner} fill sizes="100%" />
                ) : (
                  <EmptyState
                    title="Banner Image"
                    className="px-4! md:py-10"
                    description="Upload your Business banner"
                  />
                )}

                <input
                  className="absolute inset-0 z-1 cursor-pointer opacity-0"
                  type="file"
                  id="business_banner"
                  multiple={false}
                />

                <span
                  className={cn(
                    "absolute bottom-1 left-1/2 -translate-x-1/2 rounded-lg border border-black/15 bg-white/8 px-2 py-1 text-black backdrop-blur-md",
                    { "border-white/5 text-white": business.banner },
                  )}
                >
                  <UploadIcon className="size-4.5" />
                </span>
              </div>
            </div>
          </main>

          <Button className="gap-2">
            <Save className="size-4" />
            Upload Files
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default Business;
