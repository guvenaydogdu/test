import { Paper } from '@material-ui/core'
import { FC } from 'react'
import Image from 'next/image'
import { makeStyles } from '@material-ui/core/styles'

interface IGLBannerProp {
  imageUrl: string
  alt?: string
}

export const GLBanner: FC<IGLBannerProp> = ({ imageUrl, alt }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.banner}>
      <Image
        src={imageUrl}
        alt={alt}
        width="1440px"
        height="512px"
        layout="responsive"
        priority={true}
      />
    </Paper>
  )
}

const useStyles = makeStyles(() => ({
  banner: {
    maxHeight: '512px',
    overflow: 'hidden',
    marginBottom: '40px',

    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
}))
