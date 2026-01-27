"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfile } from "@/context/profile-context";
import Image from "next/image";
import { cn } from "@/lib/utils";

const BUSINESS_TYPES = [
  "Retail",
  "Wholesale",
  "Services",
  "Manufacturing",
  "Other",
];

export default function OnboardingPage({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { business, profileDispatcher } = useProfile();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    setIsLoading(true);
    setStep(2);

    setTimeout(() => {
      setIsLoading(false);
      onComplete();
    }, 1000);
  };

  return (
    <section className="px-4 py-8">
      <Card className="mx-auto w-full max-w-2xl">
        <CardHeader className="text-center">
          <span className="relative mx-auto mt-2 mb-1 block size-20 overflow-clip">
            <Image alt="LedgerFlow" src={"/icon.png"} fill sizes="100%" />
          </span>
          <CardTitle className="text-2xl">Set up your business</CardTitle>
          <CardDescription>
            Tell us about your business to personalize LedgerFlow for you
          </CardDescription>
        </CardHeader>

        {/* Progress Indicator */}
        <div className="mx-auto -mt-2 mb-2 flex w-full max-w-md items-center justify-between px-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div className="text-center" key={index}>
              <span
                className={cn(
                  "bg-muted text-muted-foreground border-muted mx-auto flex size-11 items-center justify-center rounded-full border-2 text-lg font-semibold shadow-sm",
                  {
                    "bg-primary text-primary-foreground": index + 1 <= step,
                  },
                )}
              >
                {index + 1}
              </span>
              <span className="text-xs font-medium">
                {index + 1 === 1 ? "Business Setup" : "Complete"}
              </span>
            </div>
          ))}
        </div>

        <CardContent>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="business_name">Business name</Label>
              <Input
                id="business_name"
                placeholder="e.g. John's Electronics Store"
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

            <main className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business_type">Business type</Label>
                <Select
                  value={business.businessType}
                  onValueChange={(value) =>
                    profileDispatcher({
                      type: "UPDATE_BUSINESS",
                      payload: { field: "businessType", value: value },
                    })
                  }
                >
                  <SelectTrigger id="business_type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry (optional)</Label>
                <Input
                  id="industry"
                  placeholder="e.g. Electronics"
                  value={business.industry}
                  onChange={(e) =>
                    profileDispatcher({
                      type: "UPDATE_BUSINESS",
                      payload: { field: "industry", value: e.target.value },
                    })
                  }
                />
              </div>
            </main>

            <div className="space-y-2">
              <Label htmlFor="business_address">Business address</Label>
              <Input
                id="business_address"
                placeholder="e.g. 123 Main Street"
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

            {/* <main className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Select>
                  <SelectTrigger id="country">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Nigeria">Nigeria</SelectItem>
                    <SelectItem value="Ghana">Ghana</SelectItem>
                    <SelectItem value="Kenya">Kenya</SelectItem>
                    <SelectItem value="South Africa">South Africa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State / Region</Label>
                <Input
                  id="state"
                  placeholder="e.g. Lagos"
                  required
                />
              </div>
            </main> */}

            <main className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select
                  value={business.currency}
                  onValueChange={(value) =>
                    profileDispatcher({
                      type: "UPDATE_BUSINESS",
                      payload: { field: "currency", value: value },
                    })
                  }
                >
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="NGN">NGN ₦</SelectItem>
                    <SelectItem value="GHS">GHS ₵</SelectItem>
                    <SelectItem value="KES">KES KSh</SelectItem>
                    <SelectItem value="ZAR">ZAR R</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax_id">Tax ID (optional)</Label>
                <Input
                  id="tax_id"
                  placeholder="e.g. 12-3456789"
                  value={business.taxId}
                  onChange={(e) =>
                    profileDispatcher({
                      type: "UPDATE_BUSINESS",
                      payload: { field: "taxId", value: e.target.value },
                    })
                  }
                />
              </div>
            </main>

            <div className="space-y-2">
              <Label htmlFor="employees">Number of employees (optional)</Label>
              <Input id="employees" type="number" placeholder="e.g. 5" />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                className="flex-1"
                size="lg"
                type="submit"
                disabled={
                  isLoading ||
                  !business.name ||
                  !business.businessType ||
                  !business.address ||
                  !business.currency
                }
              >
                {isLoading ? "Continuing..." : "Continue to Dashboard"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
