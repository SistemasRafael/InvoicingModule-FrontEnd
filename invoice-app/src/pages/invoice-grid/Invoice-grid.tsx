import './Invoice-Grid.css';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community'; 
import type { InvoiceType } from '../../core/types/Invoice-type';
import { invoiceFakeData, invoiceGridColsNames } from '../../core/fake-data/invoice-fake-data';
import { create } from 'zustand';
import type { InvoiceGridRowsType } from '../../core/types/invoice-grid-rows-type';
import type { InvoiceGridColsType } from '../../core/types/invoice-grid-cols-type';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function InvoiceGrid() {

  const useInvoiceGridRows = create<InvoiceGridRowsType>((set) => ({
    invoiceGridRows: invoiceFakeData,
    setInvoiceGridRows: (data : InvoiceType[]) => set({ invoiceGridRows: data }),
    clearInvoiceGridRows: () => set({ invoiceGridRows: [] }),
  }));

  const useInvoiceGridCols = create<InvoiceGridColsType>((set) => ({
    invoiceGridCols: invoiceGridColsNames,
    setInvoiceGridCols: (data : ColDef<InvoiceType>[]) => set({ invoiceGridCols: data }),
    clearInvoiceGridCols: () => set({ invoiceGridCols: [] }),
  }));
  
  const { invoiceGridRows } = useInvoiceGridRows();
  const {invoiceGridCols} = useInvoiceGridCols();
  
  return (
    <div style={{ width: "100%", height: "300px" }}>
      <AgGridReact 
      rowData={invoiceGridRows}
      columnDefs={invoiceGridCols}
      pagination={true}
      paginationPageSizeSelector={[20, 30, 50]}
      paginationPageSize={20}/>
    </div>
  )
}

export default InvoiceGrid