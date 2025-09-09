import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@coreui/coreui-pro/dist/css/coreui.min.css'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Invoice from './pages/invoice-form/Invoice.tsx'
import InvoiceGrid from './pages/invoice-grid/Invoice-grid.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Invoice/>
  },
  {
    path: '/InvoiceGrid',
    element: <InvoiceGrid/>
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
