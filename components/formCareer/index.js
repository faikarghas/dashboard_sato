import React,{useState} from 'react'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress } from '@material-ui/core'
import Editor from '../editor/index'

import {useFormik } from 'formik'
import * as Yup from 'yup';

const FormCareer = ({career,idCareer,url,edit}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(career);
    const [descEn, setDescEn] = useState();
    const [descId, setDescId] = useState();
    const router = useRouter()

    function handleEditorChange1(content) {
        setDescEn(content)
    }

    function handleEditorChange2(content) {
        setDescId(content)
    }


    let formik

    if (edit) {
         formik = useFormik({
            enableReinitialize:true,
            initialValues: {
                name:data.career[0].name,
                desc_en:data.career[0].description_en,
                desc_id:data.career[0].description_id
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                const dataFormik = {
                    name: values.name,
                    desc_en: descEn,
                    desc_id: descId,
                    idCareer: idCareer
                }
                setLoading(true)
                fetch(url,{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(dataFormik)
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
                desc_en:'',
                desc_id:''
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                const dataFormik = {
                    name: values.name,
                    desc_en: descEn,
                    desc_id: descId,
                }
                setLoading(true)
                fetch(url,{
                    method:'POST',
                    headers:{'Content-Type':'application/json'},
                    body:JSON.stringify(dataFormik)
                })
                .then((response) => response.json())
                .then((dataRes) => {
                    console.log('Success:', dataRes);
                    setLoading(false)
                    setTimeout(() => {
                        router.push('/career')
                    }, 1500);
                })
            },
        });
    }

    React.useEffect(() => {
        if (edit) {
            setDescEn(data.career[0].description_en)
            setDescId(data.career[0].description_id)
        }
    }, [])

    return (
        <form  onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} >
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
                        helperText={formik.errors.name && formik.touched.name ? formik.errors.email : null}
                        onChange={formik.handleChange} value={formik.values.name || ''}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div className="editor__wrapper">
                        <h3>EN</h3>
                        <Editor handleEditorChange={handleEditorChange1} value={data ? data.career[0].description_en : ''}/>
                    </div>
                    <div className="editor__wrapper">
                        <h3>ID</h3>
                        <Editor handleEditorChange={handleEditorChange2} value={data ? data.career[0].description_id : ''}/>
                    </div>
                    {/* <TextField
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
                    /> */}
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

export default FormCareer
