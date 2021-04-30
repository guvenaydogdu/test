import React, { FC, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { colors } from '../../../theme'
import { GLIconUploadFiles } from '../../Common/GLIcons'
import { Card, CardActionArea, CardMedia } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { classNames } from '../../../utils/styles'

interface IGLBasicDropzoneProps {
  onChange: (val: any) => void
  value?: any
  defaultValue?: string
  error: boolean
}

export const GLBasicDropzone: FC<IGLBasicDropzoneProps> = ({ defaultValue, onChange, error }) => {
  const classes = useStyles()
  const [file, setFile] = useState<any>(null)
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        setFile(
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      })
    },
  })

  useEffect(() => {
    const set = async () => {
      const data = (await toBase64(file)) as string
      onChange({
        fileName: file.name,
        fileBase64String: data?.split('base64,')[1],
      })
    }
    if (file?.preview) {
      set()
    }
  }, [file])
  return (
    <section className={classNames([classes.uploadFiles, error && classes.error])}>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <GLIconUploadFiles />
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      </div>
      <aside>
        <h4>Files</h4>
        {file && (
          <Card className={classes.files}>
            <CardActionArea>
              <CardMedia image={file.preview} title="Paella dish" />
            </CardActionArea>
          </Card>
        )}
        {file == null && defaultValue ? (
          <Card className={classes.files}>
            <CardActionArea>
              <CardMedia
                image={process.env.PROJECT_IMAGE_BASE_URL + defaultValue}
                title="Paella dish"
              />
            </CardActionArea>
          </Card>
        ) : null}
      </aside>
    </section>
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
  uploadFiles: {
    '& .dropzone': {
      border: `1px dashed ${colors.grayMedium}`,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justfiyContent: 'center',
      padding: '15px 20px',

      '& svg': {
        width: '40px',
        height: 'auto',
        fill: colors.black,
      },

      '& p': {
        margin: 0,
        textAlign: 'center',
      },
    },
  },
  error: {
    '& .dropzone': {
      border: `1px dashed ${colors.danger}`,
    },
  },
  files: {
    '& .MuiCardActionArea-root': {
      '& .MuiCardMedia-root': {
        height: '140px',
      },
    },
  },
}))
