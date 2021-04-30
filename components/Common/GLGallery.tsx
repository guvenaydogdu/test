import { FC, useState } from 'react'
import {
  makeStyles,
  Container,
  Grid,
  Box,
  Card,
  CardActionArea,
  CardMedia,
} from '@material-ui/core'
import { GLModalGallery } from './GLModalGallery'
import { GLGallerySlider } from './GLGallerySlider'
import { colors } from '../../theme'

interface IGLGalleryProps {
  data: string[]
}

export const GLGallery: FC<IGLGalleryProps> = ({ data }) => {
  const classes = useStyles()

  const [modalStatus, setModalStatus] = useState<boolean>(false)
  const [galleryItemIndex, setGalleryItemIndex] = useState<number>(0)

  const handleModalChange = (status: boolean) => {
    setModalStatus(status)
  }
  const handleIndex = (index: number) => {
    setGalleryItemIndex(index)
  }

  return (
    <>
      <Box className={classes.thumbs}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {data.map((item, i) => {
              return (
                <Grid item xs={12} lg={4} key={i}>
                  <Card
                    className={classes.ServiceBox}
                    onClick={() => {
                      handleModalChange(true)
                      handleIndex(i)
                    }}
                  >
                    <CardActionArea>
                      <CardMedia image={item} title="" />
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
        </Container>
      </Box>

      <GLModalGallery statusModal={modalStatus} handleModalChange={handleModalChange}>
        <GLGallerySlider galleryItemIndex={galleryItemIndex} data={data} />
      </GLModalGallery>
    </>
  )
}

const useStyles = makeStyles(() => ({
  thumbs: {
    textAlign: 'center',
    padding: '80px 0',
  },
  ServiceBox: {
    borderRadius: '10px',
    boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.1)',

    '& .MuiButtonBase-root': {
      '& .MuiCardMedia-root': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '248px',
      },
    },

    '& .MuiCardActions-root': {
      fontSize: '18px',
      lineHeight: '150%',
      fontWeight: 'bold',
      color: colors.white,
      padding: '0',
    },
  },
}))
