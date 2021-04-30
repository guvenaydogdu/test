import React, { FC, ReactElement } from 'react'
import { makeStyles, Tab, Tabs } from '@material-ui/core'
import { colors } from '../../theme'

interface ITabData {
  title: string
  active: boolean
  content: ReactElement
}

interface IGLTabsProps {
  data: ITabData[]
}

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function a11yProps(index: any) {
  return {
    id: `arkas-tab-${index}`,
    'aria-controls': `arkas-tabpanel-${index}`,
  }
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`arkas-tabpanel-${index}`}
      aria-labelledby={`arkas-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  )
}

export const GLTabs: FC<IGLTabsProps> = ({ data }) => {
  const classes = useStyles()

  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setValue(newValue)
  }

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        aria-label="Arkas Tabs"
        className={classes.tabTitle}
      >
        {data?.map((item, index) => {
          return <Tab label={item.title} {...a11yProps(index)} key={index} />
        })}
      </Tabs>
      {data?.map((item, index) => {
        return (
          <TabPanel value={value} index={index} key={index}>
            {item.content}
          </TabPanel>
        )
      })}
    </>
  )
}

const useStyles = makeStyles(() => ({
  tabTitle: {
    borderBottom: `1px solid ${colors.grayLight}`,

    '& [class*="PrivateTabIndicator"]': {
      height: '1px',
    },

    '& .MuiButtonBase-root': {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: '150%',
      textTransform: 'none',
      color: colors.grayMedium,

      '&.Mui-selected': {
        color: colors.sea,
      },
    },
  },
}))
