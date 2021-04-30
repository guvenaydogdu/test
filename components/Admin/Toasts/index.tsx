import { toast } from 'react-toastify'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faRadiationAlt,
  faExclamationCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons'

export enum ToastType {
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
  INFO = 'info',
}

const variantIcon = {
  success: faCheckCircle,
  warning: faRadiationAlt,
  error: faExclamationCircle,
  info: faInfoCircle,
}
const Msg = ({ message, variant }: { message: string; variant: ToastType }) => {
  return (
    <div className="d-flex align-items-center">
      <FontAwesomeIcon icon={variantIcon[variant]} size={'lg'} />
      <span style={{ marginLeft: '10px' }}>{message}</span>
    </div>
  )
}

export const ShowToast = ({
  variant = ToastType.SUCCESS,
  text,
  duratation = 5000,
  hideProgressBar = false,
  closeOnClick = true,
  pauseOnHover = true,
  draggable = true,
}: {
  variant: ToastType
  text: any
  duratation?: number
  hideProgressBar?: boolean
  closeOnClick?: boolean
  pauseOnHover?: boolean
  draggable?: boolean
}) => {
  if (variant == ToastType.SUCCESS) {
    toast.success(<Msg message={text} variant={variant} />, {
      position: 'top-right',
      autoClose: duratation,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress: undefined,
    })
  }
  if (variant == ToastType.ERROR) {
    toast.error(<Msg message={text} variant={variant} />, {
      position: 'top-right',
      autoClose: duratation,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress: undefined,
    })
  }
  if (variant == ToastType.INFO) {
    toast.info(<Msg message={text} variant={variant} />, {
      position: 'top-right',
      autoClose: duratation,
      hideProgressBar,
      closeOnClick,
      pauseOnHover,
      draggable,
      progress: undefined,
    })
  }
}
