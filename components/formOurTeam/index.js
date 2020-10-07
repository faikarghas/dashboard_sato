import React,{useState} from 'react'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress } from '@material-ui/core'

import {useFormik } from 'formik'
import * as Yup from 'yup';

const FormOurTeam = ({ourTeam,idOurTeam,url,edit}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(ourTeam);
    const router = useRouter()

    let formik

    if (edit === true) {
         formik = useFormik({
            enableReinitialize:true,
            initialValues: {
                name:data.ourTeam[0].name,
                jobTitle:data.ourTeam[0].jobTitle,
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                const dataFormik = {
                    name: values.name,
                    jobTitle: values.jobTitle,
                    id: idOurTeam
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
                jobTitle:''
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                const dataFormik = {
                    name: values.name,
                    jobTitle: values.jobTitle
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
                    alert('berhasil')
                    setTimeout(() => {
                        router.push('/our-team')
                    }, 1500);
                })
            },
        });
    }

    return (
        <form  onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
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

export default FormOurTeam
