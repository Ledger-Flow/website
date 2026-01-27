"use client";

import { mockProducts } from "@/constant/inventory";
import { useToggle } from "@/hooks/useToggle";
import { Product } from "@/types/inventoy";
import { generateSKU } from "@/utils/generator";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";

const Context = createContext<
  | {
      products: Product[];
      fetchingProducts: boolean;
      inventoryDispatcher: (action: Action) => void;
    }
  | undefined
>(undefined);

type Action =
  | {
      type: "SET_PRODUCTS";
      payload: Product[];
    }
  | {
      type: "ADD_PRODUCT";
      payload: { businessName: string } & Omit<Product, "id" | "sku">;
    }
  | {
      type: "UPDATE_PRODUCT";
      payload: { id: string; update: Partial<Product> };
    }
  | {
      type: "DELETE_PRODUCT";
      payload: { id: string };
    };

const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [products, dispatch] = useReducer(reducer, []);
  const inventoryDispatcher = (action: Action) => dispatch(action);
  const [fetchingProducts, toggleFetchingProducts] = useToggle(true);

  useEffect(() => {
    toggleFetchingProducts(true);
    inventoryDispatcher({ type: "SET_PRODUCTS", payload: mockProducts });
    toggleFetchingProducts(false);
  }, [toggleFetchingProducts]);

  return (
    <Context.Provider
      value={{ products, inventoryDispatcher, fetchingProducts }}
    >
      {children}
    </Context.Provider>
  );
};

export default InventoryProvider;

export const useInventory = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("useInventory: must be use within InventoryProvider");
  }
  return context;
};

const reducer = (state: Product[], action: Action): Product[] => {
  const { type } = action;
  switch (type) {
    case "SET_PRODUCTS": {
      return action.payload;
    }

    case "ADD_PRODUCT": {
      const newProduct: Product = {
        ...action.payload,
        id: (state.length + 1).toString(),
        sku: generateSKU(action.payload.businessName, action.payload.name),
      };

      return [newProduct, ...state];
    }

    case "UPDATE_PRODUCT": {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload.update };
        }
        return item;
      });
    }
    case "DELETE_PRODUCT": {
      return state.filter((item) => item.id !== action.payload.id);
    }

    default:
      return state;
  }
};
