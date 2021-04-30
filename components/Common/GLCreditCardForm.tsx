import { Box, Grid, makeStyles, Typography } from '@material-ui/core'
import Link from 'next/link'
import React, { FC } from 'react'
import { colors } from '../../theme'
import { GLButton } from './Forms/GLButtons'
import { GLCheckBox } from './Forms/GLCheckBox'
import { GLInput } from './Forms/GLInput'
import { GLSelect } from './Forms/GLSelect'
import { GLIconInfo, GLIconPrev, GLIconUser } from './GLIcons'
import { GLTooltip } from './GLTooltip'

export const GLCreditCardForm: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.payment}>
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GLInput
            label="Kart Bilgileri"
            placeholder="Adınız"
            startIcon={<GLIconUser color={colors.sea} />}
          />
        </Grid>
        <Grid item xs={6}>
          <GLInput
            label="&nbsp;"
            placeholder="Soyadınız"
            startIcon={<GLIconUser color={colors.sea} />}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GLInput placeholder="Kredi Kartı No" />
        </Grid>
        <Grid item xs={6}>
          <img src="../images/mastercard.png" alt="" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GLSelect
            placeholder="Ay"
            data={[
              {
                id: 1,
                label: 'Ocak',
              },
              {
                id: 2,
                label: 'Şubat',
              },
              {
                id: 3,
                label: 'Mart',
              },
              {
                id: 3,
                label: 'Nisan',
              },
            ]}
          />
        </Grid>
        <Grid item xs={6}>
          <GLSelect
            placeholder="Yıl"
            data={[
              {
                id: 1,
                label: '2021',
              },
              {
                id: 2,
                label: '2020',
              },
              {
                id: 3,
                label: '2019',
              },
              {
                id: 3,
                label: '2018',
              },
            ]}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GLInput
            placeholder="Güvenlik No."
            labelIcon={
              <GLTooltip title="...">
                <GLIconInfo />
              </GLTooltip>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <GLSelect
            placeholder="Taksit Sayısı"
            data={[
              {
                id: 1,
                label: 'Tek Çekim',
              },
            ]}
          />
        </Grid>
      </Grid>
      <br />
      <GLCheckBox
        value={false}
        onChange={() => {
          console.log('t')
        }}
      >
        <Link href="/">Hizmet Sözleşmesini</Link> okudum. Kabul ediyorum.
      </GLCheckBox>
      <br />
      <Typography variant="h6">
        <strong>Önemli Bilgi!</strong>
      </Typography>
      <hr />
      <br />
      <Typography variant="caption">
        Buradaki ödeme işlemlerine devam edilmesi halinde, fiili olarak içerik hizmetlerden
        yararlanılmış olmasına bakılmaksızın kullanıcını &apos;&apos;İptal ve Cayma&apos;&apos;
        hakları son bulacaktır. Ödeme yapılması öncesinde bütün kullanıcılarımızı bilgilendiririz.!
      </Typography>
      <br />
      <br />
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Box className={classes.dueDatePrice}>
            <strong>2,300 $</strong>
          </Box>
        </Grid>
        <Grid item xs={7}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <GLButton
                text="Geri Dön"
                textColor={colors.grayMedium}
                textColorHover={colors.blueDark}
                bgColor="transparent"
                bgColorHover={colors.graySoft}
                shadow={false}
                iconSize="8px"
                startIcon={<GLIconPrev />}
              />
            </Grid>
            <Grid item xs={6}>
              <GLButton
                text="Devam Et"
                shadow={false}
                textColor={colors.white}
                textColorHover={colors.white}
                bgColor={colors.sea}
                bgColorHover={colors.seaHover}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <br />
      <br />
      <hr />
      <br />
      {/* <GLDemandDetailProperties title="Talep No: 3456768" /> */}
    </div>
  )
}

const useStyles = makeStyles(() => ({
  payment: {
    '& hr': {
      border: 'none',
      height: '1px',
      margin: '0',
      backgroundColor: colors.grayLight,
    },

    '& h4': {
      fontWeight: 600,
      fontSize: '18px',
      lineHeight: '21px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      paddingBottom: '8px',
      color: colors.sea,

      '& strong': {
        fontWeight: 700,
      },
    },

    '& h6': {
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '16px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      paddingBottom: '8px',
      color: colors.sea,

      '& strong': {
        fontWeight: 700,
      },
    },

    '& p': {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
    },

    '& [class*="caption"]': {
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '16px',
      color: colors.grayMedium,
    },
  },
  dueDatePrice: {
    '& strong': {
      display: 'block',
      fontWeight: 700,
      fontSize: '32px',
      lineHeight: '38px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.iron,
      paddingBottom: '7px',
    },

    '& p': {
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '14px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.grayMedium,
      margin: 0,
    },
  },
  glList: {
    '& li': {
      padding: '4px 0',
      fontSize: '12px',
      lineHeight: '14px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
    },
  },
}))
