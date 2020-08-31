import React,{useState,createRef} from 'react'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress } from '@material-ui/core'
import Dropzone from 'react-dropzone'
import {url as globUrl} from '../../lib/api_url'

import {useFormik } from 'formik'
import * as Yup from 'yup';

const FormTestimonials = ({testimonials,idTestimonials,url,edit}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(testimonials);
    const [imgUrl, setImgUrl] = useState();
    const [showRemove, setShowRemove] = useState('');
    const [imgFile, setImgFile] = useState([]);
    const router = useRouter()

    const dropzoneRef = createRef();

    let formik

    if (edit === true) {
         formik = useFormik({
            enableReinitialize:true,
            initialValues: {
                name:data.testimonials[0].name,
                jobTitle:data.testimonials[0].jobTitle,
                title_en:data.testimonials[0].title_en,
                title_id:data.testimonials[0].title_id,
                desc_en:data.testimonials[0].description_en,
                desc_id:data.testimonials[0].description_id
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                setLoading(true)

                const dataForm = new FormData()
                dataForm.append('name', values.name)
                dataForm.append('jobTitle', values.jobTitle)
                dataForm.append('title_en', values.title_en)
                dataForm.append('title_id', values.title_id)
                dataForm.append('desc_en', values.desc_en)
                dataForm.append('desc_id', values.desc_id)
                dataForm.append('idTestimonials', idTestimonials)
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
            },
        });
    } else {
         formik = useFormik({
            enableReinitialize:true,
            initialValues: {
                name:'',
                jobTitle:'',
                title_en:'',
                title_id:'',
                desc_en:'',
                desc_id:''
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                setLoading(true)

                const dataForm = new FormData()
                dataForm.append('name', values.name)
                dataForm.append('jobTitle', values.jobTitle)
                dataForm.append('title_en', values.title_en)
                dataForm.append('title_id', values.title_id)
                dataForm.append('desc_en', values.desc_en)
                dataForm.append('desc_id', values.desc_id)
                dataForm.append('idTestimonials', idTestimonials)
                dataForm.append('file', imgFile)

                fetch(url,{
                    method:'POST',
                    body:dataForm
                })
                .then((response) => response.json())
                .then((dataRes) => {
                    console.log('Success:', dataRes);
                    setLoading(false)
                    setTimeout(() => {
                        router.push('/testimonials')
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

    function remove(acceptedFiles) {
        // let newState = state.file.filter(item=>{
        //     return item !== acceptedFiles[0]
        // })
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
            setImgUrl( `${globUrl}/images/${testimonials.testimonials[0].imageName}`)
        }
    }, [])

    return (
        <form  onSubmit={formik.handleSubmit}>
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
                    <TextField
                        label="Job Title" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="jobTitle"
                        placeholder="Job Title"
                        name="jobTitle"
                        type="text"
                        autoComplete='off'
                        error={formik.errors.jobTitle && formik.touched.jobTitle ? true : null}
                        helperText={formik.errors.jobTitle && formik.touched.jobTitle ? formik.errors.jobTitle : null}
                        onChange={formik.handleChange} value={formik.values.jobTitle || ''}
                    />
                </Grid>
                <Grid item xs={12} md={12} >
                    <TextField
                        label="Sub Title EN" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="title_en"
                        placeholder="Sub Title EN"
                        name="title_en"
                        type="text"
                        autoComplete='off'
                        error={formik.errors.title_en && formik.touched.title_en ? true : null}
                        helperText={formik.errors.title_en && formik.touched.title_en ? formik.errors.title_en : null}
                        onChange={formik.handleChange} value={formik.values.title_en || ''}
                    />
                </Grid>
                <Grid item xs={12} md={12} >
                    <TextField
                        label="Sub Title ID" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="title_id"
                        placeholder="Sub Title ID"
                        name="title_id"
                        type="text"
                        autoComplete='off'
                        error={formik.errors.title_id && formik.touched.title_id ? true : null}
                        helperText={formik.errors.title_id && formik.touched.title_id ? formik.errors.title_id : null}
                        onChange={formik.handleChange} value={formik.values.title_id || ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Description EN" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="desc_en"
                        placeholder="Description EN"
                        type="text"
                        id="desc_en"
                        multiline
                        rows={6}
                        error={formik.errors.desc_en && formik.touched.desc_en ? true : null}
                        helperText={formik.errors.desc_en && formik.touched.desc_en ? formik.errors.desc_en : null}
                        onChange={formik.handleChange} value={formik.values.desc_en || ''}
                    />
                    <TextField
                        label="Description ID" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="desc_id"
                        placeholder="Description ID"
                        type="text"
                        id="desc_id"
                        multiline
                        rows={6}
                        error={formik.errors.desc_id && formik.touched.desc_id ? true : null}
                        helperText={formik.errors.desc_id && formik.touched.desc_id ? formik.errors.desc_id : null}
                        onChange={formik.handleChange} value={formik.values.desc_id || ''}
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

export default FormTestimonials
