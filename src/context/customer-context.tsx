"use client";

import { mockCustomers } from "@/constant/customer";
import { useToggle } from "@/hooks/useToggle";
import { Customer } from "@/types/customer";
import { InvoiceData } from "@/types/invoice";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

const Context = createContext<
  | {
      customers: Customer[];
      customerDispatcher: (action: Action) => void;
      fetchingCustomers: boolean;
    }
  | undefined
>(undefined);

type Action =
  | { type: "SET_CUSTOMERS"; payload: Customer[] }
  | {
      type: "ADD_NEW_CUSTOMER";
      payload: {
        name: string;
        email: string;
        phone: string | number;
        invoice?: InvoiceData;
      };
    }
  | {
      type: "UPDATE_CUSTOMER";
      payload: {
        id: string;
        upadate: Partial<Customer>;
      };
    }
  | {
      type: "UPDATE_CUSTOMER_INVOICE";
      payload: {
        id: string;
        invoice: InvoiceData;
      };
    };

const CustomerProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [customers, dispatcher] = useReducer(reducer, []);
  const customerDispatcher = (action: Action) => dispatcher(action);
  const [fetchingCustomers, toggleFetchingCustomers] = useToggle(true);

  useEffect(() => {
    toggleFetchingCustomers(true);
    customerDispatcher({ type: "SET_CUSTOMERS", payload: mockCustomers });
    toggleFetchingCustomers(false);
  }, [toggleFetchingCustomers]);

  return (
    <Context.Provider
      value={{ customers, customerDispatcher, fetchingCustomers }}
    >
      {children}
    </Context.Provider>
  );
};

export default CustomerProvider;

export const useCustomer = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useCustomer: must be use within CustomerProvider.");
  }
  return context;
};

const reducer = (state: Customer[], action: Action): Customer[] => {
  const { type, payload } = action;
  switch (type) {
    case "SET_CUSTOMERS": {
      return payload;
    }

    case "ADD_NEW_CUSTOMER": {
      const newInvoices = payload.invoice ? [payload.invoice] : [];
      const quantities = newInvoices.flatMap((invoice) =>
        invoice.items.map((item) => Number(item.quantity)),
      );

      const totalQuantity = payload.invoice
        ? quantities.reduce((sum, curr) => sum + curr, 0)
        : 0;

      const newCustomer = {
        id: (state.length + 1).toString(),
        email: payload.email,
        name: payload.name,
        phone: payload.phone,
        invoices: newInvoices,
        lastTransaction: new Date().toISOString().split("T")[0],
        totalPurchases: totalQuantity,
      };

      return [newCustomer, ...state];
    }

    case "UPDATE_CUSTOMER": {
      return state.map((customer) => {
        if (customer.id === payload.id) {
          return { ...customer, ...payload.upadate };
        }
        return customer;
      });
    }

    case "UPDATE_CUSTOMER_INVOICE": {
      return state.map((customer) => {
        if (customer.id === payload.id) {
          const payloadQuantites = payload.invoice.items.map((item) =>
            Number(item.quantity),
          );
          const totalPayloadQuantity = payloadQuantites.reduce(
            (sum, curr) => sum + curr,
            0,
          );
          return {
            ...customer,
            invoices: [payload.invoice, ...customer.invoices],
            lastTransaction: payload.invoice.issuedAt,
            totalPurchases: customer.totalPurchases + totalPayloadQuantity,
          };
        }
        return customer;
      });
    }

    default: {
      return state;
    }
  }
};
