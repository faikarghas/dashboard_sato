import React, {useState,useEffect} from 'react'
import { Editor } from '@tinymce/tinymce-react';

const Index = ({handleEditorChange,value}) => {
    const [data,setData] = useState()

    useEffect(() => {
        if (value) {
            setData(value)
        }
    }, [])

    return (
        <div>
            <Editor
                apiKey="km7wsp269bqjenfxf5r5banl2er87uzvs8mcp6ep28s9x53z"
                value={data}
                onEditorChange={handleEditorChange}
                init={{
                    content_style: ".mce-content-body p {color: #4d4d4d; font-family: galano-light; font-size: 16px; text-align: justify; margin:0;}",
                    paste_as_text: true,
                    plugins: "paste",
                }}
            />
        </div>
    )
}

export default Index
