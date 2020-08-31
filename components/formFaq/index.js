import React,{useState} from 'react'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Button, CircularProgress } from '@material-ui/core'

import {useFormik } from 'formik'
import * as Yup from 'yup';

const Faq = ({faq,idFaq,url,edit}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(faq);
    const router = useRouter()

    let formik

    if (edit === true) {
         formik = useFormik({
            enableReinitialize:true,
            initialValues: {
                question_en:data.faq[0].question_en,
                question_id:data.faq[0].question_id,
                answer_en:data.faq[0].answer_en,
                answer_id:data.faq[0].answer_id,
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                const dataFormik = {
                    question_en: values.question_en,
                    question_id: values.question_id,
                    answer_en: values.answer_en,
                    answer_id: values.answer_id,
                    id: idFaq
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
                question_en:'',
                question_id:'',
                answer_en:'',
                answer_id:'',
            },
            validationSchema: Yup.object({
            }),
            onSubmit: (values,{setFieldError,resetForm}) => {
                const dataFormik = {
                    question_en: values.question_en,
                    question_id: values.question_id,
                    answer_en: values.answer_en,
                    answer_id: values.answer_id,
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
                        router.push('/faq')
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
                        label="Question EN" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="question_en"
                        placeholder="Question EN"
                        name="question_en"
                        type="text"
                        autoComplete='off'
                        multiline
                        rows={5}
                        error={formik.errors.question_en && formik.touched.question_en ? true : null}
                        helperText={formik.errors.question_en && formik.touched.question_en ? formik.errors.question_en : null}
                        onChange={formik.handleChange} value={formik.values.question_en || ''}
                    />
                    <TextField
                        label="Answer EN" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="answer_en"
                        placeholder="Answer EN"
                        name="answer_en"
                        type="text"
                        autoComplete='off'
                        multiline
                        rows={5}
                        error={formik.errors.answer_en && formik.touched.answer_en ? true : null}
                        helperText={formik.errors.answer_en && formik.touched.answer_en ? formik.errors.answer_en : null}
                        onChange={formik.handleChange} value={formik.values.answer_en || ''}
                    />
                    <TextField
                        label="Question ID" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="question_id"
                        placeholder="Question ID"
                        name="question_id"
                        type="text"
                        autoComplete='off'
                        multiline
                        rows={5}
                        error={formik.errors.question_id && formik.touched.question_id ? true : null}
                        helperText={formik.errors.question_id && formik.touched.question_id ? formik.errors.question_id : null}
                        onChange={formik.handleChange} value={formik.values.question_id || ''}
                    />
                    <TextField
                        label="Answer ID" 
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="answer_id"
                        placeholder="Answer ID"
                        name="answer_id"
                        type="text"
                        autoComplete='off'
                        multiline
                        rows={5}
                        error={formik.errors.answer_id && formik.touched.answer_id ? true : null}
                        helperText={formik.errors.answer_id && formik.touched.answer_id ? formik.errors.answer_id : null}
                        onChange={formik.handleChange} value={formik.values.answer_id || ''}
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

export default Faq
