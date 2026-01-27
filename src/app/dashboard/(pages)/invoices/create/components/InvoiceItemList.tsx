import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useInvoice } from "@/context/inovoice-context";
import { useInventory } from "@/context/inventory-context";
import { InvoiceItem } from "@/types/invoice";
import { formatCurrency } from "@/utils/formatter";
import { Trash2 } from "lucide-react";
import AddInvoiceProduct from "./AddInvoiceProduct";
import { cleanNumberInput, cleanNumberInputBlur } from "@/lib/utils";

const InvoiceItemList = ({ invoiceItem }: { invoiceItem: InvoiceItem }) => {
  const { invoiceDispatcher, invoice } = useInvoice();
  const { products } = useInventory();

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(invoiceItem.name.toLowerCase()),
  );
  const findProduct = products.find(
    (product) =>
      product.name === invoiceItem.name &&
      product.unitPrice === invoiceItem.unitPrice,
  );

  const handleNumberInput = (
    id: string,
    field: "quantity" | "unitPrice",
    value: string,
  ) => {
    const cleanedValue = cleanNumberInput(value);
    if (cleanedValue === undefined) return;
    invoiceDispatcher({
      type: "UPDATE_INVOICE_ITEM",
      payload: { id, field, value: cleanedValue },
    });
  };

  const handleNumberInputBlur = (
    id: string,
    field: "quantity" | "unitPrice",
    value: string | number,
  ) => {
    const minValue = field === "quantity" ? 1 : 0;
    const cleanedValue = cleanNumberInputBlur(value, minValue);
    if (cleanedValue === undefined) return;
    invoiceDispatcher({
      type: "UPDATE_INVOICE_ITEM",
      payload: { id, field, value: cleanedValue },
    });
  };

  return (
    <div className="space-y-2 rounded-lg border p-4">
      <div className="grid grid-cols-4 gap-3">
        <div className="group relative col-span-2 space-y-2">
          <Label htmlFor={`product-${invoiceItem.id}`} className="text-xs">
            Product/Service
          </Label>
          <Input
            id={`product-${invoiceItem.id}`}
            placeholder="Product/Service Name"
            value={invoiceItem.name}
            onChange={(e) =>
              invoiceDispatcher({
                type: "UPDATE_INVOICE_ITEM",
                payload: {
                  id: invoiceItem.id,
                  field: "name",
                  value: e.target.value,
                },
              })
            }
            required
          />

          {filteredProducts.length > 0 && (
            <ul className="border-input absolute hidden max-h-55 w-full gap-1 space-y-0.5 truncate overflow-x-clip overflow-y-auto rounded-md border bg-white p-1 shadow-sm group-focus-within:block">
              {filteredProducts.map((product, index) => (
                <li key={index}>
                  <button
                    className="text-foreground hover:bg-accent hover:text-accent-foreground w-full cursor-pointer rounded-sm px-2 py-1.5 text-left text-sm disabled:pointer-events-none disabled:bg-transparent disabled:opacity-50"
                    type="button"
                    disabled={
                      product.name === invoiceItem.name &&
                      product.unitPrice === invoiceItem.unitPrice
                    }
                    onClick={() => {
                      invoiceDispatcher({
                        type: "UPDATE_INVOICE_ITEM",
                        payload: {
                          id: invoiceItem.id,
                          field: "name",
                          value: product.name,
                        },
                      });
                      invoiceDispatcher({
                        type: "UPDATE_INVOICE_ITEM",
                        payload: {
                          id: invoiceItem.id,
                          field: "unitPrice",
                          value: product.unitPrice,
                        },
                      });
                    }}
                  >
                    {product.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor={`quantity-${invoiceItem.id}`} className="text-xs">
            Quantity
          </Label>
          <Input
            id={`quantity-${invoiceItem.id}`}
            type="number"
            min="1"
            value={invoiceItem.quantity}
            onChange={(e) =>
              handleNumberInput(invoiceItem.id, "quantity", e.target.value)
            }
            onBlur={() =>
              handleNumberInputBlur(
                invoiceItem.id,
                "quantity",
                invoiceItem.quantity,
              )
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`unit-${invoiceItem.id}`} className="text-xs">
            Unit Price (₦)
          </Label>
          <Input
            id={`unit-${invoiceItem.id}`}
            type="number"
            min="1"
            value={invoiceItem.unitPrice}
            onChange={(e) =>
              handleNumberInput(invoiceItem.id, "unitPrice", e.target.value)
            }
            onBlur={() =>
              handleNumberInputBlur(
                invoiceItem.id,
                "unitPrice",
                invoiceItem.unitPrice,
              )
            }
            required
          />
        </div>
      </div>

      <div className="text-muted-foreground flex items-center justify-between px-0.5 text-xs">
        <span>
          Amount:{" "}
          <span className="text-foreground font-semibold">
            {formatCurrency(invoiceItem.amount)}
          </span>
        </span>

        <button
          type="button"
          onClick={() => {
            if (invoice.items.length === 1) return;
            invoiceDispatcher({
              type: "REMOVE_INVOICE_ITEM",
              payload: { id: invoiceItem.id },
            });
          }}
          className="cursor-pointer text-red-600 hover:text-red-700 disabled:opacity-40"
          title="Remove item"
          disabled={invoice.items.length === 1}
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      {!!invoiceItem.name && !!invoiceItem.unitPrice && !findProduct && (
        <AddInvoiceProduct
          name={invoiceItem.name}
          unitPrice={invoiceItem.unitPrice}
        />
      )}
    </div>
  );
};

export default InvoiceItemList;
