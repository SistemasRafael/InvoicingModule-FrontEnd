import type { InvoiceType } from "./Invoice-type";

export type InvoiceFormType = {
  invoice: InvoiceType,
  setInvoice: (data : any) => void,
  clearInvoice: () => void,
}