import React,{useState,createRef} from 'react'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import {url as globUrl} from '../../lib/api_url'

import {useFormik } from 'formik'
import * as Yup from 'yup';

const FormIntouch = ({intouch,idintouchslider,url,edit}) => {
    const [loading, setLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState();
    const [imgUrl2, setImgUrl2] = useState();
    const [showRemove, setShowRemove] = useState('');
    const [imgFile, setImgFile] = useState([]);
    const [imgFile2, setImgFile2] = useState([]);
    const [btnUpload, setBtnUpload] = useState(true);
    const router = useRouter()

    const dropzoneRef = createRef();
    const dropzoneRef2 = createRef();

    let formik

    if (edit === true) {
         formik = useFormik({
            enableReinitialize:true,
            initialValues: {
                name: intouch.intouch[0].name
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                setLoading(true)

                const dataForm = new FormData()
                dataForm.append('name', values.name)
                dataForm.append('idintouchslider', idintouchslider)
                dataForm.append('file', imgFile)
                dataForm.append('file', imgFile2)

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
            },
        });
    } else {
         formik = useFormik({
            enableReinitialize:true,
            initialValues: {
                name:'',
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                setLoading(true)

                const dataForm = new FormData()
                dataForm.append('name', values.name)
                dataForm.append('file', imgFile)
                dataForm.append('file', imgFile2)


                fetch(url,{
                    method:'POST',
                    body:dataForm
                })
                .then((response) => response.json())
                .then((dataRes) => {
                    console.log('Success:', dataRes);
                    setLoading(false)
                    setTimeout(() => {
                        router.push('/intouch')
                    }, 1500);
                })
            },
        });
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

    function onDropFile2(acceptedFiles) {
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
            setImgUrl2(reader.result)
            setShowRemove('show')
            setImgFile2(acceptedFiles[0])
        };

        reader.readAsDataURL(acceptedFiles[0])
    }

    const openDialog = () => {
        // Note that the ref is set async,
        // so it might be null at some point
        if (dropzoneRef.current) {
            dropzoneRef.current.open()
        }
    };

    const openDialog2 = () => {
        // Note that the ref is set async,
        // so it might be null at some point
        if (dropzoneRef2.current) {
            dropzoneRef2.current.open()
        }
    };

    React.useEffect(() => {
        if (edit === true) {
            setImgUrl( `${globUrl}/images/intouch/desktop/${intouch.intouch[0].images}`)
            setImgUrl2( `${globUrl}/images/intouch/mobile/${intouch.intouch[0].imageMobile}`)
        }
    }, [])

    return (
        <form  onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12} >
                    <h3>DESKTOP</h3>
                    <Dropzone onDrop={onDropFile} noClick noKeyboard ref={dropzoneRef}>
                        {({getRootProps, getInputProps,acceptedFiles}) => (
                            <section className="dropzone_Wrapper">
                                <div className="dropzone" {...getRootProps({className:"dropzone-1"})}>
                                    <input {...getInputProps()} />
                                    <div className="slider__preview">
                                        <img src={imgUrl} width="100%"/>
                                        {btnUpload ? <div className="button_upload btn_upload" onClick={openDialog}>Select Images</div>  : ''}
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                    <h3>MOBILE</h3>
                    <Dropzone onDrop={onDropFile2} noClick noKeyboard ref={dropzoneRef2}>
                        {({getRootProps, getInputProps,acceptedFiles}) => (
                            <section className="dropzone_Wrapper">
                                <div className="dropzone" {...getRootProps({className:"dropzone-1"})}>
                                    <input {...getInputProps()} />
                                    <div className="slider__preview">
                                        <img src={imgUrl2} width="100%"/>
                                        {btnUpload ? <div className="button_upload btn_upload" onClick={openDialog2}>Select Images</div>  : ''}
                                    </div>
                                </div>
                            </section>
                        )}
                    </Dropzone>
                </Grid>
                <Grid item xs={12} md={12} >
                    <TextField
                        label="Name" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="name"
                        placeholder="Name"
                        name="name"
                        type="text"
                        autoComplete='off'
                        error={formik.errors.name && formik.touched.name ? true : null}
                        helperText={formik.errors.name && formik.touched.name ? formik.errors.name : null}
                        onChange={formik.handleChange} value={formik.values.name || ''}
                    />
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

export default FormIntouch
