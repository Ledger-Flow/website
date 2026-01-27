"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";
import { creditHistory } from "@/data/dashbord";

export default function CreditPage() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <main>
        <h1 className="text-3xl font-bold tracking-tight">Credits</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account credits and usage
        </p>
      </main>

      {/* Credit Overview */}
      <main className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Current Balance */}
        <Card className="md:col-span-2">
          <CardHeader className="px-5">
            <CardTitle>Current Credit Balance</CardTitle>
            <CardDescription>Track your available credits</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 px-5">
            <div className="text-center">
              <div className="text-primary mb-2 text-5xl font-bold">4</div>
              <p className="text-muted-foreground">
                Credits remaining this month
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Monthly Usage</span>
                <span className="text-muted-foreground text-sm">
                  1 of 5 used
                </span>
              </div>
              <Progress value={20} className="h-2" />
            </div>
            <Button className="w-full gap-2">
              <Zap className="size-4" />
              Buy More Credits
            </Button>
          </CardContent>
        </Card>

        {/* Credit Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Credit Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {creditSummary.map((item, index) => (
              <div key={index}>
                <p className="text-muted-foreground text-sm">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>

      {/* Credit History */}
      <Card>
        <CardHeader className="px-5">
          <CardTitle>Credit Usage History</CardTitle>
          <CardDescription>Track all your credit transactions</CardDescription>
        </CardHeader>
        <CardContent className="px-5">
          <ul className="space-y-3">
            {creditHistory.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b py-3 last:border-0"
              >
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-muted-foreground text-sm">
                    {new Date(item.date).toDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold ${item.creditsUsed > 0 ? "text-red-600" : "text-green-600"}`}
                  >
                    {item.creditsUsed > 0 ? "-" : "+"}
                    {Math.abs(item.creditsUsed)}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    Balance: {item.balance}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}

const creditSummary = [
  { label: "Free Monthly Credits", value: "5" },
  { label: "Paid Credits", value: "0" },
  { label: "Used This Month", value: "1" },
];
