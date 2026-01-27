"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FileText,
  Package,
  DollarSign,
  Zap,
  CreditCard,
  Users,
  LogOut,
  UserIcon,
  UserRound,
} from "lucide-react";
import { useLogOut } from "@/hooks/useAuth";
import Image from "next/image";
import OnboardingPage from "./components/Onboarding";
import { useProfile } from "@/context/profile-context";

export default function DashboardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [onboarding, setOnboarding] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(true);
  const logOut = useLogOut();
  const { user, business } = useProfile();

  if (!onboarding) {
    return <OnboardingPage onComplete={() => setOnboarding(true)} />;
  }

  return (
    <SidebarProvider defaultOpen={mobileOpen}>
      <div className="flex h-screen w-full">
        {/* Sidebar */}
        <Sidebar className="py-2">
          <SidebarHeader className="mb-5 border-b px-2.5 pt-0">
            <div className="flex items-center gap-2">
              <span className="relative size-10 shrink-0 overflow-clip rounded-md">
                <Image alt="logo" src={"/icon.png"} fill sizes="100%" />
              </span>
              <span className="truncate text-lg font-bold">
                {business.name}
              </span>
            </div>
          </SidebarHeader>

          <SidebarContent className="px-2.5">
            <SidebarMenu>
              {navigationItems.map((item, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="mt-auto px-0">
            <SidebarMenu className="mt-4 border-t px-2.5 pt-4">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === "/dashboard/profile"}
                >
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-2"
                  >
                    <UserIcon />
                    <span>Profile</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="transition-300 flex cursor-pointer items-center gap-2 text-red-600 hover:bg-red-100 hover:text-red-500 active:bg-red-500"
                  onClick={async () => {
                    await logOut.mutateAsync();
                    router.push("/");
                  }}
                >
                  <LogOut />
                  <span>Log Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        {/* Main Content */}
        <SidebarInset className="overflow-clip">
          <div className="flex size-full flex-col">
            {/* Top Header */}
            <header className="bg-background/80 sticky top-0 z-20 flex items-center justify-between border-b px-5 py-2 backdrop-blur-sm">
              <h1 className="text-2xl font-bold">Welcome to {business.name}</h1>
              <span className="relative flex size-10 shrink-0 items-center justify-center overflow-clip rounded-full bg-white shadow-sm">
                {user.avatar ? (
                  <Image alt="user" src={user.avatar} fill sizes="100%" />
                ) : (
                  <UserRound className="size-5.5" />
                )}
              </span>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-auto p-5">{children}</main>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

const navigationItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Invoices", href: "/dashboard/invoices", icon: FileText },
  { label: "Inventory", href: "/dashboard/inventory", icon: Package },
  { label: "Tax", href: "/dashboard/tax", icon: DollarSign },
  { label: "AI Assistant", href: "/dashboard/ai", icon: Zap },
  { label: "Credit", href: "/dashboard/credit", icon: CreditCard },
  { label: "Team", href: "/dashboard/team", icon: Users },
  { label: "Customers", href: "/dashboard/customers", icon: FileText },
];
