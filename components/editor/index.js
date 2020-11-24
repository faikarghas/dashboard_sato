import React, {useState,useEffect} from 'react'
import { Editor } from '@tinymce/tinymce-react';

const Index = ({handleEditorChange,value}) => {
    const [data,setData] = useState()
    const [showEditor,setShowEditor] = useState(false)

    function editor(params) {
        if (showEditor) {
            return (
                <Editor
                apiKey="km7wsp269bqjenfxf5r5banl2er87uzvs8mcp6ep28s9x53z"
                value={data}
                onEditorChange={handleEditorChange}
                init={{
                    content_style: ".mce-content-body p {color: #4d4d4d; font-family: galano-light; font-size: 16px; text-align: justify; margin:0;}",
                    paste_as_text: true,
                    plugins: 'media print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern help paste',
                    image_advtab: true,
                    file_picker_types: 'file image media',
                }}
            />
            )
        } else {
            return (<p>Loading ...</p>)
        }
    }

    useEffect(() => {
        setShowEditor(true)
        if (value) {
            setData(value)
        }
    }, [])

    return (
        <div>
            {editor()}
        </div>
    )
}

export default Index
