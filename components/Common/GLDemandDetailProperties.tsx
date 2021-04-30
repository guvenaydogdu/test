import { makeStyles, Grid, List, ListItem, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import { IOrder } from '../../interfaces/Order'

interface IProps {
  title?: string
  data: IOrder
}

export const GLDemandDetailProperties: FC<IProps> = ({ title, data }) => {
  const classes = useStyles()

  return (
    <>
      <Typography className="title">{title}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <List component="nav" aria-label="Details" className={classes.glList}>
            <ListItem>Ürün Kategörisi: {data.category?.nameEN} </ListItem>
            <ListItem>Ürün Adı / Cinsi: {data.productName} </ListItem>
            <ListItem>IMO: {data?.imo == true ? 'Var' : 'Yok'} </ListItem>
            <ListItem>Class: {data.imoClass?.nameEN} </ListItem>
            <ListItem>UN Number: {data.unCode ? data.unCode : '-'}</ListItem>
            <ListItem>Sigorta:{data.needInsurance == true ? 'Var' : 'Yok'} </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <List component="nav" aria-label="Details" className={classes.glList}>
            <ListItem>Mal Bedeli: {data.cost}</ListItem>
            <ListItem>Brüt Ağırlık (kg):{data.grossWeight} </ListItem>
            <ListItem>Adet: {data.count}</ListItem>
            <ListItem>
              Ölçüler: {data.width} - {data.size} - {data.height}
            </ListItem>
            <ListItem>Hacim: {data.capacity}</ListItem>
            <ListItem>INCOTERM: {data.incoterm?.name}</ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
          <List component="nav" aria-label="Details" className={classes.glList}>
            <ListItem>Konteyner Çeşidi:</ListItem>
            <ListItem>Konteyner Adedi:</ListItem>
            <ListItem>İstiflenebilir Ürün : {data?.hoardable == true ? 'Evet' : 'Hayır'}</ListItem>
            <ListItem>Kat Sayısı:{data.floorCount}</ListItem>
            <ListItem>Paketleme Çeşidi:{data.packingType?.nameEN}</ListItem>
            <ListItem>Transit Süre:-</ListItem>
          </List>
        </Grid>
      </Grid>
    </>
  )
}

const useStyles = makeStyles(() => ({
  glList: {
    '& li': {
      padding: '4px 0',
      fontSize: '12px',
      lineHeight: '14px',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
    },
  },
}))
