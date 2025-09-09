import type { ColDef, IDateFilterParams } from "ag-grid-community";
import type { InvoiceType } from "../types/Invoice-type";

const randomDate = (start : Date, end : Date) => {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
  return date.toLocaleDateString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

const filterParams: IDateFilterParams = {
  comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
    
    const dateAsString = cellValue;
    if (dateAsString == null) {
      return -1;
    }
    
    const dateParts = dateAsString.split("/");
    const cellDate = new Date(
      Number(dateParts[2]),
      Number(dateParts[1]) - 1,
      Number(dateParts[0]),
    );

    // 0 if the dates are the same.
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }

    // Any number < 0 if the cell value is less than the filter date.
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }

    // Any number > 0 if the cell value is greater than the filter date.
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }

    return 0;
  },
};

export const invoiceGridColsNames : ColDef<InvoiceType>[] = [
  { field: "invoiceNumber" },
  { field: "clientName" },
  { field: "date", filter: "agDateColumnFilter", filterParams: filterParams },
  { field: "status", filter: "agTextColumnFilter" },
  { field: "amount" },
]

export const invoiceFakeData : InvoiceType[] = [
    { invoiceNumber: "0001", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 1 },
    { invoiceNumber: "0002", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 2 },
    { invoiceNumber: "0003", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 3 },
    { invoiceNumber: "0004", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 34 },
    { invoiceNumber: "0005", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 132 },
    { invoiceNumber: "0006", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 1 },
    { invoiceNumber: "0007", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 2 },
    { invoiceNumber: "0008", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 3 },
    { invoiceNumber: "0009", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 34 },
    { invoiceNumber: "0010", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 132 },
    { invoiceNumber: "0011", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 1 },
    { invoiceNumber: "0012", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 2 },
    { invoiceNumber: "0013", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 3 },
    { invoiceNumber: "0014", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 34 },
    { invoiceNumber: "0015", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 132 },
    { invoiceNumber: "0016", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 1 },
    { invoiceNumber: "0017", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 2 },
    { invoiceNumber: "0018", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 3 },
    { invoiceNumber: "0019", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 34 },
    { invoiceNumber: "0020", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 132 },
    { invoiceNumber: "0021", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 1 },
    { invoiceNumber: "0022", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 2 },
    { invoiceNumber: "0023", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 3 },
    { invoiceNumber: "0024", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 34 },
    { invoiceNumber: "0025", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 132 },
    { invoiceNumber: "0026", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 1 },
    { invoiceNumber: "0027", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 2 },
    { invoiceNumber: "0028", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 3 },
    { invoiceNumber: "0029", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "UnPaid", amount: 34 },
    { invoiceNumber: "0030", clientName: "Tesla", date: randomDate(new Date(2012, 0, 1), new Date()), status: "Paid", amount: 132 },
  ];