import React, { FC } from 'react'
import { colors } from '../../theme'
import { Grid, Typography, IconButton, makeStyles, Box } from '@material-ui/core'
import { GLInput } from './Forms/GLInput'
import { GLIconCopy, GLIconPrev, GLIconUser } from './GLIcons'
import Link from 'next/link'
import { GLCheckBox } from './Forms/GLCheckBox'
import { GLButton } from './Forms/GLButtons'

export const GLHavaleEFTForm: FC = () => {
  const classes = useStyles()

  return (
    <div className={classes.payment}>
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GLInput
            label="Fatura Bilgileri"
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
      <br />
      <br />
      <Typography variant="h4">
        <strong>Shipeedy Hesap Bilgileri!</strong>
      </Typography>
      <hr />
      <br />
      <Typography variant="caption">
        Ornare est ornare pharetra pretium fusce tristique facilisi. Ipsum a, condimentum imperdiet
        amet. Ornare commodo scelerisque nunc posuere. Tortor eu vitae nisi auctor velit nisi,
        tortor ut. Nec varius odio tempus maecenas eget posuere aliquet tellus felis.
      </Typography>
      <br />
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GLInput
            label="Garanti Bankası"
            value="TR0000000000000000"
            endIcon={
              <IconButton>
                <GLIconCopy color={colors.grayMedium} />
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <GLInput
            label="İş Bankası"
            value="TR0000000000000000"
            endIcon={
              <IconButton>
                <GLIconCopy color={colors.grayMedium} />
              </IconButton>
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <GLInput
            label="Yapı Kredi"
            value="TR0000000000000000"
            endIcon={
              <IconButton>
                <GLIconCopy color={colors.grayMedium} />
              </IconButton>
            }
          />
        </Grid>
        <Grid item xs={6}>
          <GLInput
            label="Akbank"
            value="TR0000000000000000"
            endIcon={
              <IconButton size="small">
                <GLIconCopy color={colors.grayMedium} />
              </IconButton>
            }
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="h6">
            <strong>Talep ID</strong>
          </Typography>
          <Typography>SHP234567789</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            <strong>Firma Ünvanı</strong>
          </Typography>
          <Typography>Bugra Hadimoğlu A.Ş.</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Ödeme Dekontunuza sırasıyla &apos;&apos;Talep ID&apos;&apos; ve &apos;’Firma
            Ünvanı&apos;&apos; yazılması zorunludur
          </Typography>
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
