import { InvoiceData } from "@/types/invoice";
import { Business } from "@/types/profile";
import { init } from "@paralleldrive/cuid2";
import { jsPDF } from "jspdf";
import { formatCurrency, formatDate } from "./formatter";

export const generateRandomNumber = (mul: number = 1, add: number = 10) => {
  return Math.random() * mul + add;
};

export const generateId = (
  prefix: string = "INV",
  length: number = 6,
): string => {
  const createId = init({ length });
  const randomNum = Date.now().toString().slice(-length);
  return `${prefix}-${randomNum}-${createId()}`.toUpperCase();
};

export const generateSKU = (businessName: string, productName: string) => {
  const createId = init({ length: 4 });
  const businessInitial = businessName
    .split(" ")
    .map((word) => word.charAt(0))
    .join("");
  const productInitial = productName
    .split(" ")
    .map((word) => word.slice(0, 2))
    .join("");

  return `${businessInitial}-${productInitial}-${createId()}`.toUpperCase();
};

export const generateInvoicePdf = (
  invoice: InvoiceData,
  business: Business,
) => {
  const doc = new jsPDF();
  let y = 30;

  // The total breath of the doc is 210
  // The margin is 10 on each side i.e 10 to 20 and mid-point 105

  // Add logo
  if (!!business.banner) {
    const logo = new Image();
    logo.src = business.banner;
    doc.addImage(logo, "PNG", 0, 0, 210, 45);
    y += 25;
  }

  // Add title
  doc.setFontSize(24);
  doc.text("INVOICE", 10, y);

  doc.setFontSize(12);
  y += 7;
  doc.setTextColor("0.5");
  doc.text(invoice.invoiceNumber, 10, y);

  doc.setFontSize(10);
  doc.text(`Date:`, 150, y - 6);
  doc.text(`Signed By:`, 150, y);

  doc.setTextColor("0");
  doc.text(formatDate(invoice.issuedAt), 160, y - 6);
  doc.text(invoice.issuedBy.name, 168, y);

  y += 20;
  doc.setFontSize(12);
  doc.text(`From:`, 10, y);
  doc.text(`To:`, 110, y);

  y += 8;
  doc.text(business.name, 10, y);
  doc.text(invoice.customerName, 110, y);

  doc.setTextColor("0.5");
  y += 6;
  doc.text(business.address, 10, y);
  doc.text(`${invoice.customerPhone}`, 110, y);

  y += 6;
  doc.text(`${business.state} ${business.country} ${business.zipCode}`, 10, y);
  doc.text(`${invoice.customerEmail}`, 110, y);

  y += 10;
  doc.text(business.phone, 10, y);
  doc.text(business.email, 10, y + 6);

  // Item header
  y += 25;
  doc.setTextColor("0");
  doc.text(`SN`, 10, y);
  doc.text(`Description`, 20, y);
  doc.text(`Quantity`, 90, y);
  doc.text(`Unit Price`, 120, y);
  doc.text(`Amount`, 160, y);
  y -= 2;

  invoice.items.forEach((item, index) => {
    doc.setFontSize(11);
    y += 6;
    doc.line(10, y, 200, y);
    y += 6;
    doc.text(`${index + 1}`, 10, y);
    doc.text(item.name, 20, y);
    doc.text(`${item.quantity}`, 90, y);
    doc.text(`N${formatCurrency(Number(item.unitPrice)).slice(1)}`, 120, y);
    doc.text(`N${formatCurrency(item.amount).slice(1)}`, 160, y);
  });

  y += 25;
  doc.setFontSize(12);
  doc.setTextColor("0.5");
  doc.text(`Subtotal:`, 110, y);
  doc.text(`VAT (${invoice.taxRate}%)`, 110, y + 7);

  doc.setTextColor("0");
  doc.text(`N${formatCurrency(invoice.subTotal).slice(1)}`, 160, y);
  doc.text(`N${formatCurrency(invoice.taxAmount).slice(1)}`, 160, y + 7);

  y += 10;
  doc.line(110, y, 200, y);
  y += 6;
  doc.setFontSize(13);
  doc.text(`Total:`, 110, y);
  doc.text(`N${formatCurrency(invoice.totalAmount).slice(1)}`, 160, y);

  y += 25;
  doc.setFontSize(11);
  doc.setTextColor(0.5);
  doc.setFont("", "italic");
  doc.text(`${invoice.note}`, 10, y);

  y += 6;
  doc.text(
    `Powered by LedgerFlow, smarter invoicing, inventory, and insights. ${process.env.NEXT_PUBLIC_URL}`,
    10,
    y,
  );

  doc.save(`${invoice.customerName}-${invoice.invoiceNumber}.pdf`);

  // const pdfBlob = doc.output("blob");
  // return URL.createObjectURL(pdfBlob);
};
