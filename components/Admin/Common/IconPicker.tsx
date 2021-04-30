import { FC } from 'react'
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.base-theme.react.css'
import '@fonticonpicker/react-fonticonpicker/dist/fonticonpicker.material-theme.react.css'
import FontIconPicker from '@fonticonpicker/react-fonticonpicker'

interface IIconPickerProps {
  value: string
  onChange: (iconName: string) => void
}

const IconPicker: FC<IIconPickerProps> = ({ value, onChange }) => {
  const handleChange = (a: string) => {
    onChange(a)
  }
  const props = {
    icons: ['fa-accessible-icon', 'fipicon-angle-right', 'fipicon-angle-up', 'fipicon-angle-down'],
    theme: 'bluegrey',
    renderUsing: 'class',
    value: value,
    onChange: handleChange,
    isMulti: false,
  }
  return <FontIconPicker {...props} />
}

export default IconPicker
