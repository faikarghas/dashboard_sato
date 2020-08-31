import React, { useState, useEffect, useRef } from 'react'
import {url as globUrl} from '../../lib/api_url'


// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageResize from 'filepond-plugin-image-resize';


// Register the plugins
registerPlugin(FilePondPluginImageResize);
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview)

function UploadImage({idProject,url,id}) {
  const [files, setFiles] = useState([])
  const filepond = useRef(null)

  function handleUpload() {
      let imgName = filepond.current.getFile().file.name;

      fetch(`${globUrl}/api/${url[1]}`,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
              name: imgName,
              id: id,
          })
      })
      .then(res=>res.json())
      .then(dataRes=>{

      })
  }


  return (
    <div className="imgUpload">
      <FilePond
        allowImageResize={true}
        ref={filepond}
        files={files}
        allowMultiple={true}
        maxFiles={1}
        server="http://api.sato.com/api/uploadImage"
        name="files" 
        labelIdle='Drag  Drop your files or <span class="filepond--label-action">Browse</span>'
        onaddfile={() =>handleUpload()}
      />
      <style jsx>{`
        .imgUpload{
            margin: 5rem;
        }
    `}</style>
    </div>
  )
}

export default UploadImage