import React,{useState,createRef} from 'react'
import { useRouter } from 'next/router'

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import Editor from '../editor/index'
import {url as globUrl} from '../../lib/api_url'


const FormHomeSlider = ({homeSlider,idHomeSlider,url,edit}) => {
    const [loading, setLoading] = useState(false);
    const [contentEN, setContentEN] = useState(homeSlider.homeSlider[0].description_en);
    const [contentID, setContentID] = useState(homeSlider.homeSlider[0].description_id);

    const [imgUrl, setImgUrl] = useState();
    const [showRemove, setShowRemove] = useState('');
    const [imgFile, setImgFile] = useState([]);

    const dropzoneRef = createRef();

    const router = useRouter()

    let handleSubmit

    if (edit === true) {
        handleSubmit = function handleSubmit(e) {
            e.preventDefault()
            setLoading(true)

            const dataForm = new FormData()
            dataForm.append('desc_en', contentEN)
            dataForm.append('desc_id', contentID)
            dataForm.append('file', imgFile)
            dataForm.append('id', idHomeSlider)

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
            e.preventDefault()
            setLoading(true)
            const dataForm = new FormData()
            dataForm.append('desc_en', contentEN)
            dataForm.append('desc_id', contentID)
            dataForm.append('file', imgFile)

            fetch(url,{
                method:'POST',
                body:dataForm
            })
            .then((response) => response.json())
            .then((dataRes) => {
                setLoading(false)
                setTimeout(() => {
                    router.push('/home-slider')
                }, 1500);
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

    React.useEffect(() => {
        if (edit === true) {
            setImgUrl( `${globUrl}/images/${homeSlider.homeSlider[0].imageName}`)
        }

        console.log(homeSlider.homeSlider[0].description_en);
    }, [])


    function handleEditorChangeEN(content) {
        setContentEN(content)
    }

    function handleEditorChangeID(content) {
        setContentID(content)
    }

    return (
        <form  onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} >
                    <Dropzone onDrop={onDropFile} noClick noKeyboard ref={dropzoneRef}>
                    {({getRootProps, getInputProps,acceptedFiles}) => (
                        <section className="dropzone_Wrapper">
                            <div className="dropzone" {...getRootProps({className:"dropzone-1"})}>
                                <input {...getInputProps()} />
                                <div className="slider__preview">
                                    <img src={imgUrl} width="100%"/>
                                </div>
                                <ul>
                                    <li><div className="button_upload" onClick={openDialog} >Select Files</div></li>
                                    <li><div className={`button_upload remove ${showRemove}`} onClick={() => remove(acceptedFiles)}>REMOVE</div></li>
                                </ul>
                            </div>
                        </section>
                    )}
                    </Dropzone>

                    <div style={{marginBottom:'4rem'}}>
                        <h3>EN</h3>
                        <Editor handleEditorChange={handleEditorChangeEN} value={homeSlider.homeSlider[0].description_en}/>
                    </div>
                    <div >
                        <h3>ID</h3>
                        <Editor handleEditorChange={handleEditorChangeID} value={homeSlider.homeSlider[0].description_id}/>
                    </div>

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

export default FormHomeSlider
