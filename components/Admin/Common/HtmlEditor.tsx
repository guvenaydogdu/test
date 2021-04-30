import React, { FC } from 'react'
import ReactQuill from 'react-quill'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme

  [{ align: [] }],
  ['link', 'image'],

  ['clean'], // remove formatting button
]
const modules = {
  toolbar: toolbarOptions,
}

interface IHtmlEditorProps {
  value: string
  onChange: any
}

const HtmlEditor: FC<IHtmlEditorProps> = ({ value, onChange }) => {
  return <ReactQuill value={value} onChange={onChange} modules={modules} />
}

export default HtmlEditor
