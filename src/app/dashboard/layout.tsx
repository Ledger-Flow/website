import { Metadata } from "next";
import DashboardProvider from "./DashboardProvider";
import TeamProvider from "@/context/team-context";
import ProfileProvider from "@/context/profile-context";
import InvoiceProvider from "@/context/inovoice-context";
import CustomerProvider from "@/context/customer-context";
import InventoryProvider from "@/context/inventory-context";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Dashboard - LedgerFlow",
  description: "Manage your finances with LedgerFlow dashboard.",
};

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <TeamProvider>
      <ProfileProvider>
        <InvoiceProvider>
          <CustomerProvider>
            <InventoryProvider>
              <DashboardProvider>{children}</DashboardProvider>
            </InventoryProvider>
          </CustomerProvider>
        </InvoiceProvider>
      </ProfileProvider>
    </TeamProvider>
  );
};

export default DashboardLayout;
