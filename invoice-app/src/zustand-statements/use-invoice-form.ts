import { create } from "zustand";
import type { InvoiceType } from "../types/Invoice-type";

type InvoiceFormType = {
  invoice: InvoiceType,
  setInvoice: (data : any) => void,
  clearInvoice: () => void,
}

const initialInvoice : InvoiceType = {
  clientName: '',
  date: null,
  status: '',
  amount: 0,
  invoiceNumber: ''
};

export const useInvoiceForm = create<InvoiceFormType>((set) => ({
  invoice: initialInvoice,
  setInvoice: (data : InvoiceType) => set({ invoice: data }),
  clearInvoice: () => set({ invoice: initialInvoice }),
}));