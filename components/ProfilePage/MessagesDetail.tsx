import React from 'react'
import dynamic from 'next/dynamic'
import makeStyles from '@material-ui/styles/makeStyles'
import { Box, Container, IconButton, Menu, MenuItem } from '@material-ui/core'
import { GLIconArrowLeftLong, GLIconDotsMore, GLIconStar, GLIconTrash } from '../Common/GLIcons'
import { colors } from '../../theme'
import Link from 'next/link'
import { MessageCard } from './MessageCard'
import { GLTextArea } from '../Common/Forms/GLTextarea'
import { GLButton } from '../Common/Forms/GLButtons'

const DynamicScrollBar = dynamic(() => import('../Common/GLScrollBar'), {
  ssr: false,
})

export const MessagesDetail = () => {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Container className={classes.contentContainer}>
        <Box className={classes.title}>
          <Box className="back">
            <IconButton>
              <GLIconArrowLeftLong />
            </IconButton>
            Konu Başlığı
          </Box>
          <Box className="actions">
            <IconButton>
              <GLIconStar />
            </IconButton>
            <IconButton>
              <GLIconTrash />
            </IconButton>
            <IconButton aria-controls="message-menu" onClick={handleClick}>
              <GLIconDotsMore />
            </IconButton>
            <Menu
              id="message-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Önemli Postalara Ekle</MenuItem>
              <MenuItem onClick={handleClose}>Arşive Ekle</MenuItem>
              <MenuItem onClick={handleClose}>Sil</MenuItem>
            </Menu>
          </Box>
        </Box>
        <Box className={classes.messageInfo}>
          <span>ID: 2345678</span>
          <span>
            Gönderen: <Link href="mailto:sea@shipeedy.com">sea@shipeedy.com</Link>
          </span>
        </Box>
        <DynamicScrollBar height={420}>
          <MessageCard author="Arkas Lojistik" date="11 Mart Cumartesi, 13:50" />
          <MessageCard author="Arkas Lojistik" date="11 Mart Cumartesi, 13:50" />
          <MessageCard author="Buğra Hadimoğlu" date="11 Mart Cumartesi, 13:50" />
          <MessageCard author="Murat KARTAL" date="11 Mart Cumartesi, 13:50" />
        </DynamicScrollBar>
      </Container>
      <Box className={classes.newMessage}>
        <GLTextArea
          value=""
          onChange={() => {
            console.log('t')
          }}
        />
        <Box className="action">
          <GLButton
            borderColor={colors.sea}
            bgColor={colors.white}
            bgColorHover={colors.sea}
            textColor={colors.sea}
            textColorHover={colors.white}
            shadow={false}
            text="Cevapla"
          />
        </Box>
      </Box>
    </>
  )
}

const useStyles = makeStyles(() => ({
  contentContainer: {
    padding: '32px 65px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '17px',
    marginBottom: '17px',
    borderBottom: `1px solid ${colors.grayLight}`,

    '& .back': {
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '150%',
      color: colors.sea,

      '& .MuiIconButton-root': {
        border: `1px solid ${colors.grayLight}`,
        marginRight: '13px',

        '& svg': {
          width: '13px',
          fill: colors.sea,
        },
      },
    },

    '& .actions': {
      '& .MuiIconButton-root': {
        padding: '6px',
        marginLeft: '12px',

        '& svg': {
          width: '18px',
          fill: colors.grayMedium,
        },
      },
    },
  },
  messageInfo: {
    marginBottom: '24px',

    '& span, & span a': {
      display: 'inline-block',
      fontWeight: 600,
      fontSize: '14px',
      lineHeight: '16px',
      textDecoration: 'underline',
      fontFeatureSettings: "'pnum' on, 'lnum' on",
      color: colors.grayMedium,
    },

    '& span + span': {
      marginLeft: '32px',
    },
  },
  newMessage: {
    backgroundColor: colors.blueLight,
    padding: '23px 65px',

    '& .action': {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '16px 0 0 0',

      '& [class*="GLButtonIcon"]': {
        width: 'auto',
        minWidth: '160px',
      },
    },
  },
}))
