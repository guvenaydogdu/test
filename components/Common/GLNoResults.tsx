import React, { FC, ReactElement } from 'react'
import { makeStyles, Box, Typography } from '@material-ui/core'
import { colors } from '../../theme'
import { GLBox } from './GLBox'
import { GLIconNext, GLIconShip } from './GLIcons'
import { GLButton } from './Forms/GLButtons'
import Spinner from '../../assets/icons/Spinner'

interface IGLNoResults {
  icon?: ReactElement
  toForm?: () => any
}

export const GLNoResults: FC<IGLNoResults> = ({ toForm }) => {
  const classes = useStyles()

  return (
    <GLBox shadow={true}>
      <Box className={classes.noResults}>
        <span className="icon">
          <GLIconShip />
        </span>
        <span className="title">Arama kriterlerinize uygun hiç sonuç bulunamadı!</span>
      </Box>
      <Box className={classes.noResultsBody}>
        <Typography>
          Arama yaptığınız yükleme ve varış noktalarında hazır fiyatlandırmamız bulunmamaktadır.
          Sizi arama yaptığınız taşıma moduna ait Fiyat Talep Formuna yönlendiriyorum.
        </Typography>
        <div className={classes.spinner}>
          <Spinner />
        </div>
        <small>
          Yönlendirme ile bir sorun yaşıyorsanız aşağıdaki linke tıklayarakta talep formuna
          ulaşabilisiniz.
        </small>
        <div
          style={{
            maxWidth: '240px',
            margin: '0 auto',
          }}
        >
          <GLButton
            text="Talep Formuna Git"
            textColor={colors.sea}
            bgColor="transparent"
            bgColorHover={colors.graySoft}
            onClick={toForm}
            shadow={false}
            iconSize="10px"
            endIcon={<GLIconNext />}
          />
        </div>
      </Box>
    </GLBox>
  )
}

const useStyles = makeStyles(() => ({
  noResults: {
    display: 'flex',
    alignItems: 'center',
    border: `1px solid ${colors.grayMedium}`,
    borderRadius: '5px',
    padding: '16px 28px',

    '& .icon': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: colors.sea,

      '& svg': {
        width: '16px',
        height: '16px',
        fill: colors.white,
      },
    },

    '& .title': {
      display: 'block',
      fontSize: '14px',
      lineHeight: '16px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      padding: '0 14px',
    },
  },
  noResultsBody: {
    '& .MuiTypography-root': {
      fontSize: '14px',
      lineHeight: '16px',
      textAlign: 'center',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      maxWidth: '650px',
      margin: '53px auto',
    },

    '& small': {
      display: 'block',
      fontSize: '14px',
      lineHeight: '16px',
      textAlign: 'center',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.grayMedium,
      marginBottom: '6px',
    },
  },
  spinner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px 0',
    marginBottom: '60px',

    '& svg': {
      width: 'auto',
      height: '50px',

      '& *': {
        fill: colors.black,
      },
    },
  },
}))
