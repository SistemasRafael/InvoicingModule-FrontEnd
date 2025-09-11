import './Invoice-Grid.css';
import { AgGridReact } from 'ag-grid-react';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
import type { InvoiceType } from '../../types/Invoice-type';
import { CButton } from '@coreui/react-pro';
import { invoiceFakeData } from '../../fake-data/invoice-fake-data';
import DragAndDrop from '../../components/drag-drop';
import { useInvoiceGridCols } from '../../zustand-statements/use-invoice-grid-cols';
import { useRevertChanges } from '../../zustand-statements/use-revert-changes';
import { useInvoiceGridRows } from '../../zustand-statements/use-invoice-grid-rows';
import { isValidDateString } from '../../lib/utility';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

function InvoiceGrid() {

  const {invoiceGridRows, setInvoiceGridRows} = useInvoiceGridRows();
  const {invoiceGridCols } = useInvoiceGridCols();
  const {isDisabled, setDisabled } = useRevertChanges();

  const onSummit = (result: string | ArrayBuffer | null) => {
    const invoiceNewData : InvoiceType[] = [];
    const csvRows : string[] = result!.toString().split("\n");
    
    csvRows.forEach((value, index) => {
      if(index > 0) {
        const columns : string[] = value.replace(/"/g, "").split(",");
        invoiceNewData.push({
          invoiceNumber: columns[0] !== "" ? columns[0] : "This field is required!", 
          clientName: columns[1] !== "" ? columns[1] : "This field is required!", 
          date: isValidDateString(columns[2]) ?  columns[2] : "Invalid Date!",
          status: columns[3] !== "" ? columns[3] : "This field is required!", 
          amount: parseInt(columns[4])
        });
      }
    });

    setDisabled(false);
    setInvoiceGridRows(invoiceNewData);
  };
  
  return (
    <>
      <DragAndDrop onSummit={onSummit}></DragAndDrop>
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
      <CButton color="primary" type="button" disabled={isDisabled}
        onClick={async ()=> {
          setInvoiceGridRows(invoiceFakeData);
          setDisabled(true);
        }}>Undo Changes</CButton>
    </>
  )
}

export default InvoiceGrid