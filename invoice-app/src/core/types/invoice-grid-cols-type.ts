import type { ColDef } from "ag-grid-community";
import type { InvoiceType } from "./Invoice-type";

export type InvoiceGridColsType = {
  invoiceGridCols: ColDef<InvoiceType>[],
  setInvoiceGridCols: (data : ColDef<InvoiceType>[]) => void,
  clearInvoiceGridCols: () => void,
}