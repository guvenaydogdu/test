import React, { FC } from 'react'
import clsx from 'clsx'
import { Box, Collapse, makeStyles, Typography } from '@material-ui/core'
import { colors } from '../../theme'

interface IMessageCardProp {
  author: string
  date: string
}

export const MessageCard: FC<IMessageCardProp> = ({ author, date }) => {
  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Box
      className={clsx(classes.messageCard, {
        [classes.messageCardOpen]: expanded,
      })}
    >
      <Box className={classes.title} onClick={handleExpandClick}>
        <strong>{author}</strong>
        <span>{date}</span>
      </Box>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box className={classes.detail}>
          <Typography>
            Aliquet faucibus viverra amet amet habitant. Sem augue sapien eget proin at gravida
            turpis turpis id. Eget feugiat risus congue ultrices fermentum fames pellentesque id
            neque. Quis vel nunc viverra volutpat tellus velit, tristique viverra turpis. Amet,
            risus hendrerit elit laoreet ipsum pretium ut molestie turpis. Lorem turpis id molestie
            dictumst. Neque lacus, magna lacus risus. Maecenas vel viverra adipiscing mauris,
            elementum. Sit eros lorem nam lacus tempus ullamcorper fames sagittis tempor. Eget ipsum
            egestas nibh eros, donec massa placerat commodo vestibulum. Nunc donec augue pulvinar id
            cursus viverra diam vitae. Risus, lectus dui posuere malesuada. Magna pellentesque augue
            nunc cursus nulla nisi. Lorem elit lacus, aliquam lorem sit suspendisse egestas.
          </Typography>
        </Box>
      </Collapse>
    </Box>
  )
}

const useStyles = makeStyles(() => ({
  messageCard: {
    border: `1px solid ${colors.grayMedium}`,
    backgroundColor: colors.white,
    borderRadius: '10px',
    padding: '0 30px',
    marginBottom: '16px',
  },
  messageCardOpen: {
    borderColor: colors.sea,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px 0',
    cursor: 'pointer',

    '& strong': {
      display: 'block',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '16px',
      textDecoration: 'underline',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.sea,
    },

    '& span': {
      display: 'block',
      fontWeight: 600,
      fontSize: '12px',
      lineHeight: '14px',
      textAlign: 'right',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.grayMedium,
    },
  },
  detail: {
    borderTop: `1px solid ${colors.grayLight}`,
    padding: '16px 0',
    lineHeight: '150%',
    fontFeatureSettings: "'pnum' on, 'lnum' on",
  },
}))
