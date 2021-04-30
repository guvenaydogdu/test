import { Box } from '@material-ui/core'
import React, { FC } from 'react'
import { GLCreditCardForm } from '../GLCreditCardForm'
import { GLHavaleEFTForm } from '../GLHavaleEFTForm'
import { GLModal } from '../GLModal'
import { GLTabs } from '../GLTabs'

interface IModalProps {
  status: boolean
  handleChange: () => void
}

export const ModalPaymentForm: FC<IModalProps> = ({ status, handleChange }) => {
  return (
    <GLModal maxWidth="730px" statusModal={status} handleModalChange={handleChange}>
      <Box>
        <GLTabs
          data={[
            {
              active: true,
              title: 'Havale / EFT',
              content: <GLHavaleEFTForm />,
            },
            {
              active: false,
              title: 'Kredi Kartı',
              content: <GLCreditCardForm />,
            },
          ]}
        />
      </Box>
    </GLModal>
  )
}
