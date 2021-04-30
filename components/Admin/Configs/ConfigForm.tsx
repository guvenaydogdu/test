import {
  Button,
  Checkbox,
  createStyles,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Theme,
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import React, { FC, useEffect, useState } from 'react'
import {
  ConfigInputType,
  IConfigPager,
  IConfigsResponse,
  ISetConfig,
} from '../../../interfaces/Config'
import { IConfigOptionsResponse } from '../../../interfaces/ConfigOption'
import Requests from '../../../requests'
import { useForm, Controller } from 'react-hook-form'

import { useDataContext } from '../../../providers/DataProvider'
import { IConfigGroupPager, IConfigGroupsResponse } from '../../../interfaces/ConfigGroup'
import { ShowToast, ToastType } from '../Toasts'

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export const ConfigForm: FC = () => {
  const classes = useStyles()
  const request = Requests()
  const [configListData, setConfigListData] = useState<IConfigsResponse | null>(null)
  const [configGroups, setConfigGroups] = useState<IConfigGroupsResponse | null>(null)

  const { globalState } = useDataContext()
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)

  useEffect(() => {
    getConfigGroups()
  }, [])

  useEffect(() => {
    getData()
  }, [selectedLanguage, selectedTabIndex])

  const getConfigGroups = () => {
    const configGroupPager: IConfigGroupPager = {
      pageNumber: 1,
      pageSize: 100,
      sortDescending: true,
    }

    request.ConfigGroupRequest.getList(configGroupPager)
      .then((res) => {
        setConfigGroups(res)
      })
      .catch((err) => console.log(err))
  }

  const getData = () => {
    if (selectedLanguage && configGroups) {
      setConfigListData(null)
      const configPager: IConfigPager = {
        pageNumber: 1,
        pageSize: 100,
        sortDescending: true,
        languageCode: selectedLanguage,
        configGroupId: configGroups?.data[selectedTabIndex].id,
      }
      request.ConfigRequest.getList(configPager)
        .then((res) => {
          setConfigListData(res)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const { control, handleSubmit } = useForm({})
  const onSubmit = (data: any) => {
    if (selectedLanguage && configGroups) {
      Object.keys(data).map((key) => {
        const setConfig: ISetConfig = {
          id: Number(key),
          value: data[key]?.toString(),
          configGroupId: configGroups?.data[selectedTabIndex].id,
          languageCode: selectedLanguage,
        }
        request.ConfigRequest.setConfig(setConfig)
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
      })
    }

    ShowToast({ variant: ToastType.SUCCESS, text: 'Başarılı' })
  }
  const handleChange = (event: React.ChangeEvent<Record<string, unknown>>, newValue: number) => {
    setSelectedTabIndex(newValue)
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Paper className={classes.formPage}>
        <Tabs value={selectedTabIndex} onChange={handleChange} aria-label="simple tabs example">
          {configGroups?.data.map((configGroup, index) => {
            return <Tab label={configGroup.name} {...a11yProps(index)} key={index} />
          })}
        </Tabs>
        <hr className={classes.margin} />
        <FormControl fullWidth variant="filled" className={classes.margin}>
          <InputLabel htmlFor="filled-label-native-simple">Dil</InputLabel>
          <Select
            value={selectedLanguage}
            onChange={(event) => setSelectedLanguage(event.target.value as string)}
            fullWidth
          >
            {globalState.languages?.map((lang) => {
              return (
                <MenuItem key={lang.code} value={lang.code}>
                  {lang.name}
                </MenuItem>
              )
            })}
          </Select>
        </FormControl>
        {configListData?.data.map((config) => {
          if (config.valueType == ConfigInputType.Text) {
            return (
              <Controller
                name={config.id.toString()}
                control={control}
                defaultValue={config.value}
                render={({ onChange, value }) => {
                  return (
                    <ConfigTextInput
                      name={config.name}
                      description={config.description}
                      onChange={onChange}
                      value={value}
                    />
                  )
                }}
              />
            )
          }
          if (config.valueType == ConfigInputType.Number) {
            return (
              <Controller
                name={config.id.toString()}
                control={control}
                defaultValue={config.value}
                render={({ onChange, value }) => {
                  return (
                    <ConfigNumberInput
                      name={config.name}
                      description={config.description}
                      value={value}
                      onChange={onChange}
                    />
                  )
                }}
              />
            )
          }
          if (config.valueType == ConfigInputType.Checkbox) {
            return (
              <Controller
                name={config.id.toString()}
                control={control}
                defaultValue={config?.value}
                render={({ onChange, value }) => {
                  return (
                    <ConfigCheckboxInput
                      defaultValue={config?.value}
                      id={config.id}
                      name={config.name}
                      description={config.description}
                      value={value}
                      onChange={onChange}
                    />
                  )
                }}
              />
            )
          }
          if (config.valueType == ConfigInputType.Dropdown) {
            return (
              <Controller
                name={config.id.toString()}
                control={control}
                defaultValue={config.value}
                render={({ onChange, value }) => {
                  return (
                    <ConfigDropdownInput
                      id={config.id}
                      name={config.name}
                      description={config.description}
                      value={value}
                      onChange={onChange}
                    />
                  )
                }}
              />
            )
          }
        })}
      </Paper>
      <div className={classes.formButtons}>
        {configListData != null && (
          <Button
            aria-label="save"
            variant="contained"
            color="primary"
            className={classes.button}
            type="submit"
          >
            Kaydet
          </Button>
        )}
      </div>
    </form>
  )
}

interface IConfigFormItem {
  id?: number
  name?: string
  description?: string
  value: string
  onChange: any
  defaultValue?: string
}

const ConfigTextInput: FC<IConfigFormItem> = ({ name, description, value, onChange }) => {
  const classes = useStyles()
  return (
    <TextField
      label={name}
      variant="outlined"
      helperText={description}
      value={value}
      onChange={onChange}
      className={classes.margin}
      fullWidth
    />
  )
}
const ConfigNumberInput: FC<IConfigFormItem> = ({ name, description, value, onChange }) => {
  const classes = useStyles()
  return (
    <TextField
      type="number"
      label={name}
      variant="outlined"
      helperText={description}
      value={value}
      onChange={onChange}
      className={classes.margin}
      fullWidth
    />
  )
}
const ConfigCheckboxInput: FC<IConfigFormItem> = ({
  id,
  name,
  description,
  value,
  defaultValue,
  onChange,
}) => {
  const parsedDefaultValues: number[] = JSON.parse(defaultValue ? defaultValue : '[]')

  const classes = useStyles()
  const request = Requests()
  const [configOptions, setConfigOptions] = useState<IConfigOptionsResponse | null>(null)

  const handleChange = (optionId: number) => {
    const parsedValue: number[] = JSON.parse(value ? value : '[]')
    let newValues = []
    if (parsedValue.includes(optionId)) {
      newValues = parsedValue.filter((value) => value != optionId)
    } else {
      newValues = [...parsedValue, optionId]
    }
    onChange(JSON.stringify(newValues))
  }

  useEffect(() => {
    getOptions()
  }, [])

  const getOptions = () => {
    request.ConfigOptionsRequest.getListByConfigId(id ? id : 0)
      .then((res) => {
        setConfigOptions(res)
      })
      .catch((err) => console.log(err))
  }

  return (
    <FormControl className={classes.margin}>
      <FormLabel component="legend">{name}</FormLabel>
      <FormGroup>
        {configOptions?.data.map((option) => {
          return (
            <FormControlLabel
              key={option.id}
              control={<Checkbox defaultChecked={parsedDefaultValues?.includes(option.id)} />}
              label={option.name}
              value={option.id}
              onChange={() => handleChange(option.id)}
            />
          )
        })}
      </FormGroup>
      <FormHelperText>{description}</FormHelperText>
    </FormControl>
  )
}
const ConfigDropdownInput: FC<IConfigFormItem> = ({ id, name, description, value, onChange }) => {
  const classes = useStyles()
  const request = Requests()
  const [configOptions, setConfigOptions] = useState<IConfigOptionsResponse | null>(null)

  useEffect(() => {
    getOptions()
  }, [])

  const getOptions = () => {
    request.ConfigOptionsRequest.getListByConfigId(id ? id : 0)
      .then((res) => {
        setConfigOptions(res)
      })
      .catch((err) => console.log(err))
  }

  return (
    <FormControl variant="outlined" fullWidth className={classes.margin}>
      <InputLabel id="demo-simple-select-label">{name}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        value={Number(value)}
        label={name}
        onChange={onChange}
      >
        {configOptions?.data.map((option) => {
          return (
            <MenuItem key={option.id} value={option.id}>
              {option.name}
            </MenuItem>
          )
        })}
      </Select>
      <FormHelperText>{description}</FormHelperText>
    </FormControl>
  )
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      margin: '50px 0',
      maxWidth: '540px',
    },
    button: {
      minHeight: '48px',
      minWidth: '120px',
      marginBottom: theme.spacing(2),
    },
    margin: {
      marginBottom: '30px',
    },
    formPage: {
      padding: '14px',
      marginBottom: '14px',
    },
    formButtons: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
    },
  })
)
