import React, { FC, useEffect, useState } from 'react'
import {
  makeStyles,
  Box,
  Checkbox,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@material-ui/core'
import { colors } from '../../../theme'
import { GLButton } from '../Forms/GLButtons'
import { GLSelect } from '../Forms/GLSelect'
import { GLIconAddFile, GLIconTrash } from '../GLIcons'
import { GLModal } from '../GLModal'
import { GLTitleLine } from '../GLTitleLine'
import Requests from '../../../requests'
import { IOrderDocumentsResponse } from '../../../interfaces/OrderDocument'
import { IDocumentTypesResponse } from '../../../interfaces/DocumentType'
import moment from 'moment'
interface IModalProps {
  status: boolean
  handleChange: () => void
  orderId: number
  forArkasUser?: boolean
}

export const ModalFileUpload: FC<IModalProps> = ({
  status,
  handleChange,
  orderId,
  forArkasUser,
}) => {
  const classes = useStyles()
  const requests = Requests()
  const hiddenFileInput = React.useRef<any>(null)
  const [checked, setChecked] = useState<number | null>(null)
  const [orderDocuments, setOrderDocuments] = useState<IOrderDocumentsResponse | null>(null)
  const [documentTypes, setDocumentTypes] = useState<IDocumentTypesResponse | null>(null)
  const [selectedDocumentTypeId, setSelectedDocumentTypeId] = useState<number | null>(null)

  useEffect(() => {
    if (status) {
      getFiles()
      getDocumentTypes()
    }
  }, [status])

  const handleToggle = (value: any) => () => {
    setChecked(value)
  }
  const getFiles = () => {
    requests.OrderDocumentRequest.getList({ pageNumber: 1, pageSize: 100, orderId })
      .then((res) => setOrderDocuments(res))
      .catch((err) => console.log(err))
  }

  const getDocumentTypes = () => {
    requests.DocumentTypeRequest.getList({
      pageNumber: 1,
      pageSize: 100,
      forArkasUser: forArkasUser ? forArkasUser : false,
    })
      .then((res) => setDocumentTypes(res))
      .catch((err) => console.log(err))
  }
  const removeDocument = (documentId: number) => {
    requests.OrderDocumentRequest.delete(documentId)
      .then((res) => {
        if (res.isSuccess) {
          getFiles()
        }
      })
      .catch((err) => console.log(err))
  }

  const handleClick = () => {
    hiddenFileInput.current.click()
  }

  const onFileSelected = async (event: any) => {
    const fileUploaded = event.target.files[0]

    if (selectedDocumentTypeId && fileUploaded && selectedDocumentTypeId > 0) {
      const data = (await toBase64(fileUploaded)) as string
      requests.OrderDocumentRequest.upload({
        orderId: orderId,
        documentTypeId: selectedDocumentTypeId,
        fileName: fileUploaded.name,
        fileBase64String: data?.split('base64,')[1],
      })
        .then((res) => {
          if (res.isSuccess) {
            getFiles()
          }
        })
        .catch((err) => console.log(err))
    }
  }

  return (
    <GLModal maxWidth="730px" statusModal={status} handleModalChange={handleChange}>
      <Box>
        <GLTitleLine title="Dosyalarım" />
        <Grid container spacing={2} alignItems="flex-end" justify="space-between">
          <Grid item xs={6}>
            <GLSelect
              label="Doküman Tipi"
              data={documentTypes?.data.map((dType) => {
                return {
                  id: dType.id,
                  label: dType.nameEN,
                }
              })}
              value={selectedDocumentTypeId}
              onChange={(val: any) => setSelectedDocumentTypeId(val)}
            />
          </Grid>
          <Grid item xs={4}>
            <GLButton
              text="Yükle"
              textColor={colors.sea}
              textColorHover={colors.white}
              bgColor={colors.white}
              bgColorHover={colors.sea}
              borderColor={colors.sea}
              shadow={false}
              onClick={handleClick}
            />
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={onFileSelected}
              style={{ display: 'none' }}
            />
          </Grid>
        </Grid>
        <br />
        <br />
        <GLTitleLine title="Yüklü Dosyalarım" />
        <List className={classes.fileList}>
          {orderDocuments?.data.map((oDoc) => {
            console.log('oDoc', oDoc)
            const labelId = `checkbox-list-label-${oDoc.id}`

            return (
              <ListItem
                key={oDoc.id}
                role={undefined}
                dense
                button
                onClick={handleToggle(oDoc.id)}
                className={checked == oDoc.id ? 'checked' : ''}
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked == oDoc.id}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={
                    <>
                      <span>
                        {documentTypes?.data.find((x) => x.id == oDoc.documentTypeId)?.nameEN}
                      </span>
                      <strong>
                        <GLIconAddFile />
                        {oDoc.name} {oDoc.extension}
                      </strong>
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  {checked == oDoc.id ? (
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={() => {
                        removeDocument(oDoc.id)
                      }}
                    >
                      <GLIconTrash />
                    </IconButton>
                  ) : (
                    <Typography variant="subtitle2">
                      {moment(oDoc.createTime).format('DD MMMM, HH:MM')}
                    </Typography>
                  )}
                </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
      </Box>
    </GLModal>
  )
}

const toBase64 = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const useStyles = makeStyles(() => ({
  fileList: {
    '& .MuiListItem-container': {
      border: `1px solid ${colors.blueLight}`,

      '& .MuiListItem-root': {
        '&.checked': {
          backgroundColor: colors.blueLight,
        },

        '& .MuiListItemIcon-root': {
          '& .MuiIconButton-root': {
            color: colors.sea,

            '&:hover': {
              backgroundColor: `rgba(${colors.seaRGB}, .1)`,
            },
          },
        },

        '& .MuiListItemText-root': {
          '& .MuiTypography-root': {
            display: 'flex',

            '& span': {
              flexBasis: '50%',
              color: colors.sea,
              textDecoration: 'underline',
            },

            '& strong': {
              flexBasis: '50%',
              display: 'flex',
              alignItems: 'center',
              fontWeight: 'normal',
              color: colors.black,
              textDecoration: 'underline',

              '& svg': {
                width: '18px',
                height: '18px',
                fill: colors.grayMedium,
                marginRight: '8px',
              },
            },
          },
        },
      },

      '& .MuiListItemSecondaryAction-root': {
        '& .MuiButtonBase-root': {
          '& + .MuiButtonBase-root': {
            marginLeft: '1rem',
          },

          '& svg': {
            width: '16px',
            height: '16px',
            fill: colors.grayMedium,
          },

          '&:hover svg': {
            fill: colors.sea,
          },
        },
      },
    },
  },
}))
