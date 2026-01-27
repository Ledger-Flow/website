"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCustomer } from "@/context/customer-context";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const AddNewCustomer = ({ close }: { close: () => void }) => {
  const { customerDispatcher } = useCustomer();
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "" as string | number,
  });

  const handleChange = (field: keyof typeof state, value: string) => {
    if (field === "phone") {
      if (value === "") {
        setState((prev) => ({ ...prev, [field]: "" }));
        return;
      }
      const newValue = Number.parseInt(value);
      if (!isNaN(newValue) && newValue >= 0) {
        setState((prev) => ({ ...prev, [field]: newValue }));
        return;
      }
    }
    setState((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <button
          className="text-muted-foreground transition-300 hover:bg-background mb-2 w-fit cursor-pointer rounded-md border border-transparent p-1.5 hover:border-black/5 hover:shadow-sm [&_svg]:size-5"
          onClick={() => close()}
        >
          <XIcon />
        </button>
        <CardTitle>Add New Customer</CardTitle>
        <CardDescription>
          Add a new customer to your account and start managing their
          transactions
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            customerDispatcher({
              type: "ADD_NEW_CUSTOMER",
              payload: state,
            });
            toast.success("Customer added successfully");
            setState({ email: "", name: "", phone: "" });
          }}
          className="space-y-4"
        >
          <main className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Customer Name</Label>
              <Input
                id="name"
                value={state.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Customer Number</Label>
              <Input
                className="hide-input-number-spinner"
                id="phone"
                value={state.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                placeholder="+234"
                type="number"
                inputMode="tel"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Customer Email</Label>
              <Input
                id="email"
                value={state.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="john@doe.com"
                required
              />
            </div>
          </main>

          <Button
            type="submit"
            disabled={!state.name || !state.email || !state.phone}
          >
            Add Customer
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddNewCustomer;
