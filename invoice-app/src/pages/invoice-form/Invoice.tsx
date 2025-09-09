import './Invoice.css'
import { create } from 'zustand'
import { 
  CRow,
  CCol,
  CForm,
  CFormLabel,
  CFormInput,
  CFormText,
  CDatePicker,
  CButton,
  CFormSelect,
  CCard,
  CCardHeader,
  CCardBody,
  CCardFooter
} from '@coreui/react-pro';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import * as Yup from 'yup';
import type { FormStoreType } from '../../core/types/form-store';
import type { InvoiceType } from '../../core/types/Invoice';

const initialInvoice : InvoiceType = {
  clientName: '',
  date: null,
  status: '',
  amount: 0,
};

function Invoice() {

  const useInvoiceForm = create<FormStoreType>((set) => ({
    invoice: initialInvoice,
    setInvoice: (data : InvoiceType) => set({ invoice: data }),
    clearInvoice: () => set({ invoice: initialInvoice }),
  }));

  const { invoice, setInvoice, clearInvoice } = useInvoiceForm();

  const formik = useFormik({
    initialValues : invoice,
    validationSchema: Yup.object({
      clientName: Yup.string()
        .max(45, 'Must be 45 characters or less')
        .required('This field is required!'),
      date: Yup.date()
        .nonNullable()
        .required('This field is required!'),
      status: Yup.string()
        .required('This field is required!'),
      amount: Yup.number()
        .required('This field is required!')
        .min(1, 'Number cannot be negative or zero'),
    }),
    onSubmit: async values => {
      await setInvoice(values);
      await resetInvoiceForm();
    },
  });

  useEffect(() => {
    formik.submitForm();
  }, []);

  const resetInvoiceForm = async () => {
    (document.getElementById('date') as HTMLInputElement).value = "";
    await formik.resetForm(invoice);
    await formik.submitForm();
  };

  return (
    <>
      <CForm onSubmit={formik.handleSubmit}>
        <CCard>
          <CCardHeader><h3>Create new Invoice</h3></CCardHeader>
          <CCardBody>
              <CRow>
                <CCol sm={6} lg={6}>
                  <CFormLabel htmlFor="clientName">Client Name</CFormLabel>
                  <CFormInput 
                    id="clientName"
                    name="clientName"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.clientName}
                    invalid={formik.touched.clientName && formik.errors.clientName ? true : false}
                    required
                  />
                  {formik.touched.clientName && formik.errors.clientName ? (
                    <CFormText as="span" id="exampleFormControlInputHelpInline" className='required-invalid'>
                      {formik.errors.clientName}
                    </CFormText>
                  ) : null}
                </CCol>
                <CCol sm={6} lg={6}>
                  <CDatePicker 
                    id='date'
                    name='date'
                    date={invoice.date}
                    onDateChange={async (value) => {
                      await formik.setFieldValue("date", value);
                    }}
                    label="Date" locale="en-US"
                    invalid={formik.touched.date && formik.errors.date ? true : false}
                    required />
                  {formik.touched.date && formik.errors.date ? (
                    <CFormText as="span" id="exampleFormControlInputHelpInline2" className='required-invalid'>
                      {formik.errors.date}
                    </CFormText>
                  ) : null}
                </CCol>
              </CRow>
              <CRow>
                <CCol sm={6} lg={6}>
                  <CFormLabel htmlFor="amount">Amount</CFormLabel>
                  <CFormInput 
                    id="amount"
                    name="amount"
                    type="number"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    invalid={formik.touched.amount && formik.errors.amount ? true : false}
                    required
                  />
                  {formik.touched.amount && formik.errors.amount ? (
                    <CFormText as="span" id="exampleFormControlInputHelpInline" className='required-invalid'>
                      {formik.errors.amount}
                    </CFormText>
                  ) : null}
                </CCol>
                <CCol sm={6} lg={6}>
                  <CFormLabel htmlFor="status">Status</CFormLabel>
                  <CFormSelect
                    id="status"
                    name="status"
                    onChange={formik.handleChange}
                    value={formik.values.status}
                    aria-label="Default select example"
                    invalid={formik.touched.status && formik.errors.status ? true : false}
                    required
                    options={[
                      { label: 'Select option', value: '' },
                      { label: 'Paid', value: '1' },
                      { label: 'Unpaid', value: '2' }
                    ]}
                  />
                  {formik.touched.status && formik.errors.status ? (
                    <CFormText as="span" id="exampleFormControlInputHelpInline3" className='required-invalid'>
                      {formik.errors.status}
                    </CFormText>
                  ) : null}
                </CCol>
              </CRow>
          </CCardBody>
          <CCardFooter className="text-body-secondary text-end">
            <CButton type="submit" color="primary" className="margin-right">Save</CButton>
            <CButton color="secondary" type="button" disabled={!formik.dirty} 
            onClick={async ()=> {
              await clearInvoice();
              await resetInvoiceForm();
            }}>Clear</CButton>
          </CCardFooter>
        </CCard>
      </CForm>
      <div>{ JSON.stringify(invoice, null, 2) }</div>
    </>
  )
}

export default Invoice