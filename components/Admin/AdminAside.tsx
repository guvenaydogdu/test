import { FC, useState } from 'react'
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EventAvailableIcon from '@material-ui/icons/EventAvailable'
import AssignmentIcon from '@material-ui/icons/Assignment'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Link from 'next/link'
import BallotIcon from '@material-ui/icons/Ballot'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import AnnouncementIcon from '@material-ui/icons/Announcement'

const useStyles = makeStyles((theme) => ({
  drawerContainer: {
    overflow: 'auto',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  icon: {
    paddingLeft: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

interface IProps {
  handleDrawerChange: (isStatus: boolean) => void
}

const AdminAside: FC<IProps> = ({ handleDrawerChange }) => {
  const classes = useStyles()
  const [definitionCollapseStatus, setDefinitionCollapseStatus] = useState<boolean>(false)
  const handleDrawerOpen = () => {
    handleDrawerChange(false)
  }

  const handleClick = () => {
    setDefinitionCollapseStatus((prev) => !prev)
  }

  return (
    <>
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerOpen}>
          <ChevronRightIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <Link href={'/admin/announcement'}>
          <ListItem button key="transport-type">
            <ListItemIcon className={classes.icon}>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary="Duyuru Listesi" />
          </ListItem>
        </Link>
        <Link href={'/admin/transport-type'}>
          <ListItem button key="transport-type">
            <ListItemIcon className={classes.icon}>
              <EventAvailableIcon />
            </ListItemIcon>
            <ListItemText primary="Taşıma Tipi" />
          </ListItem>
        </Link>
        <Link href={'/admin/sliders'}>
          <ListItem button key="slider">
            <ListItemIcon className={classes.icon}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Sliders" />
          </ListItem>
        </Link>

        <Link href={'/admin/configs'}>
          <ListItem button key="slider">
            <ListItemIcon className={classes.icon}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Genel İçerik Ayarları" />
          </ListItem>
        </Link>
        <Link href={'/admin/users'}>
          <ListItem button key="slider">
            <ListItemIcon className={classes.icon}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Kullanıcılar" />
          </ListItem>
        </Link>
        <Link href={'/admin/staticcontent'}>
          <ListItem button key="slider">
            <ListItemIcon className={classes.icon}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Statik Sayfalar" />
          </ListItem>
        </Link>

        <Link href={'/admin/language'}>
          <ListItem button key="slider">
            <ListItemIcon className={classes.icon}>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Diller" />
          </ListItem>
        </Link>

        <ListItem button key="definition" onClick={handleClick}>
          <ListItemIcon className={classes.icon}>
            <AnnouncementIcon />
          </ListItemIcon>
          <ListItemText primary="Tanımlamalar" />
          {definitionCollapseStatus ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={definitionCollapseStatus} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link href={'/admin/definition/categories'}>
              <ListItem button className={classes.nested}>
                <ListItemIcon className={classes.icon}>
                  <BallotIcon />
                </ListItemIcon>
                <ListItemText primary="Kategoriler" />
              </ListItem>
            </Link>
          </List>
        </Collapse>
      </List>
    </>
  )
}

export default AdminAside
