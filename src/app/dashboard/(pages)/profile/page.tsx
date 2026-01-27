"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import User from "./components/User";
import Business from "./components/Business";
import { useProfile } from "@/context/profile-context";
import { ProfileSkeleton } from "@/components/shared/DashboardSkeleton";

export default function ProfilePage() {
  const { fetchingProfile } = useProfile();

  if (fetchingProfile) return <ProfileSkeleton />;

  return (
    <section className="space-y-6">
      {/* Header */}
      <main>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account and business information
        </p>
      </main>

      {/* Tabs */}
      <Tabs defaultValue="user" className="w-full">
        <TabsList className="mb-6 grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="user">User Profile</TabsTrigger>
          <TabsTrigger value="business">Business Settings</TabsTrigger>
        </TabsList>

        {/* User Profile Tab */}
        <TabsContent value="user" className="space-y-4">
          <User />
        </TabsContent>

        {/* Business Settings Tab */}
        <TabsContent value="business" className="mt-6 space-y-4">
          <Business />
        </TabsContent>
      </Tabs>
    </section>
  );
}
