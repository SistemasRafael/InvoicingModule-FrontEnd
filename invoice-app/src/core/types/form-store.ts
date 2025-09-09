import type { InvoiceType } from "./Invoice";

export type FormStoreType = {
  invoice: InvoiceType,
  setInvoice: (data : any) => void,
  clearInvoice: () => void,
}