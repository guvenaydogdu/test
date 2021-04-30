import React, { FC } from 'react'
import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import { GLBox } from './GLBox'
import { GLIconNext, GLIconTickCircle } from './GLIcons'
import { GLButton } from './Forms/GLButtons'
import { colors } from '../../theme'

export const GLSuccessMessage: FC = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={2}>
      <Grid item lg={12}>
        <GLBox shadow={true}>
          <Box className={classes.noResultsBody}>
            <span className={classes.success}>
              <GLIconTickCircle />
            </span>
            <Typography>
              Talebiniz Başarılı bir şekilde ulaşmıştır. En yakın sürede iligli ekiplerimiz sizin
              ile iletişime geçicektir. Bizi tercih ettiğiniz için Teşerkkür Ederiz!
            </Typography>
            <small>
              Yönlendirme ile bir sorun yaşıyorsanız aşağıdaki linke tıklayarakta talep formuna
              ulaşabilisiniz.
            </small>
            <div
              style={{
                maxWidth: '240px',
                margin: '16px auto',
              }}
            >
              <GLButton
                text="Taleplerim"
                textColor={colors.white}
                bgColor={colors.sea}
                bgColorHover={colors.seaHover}
                iconSize="10px"
                endIcon={<GLIconNext />}
              />
            </div>
          </Box>
        </GLBox>
      </Grid>
    </Grid>
  )
}

const useStyles = makeStyles(() => ({
  hr: {
    border: 'none',
    borderBottom: `1px solid ${colors.grayLight}`,
    margin: '32px 0',
  },
  insidePage: {
    paddingTop: '90px',
  },
  noResultsBody: {
    '& .MuiTypography-root': {
      fontSize: '18px',
      lineHeight: '150%',
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
  success: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '16px',

    '& svg': {
      width: '96px',
      height: '96px',

      '& circle': {
        fill: colors.iron,
      },

      '& path': {
        fill: colors.white,
      },
    },
  },
}))
