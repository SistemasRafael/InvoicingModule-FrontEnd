import { create } from "zustand";
import { invoiceFakeData } from "../fake-data/invoice-fake-data";
import type { InvoiceType } from "../types/Invoice-type";

type InvoiceGridRowsType = {
  invoiceGridRows: InvoiceType[],
  setInvoiceGridRows: (data : any) => void,
  clearInvoiceGridRows: () => void,
}

export const useInvoiceGridRows = create<InvoiceGridRowsType>((set) => ({
  invoiceGridRows: invoiceFakeData,
  setInvoiceGridRows: (data : InvoiceType[]) => set(() => ({ invoiceGridRows: data })),
  clearInvoiceGridRows: () => set({ invoiceGridRows: [] }),
}));