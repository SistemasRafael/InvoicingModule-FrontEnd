import './Invoice-Grid.css';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry, type ColDef } from 'ag-grid-community'; 
import type { InvoiceType } from '../../core/types/Invoice-type';
import { invoiceFakeData, invoiceGridColsNames } from '../../core/fake-data/invoice-fake-data';
import { create } from 'zustand';
import type { InvoiceGridRowsType } from '../../core/types/invoice-grid-rows-type';
import type { InvoiceGridColsType } from '../../core/types/invoice-grid-cols-type';
import {useDropzone} from 'react-dropzone'
import { useCallback } from 'react';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const useInvoiceGridRows = create<InvoiceGridRowsType>((set) => ({
  invoiceGridRows: invoiceFakeData,
  setInvoiceGridRows: (data : InvoiceType[]) => set(() => ({ invoiceGridRows: data })),
  clearInvoiceGridRows: () => set({ invoiceGridRows: [] }),
}));

const useInvoiceGridCols = create<InvoiceGridColsType>((set) => ({
  invoiceGridCols: invoiceGridColsNames,
  setInvoiceGridCols: (data : ColDef<InvoiceType>[]) => set({ invoiceGridCols: data }),
  clearInvoiceGridCols: () => set({ invoiceGridCols: [] }),
}));

function isValidDateString(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}

function InvoiceGrid() {
  
  const {invoiceGridRows, setInvoiceGridRows} = useInvoiceGridRows();
  const {invoiceGridCols } = useInvoiceGridCols();

  const onDrop = useCallback((acceptedFiles: any) => {
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const invoiceNewData : InvoiceType[] = [];
        const csvRows : string[] = reader.result!.toString().split("\n");
        for(let i : number = 0 ; i < csvRows?.length; i++) {
          if(i > 0) {
            const columns : string[] = csvRows[i].replace(/"/g, "").split(",");
            invoiceNewData.push({
              invoiceNumber: columns[0] !== "" ? columns[0] : "This field is required!", 
              clientName: columns[1] !== "" ? columns[1] : "This field is required!", 
              date: isValidDateString(columns[2]) ?  columns[2] : "Invalid Date!",
              status: columns[3] !== "" ? columns[3] : "This field is required!", 
              amount: parseInt(columns[4])
            });
          }
        }
        setInvoiceGridRows(invoiceNewData);
      };
      reader.readAsText(file);
    });
  }, [invoiceGridRows, setInvoiceGridRows]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
  return (
    <>
      <div {...getRootProps()} className='Drag-And-Drop'>
        <input {...getInputProps()} />
        {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}
      </div>
      <div style={{ width: "100%", height: "300px" }}>
        <AgGridReact 
        rowData={invoiceGridRows}
        columnDefs={invoiceGridCols}
        pagination={true}
        paginationPageSizeSelector={[20, 30, 50]}
        paginationPageSize={20}
        rowClassRules={{
            'ag-over-21-row': 'data.invoiceNumber === "This field is required!" || data.date === "Invalid Date!"'
        }}/>
      </div>
    </>
  )
}

export default InvoiceGrid