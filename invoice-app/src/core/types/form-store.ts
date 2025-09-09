import type { Invoice } from "./Invoice";

export type FormStore = {
  invoice: Invoice,
  setInvoice: (data : any) => void,
  clearInvoice: () => void,
}