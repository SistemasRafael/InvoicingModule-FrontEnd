import type { InvoiceType } from "./Invoice-type";

export type InvoiceGridRowsType = {
  invoiceGridRows: InvoiceType[],
  setInvoiceGridRows: (data : any) => void,
  clearInvoiceGridRows: () => void,
}