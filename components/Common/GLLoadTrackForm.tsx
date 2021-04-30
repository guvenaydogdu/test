import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { colors } from '../../theme'
import { Button } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { useForm, Controller } from 'react-hook-form'
import { useTranslation } from 'next-i18next'
import { GLInput, GLInputPassword } from '../FormItems/GLInput'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { GLModal } from './GLModal'

const loadTrackFormSchema = yup.object({
  kNo: yup.string().nullable(),
  containerNo: yup.string().nullable(),
})

type ILoadTrackFormData = yup.InferType<typeof loadTrackFormSchema>

const frameBaseUrl = 'https://shipsgo.com/iframe/where-is-my-container/'
const frameBaseUrlEnd = '?tags=hide-search-box'

interface IGLLoadTrackFormProps {
  handleModalChange: (statusModal: boolean) => void
}

export const GLLoadTrackForm: FC<IGLLoadTrackFormProps> = ({ handleModalChange }) => {
  const { t } = useTranslation()
  const [modalData, setModalData] = useState<{ modalStatus: boolean; no: string }>({
    modalStatus: false,
    no: '',
  })

  const classes = useStyles()

  const { control, handleSubmit, setError } = useForm({
    resolver: yupResolver(loadTrackFormSchema),
    defaultValues: {
      kNo: null,
      containerNo: null,
    },
  })

  const onSubmit = (data: ILoadTrackFormData) => {
    if (data.containerNo) {
      setModalData({
        modalStatus: true,
        no: data.containerNo,
      })
    } else if (data.kNo) {
      setModalData({
        modalStatus: true,
        no: data.kNo,
      })
    } else {
      setError('containerNo', {
        type: 'not_null',
        message: 'Not Nullable',
      })
    }
  }

  return (
    <div className={classes.root}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h4 className={classes.modalTitle}>{t('load_tracking')}</h4>
        <hr />
        <Controller
          name="kNo"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => {
            return (
              <GLInput
                label={'Konşimento no.'}
                value={value}
                icon="/images/icon-email.svg"
                onChange={onChange}
              />
            )
          }}
        />
        <div className={classes.orNot}>
          <span>{t('or')}</span>
        </div>
        <Controller
          name="containerNo"
          control={control}
          defaultValue=""
          render={({ onChange, value }) => {
            return (
              <GLInputPassword label={t('container_number')} value={value} onChange={onChange} />
            )
          }}
        />
        <Button
          aria-label="login"
          className={`${classes.btnLogIn} ${classes.margin}`}
          variant="contained"
          color="primary"
          endIcon={<ChevronRightIcon />}
          type="submit"
        >
          <span className="text">{t('query')}</span>
        </Button>
      </form>

      <GLModal
        maxWidth="75%"
        statusModal={modalData.modalStatus}
        handleModalChange={handleModalChange}
      >
        <iframe
          title="load_tracking"
          src={frameBaseUrl + modalData.no + frameBaseUrlEnd}
          id="IframeShipsgoLiveMap"
          style={{ height: '750px', width: '100%' }}
        ></iframe>
      </GLModal>
    </div>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    '& hr': {
      height: '1px',
      border: 'none',
      margin: '0 0 24px 0',
      backgroundColor: colors.grayLight,
    },
  },
  modalTitle: {
    fontSize: '16px',
    fontWeight: 'bold',
    lineHeight: '18.78px',
    color: colors.black,
    margin: '0 0 16px 0',
  },
  margin: {
    margin: '0 0 16px 0',
  },
  forgotPassword: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& .MuiLink-root': {
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '14.9px',
      color: colors.grayMedium,
      textDecoration: 'underline',
    },
  },
  btnLogIn: {
    display: 'flex',
    width: '100%',
    height: '48px',

    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      fontSize: '14px',
      lineHeight: '16.44px',
      fontWeight: '700',
      textTransform: 'none',

      '& .text': {
        width: '100%',
        textAlign: 'center',
      },

      '& .MuiButton-endIcon': {
        width: '20px',
      },
    },
  },
  btnLogInOutsource: {
    width: '100%',
    border: `1px solid ${colors.grayLight}`,
    backgroundColor: 'transparent',
    color: colors.black,
    borderRadius: '10px',
    boxShadow: 'none',

    '&:hover': {
      backgroundColor: colors.grayLight,
      boxShadow: 'none',
    },

    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '34px',

      '& .icon': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },

      '& .text': {
        width: '100%',
        fontSize: '14px',
        lineHeight: '16.44px',
        fontWeight: '700',
        color: colors.black,
        textTransform: 'none',
        padding: '0 14px',
      },

      '& .MuiButton-endIcon': {
        color: colors.grayMedium,
      },
    },
  },
  orNot: {
    position: 'relative',
    height: '1px',
    backgroundColor: colors.grayLight,
    margin: '10px 0 22px 0',

    '& span': {
      position: 'absolute',
      left: '50%',
      top: '50%',
      fontSize: '12px',
      fontWeight: '400',
      lineHeight: '16.44px',
      color: colors.grayMedium,
      textAlign: 'center',
      transform: 'translate(-50%, -50%)',
      backgroundColor: colors.white,
      padding: '0 20px',
    },
  },
  youMember: {
    textAlign: 'center',
    padding: '14px 0',

    '& > span': {
      display: 'block',
      fontSize: '14px',
      lineHeight: '16.44px',
      fontWeight: '400',
      color: colors.grayMedium,
      marginBottom: '7px',
    },
    '& a': {
      cursor: 'pointer',
    },

    '& .MuiLink-root, & a': {
      display: 'inline-block',
      fontSize: '16px',
      lineHeight: '18.78px',
      fontWeight: '700',
      color: colors.sea,
      textDecoration: 'underline',
    },
  },
}))
