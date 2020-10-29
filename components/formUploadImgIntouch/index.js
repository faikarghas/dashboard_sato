import React,{useState,createRef} from 'react'
import { useRouter } from 'next/router'

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import Editor from '../editor/index'
import {url as globUrl} from '../../lib/api_url'


const FormUploadImg = ({url,edit}) => {
    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState();
    const [showRemove, setShowRemove] = useState('');
    const [imgFile, setImgFile] = useState([]);
    const [btnUpload, setBtnUpload] = useState(true);

    const dropzoneRef = createRef();
    const router = useRouter()

    let handleSubmit

    if (edit === true) {
        handleSubmit = function handleSubmit(e) {
            // e.preventDefault()
            setLoading(true)

            const dataForm = new FormData()
            dataForm.append('file', imgFile)

            fetch(url,{
                method:'POST',
                body:dataForm
            })
            .then((response) => response.json())
            .then((dataRes) => {
                setLoading(false)
                alert('berhasil')
                router.push(window.location.pathname)
            })
        }
    } else {
        handleSubmit = function handleSubmit(e) {
            setLoading(true)
            const dataForm = new FormData()
            dataForm.append('file', imgFile)

            fetch(url,{
                method:'POST',
                body:dataForm
            })
            .then((response) => response.json())
            .then((dataRes) => {
                setLoading(false)
                alert('berhasil')
            })
        }
    }

    function onDropFile(acceptedFiles) {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.log('file reading has failed')
        reader.onloadstart = () => {
            console.log('start')
        }

        reader.onload = (e) => {
            console.log('----',e.target)
        }

        reader.onloadend = function(e) {
            setImgUrl(reader.result)
            setShowRemove('show')
            setImgFile(acceptedFiles[0])
            // setBtnUpload(false)
        };

        reader.readAsDataURL(acceptedFiles[0])

    }

    function remove(acceptedFiles) {
        setImgUrl('')
        setShowRemove('')
    }

    const openDialog = () => {
        // Note that the ref is set async,
        // so it might be null at some point
        if (dropzoneRef.current) {
            dropzoneRef.current.open()
        }
    };


    return (
        <form  onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} >
                    <Dropzone onDrop={onDropFile} noClick noKeyboard ref={dropzoneRef}>
                    {({getRootProps, getInputProps,acceptedFiles}) => (
                        <section className="dropzone_Wrapper m-0">
                            <div className="dropzone" {...getRootProps({className:"dropzone-1"})}>
                                <input {...getInputProps()} />
                                <div className="slider__preview m-0">
                                    <img src={imgUrl} width="100%"/>
                                    {btnUpload ? <div className="button_upload btn_upload" onClick={openDialog} >Select Images</div>  : ''}
                                </div>
                            </div>
                        </section>
                    )}
                    </Dropzone>
                </Grid>
            </Grid>
            <Grid item xs={12} className="button_wrapper">
                <Button className="button_submit" variant="outlined" color="primary" type="submit" disabled={loading} >
                    {loading ? <CircularProgress size={24} className="buttonProgress" /> : 'Submit'}
                </Button>
            </Grid>
            <style jsx>{`
                form{
                    padding:1rem;
                }
            `}</style>
        </form>
    )
}

export default FormUploadImg
