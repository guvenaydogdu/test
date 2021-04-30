import { FC } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

interface IGLScrollBarProps {
  width?: number
  height?: number
}

const GLScrollBar: FC<IGLScrollBarProps> = ({ children, height }) => {
  return (
    <Scrollbars autoHeight autoHeightMax={height}>
      {children}
    </Scrollbars>
  )
}

export default GLScrollBar
