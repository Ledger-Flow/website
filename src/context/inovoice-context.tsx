"use client";

import { mockInvoices } from "@/constant/invoices";
import { useToggle } from "@/hooks/useToggle";
import { InvoiceData, InvoiceItem } from "@/types/invoice";
import { Member } from "@/types/members";
import { calculateTotals } from "@/utils/calculations";
import { generateId } from "@/utils/generator";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

type Action =
  | {
      type: "SET_INVOICES";
      payload: InvoiceData[];
    }
  | { type: "ADD_INVOICE_ITEM" }
  | { type: "REMOVE_INVOICE_ITEM"; payload: { id: string } }
  | {
      type: "UPDATE_INVOICE";
      payload: Partial<InvoiceData>;
    }
  | { type: "INITIALIZE_INVOICE"; payload: { issuedBy: Member } }
  | {
      type: "UPDATE_INVOICE_ITEM";
      payload: { id: string; field: keyof InvoiceItem; value: string | number };
    }
  | { type: "GENERATE_INVOICE" };

const Context = createContext<
  | ({
      invoiceDispatcher: (action: Action) => void;
      fetchingInvoices: boolean;
    } & State)
  | undefined
>(undefined);

type State = {
  invoices: InvoiceData[];
  invoice: InvoiceData;
};

const initialData: State = {
  invoices: [],
  invoice: {
    customerEmail: "",
    customerName: "",
    customerPhone: "",
    invoiceNumber: "",
    issuedAt: "",
    issuedBy: {
      email: "",
      id: "",
      name: "",
      img: "",
      role: "",
      status: "active",
    },
    items: [{ amount: 0, id: "1", name: "", quantity: 1, unitPrice: 0 }],
    taxRate: 7.5,
    subTotal: 0,
    taxAmount: 0,
    totalAmount: 0,
  },
};

const InvoiceProvider = ({ children }: Readonly<{ children: ReactNode }>) => {
  const [invoices, dispatcher] = useReducer(reducer, initialData);
  const invoiceDispatcher = (action: Action) => dispatcher(action);
  const [fetchingInvoices, toggleFetchingInvoices] = useToggle(true);

  useEffect(() => {
    toggleFetchingInvoices(true);
    invoiceDispatcher({ type: "SET_INVOICES", payload: mockInvoices });
    toggleFetchingInvoices(false);
  }, [toggleFetchingInvoices]);

  return (
    <Context.Provider
      value={{ ...invoices, invoiceDispatcher, fetchingInvoices }}
    >
      {children}
    </Context.Provider>
  );
};

export default InvoiceProvider;

export const useInvoice = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useInvoice: must be use within InvoiceProvider");
  }
  return context;
};

const reducer = (state: State, action: Action): State => {
  const { type } = action;

  switch (type) {
    case "SET_INVOICES": {
      return { ...state, invoices: action.payload };
    }

    case "ADD_INVOICE_ITEM": {
      const newInvoiceItem: InvoiceItem = {
        amount: 0,
        id: (state.invoice.items.length + 1).toString(),
        name: "",
        quantity: 1,
        unitPrice: 0,
      };

      return {
        ...state,
        invoice: {
          ...state.invoice,
          items: [newInvoiceItem, ...state.invoice.items],
        },
      };
    }

    case "REMOVE_INVOICE_ITEM": {
      const updatedItems = [...state.invoice.items].filter(
        (item) => item.id !== action.payload.id,
      );
      return {
        ...state,
        invoice: {
          ...state.invoice,
          items: updatedItems,
        },
      };
    }

    case "UPDATE_INVOICE": {
      const newUpdates = { ...state.invoice, ...action.payload };
      return { ...state, invoice: newUpdates };
    }

    case "UPDATE_INVOICE_ITEM": {
      const updatedItems = state.invoice.items.map((item) => {
        if (item.id !== action.payload.id) return item;

        // Normalize existing values
        let quantity = typeof item.quantity === "number" ? item.quantity : 0;
        let unitPrice = typeof item.unitPrice === "number" ? item.unitPrice : 0;

        // Normalize incoming value
        const value =
          typeof action.payload.value === "number" ? action.payload.value : 0;

        // Update the correct field
        if (action.payload.field === "quantity") {
          quantity = value;
        }

        if (action.payload.field === "unitPrice") {
          unitPrice = value;
        }

        return {
          ...item,
          [action.payload.field]: action.payload.value,
          amount: quantity * unitPrice,
        };
      });

      return {
        ...state,
        invoice: {
          ...state.invoice,
          items: updatedItems,
        },
      };
    }

    case "INITIALIZE_INVOICE": {
      return {
        ...state,
        invoice: {
          ...state.invoice,
          issuedBy: action.payload.issuedBy,
          invoiceNumber: generateId("INV"),
          issuedAt: new Date().toISOString().split("T")[0],
          taxRate: 7.5,
        },
      };
    }

    case "GENERATE_INVOICE": {
      const amounts = state.invoice.items.map((item) => item.amount);
      const { subtotal, taxAmount, totalAmount } = calculateTotals(
        amounts,
        state.invoice.taxRate,
      );

      const finalizedInvoice = {
        ...state.invoice,
        subTotal: subtotal,
        taxAmount,
        totalAmount,
      };

      return {
        ...state,
        invoices: [finalizedInvoice, ...state.invoices],
        invoice: {
          ...initialData.invoice,
          issuedBy: state.invoice.issuedBy,
          invoiceNumber: generateId("INV"),
          issuedAt: new Date().toISOString().split("T")[0],
          taxRate: 7.5,
        },
      };
    }

    default:
      return state;
  }
};
