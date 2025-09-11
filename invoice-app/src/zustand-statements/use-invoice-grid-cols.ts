import { create } from "zustand";
import type { InvoiceType } from "../types/Invoice-type";
import { invoiceGridColsNames } from "../fake-data/invoice-fake-data";
import { type ColDef } from 'ag-grid-community'; 

type InvoiceGridColsType = {
  invoiceGridCols: ColDef<InvoiceType>[],
  setInvoiceGridCols: (data : ColDef<InvoiceType>[]) => void,
  clearInvoiceGridCols: () => void,
}

export const useInvoiceGridCols = create<InvoiceGridColsType>((set) => ({
  invoiceGridCols: invoiceGridColsNames,
  setInvoiceGridCols: (data : ColDef<InvoiceType>[]) => set({ invoiceGridCols: data }),
  clearInvoiceGridCols: () => set({ invoiceGridCols: [] }),
}));