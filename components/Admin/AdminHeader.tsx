import { FC, useState } from 'react'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Menu, MenuItem, IconButton, Box } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { AccountCircle } from '@material-ui/icons'
import Link from 'next/link'
import { useAuth } from '../../providers/AuthProvider'

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
  },
  userName: {
    fontSize: '12px',
    marginLeft: theme.spacing(2),
    cursor: 'pointer',
  },
  hide: {
    display: 'none',
  },
}))

interface IProps {
  toggleDrawer: boolean
  handleDrawerChange: (isStatus: boolean) => void
}

const AdminHeader: FC<IProps> = ({ toggleDrawer, handleDrawerChange }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const { user } = useAuth()
  const openMenu = Boolean(anchorEl)

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDrawerOpen = () => {
    handleDrawerChange(true)
  }

  return (
    <AppBar
      position="fixed"
      color="primary"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: toggleDrawer,
      })}
    >
      <Toolbar style={{ paddingLeft: '30px' }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, {
            [classes.hide]: toggleDrawer,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          ARKAS - Admin
        </Typography>
        <Box className={classes.userName} onClick={handleMenu}>
          <Typography variant="inherit">{user?.email}</Typography>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={openMenu}
          onClose={handleClose}
        >
          <Link href={'/'}>
            <MenuItem>Siteye Geri Dön</MenuItem>
          </Link>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default AdminHeader
