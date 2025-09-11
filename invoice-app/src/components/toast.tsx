import { CToast, CToastBody, CToastClose } from "@coreui/react-pro"

type ToastPropertyType = {
    text: string,
    visible: boolean,
}

function Toast({text, visible} : ToastPropertyType) {
  return (
    <CToast delay={5000} autohide={false} visible={visible} color="primary" className="text-white align-items-center">
      <div className="d-flex">
        <CToastBody>{text}</CToastBody>
        <CToastClose className="me-2 m-auto" white />
      </div>
    </CToast>
  )
}

export default Toast