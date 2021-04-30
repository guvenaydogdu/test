import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import React, { FC, useEffect, useState } from 'react'
import { colors } from '../../../theme'
import { GLButton } from '../Forms/GLButtons'
import { GLCheckBox } from '../Forms/GLCheckBox'
import { GLTextArea } from '../Forms/GLTextarea'
import { GLModal } from '../GLModal'
import Requests from '../../../requests'
import { IRefusalReasonsResponse } from '../../../interfaces/RefusalReason'

interface IModalProps {
  status: boolean
  handleChange: () => void
  orderId: number
}
interface IFormValues {
  orderId: number
  refusalReasonId: number
  refusalReasonName?: string
  refusalReasonDescription?: string
}

export const ModalReject: FC<IModalProps> = ({ status, handleChange, orderId }) => {
  const classes = useStyles()
  const request = Requests()

  const [refusalReasons, setRefusalReasons] = useState<IRefusalReasonsResponse | null>(null)
  const [formValues, setFormValues] = useState<IFormValues>({
    orderId: orderId,
    refusalReasonId: 0,
    refusalReasonDescription: undefined,
  })
  const [errorCount, setErrorCount] = useState<number>(0)

  useEffect(() => {
    get()
  }, [])

  const get = () => {
    request.RefusalReasonRequest.getList({
      pageNumber: 1,
      pageSize: 100,
      sortDescending: true,
      isActive: true,
    })
      .then((res) => setRefusalReasons(res))
      .catch((err) => console.log(err))
  }

  const onSubmit = () => {
    setErrorCount((prev) => prev + 1)
    if (
      formValues.orderId &&
      formValues.refusalReasonId > 0 &&
      formValues.refusalReasonDescription &&
      refusalReasons
    ) {
      /*   request.OrderRequest.rejectOrder({
        orderId: formValues.orderId,
        refusalReasonName: refusalReasons?.data.find(x => x.id === formValues.refusalReasonId)?.nameEN
        refusalReasonId: formValues.refusalReasonId,
        refusalReasonDescription: formValues.refusalReasonDescription,
      })*/
    }
  }

  const check = (isErrorCount: boolean) => {
    if (errorCount > 0) {
      return isErrorCount
    } else return false
  }

  return (
    <GLModal maxWidth="350px" statusModal={status} handleModalChange={handleChange}>
      <Box className={classes.rejectModal}>
        <Box className={classes.rejectTitle}>Red sebebini bizimle paylaşır mısınız?</Box>
        <Typography>Ürün Kategorisi:</Typography>
        <br />
        {refusalReasons?.data.map((data) => {
          return (
            <GLCheckBox
              key={data.id}
              label={data.nameEN}
              value={data.id === formValues.refusalReasonId ? true : false}
              onChange={() => {
                setFormValues({ ...formValues, refusalReasonId: data.id })
              }}
              error={check(formValues.refusalReasonId > 0 ? true : false)}
            />
          )
        })}
        <GLTextArea
          placeholder="Lütfen Red Sebebinizi Yazınız"
          value={formValues?.refusalReasonDescription}
          onChange={(event: any) => {
            setFormValues({ ...formValues, refusalReasonDescription: event.target.value })
          }}
          error={check(formValues?.refusalReasonDescription ? false : true)}
        />
        <br />
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <GLButton
              onClick={handleChange}
              text="Kapat"
              bgColor={colors.white}
              bgColorHover={colors.grayMedium}
              textColor={colors.grayMedium}
              textColorHover={colors.white}
              shadow={false}
            />
          </Grid>
          <Grid item xs={7}>
            <GLButton
              onClick={onSubmit}
              text="Gönder"
              bgColor={colors.sea}
              bgColorHover={colors.seaHover}
              textColor={colors.white}
              shadow={false}
            />
          </Grid>
        </Grid>
      </Box>
    </GLModal>
  )
}

const useStyles = makeStyles(() => ({
  rejectModal: {
    padding: '24px 47px',

    '& p, & .text': {
      fontSize: '12px',
      lineHeight: '14px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
    },

    '& .MuiIconButton-root': {
      padding: '6px',
      marginRight: '12px',

      '& svg': {
        width: '18px',
      },
    },

    '& [class*="formTextarea"]': {
      '& .MuiInputBase-root': {
        border: 'none',
        fontSize: '12px',
        lineHeight: '150%',
        padding: '10px',
      },
    },
  },
  rejectTitle: {
    fontWeight: 'bold',
    fontSize: '16px',
    lineHeight: '19px',
    color: colors.black,
    paddingBottom: '16px',
    marginBottom: '16px',
    borderBottom: `1px solid ${colors.grayLight}`,
  },
}))
