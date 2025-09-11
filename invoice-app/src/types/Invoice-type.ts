export type InvoiceType = {
  invoiceNumber : string,
  clientName: string,
  date: Date | null | string,
  status: string,
  amount: number,
}